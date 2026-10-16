IMG = "https://framerusercontent.com/images/"

PROFILE = {
    "name": "Anna Cheng",
    "title": "Principal Product Designer",
    "tagline": "Complex enterprise & AI-powered products",
    "headline": "I make complex, high-stakes products clear, including the AI inside them.",
    "subline": "Principal-level product designer for enterprise, fintech and AI-powered platforms. I turn ambiguous workflows into products people trust, and I use AI daily to explore, prototype and validate faster, with human judgment in charge.",
    "location": "Denver, CO",
    "email": "anna@annamaniacs.com",
    "website": "www.annamaniacs.com",
    "linkedin": "",
    "availability": "Open to Principal /ugh, AI Product Design and Design Leadership roles. Remote, hybrid or Denver.",
    "years": "20+",
}

TRACKS = [
    {
        "id": "principal-ic",
        "name": "Hands-on Principal IC",
        "pitch": "I own the hardest workflow end to end, from discovery to shipped, documented screens.",
        "proof": ["Ran 21 user interviews and turned them into 136 usability fixes at PNC", "130+ accessible, responsive screens documented", "First enterprise design system at Highland Homes"],
        "cases": ["pnc-bank", "highland-homes", "bank-of-america"],
    },
    {
        "id": "ai-product-design",
        "name": "AI Product Design",
        "pitch": "I design how people work with AI, and I use AI to design faster without losing rigor.",
        "proof": ["AI-assisted workflow analysis, ideation and rapid prototyping in daily practice", "Human review and validation built into every AI-assisted step", "Safety and threat-signal products where decisions carry consequences"],
        "cases": ["ai-assisted-design", "meta", "highland-homes"],
    },
    {
        "id": "design-leadership",
        "name": "Design Leadership",
        "pitch": "I build design functions, raise UX maturity and get ambiguous products to market.",
        "proof": ["Promoted from Lead UX to VP to take a cybersecurity product to market", "Built and mentored design teams; led 50+ designers and developers", "Established process, standards and executive design reviews"],
        "cases": ["phoenix-technologies", "bank-of-america", "meta"],
    },
]

CLIENTS = ["Bank of America", "PNC", "Meta", "GE Aerospace", "Dell", "Ulta Beauty", "Highland Homes", "Phoenix Technologies", "Neudesic", "DFW Airport"]

IMPACT = [
    {"value": "21", "label": "User interviews run and synthesized at PNC"},
    {"value": "136", "label": "Usability improvements identified"},
    {"value": "130+", "label": "Accessible, responsive screens shipped"},
    {"value": "35%", "label": "Engagement lift at Neudesic"},
    {"value": "50+", "label": "Designers & developers led and mentored"},
]

PROCESS = [
    {"phase": "Frame", "steps": ["Discovery & stakeholder interviews", "Problem framing & success metrics", "Workflow and decision mapping"]},
    {"phase": "Shape", "steps": ["Information architecture & flows", "AI-assisted exploration & rapid prototypes", "Design-system patterns"]},
    {"phase": "Prove", "steps": ["Usability testing & validation", "Accessibility (ADA / Section 508)", "Engineering hand-off & measuring outcomes"]},
]

