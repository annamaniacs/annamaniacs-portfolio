import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { http, formatErr } from "@/lib/api";

const TRACKS = ["", "Hands-on Principal IC", "AI Product Design", "Design Leadership"];
const EMPTY = { company: "", role: "", url: "", stage: "Saved", track: "", contact: "", follow_up: "", notes: "", tailoring_id: "" };
const field = "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-amber-500";
const today = () => new Date().toISOString().slice(0, 10);

const AppForm = ({ initial, stages, onSave }) => {
  const [f, setF] = useState(initial);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="grid gap-3 sm:grid-cols-2" data-testid="app-form">
      <input required placeholder="Company" value={f.company} onChange={set("company")} className={field} data-testid="app-company-input" />
      <input placeholder="Role title" value={f.role} onChange={set("role")} className={field} data-testid="app-role-input" />
      <select value={f.stage} onChange={set("stage")} className={field} data-testid="app-stage-select">{stages.map((s) => <option key={s}>{s}</option>)}</select>
      <select value={f.track} onChange={set("track")} className={field} data-testid="app-track-select">{TRACKS.map((t) => <option key={t} value={t}>{t || "Track…"}</option>)}</select>
      <input placeholder="Contact / referrer" value={f.contact} onChange={set("contact")} className={field} data-testid="app-contact-input" />
      <label className="flex items-center gap-2 text-xs text-muted-foreground">Follow up
        <input type="date" value={f.follow_up} onChange={set("follow_up")} className={field} data-testid="app-followup-input" />
      </label>
      <input placeholder="Job post link" value={f.url} onChange={set("url")} className={`${field} sm:col-span-2`} data-testid="app-url-input" />
      <textarea rows={3} placeholder="Notes" value={f.notes} onChange={set("notes")} className={`${field} sm:col-span-2`} data-testid="app-notes-input" />
      <button className="justify-self-start rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-background" data-testid="app-save-btn">Save</button>
    </form>
  );
};

const Card = ({ a, stages, onStage, onEdit, onDelete }) => {
  const overdue = a.follow_up && a.follow_up <= today() && !["Offer", "Rejected"].includes(a.stage);
  return (
    <div className="rounded-md border border-border bg-card p-4" data-testid={`app-card-${a.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium">{a.company}</p>
          <p className="truncate text-sm text-muted-foreground">{a.role || "-"}</p>
        </div>
        <div className="flex shrink-0 gap-1 text-muted-foreground">
          {a.url && <a href={a.url} target="_blank" rel="noreferrer" className="p-1 hover:text-foreground" data-testid={`app-link-${a.id}`}><ExternalLink className="h-3.5 w-3.5" /></a>}
          <button onClick={() => onEdit(a)} className="p-1 hover:text-foreground" data-testid={`app-edit-btn-${a.id}`} aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
          <button onClick={() => onDelete(a.id)} className="p-1 hover:text-red-400" data-testid={`app-delete-btn-${a.id}`} aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      {a.track && <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-sky-400">{a.track}</p>}
      {a.follow_up && <p className={`mt-2 font-mono text-[11px] ${overdue ? "text-amber-400" : "text-muted-foreground"}`} data-testid={`app-followup-${a.id}`}>{overdue ? "Follow up due · " : "Follow up · "}{a.follow_up}</p>}
      <select value={a.stage} onChange={(e) => onStage(a, e.target.value)} className="mt-3 w-full rounded border border-border bg-background px-2 py-1 text-xs" data-testid={`app-stage-${a.id}`}>
        {stages.map((s) => <option key={s}>{s}</option>)}
      </select>
    </div>
  );
};

export default function Applications() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["applications"], queryFn: async () => (await http.get("/admin/applications")).data });
  const [editing, setEditing] = useState(null);
  const refresh = () => qc.invalidateQueries({ queryKey: ["applications"] });

  const save = async (f) => {
    try {
      const { id, created_at, updated_at, ...body } = f;
      if (id) await http.put(`/admin/applications/${id}`, body);
      else await http.post("/admin/applications", body);
      setEditing(null);
      refresh();
      toast.success("Saved");
    } catch (e) {
      toast.error(formatErr(e.response?.data?.detail));
    }
  };
  const onStage = (a, stage) => save({ ...a, stage });
  const onDelete = async (id) => { await http.delete(`/admin/applications/${id}`); refresh(); };

  if (!data) return <div className="p-10 font-mono text-xs text-muted-foreground">Loading…</div>;
  const { stages, items } = data;
  const active = items.filter((a) => !["Saved", "Rejected"].includes(a.stage)).length;
  const due = items.filter((a) => a.follow_up && a.follow_up <= today() && !["Offer", "Rejected"].includes(a.stage)).length;
  const applied = items.filter((a) => a.stage !== "Saved").length;
  const screens = items.filter((a) => ["Recruiter screen", "Interviewing", "Offer"].includes(a.stage)).length;

  return (
    <div className="px-5 py-10 sm:px-10 lg:py-14" data-testid="applications-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Applications</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Your pipeline, one place.</h1>
        </div>
        <button onClick={() => setEditing(EMPTY)} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-background" data-testid="app-add-btn"><Plus className="h-4 w-4" /> Add application</button>
      </div>
      <div className="mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {[["Tracked", items.length], ["Applied", applied], ["In process", active], ["Screen rate", applied ? `${Math.round((screens / applied) * 100)}%` : "-"]].map(([k, v]) => (
          <div key={k} className="rounded-md border border-border bg-card p-4" data-testid={`app-stat-${k.toLowerCase().replace(" ", "-")}`}>
            <p className="font-mono text-3xl font-bold">{v}</p><p className="text-sm text-muted-foreground">{k}</p>
          </div>
        ))}
      </div>
      {due > 0 && <p className="mt-4 text-sm text-amber-400" data-testid="app-due-banner">{due} follow-up{due > 1 ? "s" : ""} due today or overdue.</p>}
      <div className="mt-10 flex gap-4 overflow-x-auto pb-4" data-testid="app-board">
        {stages.map((s) => {
          const col = items.filter((a) => a.stage === s);
          return (
            <div key={s} className="w-64 shrink-0" data-testid={`app-column-${s.toLowerCase().replace(" ", "-")}`}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s} · {col.length}</p>
              <div className="space-y-3">{col.map((a) => <Card key={a.id} a={a} stages={stages} onStage={onStage} onEdit={setEditing} onDelete={onDelete} />)}</div>
            </div>
          );
        })}
      </div>
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-xl bg-background">
          <DialogHeader><DialogTitle className="font-display text-2xl">{editing?.id ? "Edit application" : "New application"}</DialogTitle></DialogHeader>
          {editing && <AppForm initial={editing} stages={stages} onSave={save} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
