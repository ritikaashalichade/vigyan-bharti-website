// Animated aurora background. Put any content inside it:
//   <AuroraBackground className="min-h-[80vh]"> ...your content... </AuroraBackground>
import type { ReactNode } from "react";
import "./aurora.css";

export function AuroraBackground({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-zinc-50 text-slate-900 ${className}`}>
      <div className="absolute inset-0 overflow-hidden"><div className="aurora-bg" /></div>
      <div className="relative w-full">{children}</div>
    </div>
  );
}
