import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Container, Eyebrow, PageLoading, SectionHead } from "@/components/site/Bits";
import { CaseRow } from "@/components/site/CaseCards";
import { CtaBand } from "@/components/site/Footer";
import { API, openAskAI } from "@/lib/api";

const Hero = ({ p }) => (
  <section className="relative overflow-hidden border-b border-border" data-testid="home-hero">
    <div className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    <Container className="relative grid gap-12 pb-20 pt-20 lg:grid-cols-12 lg:pb-28 lg:pt-28">
      <div className="lg:col-span-8">
        <p className="eyebrow reveal">{p.title} · {p.tagline}</p>
        <h1 className="reveal mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.25rem]" style={{ animationDelay: "80ms" }} data-testid="home-hero-headline">
          I make complex, high-stakes products clear, <em className="italic text-amber-400">including the AI inside them.</em>
        </h1>
        <p className="reveal mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "160ms" }}>{p.subline}</p>
        <div className="reveal mt-10 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
          <Link to="/work" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5" data-testid="hero-view-work-btn">
            View selected work <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={`${API}/resume.pdf`} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-amber-500 hover:text-amber-400" data-testid="hero-download-resume-btn">
            Download resume
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground" data-testid="hero-contact-link">
            Contact <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <aside className="reveal self-end rounded-md border border-border bg-card/70 p-6 backdrop-blur lg:col-span-4" style={{ animationDelay: "320ms" }} data-testid="hero-status-card">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available now
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">{p.availability}</p>
        <div className="mt-6 space-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <p>[Base :: {p.location}]</p>
          <p>[Domains :: Fintech · Safety · Cybersecurity · Enterprise]</p>
        </div>
        <button onClick={() => openAskAI()} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-400/50 px-4 py-2.5 text-sm text-sky-300 transition-colors duration-200 hover:bg-sky-400/10" data-testid="hero-ask-ai-btn">
          <Sparkles className="h-4 w-4" /> Ask my AI about my experience
        </button>
      </aside>
    </Container>
  </section>
);

const Impact = ({ items }) => (
  <section className="border-b border-border" data-testid="impact-strip">
    <Container className="grid grid-cols-2 md:grid-cols-5">
      {items.map((m, i) => (
        <div key={m.label} className={`py-10 pr-4 ${i ? "md:border-l md:border-border md:pl-6" : ""}`} data-testid={`impact-metric-${i}`}>
          <p className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">{m.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </Container>
  </section>
);

const Clients = ({ list }) => (
  <section className="overflow-hidden border-b border-border py-8" data-testid="client-strip">
    <div className="marquee flex w-max gap-14 whitespace-nowrap">
      {[...list, ...list].map((c, i) => (
        <span key={i} className="font-display text-2xl text-muted-foreground/80 sm:text-3xl">{c}</span>
      ))}
    </div>
  </section>
);

const Tracks = ({ tracks, cases }) => (
  <section className="py-24 lg:py-32" data-testid="tracks-section">
    <Container>
      <SectionHead eyebrow="Ways I work" title="One designer, three ways to hire her.">
        Each track links to the case studies that prove it.
      </SectionHead>
      <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
        {tracks.map((t, i) => (
          <Link key={t.id} to={`/work?track=${t.id}`} className="group flex flex-col bg-background p-8 transition-colors duration-200 hover:bg-card" data-testid={`track-card-${t.id}`}>
            <span className="font-mono text-sm text-amber-400">0{i + 1}</span>
            <h3 className="mt-6 font-display text-3xl font-semibold">{t.name}</h3>
            <p className="mt-3 text-muted-foreground">{t.pitch}</p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/85">
              {t.proof.map((p) => <li key={p} className="border-l border-amber-500/60 pl-3">{p}</li>)}
            </ul>
            <p className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
              Proof: {t.cases.map((s) => cases.find((c) => c.slug === s)?.client).join(" · ")} →
            </p>
          </Link>
        ))}
      </div>
    </Container>
  </section>
);

const Process = ({ phases }) => (
  <section className="border-t border-border py-24" data-testid="process-section">
    <Container>
      <SectionHead eyebrow="How I work" title="Frame. Shape. Prove.">
        A product-design process, with AI speeding up each step and people making the calls.
      </SectionHead>
      <div className="grid gap-8 md:grid-cols-3">
        {phases.map((ph, i) => (
          <div key={ph.phase} className="border-t-2 border-amber-500 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Phase 0{i + 1}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold">{ph.phase}</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">{ph.steps.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const MatchTeaser = () => (
  <section className="border-t border-border bg-card/40 py-20" data-testid="match-teaser">
    <Container className="grid gap-8 md:grid-cols-12 md:items-center">
      <div className="md:col-span-7">
        <Eyebrow className="!text-sky-400">For recruiters</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Paste your job post. See where Anna fits in 20 seconds.</h2>
      </div>
      <div className="md:col-span-5 md:text-right">
        <Link to="/match" className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5" data-testid="home-match-cta-btn">
          Match a role <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  </section>
);

export default function Home() {
  const { data } = useContent();
  if (!data) return <PageLoading />;
  const featured = data.cases.filter((c) => c.featured);
  return (
    <div data-testid="home-page">
      <Hero p={data.profile} />
      <Impact items={data.impact} />
      <Clients list={data.clients} />
      <Tracks tracks={data.tracks} cases={data.cases} />
      <section className="pb-24" data-testid="featured-section">
        <Container>
          <SectionHead eyebrow="Selected work" title="Five products where clarity was the hard part." />
          {featured.map((c, i) => <CaseRow key={c.slug} c={c} i={i} />)}
          <Link to="/work" className="mt-6 inline-flex items-center gap-2 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground" data-testid="home-all-work-link">
            More work: GE Aerospace, Dell, State of Vermont, Ulta <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Container>
      </section>
      <Process phases={data.process} />
      <MatchTeaser />
      <CtaBand />
    </div>
  );
}
