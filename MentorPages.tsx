// Mentor pages: Dashboard, My Students (+details), Assigned Activities (+details), Review Submissions, Student Progress, Profile.
import { useState } from "react";
import { inputCls } from "../Public/ui";
import { Card, Bar, Stat, btn, pill, Back, Row, usePersisted } from "./parts";
import { DonutChart } from "../../components/ui/donut-chart";
import { ASSIGNMENTS, SUBMISSIONS, MENTOR } from "./data";
import { fullName, getCurrentUser, studentsOf, useStore, type User } from "../../lib/store";
import Avatar from "../../components/Avatar";

// The students the admin has assigned to the logged-in mentor.
function useMyStudents() {
  useStore();
  const me = getCurrentUser();
  return (me ? studentsOf(me.sid) : []).map((s) => ({
    id: s.sid, name: fullName(s), cls: `${s.cls}-${s.sec}`, email: s.email, progress: s.progress ?? 0,
    tasks: `${Math.round(((s.progress ?? 0) / 100) * 24)} / 24`,
  }));
}

export function MentorHome({ go }: { go: (tab: string) => void }) {
  const STUDENTS = useMyStudents();
  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Students" value={String(STUDENTS.length)} />
        <Stat label="Activities" value={String(ASSIGNMENTS.length)} />
        <Stat label="To review" value={String(SUBMISSIONS.length)} />
        <Stat label="Sessions" value={String(MENTOR.sessions)} />
      </div>
      <Card title="Latest submissions">
        {SUBMISSIONS.map((s) => <Row key={s.id} title={s.student} sub={`${s.work} · ${s.date}`} />)}
        <button onClick={() => go("review")} className={`${btn} mt-2`}>Review now</button>
      </Card>
    </>
  );
}

export function StudentsTab() {
  const STUDENTS = useMyStudents();
  const [openId, setOpenId] = useState<string | null>(null);
  const s = STUDENTS.find((x) => x.id === openId);
  if (s) {
    return (
      <Card title={s.name}>
        <Back onClick={() => setOpenId(null)} />
        <p className="text-sm text-slate-500">Class {s.cls} · {s.email}</p>
        <p className="mt-3 text-sm">Overall progress: <b>{s.progress}%</b></p>
        <Bar pct={s.progress} />
        <p className="text-sm">Tasks completed: <b>{s.tasks}</b></p>
      </Card>
    );
  }
  return (
    <Card title="My students">
      {STUDENTS.length === 0 && <p className="text-sm text-slate-500">No students are assigned to you yet. The admin can assign students from Mentor Allocation.</p>}
      {STUDENTS.map((x) => <Row key={x.id} title={x.name} sub={`Class ${x.cls}`}><button onClick={() => setOpenId(x.id)} className={btn}>Details</button></Row>)}
    </Card>
  );
}

export function ActivitiesTab() {
  const STUDENTS = useMyStudents();
  const [openId, setOpenId] = useState<number | null>(null);
  const a = ASSIGNMENTS.find((x) => x.id === openId);
  if (a) {
    return (
      <Card title={a.title}>
        <Back onClick={() => setOpenId(null)} />
        <p className="text-sm text-slate-500">{a.subject} · {a.due} · {a.marks} marks</p>
        <p className="mt-3 text-sm">{a.desc}</p>
        <h3 className="mb-1 mt-4 text-sm font-bold">Student status</h3>
        {STUDENTS.map((s, i) => <Row key={s.id} title={s.name} sub={`Class ${s.cls}`}><span className={pill}>{i % 2 === 0 ? "Submitted" : "Pending"}</span></Row>)}
      </Card>
    );
  }
  return (
    <Card title="Assigned activities">
      {ASSIGNMENTS.map((x) => <Row key={x.id} title={x.title} sub={`${x.subject} · ${x.due}`}><button onClick={() => setOpenId(x.id)} className={btn}>View</button></Row>)}
    </Card>
  );
}

export function ReviewTab() {
  const [results, setResults] = usePersisted<Record<number, string>>("sm_reviews", {}); // id -> "Approved" | "Needs work"
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  return (
    <Card title="Review submissions">
      {SUBMISSIONS.map((s) => (
        <div key={s.id} className="border-t border-slate-100 py-3 first:border-0">
          <div className="flex items-center justify-between"><b>{s.student}</b>{results[s.id] && <span className={pill}>{results[s.id]}</span>}</div>
          <div className="text-sm text-slate-500">{s.work} · {s.date}</div>
          <p className="mt-1 rounded-lg bg-slate-50 p-2 text-sm">{s.answer}</p>
          {!results[s.id] && (
            <>
              <textarea value={feedback[s.id] ?? ""} onChange={(e) => setFeedback({ ...feedback, [s.id]: e.target.value })} rows={2} placeholder="Write feedback (optional)" className={`${inputCls} mt-2`} />
              <div className="mt-2 flex gap-2">
                <button onClick={() => setResults({ ...results, [s.id]: "Approved" })} className={btn}>Approve</button>
                <button onClick={() => setResults({ ...results, [s.id]: "Needs work" })} className={btn}>Needs work</button>
              </div>
            </>
          )}
        </div>
      ))}
    </Card>
  );
}

export function ProgressTab() {
  const STUDENTS = useMyStudents();
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
    <Card title="Submissions overview">
      <DonutChart centerLabel="Submissions" size={170} data={[
        { label: "Approved", value: 12, color: "#4f46e5" },
        { label: "Needs work", value: 3, color: "#f59e0b" },
        { label: "To review", value: 5, color: "#94a3b8" },
      ]} />
    </Card>
    <Card title="Student progress">
      {STUDENTS.map((s) => (
        <div key={s.id} className="border-t border-slate-100 py-3 first:border-0">
          <div className="flex justify-between text-sm"><b>{s.name}</b><span>{s.progress}%</span></div>
          <Bar pct={s.progress} />
        </div>
      ))}
    </Card>
    </div>
  );
}

export function MentorProfileTab({ user }: { user: User }) {
  const rows = [["Name", `${user.first} ${user.last}`], ["Email", user.email], ["Mentor ID", user.sid], ["Subject", user.expertise || "—"], ["City", user.city || "—"]];
  return (
    <Card title="Mentor profile">
      <Avatar user={user} size={64} className="mb-4" />
      {rows.map(([k, v]) => <Row key={k} title={k} sub={v} />)}
    </Card>
  );
}
