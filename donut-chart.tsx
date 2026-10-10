// A simple donut (ring) chart. No extra packages needed – just React + SVG.
// Usage: <DonutChart data={[{ label: "Done", value: 18, color: "#4f46e5" }, ...]} centerLabel="Tasks" />
import { useEffect, useState } from "react";

export type DonutSegment = { label: string; value: number; color: string };

type Props = {
  data: DonutSegment[];
  size?: number;        // width/height of the chart in px
  strokeWidth?: number; // thickness of the ring
  centerLabel?: string; // small text shown under the total in the middle
  showLegend?: boolean; // list of segments under the chart
};

export function DonutChart({ data, size = 190, strokeWidth = 24, centerLabel = "Total", showLegend = true }: Props) {
  const [ready, setReady] = useState(false);            // flips to true after the first paint -> starts the draw animation
  const [hover, setHover] = useState<string | null>(null); // label of the segment under the mouse

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Where each segment starts around the ring (as a length along the circle).
  let running = 0;
  const parts = data.map((d) => {
    const length = total === 0 ? 0 : (d.value / total) * circumference;
    const part = { ...d, length, start: running };
    running += length;
    return part;
  });

  const active = data.find((d) => d.label === hover);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }} onMouseLeave={() => setHover(null)}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* grey background ring */}
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
          {/* one coloured circle per segment */}
          {parts.map((p, i) => (
            <circle
              key={p.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={p.color}
              strokeWidth={hover === p.label ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={`${ready ? p.length : 0} ${circumference}`}
              strokeDashoffset={-p.start}
              opacity={hover && hover !== p.label ? 0.45 : 1}
              onMouseEnter={() => setHover(p.label)}
              style={{ transition: `stroke-dasharray 0.9s ease-out ${i * 0.08}s, stroke-width 0.2s, opacity 0.2s`, cursor: "pointer" }}
            />
          ))}
        </svg>
        {/* text in the middle */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="max-w-[110px] truncate text-xs text-slate-500">{active ? active.label : centerLabel}</div>
          <div className="text-3xl font-bold">{active ? active.value : total}</div>
          {active && total > 0 && <div className="text-xs text-slate-500">{Math.round((active.value / total) * 100)}%</div>}
        </div>
      </div>

      {showLegend && (
        <div className="w-full">
          {data.map((d) => (
            <div
              key={d.label}
              onMouseEnter={() => setHover(d.label)}
              onMouseLeave={() => setHover(null)}
              className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${hover === d.label ? "bg-slate-100" : ""}`}
            >
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />{d.label}</span>
              <b className="text-slate-500">{d.value}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
