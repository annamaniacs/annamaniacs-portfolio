from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from content import RESUME, PROFILE

INK = HexColor("#111827")
MUTED = HexColor("#4B5563")
ACCENT = HexColor("#B45309")

S = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20, leading=24, textColor=INK),
    "head": ParagraphStyle("head", fontName="Helvetica", fontSize=10, leading=13, textColor=ACCENT),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, textColor=MUTED),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=INK, spaceBefore=10, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13, textColor=INK),
    "job": ParagraphStyle("job", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=INK, spaceBefore=6),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.3, leading=12.5, textColor=INK),
}


def build_resume_pdf() -> bytes:
    buf = BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=letter, leftMargin=0.7 * inch, rightMargin=0.7 * inch,
                            topMargin=0.6 * inch, bottomMargin=0.6 * inch,
                            title="Anna Cheng - Principal Product Designer", author=PROFILE["name"])
    els = [Paragraph(PROFILE["name"].upper(), S["name"]), Paragraph(RESUME["headline"], S["head"]),
           Paragraph(RESUME["contact"], S["contact"]), Spacer(1, 4),
           Paragraph("SUMMARY", S["h2"]), Paragraph(RESUME["summary"], S["body"]),
           Paragraph("CORE SKILLS", S["h2"]), Paragraph(" | ".join(RESUME["skills"]), S["body"]),
           Paragraph("EXPERIENCE", S["h2"])]
    for e in RESUME["experience"]:
        role = f"{e['role']} ({e['type']})" if e["type"] == "Contract" else e["role"]
        els.append(Paragraph(f"{e['company'].upper()}  |  {role}  |  {e['dates']}", S["job"]))
        els.append(ListFlowable([ListItem(Paragraph(b, S["bullet"]), leftIndent=10) for b in e["bullets"]],
                                bulletType="bullet", start="•", leftIndent=10, bulletFontSize=8))
    els += [Spacer(1, 4), Paragraph(RESUME["earlier"], S["body"]),
            Paragraph("TOOLS", S["h2"]), Paragraph(RESUME["tools"], S["body"]),
            Paragraph("EDUCATION", S["h2"]), Paragraph(RESUME["education"], S["body"])]
    doc.build(els)
    return buf.getvalue()
