import { useState } from "react";
import { register, type Role } from "../../lib/store";
import { useT } from "../../lib/i18n";
import { Shell, Field, PasswordInput, RolePicker, inputCls, primaryBtn } from "./ui";

const SCHOOLS = ["Nagpur Public School", "St. Xavier's High School", "Delhi Model School", "Other"];

export default function Register({ go }: { go: (r: string, notice?: string) => void }) {
  const { t } = useT();
  const [f, setF] = useState({ first: "", last: "", email: "", sid: "", school: "", cls: "", sec: "", pw: "", pw2: "" });
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [role, setRole] = useState<Role>("student");
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const text = (k: keyof typeof f, ph: string) => (
    <input value={f[k]} onChange={(e) => set(k)(e.target.value)} placeholder={t(ph)} className={inputCls} />
  );

  const submit = () => {
    const { pw2, ...u } = { ...f, first: f.first.trim(), last: f.last.trim(), email: f.email.trim(), sid: f.sid.trim(), cls: f.cls.trim(), sec: f.sec.trim() };
    if (!u.first || !u.last || !u.email || !u.sid || (role === "student" && (!u.school || !u.cls || !u.sec))) return setErr("Please fill in all fields.");
    if (!/^\S+@\S+\.\S+$/.test(u.email)) return setErr("Enter a valid email address.");
    if (u.pw.length < 8) return setErr("Password must be at least 8 characters.");
    if (u.pw !== pw2) return setErr("Passwords do not match.");
    if (!agree) return setErr("Please accept the Terms to continue.");
    const e = register({ ...u, role, school: u.school || "—", cls: u.cls || "—", sec: u.sec || "—" });
    if (e) return setErr(e);
    go("login", "Account created! Log in to continue.");
  };

  return (
    <Shell wide>
      <h1 className="mt-2 text-2xl font-bold">{t("Create your account")}</h1>
      <p className="text-sm text-slate-500">{t("Takes about a minute. A mentor is assigned after sign-up.")}</p>
      <RolePicker role={role} setRole={setRole} roles={["student", "mentor"]} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="First name">{text("first", "First name")}</Field>
        <Field label="Last name">{text("last", "Last name")}</Field>
      </div>
      <Field label="Email">{text("email", "student@school.edu")}</Field>
      <Field label={role === "student" ? "Student ID" : "Staff ID"}>{text("sid", "STU-0000")}</Field>
      {role === "student" && (
        <>
      <Field label="School">
        <select value={f.school} onChange={(e) => set("school")(e.target.value)} className={inputCls}>
          <option value="">{t("Select school")}</option>
          {SCHOOLS.map((s) => <option key={s} value={s}>{t(s)}</option>)}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Class">{text("cls", "Class")}</Field>
        <Field label="Section">{text("sec", "Sec")}</Field>
      </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Password"><PasswordInput value={f.pw} onChange={set("pw")} placeholder={t("Create password")} /></Field>
        <Field label="Confirm password"><PasswordInput value={f.pw2} onChange={set("pw2")} placeholder={t("Repeat password")} /></Field>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> {t("I agree to the Terms & Privacy Policy")}
      </label>
      {err && <p className="mt-2 text-xs text-red-600">{t(err)}</p>}
      <button onClick={submit} className={primaryBtn}>{t("Create account")}</button>
      <p className="mt-4 text-center text-sm text-slate-500">
        {t("Already registered?")} <button onClick={() => go("login")} className="font-semibold text-indigo-600">{t("Log in")}</button>
      </p>
      <p className="mt-2 text-center text-sm"><button onClick={() => go("home")} className="text-slate-500">{t("← Back to home")}</button></p>
    </Shell>
  );
}
