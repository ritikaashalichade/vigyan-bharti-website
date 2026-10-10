// Small building blocks shared by the Student and Mentor pages.
import type { ReactNode } from "react";

export const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <h2 className="mb-3 text-base font-bold">{title}</h2>
    {children}
  </div>
);
export const Bar = ({ pct }: { pct: number }) => (
  <div className="my-2 h-2 overflow-hidden rounded bg-slate-200"><div className="h-full rounded bg-indigo-600" style={{ width: `${pct}%` }} /></div>
);
export const btn = "rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600";
export const pill = "rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600";
export const Back = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="mb-3 text-sm font-semibold text-indigo-600">← Back</button>
);
// One row inside a list: title + small grey text on the left, something (button/pill) on the right.
export const Row = ({ title, sub, children }: { title: string; sub: string; children?: ReactNode }) => (
  <div className="flex items-center justify-between gap-2 border-t border-slate-100 py-3 first:border-0">
    <div><b>{title}</b><div className="text-sm text-slate-500">{sub}</div></div>
    {children}
  </div>
);
// Big number tile used on dashboards.
export const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4"><div className="text-xs text-slate-500">{label}</div><div className="text-xl font-bold">{value}</div></div>
);
// Remembers a value in localStorage so it survives a page refresh.
import { useState } from "react";
export function usePersisted<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : initial; } catch { return initial; }
  });
  const set = (n: T) => { setV(n); try { localStorage.setItem(key, JSON.stringify(n)); } catch { /* storage blocked */ } };
  return [v, set] as const;
}
