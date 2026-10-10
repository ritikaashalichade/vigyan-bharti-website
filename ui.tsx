import { useState, type ReactNode } from "react";
import type { Role } from "../../lib/store";
import { useT } from "../../lib/i18n";
import { LangSelect } from "./common";

export function Shell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 p-5 text-slate-800">
      <div className={`w-full ${wide ? "max-w-lg" : "max-w-md"} rounded-2xl border border-slate-200 bg-white p-7 shadow-sm`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Srijan logo" className="h-12 w-12 rounded-full object-cover" />
            <div className="text-xs font-bold uppercase leading-tight tracking-wider text-indigo-600">Srijan<div className="font-medium normal-case tracking-normal text-slate-500">Science Talent Search</div></div>
          </div>
          <LangSelect />
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  const { t } = useT();
  return (
    <label className="mt-4 block text-sm font-semibold">
      {t(label)}
      <div className="mt-1 font-normal">{children}</div>
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

export function PasswordInput(props: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const { t } = useT();
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        className={inputCls}
      />
      <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-2 text-xs text-slate-500">
        {show ? t("Hide") : t("Show")}
      </button>
    </div>
  );
}

export const primaryBtn = "mt-5 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700";

// Student / Mentor / Admin selector used on Login and Register.
export function RolePicker({ role, setRole, roles = ["student", "mentor", "admin"] }: { role: Role; setRole: (r: Role) => void; roles?: Role[] }) {
  const { t } = useT();
  return (
    <div className={`mt-4 grid gap-2 ${roles.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
      {roles.map((r) => (
        <button key={r} type="button" onClick={() => setRole(r)}
          className={`rounded-lg px-3 py-2 text-sm capitalize ${role === r ? "bg-indigo-50 font-semibold text-indigo-600" : "bg-slate-50 text-slate-500"}`}>{t(r[0].toUpperCase() + r.slice(1))}</button>
      ))}
    </div>
  );
}
