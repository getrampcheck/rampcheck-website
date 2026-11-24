"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

function useScrollTrigger(amount = 0.3) {
  const ref = useRef<SVGSVGElement | HTMLElement | null>(null);
  const inView = useInView(ref as React.RefObject<Element>, { amount, once: true });
  return { ref, inView };
}

const draw = (delay: number, dur = 1) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1, opacity: 1,
    transition: { pathLength: { delay, duration: dur, ease: "easeInOut" as const }, opacity: { delay, duration: 0.2 } },
  },
});

const fadeUp = (delay: number, dur = 0.5) => ({
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: dur, ease: "easeOut" as const } },
});

const pop = (delay: number) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay, duration: 0.4, type: "spring" as const, stiffness: 200, damping: 18 } },
});

export function AnimatedKinematicsPlot() {
  const { ref, inView } = useScrollTrigger(0.25);
  return (
    <motion.svg ref={ref as React.Ref<SVGSVGElement>} className="kinematics" viewBox="0 0 560 330" role="img"
      aria-label="Reference path and an observed path with a flagged detour" initial="hidden" animate={inView ? "visible" : "hidden"}>
      {Array.from({ length: 12 }, (_, i) => (<line key={`v${i}`} x1={i * 50.8} y1="0" x2={i * 50.8} y2="326" stroke="#d7dee4" />))}
      {Array.from({ length: 9 }, (_, i) => (<line key={`h${i}`} x1="0" y1={i * 40.6} x2="560" y2={i * 40.6} stroke="#d7dee4" />))}
      <motion.path d="M28 250 C 120 230, 180 160, 250 120 S 400 70, 520 58" fill="none" stroke="#9aa6b2" strokeWidth="2.4" strokeDasharray="7 7" variants={draw(0.1, 1.2)} />
      <motion.path d="M28 250 C 110 236, 170 188, 230 168 C 280 150, 300 210, 340 188 S 430 90, 520 62" fill="none" stroke="#2f6fb5" strokeWidth="3" variants={draw(0.5, 1.4)} />
      <motion.circle cx="286" cy="196" r="28" fill="none" stroke="#ff9d74" strokeWidth="1.6" variants={pop(1.6)} />
      <motion.circle cx="286" cy="196" r="4" fill="#ff9d74" variants={pop(1.8)} />
    </motion.svg>
  );
}


export function AnimatedOutcomeChart() {
  const { ref, inView } = useScrollTrigger(0.3);
  const predicted = "M8 168 C42 164 58 150 86 138 C118 124 132 108 164 96 C198 82 214 70 248 58 C282 46 300 40 332 34";
  const realized = "M8 172 C42 168 58 158 86 148 C118 136 132 122 164 112 C198 100 214 90 248 78 C282 66 300 58 332 50";
  const band = `${predicted} L332 62 C300 70 282 78 248 90 C214 104 198 116 164 128 C132 142 118 152 86 162 C58 170 42 176 8 180 Z`;
  return (
    <motion.svg ref={ref as React.Ref<SVGSVGElement>} className="outcome-chart" viewBox="0 0 408 210" role="img"
      aria-label="Predicted and realized lift rise across five evaluation checkpoints" initial="hidden" animate={inView ? "visible" : "hidden"}>
      {[8, 48, 88, 128, 168].map((y) => (<line key={y} x1="28" y1={y} x2="388" y2={y} stroke="#e7ece8" strokeWidth="1" />))}
      {[28, 100, 172, 244, 316, 388].map((x) => (<line key={x} x1={x} y1="8" x2={x} y2="168" stroke="#e7ece8" strokeWidth="1" />))}
      <motion.path d={band} fill="rgba(56,141,186,0.16)" variants={fadeUp(0.3, 0.8)} />
      <motion.path d={predicted} fill="none" stroke="#388dba" strokeWidth="2.4" strokeLinecap="round" variants={draw(0.4, 1.2)} />
      <motion.path d={realized} fill="none" stroke="#0eb483" strokeWidth="2.4" strokeLinecap="round" variants={draw(0.9, 1.2)} />
      {["8", "6", "4", "2", "0"].map((l, i) => (
        <motion.text key={l} x="6" y={12 + i * 40} fill="#89958c" fontSize="11" variants={fadeUp(0.2 + i * 0.05)}>{l}</motion.text>
      ))}
      {["0", "1", "2", "3", "4", "5"].map((l, i) => (
        <motion.text key={`x-${l}`} x={24 + i * 72} y="186" fill="#89958c" fontSize="11" variants={fadeUp(0.2 + i * 0.05)}>{l}</motion.text>
      ))}
    </motion.svg>
  );
}

