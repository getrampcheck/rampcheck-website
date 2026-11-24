"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface LiftRow {
  label: string;
  value: string;
  /** Range bar left position in px (within 573px track). */
  rangeLeft: number;
  /** Range bar width in px. */
  rangeWidth: number;
  /** Tick center position in px. */
  tickLeft: number;
  /** Range bar color. */
  color: string;
  /** Value text color (matches bar color). */
  valueColor: string;
}

export default function AnimatedLiftChart({ rows }: { rows: LiftRow[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { amount: 0.25, once: true });

  /* Positions as % of the 575px content width (633 − 29 − 29) */
  const pct = (absX: number) => `${((absX - 29) / 575) * 100}%`;
  const scalePcts = [278, 356.2, 434.4, 512.6, 590.8].map((x) => pct(x));
  const scaleLabels = ["0", "2", "4", "6", "8"];

  return (
    <div ref={ref} className="lift-chart-dark">
      {/* Header */}
      <div className="lcd-header">
        <span className="lcd-title">Lift by intervention</span>
      </div>
      <p className="lcd-subtitle">Estimated improvement</p>
      <p className="lcd-meta">Research-stage concept · model-specific evaluation</p>
      <div className="lcd-rule" />

      {/* Plot area */}
      <div className="lcd-plot">
        {/* Vertical scale lines */}
        {scalePcts.map((left, i) => (
          <div key={i} className="lcd-vline" style={{ left, background: i === 0 ? "#a0aea4" : "#d5ded7" }} />
        ))}

        {/* Data rows */}
        {rows.map((row, i) => (
          <div key={row.label} className="lcd-row">
            <motion.div
              className="lcd-row-content"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5, ease: "easeOut" as const }}
            >
              <span className="lcd-row-label">{row.label}</span>
              <span className="lcd-row-value" style={{ color: row.valueColor }}>{row.value}</span>
            </motion.div>

            <div className="lcd-bar-track">
              {/* Range bar */}
              <motion.div
                className="lcd-range"
                style={{ backgroundColor: row.color, left: pct(row.rangeLeft) }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(row.rangeWidth / 575) * 100}%` } : { width: 0 }}
                transition={{ delay: 0.6 + i * 0.25, duration: 0.8, ease: "easeOut" as const }}
              />
              {/* Tick mark — slides within bar bounds */}
              <motion.div
                className="lcd-tick"
                style={{ left: pct(row.tickLeft) }}
                initial={{ opacity: 0 }}
                animate={inView ? {
                  opacity: 1,
                  x: [
                    0,
                    (row.rangeLeft + row.rangeWidth - 4) - row.tickLeft,
                    0,
                    (row.rangeLeft + 2) - row.tickLeft,
                    0,
                  ],
                } : {}}
                transition={{
                  opacity: { delay: 1.0 + i * 0.25, duration: 0.4, ease: "easeOut" as const },
                  x: { delay: 1.8 + i * 0.3, duration: 6, repeat: Infinity, ease: "easeInOut" as const },
                }}
              >
                <div className="lcd-tick-inner" />
              </motion.div>
            </div>

            {i < rows.length - 1 && <div className="lcd-separator" />}
          </div>
        ))}

        {/* X-axis labels */}
        <div className="lcd-axis">
          {scalePcts.map((left, i) => (
            <span key={i} style={{ left, transform: "translateX(-50%)" }}>{scaleLabels[i]}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="lcd-legend">
        <span className="lcd-legend-item">
          <i className="lcd-legend-band" style={{ background: "#64726a" }} />Estimated range
        </span>
        <span className="lcd-legend-item">
          <i className="lcd-legend-tick" />Point estimate
        </span>
      </div>
      <p className="lcd-disclaimer">Conceptual figures · not measured Rampcheck results</p>
    </div>
  );
}
