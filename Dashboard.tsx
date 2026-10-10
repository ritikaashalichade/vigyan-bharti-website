import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  HelpCircle,
  Mail,
  MessageCircleQuestion,
  Trophy,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { findBySid, fullName, getCurrentUser, useStore } from "../../lib/store";
import { CATEGORIES, NO_POINTS, ranked, totalOf } from "../../lib/leaderboard";
import { assignments } from "../Assignments/Assignments";
import { defaultNotifications } from "../Notifications/Notifications";
import { defaultQueries } from "../Doubts/Doubts";

type SavedNotification = { id: number; title: string; message: string; time: string; read: boolean; link: string };
type SavedQuery = { id: string; title: string; status: "Pending" | "Answered"; date: string };

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

const card = "rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm";
const DAY = 86_400_000;

function daysLeft(due: string) {
  const d = new Date(due);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / DAY);
}

function dueText(n: number) {
  if (n < 0) return `${-n} day${n === -1 ? "" : "s"} overdue`;
  if (n === 0) return "Due today";
  return `${n} day${n === 1 ? "" : "s"} left`;
}

function Dashboard() {
  useStore();
  const user = getCurrentUser();
  const mentor = findBySid(user?.mentorSid);

  // tasks
  const pending = assignments.filter((a) => a.status !== "Submitted");
  const completed = assignments.filter((a) => a.status === "Submitted");
  const deadlines = [...pending]
    .map((a) => ({ ...a, left: daysLeft(a.dueDate) }))
    .sort((a, b) => a.left - b.left);

  // notifications and queries (same saved data as their own pages)
  const notifications = load<SavedNotification[]>("vvm_notifications", defaultNotifications);
  const queries = load<SavedQuery[]>("vvm_queries", defaultQueries);
  const unread = notifications.filter((n) => !n.read).length;
  const openQueries = queries.filter((q) => q.status === "Pending").length;

  // points and rank
  const pts = user?.pts ?? NO_POINTS;
  const total = totalOf(pts);
  const mine = ranked().find((r) => r.sid === user?.sid);
  const progress = user?.progress ?? 0;

  return (
    <div className="space-y-7">
      {/* 1. Personalized welcome and summary */}
      <div className="rounded-2xl bg-[#4A90E2] p-7 text-white shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-blue-100">Welcome back</p>
            <h1 className="mt-1 text-3xl font-bold">Hello, {user?.first ?? "there"}! 👋</h1>
            <p className="mt-2 max-w-xl text-sm text-blue-100">
              You have {pending.length} pending task{pending.length === 1 ? "" : "s"}, {unread} unread notification{unread === 1 ? "" : "s"}
              {mine ? ` and you are ranked #${mine.rank} on the leaderboard.` : "."}
            </p>
            <div className="mt-4 max-w-sm">
              <div className="flex justify-between text-xs text-blue-100"><span>Overall progress</span><span>{progress}%</span></div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
          <div className="hidden rounded-2xl bg-white/15 p-4 md:block"><GraduationCap size={42} /></div>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {[
          { label: "Pending tasks", value: pending.length, icon: FileText },
          { label: "Completed tasks", value: completed.length, icon: CheckCircle2 },
          { label: "Open queries", value: openQueries, icon: MessageCircleQuestion },
          { label: "Unread notifications", value: unread, icon: Bell },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
            <div className="w-fit rounded-xl bg-[#DCEEFF] p-3"><Icon size={21} className="text-[#4A90E2]" /></div>
            <p className="mt-4 text-sm text-[#6B7F95]">{label}</p>
            <p className="mt-1 text-3xl font-bold text-[#23405F]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 4. Upcoming deadlines */}
        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#23405F]">Upcoming Deadlines</h2>
              <p className="mt-1 text-sm text-[#6B7F95]">Nearest first</p>
            </div>
            <Link to="/student/assignments" className="text-sm font-semibold text-[#4A90E2] hover:underline">View All</Link>
          </div>
          <div className="mt-5 space-y-3">
            {deadlines.length === 0 && <p className="text-sm text-[#6B7F95]">No pending deadlines. Great job!</p>}
            {deadlines.slice(0, 4).map((a) => (
              <Link key={a.id} to={`/student/assignments/${a.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-[#D8E8F7] p-4 hover:bg-[#F8FBFF]">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#DCEEFF] p-3"><FileText size={20} className="text-[#4A90E2]" /></div>
                  <div>
                    <h3 className="font-semibold text-[#23405F]">{a.title}</h3>
                    <p className="mt-1 text-xs text-[#6B7F95]">{a.subject} • {a.marks} marks • Due {a.dueDate}</p>
                  </div>
                </div>
                <span className={`flex shrink-0 items-center gap-1 text-xs font-medium ${a.left < 0 ? "text-red-500" : a.left <= 2 ? "text-amber-600" : "text-[#4A90E2]"}`}>
                  <Clock3 size={14} />{dueText(a.left)}
                </span>
              </Link>
            ))}
          </div>

          {/* 3. Completed tasks */}
          <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-[#8CA0B5]">Completed</h3>
          <div className="mt-3 space-y-2">
            {completed.length === 0 && <p className="text-sm text-[#6B7F95]">Nothing submitted yet.</p>}
            {completed.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl bg-[#F8FBFF] px-4 py-3 text-sm text-[#46627F]">
                <CheckCircle2 size={18} className="text-emerald-500" /><span className="font-medium">{a.title}</span><span className="ml-auto text-xs text-[#8CA0B5]">{a.subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Assigned mentor */}
        <div className={card}>
          <h2 className="text-lg font-bold text-[#23405F]">My Mentor</h2>
          <div className="mt-5 text-center">
            {mentor ? (
              <>
                <Avatar user={mentor} size={64} className="mx-auto" />
                <h3 className="mt-3 font-semibold text-[#23405F]">{fullName(mentor)}</h3>
                <p className="mt-1 text-sm text-[#6B7F95]">{mentor.expertise || "Academic Mentor"}</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-[#8CA0B5]"><Mail size={13} />{mentor.email}</p>
                <p className="mt-1 text-xs text-[#8CA0B5]">ID: {mentor.sid}</p>
                <Link to="/student/raise-query" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3B7FCB]">
                  Ask a Question <ArrowRight size={16} />
                </Link>
              </>
            ) : (
              <p className="text-sm text-[#6B7F95]">A mentor will be assigned to you soon.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 5. Notifications and queries */}
        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#23405F]">Recent Notifications</h2>
            <Link to="/student/notifications" className="text-sm font-semibold text-[#4A90E2] hover:underline">View All</Link>
          </div>
          <div className="mt-4 space-y-2">
            {notifications.slice(0, 3).map((n) => (
              <Link key={n.id} to={n.link} className="flex items-start gap-3 rounded-xl border border-[#D8E8F7] p-3 hover:bg-[#F8FBFF]">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-[#D8E8F7]" : "bg-[#4A90E2]"}`} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#23405F]">{n.title}</p>
                  <p className="truncate text-xs text-[#6B7F95]">{n.message}</p>
                </div>
                <span className="ml-auto shrink-0 text-xs text-[#8CA0B5]">{n.time}</span>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8CA0B5]">Recent Queries</h3>
            <Link to="/student/doubts" className="text-sm font-semibold text-[#4A90E2] hover:underline">All doubts</Link>
          </div>
          <div className="mt-3 space-y-2">
            {queries.slice(0, 3).map((q) => (
              <Link key={q.id} to={`/student/query-details/${q.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-[#F8FBFF] px-4 py-3 text-sm hover:bg-[#DCEEFF]">
                <span className="font-medium text-[#23405F]">{q.title}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${q.status === "Answered" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"}`}>{q.status}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 6. Achievement points and rank */}
        <div className={card}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#23405F]">My Points</h2>
            <Award className="text-amber-500" size={22} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-[#EAF4FF] p-3"><p className="text-xs text-[#6B7F95]">Total points</p><p className="text-2xl font-bold text-[#23405F]">{total}</p></div>
            <div className="rounded-xl bg-amber-50 p-3"><p className="text-xs text-[#6B7F95]">Leaderboard rank</p><p className="text-2xl font-bold text-[#23405F]">{mine ? `#${mine.rank}` : "–"}</p></div>
          </div>
          <ul className="mt-4 space-y-1.5 text-sm">
            {CATEGORIES.map(([key, label]) => (
              <li key={key} className="flex justify-between text-[#46627F]"><span>{label}</span><b className="text-[#23405F]">{pts[key]}</b></li>
            ))}
          </ul>
          <Link to="/student/leaderboard" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#4A90E2] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#EAF4FF]">
            <Trophy size={16} /> View Top 10
          </Link>
        </div>
      </div>

      {/* 7. Quick access */}
      <div className={card}>
        <h2 className="text-lg font-bold text-[#23405F]">Quick Access</h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/student/assignments", label: "Assignments", icon: FileText },
            { to: "/student/lectures", label: "Resources & Lectures", icon: BookOpen },
            { to: "/student/profile", label: "My Profile", icon: UserCircle },
            { to: "/student/raise-query", label: "Ask My Mentor", icon: HelpCircle },
            { to: "/student/leaderboard", label: "Leaderboard", icon: Trophy },
            { to: "/student/results", label: "View Results", icon: CheckCircle2 },
            { to: "/student/submissions", label: "My Submissions", icon: CalendarDays },
            { to: "/student/notifications", label: "Notifications", icon: Bell },
          ].map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="flex items-center gap-3 rounded-xl bg-[#F8FBFF] p-4 transition hover:bg-[#DCEEFF]">
              <Icon size={20} className="text-[#4A90E2]" />
              <span className="text-sm font-medium text-[#46627F]">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
