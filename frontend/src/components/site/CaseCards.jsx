import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Cover } from "./Bits";

export const CaseRow = ({ c, i }) => (
  <Link
    to={`/work/${c.slug}`}
    className="reveal group grid gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-10"
    style={{ animationDelay: `${i * 80}ms` }}
    data-testid={`case-row-${c.slug}`}
  >
    <div className="md:col-span-1">
      <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
    </div>
    <div className="flex flex-col justify-between gap-6 md:col-span-5">
      <div>
        <p className="eyebrow">{c.client} · {c.role}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight transition-colors duration-200 group-hover:text-amber-400 sm:text-4xl">{c.title}</h3>
        <p className="mt-4 text-muted-foreground">{c.summary}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>{c.years}</span>
        <span>{c.sector}</span>
        {c.engagement === "Contract" && <span>Contract</span>}
        <span className="inline-flex items-center gap-1 text-foreground">Read case <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
      </div>
    </div>
    <div className="aspect-[16/10] overflow-hidden rounded-md border border-border md:col-span-6">
      <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
        <Cover c={c} />
      </div>
    </div>
  </Link>
);

export const MiniCard = ({ c }) => (
  <div className="rounded-md border border-border bg-card transition-colors duration-200 hover:border-[#3F4452]" data-testid={`more-work-card-${c.slug}`}>
    <div className="aspect-[16/9] overflow-hidden rounded-t-md">
      <Cover c={c} />
    </div>
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.client} · {c.years}</p>
      <h4 className="mt-2 text-lg font-medium">{c.title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{c.role}</p>
      <p className="mt-3 text-sm text-muted-foreground">{c.summary}</p>
    </div>
  </div>
);
