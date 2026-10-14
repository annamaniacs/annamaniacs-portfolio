import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { http } from "@/lib/api";
import { Md } from "@/components/site/Md";

const when = (d) => new Date(d).toLocaleString();
const Empty = ({ children }) => <p className="py-10 text-sm text-muted-foreground">{children}</p>;

const Contacts = ({ items, onRead }) =>
  items.length === 0 ? <Empty>No messages yet.</Empty> : (
    <div className="space-y-3">
      {items.map((c) => (
        <div key={c.id} className={`rounded-md border p-5 ${c.read ? "border-border" : "border-amber-500/60 bg-amber-500/5"}`} data-testid={`inbox-contact-${c.id}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-medium">{c.name} <a href={`mailto:${c.email}`} className="ml-2 text-sm text-amber-400 hover:underline">{c.email}</a></p>
            <p className="font-mono text-[11px] text-muted-foreground">{when(c.created_at)}</p>
          </div>
          {c.company && <p className="mt-1 text-sm text-muted-foreground">{c.company}</p>}
          <p className="mt-3 whitespace-pre-wrap text-sm">{c.message}</p>
          {!c.read && <button onClick={() => onRead(c.id)} className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground" data-testid={`inbox-mark-read-${c.id}`}>Mark as read</button>}
        </div>
      ))}
    </div>
  );

const Chats = ({ sessions }) =>
  sessions.length === 0 ? <Empty>No chat questions yet.</Empty> : (
    <Accordion type="multiple" className="space-y-2">
      {sessions.map((s) => {
        const qs = s.messages.filter((m) => m.role === "visitor");
        return (
          <AccordionItem key={s.session_id} value={s.session_id} className="rounded-md border border-border px-4" data-testid={`inbox-chat-${s.session_id}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="min-w-0">
                <p className="truncate text-sm">{qs[0]?.text || "(no question)"}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{qs.length} question{qs.length === 1 ? "" : "s"} · {when(s.last_at)}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {s.messages.map((m) => (
                <div key={m.id} className={m.role === "visitor" ? "text-sm font-medium text-amber-300" : "border-l border-border pl-3"}>
                  {m.role === "visitor" ? `Q: ${m.text}` : <Md className="md-compact">{m.text}</Md>}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );

const Matches = ({ items }) =>
  items.length === 0 ? <Empty>No job matches yet.</Empty> : (
    <Accordion type="multiple" className="space-y-2">
      {items.map((m) => (
        <AccordionItem key={m.id} value={m.id} className="rounded-md border border-border px-4" data-testid={`inbox-match-${m.id}`}>
          <AccordionTrigger className="text-left hover:no-underline">
            <div className="min-w-0">
              <p className="truncate text-sm">{m.jd.slice(0, 110)}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{when(m.created_at)}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid gap-6 lg:grid-cols-2">
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded bg-card p-3 font-sans text-xs text-muted-foreground">{m.jd}</pre>
            <Md className="md-compact">{m.result}</Md>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

export default function Inbox() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["inbox"], queryFn: async () => (await http.get("/admin/inbox")).data, refetchInterval: 30000 });
  const onRead = async (id) => {
    await http.post(`/admin/contacts/${id}/read`);
    qc.invalidateQueries({ queryKey: ["inbox"] });
  };
  if (isLoading || !data) return <div className="p-10 font-mono text-xs text-muted-foreground">Loading inbox…</div>;
  const unread = data.contacts.filter((c) => !c.read).length;
  const questions = data.chats.reduce((n, s) => n + s.messages.filter((m) => m.role === "visitor").length, 0);

  return (
    <div className="px-5 py-10 sm:px-10 lg:py-14" data-testid="inbox-page">
      <p className="eyebrow">Inbox</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">What recruiters are asking</h1>
      <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4">
        {[["Messages", data.contacts.length, unread ? `${unread} unread` : "all read"], ["Chat questions", questions, `${data.chats.length} visitors`], ["Job matches", data.matches.length, "roles pasted"]].map(([k, v, s]) => (
          <div key={k} className="rounded-md border border-border bg-card p-4" data-testid={`inbox-stat-${k.toLowerCase().replace(" ", "-")}`}>
            <p className="font-mono text-3xl font-bold">{v}</p>
            <p className="text-sm">{k}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{s}</p>
          </div>
        ))}
      </div>
      <Tabs defaultValue="contacts" className="mt-10 max-w-4xl">
        <TabsList className="bg-card">
          <TabsTrigger value="contacts" data-testid="inbox-tab-contacts">Messages</TabsTrigger>
          <TabsTrigger value="chats" data-testid="inbox-tab-chats">Chat questions</TabsTrigger>
          <TabsTrigger value="matches" data-testid="inbox-tab-matches">Job matches</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts" className="mt-6"><Contacts items={data.contacts} onRead={onRead} /></TabsContent>
        <TabsContent value="chats" className="mt-6"><Chats sessions={data.chats} /></TabsContent>
        <TabsContent value="matches" className="mt-6"><Matches items={data.matches} /></TabsContent>
      </Tabs>
    </div>
  );
}
