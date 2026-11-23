import WaitlistForm from "./waitlist-form";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/magicui/terminal";


const wedges = [
  {
    number: "01",
    title: "Ingest & clean trajectories",
    description:
      "Visual tools show you camera frames. They miss the motor-control flaws that quietly teach policies the wrong behavior. Rampcheck scans every episode in place and quarantines what degrades training.",
    bullets: [
      "Operator detours and hesitation loops flagged per episode",
      "Camera-to-action timestamp drift measured in milliseconds",
      "Near-miss recovery demos preserved — policies need them",
    ],
  },
  {
    number: "02",
    title: "Contact force & shear — without gloves",
    description:
      "Estimate contact forces from the signals you already capture. See where grip, slip, and shear change the outcome before a robot ever touches the real world.",
  },
  {
    number: "03",
    title: "Failure-targeted synthetic motion",
    description:
      "Generate motion around the edge cases your data is missing, then validate each addition against the behavior you want the policy to learn.",
  },
  {
    number: "04",
    title: "Lineage, safety & insurance audit logs",
    description:
      "Every prediction and dataset change leaves a trace, so teams can explain what went into a training run and why.",
  },
];

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

function EditorialSections() {
  return (
    <div className="editorial" id="product">
      <section className="ed-band">
        <div className="ed-copy">
          <p className="ed-kicker">01 / Automated data triage</p>
          <h2>Stop cleaning robot training data by hand.</h2>
          <p>Rampcheck finds suspicious demonstrations and organizes the evidence.</p>
          <div className="ed-contrast">
            <p><span>Manual work</span>Open traces. Inspect every anomaly. Hunt bad episodes.</p>
            <p><span>Rampcheck</span>Auto-flag suspects. Return review-ready evidence.</p>
          </div>
        </div>
        <figure className="ed-panel">
          <figcaption>Kinematics / workspace XY</figcaption>
          <KinematicsPlot />
          <p className="ed-note">Illustrative kinematics example. Reversible quarantine remains a target workflow.</p>
        </figure>
      </section>

      <section className="ed-band tone-dark" id="approach">
        <div className="ed-copy">
          <p className="ed-kicker">02 / Automation workflow</p>
          <h2>Take the manual work out of the loop.</h2>
          <p>Turn raw demonstrations into structured evidence and prioritized review candidates—with less engineering detective work.</p>
          <div className="ed-contrast">
            <p><span>Trace by trace</span>Trace by trace.</p>
            <p><span>Automatically group anomalies</span>Automatically group anomalies.</p>
          </div>
        </div>
        <figure className="ed-panel">
          <figcaption>Detect / triage / handoff</figcaption>
          <ol className="flow-steps">
            <li><b>01 Input</b><i /></li>
            <li><b>02 Check</b><i /></li>
            <li><b>03 Triage</b><i /></li>
            <li><b>04 Review</b><i /></li>
          </ol>
          <p className="ed-note">Current CLI provides diagnostics and review.json; automatic interventions are a target workflow.</p>
        </figure>
      </section>

      <section className="ed-band tone-cool">
        <div className="ed-copy">
          <p className="ed-kicker">03 / Model improvement intelligence</p>
          <h2>Finding the problem is just the start.</h2>
          <p>Connect data failures to intervention decisions, controlled evaluation, and learning from actual training outcomes.</p>
          <div className="ed-contrast">
            <p><span>Diagnose in isolation</span>Diagnose in isolation.</p>
            <p><span>Connect evidence to decisions</span>Connect evidence to decisions.</p>
          </div>
        </div>
        <figure className="ed-panel">
          <figcaption>Measure / decide / verify / learn</figcaption>
          <LearningOrbit />
          <p className="orbit-legend"><span>Measure</span><span>Decide</span><span>Verify</span><span>Learn</span></p>
          <p className="ed-note">Full Measure → Decide → Verify → Learn loop advances through research and technical pilots.</p>
        </figure>
      </section>

      <section className="ed-band">
        <div className="ed-copy">
          <p className="ed-kicker">04 / Lift predictor / research pilot</p>
          <h2>Know what is worth your next training run.</h2>
          <p>Investigate predicted task-success lift for candidate data changes before spending compute on trial-and-error training.</p>
          <div className="ed-contrast">
            <p><span>Guess the best fix</span>Guess the best fix.</p>
            <p><span>Estimate, then verify lift</span>Estimate, then verify lift.</p>
          </div>
          <a className="button button-dark ed-cta" href="#waitlist">Book a Lift Predictor technical preview <ArrowIcon /></a>
        </div>
        <figure className="ed-panel">
          <figcaption>Hypothetical lift by intervention</figcaption>
          <ul className="lift-ranges">
            <li><span>Trajectory repair</span><i style={{ ["--start" as string]: "46%", ["--width" as string]: "34%" }} /></li>
            <li><span>Rare-case replay</span><i style={{ ["--start" as string]: "34%", ["--width" as string]: "30%" }} /></li>
            <li><span>Exclusion review</span><i style={{ ["--start" as string]: "24%", ["--width" as string]: "26%" }} /></li>
          </ul>
          <p className="panel-foot">Illustrative / not measured</p>
          <p className="ed-note">Illustrative predictions only. Lift Predictor is a research-stage technical preview.</p>
        </figure>
      </section>

      <section className="ed-band tone-mint flip" id="cli-entry">
        <div className="ed-copy">
          <p className="ed-kicker">05 / CLI / fastest entry point</p>
          <h2>One command. Your first useful signal.</h2>
          <p>The free local CLI is the entry point into Rampcheck—not the ceiling. Scan, inspect the terminal summary, and open structured JSON findings.</p>
          <div className="ed-contrast">
            <p><span>Onboard to a new platform</span>Onboard to a new platform.</p>
            <p><span>Scan locally in seconds</span>Scan locally in seconds.</p>
          </div>
          <a className="button button-dark ed-cta" href="#cli">Explore the free CLI <ArrowIcon /></a>
        </div>
        <figure className="ed-panel scan-panel">
          <figcaption>Local scan / diagnostic output</figcaption>
          <pre>{`$ rampcheck scan ./dataset\n\n`}<span className="ok">[ok] episode structure checked{"\n"}[ok] signal checks completed</span>{"\n"}<span className="warn">[!] review candidates flagged</span></pre>
          <p className="scan-meta">Terminal: scan summary</p>
          <p className="scan-json">JSON: ./rampcheck/review.json</p>
          <p className="ed-note">v0.1 outputs: terminal summary and review.json. No HTML report or automatic deletions.</p>
        </figure>
      </section>

      <section className="ed-band tone-dark" id="security">
        <div className="ed-copy">
          <p className="ed-kicker">06 / Privacy & integrations</p>
          <h2>Keep your stack. Keep control of your data.</h2>
          <p>Run diagnostics next to proprietary robot datasets, and export only the findings your team chooses to share.</p>
          <div className="ed-contrast">
            <p><span>Move sensitive raw data</span>Move sensitive raw data.</p>
            <p><span>Keep checks in your stack</span>Keep checks in your stack.</p>
          </div>
          <a className="button button-dark ed-cta" href="#waitlist">Discuss an integration pilot <ArrowIcon /></a>
        </div>
        <figure className="ed-panel">
          <figcaption>Customer-controlled data</figcaption>
          <div className="boundary">
            <span>Data</span>
            <span>Local CLI</span>
            <span>review.json</span>
          </div>
          <p className="panel-foot">No default raw-data upload</p>
          <p className="ed-note">SDK / API / VPC integrations are future deployment pathways, not shipping features.</p>
        </figure>
      </section>

      <section className="ed-band">
        <div className="ed-copy">
          <p className="ed-kicker">07 / Product readiness</p>
          <h2>Useful now. Ambitious by design.</h2>
          <p>Clear maturity boundaries between local diagnostics, research-led model decisions, and future automated training-data operations.</p>
          <div className="ed-contrast">
            <p><span>Vague product roadmap</span>Vague product roadmap.</p>
            <p><span>Explicit maturity boundaries</span>Explicit maturity boundaries.</p>
          </div>
        </div>
        <figure className="ed-panel">
          <figcaption>Capability maturity</figcaption>
          <dl className="maturity">
            <div><dt>01 / Local CLI</dt><dd>Diagnostics + JSON</dd></div>
            <div><dt>02 / Research</dt><dd>Predictions + validation</dd></div>
            <div><dt>03 / Roadmap</dt><dd>Automation + integrations</dd></div>
          </dl>
          <p className="ed-note">Not currently offering certified compliance, insurance underwriting, or physics-verified synthesis.</p>
        </figure>
      </section>

      <section className="ed-band tone-mint flip">
        <div className="ed-copy">
          <p className="ed-kicker">08 / Two ways to get started</p>
          <h2>Give your engineers their time back.</h2>
          <p>Start with the self-serve diagnostic workflow or bring a model-specific improvement question to a technical preview.</p>
          <div className="ed-contrast">
            <p><span>Start with the CLI</span>Start with the CLI.</p>
            <p><span>Explore advanced intelligence</span>Explore advanced intelligence.</p>
          </div>
          <a className="button button-dark ed-cta" href="#waitlist">Book a technical preview <ArrowIcon /></a>
        </div>
        <figure className="ed-panel">
          <figcaption>Choose your entry point</figcaption>
          <div className="entry-cards">
            <a href="#cli"><b>01 Free CLI</b><span>Immediate diagnostic results</span></a>
            <a href="#waitlist"><b>02 Technical preview</b><span>A pilot for higher-value decisions</span></a>
          </div>
          <p className="ed-note">Choose the right entry path: fast CLI value or a deeper technical conversation.</p>
        </figure>
      </section>
    </div>
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
      <path d="M28 250 C 120 230, 180 160, 250 120 S 400 70, 520 58" fill="none" stroke="#9aa6b2" strokeWidth="2" strokeDasharray="7 7" />
      <path d="M28 250 C 110 236, 170 188, 230 168 C 280 150, 300 210, 340 188 S 430 90, 520 62" fill="none" stroke="#4149ec" strokeWidth="2.4" />
      <circle cx="286" cy="196" r="28" fill="none" stroke="#ff9d74" strokeWidth="1.6" />
      <circle cx="286" cy="196" r="4" fill="#ff9d74" />
      <text x="18" y="322" fill="#5c6670" fontSize="11">Reference</text>
      <text x="150" y="322" fill="#4149ec" fontSize="11">Observed</text>
      <text x="390" y="322" fill="#ff9d74" fontSize="11">Flag / path detour</text>
    </svg>
  );
}

