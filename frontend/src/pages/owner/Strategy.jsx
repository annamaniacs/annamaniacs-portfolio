import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { Md } from "@/components/site/Md";
import { Skeleton } from "@/components/ui/skeleton";

export default function Strategy() {
  const { data, isLoading } = useQuery({ queryKey: ["strategy"], queryFn: async () => (await http.get("/admin/strategy")).data });

  if (isLoading) return <div className="space-y-4 p-10"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-96 w-full" /></div>;

  return (
    <div className="px-5 py-10 sm:px-10 lg:py-14" data-testid="strategy-page">
      <p className="eyebrow">Strategy guide</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Your rebrand & job-search playbook</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Seven chapters, in the order to act on them. Start with positioning, then fix the resume, then work through the 30/60/90 plan every week.</p>
      <div className="mt-12 grid gap-12 xl:grid-cols-[220px_1fr]">
        <nav className="hidden xl:block" data-testid="strategy-toc">
          <div className="sticky top-10 space-y-1">
            {data.map((c, i) => (
              <a key={c.id} href={`#${c.id}`} className="group block rounded-md px-3 py-2 transition-colors duration-200 hover:bg-card" data-testid={`strategy-toc-${c.id}`}>
                <span className="font-mono text-[11px] text-amber-400">0{i + 1}</span>
                <span className="ml-2 text-sm text-muted-foreground group-hover:text-foreground">{c.title}</span>
              </a>
            ))}
          </div>
        </nav>
        <div className="max-w-3xl space-y-20">
          {data.map((c, i) => (
            <section key={c.id} id={c.id} className="scroll-mt-10" data-testid={`strategy-chapter-${c.id}`}>
              <div className="mb-8 border-b border-border pb-6">
                <p className="font-mono text-sm text-amber-400">Chapter 0{i + 1}</p>
                <h2 className="mt-2 font-display text-4xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-muted-foreground">{c.summary}</p>
              </div>
              <Md>{c.body}</Md>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