CASES = [
    {
        "slug": "bank-of-america",
        "client": "Bank of America",
        "title": "Un-complicating SWFT, an enterprise workflow tool used by thousands",
        "role": "Lead UX Designer",
        "years": "2023 – 2025",
        "engagement": "Full-time",
        "sector": "Enterprise fintech",
        "tracks": ["principal-ic", "design-leadership"],
        "featured": True,
        "cover": IMG + "FhY9kZdKix3UgjPDfv23843gETY.png",
        "gallery": [IMG + "8nMdmpRIlYDy7nziaoWk73br1s.png", IMG + "4YrsovXp3C8RuqU4TkfNweIxvf4.png", IMG + "OCKZ4QjRIX7gjNgTfNvfqXlmaM.png"],
        "summary": "The Simplified Workflow Tool (SWFT) had grown into anything but simple. I led its redesign using research with real associates, during the bank's Sketch-to-Figma transition.",
        "problem": "SWFT let associates request forms from clients, communicate and exchange documents. After rapid feature growth it became slow and confusing. The team needed it faster and easier for everyone, with minimal new development.",
        "my_role": "Lead designer on the enterprise product design team. I owned the intake, configuration and fulfillment forms, partnered with research on user interviews, and helped move the team's prototypes, templates and libraries into Figma.",
        "decisions": [
            "Paused feature requests to run day-in-the-life interviews (10 recorded sessions) and find what to trim.",
            "Redesigned navigation, intake forms and cards around the most frequent tasks, so work takes fewer clicks.",
            "Rebuilt templates, components and libraries in Figma so the redesign scaled across enterprise applications.",
            "Chose changes that reused existing components to keep development effort low.",
        ],
        "outcomes": [
            {"value": "10", "label": "Associates interviewed and re-tested after the redesign", "confirm": False},
            {"value": "Fewer clicks", "label": "Navigation, forms and cards load faster with fewer steps", "confirm": False},
            {"value": "[X]%", "label": "Time-on-task or click reduction (add the number)", "confirm": True},
        ],
        "ai_changed": "This work came before generative AI was in the toolkit. Today I would use AI to cluster interview transcripts and draft form-content variants in hours rather than days, then validate with the same users.",
        "tools": "Figma, Sketch, InVision, UserZoom, Jira",
    },
    {
        "slug": "pnc-bank",
        "client": "PNC Bank",
        "title": "From 21 interviews to 136 fixes in enterprise banking",
        "role": "Principal Product Designer",
        "years": "2025",
        "engagement": "Contract",
        "sector": "Enterprise banking",
        "tracks": ["principal-ic"],
        "featured": True,
        "cover": None,
        "gallery": [],
        "summary": "End-to-end UX for complex banking experiences used by internal associates and customers. The work went from research to 130+ accessible, documented screens.",
        "problem": "Associates and customers were working around friction in complex banking flows. The business needed evidence of where the experience broke down, and a design that engineering and QA could build accessibly across desktop and mobile.",
        "my_role": "Principal designer owning research, synthesis, flows and high-fidelity design, partnering with Product, Engineering, QA and business stakeholders through validation and implementation.",
        "decisions": [
            "Led 21 user interviews and synthesized them into a ranked backlog of 136 usability improvements.",
            "Turned findings into personas, journey maps and flows so stakeholders shared one view of the problem.",
            "Designed accessibility in from the start (ADA / Section 508) instead of auditing afterwards.",
            "Documented every screen so engineering and QA could validate without ambiguity.",
        ],
        "outcomes": [
            {"value": "21", "label": "User interviews conducted and synthesized", "confirm": False},
            {"value": "136", "label": "Usability improvements identified and prioritized", "confirm": False},
            {"value": "130+", "label": "Responsive, ADA/508-compliant screens documented", "confirm": False},
        ],
        "ai_changed": "AI-assisted synthesis helped me cluster themes across 21 interviews quickly. I then checked every insight against the raw notes before it reached stakeholders. [Confirm how AI was used here]",
        "tools": "Figma, FigJam, Jira, Confluence",
    },
    {
        "slug": "highland-homes",
        "client": "Highland Homes",
        "title": "A first design system and an AI-assisted workflow for enterprise apps",
        "role": "Staff Product Designer",
        "years": "2025 – Present",
        "engagement": "Contract",
        "sector": "Enterprise operations",
        "tracks": ["principal-ic", "ai-product-design"],
        "featured": True,
        "cover": None,
        "gallery": [],
        "summary": "Enterprise apps for land acquisition, financial planning and operations, each built differently. I created the company's first centralized design system and an AI-assisted way of designing.",
        "problem": "Business-critical decisions about land and money ran through inconsistent internal tools. With no shared patterns, every new screen was designed from scratch and users had to relearn each app.",
        "my_role": "Staff designer leading end-to-end product design. I run discovery workshops, own the design-system library, and present rationale to senior stakeholders.",
        "decisions": [
            "Mapped decision points and friction in land-acquisition and financial-planning workflows before designing screens.",
            "Created and own the first centralized design-system library: components, interaction patterns and visual foundations.",
            "Built AI into my workflow for exploration, workflow analysis, ideation, content refinement and rapid prototyping.",
            "Kept a human review and validation step on every AI-assisted output.",
        ],
        "outcomes": [
            {"value": "1st", "label": "Centralized design-system library for the organization", "confirm": False},
            {"value": "[X]", "label": "Apps or teams now using the system (add the number)", "confirm": True},
            {"value": "[X]x", "label": "Faster concept-to-prototype time with AI (add the number)", "confirm": True},
        ],
        "ai_changed": "AI is part of how I work here. I use it to explore many workflow options, stress-test copy and spin up interactive prototypes in a day. Stakeholder reviews and usability checks decide what ships.",
        "tools": "Figma, Figma AI, FigJam, Miro, Jira",
    },
    {
        "slug": "ai-assisted-design",
        "client": "Highland Homes · AI",
        "title": "Designing with AI, with people in charge: an AI-assisted workflow for enterprise apps",
        "role": "Staff Product Designer",
        "years": "2025 – Present",
        "engagement": "Contract",
        "sector": "AI-assisted design",
        "tracks": ["ai-product-design", "principal-ic"],
        "featured": True,
        "cover": None,
        "gallery": [],
        "summary": "How I built AI into everyday product design at Highland Homes. It covers workflow analysis, exploration, content and rapid prototyping, with a validation step on every AI output, so a small design team moves faster without losing rigor.",
        "problem": "One designer was supporting land-acquisition, financial-planning and operations apps, each with complex rules and many stakeholders. Traditional discovery-to-prototype cycles were too slow for the decisions the business needed, and the stakes (land and money) were too high to let AI make the calls.",
        "my_role": "I designed and run the AI-assisted workflow end to end: which steps use AI, which prompts and tools, how outputs are checked, and how results reach stakeholders. I also own the design system the prototypes are built on.",
        "decisions": [
            "Workflow analysis: I feed anonymized process notes and stakeholder interview notes to an LLM to map steps, decision points and inconsistencies. Then I verify the map with the people who do the work.",
            "Exploration: I generate several layout and flow options per problem, so stakeholder reviews compare real alternatives instead of starting from one idea.",
            "Content: I use AI to stress-test labels, empty states, error and confirmation copy for clarity in financial and land workflows.",
            "Rapid prototyping: I go from concept to an interactive Figma prototype on the design-system components in days rather than weeks. [Confirm the typical turnaround]",
            "Human-in-the-loop guardrails: no AI output reaches stakeholders unreviewed. I don't put confidential data into public tools, I check every insight against the source, and users and stakeholders validate before anything ships.",
        ],
        "outcomes": [
            {"value": "5", "label": "Design stages with a defined AI-assisted step and a human check", "confirm": False},
            {"value": "[X]x", "label": "Faster concept-to-prototype cycle (add the measured number)", "confirm": True},
            {"value": "[X]", "label": "Options explored per problem vs. before (add the number)", "confirm": True},
        ],
        "ai_changed": "AI changed the speed and breadth of the work, not who decides. Teams see more options earlier and get to tested prototypes sooner. Judgment, ethics and validation stay human, and that is the pattern I bring to designing AI-powered products for users.",
        "tools": "Figma, Figma AI, FigJam, generative AI assistants, Miro, Jira",
    },
    {
        "slug": "phoenix-technologies",
        "client": "Phoenix Technologies",
        "title": "Taking FirmGuard, a first-ever software product, to market",
        "role": "VP, Product Design & Development",
        "years": "2022 – 2023",
        "engagement": "Contract",
        "sector": "Cybersecurity",
        "tracks": ["design-leadership", "ai-product-design"],
        "featured": True,
        "cover": IMG + "62b3zlRocGabHD57L19JfAPA.png",
        "gallery": [IMG + "KG32OdOQ0vwBfTqPfc0IWxKmaM.jpg?width=2000", IMG + "IcTnPk8gIwKtwnwq255xJHFSuv8.jpg?width=2000", IMG + "3iSqGRFCESrSD3XY5ow528Gy2c.jpg?width=2000"],
        "summary": "A firmware company known for hardware protection needed its first software product, a cybersecurity platform, on a hard launch deadline. I joined as Lead UX Designer and was promoted to VP to lead it to market.",
        "problem": "Designs had been in development for over two years and the prototypes weren't usable. The company had never shipped software and faced strong competition and a fixed launch window.",
        "my_role": "Joined as Lead UX Designer. After my new prototypes, the President promoted me to VP of Product Design & Development. I then hired and led the front-end design team and ran daily stand-ups and weekly executive reviews.",
        "decisions": [
            "Reset the product from scratch with new prototypes based on cybersecurity research and a dedicated user partner.",
            "Hired and led a front-end design team and set the design process and standards.",
            "Ran a free early-user program and test market that produced hundreds of user testing panels.",
            "Turned complex security and firmware concepts into an enterprise desktop and mobile experience.",
        ],
        "outcomes": [
            {"value": "Launched", "label": "FirmGuard shipped March 2023", "confirm": False},
            {"value": "100s", "label": "User testing panels from the early-user program", "confirm": False},
            {"value": "Military +", "label": "Sold to the military and to small and large organizations", "confirm": False},
        ],
        "ai_changed": "The product guarded devices against firmware-level attacks. Most of the design work was making invisible, technical threat signals understandable and actionable for non-specialists. [Confirm any AI/ML in FirmGuard]",
        "tools": "Figma, Creative Cloud, Confluence, Jira",
    },
    {
        "slug": "meta",
        "client": "Meta",
        "title": "Estrix: one global view of threats to Meta's people and sites",
        "role": "Lead Product Designer",
        "years": "2023",
        "engagement": "Contract",
        "sector": "Trust & safety",
        "tracks": ["ai-product-design", "principal-ic"],
        "featured": True,
        "cover": IMG + "4QOwy7ieaeE4XYY94Tg0VpOqPkY.png",
        "gallery": [IMG + "tqsKnmE3xsAJ8853uIXB7w4RcE.jpg", IMG + "8PWsaSa9G7FRAeEhzFo6e6w.jpg", IMG + "AoMcMLhHJTqj68JtW5YB8xYqcMo.jpg"],
        "summary": "Meta's Safety team monitors threats to employees, contractors, sites and campuses worldwide. I redesigned three alerting products and designed Estrix, a net-new global threat-monitoring product.",
        "problem": "Safety analysts needed to see threats from social media, world events and natural disasters across every Meta site. They had to act on them 24/7 and report the costs, and this was spread across separate tools.",
        "my_role": "Lead Product Designer on the Meta Safety team. I redesigned three communication and notification products and designed Estrix end to end, presenting to executives, engineering and owners.",
        "decisions": [
            "Made a live interactive map with a heat-map layer the landing view, built for the wall displays in the global safety operations centers.",
            "Inventoried all Meta assets and locations first, then defined exactly what analysts monitor and in what detail.",
            "Combined two products into Estrix so that identifying, alerting and budgeting threats happen in one flow.",
            "Developed reusable interaction and design-system components for consistency across safety products.",
        ],
        "outcomes": [
            {"value": "Global", "label": "Estrix launched and monitors threats, costs and reports", "confirm": False},
            {"value": "3 + 1", "label": "Products redesigned plus one net-new product", "confirm": False},
            {"value": "24/7", "label": "Used continuously at Meta's main international safety campuses", "confirm": False},
        ],
        "ai_changed": "Threat-signal products rely on automated detection. The design challenge was helping analysts trust a signal, see why it fired and act fast without alert fatigue. [Confirm the AI/ML detection details you can share]",
        "tools": "Figma, Meta internal tools",
    },
    {
        "slug": "ge-aerospace",
        "client": "GE Aerospace",
        "title": "Aircraft operations platform",
        "role": "Director, Product Design",
        "years": "2014 – 2015",
        "engagement": "Full-time",
        "sector": "Aviation",
        "tracks": ["design-leadership"],
        "featured": False,
        "cover": IMG + "tx1gpQMFnYR8apBJD4aZXQYepHY.png",
        "gallery": [],
        "summary": "Led product design for a platform used by technical users running complex aircraft operations. I turned dense operational requirements into clear information architecture and workflows.",
        "problem": "", "my_role": "", "decisions": [], "outcomes": [], "ai_changed": "", "tools": "",
    },
    {
        "slug": "dell",
        "client": "Dell",
        "title": "Client-facing products for major retail brands",
        "role": "Senior UI/UX Designer",
        "years": "2012 – 2014",
        "engagement": "Full-time",
        "sector": "Retail tech",
        "tracks": ["principal-ic"],
        "featured": False,
        "cover": IMG + "zv9Mwqn61VVOMwHEhaQNgumQqY.png",
        "gallery": [],
        "summary": "Designed web, mobile and responsive products for major retail brands, from flows to high-fidelity design, working with multidisciplinary teams.",
        "problem": "", "my_role": "", "decisions": [], "outcomes": [], "ai_changed": "", "tools": "",
    },
    {
        "slug": "state-of-vermont",
        "client": "State of Vermont",
        "title": "Public-sector services, made usable",
        "role": "Lead UX Designer (via Bresatech)",
        "years": "2018 – 2022",
        "engagement": "Full-time",
        "sector": "Public sector",
        "tracks": ["principal-ic"],
        "featured": False,
        "cover": IMG + "hfyn131IKldmuPwswEwimNwdMI.png",
        "gallery": [],
        "summary": "Regulated, operationally complex public-sector workflows. I turned regulatory requirements into accessible, intuitive experiences.",
        "problem": "", "my_role": "", "decisions": [], "outcomes": [], "ai_changed": "", "tools": "",
    },
    {
        "slug": "ulta-beauty",
        "client": "Ulta Beauty",
        "title": "Omnichannel retail: customer and associate experiences",
        "role": "Lead UX Designer",
        "years": "2025",
        "engagement": "Contract",
        "sector": "Retail",
        "tracks": ["principal-ic"],
        "featured": False,
        "cover": None,
        "gallery": [],
        "summary": "Led product design across customer-facing web, mobile and associate experiences, aligning Product, Engineering and Marketing on scalable interaction patterns.",
        "problem": "", "my_role": "", "decisions": [], "outcomes": [], "ai_changed": "", "tools": "",
    },
]