function LearningOrbit() {
  return (
    <svg className="orbit" viewBox="0 0 360 280" role="img" aria-label="A four-phase loop: measure, decide, verify, learn">
      <circle cx="180" cy="132" r="46" fill="none" stroke="#4149ec" strokeWidth="1.6" />
      <circle cx="180" cy="132" r="74" fill="rgba(65,73,236,0.08)" />
      <path d="M180 58 A74 74 0 0 1 254 132" fill="none" stroke="#4149ec" strokeWidth="8" strokeLinecap="round" />
      <path d="M254 132 A74 74 0 0 1 180 206" fill="none" stroke="#2ec4b6" strokeWidth="8" strokeLinecap="round" />
      <path d="M180 206 A74 74 0 0 1 106 132" fill="none" stroke="#f08a5d" strokeWidth="8" strokeLinecap="round" />
      <path d="M106 132 A74 74 0 0 1 180 58" fill="none" stroke="#b6e36b" strokeWidth="8" strokeLinecap="round" />
      <circle cx="180" cy="58" r="6" fill="#b6e36b" />
      <circle cx="254" cy="132" r="6" fill="#4149ec" />
      <circle cx="180" cy="206" r="6" fill="#2ec4b6" />
      <circle cx="106" cy="132" r="6" fill="#f08a5d" />
    </svg>
  );
}

