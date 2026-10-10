import { useState, type ReactNode } from "react";
import { Eye, Mail, Plus, Save, Search, Trash2, UserCheck, UserCircle, Users, X } from "lucide-react";
import Avatar from "../Avatar";
import {
  addUser, deleteUser, findBySid, fullName, getUsers, roleOf, studentsOf, updateUser, useStore,
  type Status, type User,
} from "../../lib/store";

type Props = { role: "student" | "mentor" };

const input =
  "w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-2.5 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]";
const label = "mb-1.5 block text-xs font-semibold text-[#6B7F95]";

type Draft = {
  first: string; last: string; email: string; sid: string; status: Status; pw: string;
  school: string; cls: string; sec: string; mentorSid: string; progress: string;
  expertise: string; city: string;
  phone: string; dob: string; gender: string; address: string; state: string;
  guardian: string; guardianPhone: string; bio: string;
};

const emptyDraft = (role: Props["role"]): Draft => ({
  first: "", last: "", email: "", sid: role === "student" ? "STU-" : "MEN-", status: "Active", pw: "",
  school: "", cls: "", sec: "", mentorSid: "", progress: "0", expertise: "", city: "",
  phone: "", dob: "", gender: "", address: "", state: "", guardian: "", guardianPhone: "", bio: "",
});

const toDraft = (u: User): Draft => ({
  first: u.first, last: u.last, email: u.email, sid: u.sid, status: u.status ?? "Active", pw: "",
  school: u.school, cls: u.cls, sec: u.sec, mentorSid: u.mentorSid ?? "", progress: String(u.progress ?? 0),
  expertise: u.expertise ?? "", city: u.city ?? "",
  phone: u.phone ?? "", dob: u.dob ?? "", gender: u.gender ?? "", address: u.address ?? "", state: u.state ?? "",
  guardian: u.guardian ?? "", guardianPhone: u.guardianPhone ?? "", bio: u.bio ?? "",
});

