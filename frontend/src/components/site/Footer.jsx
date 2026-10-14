import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { API } from "@/lib/api";
import { Container } from "./Bits";

export const CtaBand = () => (
  <section className="border-t border-border bg-amber-500 text-background" data-testid="cta-band">
    <Container className="grid gap-8 py-16 md:grid-cols-12 md:items-end">
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:col-span-8">
        Hiring for a complex or AI-powered product? Let's talk.
      </h2>
      <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5" data-testid="cta-contact-btn">
          Contact Anna <ArrowUpRight className="h-4 w-4" />
        </Link>
        <a href={`${API}/resume.pdf`} className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-background/10" data-testid="cta-download-resume-btn">
          Download resume
        </a>
      </div>
    </Container>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-border" data-testid="site-footer">
    <Container className="flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div>
        <span className="font-display text-xl text-foreground">Anna Cheng</span>
        <span className="ml-3 font-mono text-[11px] uppercase tracking-widest">Denver, CO · Remote-friendly</span>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <a href="mailto:anna@annamaniacs.com" className="hover:text-foreground" data-testid="footer-email-link">anna@annamaniacs.com</a>
        <Link to="/match" className="hover:text-foreground" data-testid="footer-match-link">Match a role</Link>
        <Link to="/login" className="font-mono text-[11px] uppercase tracking-widest hover:text-foreground" data-testid="footer-owner-login-link">Owner</Link>
      </div>
    </Container>
  </footer>
);
