"use client";

import { useState } from "react";

type Cfg = "open" | "ring" | "duct";

interface CfgData {
  prot: [number, string];
  weight: [number, string];
  eff: [number, string];
  time: [number, string];
  verdict: string;
  note: string;
  show: { vortices: boolean; ring: boolean; duct: boolean };
  fast: boolean;
}

const data: Record<Cfg, CfgData> = {
  open: {
    prot: [12, "low"],
    weight: [2, "none"],
    eff: [88, "baseline 100%"],
    time: [100, "longest"],
    verdict:
      "<b>Open prop.</b> Nothing to lift but itself, vortex leaks freely. Top efficiency and range — zero crash protection. The racer's choice.",
    note: "Open prop = your baseline. The two ember swirls are the tip vortices leaking energy on every rotation.",
    show: { vortices: true, ring: false, duct: false },
    fast: false,
  },
  ring: {
    prot: [78, "good"],
    weight: [55, "+ adds mass"],
    eff: [74, "≈ −10% ish"],
    time: [80, "shorter"],
    verdict:
      "<b>Loose ring.</b> Bumper added, props survive crashes — but the hoop sits too far to seal the tip, so the vortex still leaks <em>and</em> you carry weight + drag. Insurance paid in battery.",
    note: "Notice: the vortex is still there. The hoops protect, but they don't fix the leak — they just add the ember drag arrows and mass.",
    show: { vortices: true, ring: true, duct: false },
    fast: false,
  },
  duct: {
    prot: [80, "good"],
    weight: [72, "++ heaviest"],
    eff: [96, "can exceed 100%"],
    time: [88, "depends on weight"],
    verdict:
      "<b>Tight duct.</b> The wall sits right at the tip and plugs the leak — the vortex vanishes and the duct lip adds its own thrust. Aero <em>wins</em>; the only catch is the extra weight to lift.",
    note: "The ember swirls are gone. The wall seals the tip and the bright lip arrows are bonus thrust. In testing a duct hovered at 68.8% throttle vs 69.1% open — it actually helped.",
    show: { vortices: false, ring: false, duct: true },
    fast: true,
  },
};

const meters: { key: keyof Pick<CfgData, "prot" | "weight" | "eff" | "time">; name: string; color: string }[] = [
  { key: "prot", name: "Crash protection", color: "var(--gain)" },
  { key: "weight", name: "Weight tax", color: "var(--weight)" },
  { key: "eff", name: "Aero efficiency", color: "var(--air)" },
  { key: "time", name: "Flight time", color: "var(--thrust)" },
];

const toggles: { cfg: Cfg; label: string; sub: string }[] = [
  { cfg: "open", label: "Open prop", sub: "no guard" },
  { cfg: "ring", label: "Loose ring", sub: "cheap plastic hoop" },
  { cfg: "duct", label: "Tight duct", sub: "engineered shroud" },
];