export default function UserManager({ role }: Props) {
  useStore();
  const isStudent = role === "student";
  const word = isStudent ? "Student" : "Mentor";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [modal, setModal] = useState<{ mode: "add" } | { mode: "edit"; email: string } | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft(role));
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const all = getUsers().filter((u) => roleOf(u) === role);
  const mentors = getUsers().filter((u) => roleOf(u) === "mentor");

  const q = search.trim().toLowerCase();
  const list = all.filter((u) => {
    const hay = `${fullName(u)} ${u.sid} ${u.email} ${u.expertise ?? ""} ${u.school}`.toLowerCase();
    return hay.includes(q) && (statusFilter === "All" || (u.status ?? "Active") === statusFilter);
  });

  const active = all.filter((u) => (u.status ?? "Active") === "Active").length;
  const editing = modal?.mode === "edit" ? all.find((u) => u.email === modal.email) ?? null : null;

  const open = (m: NonNullable<typeof modal>) => {
    setError("");
    if (m.mode === "edit") {
      const u = all.find((x) => x.email === m.email);
      if (!u) return;
      setDraft(toDraft(u));
    } else setDraft(emptyDraft(role));
    setModal(m);
  };
  const close = () => { setModal(null); setError(""); };
  const set = (k: keyof Draft) => (v: string) => setDraft((d) => ({ ...d, [k]: v }));
  const field = (k: keyof Draft, text: string, type = "text", placeholder = "") => (
    <div>
      <label className={label}>{text}</label>
      <input type={type} value={draft[k]} placeholder={placeholder} onChange={(e) => set(k)(e.target.value)} className={input} />
    </div>
  );

  const save = () => {
    const progress = Math.min(100, Math.max(0, Number(draft.progress) || 0));
    const common = {
      first: draft.first.trim(), last: draft.last.trim(), email: draft.email.trim(), sid: draft.sid.trim(),
      status: draft.status, phone: draft.phone.trim(), dob: draft.dob, gender: draft.gender,
      address: draft.address.trim(), city: draft.city.trim(), state: draft.state.trim(),
    };
    const specific = isStudent
      ? {
          school: draft.school.trim() || "—", cls: draft.cls.trim() || "—", sec: draft.sec.trim() || "—",
          mentorSid: draft.mentorSid || undefined, progress,
          guardian: draft.guardian.trim(), guardianPhone: draft.guardianPhone.trim(), bio: draft.bio.trim(),
        }
      : { expertise: draft.expertise.trim() };

    if (modal?.mode === "add") {
      if (draft.pw.length < 8) return setError("Set a starting password of at least 8 characters.");
      const err = addUser({ role, school: "—", cls: "—", sec: "—", ...common, ...specific, pw: draft.pw });
      if (err) return setError(err);
      setNotice(`${word} added successfully.`);
    } else if (editing) {
      const err = updateUser(editing.email, { ...common, ...specific, ...(draft.pw ? { pw: draft.pw } : {}) });
      if (err) return setError(err);
      setNotice(`${fullName(common)} updated successfully.`);
    }
    close();
    setTimeout(() => setNotice(""), 3000);
  };

  const remove = () => {
    if (!editing) return;
    if (!window.confirm(`Delete ${fullName(editing)}? This cannot be undone.`)) return;
    const err = deleteUser(editing.email);
    if (err) return setError(err);
    setNotice(`${fullName(editing)} deleted.`);
    close();
    setTimeout(() => setNotice(""), 3000);
  };

  const card = (icon: ReactNode, name: string, value: number) => (
    <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
      <div className="w-fit rounded-xl bg-[#DCEEFF] p-3 text-[#4A90E2]">{icon}</div>
      <p className="mt-4 text-sm text-[#6B7F95]">{name}</p>
      <p className="mt-1 text-3xl font-bold text-[#23405F]">{value}</p>
    </div>
  );

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">{word} Management</h1>
          <p className="mt-1 text-[#6B7F95]">View, update, add and remove {word.toLowerCase()}s.</p>
        </div>
        <button type="button" onClick={() => open({ mode: "add" })}
          className="flex items-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3B7FCB]">
          <Plus size={18} /> Add {word}
        </button>
      </div>

      {notice && <div className="rounded-xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-600">{notice}</div>}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {card(<UserCircle size={22} />, `Total ${word}s`, all.length)}
        {card(<UserCheck size={22} />, `Active ${word}s`, active)}
        {card(isStudent ? <Mail size={22} /> : <Users size={22} />,
          isStudent ? `Inactive ${word}s` : "Students Under Mentorship",
          isStudent ? all.length - active : all.reduce((n, m) => n + studentsOf(m.sid).length, 0))}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 md:max-w-md">
          <Search size={18} className="text-[#6B7F95]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${word.toLowerCase()}...`}
            className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]" />
        </div>
        <div className="flex gap-2">
          {(["All", "Active", "Inactive"] as const).map((o) => (
            <button key={o} type="button" onClick={() => setStatusFilter(o)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${statusFilter === o ? "bg-[#4A90E2] text-white" : "border border-[#D8E8F7] bg-white text-[#4A90E2] hover:bg-[#DCEEFF]"}`}>
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#D8E8F7] bg-white shadow-sm">
        <div className="border-b border-[#D8E8F7] px-6 py-5">
          <h2 className="text-lg font-bold text-[#23405F]">Registered {word}s</h2>
          <p className="mt-1 text-sm text-[#6B7F95]">{list.length} {word.toLowerCase()}{list.length !== 1 ? "s" : ""} found</p>
        </div>

        {list.length === 0 ? (
          <div className="p-10 text-center">
            <UserCircle size={32} className="mx-auto text-[#8CA0B5]" />
            <h3 className="mt-3 font-semibold text-[#23405F]">No {word.toLowerCase()}s found</h3>
            <p className="mt-1 text-sm text-[#6B7F95]">Try another search or filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#D8E8F7]">
            {list.map((u) => {
              const st = u.status ?? "Active";
              const mentor = findBySid(u.mentorSid);
              return (
                <div key={u.email} className="flex flex-col gap-4 px-6 py-5 transition hover:bg-[#F8FBFF] md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar user={u} size={44} />
                    <div>
                      <h3 className="font-semibold text-[#23405F]">{fullName(u)}</h3>
                      <p className="mt-1 text-sm text-[#6B7F95]">
                        {u.sid} • {isStudent ? `${u.school} • Class ${u.cls}-${u.sec}` : u.expertise || "—"}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[#8CA0B5]"><Mail size={13} />{u.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {isStudent ? (
                      <div className="min-w-28">
                        <p className="text-xs text-[#8CA0B5]">{mentor ? fullName(mentor) : "No mentor"}</p>
                        <div className="mt-2 h-2 rounded-full bg-[#EAF4FF]">
                          <div className="h-full rounded-full bg-[#4A90E2]" style={{ width: `${u.progress ?? 0}%` }} />
                        </div>
                        <p className="mt-1 text-xs font-semibold text-[#23405F]">{u.progress ?? 0}%</p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="text-xs text-[#8CA0B5]">Students</p>
                        <p className="font-semibold text-[#23405F]">{studentsOf(u.sid).length}</p>
                      </div>
                    )}
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${st === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>{st}</span>
                    <button type="button" onClick={() => open({ mode: "edit", email: u.email })}
                      className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]">
                      <Eye size={17} /> View / Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-5">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {editing && <Avatar user={editing} size={56} />}
                <div>
                  <h2 className="text-xl font-bold text-[#23405F]">{modal.mode === "add" ? `Add ${word}` : `${word} Details`}</h2>
                  <p className="mt-1 text-sm text-[#6B7F95]">{modal.mode === "add" ? "Create a new account." : editing?.sid}</p>
                </div>
              </div>
              <button type="button" onClick={close} className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]">
                <X size={18} />
              </button>
            </div>

            {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</div>}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {field("first", "First name")}
              {field("last", "Last name")}
              {field("email", "Email", "email")}
              {field("sid", isStudent ? "Student ID" : "Mentor ID")}

              {isStudent ? (
                <>
                  <div className="md:col-span-2">{field("school", "School")}</div>
                  {field("cls", "Class")}
                  {field("sec", "Section")}
                  <div>
                    <label className={label}>Assigned mentor</label>
                    <select value={draft.mentorSid} onChange={(e) => set("mentorSid")(e.target.value)} className={input}>
                      <option value="">— Not assigned —</option>
                      {mentors.map((m) => <option key={m.sid} value={m.sid}>{fullName(m)} ({m.sid})</option>)}
                    </select>
                  </div>
                  {field("progress", "Progress (%)", "number")}
                </>
              ) : (
                <>
                  {field("expertise", "Subject / expertise")}
                  {field("city", "City")}
                </>
              )}

              <div>
                <label className={label}>Account status</label>
                <select value={draft.status} onChange={(e) => set("status")(e.target.value)} className={input}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              {field("pw", modal.mode === "add" ? "Starting password" : "Reset password (optional)", "text",
                modal.mode === "add" ? "At least 8 characters" : "Leave empty to keep current")}

              {field("phone", "Phone", "tel")}
              {isStudent && field("dob", "Date of birth", "date")}
              {isStudent && (
                <div>
                  <label className={label}>Gender</label>
                  <select value={draft.gender} onChange={(e) => set("gender")(e.target.value)} className={input}>
                    <option value="">Not specified</option>
                    <option>Female</option><option>Male</option><option>Other</option>
                  </select>
                </div>
              )}
              {isStudent && (
                <>
                  <div className="md:col-span-2">{field("address", "Address")}</div>
                  {field("city", "City")}
                  {field("state", "State")}
                  {field("guardian", "Parent / guardian")}
                  {field("guardianPhone", "Guardian phone", "tel")}
                  <div className="md:col-span-2">
                    <label className={label}>About the student</label>
                    <textarea value={draft.bio} onChange={(e) => set("bio")(e.target.value)} rows={3} className={input} />
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={save}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]">
                <Save size={18} /> {modal.mode === "add" ? `Add ${word}` : "Save changes"}
              </button>
              {modal.mode === "edit" && (
                <button type="button" onClick={remove}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 hover:bg-red-50">
                  <Trash2 size={18} /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
