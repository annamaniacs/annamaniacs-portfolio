import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { Container, Eyebrow } from "@/components/site/Bits";
import { Md } from "@/components/site/Md";
import { streamPost } from "@/lib/api";

export default function Matcher() {
  const [jd, setJd] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const run = async () => {
    setOut("");
    setErr("");
    setBusy(true);
    try {
      await streamPost("/match/stream", { jd }, (d) => setOut((o) => o + d));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container className="py-20" data-testid="matcher-page">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow className="!text-sky-400">Job description matcher</Eyebrow>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Paste the role. See the fit.</h1>
        </div>
        <p className="self-end text-muted-foreground md:col-span-5">AI maps your job description to Anna's real experience and love and the most relevant case studies. It only uses facts from her resume and portfolio.</p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col">
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            maxLength={15000}
            rows={16}
            placeholder="Paste the full job description here…"
            className="w-full flex-1 rounded-md border border-border bg-card p-5 text-sm leading-relaxed outline-none transition-colors duration-200 focus:border-sky-400"
            data-testid="matcher-jd-input"
          />
          <div className="mt-4 flex items-center gap-3">
            <button onClick={run} disabled={busy || jd.trim().length < 40} className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-background transition-opacity disabled:opacity-40" data-testid="matcher-submit-btn">
              <Sparkles className="h-4 w-4" /> {busy ? "Matching…" : "Match to Anna's experience"}
            </button>
            {out && !busy && (
              <button onClick={() => { setJd(""); setOut(""); }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" data-testid="matcher-reset-btn">
                <RotateCcw className="h-3.5 w-3.5" /> New role
              </button>
            )}
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">{jd.length < 40 ? "40+ characters" : `${jd.length} chars`}</span>
          </div>
        </div>
        <div className="min-h-[24rem] rounded-md border border-border bg-card/60 p-6 sm:p-8" data-testid="matcher-result">
          {err && <p className="text-sm text-red-400" data-testid="matcher-error">{err}</p>}
          {!out && !err && !busy && <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">The match report will appear here.</p>}
          {busy && !out && <p className="caret text-sm text-muted-foreground">Reading the role</p>}
          {out && <Md streaming={busy}>{out}</Md>}
        </div>
      </div>
    </Container>
  );
}
