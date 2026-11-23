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
          <a href="#how-it-works">Diagnostic CLI</a>
          <a href="#product">Product</a>
          <a href="#benchmarks">Benchmarks</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
        <a className="button button-dark header-cta" href="#waitlist">Join the waitlist</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <BlurFade delay={0.05} inView>
              <p className="hero-pretitle">Pre-training intelligence for robot learning</p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h1>Know what your data will do<br className="desktop-break" /> before you train on it.</h1>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="hero-description">
                Rampcheck predicts the lift of a candidate robot-learning dataset
                before you spend a single GPU-hour — then cleans the trajectories,
                fills the gaps, and keeps the receipts. All inside your VPC.
              </p>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <div className="hero-actions">
                <a className="button button-dark" href="#waitlist">Join the waitlist</a>
                <a className="button button-light" href="#how-it-works">Try the free diagnostic CLI</a>
              </div>
            </BlurFade>
            <p className="hero-tags">FREE CLI FOR LEROBOT + MCAP  ·  ZERO DATA EGRESS  ·  AWS + AZURE</p>
          </div>
          <LiftPreview />
        </section>

        <section className="stats-strip" aria-label="Rampcheck stats">
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

        <section className="steps-section section-wrap" id="how-it-works">
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

        <section className="benchmarks-section section-wrap" id="benchmarks">
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
        <div className="footer-main">
          <div className="footer-brand">
            <a className="wordmark" href="#top">
              <span className="footer-mark"><BrandMark /></span>
              <span>Rampcheck</span>
            </a>
            <p>Pre-training intelligence for robot learning.<br />Know what your data will do before you train on it.</p>
          </div>
          <div className="footer-column">
            <h2>PRODUCT</h2>
            <a href="#product">Lift prediction</a>
            <a href="#product">Trajectory cleaning</a>
            <a href="#product">Synthetic motion</a>
            <a href="#product">Audit logs</a>
          </div>
          <div className="footer-column">
            <h2>RESOURCES</h2>
            <a href="#how-it-works">Documentation</a>
            <a href="#benchmarks">Benchmarks</a>
            <a href="#how-it-works">Diagnostic CLI</a>
            <a href="#benchmarks">Changelog</a>
          </div>
          <div className="footer-column">
            <h2>COMPANY</h2>
            <a href="#top">About</a>
            <a href="#waitlist">Contact</a>
            <a href="#resources">Privacy</a>
            <a href="#resources">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Rampcheck. All rights reserved.</span>
          <span>ZERO EGRESS · VPC-NATIVE · LEROBOT + MCAP</span>
        </div>
      </footer>
    </>
  );
}
