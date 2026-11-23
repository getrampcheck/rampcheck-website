import WaitlistForm from "./waitlist-form";

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
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 63 63"
      fill="none"
    >
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
  return (
    <svg
      className="forecast-chart"
      viewBox="0 0 720 190"
      role="img"
      aria-label="Predicted and realized lift trend upward across six training runs"
      preserveAspectRatio="none"
    >
      <g className="chart-grid">
        <path d="M0 24H720M0 70H720M0 116H720M0 162H720" />
      </g>
      <path
        className="chart-predicted"
        d="M4 142 122 111 240 93 358 67 476 50 594 34 714 21"
      />
      <path
        className="chart-realized"
        d="M4 151 122 128 240 106 358 85 476 72 594 55 714 43"
      />
      <g className="chart-points predicted-points">
        <path d="M4 133v17m118-48v17m118-34v17m118-43v17m118-34v17m118-32v17m120-29v17" />
      </g>
      <g className="chart-points realized-points">
        <path d="M4 144v16m118-40v16m118-23v16m118-33v16m118-26v16m118-32v16m120-24v16" />
      </g>
    </svg>
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
          <div className="chart-axis" aria-hidden="true">
            <span>RUN 12</span><span>RUN 18</span><span>RUN 24</span>
            <span>RUN 31</span><span>RUN 38</span>
          </div>
        </div>
        <aside className="flagged-panel">
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
        </aside>
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
          <a href="#benchmarks">Benchmarks</a>
          <a href="#resources">Docs</a>
          <a href="#waitlist">Pricing</a>
        </nav>
        <a className="button button-dark header-cta" href="#waitlist">Join the waitlist</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> DATA BEFORE GPU</p>
            <h1>Know what your data will do<br className="desktop-break" /> before you train on it.</h1>
            <p className="hero-description">
              Rampcheck predicts the lift of a candidate robot-learning dataset
              before you spend a single GPU-hour — then cleans the trajectories,
              fills the gaps, and keeps the receipts. All inside your VPC.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#waitlist">Join the waitlist</a>
              <a className="button button-light" href="#how-it-works">Try the free diagnostic CLI</a>
            </div>
            <p className="hero-tags">FREE CLI FOR LEROBOT · MCAP · ZERO DATA EGRESS · AWS · AZURE</p>
          </div>
          <LiftPreview />
        </section>

        <section className="benefit-strip" aria-label="Rampcheck benefits">
          <article>
            <span className="number">01</span>
            <h2>Predicted lift, pre-training</h2>
            <p>Ranked with confidence intervals — know before you spend.</p>
          </article>
          <article>
            <span className="number">02</span>
            <h2>Clean trajectories in place</h2>
            <p>Detours, jerk, drift, mismatches — quarantined in your VPC.</p>
          </article>
          <article>
            <span className="number">03</span>
            <h2>Contact forces, no gloves</h2>
            <p>Force + shear inferred from kinematics. No wearable rigs.</p>
          </article>
          <article>
            <span className="number">04</span>
            <h2>Audit logs that hold up</h2>
            <p>Hashed lineage for safety reviews and robot insurance.</p>
          </article>
        </section>

        <section className="steps-section section-wrap" id="how-it-works">
          <div className="section-intro">
            <p className="eyebrow"><span /> HOW IT WORKS</p>
            <h2>From raw logs to a decision in three steps</h2>
            <p>Rampcheck plugs into the pipeline you already run — SDK in CI, worker in your VPC, receipts in the portal.</p>
          </div>
          <div className="steps-stack">
            <article className="step-card step-three">
              <span className="eyebrow">STEP 3</span>
              <h3>Verify</h3>
              <p>Get a clear, auditable lift forecast before training.</p>
            </article>
            <article className="step-card step-two">
              <span className="eyebrow">STEP 2</span>
              <h3>Predict</h3>
              <p>See which trajectories help, hurt, or need a closer look.</p>
            </article>
            <article className="step-card step-one">
              <span className="eyebrow">STEP 1</span>
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

        <section className="product-section section-wrap" id="product">
          <div className="section-intro">
            <p className="eyebrow"><span /> THE PRODUCT</p>
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
            <p className="eyebrow"><span /> BENCHMARKS</p>
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
              <p className="eyebrow"><span /> PRIVATE BETA</p>
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