ABOUT = {
    "intro": "I'm a product designer who likes the hard parts: dense enterprise workflows, regulated finance, safety and security, and now AI. I've spent the last 15 years making these products clear enough for people to trust.",
    "story": [
        "Over the last decade I've led design for enterprise financial platforms at Bank of America and PNC, safety products at Meta, and a first-to-market cybersecurity product at Phoenix Technologies, where I was promoted from Lead UX Designer to VP.",
        "I work as a hands-on principal: I run the research, frame the problem, design the system and sit with engineering until it ships. I've also built and led teams, set design standards and presented to executives who need a decision, not a deck.",
        "AI is now part of how I design. I use it daily for exploration, workflow analysis, content and rapid prototyping, and I design products where AI makes consequential suggestions. Either way, the rule is the same: humans stay in charge, and every output gets validated.",
    ],
    "earlier": "Earlier: Director of Web Technology at CW33 Tribune Broadcasting (led 50+ designers and developers), plus web and product roles at DFW International Airport and Dell.",
    "principles": [
        {"title": "Clarity over cleverness", "text": "If a high-stakes screen needs explaining, it isn't finished."},
        {"title": "Evidence before pixels", "text": "Interviews, data and workflow maps come first, so decisions can be defended."},
        {"title": "AI with a human in the loop", "text": "AI widens the options. People decide, and validation proves it."},
        {"title": "Systems that scale", "text": "Reusable patterns and documentation let a team move faster than one designer."},
    ],
    "education": "B.A., Computer Science and Communications, Toronto Metropolitan University (formerly Ryerson)",
}

