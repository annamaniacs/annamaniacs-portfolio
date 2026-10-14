import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { ConfirmPill, Container, Cover, Eyebrow, PageLoading } from "@/components/site/Bits";
import { CtaBand } from "@/components/site/Footer";

const hasConfirm = (t) => /\[[^\]]+\]/.test(t);
const clean = (t) => t.replace(/\s*\[[^\]]+\]\s*/g, " ").trim();

const Block = ({ n, label, children, testid }) => (
  <section className="grid gap-6 border-t border-border py-12 md:grid-cols-12" data-testid={testid}>
    <div className="md:col-span-4">
      <p className="font-mono text-sm text-amber-400">{n}</p>
      <h2 className="mt-1 font-display text-3xl font-semibold">{label}</h2>
    </div>
    <div className="text-base leading-relaxed text-foreground/90 sm:text-lg md:col-span-8">{children}</div>
  </section>
);

const Meta = ({ c }) => (
  <dl className="grid grid-cols-2 gap-6 border-y border-border py-6 md:grid-cols-4">
    {[["Role", c.role], ["Years", c.years], ["Engagement", c.engagement], ["Domain", c.sector]].map(([k, v]) => (
      <div key={k}>
        <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
        <dd className="mt-1 text-sm">{v}</dd>
      </div>
    ))}
  </dl>
);

export default function CaseStudy() {
  const { slug } = useParams();
  const { data } = useContent();
  if (!data) return <PageLoading />;
  const featured = data.cases.filter((x) => x.featured);
  const idx = featured.findIndex((x) => x.slug === slug);
  if (idx < 0) return <Navigate to="/work" replace />;
  const c = featured[idx];
  const next = featured[(idx + 1) % featured.length];

  return (
    <article data-testid={`case-page-${c.slug}`}>
      <Container className="pt-14">
        <Link to="/work" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground" data-testid="case-back-link">
          <ArrowLeft className="h-3.5 w-3.5" /> All work
        </Link>
        <Eyebrow className="mt-10">{c.client}</Eyebrow>
        <h1 className="mt-4 max-w-5xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" data-testid="case-title">{c.title}</h1>
        <p className="mt-6 max-w-3xl text-muted-foreground sm:text-lg">{c.summary}</p>
        <div className="mt-10"><Meta c={c} /></div>
      </Container>

      <Container className="mt-10">
        <div className="grid gap-4 md:grid-cols-3" data-testid="case-outcomes">
          {c.outcomes.map((o, i) => (
            <div key={i} className={`rounded-md border p-6 ${o.confirm ? "border-dashed border-amber-500/50 bg-amber-500/5" : "border-border bg-card"}`} data-testid={`case-outcome-${i}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-mono text-3xl font-bold tracking-tighter sm:text-4xl">{o.value}</p>
                {o.confirm && <ConfirmPill />}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{o.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 aspect-[16/8] overflow-hidden rounded-md border border-border"><Cover c={c} /></div>
      </Container>

      <Container className="mt-10">
        <Block n="01" label="Problem" testid="case-problem">{c.problem}</Block>
        <Block n="02" label="My role" testid="case-role">{c.my_role}</Block>
        <Block n="03" label="Key decisions" testid="case-decisions">
          <ol className="space-y-5">
            {c.decisions.map((d, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr]">
                <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </Block>
        {c.gallery.length > 0 && (
          <div className="grid gap-4 pb-12 md:grid-cols-2" data-testid="case-gallery">
            {c.gallery.map((g, i) => (
              <img key={g} src={g} alt={`${c.client} work sample ${i + 1}`} loading="lazy" className={`w-full rounded-md border border-border object-cover ${i === 0 ? "md:col-span-2" : ""}`} />
            ))}
          </div>
        )}
        <Block n="04" label="What AI changed" testid="case-ai">
          <div className="rounded-md border border-sky-400/30 bg-sky-400/5 p-6">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-sky-400"><Sparkles className="h-3.5 w-3.5" /> AI & this work {hasConfirm(c.ai_changed) && <ConfirmPill />}</p>
            <p className="mt-3">{clean(c.ai_changed)}</p>
          </div>
        </Block>
        <Block n="05" label="Tools" testid="case-tools"><p className="font-mono text-sm text-muted-foreground">{c.tools}</p></Block>
      </Container>

      <Link to={`/work/${next.slug}`} className="group block border-t border-border" data-testid="case-next-link">
        <Container className="flex items-center justify-between py-14">
          <div>
            <p className="eyebrow">Next case</p>
            <p className="mt-3 font-display text-3xl font-semibold transition-colors group-hover:text-amber-400 sm:text-4xl">{next.client}: {next.title}</p>
          </div>
          <ArrowRight className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </Container>
      </Link>
      <CtaBand />
    </article>
  );
}
