// Main (home) page of the website. Each section is a block below – edit the arrays to change the text.
import { useState, type ReactNode } from "react";
import { AuroraBackground } from "../../components/ui/aurora-background";
import { LANGS, useT } from "../../lib/i18n";
import { Logo, LangSelect, primary, outline } from "./common";

type Item = [icon: string, text: string];

// ---------- Text for the sections (easy to edit) ----------
// [label, section id on this page]. "about" opens the separate About VVM page instead.
const NAV = [["Home", "top"], ["About VVM", "about"], ["Learning", "learning"], ["Mentorship", "mentors"], ["Resources", "updates"], ["Contact", "contact"]];
const ABOUT: Item[] = [["🔬", "Vidyarthi Vigyan Manthan (VVM) is a science talent programme for school students."], ["🏛️", "It is run by VIBHA (Vijnana Bharati), a movement that promotes science with Indian roots."], ["🎯", "Purpose: make science fun, relevant and within reach of every student."], ["🧪", "Encourages scientific aptitude."], ["🧠", "Develops scientific thinking."], ["💡", "Encourages curiosity and innovation."]];
const WHY: Item[] = [["🔭", "Scientific thinking"], ["🇮🇳", "India's scientific heritage"], ["🛠️", "Experiential learning"], ["👩‍🔬", "Expert / scientist mentorship"], ["🌟", "Personality development"], ["🧭", "Career guidance"], ["🏆", "Recognition and opportunities"]];
const LEARN: Item[] = [["🎬", "Lectures"], ["📝", "Assignments"], ["📚", "Study materials"], ["🧩", "Learning activities"], ["👤", "My mentor"], ["📈", "Progress tracking"]];
const STUDENT = ["Access lectures", "View assignments", "Submit activities", "Access study materials", "Connect with mentor", "Track learning progress"];
const MENTOR = ["View assigned students", "View student details", "Assign activities", "Review submissions", "Monitor student progress", "Guide students"];
const INSPIRE: Item[] = [["🌍", "Explore – discover science around you"], ["❓", "Question – develop curiosity"], ["🤔", "Think – build scientific reasoning"], ["🚀", "Innovate – turn ideas into solutions"]];
const UPDATES: Item[] = [["📢", "VVM registration announcements"], ["📄", "Examination information"], ["📅", "Upcoming events"], ["📚", "New study materials"], ["🎓", "Results"], ["🏅", "Awards and recognition"], ["🔔", "Important notifications"]];


// ---------- Small helpers ----------
// Ends a label with a full stop ("My mentor" -> "My mentor.") unless it already has punctuation.
const dot = (s: string) => (/[.!?।…]$/.test(s.trim()) ? s : `${s}.`);
const Section = ({ id, title, children, tint }: { id?: string; title: string; children: ReactNode; tint?: boolean }) => {
  const { t } = useT();
  return (
    <section id={id} className={`px-4 py-12 ${tint ? "bg-white" : ""}`}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-2xl font-bold">{t(title)}</h2>
        {children}
      </div>
    </section>
  );
};
const Cards = ({ items, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { items: Item[]; cols?: string }) => {
  const { t } = useT();
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map(([icon, text]) => (
        <div key={text} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold"><span className="text-xl leading-none">{icon}</span><span>{dot(t(text))}</span></div>
      ))}
    </div>
  );
};
const Checks = ({ items }: { items: string[] }) => {
  const { t } = useT();
  return <ul className="grid gap-2 text-sm">{items.map((x) => <li key={x} className="flex gap-2"><span className="text-indigo-600">✔</span>{t(x)}</li>)}</ul>;
};

// Simple science illustration (atom + flask)
const Illustration = () => (
  <svg viewBox="0 0 320 260" className="w-full max-w-sm" role="img" aria-label="Science illustration">
    <g fill="none" stroke="#4f46e5" strokeWidth="3">
      <ellipse cx="110" cy="100" rx="80" ry="28" /><ellipse cx="110" cy="100" rx="80" ry="28" transform="rotate(60 110 100)" /><ellipse cx="110" cy="100" rx="80" ry="28" transform="rotate(120 110 100)" />
    </g>
    <circle cx="110" cy="100" r="12" fill="#4f46e5" /><circle cx="186" cy="86" r="7" fill="#f59e0b" /><circle cx="52" cy="128" r="7" fill="#f59e0b" /><circle cx="88" cy="52" r="7" fill="#f59e0b" />
    <path d="M230 120h40M240 120v40l-30 56a10 10 0 0 0 9 14h72a10 10 0 0 0 9-14l-30-56v-40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
    <path d="M218 214h84l-14-26h-56z" fill="#6366f1" opacity=".7" />
    <circle cx="250" cy="196" r="4" fill="#fff" /><circle cx="270" cy="204" r="3" fill="#fff" />
  </svg>
);