const styles = `
  .pge{
    --bg:#100D09;
    --panel:#1B1813;
    --panel-2:#100D09;
    --ink:#F1ECE0;
    --muted:#9A9082;
    --line:rgba(217,201,168,0.16);
    --air:#D9C9A8;        /* neutral moving air / downwash */
    --air-soft:rgba(217,201,168,0.45);
    --waste:#FF6A00;      /* Ember — wasted energy / tip vortex / loss / drag */
    --gain:#F1ECE0;       /* Bone — recovered energy / sealed clean flow */
    --weight:#A84A00;     /* Ember-Deep — the weight tax */
    --thrust:#D9C9A8;     /* Sand */

    background:var(--bg);color:var(--ink);
    font-family:var(--font-body),system-ui,sans-serif;
    line-height:1.6;-webkit-font-smoothing:antialiased;
    overflow-x:hidden;display:block;
  }
  .pge *{box-sizing:border-box}
  .pge .wrap{max-width:1000px;margin:0 auto;padding:0 22px}
  .pge h1,.pge h2,.pge h3{font-family:var(--font-display),sans-serif;line-height:1.1;margin:0}
  .pge .mono{font-family:var(--font-mono),monospace}
  .pge .eyebrow{
    font-family:var(--font-mono),monospace;font-size:.72rem;letter-spacing:.22em;
    text-transform:uppercase;color:var(--air);margin-bottom:14px;
  }

  /* ---------- HERO ---------- */
  .pge header{position:relative;padding:84px 0 60px;overflow:hidden}
  .pge .hero-grid{position:absolute;inset:0;
    background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
    background-size:46px 46px;opacity:.25;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 70% 30%,#000 30%,transparent 75%);mask-image:radial-gradient(ellipse 70% 60% at 70% 30%,#000 30%,transparent 75%);}
  .pge .hero-inner{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:30px;align-items:center}
  .pge h1{font-size:clamp(2.3rem,6vw,4rem);font-weight:700;letter-spacing:-.02em}
  .pge h1 .glow{color:var(--air)}
  .pge .lede{color:var(--muted);font-size:1.08rem;max-width:46ch;margin-top:20px}
  .pge .scroll-tip{margin-top:30px;font-family:var(--font-mono),monospace;font-size:.74rem;color:var(--muted);letter-spacing:.1em}
  .pge .scroll-tip span{color:var(--air)}

  /* spinning top-view rotor in hero */
  .pge .rotor-stage{display:flex;justify-content:center;align-items:center;min-height:240px}
  .pge .rotor{position:relative;width:230px;height:230px}
  .pge .rotor .disk{position:absolute;inset:0;border-radius:50%;
    border:1px dashed var(--line);
    background:radial-gradient(circle,rgba(217,201,168,.10),transparent 68%);}
  .pge .blades{position:absolute;inset:0;animation:pge-spin 1.1s linear infinite;transform-origin:50% 50%}
  .pge .blade{position:absolute;top:50%;left:50%;width:104px;height:15px;
    background:linear-gradient(90deg,rgba(217,201,168,.15),var(--thrust));
    border-radius:0;transform-origin:0 50%}
  .pge .blade.b1{transform:translate(0,-50%) rotate(0deg)}
  .pge .blade.b2{transform:translate(0,-50%) rotate(120deg)}
  .pge .blade.b3{transform:translate(0,-50%) rotate(240deg)}
  .pge .hub{position:absolute;top:50%;left:50%;width:30px;height:30px;transform:translate(-50%,-50%);
    background:#1B1813;border:2px solid var(--thrust);border-radius:50%;z-index:2}
  @keyframes pge-spin{to{transform:rotate(360deg)}}

  /* ---------- SECTIONS ---------- */
  .pge section{padding:54px 0;border-top:1px solid var(--line)}
  .pge .sec-head{max-width:62ch;margin-bottom:30px}
  .pge h2{font-size:clamp(1.5rem,3.6vw,2.2rem);font-weight:600;letter-spacing:-.01em}
  .pge .sec-head p{color:var(--muted);margin:14px 0 0;font-size:1.05rem}
  .pge .num{font-family:var(--font-mono),monospace;color:var(--air);font-size:.8rem;letter-spacing:.1em}

  .pge .stage{background:var(--panel);border:1px solid var(--line);border-radius:0;
    padding:26px;position:relative;overflow:hidden}
  .pge .caption{font-size:.92rem;color:var(--muted);margin-top:18px}
  .pge .caption b{color:var(--ink);font-weight:600}

  .pge .tag{font-family:var(--font-mono),monospace;font-size:.66rem;letter-spacing:.08em;text-transform:uppercase}

  /* ---------- INTERACTIVE COMPARISON ---------- */
  .pge .toggle{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
  .pge .toggle button{
    font-family:var(--font-display),sans-serif;font-weight:600;font-size:.95rem;
    background:var(--panel-2);color:var(--muted);border:1px solid var(--line);
    padding:11px 16px;border-radius:0;cursor:pointer;transition:.18s;flex:1;min-width:140px}
  .pge .toggle button .t-sub{display:block;font-family:var(--font-mono),monospace;font-size:.64rem;font-weight:400;margin-top:3px;letter-spacing:.05em}
  .pge .toggle button:hover{border-color:var(--air-soft);color:var(--ink)}
  .pge .toggle button[aria-pressed="true"]{color:var(--ink);border-color:#FF6A00;
    background:linear-gradient(180deg,rgba(255,106,0,.14),rgba(255,106,0,.03));
    box-shadow:0 0 0 1px #FF6A00 inset}

  .pge .compare{display:grid;grid-template-columns:1.05fr .95fr;gap:24px;align-items:stretch}
  .pge .viz{background:#100D09;border:1px solid var(--line);border-radius:0;min-height:340px;display:flex}
  .pge .viz svg{width:100%;height:auto;display:block}

  /* streamline animation */
  .pge .flowline{fill:none;stroke:var(--air);stroke-width:2;stroke-linecap:round;
    stroke-dasharray:7 13;animation:pge-flow 1.1s linear infinite;opacity:.85}
  @keyframes pge-flow{to{stroke-dashoffset:-40}}
  .pge .flow-fast{animation-duration:.55s;stroke:var(--air);opacity:1}

  .pge .vortex{transform-origin:center;animation:pge-swirl 1.4s linear infinite}
  @keyframes pge-swirl{to{transform:rotate(360deg)}}

  .pge .fade-in{animation:pge-fadein .5s ease both}
  @keyframes pge-fadein{from{opacity:0}to{opacity:1}}

  /* meters */
  .pge .meters{display:flex;flex-direction:column;gap:16px;justify-content:center}
  .pge .meter-label{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
  .pge .meter-label .name{font-family:var(--font-display),sans-serif;font-weight:600;font-size:.95rem}
  .pge .meter-label .val{font-family:var(--font-mono),monospace;font-size:.78rem;color:var(--muted)}
  .pge .bar{height:11px;background:var(--panel-2);border-radius:0;overflow:hidden;border:1px solid var(--line)}
  .pge .fill{height:100%;width:0;border-radius:0;transition:width .7s cubic-bezier(.4,0,.2,1)}
  .pge .verdict{margin-top:4px;background:var(--panel-2);border:1px solid var(--line);border-left:3px solid var(--air);
    border-radius:0;padding:14px 16px;font-size:.92rem;color:var(--ink);min-height:74px}
  .pge .verdict b{color:var(--air)}

  /* myth buster two-col */
  .pge .myth{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:8px}
  .pge .myth .card{background:var(--panel);border:1px solid var(--line);border-radius:0;padding:22px}
  .pge .myth .x{color:var(--waste);font-family:var(--font-mono),monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase}
  .pge .myth .check{color:var(--gain);font-family:var(--font-mono),monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase}
  .pge .myth h3{font-size:1.15rem;margin:10px 0 8px}
  .pge .myth p{color:var(--muted);font-size:.95rem;margin:0}

  /* car analogy */
  .pge .cars{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .pge .car{background:var(--panel);border:1px solid var(--line);border-radius:0;padding:22px;position:relative}
  .pge .car .glyph{font-size:1.9rem;margin-bottom:10px}
  .pge .car h3{font-size:1.05rem;margin-bottom:8px}
  .pge .car p{color:var(--muted);font-size:.9rem;margin:0}
  .pge .car .pill{position:absolute;top:16px;right:16px;font-family:var(--font-mono),monospace;font-size:.6rem;
    letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:0;border:1px solid var(--line)}

  /* takeaway */
  .pge .takeaway{background:linear-gradient(160deg,var(--panel-2),var(--panel));
    border:1px solid var(--line);border-radius:0;padding:32px}
  .pge .takeaway h2{margin-bottom:14px}
  .pge .takeaway p{color:var(--muted);font-size:1.05rem}
  .pge .takeaway .key{color:var(--gain);font-weight:600}
  .pge .takeaway .build{margin-top:18px;padding:16px 18px;background:#100D09;border:1px solid var(--line);
    border-radius:0;font-size:.95rem}
  .pge .takeaway .build .tag{color:var(--air);display:block;margin-bottom:6px}

  .pge footer{padding:40px 0 60px;color:var(--muted);font-size:.78rem;border-top:1px solid var(--line)}
  .pge footer a{color:var(--air)}

  @media (max-width:760px){
    .pge .hero-inner{grid-template-columns:1fr}
    .pge .rotor-stage{order:-1}
    .pge .compare{grid-template-columns:1fr}
    .pge .myth,.pge .cars{grid-template-columns:1fr}
  }
  @media (prefers-reduced-motion:reduce){
    .pge .blades,.pge .flowline,.pge .vortex{animation:none}
  }
`;

