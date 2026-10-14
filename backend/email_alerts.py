import os
import re
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{EMAIL_BASE_URL}/api/v1/email/send", headers={"X-Email-Key": EMAIL_KEY}, json=payload)
    if resp.status_code >= 400:
        try:
            info = resp.json()
        except ValueError:
            info = {}
        logger.warning(f"Email not sent ({resp.status_code} {info.get('code', '')}): {info.get('message', resp.text[:200])}")
        return None
    return resp.json().get("id")


async def notify_new_contact(c: dict) -> str | None:
    row = lambda k, v: f'<tr><td style="padding:4px 12px 4px 0;color:#6b7280;font-size:13px">{k}</td><td style="padding:4px 0;font-size:14px;color:#111827">{escape(v)}</td></tr>'
    html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;background:#F9F8F6">'
        '<p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#B45309;margin:0">New portfolio message</p>'
        f'<h1 style="font-size:22px;color:#111827;margin:8px 0 16px">{escape(c["name"])} wants to talk</h1>'
        f'<table role="presentation">{row("Name", c["name"])}{row("Email", c["email"])}{row("Company / role", c.get("company") or "-")}</table>'
        f'<div style="margin-top:16px;padding:16px;background:#ffffff;border-left:3px solid #F59E0B;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap">{escape(c["message"])}</div>'
        '<p style="font-size:13px;color:#4B5563;margin-top:16px">Hit reply to answer them directly. All messages are also in your private Inbox.</p>'
        f'<p style="font-size:11px;color:#9CA3AF;margin-top:24px">Sent by {escape(EMAIL_FROM_NAME)} portfolio alerts.</p>'
        '</td></tr></table>'
    )
    subject = f"New recruiter message from {c['name'][:60]}"
    try:
        return await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=c["email"])
    except Exception:
        logger.exception("Contact alert failed")
        return None
