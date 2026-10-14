import { Skeleton } from "@/components/ui/skeleton";

export const Eyebrow = ({ children, className = "" }) => <p className={`eyebrow ${className}`}>{children}</p>;

export const ConfirmPill = () => (
  <span
    data-testid="to-confirm-pill"
    className="inline-flex items-center rounded-full border border-dashed border-amber-500/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-400"
  >
    To confirm
  </span>
);

export const Container = ({ children, className = "", ...rest }) => (
  <div className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`} {...rest}>{children}</div>
);

export const Cover = ({ c, className = "" }) =>
  c.cover ? (
    <img src={c.cover} alt={`${c.client} project preview`} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className={`grid-lines relative flex h-full w-full flex-col justify-between bg-card p-6 ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-400">[{c.sector}]</span>
      <span className="font-display text-4xl font-semibold leading-none text-foreground sm:text-5xl">{c.client}</span>
      <span className="absolute right-6 top-6 h-2 w-2 rounded-full bg-amber-500" />
    </div>
  );

export const PageLoading = () => (
  <Container className="space-y-6 py-24" data-testid="page-loading">
    <Skeleton className="h-6 w-40" />
    <Skeleton className="h-16 w-3/4" />
    <Skeleton className="h-64 w-full" />
  </Container>
);

export const SectionHead = ({ eyebrow, title, children, id }) => (
  <div id={id} className="mb-12 grid gap-6 md:grid-cols-12">
    <div className="md:col-span-4">
      <Eyebrow>{eyebrow}</Eyebrow>
    </div>
    <div className="md:col-span-8">
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {children && <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{children}</p>}
    </div>
  </div>
);
