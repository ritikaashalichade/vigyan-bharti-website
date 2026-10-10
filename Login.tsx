import { useState } from "react";
import { login, loginDemo, getCurrentUser, logout, roleOf, type Role } from "../../lib/store";
import { useT } from "../../lib/i18n";
import { Shell, Field, PasswordInput, RolePicker, inputCls, primaryBtn } from "./ui";

export default function Login({ go, notice }: { go: (r: string) => void; notice?: string }) {
  const { t } = useT();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [role, setRole] = useState<Role>("student");

  const submit = () => {
    if (!id.trim() || !pw) return setErr("Enter your email/student ID and password.");
    const e = login(id, pw);
    if (e) return setErr(e);
    const u = getCurrentUser();
    if (u && roleOf(u) !== role) { logout(); return setErr(t("Please pick the correct role above for this account.")); }
    go("dashboard");
  };

  return (
    <Shell>
      <h1 className="mt-2 text-2xl font-bold">{t("Welcome back")}</h1>
      <p className="text-sm text-slate-500">{t("Log in to continue your learning journey.")}</p>
      <RolePicker role={role} setRole={setRole} />
      {notice && <div className="mt-4 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700">{t(notice)}</div>}
      <Field label="Email / Student ID">
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="student@school.edu or STU-0000" className={inputCls} />
      </Field>
      <Field label="Password">
        <PasswordInput value={pw} onChange={setPw} placeholder="••••••••" />
      </Field>
      <div className="mt-2 text-right"><button onClick={() => go("forgot")} className="text-xs font-semibold text-indigo-600">{t("Forgot password?")}</button></div>
      {err && <p className="mt-2 text-xs text-red-600">{t(err)}</p>}
      <button onClick={submit} className={primaryBtn}>{t("Log in")}</button>
      <p className="mt-4 text-center text-sm text-slate-500">
        {t("New here?")} <button onClick={() => go("register")} className="font-semibold text-indigo-600">{t("Create a student account")}</button>
      </p>
      <p className="mt-2 text-center text-sm">
        <button onClick={() => { loginDemo(role); go("dashboard"); }} className="font-semibold text-indigo-600">{t("Try demo account")} ({t(role[0].toUpperCase() + role.slice(1))})</button>
      </p>
      <p className="mt-2 text-center text-sm"><button onClick={() => go("home")} className="text-slate-500">{t("← Back to home")}</button></p>
    </Shell>
  );
}