RESUME = {
    "headline": "Principal Product Designer | Enterprise & AI-Powered Products | Design Systems | Product Strategy",
    "contact": "Denver, CO  ·  anna@annamaniacs.com  ·  annamaniacs.com  ·  linkedin.com/in/[your-handle]",
    "summary": "Principal product designer who makes complex, high-stakes products clear, including the AI inside them. Leads end-to-end design for enterprise fintech, banking, safety and cybersecurity platforms at Bank of America, PNC and Meta, from discovery and research to design systems and shipped, accessible screens. Uses AI-assisted exploration and rapid prototyping daily, with human validation built in. Has built and led design teams, including a promotion to VP to take a first-ever software product to market.",
    "skills": [
        "Product Strategy & Problem Framing", "Enterprise SaaS & Complex Workflows", "AI-Assisted Design & Prototyping",
        "Human-in-the-Loop / AI UX Patterns", "Design Systems", "User Research & Usability Testing", "Information Architecture",
        "Interaction Design", "Accessibility (ADA / Section 508)", "Executive Communication", "Team Leadership & Mentoring", "Agile / SAFe",
    ],
    "tools": "Figma, Figma AI, FigJam, Miro, Jira, Confluence, Sketch, Adobe Creative Suite, HTML/CSS, generative AI tools (ChatGPT, Claude) for research synthesis & prototyping",
    "experience": [
        {"company": "Highland Homes", "role": "Staff Product Designer", "type": "Contract", "dates": "Dec 2025 – Present", "bullets": [
            "Created and own the organization's first centralized design-system library: reusable components, interaction patterns and foundations for enterprise applications.",
            "Lead end-to-end design for land-acquisition, financial-planning and operations apps, turning complex business processes into clear flows, IA and interactive Figma prototypes.",
            "Built AI-assisted methods into the workflow (exploration, workflow analysis, content and rapid prototyping) with human review and validation on every output.",
            "Facilitate discovery workshops and present design rationale to senior stakeholders to move decisions forward.",
        ]},
        {"company": "PNC Bank", "role": "Principal Product Designer", "type": "Contract", "dates": "Aug 2025 – Dec 2025", "bullets": [
            "Conducted 21 user interviews and synthesized them into 136 prioritized usability improvements for enterprise banking experiences.",
            "Designed and documented 130+ responsive, ADA/Section 508-compliant screens across desktop and mobile.",
            "Translated research into personas, journey maps, flows and prototypes; partnered with Product, Engineering and QA through implementation.",
        ]},
        {"company": "Ulta Beauty", "role": "Lead UX Designer", "type": "Contract", "dates": "Apr 2025 – Aug 2025", "bullets": [
            "Led product design across customer web, mobile and associate experiences in an omnichannel retail ecosystem.",
            "Aligned Product, Engineering and Marketing on experience strategy and scalable interaction patterns through workshops.",
        ]},
        {"company": "Bank of America", "role": "Lead UX Designer", "type": "Full-time", "dates": "Apr 2023 – Apr 2025", "bullets": [
            "Led the redesign of SWFT, an enterprise workflow tool used by thousands of associates. Research-driven changes to navigation, intake forms and cards cut steps and load time.",
            "Built reusable design-system patterns across enterprise applications and helped lead the team's Sketch-to-Figma transition.",
            "Partnered with research on day-in-the-life interviews and re-tested with the same users to validate improvements.",
        ]},
        {"company": "Meta", "role": "Lead Product Designer", "type": "Contract", "dates": "Jan 2023 – Apr 2023", "bullets": [
            "Designed Estrix, a net-new global threat-monitoring product combining two tools, and redesigned three safety alerting products.",
            "Turned ambiguous requirements for 24/7 global safety operations into map-based interaction models, flows and reusable components.",
        ]},
        {"company": "Phoenix Technologies", "role": "VP, Product Design & Development", "type": "Contract", "dates": "Apr 2022 – Jan 2023", "bullets": [
            "Promoted from Lead UX Designer to VP to take FirmGuard, the company's first software product (cybersecurity), to market.",
            "Hired and led the front-end design team; set design process and standards; ran daily stand-ups and weekly executive reviews.",
            "Ran an early-user program that produced hundreds of user testing panels; product sold to military and enterprise customers.",
        ]},
        {"company": "Bresatech", "role": "Lead UX Designer", "type": "Full-time", "dates": "2018 – 2022", "bullets": [
            "Led UX for healthcare, fintech and public-sector platforms (including State of Vermont), turning regulatory requirements into accessible, intuitive workflows.",
        ]},
        {"company": "Neudesic", "role": "Lead UX Designer", "type": "Full-time", "dates": "2015 – 2018", "bullets": [
            "Improved engagement by 35% through experience strategy, research-informed design and iterative improvement.",
            "Led distributed design teams across multi-industry enterprise client products.",
        ]},
        {"company": "GE Aerospace", "role": "Director, Product Design", "type": "Full-time", "dates": "2014 – 2015", "bullets": [
            "Directed product design for an aircraft operations platform, turning complex operational requirements into clear IA and workflows.",
        ]},
        {"company": "Dell", "role": "Senior UI/UX Designer", "type": "Full-time", "dates": "2012 – 2014", "bullets": [
            "Designed client-facing web and mobile products for major retail brands.",
        ]},
    ],
    "earlier": "Earlier experience: Director, Web Technology, CW33 Tribune Broadcasting (led and mentored 50+ designers and developers); Senior Web Designer, DFW International Airport.",
    "education": "B.A., Computer Science and Communications, Toronto Metropolitan University (formerly Ryerson University)",
}


