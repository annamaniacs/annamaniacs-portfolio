import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, Trash2, Wand2 } from "lucide-react";
import { http, splitSections, streamPost } from "@/lib/api";
import { Md } from "@/components/site/Md";

const copy = (text) => navigator.clipboard.writeText(text).then(() => toast.success("Copied"), () => toast.error("Couldn't copy"));

const Sections = ({ md, streaming }) => (
  <div className="space-y-4" data-testid="tailor-result">
    {splitSections(md).map((s, i, arr) => (
      <div key={i} className="rounded-md border border-border bg-card p-5" data-testid={`tailor-section-${i}`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-400">{s.title}</p>
          <button onClick={() => copy(s.body)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground" data-testid={`tailor-copy-btn-${i}`}>
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
        </div>
        <Md className="md-compact" streaming={streaming && i === arr.length - 1}>{s.body}</Md>
      </div>
    ))}
  </div>
);

const History = ({ items, onOpen, onDelete, activeId }) => (
  <div data-testid="tailor-history">
    <p className="eyebrow mb-4">History</p>
    {items.length === 0 && <p className="text-sm text-muted-foreground">Nothing yet. Your tailored applications will be listed here.</p>}
    <div className="space-y-2">
      {items.map((t) => (
        <div key={t.id} className={`group flex items-start justify-between gap-2 rounded-md border px-3 py-2.5 ${activeId === t.id ? "border-amber-500" : "border-border"}`}>
          <button onClick={() => onOpen(t)} className="min-w-0 text-left" data-testid={`tailor-history-item-${t.id}`}>
            <p className="truncate text-sm">{t.label}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{new Date(t.created_at).toLocaleString()}</p>
          </button>
          <button onClick={() => onDelete(t.id)} className="p-1 text-muted-foreground opacity-60 hover:text-red-400 group-hover:opacity-100" data-testid={`tailor-delete-btn-${t.id}`} aria-label="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default function Tailor() {
  const qc = useQueryClient();
  const { data: history = [] } = useQuery({ queryKey: ["tailorings"], queryFn: async () => (await http.get("/admin/tailorings")).data });
  const [label, setLabel] = useState("");
  const [jd, setJd] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const run = async () => {
    setOut("");
    setActiveId(null);
    setBusy(true);
    try {
      await streamPost("/admin/tailor/stream", { jd, label }, (d) => setOut((o) => o + d));
      qc.invalidateQueries({ queryKey: ["tailorings"] });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const del = async (id) => {
    await http.delete(`/admin/tailorings/${id}`);
    if (id === activeId) setOut("");
    qc.invalidateQueries({ queryKey: ["tailorings"] });
  };

  const open = (t) => {
    setActiveId(t.id);
    setLabel(t.label);
    setJd(t.jd);
    setOut(t.result);
  };

  return (
    <div className="px-5 py-10 sm:px-10 lg:py-14" data-testid="tailor-page">
      <p className="eyebrow">Tailor resume</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">One job post in, a tailored application out.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">An honest fit read with the gaps, a tailored summary, reordered bullets, ATS keywords and a cover note. Private to you.</p>
      <div className="mt-10 grid gap-10 xl:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-6">
          <div className="grid gap-3">
            <input value={label} onChange={(e) => setLabel(e.target.value)} maxLength={120} placeholder="Company · Role (e.g. Stripe · Staff Product Designer)" className="rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-amber-500" data-testid="tailor-label-input" />
            <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={10} maxLength={15000} placeholder="Paste the full job description…" className="rounded-md border border-border bg-card p-4 text-sm leading-relaxed outline-none focus:border-amber-500" data-testid="tailor-jd-input" />
            <button onClick={run} disabled={busy || jd.trim().length < 40} className="inline-flex items-center gap-2 justify-self-start rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-background disabled:opacity-40" data-testid="tailor-submit-btn">
              <Wand2 className="h-4 w-4" /> {busy ? "Tailoring…" : "Tailor my application"}
            </button>
          </div>
          {busy && !out && <p className="caret text-sm text-muted-foreground">Reading the role against your experience</p>}
          {out && <Sections md={out} streaming={busy} />}
        </div>
        <History items={history} onOpen={open} onDelete={del} activeId={activeId} />
      </div>
    </div>
  );
}
