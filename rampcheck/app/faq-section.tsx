"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FAQ_ITEMS = [
  {
    q: "What robot data can I scan?",
    a: "The CLI checks supported robot episodes and signals. The set of supported formats depends on available adapters and grows over time.",
  },
  {
    q: "Are flagged demonstrations automatically removed?",
    a: "No. A flag is a candidate for review—not proof an episode is bad. Engineers make the final call after inspecting the evidence.",
  },
  {
    q: "Does raw training data leave our environment?",
    a: "The default scan runs locally and writes a local review.json. No raw data is uploaded unless you explicitly choose a future integration path.",
  },
  {
    q: "What do I get after a scan?",
    a: "A terminal summary and structured findings in ./rampcheck/review.json—flagged episodes, signal checks, and review candidates.",
  },
  {
    q: "How should I validate an anomaly?",
    a: "Examine task context and the relevant sensor traces, then decide whether the episode should be excluded, repaired, or kept as-is.",
  },
  {
    q: "Can Lift Predictor estimate training improvement today?",
    a: "Lift Predictor is a research-stage technical preview, available through a guided pilot. It is not a production feature.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="faq-band" id="faq">
      <div className="faq-intro">
        <h2>Before you run your first scan.</h2>
        <p className="faq-desc">
          Everything robotics engineers ask before plugging Rampcheck into their workflow.
        </p>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-trigger"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              {item.q}
              <span className="faq-icon" aria-hidden="true">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