function OutcomeChart() {
  const predicted = "M8 168 C42 164 58 150 86 138 C118 124 132 108 164 96 C198 82 214 70 248 58 C282 46 300 40 332 34";
  const realized = "M8 172 C42 168 58 158 86 148 C118 136 132 122 164 112 C198 100 214 90 248 78 C282 66 300 58 332 50";
  const band = `${predicted} L332 62 C300 70 282 78 248 90 C214 104 198 116 164 128 C132 142 118 152 86 162 C58 170 42 176 8 180 Z`;

  return (
    <svg className="outcome-chart" viewBox="0 0 408 210" role="img" aria-label="Predicted and realized lift rise across five evaluation checkpoints, with a prediction range around the predicted curve">
      {[168, 136, 104, 72, 40, 8].map((y) => (
        <line key={y} x1="28" y1={y} x2="388" y2={y} stroke="#e7ece8" strokeWidth="1" />
      ))}
      {[28, 100, 172, 244, 316, 388].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="168" stroke="#e7ece8" strokeWidth="1" />
      ))}
      <path d={band} fill="rgba(56,141,186,0.16)" />
      <path d={predicted} fill="none" stroke="#388dba" strokeWidth="2.4" strokeLinecap="round" />
      <path d={realized} fill="none" stroke="#0eb483" strokeWidth="2.4" strokeLinecap="round" />
      {["5", "4", "3", "2", "1", "0"].map((label, index) => (
        <text key={label} x="4" y={12 + index * 32} fill="#89958c" fontSize="11">{label}</text>
      ))}
      {["0", "1", "2", "3", "4", "5"].map((label, index) => (
        <text key={`x-${label}`} x={24 + index * 72} y="186" fill="#89958c" fontSize="11">{label}</text>
      ))}
    </svg>
  );
}


