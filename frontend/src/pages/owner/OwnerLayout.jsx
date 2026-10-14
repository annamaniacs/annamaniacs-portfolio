import { NavLink, Navigate, Outlet, Link } from "react-router-dom";
import { BookOpen, Wand2, Inbox, LogOut, ExternalLink, KanbanSquare, Mic } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const items = [
  { to: "/owner", label: "Strategy guide", icon: BookOpen, end: true, id: "strategy" },
  { to: "/owner/tailor", label: "Tailor resume", icon: Wand2, id: "tailor" },
  { to: "/owner/applications", label: "Applications", icon: KanbanSquare, id: "applications" },
  { to: "/owner/interview", label: "Mock interview", icon: Mic, id: "interview" },
  { to: "/owner/inbox", label: "Inbox", icon: Inbox, id: "inbox" },
];

export default function OwnerLayout() {
  const { user, logout } = useAuth();
  if (user === null) return <div className="p-10 font-mono text-xs text-muted-foreground" data-testid="owner-loading">Checking session…</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]" data-testid="owner-layout">
      <aside className="sticky top-0 z-40 flex items-center gap-1 overflow-x-auto border-b border-border bg-background/90 p-3 backdrop-blur-xl md:h-screen md:flex-col md:items-stretch md:border-b-0 md:border-r md:p-5">
        <Link to="/" className="mr-4 hidden md:mb-8 md:block" data-testid="owner-brand-link">
          <p className="font-display text-2xl font-semibold">Anna Cheng</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400">Private workspace</p>
        </Link>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200 ${isActive ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            data-testid={`owner-nav-${it.id}`}
          >
            <it.icon className="h-4 w-4" /> {it.label}
          </NavLink>
        ))}
        <div className="flex gap-1 md:mt-auto md:flex-col">
          <Link to="/" className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground" data-testid="owner-view-site-link">
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <button onClick={logout} className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground" data-testid="owner-logout-btn">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
