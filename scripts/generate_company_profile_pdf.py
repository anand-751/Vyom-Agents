from pathlib import Path
from textwrap import wrap


PAGE_WIDTH = 612
PAGE_HEIGHT = 792
MARGIN = 54
CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2)


def pdf_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


class PdfDocument:
    def __init__(self, output_path: Path):
        self.output_path = output_path
        self.pages = []
        self.current = []
        self.page_number = 0
        self.start_page()

    def start_page(self):
        if self.current:
            self.finish_page()
        self.page_number += 1
        self.current = []
        self.y = PAGE_HEIGHT - MARGIN
        self.add_text("VYOM AGENTS  /  COMPANY PROFILE", MARGIN, PAGE_HEIGHT - 34, 8, "#667085")
        self.add_line(MARGIN, PAGE_HEIGHT - 43, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 43, "#D9E2EC", 0.7)

    def finish_page(self):
        self.add_line(MARGIN, 37, PAGE_WIDTH - MARGIN, 37, "#D9E2EC", 0.7)
        self.add_text("Vyom Autonomous Intelligence  |  vyom-agents.vercel.app", MARGIN, 23, 8, "#667085")
        self.add_text(f"{self.page_number:02d}", PAGE_WIDTH - MARGIN - 16, 23, 8, "#667085")
        self.pages.append("\n".join(self.current))
        self.current = []

    def add_raw(self, command: str):
        self.current.append(command)

    def add_line(self, x1, y1, x2, y2, color="#D9E2EC", width=1):
        self.add_raw(f"{color_to_rgb(color)} RG {width} w {x1} {y1} m {x2} {y2} l S")

    def add_rect(self, x, y, width, height, fill):
        self.add_raw(f"{color_to_rgb(fill)} rg {x} {y} {width} {height} re f")

    def add_text(self, text, x, y, size=10, color="#172B4D", font="F1"):
        self.add_raw(f"BT /{font} {size} Tf {color_to_rgb(color)} rg {x:.2f} {y:.2f} Td ({pdf_escape(text)}) Tj ET")

    def add_paragraph(self, text, size=10, leading=14, color="#344054", font="F1", width=CONTENT_WIDTH, gap=5):
        lines = wrap(text, max(1, int(width / (size * 0.49))))
        for line in lines:
            self.ensure_space(leading)
            self.add_text(line, MARGIN, self.y, size, color, font)
            self.y -= leading
        self.y -= gap

    def add_bullets(self, items, size=9.5, leading=13, gap=4):
        for item in items:
            lines = wrap(item, max(1, int((CONTENT_WIDTH - 18) / (size * 0.49))))
            self.ensure_space(leading * len(lines) + gap)
            self.add_text("-", MARGIN + 2, self.y, size, "#13A8A8", "F2")
            self.add_text(lines[0], MARGIN + 17, self.y, size, "#344054")
            self.y -= leading
            for line in lines[1:]:
                self.add_text(line, MARGIN + 17, self.y, size, "#344054")
                self.y -= leading
            self.y -= gap

    def add_heading(self, text, level=1):
        size = 18 if level == 1 else 12
        color = "#172B4D" if level == 1 else "#0B7777"
        gap = 10 if level == 1 else 5
        self.ensure_space(size + 22)
        self.add_text(text, MARGIN, self.y, size, color, "F2")
        self.y -= size + gap

    def add_label(self, text):
        self.ensure_space(18)
        self.add_text(text.upper(), MARGIN, self.y, 8, "#13A8A8", "F2")
        self.y -= 14

    def add_stat_row(self, stats):
        box_width = CONTENT_WIDTH / len(stats)
        self.ensure_space(74)
        top = self.y
        for index, (value, label) in enumerate(stats):
            x = MARGIN + index * box_width
            self.add_rect(x, top - 57, box_width - 7, 57, "#F1F8F8")
            self.add_text(value, x + 10, top - 22, 17, "#0B7777", "F2")
            for line_index, line in enumerate(wrap(label, 25)[:2]):
                self.add_text(line, x + 10, top - 39 - (line_index * 10), 7.5, "#475467")
        self.y = top - 72

    def ensure_space(self, needed):
        if self.y - needed < 58:
            self.start_page()

    def cover(self):
        self.add_rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "#F7FBFB")
        self.add_rect(0, PAGE_HEIGHT - 240, PAGE_WIDTH, 240, "#0B7777")
        self.add_text("VYOM", MARGIN, PAGE_HEIGHT - 86, 34, "#FFFFFF", "F2")
        self.add_text("AUTONOMOUS INTELLIGENCE", MARGIN, PAGE_HEIGHT - 111, 11, "#B9F0ED", "F2")
        self.add_text("Enterprise Company Profile", MARGIN, PAGE_HEIGHT - 205, 26, "#FFFFFF", "F2")
        self.add_text("Agentic AI products, autonomous workflows, and enterprise software", MARGIN, PAGE_HEIGHT - 224, 10, "#D7F7F4")
        self.y = PAGE_HEIGHT - 302
        self.add_label("Company at a glance")
        self.add_paragraph("Vyom Agents architects intelligent agentic AI ecosystems and enterprise automation products that transform complex operations into deterministic, 24/7 self-executing workflows.", 14, 20, "#172B4D", "F2", gap=16)
        self.add_stat_row([
            ("Real-Time", "Voice response flow"),
            ("99.4%", "Multi-step task accuracy"),
            ("10x", "Operational throughput"),
            ("100%", "Deterministic tool safety"),
        ])
        self.add_heading("Core thesis", 2)
        self.add_paragraph("Beyond Automations. Deploy Autonomous AI Workforce Today.", 13, 18, "#0B7777", "F2", gap=16)
        self.add_heading("Company details", 2)
        self.add_bullets([
            "Canonical website: https://vyom-agents.vercel.app",
            "Security posture: SOC-2 Type II, HIPAA PHI compliant, GDPR compliant, zero data retention",
            "Delivery promise: live telephony prototype within 48 hours under mutual NDA",
            "IP ownership: clients retain ownership of delivered code, configurations, and fine-tuned models",
        ], 9.5, 13, 3)

    def build(self):
        self.cover()

        self.start_page()
        self.add_label("01 / Positioning")
        self.add_heading("Why Vyom exists")
        self.add_paragraph("Legacy workflow tools depend on brittle rules, fixed API assumptions, and fragile XPath or CSS selectors. When a UI moves, an API schema changes, or an edge case appears, the automation often fails and waits for human repair.")
        self.add_paragraph("Vyom replaces that model with sovereign, multi-agent systems that reason over changing environments, call tools dynamically, verify intermediate outcomes, and self-heal when interfaces drift.")
        self.add_heading("The Vyom paradigm", 2)
        self.add_bullets([
            "Self-evaluating reasoning loops that plan, execute, inspect, and recover.",
            "Dynamic tool calling with strict schema validation and error fallbacks.",
            "Visual and semantic understanding of text, audio, PDFs, and graphical interfaces.",
            "Sandboxed execution harnesses and role-based policy guardrails for safe autonomy.",
            "Continuous 24/7 execution designed for measurable operational throughput.",
        ])
        self.add_heading("Primary markets", 2)
        self.add_paragraph("Healthcare and dental clinics; legal firms; real estate and multi-location service businesses; logistics and supply chain; financial services; accounting and wealth management; B2B SaaS, e-commerce, and technology enterprises.")
        self.add_heading("Trust signals", 2)
        self.add_stat_row([
            ("45+", "Voice languages"),
            ("15+", "Concurrent calls per line"),
            ("99.8%", "Auto-healed RPA recovery"),
            ("48h", "Prototype SLA"),
        ])

        self.start_page()
        self.add_label("02 / Live product")
        self.add_heading("AI Voice Receptionist")
        self.add_paragraph("Vyom's flagship enterprise product provides 24/7 inbound reception, multi-provider triage, appointment scheduling, lead qualification, and intelligent outbound patient or client campaigns.")
        self.add_stat_row([
            ("Real-Time", "Conversational audio stream"),
            ("+42%", "Appointment booking conversion"),
            ("100%", "After-hours calls answered"),
        ])
        self.add_heading("Capabilities", 2)
        self.add_bullets([
            "Natural interruptions: the agent stops speaking immediately and adjusts context without stuttering.",
            "Bidirectional calendar, EHR, CRM, and custom SQL synchronization.",
            "Native fluency in 45+ languages, including English, Hindi, Hinglish, Spanish, French, German, and Mandarin.",
            "Telephony integrations across Twilio, Asterisk, SIP trunks, and WebRTC.",
            "15+ concurrent calls per business line with zero hold times.",
            "SOC-2 Type II infrastructure, HIPAA-compliant PHI routing, and TLS 1.3 audio encryption.",
        ])
        self.add_heading("Key integrations", 2)
        self.add_paragraph("Google Calendar, Microsoft Outlook, Cal.com, Dentrix, Epic, AthenaHealth, Salesforce, HubSpot, custom SQL databases, Twilio, Asterisk, SIP trunks, and WebRTC.")
        self.add_heading("Business impact", 2)
        self.add_bullets([
            "Eliminates missed after-hours calls and preserves demand outside office hours.",
            "Can replace up to three receptionist phone-desk shifts, or approximately 120 manual phone hours per month.",
            "Designed for clinics, legal intake, real estate inquiries, dispatch, customer support, and inbound demo scheduling.",
        ])

        self.start_page()
        self.add_label("03 / Proprietary product")
        self.add_heading("Autonomous Workflow Orchestrator")
        self.add_paragraph("A next-generation self-healing RPA engine for browser and desktop workflows. It is designed to replace brittle legacy scripts with visual state understanding, semantic selector recovery, and embedded compliance verification.")
        self.add_stat_row([
            ("99.8%", "Auto-healed recovery uptime"),
            ("180+", "Manual hours saved per month"),
            ("300%", "Resilience improvement vs legacy"),
        ])
        self.add_heading("Technical architecture", 2)
        self.add_bullets([
            "Visual neural embeddings and Playwright inspect DOM hierarchies without depending on fragile selectors.",
            "Semantic vector likeness identifies replacement targets when portals, ERP screens, or CRM layouts change.",
            "An embedded AI compliance and audit agent verifies documents, invoices, cryptographic tokens, and state transitions.",
            "Sandboxed execution harnesses test actions before production database mutations.",
            "Multi-agent orchestration supports contract processing, ERP reconciliation, and other complex workflows.",
        ])
        self.add_heading("Stealth R&D pipeline", 2)
        self.add_bullets([
            "Vyom Finance Agent: accounts payable, 3-way purchase order matching, invoice reconciliation, and ledger verification.",
            "Vyom Finance Workforce: payroll validation, cash-flow forecasting, anomaly detection, and financial operations.",
            "Vyom Lawsuit: contract analysis, discovery audit, clause risk scoring, and regulatory verification.",
            "Vyom PolicyLens: live analysis of SaaS terms, privacy policies, and compliance changes.",
            "Vyom SafeBrowse: secure browsing, DLP enforcement, DOM sandboxing, and malicious payload blocking.",
        ])
        self.add_paragraph("Status: waitlist-only and undergoing SOC-2 compliance sealing.", 9.5, 13, "#0B7777", "F2")

        self.start_page()
        self.add_label("04 / Autonomous growth loop")
        self.add_heading("The Vyom AI ecosystem")
        self.add_paragraph("Vyom connects customer conversations, operational systems, reputation signals, and AI search visibility into a continuous growth flywheel.")
        ecosystem = [
            ("01", "AI Voice Agent", "Converses with callers, qualifies leads, books appointments, and routes high-intent demand."),
            ("02", "Custom CRM / Web / Desktop Apps", "Logs transactions, synchronizes operational data, and passes completed service records forward."),
            ("03", "Google Review AI Agent", "Triggers personalized SMS or WhatsApp follow-ups, intercepts dissatisfaction, and harvests stronger reviews."),
            ("04", "AIEO", "Uses review momentum and Knowledge Graph schemas to improve recommendations in ChatGPT, Perplexity, and Gemini."),
        ]
        for number, title, description in ecosystem:
            self.ensure_space(78)
            self.add_rect(MARGIN, self.y - 52, 38, 38, "#0B7777")
            self.add_text(number, MARGIN + 9, self.y - 37, 12, "#FFFFFF", "F2")
            self.add_text(title, MARGIN + 52, self.y - 22, 12, "#172B4D", "F2")
            lines = wrap(description, 82)
            for offset, line in enumerate(lines[:2]):
                self.add_text(line, MARGIN + 52, self.y - 39 - offset * 12, 9, "#475467")
            self.y -= 70
        self.add_heading("Infinite loop", 2)
        self.add_paragraph("High-intent buyer inquiries flow back into the voice agent, creating an autonomous revenue engine with compounding operational and search visibility gains.")
        self.add_heading("Expected outcomes", 2)
        self.add_bullets([
            "+42% appointment booking conversion benchmark for the voice agent.",
            "+300% five-star review acquisition benchmark through automated follow-up.",
            "+310% AI buyer recommendation benchmark through AIEO programs.",
            "Zero incremental ad spend required for the flywheel to keep improving once the operational data loop is active.",
        ])

        self.start_page()
        self.add_label("05 / Pricing")
        self.add_heading("AI Receptionist plans")
        self.add_paragraph("Pricing is transparent and has no hidden setup fees. Direct carrier telephony is available as an add-on within each tier.")
        plans = [
            ("Starter", "INR 14,999 / month web voice; INR 17,499 with telephony", ["Up to 400 verified calls per month", "1-2 provider or doctor routing", "Hindi, Hinglish, and English", "Clinic knowledge base integration"]),
            ("Professional", "INR 23,999 / month web voice; INR 26,499 with telephony", ["Up to 700 verified calls per month", "Up to 5 doctor or provider routing", "Rescheduling workflows", "Call recording and real-time analytics"]),
            ("Enterprise", "INR 33,990 / month web voice; INR 36,490 with telephony", ["1,000+ calls per month; scalable to 2,500+", "10-15+ doctors and multi-department triage", "Custom CRM connectors", "Dedicated solutions architect and 24/7 priority SLA"]),
        ]
        for title, price, benefits in plans:
            self.ensure_space(128)
            self.add_rect(MARGIN, self.y - 108, CONTENT_WIDTH, 108, "#F1F8F8")
            self.add_text(title, MARGIN + 14, self.y - 22, 13, "#172B4D", "F2")
            self.add_text(price, MARGIN + 14, self.y - 40, 9, "#0B7777", "F2")
            for idx, benefit in enumerate(benefits):
                self.add_text("- " + benefit, MARGIN + 14, self.y - 59 - idx * 12, 8.5, "#475467")
            self.y -= 122
        self.add_heading("ROI benchmark", 2)
        self.add_paragraph("A human receptionist desk operating 24/7 across three rotating shifts can cost approximately INR 75,000-120,000 per month. Vyom is benchmarked at 4.2x-7.8x net ROI in the first 30 days by reducing direct labor overhead and recovering calls that would otherwise be lost after hours.")

        self.start_page()
        self.add_label("06 / Services")
        self.add_heading("Enterprise engineering services")
        services = [
            ("01", "Self-Healing RPA & UI Automation", "Visual automation with Playwright and vision models; 99.8% auto-healed uptime."),
            ("02", "Multiagent Systems", "Supervisor-worker swarms for complex planning, execution, evaluation, and verification."),
            ("03", "Agent to Agent (A2A) Protocols", "Secure peer-to-peer agent meshes and standardized JSON-RPC coordination."),
            ("04", "Custom CRM & ERP Software", "Bespoke operational dashboards, data pipelines, and native agent connectors."),
            ("05", "Websites & Web Applications", "High-performance web platforms with conversational voice and telemetry."),
            ("06", "AIEO", "Knowledge Graph structuring and schema injection for AI search visibility."),
            ("07", "Enterprise RAG Chatbots", "Hybrid vector search, reranking, and contextual memory for internal knowledge."),
        ]
        for code, title, description in services:
            self.ensure_space(54)
            self.add_text(code, MARGIN, self.y, 9, "#13A8A8", "F2")
            self.add_text(title, MARGIN + 30, self.y, 11, "#172B4D", "F2")
            self.y -= 15
            self.add_paragraph(description, 9, 12, "#475467", "F1", width=CONTENT_WIDTH - 30, gap=5)
        self.add_heading("Representative technology", 2)
        self.add_paragraph("Next.js, React, TypeScript, Python, Playwright, LangGraph, CrewAI, Temporal.io, OpenAPI, JSON Schema, Model Context Protocol (MCP), Pinecone, Qdrant, ChromaDB, FAISS, Weaviate, pgvector, Redis, Claude, GPT-4o, Gemini, Groq, LangSmith, Langfuse, Ragas, DeepEval, Salesforce, HubSpot, SAP S/4HANA, QuickBooks, Twilio, WebRTC, and Google Workspace.")

        self.start_page()
        self.add_label("07 / Security and delivery")
        self.add_heading("Built for controlled autonomy")
        self.add_bullets([
            "Harness engineering: every agent process runs inside a sandboxed test harness that evaluates state transitions before production changes.",
            "Deterministic guardrails: strict input and output schemas, policy boundaries, rollback logic, and runtime verification.",
            "Zero data retention: ephemeral execution memory means proprietary client IP and customer data are not stored or used to train public models.",
            "Certified compliance posture: SOC-2 Type II infrastructure, HIPAA-compliant healthcare appointment routing, GDPR compliance, and 256-bit TLS encryption.",
            "Role-based access control: granular permissions prevent agents from acting outside approved scopes.",
        ])
        self.add_heading("Discovery to production", 2)
        self.add_stat_row([
            ("30 min", "Architectural discovery call"),
            ("48 hrs", "Live telephony prototype"),
            ("2-4 wks", "Production pilot sprint"),
        ])
        self.add_bullets([
            "Discovery: architectural audit, use-case mapping, and live proof-of-concept demonstration.",
            "Prototype: telephony or workflow prototype delivered within 48 hours under mutual NDA.",
            "Sprint: architecture review through production pilot in approximately two to four weeks.",
            "Ownership: client receives ownership of delivered code, configurations, and fine-tuned models.",
        ])
        self.add_heading("Engagement fit", 2)
        self.add_paragraph("Vyom is a strong fit when a business needs reliable automation across changing interfaces, wants to reduce repetitive operational labor, or needs an AI workforce with clear safety boundaries and measurable business outcomes.")

        self.start_page()
        self.add_label("08 / Industry solutions")
        self.add_heading("Vertical solution blueprint")
        verticals = [
            ("Healthcare, Dental & Medical", "24/7 patient calls, HIPAA-compliant booking, Dentrix/Epic/AthenaHealth integration, WhatsApp reminders, and AIEO for local discovery."),
            ("Legal & Law Practices", "Client intake, conflict screening, consultation scheduling, court-portal evidence extraction, and custom legal CRM."),
            ("Real Estate & Property", "Buyer and tenant inquiries, showing appointments, MLS listing automation, review harvesting, and local search visibility."),
            ("Finance, Accounting & Wealth", "Client onboarding, tax-season triage, ERP platforms, ledger reconciliation, BI dashboards, and financial agent swarms."),
            ("Logistics, Supply Chain & Field Services", "Driver dispatch, emergency routing, shipment status triage, bills of lading, and freight reconciliation."),
            ("B2B SaaS, E-Commerce & Tech", "Demo scheduling, VIP support escalation, A2A protocols, collaborative swarms, web applications, and AIEO."),
        ]
        for title, description in verticals:
            self.ensure_space(62)
            self.add_text(title, MARGIN, self.y, 11, "#172B4D", "F2")
            self.y -= 16
            self.add_paragraph(description, 9, 12, "#475467", "F1", gap=5)
        self.add_heading("Contact and next step", 2)
        self.add_paragraph("Start with a 30-minute discovery call to map one high-value workflow, identify the integration surface, and define a measurable pilot. The live website is the primary engagement point: https://vyom-agents.vercel.app")
        self.add_rect(MARGIN, self.y - 70, CONTENT_WIDTH, 70, "#0B7777")
        self.add_text("VYOM AGENTS", MARGIN + 16, self.y - 26, 15, "#FFFFFF", "F2")
        self.add_text("Beyond Automations. Deploy Autonomous AI Workforce Today.", MARGIN + 16, self.y - 47, 9, "#D7F7F4")
        self.y -= 90
        self.add_text("Prepared from the Vyom Agents enterprise company knowledge base.", MARGIN, self.y, 8, "#667085")

        self.finish_page()
        write_pdf(self.output_path, self.pages)


