function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 63 63" fill="none">
      <path
        d="M4.5 58.5C21.55 55.32 31.5 37.85 58.5 17.2M4.5 42.62C22.97 39.44 35.76 25.15 58.5 4.5"
        stroke={light ? "#f4f7f5" : "currentColor"}
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="2.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 7.2 7 9.2 4.5 11.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2 11.4h4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2.2" y="3.2" width="13.6" height="12.2" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.2 7.1h13.6M6 2.2v2.4M12 2.2v2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import AnimatedTerminal from "./animated-terminal";
import AnimatedLiftChart from "./lift-chart";
import FaqSection from "./faq-section";
import HeroTimeline from "./hero-timeline";
import {
  AnimatedKinematicsPlot,
  AnimatedOutcomeChart,
  AnimatedLearningLine,
  AnimatedLiftRanges,
} from "./animated-charts";

const TERMINAL_LINES = [
  { text: "$ rampcheck scan ./dataset", className: "term-cmd", speed: 45 },
  { text: "Reading local robotics episodes...", className: "term-dim" },
  { text: "Validating episode structure...", className: "term-dim" },
  { text: "Running available signal checks...", className: "term-dim" },
  { text: "✓ Episode structure checked", className: "term-ok-line" },
  { text: "✓ Signal checks completed", className: "term-ok-line" },
  { text: "! Review candidates flagged", className: "term-warn-line" },
  { text: "↳ Review saved to ./rampcheck/review.json", className: "term-file-line" },
];

function ScanTranscript({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`scan-window${compact ? " is-compact" : ""}`} aria-label="Illustrative Rampcheck CLI session">
      <div className="hero-terminal-bar">
        <span className="term-lights" aria-hidden="true"><i /><i /><i /></span>
        zsh — rampcheck
      </div>
      <AnimatedTerminal lines={TERMINAL_LINES} />
    </div>
  );
}

