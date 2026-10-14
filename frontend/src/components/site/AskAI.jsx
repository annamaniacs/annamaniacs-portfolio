import { useEffect, useRef, useState } from "react";
import { Sparkles, X, ArrowUp } from "lucide-react";
import { streamPost } from "@/lib/api";
import { Md } from "./Md";

const SUGGESTIONS = [
  "What kind of roles is Anna looking for?",
  "How does Anna use AI in her design work?",
  "Tell me about her design leadership experience",
  "What did she do at PNC?",
];

const sessionId = () => {
  let id = localStorage.getItem("ask_ai_session");
  if (!id) {
    id = `s_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem("ask_ai_session", id);
  }
  return id;
};

const Bubble = ({ m, streaming }) =>
  m.role === "visitor" ? (
    <div className="ml-10 self-end rounded-2xl rounded-br-sm bg-amber-500 px-4 py-2.5 text-sm text-background" data-testid="ask-ai-visitor-msg">{m.text}</div>
  ) : (
    <div className="mr-6 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3" data-testid="ask-ai-assistant-msg">
      <Md className="text-sm" streaming={streaming}>{m.text}</Md>
    </div>
  );

export const AskAI = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    setMsgs((m) => [...m, { role: "visitor", text: q }, { role: "assistant", text: "" }]);
    const append = (d) => setMsgs((m) => [...m.slice(0, -1), { role: "assistant", text: m[m.length - 1].text + d }]);
    try {
      await streamPost("/chat/stream", { session_id: sessionId(), message: q }, append);
    } catch (e) {
      setMsgs((m) => [...m.slice(0, -1), { role: "assistant", text: e.message }]);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const h = (e) => {
      setOpen(true);
      if (e.detail) send(e.detail);
    };
    window.addEventListener("open-ask-ai", h);
    return () => window.removeEventListener("open-ask-ai", h);
  });

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-background/80 px-5 py-3 text-sm font-medium shadow-[0_0_30px_-6px_hsl(199_89%_60%/0.6)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5"
          data-testid="ask-ai-launcher-btn"
        >
          <Sparkles className="h-4 w-4 text-sky-400" /> Ask Anna's AI
        </button>
      )}
      {open && (
        <div className="reveal fixed inset-x-3 bottom-3 z-50 flex h-[72vh] flex-col overflow-hidden rounded-2xl border border-border bg-background/90 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[420px]" data-testid="ask-ai-panel">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="font-display text-xl font-semibold">Ask Anna's AI</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-sky-400">Answers from her resume & case studies</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-secondary" data-testid="ask-ai-close-btn" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4" data-testid="ask-ai-messages">
            {msgs.length === 0 && (
              <div className="space-y-2">
                <p className="mb-3 text-sm text-muted-foreground">Hi! I can answer questions about Anna's experience, projects and how she works.</p>
                {SUGGESTIONS.map((s, i) => (
                  <button key={s} onClick={() => send(s)} className="block w-full rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors duration-200 hover:border-sky-400/60 hover:bg-card" data-testid={`ask-ai-suggestion-${i}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <Bubble key={i} m={m} streaming={busy && i === msgs.length - 1} />
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask about her experience…"
              className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-sky-400"
              data-testid="ask-ai-input"
            />
            <button type="submit" disabled={busy || !input.trim()} className="rounded-full bg-sky-400 p-2.5 text-background transition-opacity disabled:opacity-40" data-testid="ask-ai-send-btn" aria-label="Send">
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <p className="px-5 pb-3 text-[11px] text-muted-foreground">Questions are shared with Anna so she can follow up. Avoid personal details.</p>
        </div>
      )}
    </>
  );
};