export default function Landing({ go }: { go: (r: string) => void }) {
  const { t } = useT();
  const [menu, setMenu] = useState(false);

  // "About VVM" opens its own page; the other links scroll to a section of this page.
  const open = (id: string) => {
    setMenu(false);
    if (id === "about") return go("about");
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-100 text-slate-800">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-4 text-sm text-slate-600 lg:flex">
            {NAV.map(([label, id]) => <button key={id} onClick={() => open(id)} className="hover:text-indigo-600">{t(label)}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block"><LangSelect /></span>
            <button onClick={() => go("login")} className="hidden text-sm font-semibold text-indigo-600 sm:block">{t("Login")}</button>
            <button onClick={() => go("register")} className={primary.replace("px-5 py-2.5", "px-3 py-2")}>{t("Register")}</button>
            <button onClick={() => setMenu(!menu)} className="rounded-lg px-2 py-1 text-xl lg:hidden" aria-label={t("Menu")}>☰</button>
          </div>
        </div>
        {menu && (
          <div className="grid gap-1 border-t border-slate-200 bg-white p-3 lg:hidden">
            {NAV.map(([label, id]) => <button key={id} onClick={() => open(id)} className="rounded-lg px-3 py-2 text-left text-sm text-slate-600">{t(label)}</button>)}
            <div className="flex items-center gap-3 px-3 py-2"><LangSelect /><button onClick={() => go("login")} className="text-sm font-semibold text-indigo-600">{t("Login")}</button></div>
          </div>
        )}
      </header>

      {/* 2. Hero (with the aurora background) */}
      <AuroraBackground className="min-h-[80vh]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">{t("Learn. Explore. Innovate.")}</h1>
            <p className="mt-4 max-w-md text-slate-600">{t("Vidyarthi Vigyan Manthan (VVM) is a national science programme by VIBHA that builds curiosity and scientific thinking in school students.")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => go("register")} className={primary}>{t("Start Learning")}</button>
              <button onClick={() => go("login")} className={outline}>{t("Login")}</button>
            </div>
          </div>
          <div className="flex justify-center"><Illustration /></div>
        </div>
      </AuroraBackground>

      {/* 3. About (short version – the full story is on the About VVM page) */}
      <Section id="about" title="About VVM">
        <Cards items={ABOUT} />
        <button onClick={() => go("about")} className={`${outline} mt-5`}>{t("Read more about VVM →")}</button>
      </Section>
      {/* 4. Why VVM */}
      <Section title="Why VVM?" tint><Cards items={WHY} cols="sm:grid-cols-2 lg:grid-cols-4" /></Section>
      {/* 5. Student learning */}
      <Section id="learning" title="Student Learning"><Cards items={LEARN} /></Section>
      {/* 6 + 7. Students and Mentors */}
      <Section id="mentors" title="For Students & Mentors" tint>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5"><h3 className="mb-3 font-bold">{t("For Students")}</h3><Checks items={STUDENT} /><button onClick={() => go("register")} className={`${primary} mt-4`}>{t("Join as student")}</button></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><h3 className="mb-3 font-bold">{t("For Mentors")}</h3><Checks items={MENTOR} /><button onClick={() => go("login")} className={`${outline} mt-4`}>{t("Mentor login")}</button></div>
        </div>
      </Section>
      {/* 8. Inspiration */}
      <section className="bg-indigo-600 px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold">{t("Explore. Question. Think. Innovate.")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INSPIRE.map(([icon, text]) => <div key={text} className="flex items-center gap-2 rounded-xl bg-white/10 p-4 text-sm font-semibold"><span className="text-xl leading-none">{icon}</span><span>{dot(t(text))}</span></div>)}
          </div>
        </div>
      </section>
      {/* 9. Important updates */}
      <Section id="updates" title="Important Updates"><Cards items={UPDATES} cols="sm:grid-cols-2 lg:grid-cols-4" /><p className="mt-3 text-xs text-slate-500">{t("Latest announcements will appear here.")}</p></Section>
      {/* 10. Language / accessibility */}
      <Section title="Language & Accessibility" tint>
        <p className="mb-3 text-sm text-slate-600">{t("A simple, student-friendly website in many Indian languages. Pick a language and the whole website changes.")}</p>
        <LangChips />
      </Section>
      {/* 11. Final call to action */}
      <AuroraBackground className="py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold">{t("Ready to begin your scientific journey?")}</h2>
          <p className="mt-3 text-slate-600">{t("Every great discovery starts with a question. Ask yours today.")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => go("register")} className={primary}>{t("Create Student Account")}</button>
            <button onClick={() => go("login")} className={outline}>{t("Login")}</button>
          </div>
        </div>
      </AuroraBackground>

      {/* 12. Footer */}
      <footer id="contact" className="bg-slate-900 px-4 py-10 text-sm text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[2fr_1fr_1fr]">
          <div><div className="text-white"><Logo /></div><p className="mt-3 max-w-xs text-slate-400">{t("Vidyarthi Vigyan Manthan – inspiring young minds to think scientifically.")}</p></div>
          <div className="grid content-start gap-2">
            {[["About VVM", "about"], ["Learning", "learning"], ["Resources", "updates"], ["Mentorship", "mentors"]].map(([l, id]) => <button key={id} onClick={() => open(id)} className="text-left hover:text-white">{t(l)}</button>)}
          </div>
          <div className="grid content-start gap-2">
            <span>{t("Contact")}</span><span>{t("FAQs")}</span>
            <div className="flex gap-3 text-slate-400"><span>Facebook</span><span>YouTube</span><span>Instagram</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Row of language buttons (same choice as the drop-down in the header).
function LangChips() {
  const { lang, setLang } = useT();
  return (
    <div className="flex flex-wrap gap-2">
      {LANGS.map(([code, label]) => (
        <button key={code} onClick={() => { setLang(code); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`rounded-full px-3 py-1.5 text-sm ${lang === code ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>{label}</button>
      ))}
    </div>
  );
}