export function PropGuardsExplainer() {
  const [cfg, setCfg] = useState<Cfg>("open");
  const d = data[cfg];

  return (
    <div className="pge">
      <style>{styles}</style>

      <header>
        <div className="hero-grid" />
        <div className="wrap hero-inner">
          <div>
            <div className="eyebrow">Drone aerodynamics · flow visualization</div>
            <h1>
              The air doesn&apos;t get <span className="glow">blocked</span>.
              <br />
              It gets <span className="glow">taxed</span>.
            </h1>
            <p className="lede">
              Prop guards don&apos;t really choke your airflow. The real story is a tiny tornado at each blade tip — and
              whether your guard ignores it, or seals it. Flip the configs below and watch.
            </p>
            <div className="scroll-tip">
              ↓ scroll · or jump to the <span>live comparison</span>
            </div>
          </div>
          <div className="rotor-stage">
            <div className="rotor" aria-hidden="true">
              <div className="disk" />
              <div className="blades">
                <div className="blade b1" />
                <div className="blade b2" />
                <div className="blade b3" />
              </div>
              <div className="hub" />
            </div>
          </div>
        </div>
      </header>

      {/* 1. SPINNING WING */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="num">01 / the basic deal</div>
            <h2>A propeller is just a spinning wing</h2>
            <p>
              It grabs air and throws it <b>down</b>. The air shoves the drone <b>up</b> in return — every push has an
              equal push back. Bigger downward throw = more lift.
            </p>
          </div>
          <div className="stage">
            <svg
              viewBox="0 0 760 300"
              role="img"
              aria-label="A propeller throwing air downward and the drone being pushed up"
            >
              {/* drone body */}
              <rect x="320" y="120" width="120" height="26" rx="7" fill="#1B1813" />
              <rect x="320" y="120" width="120" height="26" rx="7" fill="#1B1813" stroke="#3A2E22" />
              <rect x="250" y="128" width="80" height="10" rx="5" fill="#1B1813" stroke="#3A2E22" />
              <rect x="430" y="128" width="80" height="10" rx="5" fill="#1B1813" stroke="#3A2E22" />
              {/* prop disks */}
              <ellipse cx="250" cy="124" rx="62" ry="9" fill="none" stroke="#D9C9A8" strokeDasharray="4 5" opacity=".8" />
              <ellipse cx="510" cy="124" rx="62" ry="9" fill="none" stroke="#D9C9A8" strokeDasharray="4 5" opacity=".8" />
              {/* thrust up arrow */}
              <g>
                <line x1="380" y1="120" x2="380" y2="58" stroke="#D9C9A8" strokeWidth="3" />
                <path d="M380 46 L372 64 L388 64 Z" fill="#D9C9A8" />
                <text x="396" y="60" fill="#D9C9A8" className="tag">
                  drone pushed up · thrust
                </text>
              </g>
              {/* air thrown down (animated streamlines) */}
              <path className="flowline" d="M210 150 C210 190 214 220 214 270" />
              <path className="flowline" d="M250 150 C250 190 250 220 250 280" style={{ animationDelay: "-.3s" }} />
              <path className="flowline" d="M290 150 C290 190 286 220 286 270" style={{ animationDelay: "-.6s" }} />
              <path className="flowline" d="M470 150 C470 190 474 220 474 270" style={{ animationDelay: "-.15s" }} />
              <path className="flowline" d="M510 150 C510 190 510 220 510 280" style={{ animationDelay: "-.45s" }} />
              <path className="flowline" d="M550 150 C550 190 546 220 546 270" style={{ animationDelay: "-.75s" }} />
              <text x="560" y="250" fill="#D9C9A8" className="tag">
                air thrown down · downwash
              </text>
            </svg>
            <p className="caption">
              The fastest, hardest-working part of the blade is the <b>tip</b> — the outer edge moves fastest, so it does
              most of the lifting. Hold that thought.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TIP VORTEX */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="num">02 / the leak</div>
            <h2>The tip vortex: energy you&apos;re already wasting</h2>
            <p>
              Under the blade the air is squeezed (high pressure). Above it, it&apos;s thin (low pressure). At the open
              tip, the high-pressure air sneaks around the edge to fill the low-pressure side — and curls into a little
              tornado. That swirl does <b>no useful lifting</b>. It&apos;s pure waste, on an open prop, every second of
              flight.
            </p>
          </div>
          <div className="stage">
            <svg
              viewBox="0 0 760 300"
              role="img"
              aria-label="Close up of a blade tip with high pressure curling around into a wasteful spinning vortex"
            >
              {/* blade cross-section (airfoil) */}
              <path
                d="M120 150 C230 120 430 120 540 146 C430 168 230 172 120 150 Z"
                fill="#1B1813"
                stroke="#3A2E22"
                strokeWidth="1.5"
              />
              <text x="250" y="155" fill="#9A9082" className="tag">
                blade cross-section
              </text>
              {/* low pressure above */}
              <text x="150" y="92" fill="#D9C9A8" className="tag">
                low pressure (thin air)
              </text>
              <line x1="150" y1="100" x2="430" y2="118" stroke="#D9C9A8" strokeWidth="1" strokeDasharray="3 4" opacity=".5" />
              {/* high pressure below */}
              <text x="150" y="226" fill="#A84A00" className="tag">
                high pressure (squeezed air)
              </text>
              <line x1="150" y1="206" x2="430" y2="176" stroke="#A84A00" strokeWidth="1" strokeDasharray="3 4" opacity=".5" />
              {/* curl around the tip */}
              <path d="M540 176 C610 178 640 150 612 128 C588 110 556 124 552 144" fill="none" stroke="#FF6A00" strokeWidth="2.5" />
              <path d="M552 144 L548 132 L562 138 Z" fill="#FF6A00" />
              {/* the wasteful vortex */}
              <g transform="translate(648,150)">
                <g className="vortex">
                  <path
                    d="M0 0 m -28 0 a 28 28 0 1 1 56 0 a 22 22 0 1 1 -44 0 a 16 16 0 1 1 32 0 a 10 10 0 1 1 -20 0"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="2.5"
                    opacity=".9"
                  />
                </g>
                <circle r="3" fill="#FF6A00" />
              </g>
              <text x="600" y="240" fill="#FF6A00" className="tag">
                tip vortex · wasted energy
              </text>
            </svg>
            <p className="caption">
              Think of water spilling around the rim of a bucket instead of staying inside. That spillage moves a lot,
              but it lifts <b>nothing</b>. This single leak is the secret to understanding every guard below.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE */}
      <section id="compare">
        <div className="wrap">
          <div className="sec-head">
            <div className="num">03 / the live comparison</div>
            <h2>Same prop, three jackets. Watch what changes.</h2>
            <p>
              The word &quot;prop guard&quot; hides two opposite things. Flip between them and watch the tip vortex, the
              streamlines, and the four tradeoffs respond.
            </p>
          </div>

          <div className="toggle" role="group" aria-label="Choose a configuration">
            {toggles.map((t) => (
              <button key={t.cfg} aria-pressed={cfg === t.cfg} onClick={() => setCfg(t.cfg)}>
                {t.label}
                <span className="t-sub">{t.sub}</span>
              </button>
            ))}
          </div>

          <div className="compare">
            <div className="viz">
              <svg
                viewBox="0 0 420 360"
                role="img"
                aria-label="Cross section of one rotor showing airflow for the selected configuration"
              >
                {/* motor hub */}
                <rect x="190" y="40" width="40" height="22" rx="5" fill="#1B1813" stroke="#3A2E22" />
                {/* blades */}
                <path
                  d="M120 78 C170 66 250 66 300 78 C250 90 170 90 120 78 Z"
                  fill="#1B1813"
                  stroke="#3A2E22"
                  strokeWidth="1.5"
                />

                {/* incoming air (top) */}
                <path className="flowline" d="M150 8 L150 60" style={{ animationDelay: "-.2s" }} />
                <path className="flowline" d="M210 8 L210 58" style={{ animationDelay: "-.5s" }} />
                <path className="flowline" d="M270 8 L270 60" style={{ animationDelay: "-.8s" }} />

                {/* DOWNWASH (always present, gets faster w/ duct) */}
                <g id="downwash">
                  <path className={`flowline${d.fast ? " flow-fast" : ""}`} d="M150 92 C150 150 152 210 152 320" />
                  <path
                    className={`flowline${d.fast ? " flow-fast" : ""}`}
                    d="M180 92 C180 150 180 210 180 330"
                    style={{ animationDelay: "-.25s" }}
                  />
                  <path
                    className={`flowline${d.fast ? " flow-fast" : ""}`}
                    d="M210 92 C210 150 210 210 210 336"
                    style={{ animationDelay: "-.5s" }}
                  />
                  <path
                    className={`flowline${d.fast ? " flow-fast" : ""}`}
                    d="M240 92 C240 150 240 210 240 330"
                    style={{ animationDelay: "-.35s" }}
                  />
                  <path
                    className={`flowline${d.fast ? " flow-fast" : ""}`}
                    d="M270 92 C270 150 268 210 268 320"
                    style={{ animationDelay: "-.6s" }}
                  />
                </g>

                {/* OPEN/RING tip vortices (waste) */}
                <g id="vortices" style={{ display: d.show.vortices ? "block" : "none" }}>
                  <g transform="translate(112,96)">
                    <g className="vortex">
                      <path
                        d="M0 0 m -16 0 a 16 16 0 1 1 32 0 a 11 11 0 1 1 -22 0 a 6 6 0 1 1 12 0"
                        fill="none"
                        stroke="#FF6A00"
                        strokeWidth="2"
                      />
                    </g>
                  </g>
                  <g transform="translate(308,96)">
                    <g className="vortex" style={{ animationDirection: "reverse" }}>
                      <path
                        d="M0 0 m -16 0 a 16 16 0 1 1 32 0 a 11 11 0 1 1 -22 0 a 6 6 0 1 1 12 0"
                        fill="none"
                        stroke="#FF6A00"
                        strokeWidth="2"
                      />
                    </g>
                  </g>
                </g>

                {/* RING (loose hoop, far from tips) */}
                {d.show.ring && (
                  <g id="ring" className="fade-in" key={`ring-${cfg}`}>
                    <circle cx="95" cy="80" r="9" fill="none" stroke="#A84A00" strokeWidth="4" />
                    <circle cx="325" cy="80" r="9" fill="none" stroke="#A84A00" strokeWidth="4" />
                    {/* drag arrows */}
                    <line x1="95" y1="80" x2="70" y2="80" stroke="#FF6A00" strokeWidth="2" />
                    <path d="M64 80 L78 74 L78 86 Z" fill="#FF6A00" />
                    <line x1="325" y1="80" x2="350" y2="80" stroke="#FF6A00" strokeWidth="2" />
                    <path d="M356 80 L342 74 L342 86 Z" fill="#FF6A00" />
                    <text x="150" y="118" fill="#A84A00" className="tag">
                      hoop sits far from tip — vortex still leaks
                    </text>
                  </g>
                )}

                {/* DUCT (tight wall at tip, seals vortex, lip thrust) */}
                {d.show.duct && (
                  <g id="duct" className="fade-in" key={`duct-${cfg}`}>
                    {/* duct walls, airfoil-ish, close to tips */}
                    <path
                      d="M104 60 C92 80 92 120 104 150 L116 150 C108 120 108 80 116 60 Z"
                      fill="#1B1813"
                      stroke="#F1ECE0"
                      strokeWidth="2"
                    />
                    <path
                      d="M316 60 C328 80 328 120 316 150 L304 150 C312 120 312 80 304 60 Z"
                      fill="#1B1813"
                      stroke="#F1ECE0"
                      strokeWidth="2"
                    />
                    {/* sealed clean flow at tips */}
                    <path className="flowline flow-fast" d="M110 92 C110 150 110 210 110 318" style={{ stroke: "#F1ECE0" }} />
                    <path className="flowline flow-fast" d="M310 92 C310 150 310 210 310 318" style={{ stroke: "#F1ECE0" }} />
                    {/* lip thrust arrows */}
                    <line x1="110" y1="58" x2="110" y2="30" stroke="#F1ECE0" strokeWidth="2.5" />
                    <path d="M110 22 L104 38 L116 38 Z" fill="#F1ECE0" />
                    <line x1="310" y1="58" x2="310" y2="30" stroke="#F1ECE0" strokeWidth="2.5" />
                    <path d="M310 22 L304 38 L316 38 Z" fill="#F1ECE0" />
                    <text x="118" y="178" fill="#F1ECE0" className="tag">
                      wall seals the tip · duct lip adds thrust
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="meters">
              {meters.map((m) => {
                const [width, val] = d[m.key];
                return (
                  <div key={m.key}>
                    <div className="meter-label">
                      <span className="name">{m.name}</span>
                      <span className="val">{val}</span>
                    </div>
                    <div className="bar">
                      <div className="fill" style={{ width: `${width}%`, background: m.color }} />
                    </div>
                  </div>
                );
              })}
              <div className="verdict" dangerouslySetInnerHTML={{ __html: d.verdict }} />
            </div>
          </div>
          <p className="caption" dangerouslySetInnerHTML={{ __html: d.note }} />
        </div>
      </section>

      {/* 4. MYTH BUSTER */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="num">04 / fixing the intuition</div>
            <h2>Where the cost actually comes from</h2>
            <p>
              Your gut says a guard &quot;blocks the air.&quot; It mostly doesn&apos;t — the downward column still flows
              right through an open hoop. The real bill is paid somewhere else.
            </p>
          </div>
          <div className="myth">
            <div className="card">
              <div className="x">✕ not really the problem</div>
              <h3>Blocked airflow</h3>
              <p>
                A loose ring barely interrupts the downward jet. Air goes down through the open hoop almost like it
                isn&apos;t there. This is the part people worry about, and it&apos;s the smallest factor.
              </p>
            </div>
            <div className="card">
              <div className="x">✓ this is the real tax</div>
              <h3>Weight + drag</h3>
              <p>
                The drone now has to lift the guard too (weight), and the ring pushes against the air as you fly forward
                (drag). That&apos;s what quietly eats your battery — not a choked airflow column.
              </p>
            </div>
          </div>
          <p className="caption">
            Rule of thumb: every <b>1%</b> of efficiency you lose is worth roughly <b>1–1.5 minutes</b> of flight time. A
            heavy ring spends that minute-by-minute, invisibly.
          </p>
        </div>
      </section>

      {/* 5. CAR ANALOGY */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="num">05 / the analogy</div>
            <h2>It&apos;s exactly like bumpers on a car</h2>
            <p>Same chassis, three philosophies. This is the whole decision in one picture.</p>
          </div>
          <div className="cars">
            <div className="car">
              <div className="pill" style={{ color: "var(--thrust)" }}>
                fastest
              </div>
              <div className="glyph">🏎️</div>
              <h3>Open prop</h3>
              <p>
                A race car with no bumpers. Most efficient, longest range — but one fender-bender and you&apos;re
                replacing parts. Best for racing and max flight time.
              </p>
            </div>
            <div className="car">
              <div className="pill" style={{ color: "var(--weight)" }}>
                insurance
              </div>
              <div className="glyph">🚙</div>
              <h3>Loose ring guard</h3>
              <p>
                A foam bumper strapped on. You survive bumps, but you haul dead weight and lose a little range. Pure
                insurance you pay for in battery life. Great indoors, near people, while learning.
              </p>
            </div>
            <div className="car">
              <div className="pill" style={{ color: "var(--gain)" }}>
                engineered
              </div>
              <div className="glyph">🏁</div>
              <h3>Tight duct</h3>
              <p>
                A properly engineered aero kit. Costs weight, but it&apos;s shaped so well it can make the thing{" "}
                <em>handle better</em> — while still protecting it. The rare safety feature that can pay for itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TAKEAWAY */}
      <section>
        <div className="wrap">
          <div className="takeaway">
            <div className="num" style={{ marginBottom: "10px" }}>
              the bottom line
            </div>
            <h2>A guard doesn&apos;t choke airflow — it taxes you in weight and drag.</h2>
            <p>
              A cheap ring is <span className="key">pure insurance</span> paid in battery life: the tip vortex keeps
              leaking, you just added weight on top. A well-built duct is the one case where the safety feature can{" "}
              <span className="key">pay for itself</span>, by plugging that same leak an open prop wastes energy on every
              second.
            </p>
            <div className="build">
              <span className="tag">for your hardware builds</span>
              If you want protection <b>and</b> efficiency, the move is a close-tolerance, airfoil-shaped duct in a light
              material (foam-core, or thin printed PA) with a tiny tip gap — not a fat plastic ring held far from the
              blades. The gap is everything: far hoop = tax, near wall = recovery.
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          Figures grounded in published testing: prop guards trade a small efficiency cost for safety; a tight ducted
          guard measured ~68.8% hover throttle vs ~69.1% with no guard (the duct slightly <em>helped</em>), while a loose
          guard adds weight and drag. Efficiency↔endurance rule (~1–1.5 min per 1%) from drone propulsion aerodynamics
          literature. Diagrams are schematic, not to scale.
        </div>
      </footer>
    </div>
  );
}
