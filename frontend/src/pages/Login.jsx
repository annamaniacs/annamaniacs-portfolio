import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatErr } from "@/lib/api";

const field = "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-amber-500";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/owner" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await login(email, password);
    } catch (ex) {
      setErr(formatErr(ex.response?.data?.detail) || ex.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid-lines flex min-h-screen items-center justify-center px-5" data-testid="login-page">
      <form onSubmit={submit} className="reveal w-full max-w-sm rounded-md border border-border bg-background/90 p-8 backdrop-blur-xl" data-testid="login-form">
        <Lock className="h-5 w-5 text-amber-400" />
        <h1 className="mt-4 font-display text-3xl font-semibold">Owner sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Private tools for Anna.</p>
        <div className="mt-6 space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} data-testid="login-email-input" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} data-testid="login-password-input" />
        </div>
        {err && <p className="mt-3 text-sm text-red-400" data-testid="login-error">{err}</p>}
        <button disabled={busy} className="mt-6 w-full rounded-full bg-amber-500 py-3 text-sm font-semibold text-background disabled:opacity-50" data-testid="login-submit-button">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground" data-testid="login-back-link">← Back to portfolio</Link>
      </form>
    </div>
  );
}
