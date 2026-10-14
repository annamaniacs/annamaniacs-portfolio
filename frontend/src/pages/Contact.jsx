import { useState } from "react";
import { toast } from "sonner";
import { Mail, Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/site/Bits";
import { http, formatErr } from "@/lib/api";

const field = "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-amber-500";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", company: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await http.post("/contact", f);
      setSent(true);
      toast.success("Message sent. Anna will be in touch soon.");
    } catch (err) {
      toast.error(formatErr(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container className="grid gap-14 py-20 lg:grid-cols-12" data-testid="contact-page">
      <div className="lg:col-span-5">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Let's talk about the role.</h1>
        <p className="mt-6 text-muted-foreground sm:text-lg">Recruiters, hiring managers and founders are welcome. I usually reply within one business day.</p>
        <a href="mailto:anna@annamaniacs.com" className="mt-8 inline-flex items-center gap-2 text-amber-400 hover:underline" data-testid="contact-email-link">
          <Mail className="h-4 w-4" /> anna@annamaniacs.com
        </a>
      </div>
      <div className="lg:col-span-7">
        {sent ? (
          <div className="flex h-full flex-col items-start justify-center rounded-md border border-emerald-500/40 bg-emerald-500/5 p-10" data-testid="contact-success">
            <Check className="h-8 w-8 text-emerald-400" />
            <p className="mt-4 font-display text-3xl font-semibold">Thank you, {f.name.split(" ")[0]}.</p>
            <p className="mt-2 text-muted-foreground">Your message is with Anna.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" data-testid="contact-form">
            <input required placeholder="Your name" value={f.name} onChange={set("name")} className={field} data-testid="contact-name-input" />
            <input required type="email" placeholder="Work email" value={f.email} onChange={set("email")} className={field} data-testid="contact-email-input" />
            <input placeholder="Company & role (optional)" value={f.company} onChange={set("company")} className={`${field} sm:col-span-2`} data-testid="contact-company-input" />
            <textarea required minLength={5} rows={7} placeholder="What are you hiring for?" value={f.message} onChange={set("message")} className={`${field} sm:col-span-2`} data-testid="contact-message-input" />
            <button disabled={busy} className="justify-self-start rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-background transition-opacity disabled:opacity-50" data-testid="contact-submit-btn">
              {busy ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}