export function AnimatedLearningLine() {
  const { ref, inView } = useScrollTrigger(0.3);
  const connectors = [{ x1: 118, x2: 214 }, { x1: 262, x2: 358 }, { x1: 406, x2: 502 }];
  const arrows = ["M214 72 L226 78 L214 84", "M358 72 L370 78 L358 84", "M502 72 L514 78 L502 84"];
  const circles: [number, string | undefined, string | undefined][] = [[78, "#f2b84b", undefined], [240, "#2f6fb5", undefined], [402, "#8ec8ef", undefined], [564, undefined, "#3cba7a"]];
  return (
    <figure ref={ref as React.Ref<HTMLElement>} className="learning-line" aria-label="Research loop: measure, decide, verify, learn">
      <motion.svg viewBox="0 0 640 168" role="img" aria-label="Measure leads to decide, verify, and learn, with a return arc" initial="hidden" animate={inView ? "visible" : "hidden"}>
        <motion.path d="M70 78 C 180 18, 430 18, 560 62" fill="none" stroke="#8b9488" strokeWidth="2" strokeDasharray="5 6" variants={draw(1.2, 1)} />
        {connectors.map((l, i) => (<motion.line key={i} x1={l.x1} y1="78" x2={l.x2} y2="78" stroke="#7eb6e8" strokeWidth="2" variants={draw(0.4 + i * 0.3, 0.4)} />))}
        {arrows.map((d, i) => (<motion.path key={i} d={d} fill="none" stroke="#7eb6e8" strokeWidth="2" variants={draw(0.6 + i * 0.3, 0.3)} />))}
        {circles.map(([cx, fill, stroke], i) => (
          fill
            ? <motion.circle key={i} cx={cx} cy="78" r="28" fill={fill} variants={pop(0.1 + i * 0.3)} />
            : <motion.circle key={i} cx={cx} cy="78" r="28" fill="none" stroke={stroke} strokeWidth="8" variants={pop(0.1 + i * 0.3)} />
        ))}
      </motion.svg>
      <ol>
        {["Measure", "Decide", "Verify", "Learn"].map((label, i) => (
          <motion.li key={label} initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.3, duration: 0.4 }}>{label}</motion.li>
        ))}
      </ol>
    </figure>
  );
}

interface LiftBar { label: string; start: string; width: string; tick: string }

export function AnimatedLiftRanges({ bars }: { bars: LiftBar[] }) {
  const { ref, inView } = useScrollTrigger(0.3);
  return (
    <ul ref={ref as React.Ref<HTMLUListElement>} className="lift-ranges">
      {bars.map((bar, i) => (
        <motion.li key={bar.label} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.25, duration: 0.5, ease: "easeOut" as const }}>
          <span>{bar.label}</span>
          <i style={{ ["--start" as string]: inView ? bar.start : "0%", ["--width" as string]: inView ? bar.width : "0%", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)", transitionDelay: `${0.5 + i * 0.25}s` }}>
            <motion.b
              style={{ ["--tick" as string]: inView ? bar.tick : "0%", transition: "left 0.6s cubic-bezier(0.22,1,0.36,1)", transitionDelay: `${0.9 + i * 0.25}s` }}
            />
          </i>
        </motion.li>
      ))}
    </ul>
  );
}

