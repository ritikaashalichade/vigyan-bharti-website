// Top 10 leaderboard – the same component is used in the student, mentor and admin portals.
import { useState } from "react";
import { Crown, Medal, Trophy } from "lucide-react";
import { CATEGORIES, ranked, regions, schools, type Metric, type Row } from "../lib/leaderboard";
import { getCurrentUser, useStore } from "../lib/store";

type View = "overall" | "region" | "school" | "academics" | "achievements";
const VIEWS: [View, string][] = [["overall", "Overall"], ["region", "Region"], ["school", "School / College"], ["academics", "Academic performance"], ["achievements", "Achievements"]];

const PODIUM = [
  { box: "border-amber-300 bg-amber-50", badge: "bg-amber-400 text-white", label: "1st" },
  { box: "border-slate-300 bg-slate-50", badge: "bg-slate-400 text-white", label: "2nd" },
  { box: "border-orange-300 bg-orange-50", badge: "bg-orange-400 text-white", label: "3rd" },
];

export function Leaderboard() {
  useStore();
  const me = getCurrentUser();
  const [view, setView] = useState<View>("overall");
  const [region, setRegion] = useState("");
  const [school, setSchool] = useState("");

  const regionList = regions();
  const schoolList = schools();
  const activeRegion = region || regionList[0] || "";
  const activeSchool = school || schoolList[0] || "";
  const metric: Metric = view === "academics" ? "academics" : view === "achievements" ? "achievements" : "total";
  const rows = ranked({ metric, region: view === "region" ? activeRegion : undefined, school: view === "school" ? activeSchool : undefined });
  const top = rows.filter((r) => r.rank <= 10);
  const mine = me ? rows.find((r) => r.sid === me.sid) : undefined;
  const unit = metric === "total" ? "Points" : metric === "academics" ? "Academic pts" : "Achievement pts";
  const scope = view === "region" ? activeRegion : view === "school" ? activeSchool : "All students";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#4A90E2]">Recognition</p>
        <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold text-[#23405F]"><Trophy className="text-amber-500" /> Leaderboard – Top 10</h1>
        <p className="mt-1 text-sm text-[#6B7F95]">Points come from assignments, achievements, participation, academics and verified mentor evaluation.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {VIEWS.map(([id, label]) => (
          <button key={id} onClick={() => setView(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${view === id ? "bg-[#4A90E2] text-white" : "border border-[#D8E8F7] bg-white text-[#46627F] hover:bg-[#DCEEFF]"}`}>{label}</button>
        ))}
        {view === "region" && (
          <select aria-label="Region" value={activeRegion} onChange={(e) => setRegion(e.target.value)} className="rounded-xl border border-[#D8E8F7] bg-white px-3 py-1.5 text-sm">
            {regionList.map((r) => <option key={r}>{r}</option>)}
          </select>
        )}
        {view === "school" && (
          <select aria-label="School or college" value={activeSchool} onChange={(e) => setSchool(e.target.value)} className="rounded-xl border border-[#D8E8F7] bg-white px-3 py-1.5 text-sm">
            {schoolList.map((r) => <option key={r}>{r}</option>)}
          </select>
        )}
      </div>

      {/* Student's own position */}
      {me && mine && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#4A90E2] p-5 text-white">
          <div><p className="text-sm text-blue-100">Your position · {scope}</p><p className="text-3xl font-bold">Rank #{mine.rank}</p></div>
          <div className="text-right"><p className="text-sm text-blue-100">{unit}</p><p className="text-3xl font-bold">{mine.points}</p></div>
        </div>
      )}
      {me && !mine && view !== "overall" && view !== "academics" && view !== "achievements" && (
        <p className="rounded-xl border border-[#D8E8F7] bg-white p-3 text-sm text-[#6B7F95]">You are not in this {view === "region" ? "region" : "school"}. Pick yours to see your rank.</p>
      )}

      {top.length === 0 ? (
        <p className="rounded-2xl border border-[#D8E8F7] bg-white p-8 text-center text-[#6B7F95]">No students to show yet.</p>
      ) : (
        <>
          {/* Top 3 */}
          <div className="grid gap-4 md:grid-cols-3">
            {top.filter((r) => r.rank <= 3).slice(0, 3).map((r) => <PodiumCard key={r.sid} row={r} i={Math.min(r.rank, 3) - 1} unit={unit} mine={r.sid === me?.sid} />)}
          </div>

          {/* Top 10 table */}
          <div className="overflow-x-auto rounded-2xl border border-[#D8E8F7] bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[#EAF4FF] text-xs uppercase tracking-wider text-[#6B7F95]">
                <tr><th className="px-4 py-3">Rank</th><th className="px-4 py-3">Student</th><th className="px-4 py-3">Region</th><th className="px-4 py-3 text-right">{unit}</th></tr>
              </thead>
              <tbody>
                {top.map((r) => (
                  <tr key={r.sid} className={`border-t border-[#EAF1F8] ${r.sid === me?.sid ? "bg-[#EAF4FF] font-semibold" : ""} ${r.rank <= 3 ? "bg-amber-50/40" : ""}`}>
                    <td className="px-4 py-3"><RankBadge rank={r.rank} /></td>
                    <td className="px-4 py-3 text-[#23405F]">{r.name}{r.sid === me?.sid && <span className="ml-2 rounded-full bg-[#4A90E2] px-2 py-0.5 text-[10px] text-white">You</span>}<div className="text-xs font-normal text-[#8CA0B5]">{r.school}</div></td>
                    <td className="px-4 py-3 text-[#46627F]">{r.region}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#23405F]">{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {mine && mine.rank > 10 && (
            <p className="text-center text-sm text-[#6B7F95]">You are ranked <b>#{mine.rank}</b> with <b>{mine.points}</b> points – keep going to reach the Top 10.</p>
          )}
        </>
      )}

      <p className="text-xs text-[#8CA0B5]">Points: {CATEGORIES.map(([, l]) => l).join(" + ")}. Students with equal points share a rank.</p>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) return <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${PODIUM[rank - 1].badge}`}>{rank}</span>;
  return <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F9] text-xs font-semibold text-[#46627F]">{rank}</span>;
}

function PodiumCard({ row, i, unit, mine }: { row: Row; i: number; unit: string; mine: boolean }) {
  const p = PODIUM[Math.max(0, Math.min(2, i))];
  const Icon = row.rank === 1 ? Crown : Medal;
  return (
    <div className={`rounded-2xl border-2 p-5 text-center shadow-sm ${p.box} ${mine ? "ring-2 ring-[#4A90E2]" : ""}`}>
      <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${p.badge}`}><Icon size={22} /></div>
      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6B7F95]">Rank {row.rank}</p>
      <h3 className="mt-1 text-lg font-bold text-[#23405F]">{row.name}</h3>
      <p className="text-xs text-[#6B7F95]">{row.region} · {row.school}</p>
      <p className="mt-3 text-2xl font-bold text-[#23405F]">{row.points}</p>
      <p className="text-xs text-[#6B7F95]">{unit}</p>
    </div>
  );
}

export default Leaderboard;
