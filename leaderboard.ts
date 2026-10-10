// Leaderboard maths – points come from five categories; mentor points count only after the mentor has verified them.
import { getUsers, roleOf, type Points, type User } from "./store";

export type Metric = "total" | "academics" | "achievements";
export type Row = { sid: string; name: string; school: string; region: string; points: number; total: number; rank: number; pts: Points };

export const CATEGORIES: [keyof Points, string][] = [
  ["assignments", "Assignments"], ["achievements", "Achievements"], ["participation", "Participation"],
  ["academics", "Academics"], ["mentor", "Mentor evaluation"],
];
export const NO_POINTS: Points = { assignments: 0, achievements: 0, participation: 0, academics: 0, mentor: 0 };
export const totalOf = (p: Points) => p.assignments + p.achievements + p.participation + p.academics + p.mentor;

export const students = () => getUsers().filter((u) => roleOf(u) === "student" && u.status !== "Inactive");
export const regionOf = (u: User) => u.region || u.state || "Other";
export const regions = () => [...new Set(students().map(regionOf))].sort();
export const schools = () => [...new Set(students().map((u) => u.school))].sort();

/** Ranked list. Same points share a rank (1,2,2,4). Ties are ordered by name so the list is stable. */
export function ranked(opts: { metric?: Metric; region?: string; school?: string } = {}): Row[] {
  const metric = opts.metric ?? "total";
  const rows = students()
    .filter((u) => (!opts.region || regionOf(u) === opts.region) && (!opts.school || u.school === opts.school))
    .map((u) => {
      const pts = u.pts ?? NO_POINTS;
      const total = totalOf(pts);
      return { sid: u.sid, name: `${u.first} ${u.last}`.trim(), school: u.school, region: regionOf(u), points: metric === "total" ? total : pts[metric], total, rank: 0, pts };
    })
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  rows.forEach((r, i) => { r.rank = i > 0 && rows[i - 1].points === r.points ? rows[i - 1].rank : i + 1; });
  return rows;
}
