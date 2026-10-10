// Mentor layout (same look as the student Dashboard) + tab switching.
import { useState } from "react";
import { getCurrentUser, logout, useStore } from "../../lib/store";
import Leaderboard from "../../components/Leaderboard";
import Avatar from "../../components/Avatar";
import { MentorHome, StudentsTab, ActivitiesTab, ReviewTab, ProgressTab, MentorProfileTab } from "./MentorPages";

const TABS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "students", icon: "👥", label: "Students" },
  { id: "activities", icon: "📝", label: "Activities" },
  { id: "review", icon: "✅", label: "Review" },
  { id: "progress", icon: "📈", label: "Progress" },
  { id: "leaderboard", icon: "🏆", label: "Leaderboard" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function MentorPortal({ go }: { go: (r: string) => void }) {
  const [tab, setTab] = useState("home");
  useStore();
  const u = getCurrentUser();
  if (!u) return null;
  const out = () => { logout(); go("login"); };
  const navBtn = (t: (typeof TABS)[number], mobile: boolean) => (
    <button key={t.id} onClick={() => setTab(t.id)}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${mobile ? "flex-col gap-0 text-[11px]" : "w-full text-left"} ${tab === t.id ? "bg-indigo-50 font-semibold text-indigo-600" : "text-slate-500"}`}>
      <span>{t.icon}</span><span>{t.label}</span>
    </button>
  );
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col gap-1 border-r border-slate-200 bg-white p-4 md:flex">
        <div className="flex items-center gap-2 px-2 pb-3"><img src="/logo.jpg" alt="Srijan logo" className="h-10 w-10 rounded-full object-cover" /><div className="text-[11px] font-bold uppercase leading-tight tracking-wider text-indigo-600">Srijan<div className="text-slate-500">Mentor Portal</div></div></div>
        {TABS.map((t) => navBtn(t, false))}
        <button onClick={out} className="mt-auto rounded-lg px-3 py-2 text-left text-sm text-slate-500">↩ Log out</button>
      </aside>
      <main className="w-full max-w-5xl p-4 pb-24 md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar user={u} size={48} />
            <div>
              <h1 className="text-2xl font-bold">Hello, {u.first} 👋</h1>
              <p className="text-sm text-slate-500">{u.sid} · Mentor</p>
            </div>
          </div>
          <button onClick={out} className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 md:hidden">Log out</button>
        </div>
        {tab === "home" ? <MentorHome go={setTab} /> : tab === "students" ? <StudentsTab /> : tab === "activities" ? <ActivitiesTab />
          : tab === "review" ? <ReviewTab /> : tab === "progress" ? <ProgressTab /> : tab === "leaderboard" ? <Leaderboard /> : <MentorProfileTab user={u} />}
      </main>
      <nav className="fixed inset-x-0 bottom-0 flex justify-around border-t border-slate-200 bg-white p-1 md:hidden">{TABS.map((t) => navBtn(t, true))}</nav>
    </div>
  );
}