function EditorialSections() {
  return (
    <div className="editorial" id="product">
      <section className="ed-band">
        <div className="ed-copy">
          <h2>Find the robot demos worth reviewing.</h2>
          <p>For robotics labs working with teleop demonstrations, joint trajectories, and synchronized sensor data. Run local checks on supported inputs and review suspicious episodes before training.</p>
          <span className="copy-rule" aria-hidden="true" />
          <div className="ed-compare">
            <p><span>Manual work</span>Inspect traces. Hunt bad episodes.</p>
            <p className="is-product"><span>Ramp check</span>Auto-flag and organize review candidates.</p>
          </div>
        </div>
        <div className="signal-panel" style={{ display: "flex", flexDirection: "column" as const, gap: "112px" }}>
          <div className="signal-card signal-card-main">
            <div className="signal-card-head">
              <span className="signal-card-title">Teleop path detours</span>
              <span className="signal-card-label">Workspace XY</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="signal-chart" src="/signal-trajectory.svg" alt="XY trajectory showing reference path and observed detour" />
          </div>
          <div className="signal-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div className="signal-card signal-card-sm">
              <span className="signal-card-title">Joint jerk outliers</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="signal-chart" src="/signal-jerk.svg" alt="Jerk magnitude trace with threshold spike" />
              <span className="signal-card-axis">Jerk magnitude · time →</span>
            </div>
            <div className="signal-card signal-card-sm">
              <span className="signal-card-title">Timestamp alignment</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="signal-chart" src="/signal-sync.svg" alt="Joint vs camera time offset markers" />
              <span className="signal-card-axis">Joint / Camera</span>
            </div>
          </div>
          <p className="signal-disclaimer">Examples shown conceptually; checks depend on available channels.</p>
        </div>
      </section>

      <section className="ed-band tone-dark" id="approach">
        <div className="ed-copy">
          <h2>Stop chasing issues across every recording.</h2>
          <p>Scan supported episodes and available signals locally. Surface anomalies, flag review candidates, and write structured findings to review.json—without silently deleting or repairing data.</p>
          <span className="copy-rule" aria-hidden="true" />
        </div>
        <figure className="flow-panel">
          <ol className="flow-steps">
            <li><b>01</b><strong>Input</strong><span>Raw robot demos</span></li>
            <li><b>02</b><strong>Scan</strong><span>Find anomalies</span></li>
            <li className="is-active"><b>03</b><strong>Triage</strong><span>Flag candidates</span></li>
            <li className="is-light"><b>04</b><strong>Output</strong><span>review.json</span></li>
          </ol>
          <p className="panel-foot">Engineer reviews exceptions, not every recording.</p>
        </figure>
      </section>

      <section className="ed-band" id="preview">
        <div className="ed-copy">
          <h2>Which data change is worth testing next?</h2>
          <p>In a model-specific research preview, compare estimated task-success lift across candidate data interventions, then validate the ranking with held-out evaluations.</p>
          <span className="copy-rule" aria-hidden="true" />
          <p className="ed-lift-subhead">Build a ranked experiment plan.</p>
          <p className="ed-lift-subdesc">Prioritize tests with estimated lift; trust results only after evaluation.</p>
          <a className="button button-dark ed-cta" href="#preview">Book a technical preview <CalendarIcon /></a>
        </div>
        <AnimatedLiftChart rows={[
          { label: "Trajectory repair", value: "+5.4 pp", rangeLeft: 426.58, rangeWidth: 117.3, tickLeft: 487.14, color: "#edb200", valueColor: "#edb200" },
          { label: "Rare-case replay", value: "+3.8 pp", rangeLeft: 367.93, rangeWidth: 109.48, tickLeft: 424.58, color: "#8bcfe7", valueColor: "#2b7ea3" },
          { label: "Timestamp alignment", value: "+2.6 pp", rangeLeft: 317.1, rangeWidth: 125.12, tickLeft: 377.66, color: "#49dda9", valueColor: "#49dda9" },
        ]} />
      </section>

      <section className="ed-band tone-mint flip" id="cli-entry">
        <div className="ed-copy">
          <h2>From one command to a review artifact.</h2>
          <p>Run rampcheck scan ./dataset locally. The CLI checks supported episode structures and available signals, then writes ./rampcheck/review.json for engineer review. No automatic deletion.</p>
          <span className="copy-rule" aria-hidden="true" />
          <a className="button button-dark ed-cta" href="#cli">Explore the free CLI <TerminalIcon /></a>
        </div>
        <ScanTranscript compact />
      </section>

      <section className="ed-band tone-dark-deep" id="security">
        <div className="ed-copy">
          <h2>Keep your stack. Keep control of your data.</h2>
          <p>Keep robot data within your environment while running available checks locally. Export review.json when you choose; SDK, API, and VPC integrations are future pilot paths.</p>
          <span className="copy-rule" aria-hidden="true" />
          <a className="button button-light ed-cta" href="#preview">Discuss an integration pilot <ArrowIcon /></a>
        </div>
        <figure className="stack-panel">
          <ol className="stack-cards">
            <li><b>01</b><strong>Raw data</strong><span>Your robot episodes</span></li>
            <li className="is-active"><b>02</b><strong>Local CLI</strong><span>Run diagnostic checks</span></li>
            <li className="is-light"><b>03</b><strong>Review</strong><span>Structured JSON output</span></li>
          </ol>
          <p className="upload-bar">No default raw-data upload</p>
        </figure>
      </section>

      <section className="ed-band stack">
        <div className="ed-copy wide">
          <h2>Useful now. Ambitious by design.</h2>
          <p>Local CLI diagnostics are available now. Lift Predictor is a technical research preview; automated interventions and expanded integrations remain future work.</p>
        </div>
        <div className="readiness">
          <ol className="readiness-rows">
            <li className="is-now"><b>Initial CLI</b><span>Diagnostics + review.json</span></li>
            <li className="is-pilot"><b>Research pilot</b><span>Estimate lift, validate outcomes</span></li>
            <li className="is-later"><b>Roadmap</b><span>Deeper automated intervention ops</span></li>
          </ol>
          <ul className="signal-list">
            <li>Adapter coverage varies</li>
            <li>No automatic deletion</li>
            <li>Pilot integrations only</li>
          </ul>
        </div>
      </section>

      <FaqSection />

      <section className="close-band" id="start">
        <h2>Stop hunting data issues. Get back to training.</h2>
        <p>Run the local CLI now. For model-specific lift questions, book a research preview with Rampcheck.</p>
        <div className="close-actions">
          <a className="button button-light" href="#cli">Explore the free CLI <TerminalIcon /></a>
          <a className="button button-ghost" href="#preview">Book a technical preview <CalendarIcon /></a>
        </div>
        <p className="close-note">Local checks today · Model-conditioned research by technical preview</p>
      </section>
    </div>
  );
}

