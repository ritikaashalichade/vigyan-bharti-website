// Small pieces shared by the public pages (Landing, About, Login, Register, Forgot).
import { LANGS, useT, type Lang } from "../../lib/i18n";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <img src="/logo.jpg" alt="Srijan logo" className="h-10 w-10 rounded-full object-cover" />
    <div className="leading-tight"><b>Srijan</b><div className="text-[11px] text-slate-500">Science Talent Search</div></div>
  </div>
);

export const primary = "rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700";
export const outline = "rounded-lg border border-indigo-600 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-600";

// Language drop-down. Changing it translates the whole public website.
export function LangSelect({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useT();
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label={t("Language")}
      className={`rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 text-sm ${className}`}>
      {LANGS.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
    </select>
  );
}
