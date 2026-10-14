import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mic, Send, RefreshCw, Trash2 } from "lucide-react";
import { http, streamPost } from "@/lib/api";
import { Md } from "@/components/site/Md";

const TRACKS = ["Hands-on Principal IC", "AI Product Design", "Design Leadership"];
const FOCUS = [["walkthrough", "Portfolio walkthrough"], ["behavioral", "Behavioral & leadership"], ["ai", "AI design"], ["craft", "Product & craft"], ["seniority", "Seniority probes"]];
const field = "rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-amber-500";

const Past = ({ items, onDelete }) => (
  <div data-testid="interview-history">
    <p className="eyebrow mb-4">Practice history</p>
    {items.length === 0 && <p className="text-sm text-muted-foreground">Scored answers will be listed here.</p>}
    <div className="space-y-2">
      {items.map((it) => (
        <details key={it.id} className="group rounded-md border border-border px-3 py-2.5" data-testid={`interview-history-item-${it.id}`}>
          <summary className="flex cursor-pointer items-start justify-between gap-2">
            <span className="min-w-0 text-sm">{it.question}</span>
            <span className={`shrink-0 font-mono text-sm ${it.score >= 8 ? "text-emerald-400" : it.score >= 6 ? "text-amber-400" : "text-red-400"}`}>{it.score ?? "-"}/10</span>
          </summary>
          <p className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">{it.answer}</p>
          <Md className="md-compact mt-2">{it.feedback}</Md>
          <button onClick={() => onDelete(it.id)} className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400" data-testid={`interview-delete-btn-${it.id}`}><Trash2 className="h-3 w-3" /> Delete</button>
        </details>
      ))}
    </div>
  </div>
);

export default function Interview() {
  const qc = useQueryClient();
  const { data: history = [] } = useQuery({ queryKey: ["interviews"], queryFn: async () => (await http.get("/admin/interviews")).data });
  const [track, setTrack] = useState(TRACKS[0]);
  const [focus, setFocus] = useState("walkthrough");
  const [jd, setJd] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState("");
  const [asked, setAsked] = useState([]);

  const ask = async () => {
    setQuestion(""); setAnswer(""); setFeedback(""); setBusy("q");
    let q = "";
    try {
      await streamPost("/admin/interview/question", { track, focus, jd, avoid: asked.slice(-10) }, (d) => { q += d; setQuestion(q); });
      setAsked((a) => [...a, q]);
    } catch (e) { toast.error(e.message); } finally { setBusy(""); }
  };

  const score = async () => {
    setFeedback(""); setBusy("s");
    try {
      await streamPost("/admin/interview/score", { track, focus, jd, question, answer }, (d) => setFeedback((f) => f + d));
      qc.invalidateQueries({ queryKey: ["interviews"] });
    } catch (e) { toast.error(e.message); } finally { setBusy(""); }
  };

  const del = async (id) => { await http.delete(`/admin/interviews/${id}`); qc.invalidateQueries({ queryKey: ["interviews"] }); };
  const avg = history.filter((h) => h.score != null);
  const avgScore = avg.length ? (avg.reduce((s, h) => s + h.score, 0) / avg.length).toFixed(1) : "-";

  return (
    <div className="px-5 py-10 sm:px-10 lg:py-14" data-testid="interview-page">
      <p className="eyebrow">Mock interview</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Practice out loud, get scored honestly.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Choose a track and a question type. Answer as you would in the room, then get a score, what to fix and a stronger version built from your real work. <span className="font-mono text-xs">Average so far: <span data-testid="interview-avg-score">{avgScore}</span> across {avg.length}</span></p>
      <div className="mt-10 grid gap-10 xl:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-5">
          <div className="flex flex-wrap gap-3">
            <select value={track} onChange={(e) => setTrack(e.target.value)} className={field} data-testid="interview-track-select">{TRACKS.map((t) => <option key={t}>{t}</option>)}</select>
            <select value={focus} onChange={(e) => setFocus(e.target.value)} className={field} data-testid="interview-focus-select">{FOCUS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            <button onClick={ask} disabled={!!busy} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-background disabled:opacity-40" data-testid="interview-ask-btn">
              {question ? <RefreshCw className="h-4 w-4" /> : <Mic className="h-4 w-4" />} {busy === "q" ? "Thinking…" : question ? "Next question" : "Ask me a question"}
            </button>
          </div>
          <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={2} maxLength={15000} placeholder="Optional: paste a job description to tailor the questions" className={`${field} w-full`} data-testid="interview-jd-input" />
          {question && (
            <div className="rounded-md border border-sky-400/30 bg-sky-400/5 p-6" data-testid="interview-question">
              <p className="font-mono text-[11px] uppercase tracking-widest text-sky-400">Interviewer</p>
              <p className={`mt-2 font-display text-2xl leading-snug ${busy === "q" ? "caret" : ""}`}>{question}</p>
            </div>
          )}
          {question && busy !== "q" && (
            <div className="space-y-3">
              <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={9} maxLength={8000} placeholder="Type your answer as you'd say it…" className={`${field} w-full leading-relaxed`} data-testid="interview-answer-input" />
              <div className="flex items-center gap-3">
                <button onClick={score} disabled={!!busy || answer.trim().length < 20} className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-background disabled:opacity-40" data-testid="interview-score-btn">
                  <Send className="h-4 w-4" /> {busy === "s" ? "Scoring…" : "Score my answer"}
                </button>
                <span className="font-mono text-[11px] text-muted-foreground">{answer.trim().split(/\s+/).filter(Boolean).length} words · aim for 150–300</span>
              </div>
            </div>
          )}
          {feedback && <div className="rounded-md border border-border bg-card p-6" data-testid="interview-feedback"><Md streaming={busy === "s"}>{feedback}</Md></div>}
        </div>
        <Past items={history} onDelete={del} />
      </div>
    </div>
  );
}