function LearningLine() {
  return (
    <figure className="learning-line" aria-label="Research loop: measure, decide, verify, learn, then return">
      <svg viewBox="0 0 640 168" role="img" aria-label="Measure leads to decide, verify, and learn, with a return arc">
        <path d="M70 78 C 180 18, 430 18, 560 62" fill="none" stroke="#8b9488" strokeWidth="2" strokeDasharray="5 6" />
        <line x1="118" y1="78" x2="214" y2="78" stroke="#7eb6e8" strokeWidth="2" />
        <line x1="262" y1="78" x2="358" y2="78" stroke="#7eb6e8" strokeWidth="2" />
        <line x1="406" y1="78" x2="502" y2="78" stroke="#7eb6e8" strokeWidth="2" />
        <path d="M214 72 L226 78 L214 84" fill="none" stroke="#7eb6e8" strokeWidth="2" />
        <path d="M358 72 L370 78 L358 84" fill="none" stroke="#7eb6e8" strokeWidth="2" />
        <path d="M502 72 L514 78 L502 84" fill="none" stroke="#7eb6e8" strokeWidth="2" />
        <circle cx="78" cy="78" r="28" fill="#f2b84b" />
        <circle cx="240" cy="78" r="28" fill="#2f6fb5" />
        <circle cx="402" cy="78" r="28" fill="#8ec8ef" />
        <circle cx="564" cy="78" r="28" fill="none" stroke="#3cba7a" strokeWidth="8" />
      </svg>
      <ol>
        <li>Measure</li>
        <li>Decide</li>
        <li>Verify</li>
        <li>Learn</li>
      </ol>
    </figure>
  );
}

function KinematicsPlot() {
  return (
    <svg className="kinematics" viewBox="0 0 560 330" role="img" aria-label="Reference path and an observed path with a flagged detour">
      {Array.from({ length: 12 }, (_, index) => (
        <line key={`v${index}`} x1={index * 50.8} y1="0" x2={index * 50.8} y2="326" stroke="#d7dee4" />
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <line key={`h${index}`} x1="0" y1={index * 40.6} x2="560" y2={index * 40.6} stroke="#d7dee4" />
      ))}
      <path d="M28 250 C 120 230, 180 160, 250 120 S 400 70, 520 58" fill="none" stroke="#9aa6b2" strokeWidth="2.4" strokeDasharray="7 7" />
      <path d="M28 250 C 110 236, 170 188, 230 168 C 280 150, 300 210, 340 188 S 430 90, 520 62" fill="none" stroke="#2f6fb5" strokeWidth="3" />
      <circle cx="286" cy="196" r="28" fill="none" stroke="#ff9d74" strokeWidth="1.6" />
      <circle cx="286" cy="196" r="4" fill="#ff9d74" />
    </svg>
  );
}

function OutcomeChart() {
  const predicted = "M8 168 C42 164 58 150 86 138 C118 124 132 108 164 96 C198 82 214 70 248 58 C282 46 300 40 332 34";
  const realized = "M8 172 C42 168 58 158 86 148 C118 136 132 122 164 112 C198 100 214 90 248 78 C282 66 300 58 332 50";
  const band = `${predicted} L332 62 C300 70 282 78 248 90 C214 104 198 116 164 128 C132 142 118 152 86 162 C58 170 42 176 8 180 Z`;

  return (
    <svg className="outcome-chart" viewBox="0 0 408 210" role="img" aria-label="Predicted and realized lift rise across five evaluation checkpoints, with a prediction range around the predicted curve">
      {[8, 48, 88, 128, 168].map((y) => (
        <line key={y} x1="28" y1={y} x2="388" y2={y} stroke="#e7ece8" strokeWidth="1" />
      ))}
      {[28, 100, 172, 244, 316, 388].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="168" stroke="#e7ece8" strokeWidth="1" />
      ))}
      <path d={band} fill="rgba(56,141,186,0.16)" />
      <path d={predicted} fill="none" stroke="#388dba" strokeWidth="2.4" strokeLinecap="round" />
      <path d={realized} fill="none" stroke="#0eb483" strokeWidth="2.4" strokeLinecap="round" />
      {["8", "6", "4", "2", "0"].map((label, index) => (
        <text key={label} x="6" y={12 + index * 40} fill="#89958c" fontSize="11">{label}</text>
      ))}
      {["0", "1", "2", "3", "4", "5"].map((label, index) => (
        <text key={`x-${label}`} x={24 + index * 72} y="186" fill="#89958c" fontSize="11">{label}</text>
      ))}
    </svg>
  );
}



