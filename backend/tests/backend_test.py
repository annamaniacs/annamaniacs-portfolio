"""Backend API test suite for Anna Cheng portfolio."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://ux-ai-pivot.preview.emergentagent.com"
API = f"{BASE_URL}/api"
OWNER_EMAIL = "anna@annamaniacs.com"
OWNER_PASS = "Portfolio!2026"


@pytest.fixture(scope="session")
def s():
    return requests.Session()


@pytest.fixture(scope="session")
def owner_session():
    sess = requests.Session()
    r = sess.post(f"{API}/auth/login", json={"email": OWNER_EMAIL, "password": OWNER_PASS}, timeout=15)
    assert r.status_code == 200, f"owner login failed: {r.status_code} {r.text}"
    return sess


# -------- health & content --------
def test_root(s):
    r = s.get(f"{API}/", timeout=10)
    assert r.status_code == 200
    assert r.json().get("ok") is True


def test_content(s):
    r = s.get(f"{API}/content", timeout=15)
    assert r.status_code == 200
    data = r.json()
    # Expect structural keys
    assert isinstance(data, dict) and len(data) > 0


# -------- resume pdf --------
def test_resume_pdf(s):
    r = s.get(f"{API}/resume.pdf", timeout=20)
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert "attachment" in r.headers.get("content-disposition", "").lower()
    assert r.content[:4] == b"%PDF"


# -------- contact --------
def test_contact_valid(s):
    payload = {"name": "TEST_User", "email": "test_contact@example.com", "company": "ACME", "message": "Hello Anna, this is a test message."}
    r = s.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 200
    assert r.json().get("ok") is True


def test_contact_invalid_email(s):
    r = s.post(f"{API}/contact", json={"name": "x", "email": "not-an-email", "message": "hello world"}, timeout=15)
    assert r.status_code == 422


def test_contact_short_message(s):
    r = s.post(f"{API}/contact", json={"name": "x", "email": "a@b.co", "message": "hi"}, timeout=15)
    assert r.status_code == 422


# -------- auth --------
def test_login_wrong_password():
    sess = requests.Session()
    r = sess.post(f"{API}/auth/login", json={"email": OWNER_EMAIL, "password": "WrongPass!123"}, timeout=15)
    assert r.status_code == 401


def test_login_success_and_me(owner_session):
    r = owner_session.get(f"{API}/auth/me", timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert data["email"] == OWNER_EMAIL
    assert data.get("role") == "owner"
    assert "access_token" in owner_session.cookies.get_dict()


def test_logout():
    sess = requests.Session()
    r = sess.post(f"{API}/auth/login", json={"email": OWNER_EMAIL, "password": OWNER_PASS}, timeout=15)
    assert r.status_code == 200
    r2 = sess.post(f"{API}/auth/logout", timeout=10)
    assert r2.status_code == 200
    r3 = sess.get(f"{API}/auth/me", timeout=10)
    assert r3.status_code == 401


# -------- admin endpoints without auth --------
@pytest.mark.parametrize("ep,method,body", [
    ("/admin/strategy", "GET", None),
    ("/admin/inbox", "GET", None),
    ("/admin/tailorings", "GET", None),
    ("/admin/tailor/stream", "POST", {"jd": "x" * 50, "label": "t"}),
])
def test_admin_requires_auth(ep, method, body):
    sess = requests.Session()
    if method == "GET":
        r = sess.get(f"{API}{ep}", timeout=10)
    else:
        r = sess.post(f"{API}{ep}", json=body, timeout=10)
    assert r.status_code == 401, f"{ep} returned {r.status_code}"


# -------- admin strategy --------
def test_strategy_chapters(owner_session):
    r = owner_session.get(f"{API}/admin/strategy", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 7, f"expected 7 chapters, got {len(data)}"


# -------- admin inbox --------
def test_inbox_structure(owner_session):
    r = owner_session.get(f"{API}/admin/inbox", timeout=15)
    assert r.status_code == 200
    data = r.json()
    for k in ("chats", "matches", "contacts"):
        assert k in data
        assert isinstance(data[k], list)
    # Our test contact should be present (test_contact_valid ran earlier)
    assert any(c.get("email") == "test_contact@example.com" for c in data["contacts"])


def test_mark_contact_read(owner_session):
    inbox = owner_session.get(f"{API}/admin/inbox", timeout=15).json()
    unread = next((c for c in inbox["contacts"] if c.get("email") == "test_contact@example.com"), None)
    assert unread is not None
    cid = unread["id"]
    r = owner_session.post(f"{API}/admin/contacts/{cid}/read", timeout=10)
    assert r.status_code == 200


# -------- JD matcher validation --------
def test_match_jd_too_short():
    r = requests.post(f"{API}/match/stream", json={"jd": "short"}, timeout=10)
    assert r.status_code == 422


# -------- chat stream (one LLM call) --------
def test_chat_stream_short():
    sid = "test_" + uuid.uuid4().hex[:12]
    payload = {"session_id": sid, "message": "In one short sentence, what tracks does Anna offer?"}
    with requests.post(f"{API}/chat/stream", json=payload, stream=True, timeout=60) as r:
        assert r.status_code == 200
        got_delta = False
        got_done = False
        start = time.time()
        for line in r.iter_lines(decode_unicode=True):
            if time.time() - start > 55:
                break
            if not line or not line.startswith("data:"):
                continue
            if '"delta"' in line:
                got_delta = True
            if '"done": true' in line or '"done":true' in line:
                got_done = True
                break
            if '"error"' in line:
                pytest.fail(f"stream error: {line}")
        assert got_delta, "no delta received from chat stream"
        assert got_done, "no done event received"


# -------- match stream (LLM call) --------
def test_match_stream():
    jd = ("Senior Product Designer, AI products. You will design agentic workflows, prompt UX, "
          "evaluate model outputs, and partner with ML engineers. 7+ years experience, fintech or "
          "healthcare background a plus. Figma required.")
    with requests.post(f"{API}/match/stream", json={"jd": jd}, stream=True, timeout=90) as r:
        assert r.status_code == 200
        text_parts = []
        start = time.time()
        for line in r.iter_lines(decode_unicode=True):
            if time.time() - start > 80:
                break
            if not line or not line.startswith("data:"):
                continue
            if '"done"' in line:
                break
            if '"delta"' in line:
                text_parts.append(line)
            if '"error"' in line:
                pytest.fail(f"stream error: {line}")
        assert len(text_parts) > 0, "no deltas in match stream"


# -------- tailor stream (authenticated LLM call) --------
def test_tailor_stream(owner_session):
    jd = ("Principal Product Designer, AI platform. Lead design for a multi-agent copilot used by "
          "enterprise analysts. Hands-on IC role. Partner with research, PM, ML.")
    with owner_session.post(f"{API}/admin/tailor/stream", json={"jd": jd, "label": "TEST_tailor"}, stream=True, timeout=120) as r:
        assert r.status_code == 200
        got = False
        start = time.time()
        for line in r.iter_lines(decode_unicode=True):
            if time.time() - start > 100:
                break
            if line and line.startswith("data:") and '"delta"' in line:
                got = True
            if line and '"done"' in line:
                break
            if line and '"error"' in line:
                pytest.fail(line)
        assert got, "no deltas in tailor stream"
    # Should appear in list
    r2 = owner_session.get(f"{API}/admin/tailorings", timeout=15)
    assert r2.status_code == 200
    items = r2.json()
    assert any(t.get("label") == "TEST_tailor" for t in items)


def test_delete_tailoring(owner_session):
    items = owner_session.get(f"{API}/admin/tailorings", timeout=15).json()
    target = next((t for t in items if t.get("label") == "TEST_tailor"), None)
    if not target:
        pytest.skip("no tailor doc to delete")
    r = owner_session.delete(f"{API}/admin/tailorings/{target['id']}", timeout=10)
    assert r.status_code == 200


def test_delete_tailoring_bad_id(owner_session):
    r = owner_session.delete(f"{API}/admin/tailorings/not-an-objectid", timeout=10)
    assert r.status_code == 404


# ================= NEW FEATURES =================

# -------- content: new AI-assisted-design case --------
def test_content_has_ai_case(s):
    r = s.get(f"{API}/content", timeout=15)
    assert r.status_code == 200
    data = r.json()
    # Flatten to find slugs in cases
    found = False
    def walk(x):
        nonlocal found
        if isinstance(x, dict):
            if x.get("slug") == "ai-assisted-design":
                found = True
            for v in x.values():
                walk(v)
        elif isinstance(x, list):
            for i in x:
                walk(i)
    walk(data)
    assert found, "ai-assisted-design case not present in /api/content"


# -------- applications: auth required --------
@pytest.mark.parametrize("method,ep,body", [
    ("GET", "/admin/applications", None),
    ("POST", "/admin/applications", {"company": "ACME"}),
    ("PUT", "/admin/applications/507f1f77bcf86cd799439011", {"company": "ACME"}),
    ("DELETE", "/admin/applications/507f1f77bcf86cd799439011", None),
])
def test_applications_require_auth(method, ep, body):
    sess = requests.Session()
    r = sess.request(method, f"{API}{ep}", json=body, timeout=10)
    assert r.status_code == 401, f"{method} {ep} returned {r.status_code}"


def test_applications_invalid_stage(owner_session):
    r = owner_session.post(f"{API}/admin/applications",
                           json={"company": "TEST_BadStage", "stage": "NotAStage"}, timeout=10)
    assert r.status_code == 422


_app_id = {"id": None}


def test_applications_crud(owner_session):
    # Create
    payload = {"company": "TEST_Co", "role": "Principal Designer", "stage": "Applied",
               "follow_up": "2026-01-15", "notes": "test", "track": "ai-product-design"}
    r = owner_session.post(f"{API}/admin/applications", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    doc = r.json()
    assert doc["company"] == "TEST_Co"
    assert doc["stage"] == "Applied"
    assert "id" in doc and doc["id"]
    _app_id["id"] = doc["id"]

    # List returns stages and item
    r2 = owner_session.get(f"{API}/admin/applications", timeout=15)
    assert r2.status_code == 200
    body = r2.json()
    assert "stages" in body and isinstance(body["stages"], list) and len(body["stages"]) >= 5
    assert any(it["id"] == _app_id["id"] for it in body["items"])

    # Update stage
    payload2 = {**payload, "stage": "Interviewing"}
    r3 = owner_session.put(f"{API}/admin/applications/{_app_id['id']}", json=payload2, timeout=15)
    assert r3.status_code == 200
    assert r3.json()["stage"] == "Interviewing"


def test_applications_delete(owner_session):
    aid = _app_id["id"]
    if not aid:
        pytest.skip("no app id")
    r = owner_session.delete(f"{API}/admin/applications/{aid}", timeout=10)
    assert r.status_code == 200
    # Verify gone
    body = owner_session.get(f"{API}/admin/applications", timeout=15).json()
    assert not any(it["id"] == aid for it in body["items"])


def test_applications_delete_bad_id(owner_session):
    r = owner_session.delete(f"{API}/admin/applications/not-an-objectid", timeout=10)
    assert r.status_code == 404


# -------- interview: auth required --------
@pytest.mark.parametrize("method,ep,body", [
    ("POST", "/admin/interview/question", {"track": "ai-product-design", "focus": "ai"}),
    ("POST", "/admin/interview/score", {"track": "ai-product-design", "focus": "ai",
                                        "question": "What is AI?", "answer": "a" * 25}),
    ("GET", "/admin/interviews", None),
    ("DELETE", "/admin/interviews/507f1f77bcf86cd799439011", None),
])
def test_interview_require_auth(method, ep, body):
    sess = requests.Session()
    r = sess.request(method, f"{API}{ep}", json=body, timeout=10)
    assert r.status_code == 401


def test_interviews_list(owner_session):
    r = owner_session.get(f"{API}/admin/interviews", timeout=15)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# -------- interview question + score (1 LLM call set) --------
def test_interview_question_and_score_stream(owner_session):
    # Question stream
    with owner_session.post(f"{API}/admin/interview/question",
                            json={"track": "ai-product-design", "focus": "ai", "jd": "", "avoid": []},
                            stream=True, timeout=90) as r:
        assert r.status_code == 200
        q_parts = []
        start = time.time()
        for line in r.iter_lines(decode_unicode=True):
            if time.time() - start > 80:
                break
            if not line or not line.startswith("data:"):
                continue
            if '"delta"' in line:
                import json as _j
                try:
                    obj = _j.loads(line[5:].strip())
                    q_parts.append(obj.get("delta", ""))
                except Exception:
                    pass
            if '"done"' in line:
                break
            if '"error"' in line:
                pytest.fail(line)
        question = "".join(q_parts).strip()
        assert len(question) > 10, f"no question content: {question!r}"

    # Score stream
    answer = ("In my Meta Estrix project I framed the problem, aligned PM/ENG on the AI UX pattern, "
              "shipped the preview flow, and measured activation. I'd apply the same approach here.") * 2
    with owner_session.post(f"{API}/admin/interview/score",
                            json={"track": "ai-product-design", "focus": "ai", "jd": "",
                                  "question": question[:500] or "Tell me about an AI project you shipped.",
                                  "answer": answer},
                            stream=True, timeout=120) as r:
        assert r.status_code == 200
        parts = []
        start = time.time()
        for line in r.iter_lines(decode_unicode=True):
            if time.time() - start > 110:
                break
            if not line or not line.startswith("data:"):
                continue
            if '"delta"' in line:
                import json as _j
                try:
                    obj = _j.loads(line[5:].strip())
                    parts.append(obj.get("delta", ""))
                except Exception:
                    pass
            if '"done"' in line:
                break
            if '"error"' in line:
                pytest.fail(line)
        text = "".join(parts)
        assert "Score:" in text, f"missing Score line: {text[:200]}"

    # List should include this interview with a score
    import re as _re
    time.sleep(1)
    r2 = owner_session.get(f"{API}/admin/interviews", timeout=15)
    assert r2.status_code == 200
    items = r2.json()
    assert len(items) >= 1
    latest = items[0]
    assert latest.get("score") is not None
    # Delete it to clean up
    r3 = owner_session.delete(f"{API}/admin/interviews/{latest['id']}", timeout=10)
    assert r3.status_code == 200


def test_interview_bad_delete(owner_session):
    r = owner_session.delete(f"{API}/admin/interviews/not-an-objectid", timeout=10)
    assert r.status_code == 404


def test_interview_score_requires_min_answer(owner_session):
    r = owner_session.post(f"{API}/admin/interview/score",
                           json={"track": "ai-product-design", "focus": "ai",
                                 "question": "What is AI?", "answer": "short"}, timeout=10)
    assert r.status_code == 422

