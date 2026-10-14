import { useContent } from "@/hooks/useContent";
import { Container, Eyebrow, PageLoading } from "@/components/site/Bits";
import { CtaBand } from "@/components/site/Footer";

export default function About() {
  const { data } = useContent();
  if (!data) return <PageLoading />;
  const a = data.about;
  return (
    <div data-testid="about-page">
      <Container className="grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="grid-lines relative flex aspect-[4/5] items-end rounded-md border border-border bg-card p-6" data-testid="about-portrait-frame">
            <span className="font-display text-[9rem] font-semibold leading-none text-amber-500/90">AC</span>
            <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Denver, CO</span>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{a.intro}</h1>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85 sm:text-lg">
            {a.story.map((s, i) => <p key={i}>{s}</p>)}
          </div>
          <p className="mt-8 border-l-2 border-border pl-4 text-sm text-muted-foreground" data-testid="about-earlier">{a.earlier}</p>
          <p className="mt-3 border-l-2 border-border pl-4 text-sm text-muted-foreground">{a.education}</p>
        </div>
      </Container>
      <section className="border-t border-border py-20">
        <Container>
          <Eyebrow>Principles</Eyebrow>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {a.principles.map((p, i) => (
              <div key={p.title} className="bg-background p-8" data-testid={`about-principle-${i}`}>
                <p className="font-mono text-sm text-amber-400">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </div>
  );
}
