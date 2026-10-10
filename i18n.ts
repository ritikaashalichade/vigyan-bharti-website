// Site language. Pages write their text in English and wrap it with t("...").
// The translations live in ./translations.ts – a missing translation simply shows the English text.
import { useSyncExternalStore } from "react";
import { ROWS } from "./translations";

export const LANGS = [
  ["en", "English"], ["hi", "हिन्दी"], ["mr", "मराठी"], ["ta", "தமிழ்"],
  ["te", "తెలుగు"], ["kn", "ಕನ್ನಡ"], ["gu", "ગુજરાતી"], ["bn", "বাংলা"],
] as const;
export type Lang = (typeof LANGS)[number][0];

const KEY = "vb_lang";
const ORDER: Lang[] = LANGS.map((l) => l[0]);
const MAP = new Map(ROWS.map((r) => [r[0], r]));
const listeners = new Set<() => void>();

function initial(): Lang {
  try {
    const v = localStorage.getItem(KEY) as Lang | null;
    if (v && ORDER.includes(v)) return v;
  } catch { /* storage blocked */ }
  return "en";
}
let current: Lang = initial();
if (typeof document !== "undefined") document.documentElement.lang = current;

export function setLang(l: Lang) {
  current = l;
  try { localStorage.setItem(KEY, l); } catch { /* storage blocked */ }
  document.documentElement.lang = l;
  listeners.forEach((f) => f());
}

export function tr(text: string, lang: Lang = current): string {
  if (lang === "en") return text;
  return MAP.get(text)?.[ORDER.indexOf(lang)] || text;
}

const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };

/** const { t, lang, setLang } = useT();  then  t("Login") */
export function useT() {
  const lang = useSyncExternalStore(subscribe, () => current);
  return { lang, setLang, t: (s: string) => tr(s, lang) };
}
