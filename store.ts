// Single source of truth for accounts, login and profile data (saved in the browser's localStorage).
// Replace the functions below with real API calls when the backend is ready – the pages only use these.
import { useSyncExternalStore } from "react";

export type Role = "student" | "mentor" | "admin";
export type Status = "Active" | "Inactive";

export type User = {
  role?: Role; // old accounts have no role, they are students
  first: string; last: string; email: string; sid: string;
  school: string; cls: string; sec: string; pw: string;
  // set by the admin
  status?: Status;     // Inactive accounts cannot log in
  mentorSid?: string;  // students: ID of the assigned mentor
  progress?: number;   // students: overall progress, 0-100
  expertise?: string;  // mentors: subject / area
  // profile details the user can edit themselves
  photo?: string;      // profile picture (small image saved as a data URL)
  phone?: string; dob?: string; gender?: string;
  address?: string; city?: string; state?: string;
  guardian?: string; guardianPhone?: string; bio?: string;
  // leaderboard (students): region + points earned in each category
  region?: string;
  pts?: Points;
};

export type Points = { assignments: number; achievements: number; participation: number; academics: number; mentor: number };

const USERS = "sm_users";
const SESSION = "sm_session";
const SEEDED = "vb_seeded_v2";

// ---------- low level storage ----------
function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

// ---------- tiny change notifier so every component re-renders after an update ----------
const listeners = new Set<() => void>();
let version = 0;
const emit = () => { version++; listeners.forEach((l) => l()); };
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", emit); // changes made in other browser tabs
  return () => { listeners.delete(cb); window.removeEventListener("storage", emit); };
};
/** Call once at the top of a component that shows user data; it re-renders whenever the data changes. */
export const useStore = () => useSyncExternalStore(subscribe, () => version);

// ---------- helpers ----------
export const roleOf = (u: User): Role => u.role ?? "student";
export const fullName = (u: Pick<User, "first" | "last">) => `${u.first} ${u.last}`.trim();
export const initials = (u: Pick<User, "first" | "last">) =>
  `${u.first.replace(/^Dr\.?\s*/i, "").charAt(0)}${u.last.charAt(0)}`.toUpperCase();
export const homePathFor = (role: Role) => (role === "admin" ? "/admin" : role === "mentor" ? "/mentor" : "/student");
const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export const getUsers = () => read<User[]>(USERS, []);
export const getSession = () => read<string | null>(SESSION, null);
export const getCurrentUser = () => { const s = getSession(); return s ? getUsers().find((u) => same(u.email, s)) ?? null : null; };
export const studentsOf = (mentorSid: string) => getUsers().filter((u) => roleOf(u) === "student" && u.mentorSid === mentorSid);
export const findBySid = (sid?: string) => (sid ? getUsers().find((u) => same(u.sid, sid)) ?? null : null);

