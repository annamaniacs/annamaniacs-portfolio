import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Sparkles, Download } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { API, openAskAI } from "@/lib/api";
import { Container } from "./Bits";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/match", label: "Match a role" },
  { to: "/contact", label: "Contact" },
];

const navCls = ({ isActive }) =>
  `text-sm transition-colors duration-200 hover:text-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl" data-testid="site-header">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="group flex items-baseline gap-3" data-testid="brand-home-link">
          <span className="font-display text-2xl font-semibold tracking-tight">Anna Cheng</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:inline">Principal Product Designer</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navCls} data-testid={`nav-${l.to.slice(1)}-link`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`${API}/resume.pdf`}
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors duration-200 hover:border-amber-500 hover:text-amber-400 lg:inline-flex"
            data-testid="header-download-resume-btn"
          >
            <Download className="h-4 w-4" /> Resume PDF
          </a>
          <button
            onClick={() => openAskAI()}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-background transition-colors duration-200 hover:bg-amber-400"
            data-testid="header-ask-ai-btn"
          >
            <Sparkles className="h-4 w-4" /> Ask my AI
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2 md:hidden" data-testid="mobile-menu-btn" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="font-display text-2xl">Anna Cheng</SheetTitle>
              <div className="mt-8 flex flex-col gap-5">
                {LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="font-display text-3xl" data-testid={`mobile-nav-${l.to.slice(1)}-link`}>
                    {l.label}
                  </Link>
                ))}
                <a href={`${API}/resume.pdf`} className="eyebrow mt-4" data-testid="mobile-download-resume-link">Download resume PDF</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
};
