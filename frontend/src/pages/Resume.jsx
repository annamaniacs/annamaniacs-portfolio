import { Download } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Container, Eyebrow, PageLoading } from "@/components/site/Bits";
import { API } from "@/lib/api";

const H = ({ children }) => <h2 className="mt-8 border-b border-[#E5E3DD] pb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#B45309]">{children}</h2>;

const Job = ({ e }) => (
  <div className="mt-5" data-testid="resume-job">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <p className="font-semibold text-[#111827]">
        {e.company} <span className="font-normal text-[#4B5563]">· {e.role}</span>
        {e.type === "Contract" && <span className="ml-2 rounded border border-[#D1CEC5] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#4B5563]">Contract</span>}
      </p>
      <p className="font-mono text-xs text-[#4B5563]">{e.dates}</p>
    </div>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#1f2937]">
      {e.bullets.map((b) => <li key={b}>{b}</li>)}
    </ul>
  </div>
);

export default function Resume() {
  const { data } = useContent();
  if (!data) return <PageLoading />;
  const r = data.resume;
  return (
    <div data-testid="resume-page">
      <Container className="flex flex-col gap-6 pb-10 pt-20 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Resume</Eyebrow>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">The short version.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">A one-column, ATS-friendly PDF. It reads the same in an applicant tracking system as it does to a person.</p>
        </div>
        <a href={`${API}/resume.pdf`} className="inline-flex items-center gap-2 self-start rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 md:self-auto" data-testid="resume-download-pdf-btn">
          <Download className="h-4 w-4" /> Download PDF
        </a>
      </Container>
      <Container className="pb-24">
        <div className="print-area mx-auto max-w-4xl rounded-md bg-[#F9F8F6] p-8 font-sans text-[#111827] shadow-2xl sm:p-14" data-testid="resume-sheet">
          <h2 className="font-display text-5xl font-semibold tracking-tight">Anna Cheng</h2>
          <p className="mt-2 text-sm font-medium text-[#B45309]">{r.headline}</p>
          <p className="mt-1 text-xs text-[#4B5563]">{r.contact}</p>
          <H>Summary</H>
          <p className="mt-3 text-sm leading-relaxed">{r.summary}</p>
          <H>Core skills</H>
          <p className="mt-3 text-sm leading-relaxed">{r.skills.join(" · ")}</p>
          <H>Experience</H>
          {r.experience.map((e) => <Job key={e.company + e.dates} e={e} />)}
          <p className="mt-5 text-sm text-[#4B5563]">{r.earlier}</p>
          <H>Tools</H>
          <p className="mt-3 text-sm">{r.tools}</p>
          <H>Education</H>
          <p className="mt-3 text-sm">{r.education}</p>
        </div>
      </Container>
    </div>
  );
}