// ---------- sample data (first run only) ----------
const P = (assignments: number, achievements: number, participation: number, academics: number, mentor: number): Points => ({ assignments, achievements, participation, academics, mentor });
const base = { pw: "demo1234", status: "Active" as Status };
const SEED: User[] = [
  { ...base, role: "admin", first: "Admin", last: "User", email: "admin@school.edu", sid: "ADM-0001", school: "—", cls: "—", sec: "—" },
  { ...base, role: "mentor", first: "Priya", last: "Deshmukh", email: "mentor@school.edu", sid: "MEN-0001", school: "—", cls: "—", sec: "—", expertise: "Mathematics", city: "Nagpur" },
  { ...base, role: "mentor", first: "Dr. Rahul", last: "Sharma", email: "rahul.mentor@vvm.org", sid: "MEN-2001", school: "—", cls: "—", sec: "—", expertise: "Data Structures & Java" },
  { ...base, role: "mentor", first: "Dr. Neha", last: "Joshi", email: "neha.mentor@vvm.org", sid: "MEN-2002", school: "—", cls: "—", sec: "—", expertise: "Database Management" },
  { ...base, role: "mentor", first: "Dr. Amit", last: "Patel", email: "amit.mentor@vvm.org", sid: "MEN-2003", school: "—", cls: "—", sec: "—", expertise: "Operating Systems" },
  { ...base, role: "mentor", first: "Dr. Priya", last: "Mehta", email: "priya.mentor@vvm.org", sid: "MEN-2004", school: "—", cls: "—", sec: "—", expertise: "Computer Networks", status: "Inactive" },
  { ...base, role: "student", first: "Aarav", last: "Sharma", email: "demo@school.edu", sid: "STU-0001", school: "Nagpur Public School", cls: "10", sec: "A", mentorSid: "MEN-0001", progress: 72, region: "Maharashtra", pts: P(210, 90, 70, 150, 120) },
  { ...base, role: "student", first: "Amisha", last: "Agarwal", email: "amisha@student.edu", sid: "STU-1001", school: "Nagpur Public School", cls: "10", sec: "B", mentorSid: "MEN-2001", progress: 82, region: "Maharashtra", pts: P(240, 110, 80, 170, 140) },
  { ...base, role: "student", first: "Priya", last: "Sharma", email: "priya@student.edu", sid: "STU-1002", school: "Delhi Model School", cls: "9", sec: "A", mentorSid: "MEN-2002", progress: 76, region: "Delhi", pts: P(220, 70, 75, 160, 130) },
  { ...base, role: "student", first: "Ananya", last: "Verma", email: "ananya@student.edu", sid: "STU-1003", school: "St. Xavier's High School", cls: "9", sec: "B", mentorSid: "MEN-2003", progress: 54, status: "Inactive", region: "Delhi", pts: P(120, 30, 40, 90, 60) },
  { ...base, role: "student", first: "Riya", last: "Patil", email: "riya@school.edu", sid: "STU-1004", school: "Nagpur Public School", cls: "10", sec: "B", mentorSid: "MEN-0001", progress: 85, region: "Maharashtra", pts: P(250, 120, 85, 175, 150) },
  { ...base, role: "student", first: "Kabir", last: "Singh", email: "kabir@school.edu", sid: "STU-1005", school: "Delhi Model School", cls: "9", sec: "A", mentorSid: "MEN-0001", progress: 54, region: "Delhi", pts: P(140, 40, 55, 100, 70) },
  { ...base, role: "student", first: "Meera", last: "Joshi", email: "meera@school.edu", sid: "STU-1006", school: "Nagpur Public School", cls: "10", sec: "A", mentorSid: "MEN-0001", progress: 91, region: "Maharashtra", pts: P(270, 130, 90, 190, 160) },
  { ...base, role: "student", first: "Ishaan", last: "Mehta", email: "ishaan@school.edu", sid: "STU-1007", school: "Sardar Patel Vidyalaya", cls: "10", sec: "A", mentorSid: "MEN-2001", progress: 88, region: "Gujarat", pts: P(260, 100, 80, 185, 145) },
  { ...base, role: "student", first: "Diya", last: "Nair", email: "diya@school.edu", sid: "STU-1008", school: "Bangalore Science Academy", cls: "9", sec: "B", mentorSid: "MEN-2002", progress: 79, region: "Karnataka", pts: P(225, 95, 70, 165, 125) },
  { ...base, role: "student", first: "Vihaan", last: "Reddy", email: "vihaan@school.edu", sid: "STU-1009", school: "Bangalore Science Academy", cls: "10", sec: "A", mentorSid: "MEN-2003", progress: 93, region: "Karnataka", pts: P(280, 140, 95, 195, 165) },
  { ...base, role: "student", first: "Saanvi", last: "Gupta", email: "saanvi@school.edu", sid: "STU-1010", school: "Lucknow Public School", cls: "9", sec: "A", mentorSid: "MEN-2001", progress: 70, region: "Uttar Pradesh", pts: P(190, 60, 65, 140, 105) },
  { ...base, role: "student", first: "Arjun", last: "Kulkarni", email: "arjun@school.edu", sid: "STU-1011", school: "Pune Vidya Mandir", cls: "10", sec: "B", mentorSid: "MEN-2002", progress: 84, region: "Maharashtra", pts: P(235, 105, 78, 172, 138) },
  { ...base, role: "student", first: "Tara", last: "Iyer", email: "tara@school.edu", sid: "STU-1012", school: "Sardar Patel Vidyalaya", cls: "9", sec: "A", mentorSid: "MEN-2003", progress: 66, region: "Gujarat", pts: P(170, 55, 60, 125, 95) },
  { ...base, role: "student", first: "Rohan", last: "Yadav", email: "rohan@school.edu", sid: "STU-1013", school: "Lucknow Public School", cls: "10", sec: "B", mentorSid: "MEN-0001", progress: 74, region: "Uttar Pradesh", pts: P(205, 85, 72, 150, 115) },
];
function seed() {
  if (read<boolean>(SEEDED, false)) return;
  const users = getUsers();
  const missing = SEED.filter((s) => !users.some((u) => same(u.email, s.email) || same(u.sid, s.sid)));
  // accounts made earlier (e.g. the old demo logins) keep their data, just get a role / status filled in
  const merged = users.map((u) => { const s = SEED.find((x) => same(x.email, u.email)); return s ? { ...s, ...u, role: u.role ?? s.role } : u; });
  write(USERS, [...merged, ...missing]);
  write(SEEDED, true);
}
seed();

