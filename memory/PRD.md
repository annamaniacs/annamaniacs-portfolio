# PRD — Anna Cheng Portfolio Rebrand, AI Features & Job-Search Strategy

## Original problem statement
"I am a UX/UI product designer with 30 years of experience. I need to rebrand and upgrade my Framer portfolio website for applying for jobs purposes especially with the changing AI environment. I need the best design and strategy to land a new job. Give me a clear strategy and plan for rebrand and updating my resume and portfolio to have the highest success rate of interviews and landing the job. https://www.annamaniacs.com" (+ resume PDF uploaded)

## Decisions (approved plan)
- Brand = "Anna Cheng"; domain annamaniacs.com stays. Headline: "I make complex, high-stakes products clear, including the AI inside them."
- 3 tracks: Hands-on Principal IC, AI Product Design, Design Leadership.
- Featured: Bank of America, PNC, Highland Homes, Phoenix Technologies, Meta. More work: GE, Dell, State of Vermont, Ulta.
- Years shown as "20+" consistently (reduces age bias; strategy guide explains).
- AI: Claude Sonnet 5.5 (claude-sonnet-5-5) via Emergent universal key, streaming SSE.

## Architecture
- Backend FastAPI: server.py (auth JWT httpOnly cookies, public content/contact/chat/match/resume.pdf, owner tailor/inbox/strategy), content.py (single source of site + resume content & AI knowledge), strategy.py (7-chapter markdown guide, served only to owner), resume_pdf.py (reportlab ATS PDF).
- Mongo collections: users, login_attempts, chat_messages, matches, contacts, tailorings, ai_usage (rate limit).
- Frontend React: public pages Home, Work, CaseStudy, About, Resume, Contact, Matcher; Login; Owner (Strategy, Tailor, Inbox). Dark "Swiss Onyx & Amber" design, Cormorant Garamond / Plus Jakarta Sans / JetBrains Mono.

## Implemented (2026-06)
- Full public rebranded site, 5 case studies (Problem → Role → Decisions → Outcome → What AI changed), TO CONFIRM placeholders
- Ask Anna's AI chat (public, guarded, logged), JD matcher (public, no gaps), resume PDF download
- Owner area: login (seeded anna@annamaniacs.com), tailoring tool with copyable sections + history, inbox (messages/chats/matches), strategy guide
- Tested: iteration_1 100% backend + frontend

## Backlog
- P1: Owner content editing (case studies, metrics) without code
- P1: Email alerts for new contact messages (Resend)
- P2: Analytics (page views, which cases recruiters open)
- P2: Dedicated AI case study page once Anna writes it; real headshot on About
- P2: Light theme toggle; OG share image