def featured_cases():
    return [c for c in CASES if c["featured"]]


def knowledge_text() -> str:
    lines = [f"NAME: {PROFILE['name']} | {PROFILE['title']} | {PROFILE['location']} | contact: {PROFILE['email']}",
             f"POSITIONING: {PROFILE['headline']} {PROFILE['subline']}",
             f"AVAILABILITY: {PROFILE['availability']}",
             "ABOUT: " + ABOUT["intro"] + " " + " ".join(ABOUT["story"]) + " " + ABOUT["earlier"],
             "RESUME SUMMARY: " + RESUME["summary"],
             "SKILLS: " + ", ".join(RESUME["skills"]),
             "TOOLS: " + RESUME["tools"], "EXPERIENCE:"]
    for e in RESUME["experience"]:
        lines.append(f"- {e['company']} | {e['role']} ({e['type']}) | {e['dates']}: " + " ".join(e["bullets"]))
    lines.append(RESUME["earlier"])
    lines.append("EDUCATION: " + RESUME["education"])
    lines.append("CASE STUDIES (link format /work/<slug>):")
    for c in CASES:
        out = "; ".join(f"{o['value']} {o['label']}" + (" (unconfirmed)" if o["confirm"] else "") for o in c["outcomes"])
        lines.append(f"- [{c['client']}] slug={c['slug']} | {c['title']} | {c['role']} | {c['years']} | {c['summary']} Problem: {c['problem']} Decisions: {' '.join(c['decisions'])} Outcomes: {out} AI: {c['ai_changed']}")
    return "\n".join(lines)


def public_content():
    return {"profile": PROFILE, "tracks": TRACKS, "clients": CLIENTS, "impact": IMPACT, "process": PROCESS,
            "cases": CASES, "about": ABOUT, "resume": RESUME}