// ---------- login / logout ----------
export function login(id: string, pw: string): string | null {
  const q = id.trim().toLowerCase();
  const u = getUsers().find((x) => (x.email.toLowerCase() === q || x.sid.toLowerCase() === q) && x.pw === pw);
  if (!u) return "Incorrect credentials. Please check and try again.";
  if (u.status === "Inactive") return "This account is inactive. Please contact the administrator.";
  write(SESSION, u.email);
  emit();
  return null;
}
export function loginDemo(role: Role = "student") {
  const email = role === "admin" ? "admin@school.edu" : role === "mentor" ? "mentor@school.edu" : "demo@school.edu";
  write(SESSION, email);
  emit();
}
export const logout = () => { write(SESSION, null); emit(); };

// ---------- accounts ----------
export function register(u: User): string | null {
  if (roleOf(u) === "admin") return "Admin accounts can only be created by an administrator.";
  const err = addUser({ ...u, status: "Active", progress: roleOf(u) === "student" ? 0 : undefined });
  return err;
}

/** Used by the registration form and by the admin "Add" forms. */
export function addUser(u: User): string | null {
  const users = getUsers();
  if (users.some((x) => same(x.email, u.email) || same(x.sid, u.sid)))
    return "An account with this email or ID already exists.";
  if (!write(USERS, [...users, u])) return "Could not save – browser storage is full or blocked.";
  emit();
  return null;
}

/** Changes some fields of one account (found by its current email). Used for profile edits and by the admin. */
export function updateUser(email: string, patch: Partial<User>): string | null {
  const users = getUsers();
  const old = users.find((x) => same(x.email, email));
  if (!old) return "Account not found.";
  const next: User = { ...old, ...patch };
  if (!next.first.trim() || !next.last.trim()) return "First and last name are required.";
  if (!/^\S+@\S+\.\S+$/.test(next.email.trim())) return "Enter a valid email address.";
  if (!next.sid.trim()) return "ID is required.";
  if (users.some((x) => x !== old && (same(x.email, next.email) || same(x.sid, next.sid))))
    return "Another account already uses this email or ID.";
  if (patch.pw !== undefined && patch.pw.length < 8) return "Password must be at least 8 characters.";
  if (old.status !== "Inactive" && next.status === "Inactive" && roleOf(old) === "admin" && users.filter((x) => roleOf(x) === "admin" && x.status !== "Inactive").length < 2)
    return "You cannot deactivate the only active admin.";

  const list = users.map((x) => {
    if (x === old) return next;
    // keep students linked if their mentor's ID is edited
    if (roleOf(old) === "mentor" && x.mentorSid === old.sid && old.sid !== next.sid) return { ...x, mentorSid: next.sid };
    return x;
  });
  if (!write(USERS, list)) return "Could not save – browser storage is full or blocked. Try a smaller picture.";
  if (same(getSession() ?? "", old.email) && !same(old.email, next.email)) write(SESSION, next.email);
  emit();
  return null;
}

export function deleteUser(email: string): string | null {
  const users = getUsers();
  const u = users.find((x) => same(x.email, email));
  if (!u) return "Account not found.";
  if (same(getSession() ?? "", u.email)) return "You cannot delete the account you are logged in with.";
  if (roleOf(u) === "admin" && users.filter((x) => roleOf(x) === "admin").length < 2) return "You cannot delete the only admin.";
  const list = users.filter((x) => x !== u).map((x) => (roleOf(u) === "mentor" && x.mentorSid === u.sid ? { ...x, mentorSid: undefined } : x));
  write(USERS, list);
  emit();
  return null;
}

export function resetPassword(email: string, pw: string): string | null {
  const users = getUsers();
  if (!users.some((u) => same(u.email, email))) return "No account found with this email.";
  write(USERS, users.map((u) => (same(u.email, email) ? { ...u, pw } : u)));
  emit();
  return null;
}

export function changePassword(email: string, current: string, next: string): string | null {
  const u = getUsers().find((x) => same(x.email, email));
  if (!u) return "Account not found.";
  if (u.pw !== current) return "Current password is incorrect.";
  if (next.length < 8) return "New password must be at least 8 characters.";
  return updateUser(email, { pw: next });
}