function ForecastChart() {
  // 7 data points across 6 runs. x: 0..720, y: inverted (0=top)
  // Predicted (blue)  — higher curve
  const pred = [
    { x: 24,  y: 148, pct: "52%" },
    { x: 144, y: 118, pct: "61%" },
    { x: 264, y: 97,  pct: "67%" },
    { x: 384, y: 72,  pct: "74%" },
    { x: 504, y: 52,  pct: "80%" },
    { x: 624, y: 36,  pct: "85%" },
    { x: 720, y: 22,  pct: "89%" },
  ];
  // Realized (green) — slightly below
  const real = [
    { x: 24,  y: 158, pct: "49%" },
    { x: 144, y: 134, pct: "56%" },
    { x: 264, y: 112, pct: "62%" },
    { x: 384, y: 90,  pct: "69%" },
    { x: 504, y: 74,  pct: "74%" },
    { x: 624, y: 57,  pct: "79%" },
    { x: 720, y: 43,  pct: "83%" },
  ];

  const H = 180; // chart height

  // Build smooth cubic-bezier path from points
  const smoothPath = (pts: { x: number; y: number }[]) => {
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.45;
      const cp2x = curr.x - (curr.x - prev.x) * 0.45;
      d += ` C${cp1x},${prev.y} ${cp2x},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  };

  // Area path: line + close back along the bottom
  const areaPath = (pts: { x: number; y: number }[], bottom: number) => {
    return `${smoothPath(pts)} L${pts[pts.length - 1].x},${bottom} L${pts[0].x},${bottom} Z`;
  };

  const predLine = smoothPath(pred);
  const realLine = smoothPath(real);
  const predArea = areaPath(pred, H);
  const realArea = areaPath(real, H);

  const runLabels = ["RUN 12", "RUN 18", "RUN 24", "RUN 31", "RUN 38", "RUN 44"];

  return (
    <div className="forecast-chart-wrap">
      <svg
        className="forecast-chart"
        viewBox={`0 0 744 ${H}`}
        role="img"
        aria-label="Predicted and realized task-success lift trends upward across six training runs"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad-pred" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b9ee8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2b9ee8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-real" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#159d7a" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#159d7a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[30, 70, 110, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="744" y2={y} stroke="#edf0ee" strokeWidth="1" />
        ))}

        {/* Area fills */}
        <path d={predArea} fill="url(#grad-pred)" />
        <path d={realArea} fill="url(#grad-real)" />

        {/* Lines */}
        <path d={predLine} fill="none" stroke="#2b9ee8" strokeWidth="2" strokeLinecap="round" />
        <path d={realLine} fill="none" stroke="#159d7a" strokeWidth="2" strokeLinecap="round" />

        {/* Dots — predicted */}
        {pred.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fff" stroke="#2b9ee8" strokeWidth="2" />
        ))}

        {/* Dots — realized */}
        {real.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fff" stroke="#159d7a" strokeWidth="2" />
        ))}
      </svg>

      {/* X-axis run labels */}
      <div className="chart-axis" aria-hidden="true">
        {runLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function LiftPreview() {
  return (
    <section className="lift-preview" aria-label="Rampcheck lift forecast preview">
      <div className="preview-topbar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="preview-command">rampcheck · lift forecast — run 0417</span>
        <span className="status-pill"><i /> PRE-TRAINING</span>
      </div>
      <div className="preview-content">
        <div className="chart-panel">
          <div className="chart-heading">
            <div>
              <h2>Predicted vs. realized lift</h2>
              <p>Task success rate · candidate dataset vs. baseline</p>
            </div>
            <div className="chart-score">+8.4% <span>±1.6</span></div>
          </div>
          <div className="chart-legend">
            <span className="legend-predicted">PREDICTED</span>
            <span className="legend-realized">REALIZED</span>
          </div>
          <ForecastChart />
        </div>
        <div className="flagged-panel" role="region" aria-label="Flagged trajectories">
          <h3>FLAGGED TRAJECTORIES</h3>
          <ul>
            <li><span>ep_0417 · path detour</span><b className="negative">−3.1%</b></li>
            <li><span>ep_0923 · joint jerk</span><b className="negative">−1.8%</b></li>
            <li><span>ep_1102 · sync drift 84ms</span><b className="negative">−1.2%</b></li>
            <li><span>ep_1288 · recovery demo</span><b className="positive">+2.4%</b></li>
          </ul>
          <div className="gpu-saved">
            <span>GPU HOURS SAVED (EST.)</span>
            <b>212 h</b>
          </div>
        </div>
      </div>
    </section>
  );
}

function CliDemo() {
  return (
    <section className="cli-section" id="how-it-works">
      <div className="section-wrap">
        <div className="cli-inner">
          <div className="cli-copy">
            <p className="cli-free-label">Free · no sign-up</p>
            <h2>Run your first diagnostic in under 2 minutes.</h2>
            <p>
              The Rampcheck CLI scans any LeRobot or MCAP dataset — locally or from S3/Azure — and
              surfaces trajectory pathologies instantly. No sign-up. No data leaves your machine.
            </p>
            <ul className="check-list">
              <li>Flags operator detours, joint jerk spikes, and sync drift</li>
              <li>Identifies recovery demos your policy shouldn&apos;t discard</li>
              <li>Outputs a ranked episode manifest for your training pipeline</li>
            </ul>
            <div className="cli-badges">
              <span className="cli-badge">LeRobot</span>
              <span className="cli-badge">MCAP</span>
              <span className="cli-badge">S3 / Azure Blob</span>
              <span className="cli-badge">Local filesystem</span>
            </div>
          </div>
          <div className="cli-terminal-wrap">
            <Terminal className="cli-magicui-terminal">
              <TypingAnimation className="text-green-400">$ pip install rampcheck-cli</TypingAnimation>
              <AnimatedSpan className="text-zinc-400">Collecting rampcheck-cli...</AnimatedSpan>
              <AnimatedSpan className="text-zinc-400">Resolving dependencies...</AnimatedSpan>
              <AnimatedSpan className="text-green-500">✔ Successfully installed rampcheck-cli-0.4.1</AnimatedSpan>
              <TypingAnimation className="text-green-400">$ rampcheck diagnose ./my_dataset</TypingAnimation>
              <AnimatedSpan className="text-zinc-400">↳ Scanning 1,847 episodes...</AnimatedSpan>
              <AnimatedSpan className="text-zinc-400">↳ Checking joint jerk, timestamp drift, path detours...</AnimatedSpan>
              <AnimatedSpan className="text-yellow-400">⚠  412 episodes flagged for review</AnimatedSpan>
              <AnimatedSpan className="text-green-400">✓  Est. lift after quarantine: +6.2%</AnimatedSpan>
              <AnimatedSpan className="text-green-400">✓  212 GPU-hours saved (est.)</AnimatedSpan>
              <AnimatedSpan className="text-zinc-400">↳ Report saved to ./rampcheck-report.json</AnimatedSpan>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
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
        <a className="button button-dark header-cta" href="#waitlist">Book a technical preview</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>Know what to train on next.</h1>
            <p className="hero-description">
              Run automated dataset checks from your terminal. Review the results locally.
              <br />
              Explore model-specific lift prediction through a technical pilot.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#cli">
                Explore the free CLI
                <TerminalIcon />
              </a>
              <a className="button button-light" href="#waitlist">
                Book a technical preview
                <CalendarIcon />
              </a>
            </div>
          </div>

          <div className="hero-stage">
            <div className="hero-terminal" id="cli" aria-label="Illustrative Rampcheck CLI session">
              <div className="hero-terminal-bar">zsh&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;~/robot-demos</div>
              <div className="hero-terminal-body">
                <p className="term-prompt">
                  <span className="term-user">andon@workstation</span>
                  <span className="term-path">&nbsp;~/robot-demos</span>
                  <span className="term-pct">&nbsp;%</span>
                  <span className="term-cmd">&nbsp;rampcheck scan ./dataset --report html</span>
                </p>
                <p className="term-kicker">Rampcheck&nbsp;&nbsp;/&nbsp;&nbsp;local dataset inspection</p>
                <p className="term-rule" aria-hidden="true">-------------------------------------------------------</p>
                <p className="term-ok-line">[ok]&nbsp;&nbsp;Schema validation</p>
                <p className="term-ok-line">[ok]&nbsp;&nbsp;Episode metadata read</p>
                <p className="term-ok-line">[ok]&nbsp;&nbsp;Signal checks completed</p>
                <p className="term-label">REVIEW CANDIDATES</p>
                <p className="term-warn-line">[!]&nbsp;&nbsp;&nbsp;312&nbsp;&nbsp;timestamp-alignment candidates</p>
                <p className="term-warn-line">[!]&nbsp;&nbsp;&nbsp;186&nbsp;&nbsp;possible motion irregularities</p>
                <p className="term-warn-line">[!]&nbsp;&nbsp;&nbsp;&nbsp;74&nbsp;&nbsp;possible duplicate episodes</p>
                <div className="term-file-rule" />
                <p className="term-file-line"><span>Report</span>./rampcheck/summary.html</p>
                <p className="term-file-line"><span>Manifest</span>./rampcheck/review.json</p>
                <p className="term-cursor-line">$ <span className="term-cursor" aria-hidden="true" /></p>
              </div>
            </div>

            <aside className="outcome-panel" aria-label="Illustrative prediction versus outcome">
              <h2>Prediction vs. outcome</h2>
              <p>Task-success improvement across evaluation runs</p>
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
                <h3>Model improvement over evaluation runs</h3>
                <span>Lift (pp)</span>
              </div>
              <OutcomeChart />
              <p className="outcome-axis">Evaluation checkpoint</p>
              <div className="outcome-legend">
                <span><i className="legend-swatch swatch-predicted" /> Predicted lift (pp)</span>
                <span><i className="legend-swatch swatch-realized" /> Realized lift (pp)</span>
                <span><i className="legend-swatch swatch-range" /> Prediction range</span>
              </div>
            </aside>
          </div>
          <p className="hero-disclaimer">Illustrative interface and model-evaluation data; not measured Rampcheck results.</p>
        </section>

        <EditorialSections />

        <section className="stats-strip" hidden aria-label="Rampcheck stats">
          <BlurFade delay={0.05} inView>
            <article>
              <div className="stat-number">
                <NumberTicker value={212} className="stat-ticker" />
                <span className="stat-unit">h</span>
              </div>
              <p>GPU hours saved per run (est.)</p>
            </article>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <article>
              <div className="stat-number">
                <NumberTicker value={8} decimalPlaces={1} startValue={0} className="stat-ticker" />
                <span className="stat-unit">%</span>
              </div>
              <p>Average lift after quarantine</p>
            </article>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <article>
              <div className="stat-number">
                <span className="stat-ticker">0</span>
              </div>
              <p>Bytes of raw data egressed</p>
            </article>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <article>
              <div className="stat-number">
                <NumberTicker value={1847} className="stat-ticker" />
              </div>
              <p>Episodes diagnosed in demo run</p>
            </article>
          </BlurFade>
        </section>

        <section className="steps-section section-wrap" id="approach">
          <div className="section-intro">
            <h2>From raw logs to a decision in three steps</h2>
            <p>Rampcheck plugs into the pipeline you already run — SDK in CI, worker in your VPC, receipts in the portal.</p>
          </div>
          <div className="steps-stack">
            <article className="step-card step-three">
              <span className="step-num">03</span>
              <h3>Verify</h3>
              <p>Get a clear, auditable lift forecast before training.</p>
            </article>
            <article className="step-card step-two">
              <span className="step-num">02</span>
              <h3>Predict</h3>
              <p>See which trajectories help, hurt, or need a closer look.</p>
            </article>
            <article className="step-card step-one">
              <span className="step-num">01</span>
              <h3>Scan</h3>
              <p>
                Point the CLI or SDK at a LeRobot or MCAP dataset. Rampcheck
                profiles every episode — motion, timing, instruction alignment —
                without moving a byte out of your cloud.
              </p>
              <div className="step-footnote">LEROBOT · MCAP · RUNS IN PLACE, ZERO EGRESS</div>
            </article>
          </div>
        </section>

        <CliDemo />

        <section className="product-section section-wrap" id="product">
          <div className="section-intro">
            <h2>Four wedges. One pipeline.</h2>
            <p>Each wedge runs headless in your VPC and feeds the same calibration loop — predictions get sharper with every run you verify.</p>
          </div>
          <div className="wedge-list">
            {wedges.map((wedge, index) => (
              <details className="wedge" key={wedge.number} open={index === 0}>
                <summary>
                  <span className="wedge-number">WEDGE {wedge.number}</span>
                  <span className="wedge-title">{wedge.title}</span>
                  <span className="wedge-toggle" aria-hidden="true" />
                </summary>
                <div className="wedge-content">
                  <p>{wedge.description}</p>
                  {wedge.bullets && (
                    <ul>
                      {wedge.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="benchmarks-section section-wrap" id="security">
          <div className="section-intro">
            <h2>Backtested where the field backtests.</h2>
            <p>We validate the predictor against completed training runs on public manipulation benchmarks — with injected detours, label mismatches, and synthetic slices — and report rank correlation per suite. No cherry-picked demos.</p>
          </div>
          <div className="benchmark-grid">
            <article className="privacy-card">
              <h3>Your data never leaves your cloud.</h3>
              <p>Robotics datasets are crown-jewel IP. Rampcheck is architected so we never hold them: the worker runs in your VPC, trajectories stream browser-direct from your bucket, and our control plane stores only metadata, predictions, and hashes.</p>
              <ul className="check-list">
                <li>Headless Python SDK + Docker worker — CI/CD native</li>
                <li>Anonymized outcome receipts only: predicted vs. realized lift</li>
                <li>VPC-local calibration for air-gapped teams</li>
              </ul>
              <div className="deployment-spec">
                <h4>DEPLOYMENT SPEC</h4>
                <dl>
                  <dt>RUNTIME</dt><dd>Docker worker · your VPC</dd>
                  <dt>CLOUD</dt><dd>AWS S3 · Azure Blob</dd>
                  <dt>FORMATS</dt><dd>LeRobot · MCAP · RLDS</dd>
                  <dt>CONTROL PLANE</dt><dd>Metadata + hashes only</dd>
                  <dt>DATA EGRESS</dt><dd>None</dd>
                </dl>
              </div>
            </article>
            <div className="benchmark-cards">
              <article className="benchmark-card">
                <div className="benchmark-card-top">
                  <h3>Libero</h3><span className="progress-pill"><i /> BACKTEST IN PROGRESS</span>
                </div>
                <p className="benchmark-meta">SIMULATION · ROBOSUITE / MUJOCO</p>
                <p>Suites: Spatial · Object · Goal · Long. Controlled, reproducible — the clean lab test of whether predicted rankings match trained outcomes.</p>
                <div className="metric"><span>METRIC</span><b>Spearman rank correlation · predicted vs. realized</b></div>
              </article>
              <article className="benchmark-card">
                <div className="benchmark-card-top">
                  <h3>Open X-Embodiment</h3><span className="progress-pill"><i /> BACKTEST IN PROGRESS</span>
                </div>
                <p className="benchmark-meta">REAL ROBOTS · 22 EMBODIMENTS · 1M+ TRAJECTORIES</p>
                <p>Messy, heterogeneous teleoperation at scale — the stress test. If the ranking holds here, it holds on your data.</p>
                <div className="metric"><span>METRIC</span><b>Spearman rank correlation · predicted vs. realized</b></div>
              </article>
            </div>
          </div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <div className="waitlist-inner">
            <div className="waitlist-copy">
              <h2>Join the waitlist.</h2>
              <p>We onboard robotics teams in small batches, starting with teams who train weekly and feel the cost of a wasted run. Tell us about your stack and we&apos;ll prioritize your first diagnostic.</p>
              <ul className="check-list">
                <li>Free diagnostic CLI — available today, no waitlist</li>
                <li>SDK + VPC worker for waitlist teams in order</li>
                <li>Benchmark tear-downs published as backtests complete</li>
              </ul>
            </div>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="site-footer" id="resources">
        <a className="wordmark footer-wordmark" href="#top">
          <BrandMark />
          <span>Rampcheck</span>
        </a>
        <div className="footer-directory">
          <div>
            <h2>Product</h2>
            <a href="#cli">Free CLI<small>Local dataset checks</small></a>
            <a href="#waitlist">Lift Predictor<small>Technical research preview</small></a>
            <a href="#security">Integration pilot<small>Explore a deeper deployment</small></a>
          </div>
          <div>
            <h2>Resources</h2>
            <a href="#resources">Documentation</a>
            <a href="#approach">Approach</a>
            <a href="#security">Security</a>
          </div>
          <div>
            <h2>Robotics data</h2>
            <a href="#product">Demonstrations</a>
            <a href="#product">Joint trajectories</a>
            <a href="#product">Sensor recordings</a>
          </div>
          <div>
            <h2>Get started</h2>
            <a href="#cli">Explore free CLI</a>
            <a href="#waitlist">Book technical preview</a>
            <a href="#security">Discuss an integration pilot</a>
          </div>
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
