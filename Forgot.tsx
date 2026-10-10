import { useState } from "react";
import { resetPassword } from "../../lib/store";
import { useT } from "../../lib/i18n";
import { Shell, Field, PasswordInput, inputCls, primaryBtn } from "./ui";

export default function Forgot({ go }: { go: (r: string, notice?: string) => void }) {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setErr("Enter a valid email address.");
    if (pw.length < 8) return setErr("New password must be at least 8 characters.");
    const e = resetPassword(email.trim(), pw);
    if (e) return setErr(e);
    go("login", "Password updated! Log in with your new password.");
  };
  return (
    <Shell>
      <h1 className="mt-2 text-2xl font-bold">{t("Forgot password?")}</h1>
      <p className="text-sm text-slate-500">{t("Enter your account email and choose a new password.")}</p>
      <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" className={inputCls} /></Field>
      <Field label="New password"><PasswordInput value={pw} onChange={setPw} placeholder={t("At least 8 characters")} /></Field>
      {err && <p className="mt-2 text-xs text-red-600">{t(err)}</p>}
      <button onClick={submit} className={primaryBtn}>{t("Reset password")}</button>
      <p className="mt-4 text-center text-sm"><button onClick={() => go("login")} className="font-semibold text-indigo-600">{t("← Back to login")}</button></p>
    </Shell>
  );
}