export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Rampcheck home">
          <BrandMark />
          <span>Rampcheck</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#product">Product</a>
          <a href="#approach">Approach</a>
          <a href="#security">Security</a>
          <a href="#resources">Docs</a>
        </nav>
        <a className="button button-dark header-cta" href="#preview">Book a technical preview</a>
      </header>

      <main id="top">
        <section className="hero">
          <HeroTimeline />
          <div className="hero-copy">
            <h1>Know what to train on next.</h1>
            <p className="hero-description">
              Run automated dataset checks from your terminal. Review the results locally.
              <br />
              Explore model-specific lift prediction through a technical pilot.
            </p>
          </div>
          <div className="hero-actions">
            <a className="button button-dark" href="#cli">
              Explore the free CLI
              <TerminalIcon />
            </a>
            <a className="button button-light" href="#preview">
              Book a technical preview
              <CalendarIcon />
            </a>
          </div>

          <div className="hero-stage">
            <div className="hero-terminal" id="cli" aria-label="Illustrative Rampcheck CLI session">
              <div className="hero-terminal-bar">
                <span className="term-lights" aria-hidden="true"><i /><i /><i /></span>
                zsh — rampcheck
              </div>
              <AnimatedTerminal lines={TERMINAL_LINES} />
            </div>

            <aside className="outcome-panel" aria-label="Illustrative prediction versus outcome">
              <h2>Prediction vs. outcome</h2>
              <p>Illustrative task-success lift across evaluation runs</p>
              <div className="outcome-kpis">
                <div>
                  <span>Predicted lift</span>
                  <strong className="kpi-predicted">+4.1 pp</strong>
                </div>
                <div className="kpi-rule" aria-hidden="true" />
                <div>
                  <span>Realized lift</span>
                  <strong className="kpi-realized">+3.7 pp</strong>
                </div>
              </div>
              <div className="outcome-chart-head">
                <h3>Lift across evaluation checkpoints</h3>
                <span>Lift (pp)</span>
              </div>
              <AnimatedOutcomeChart />
              <p className="outcome-axis">Evaluation checkpoint</p>
              <div className="outcome-legend">
                <span><i className="legend-swatch swatch-predicted" /> Predicted lift (pp)</span>
                <span><i className="legend-swatch swatch-realized" /> Realized lift (pp)</span>
                <span><i className="legend-swatch swatch-range" /> Prediction range</span>
              </div>
            </aside>
          </div>
        </section>

        <EditorialSections />
      </main>

      <footer className="site-footer" id="resources">
        <a className="wordmark footer-wordmark" href="#top">
          <BrandMark />
          <span>Rampcheck</span>
        </a>
        <div className="footer-lead">
          <div>
            <h2>See what matters before the next training run.</h2>
            <p>Robotics dataset checks and review-ready evidence for engineers working with demonstrations, joints, and sensor streams.</p>
          </div>
          <nav aria-label="Product">
            <h2>Product</h2>
            <a href="#cli">Free CLI</a>
            <a href="#preview">Lift Predictor preview</a>
            <a href="#security">Integration pilots</a>
          </nav>
          <nav aria-label="Resources">
            <h2>Resources</h2>
            <a href="#resources">Documentation</a>
            <a href="#approach">Approach</a>
            <a href="#security">Security</a>
          </nav>
          <nav aria-label="Start here">
            <h2>Start here</h2>
            <a href="#cli">Run a local scan</a>
            <a href="#preview">Book technical preview</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Rampcheck</span>
          <span>Built for robotics engineers</span>
          <span>Local data diagnostics · Research pilots</span>
        </div>
      </footer>
    </>
  );
}