def color_to_rgb(color):
    color = color.lstrip("#")
    return " ".join(str(round(int(color[index:index + 2], 16) / 255, 4)) for index in (0, 2, 4))


def write_pdf(output_path: Path, page_streams):
    objects = []
    objects.append("<< /Type /Catalog /Pages 2 0 R >>")
    page_object_ids = []
    font_regular_id = 3
    font_bold_id = 4
    next_id = 5
    for stream in page_streams:
        content = stream.encode("latin-1", "replace")
        content_id = next_id
        next_id += 1
        page_id = next_id
        next_id += 1
        objects.append(f"<< /Length {len(content)} >>\nstream\n{stream}\nendstream")
        objects.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] /Resources << /Font << /F1 {font_regular_id} 0 R /F2 {font_bold_id} 0 R >> >> /Contents {content_id} 0 R >>")
        page_object_ids.append(page_id)
    objects.insert(1, f"<< /Type /Pages /Kids [{' '.join(f'{page_id} 0 R' for page_id in page_object_ids)}] /Count {len(page_object_ids)} >>")
    objects.extend([
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    ])
    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for index, obj in enumerate(objects, 1):
        offsets.append(len(output))
        output.extend(f"{index} 0 obj\n{obj}\nendobj\n".encode("latin-1"))
    xref_offset = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode("ascii"))
    for offset in offsets[1:]:
        output.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    output.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode("ascii"))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(output)


if __name__ == "__main__":
    PdfDocument(Path(__file__).resolve().parents[1] / "public" / "vyom-agents-company-profile.pdf").build()