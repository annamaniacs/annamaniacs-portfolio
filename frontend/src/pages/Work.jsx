import { useSearchParams } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { Container, Eyebrow, PageLoading } from "@/components/site/Bits";
import { CaseRow, MiniCard } from "@/components/site/CaseCards";
import { CtaBand } from "@/components/site/Footer";

export default function Work() {
  const { data } = useContent();
  const [params, setParams] = useSearchParams();
  if (!data) return <PageLoading />;
  const track = params.get("track");
  const active = data.tracks.find((t) => t.id === track);
  const featured = data.cases.filter((c) => c.featured && (!active || active.cases.includes(c.slug)));
  const more = data.cases.filter((c) => !c.featured);

  const chip = (id, label) => (
    <button
      key={id || "all"}
      onClick={() => setParams(id ? { track: id } : {})}
      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${track === id || (!track && !id) ? "border-amber-500 bg-amber-500 text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
      data-testid={`work-filter-${id || "all"}`}
    >
      {label}
    </button>
  );

  return (
    <div data-testid="work-page">
      <Container className="pb-10 pt-20">
        <Eyebrow>Work</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {active ? active.name : "Case studies"}
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
          {active ? active.pitch : "Each one follows the same format: problem, my role, key decisions, outcome and what AI changed."}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {chip(null, "All")}
          {data.tracks.map((t) => chip(t.id, t.name))}
        </div>
      </Container>
      <Container className="pb-20">
        {featured.map((c, i) => <CaseRow key={c.slug} c={c} i={i} />)}
      </Container>
      <section className="border-t border-border py-20" data-testid="more-work-section">
        <Container>
          <Eyebrow>More work</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Range across aviation, retail and the public sector</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((c) => <MiniCard key={c.slug} c={c} />)}
          </div>
        </Container>
      </section>
      <CtaBand />
    </div>
  );
}
