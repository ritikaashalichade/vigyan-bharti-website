// Separate "About VVM" web page. Text is in English here; translations are in src/lib/translations.ts.
import { AuroraBackground } from "../../components/ui/aurora-background";
import { useT } from "../../lib/i18n";
import { Logo, LangSelect, primary, outline } from "./common";

const OBJECTIVES = [
  ["🔬", "Create interest in pure science among students"],
  ["🇮🇳", "Teach school children about India's contributions to science and technology, from traditional to modern"],
  ["📝", "Hold competitive exams to find students with a scientific bent of mind"],
  ["🛠️", "Give hands-on training through workshops and other events"],
  ["👩‍🔬", "Provide mentors to help students carry their science education forward"],
  ["🏆", "Identify and felicitate successful students at state and national levels"],
  ["🏛️", "Organise exposure visits for winners to R&D institutions across the country"],
];
const HOW = [
  "Open to students of classes VI to XI.",
  "Registration is done online only, on the VVM website.",
  "The exam is conducted online through an app, in multiple levels.",
  "Questions are based on study material on India's contributions to science, provided by VIBHA.",
  "Top performers at the national level are recognised as Vigyan Jigyasu – a keen knowledge seeker of science.",
  "The pattern, dates and categories can change every year, so please check vvm.org.in for the latest details.",
];
const SUPPORT = [
  ["📚", "Study material can be downloaded from your profile after you log in."],
  ["🎬", "An online lecture series by VVM's academic members is available on the VVM YouTube channel."],
  ["👤", "Mentors guide students, and workshops give hands-on experience."],
];

export default function About({ go }: { go: (r: string) => void }) {
  const { t } = useT();
  const card = "rounded-xl border border-slate-200 bg-white p-5";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button onClick={() => go("home")} aria-label={t("Home")}><Logo /></button>
          <nav className="hidden items-center gap-4 text-sm text-slate-600 sm:flex">
            <button onClick={() => go("home")} className="hover:text-indigo-600">{t("Home")}</button>
            <span className="font-semibold text-indigo-600">{t("About VVM")}</span>
          </nav>
          <div className="flex items-center gap-2">
            <LangSelect />
            <button onClick={() => go("login")} className="hidden text-sm font-semibold text-indigo-600 sm:block">{t("Login")}</button>
            <button onClick={() => go("register")} className={primary.replace("px-5 py-2.5", "px-3 py-2")}>{t("Register")}</button>
          </div>
        </div>
      </header>

      <AuroraBackground className="py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">{t("About Vidyarthi Vigyan Manthan (VVM)")}</h1>
          <p className="mt-4 text-slate-600">{t("VVM is India's largest science talent search examination for school students of classes VI to XI. It is an app-based online exam designed to find bright young minds with a scientific aptitude.")}</p>
        </div>
      </AuroraBackground>

      <main className="mx-auto grid max-w-4xl gap-10 px-4 py-12">
        <section>
          <h2 className="mb-3 text-2xl font-bold">{t("Who runs VVM?")}</h2>
          <div className={`${card} grid gap-3 text-sm leading-relaxed text-slate-700`}>
            <p>{t("VVM is an initiative of Vijnana Bharati (VIBHA), a national movement that popularises science and technology among students and the public, and promotes India's scientific contributions from ancient times to today.")}</p>
            <p>{t("It is carried out in collaboration with institutions such as NCERT, Vigyan Prasar and the National Council of Science Museums (NCSM).")}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold">{t("Objectives of VVM")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {OBJECTIVES.map(([icon, text]) => (
              <div key={text} className={`${card} flex gap-3 text-sm font-semibold`}><span className="text-2xl">{icon}</span><span>{t(text)}</span></div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold">{t("How the exam works")}</h2>
          <ul className={`${card} grid gap-3 text-sm`}>
            {HOW.map((x) => <li key={x} className="flex gap-2"><span className="text-indigo-600">✔</span>{t(x)}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold">{t("Learning support")}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {SUPPORT.map(([icon, text]) => <div key={text} className={`${card} text-sm`}><div className="mb-2 text-2xl">{icon}</div>{t(text)}</div>)}
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <button onClick={() => go("register")} className={primary}>{t("Create Student Account")}</button>
          <button onClick={() => go("login")} className={outline}>{t("Login")}</button>
          <a href="https://vvm.org.in/" target="_blank" rel="noreferrer" className={outline}>{t("Visit official VVM website")} ↗</a>
        </section>

        <p className="text-xs text-slate-500">{t("Summarised from public pages about VVM (including NCSM and Vikaspedia). For official details, please visit vvm.org.in.")}</p>
      </main>

      <footer className="bg-slate-900 px-4 py-6 text-sm text-slate-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="text-white"><Logo /></div>
          <button onClick={() => go("home")} className="hover:text-white">{t("← Back to home")}</button>
        </div>
      </footer>
    </div>
  );
}
