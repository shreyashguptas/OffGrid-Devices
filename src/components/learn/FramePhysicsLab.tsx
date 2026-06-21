"use client";

import { useEffect, useRef } from "react";

export function FramePhysicsLab() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = (id: string) => root.querySelector("#" + CSS.escape(id)) as HTMLElement | null;
    const $c = (id: string) =>
      root.querySelector<HTMLCanvasElement>("#" + CSS.escape(id))!;

    // ---------- shared helpers ----------
    interface SetupResult {
      ctx: CanvasRenderingContext2D;
      w: number;
      h: number;
    }
    function setup(canvas: HTMLCanvasElement): SetupResult {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // capture intended height ONCE
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyCv = canvas as any;
      if (!anyCv._h)
        anyCv._h = Number(canvas.getAttribute("height")) || canvas.height;
      const cssW = canvas.clientWidth || canvas.offsetWidth || 320;
      const cssH = anyCv._h as number;
      canvas.style.width = "100%";
      canvas.style.height = cssH + "px"; // lock display height so it can't compound
      const pxW = Math.round(cssW * dpr),
        pxH = Math.round(cssH * dpr);
      if (canvas.width !== pxW) canvas.width = pxW; // only resize bitmap when needed
      if (canvas.height !== pxH) canvas.height = pxH;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w: cssW, h: cssH };
    }
    // stress color: t 0(cool/Sand)->0.5(warm)->1(hot/Ember)
    function stress(t: number): string {
      t = Math.max(0, Math.min(1, t));
      const c = [217, 201, 168],
        a = [201, 118, 46],
        h = [255, 106, 0];
      let A: number[], B: number[], k: number;
      if (t < 0.5) {
        A = c;
        B = a;
        k = t / 0.5;
      } else {
        A = a;
        B = h;
        k = (t - 0.5) / 0.5;
      }
      const r = Math.round(A[0] + (B[0] - A[0]) * k),
        g = Math.round(A[1] + (B[1] - A[1]) * k),
        b = Math.round(A[2] + (B[2] - A[2]) * k);
      return `rgb(${r},${g},${b})`;
    }
    const COOL = "#D9C9A8",
      WARN = "#C9762E",
      HOT = "#FF6A00",
      CYAN = "#F1ECE0",
      GRID = "rgba(217,201,168,0.16)",
      DIM = "#9A9082",
      FAINT = "#6F6658";
    function gridBG(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }
    const animators: Array<(t: number) => void> = [];
    let rafId = 0;
    function loop(t: number) {
      animators.forEach((f) => f(t));
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    // =================================================================
    // 1. CANTILEVER
    // =================================================================
    (function () {
      const cv = $c("c-cant");
      let L = 100,
        sec = "tube";
      const Lin = $("cant-L-in") as HTMLInputElement,
        seg = $("cant-seg")!;
      const Imap: Record<string, number> = { tube: 1.0, rod: 0.45, flat: 0.12 };
      const Iname: Record<string, string> = {
        tube: "hollow tube",
        rod: "solid rod",
        flat: "thin flat",
      };
      Lin.oninput = () => {
        L = +Lin.value;
        update();
      };
      seg.querySelectorAll("button").forEach(
        (b) =>
          (b.onclick = () => {
            seg.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
            b.classList.add("on");
            sec = (b as HTMLElement).dataset.v!;
            update();
          })
      );
      let defl = 0,
        tilt = 0,
        sevG = 0;
      function update() {
        const Lr = L / 100,
          I = Imap[sec];
        defl = Math.pow(Lr, 3) / I; // relative deflection ∝ L^3 / I
        const sev = Math.min(1, (defl - 1) / 6);
        sevG = sev;
        tilt = Math.min(34, defl * 2.4);
        $("cant-L")!.textContent = L + "%";
        $("cant-sec")!.textContent = Iname[sec];
        $("cant-def")!.textContent = defl.toFixed(2) + "×";
        $("cant-def")!.style.color = stress(sev);
        $("cant-I")!.textContent = Math.round(I * 100) + "%";
        $("cant-tilt")!.textContent = tilt.toFixed(1) + "°";
        $("cant-tilt")!.style.color = stress(sev);
        const st = $("cant-status")!;
        if (defl < 1.3) {
          st.innerHTML = "Thrust vector points nearly straight up. The FC barely works.";
          st.className = "status";
        } else if (defl < 3) {
          st.innerHTML =
            "Arm is flexing — the motor tilts and the FC must steer to compensate.";
          st.className = "status";
        } else {
          st.innerHTML =
            "Severe flex. Thrust is badly off-axis and the arm rings like a spring.";
          st.className = "status bad";
        }
      }
      let ph = 0;
      function draw() {
        const { ctx, w, h } = setup(cv);
        gridBG(ctx, w, h);
        ph += 0.05;
        const baseX = 64,
          baseY = h / 2;
        const armLen = (w - 150) * (0.45 + 0.55 * (L / 200));
        const sag = defl * 9 + Math.sin(ph) * Math.min(8, defl * 1.6); // static + ring
        // wall (fixed end)
        ctx.fillStyle = "#1B1813";
        ctx.fillRect(baseX - 26, baseY - 46, 26, 92);
        for (let i = -40; i < 40; i += 9) {
          ctx.strokeStyle = "#100D09";
          ctx.beginPath();
          ctx.moveTo(baseX - 26, baseY + i);
          ctx.lineTo(baseX - 6, baseY + i + 9);
          ctx.stroke();
        }
        // beam as curve (cantilever shape ~ quadratic)
        const segN = 40;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        const grad = ctx.createLinearGradient(baseX, 0, baseX + armLen, 0);
        grad.addColorStop(0, stress(Math.min(1, sevG + 0.15)));
        grad.addColorStop(1, stress(Math.max(0, sevG - 0.25)));
        ctx.strokeStyle = grad;
        ctx.beginPath();
        let endX = 0,
          endY = 0,
          prevX = 0,
          prevY = 0;
        for (let i = 0; i <= segN; i++) {
          const u = i / segN,
            x = baseX + armLen * u,
            y = baseY + sag * u * u;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          if (i === segN) {
            endX = x;
            endY = y;
          }
          if (i === segN - 1) {
            prevX = x;
            prevY = y;
          }
        }
        ctx.stroke();
        // section indicator near root
        ctx.lineWidth = 1;
        ctx.strokeStyle = DIM;
        ctx.fillStyle = "#100D09";
        // motor at tip, tilted along beam end tangent
        const ang = Math.atan2(endY - prevY, endX - prevX);
        ctx.save();
        ctx.translate(endX, endY);
        ctx.rotate(ang);
        ctx.fillStyle = "#1B1813";
        ctx.strokeStyle = stress(sevG);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, 7);
        ctx.fill();
        ctx.stroke();
        // prop
        ctx.strokeStyle = CYAN;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(30, 0);
        ctx.stroke();
        ctx.globalAlpha = 1;
        // thrust arrow (perpendicular to motor = tilted)
        ctx.strokeStyle = stress(sevG);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -46);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-5, -38);
        ctx.lineTo(0, -48);
        ctx.lineTo(5, -38);
        ctx.stroke();
        ctx.restore();
        // true-vertical reference at tip
        ctx.strokeStyle = "rgba(154,144,130,.4)";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX, endY - 50);
        ctx.stroke();
        ctx.setLineDash([]);
        // label
        ctx.fillStyle = FAINT;
        ctx.font = '11px var(--font-mono)';
        ctx.fillText("fixed", baseX - 22, baseY + 62);
        ctx.fillStyle = DIM;
        ctx.fillText("δ ∝ L³ / I", w - 92, 22);
      }
      animators.push(draw);
      update();
    })();

    // =================================================================
    // 2. RESONANCE
    // =================================================================
    (function () {
      const cv = $c("c-res");
      let f = 120,
        fn = 280;
      const zeta = 0.05;
      const fin = $("res-f-in") as HTMLInputElement,
        kin = $("res-k-in") as HTMLInputElement;
      function gain(ff: number) {
        const r = ff / fn;
        return 1 / Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(2 * zeta * r, 2));
      }
      fin.oninput = () => {
        f = +fin.value;
        update();
      };
      kin.oninput = () => {
        fn = +kin.value;
        update();
      };
      let G = 1,
        sev = 0;
      function update() {
        G = gain(f);
        sev = Math.min(1, (G - 1) / 9);
        $("res-f")!.textContent = f + " Hz";
        $("res-k")!.textContent = fn + " Hz";
        $("res-gain")!.textContent = G.toFixed(1) + "×";
        $("res-gain")!.style.color = stress(sev);
        const noise = $("res-noise")!,
          loopEl = $("res-loop")!;
        const st = $("res-status")!;
        if (G < 1.8) {
          noise.textContent = "low";
          noise.style.color = COOL;
          loopEl.textContent = "stable";
          loopEl.style.color = COOL;
          st.innerHTML =
            "Forcing frequency is clear of the resonant peak. The frame stays quiet.";
          st.className = "status";
        } else if (G < 4) {
          noise.textContent = "rising";
          noise.style.color = WARN;
          loopEl.textContent = "straining";
          loopEl.style.color = WARN;
          st.innerHTML =
            "Getting close to resonance — the IMU is picking up real motion plus growing vibration.";
          st.className = "status";
        } else {
          noise.textContent = "SATURATED";
          noise.style.color = HOT;
          loopEl.textContent = "RUNAWAY";
          loopEl.style.color = HOT;
          st.innerHTML =
            "At resonance the FC chases vibration and pumps energy back in. No PID setting fixes this.";
          st.className = "status bad";
        }
      }
      let ph = 0;
      function draw() {
        const { ctx, w, h } = setup(cv);
        gridBG(ctx, w, h);
        ph += 0.25;
        const padL = 46,
          padR = 14,
          padT = 14,
          plotH = 150,
          baseY = padT + plotH;
        const fmax = 480;
        const X = (ff: number) => padL + (ff / fmax) * (w - padL - padR);
        // axes
        ctx.strokeStyle = "#3A2E22";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, baseY);
        ctx.lineTo(w - padR, baseY);
        ctx.stroke();
        ctx.fillStyle = FAINT;
        ctx.font = '10.5px var(--font-mono)';
        for (let ff = 0; ff <= fmax; ff += 120) {
          ctx.fillText(ff + "Hz", X(ff) - 8, baseY + 14);
        }
        ctx.save();
        ctx.translate(12, baseY - plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("vibration gain", -34, 0);
        ctx.restore();
        // resonance curve
        ctx.beginPath();
        for (let px = 0; px <= w - padL - padR; px += 2) {
          const ff = (px / (w - padL - padR)) * fmax;
          const g = gain(ff);
          const y = baseY - Math.min(plotH - 6, (g / 10) * (plotH - 6));
          if (px === 0) ctx.moveTo(padL + px, y);
          else ctx.lineTo(padL + px, y);
        }
        ctx.strokeStyle = "rgba(241,236,224,.55)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // peak marker
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = "rgba(154,144,130,.5)";
        ctx.beginPath();
        ctx.moveTo(X(fn), padT);
        ctx.lineTo(X(fn), baseY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = DIM;
        ctx.fillText("frame fₙ", X(fn) - 18, padT + 8);
        // forcing marker
        const gy = baseY - Math.min(plotH - 6, (G / 10) * (plotH - 6));
        ctx.strokeStyle = stress(sev);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(X(f), baseY);
        ctx.lineTo(X(f), gy);
        ctx.stroke();
        ctx.fillStyle = stress(sev);
        ctx.beginPath();
        ctx.arc(X(f), gy, 5, 0, 7);
        ctx.fill();
        ctx.fillText("prop", X(f) - 10, gy - 10);

        // ---- lower: oscillating arm + IMU trace ----
        const oy = baseY + 34,
          amp = Math.min(26, G * 2.4);
        const wob = Math.sin(ph) * amp;
        // arm
        ctx.strokeStyle = stress(sev);
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(padL, oy);
        const tipX = padL + 120,
          tipY = oy + wob;
        ctx.quadraticCurveTo((padL + tipX) / 2, oy + wob * 0.4, tipX, tipY);
        ctx.stroke();
        ctx.fillStyle = "#1B1813";
        ctx.strokeStyle = stress(sev);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 11, 0, 7);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = FAINT;
        ctx.font = '10.5px var(--font-mono)';
        ctx.fillText("frame + motor", padL - 2, oy + 34);
        // IMU trace box
        const bx = tipX + 34,
          bw = w - padR - bx,
          by = oy - 26,
          bh = 56;
        ctx.strokeStyle = "#3A2E22";
        ctx.strokeRect(bx, by, bw, bh);
        ctx.fillStyle = FAINT;
        ctx.fillText("IMU reads:", bx + 4, by - 4);
        ctx.beginPath();
        for (let i = 0; i < bw - 6; i++) {
          const tt = i * 0.18 + ph;
          const clean = Math.sin(tt * 0.5) * 4;
          const noisy =
            (Math.sin(tt * 3 + 1) + Math.sin(tt * 5.3)) * amp * 0.5 * sev;
          const y = by + bh / 2 + clean + noisy;
          if (i === 0) ctx.moveTo(bx + 3 + i, y);
          else ctx.lineTo(bx + 3 + i, y);
        }
        ctx.strokeStyle = stress(sev);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // feedback loop arrows
        ctx.fillStyle = stress(sev);
        ctx.font = '10.5px var(--font-mono)';
        ctx.fillText(
          sev > 0.4
            ? "↑ noise → PID → motors → ↑ vibration"
            : "noise → PID → motors  (quiet)",
          bx + 4,
          by + bh + 16
        );
      }
      animators.push(draw);
      update();
    })();

    // =================================================================
    // 3. CG BALANCE
    // =================================================================
    (function () {
      const cv = $c("c-cg");
      let bx = 0,
        by = 0;
      const xin = $("cg-x-in") as HTMLInputElement,
        yin = $("cg-y-in") as HTMLInputElement;
      xin.oninput = () => {
        bx = +xin.value;
        update();
      };
      yin.oninput = () => {
        by = +yin.value;
        update();
      };
      let loads = [25, 25, 25, 25],
        off = 0,
        lost = 0,
        sev = 0;
      function update() {
        // motor positions (normalized) TL TR BL BR
        const m = [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ];
        const cgx = bx / 100,
          cgy = by / 100; // CG offset in arm units
        off = Math.hypot(cgx, cgy);
        // load share: motor closer to CG carries more. weight ~ 1/(dist+k)
        const raw = m.map((p) => 1 / (Math.hypot(p[0] - cgx, p[1] - cgy) + 0.6));
        const s = raw.reduce((a, b) => a + b, 0);
        loads = raw.map((r) => (r / s) * 100);
        const worst = Math.max(...loads);
        sev = Math.min(1, (worst - 25) / 30);
        lost = Math.max(0, Math.round((worst - 25) / 0.45));
        $("cg-x")!.textContent = bx + "%";
        $("cg-y")!.textContent = by + "%";
        $("cg-off")!.textContent = (off * 12).toFixed(1) + " cm";
        $("cg-load")!.textContent = Math.round(worst) + "%";
        $("cg-load")!.style.color = stress(sev);
        $("cg-lost")!.textContent = lost + "%";
        $("cg-lost")!.style.color = stress(sev);
        const st = $("cg-status")!;
        if (off < 0.12) {
          st.innerHTML =
            "CG sits on the thrust center. All four motors share the load equally.";
          st.className = "status";
        } else if (off < 0.6) {
          st.innerHTML =
            "CG is off-center. Some motors run harder just to hold level.";
          st.className = "status";
        } else {
          st.innerHTML =
            "Badly off-center. Loaded motors saturate early — little reserve left to correct gusts.";
          st.className = "status bad";
        }
      }
      function draw() {
        const { ctx, w, h } = setup(cv);
        gridBG(ctx, w, h);
        const cx = w / 2,
          cy = h / 2,
          R = Math.min(w, h) * 0.3;
        const m = [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ];
        // arms
        ctx.strokeStyle = "#3A2E22";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        m.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + p[0] * R, cy + p[1] * R);
          ctx.stroke();
        });
        // thrust center
        ctx.strokeStyle = "rgba(154,144,130,.5)";
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, 7);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = FAINT;
        ctx.font = '10.5px var(--font-mono)';
        ctx.fillText("thrust center", cx - 32, cy + R + 24);
        // motors with load bars
        m.forEach((p, i) => {
          const mx = cx + p[0] * R,
            my = cy + p[1] * R;
          const sv = Math.min(1, (loads[i] - 25) / 30);
          ctx.fillStyle = "#1B1813";
          ctx.strokeStyle = stress(Math.max(0, sv));
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(mx, my, 15, 0, 7);
          ctx.fill();
          ctx.stroke();
          // load bar
          const bw = 34,
            bh = 7,
            byy = my + (p[1] < 0 ? -30 : 22);
          ctx.fillStyle = "#100D09";
          ctx.fillRect(mx - bw / 2, byy, bw, bh);
          ctx.fillStyle = stress(Math.max(0, sv));
          ctx.fillRect(mx - bw / 2, byy, bw * (loads[i] / 50), bh);
          ctx.fillStyle = DIM;
          ctx.font = '10.5px var(--font-mono)';
          ctx.fillText(
            Math.round(loads[i]) + "%",
            mx - 9,
            byy + (p[1] < 0 ? -3 : 18)
          );
        });
        // CG / battery
        const gx = cx + (bx / 100) * R,
          gy = cy + (by / 100) * R;
        // line from thrust center to CG
        if (Math.hypot(gx - cx, gy - cy) > 3) {
          ctx.strokeStyle = stress(sev);
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(gx, gy);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.fillStyle = stress(sev);
        ctx.strokeStyle = "#100D09";
        ctx.lineWidth = 2;
        ctx.fillRect(gx - 16, gy - 9, 32, 18);
        ctx.strokeRect(gx - 16, gy - 9, 32, 18);
        ctx.fillStyle = "#100D09";
        ctx.font = '700 11px var(--font-mono)';
        ctx.fillText("CG", gx - 8, gy + 3);
      }
      animators.push(draw);
      update();
    })();

    // =================================================================
    // 4. MOMENT OF INERTIA
    // =================================================================
    (function () {
      const cv = $c("c-moi");
      let r = 60;
      const rin = $("moi-r-in") as HTMLInputElement;
      rin.oninput = () => {
        r = +rin.value;
        update();
      };
      let I = 1,
        alpha = 1;
      function update() {
        const rr = r / 60; // normalized radius
        I = rr * rr; // I ∝ r²
        alpha = 1 / I; // fixed torque
        $("moi-r")!.textContent = r < 40 ? "tucked in" : r > 80 ? "spread out" : "centered";
        $("moi-I")!.textContent = I.toFixed(2) + "×";
        $("moi-a")!.textContent = alpha.toFixed(2) + "×";
        $("moi-a")!.style.color = stress(1 - Math.min(1, alpha / 1.6)); // slow = hot? keep neutral
        $("moi-ch")!.textContent =
          r < 45 ? "agile / racer" : r > 80 ? "stable / cine" : "balanced";
        const st = $("moi-status")!;
        if (r < 45) {
          st.innerHTML =
            "Mass tucked in — low inertia, snappy flips. Great for racing, twitchy for video.";
          st.className = "status";
        } else if (r > 80) {
          st.innerHTML =
            "Mass spread out — high inertia, slow to rotate but steady and smooth.";
          st.className = "status";
        } else {
          st.innerHTML = "A balanced trade between agility and stability.";
          st.className = "status";
        }
      }
      let ang = 0,
        vel = 0,
        dir = 1,
        pause = 0;
      function draw() {
        const { ctx, w, h } = setup(cv);
        gridBG(ctx, w, h);
        // fixed-torque flip: alpha drives angular accel, let it flip then reset
        if (pause > 0) {
          pause--;
        } else {
          vel += dir * 0.012 * alpha;
          ang += vel;
          if (Math.abs(ang) > Math.PI) {
            ang = dir * Math.PI;
            vel = 0;
            dir *= -1;
            pause = 24;
          }
        }
        const cx = w / 2,
          cy = h / 2,
          R = Math.min(w, h) * 0.16 * (r / 60) + 30;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        // arms
        ctx.strokeStyle = "#3A2E22";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        const m = [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ];
        m.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p[0] * R, p[1] * R);
          ctx.stroke();
        });
        // masses (size shows it's the same mass, position varies)
        m.forEach((p) => {
          ctx.fillStyle = stress(Math.min(1, (I - 0.4) / 1.4));
          ctx.strokeStyle = "#100D09";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p[0] * R, p[1] * R, 13, 0, 7);
          ctx.fill();
          ctx.stroke();
        });
        // hub
        ctx.fillStyle = "#1B1813";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, 7);
        ctx.fill();
        // torque arrows (constant)
        ctx.restore();
        ctx.strokeStyle = CYAN;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, R + 22, -0.5, 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, R + 22, Math.PI - 0.5, Math.PI + 0.5);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = DIM;
        ctx.font = '11px var(--font-mono)';
        ctx.fillText("fixed torque τ  →  α = τ / I", 14, 20);
        ctx.fillText("I = Σ m·r²", w - 92, 20);
      }
      animators.push(draw);
      update();
    })();

    // =================================================================
    // 5. THRUST MARGIN
    // =================================================================
    (function () {
      const cv = $c("c-tw");
      let tw = 200;
      const tin = $("tw-r-in") as HTMLInputElement;
      tin.oninput = () => {
        tw = +tin.value;
        update();
      };
      let hover = 50,
        reserve = 50,
        sev = 0;
      function update() {
        const ratio = tw / 100;
        hover = 100 / ratio;
        reserve = 100 - hover;
        sev = Math.min(1, (100 - reserve) / 70); // less reserve = hotter
        sev = Math.min(1, Math.max(0, (50 - reserve) / 40));
        $("tw-r")!.textContent = ratio.toFixed(2) + " : 1";
        $("tw-hover")!.textContent = Math.round(hover) + "%";
        $("tw-res")!.textContent = Math.round(reserve) + "%";
        $("tw-res")!.style.color = stress(sev);
        const v = $("tw-verdict")!,
          st = $("tw-status")!;
        if (ratio >= 2) {
          v.textContent = "healthy";
          v.style.color = COOL;
          st.innerHTML =
            "Plenty of headroom above hover to react to gusts and commands.";
          st.className = "status";
        } else if (ratio >= 1.5) {
          v.textContent = "marginal";
          v.style.color = WARN;
          st.innerHTML =
            "Thin reserve. It flies, but corrections feel weak and it sinks in hard maneuvers.";
          st.className = "status";
        } else {
          v.textContent = "dead end";
          v.style.color = HOT;
          st.innerHTML =
            "Almost no reserve. The craft can lift off but cannot reliably catch itself.";
          st.className = "status bad";
        }
      }
      function draw() {
        const { ctx, w, h } = setup(cv);
        gridBG(ctx, w, h);
        const bx = w / 2 - 70,
          bw = 140,
          top = 24,
          bot = h - 30,
          bh = bot - top;
        // frame
        ctx.strokeStyle = "#3A2E22";
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, top, bw, bh);
        // hover portion (from bottom)
        const hH = bh * (hover / 100);
        ctx.fillStyle = "#1B1813";
        ctx.fillRect(bx, bot - hH, bw, hH);
        // reserve portion
        const rH = bh * (reserve / 100);
        const g = ctx.createLinearGradient(0, bot - hH - rH, 0, bot - hH);
        g.addColorStop(0, stress(sev));
        g.addColorStop(1, stress(Math.min(1, sev + 0.2)));
        ctx.fillStyle = g;
        ctx.fillRect(bx, bot - hH - rH, bw, rH);
        // hover line
        ctx.strokeStyle = DIM;
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx - 10, bot - hH);
        ctx.lineTo(bx + bw + 10, bot - hH);
        ctx.stroke();
        ctx.setLineDash([]);
        // labels
        ctx.fillStyle = DIM;
        ctx.font = '11px var(--font-mono)';
        ctx.fillText("hover thrust", bx - 2, bot - hH + 14);
        ctx.fillStyle = stress(sev);
        ctx.fillText("◄ control reserve", bx + bw + 14, bot - hH - rH / 2);
        ctx.fillStyle = FAINT;
        ctx.fillText("100% max thrust", bx - 2, top - 8);
        ctx.fillText("0", bx - 2, bot + 14);
        // a disturbance ball that the reserve must catch
        ctx.fillStyle = reserve > 20 ? COOL : HOT;
        ctx.font = '11px var(--font-mono)';
        ctx.fillText(
          reserve > 35
            ? "gust → caught ✓"
            : reserve > 18
            ? "gust → barely"
            : "gust → can't catch ✗",
          bx - 2,
          bot + 26
        );
      }
      animators.push(draw);
      update();
    })();

    // =================================================================
    // 6. ANISOTROPY
    // =================================================================
    (function () {
      const cv = $c("c-aniso");
      let ori = "good",
        cyc = 0;
      const seg = $("an-seg")!,
        cin = $("an-cyc-in") as HTMLInputElement;
      seg.querySelectorAll("button").forEach(
        (b) =>
          (b.onclick = () => {
            seg.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
            b.classList.add("on");
            ori = (b as HTMLElement).dataset.v!;
            update();
          })
      );
      cin.oninput = () => {
        cyc = +cin.value;
        update();
      };
      let sev = 0;
      function update() {
        const risk = ori === "bad" ? cyc / 100 : (cyc / 100) * 0.18;
        sev = Math.min(1, risk);
        $("an-or")!.textContent = ori === "good" ? "aligned" : "cross-layer";
        $("an-cyc")!.textContent = String(cyc * 1000);
        $("an-stress")!.textContent = ori === "good" ? "along grain" : "across bonds";
        $("an-stress")!.style.color = ori === "good" ? COOL : HOT;
        const rk = $("an-risk")!;
        rk.textContent = sev < 0.3 ? "low" : sev < 0.65 ? "rising" : "cracking";
        rk.style.color = stress(sev);
        const st = $("an-status")!;
        if (ori === "good") {
          st.innerHTML =
            "Bending load runs along the layers, not across the bonds. Fatigue stays low.";
          st.className = "status";
        } else if (sev < 0.5) {
          st.innerHTML =
            "Load pulls across the layer bonds — the weak axis. Micro-cracks beginning.";
          st.className = "status";
        } else {
          st.innerHTML =
            "Cracks propagating along layer lines. This is how printed arms snap in flight.";
          st.className = "status bad";
        }
      }
      function draw() {
        const { ctx, w, h } = setup(cv);
        gridBG(ctx, w, h);
        const ax = 70,
          ay = h / 2,
          armL = w - 180,
          armT = 46;
        // arm body
        ctx.save();
        ctx.beginPath();
        ctx.rect(ax, ay - armT / 2, armL, armT);
        ctx.clip();
        ctx.fillStyle = "#1B1813";
        ctx.fillRect(ax, ay - armT / 2, armL, armT);
        // layer lines
        ctx.strokeStyle = "rgba(217,201,168,0.3)";
        ctx.lineWidth = 1;
        if (ori === "good") {
          // layers run lengthwise (along load)
          for (let y = ay - armT / 2 + 3; y < ay + armT / 2; y += 5) {
            ctx.beginPath();
            ctx.moveTo(ax, y);
            ctx.lineTo(ax + armL, y);
            ctx.stroke();
          }
        } else {
          // layers run crosswise (across load)
          for (let x = ax + 3; x < ax + armL; x += 5) {
            ctx.beginPath();
            ctx.moveTo(x, ay - armT / 2);
            ctx.lineTo(x, ay + armT / 2);
            ctx.stroke();
          }
        }
        ctx.restore();
        ctx.strokeStyle = stress(sev);
        ctx.lineWidth = 2;
        ctx.strokeRect(ax, ay - armT / 2, armL, armT);
        // cracks if bad + cycles
        if (sev > 0.25) {
          const nC = Math.floor(sev * 6) + 1;
          ctx.strokeStyle = HOT;
          ctx.lineWidth = 2;
          for (let i = 0; i < nC; i++) {
            const cx = ax + armL * (0.3 + 0.6 * (i / Math.max(1, nC)));
            const len = armT * 0.5 * sev;
            if (ori === "bad") {
              // crack along a layer line = vertical
              ctx.beginPath();
              ctx.moveTo(cx, ay - len);
              ctx.lineTo(cx + 2, ay - len / 3);
              ctx.lineTo(cx - 1, ay + len / 3);
              ctx.lineTo(cx + 1, ay + len);
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.moveTo(cx, ay - 4);
              ctx.lineTo(cx + 3, ay);
              ctx.lineTo(cx, ay + 4);
              ctx.stroke();
            }
          }
        }
        // fixed wall
        ctx.fillStyle = "#100D09";
        ctx.fillRect(ax - 22, ay - armT, 22, armT * 2);
        // motor at tip
        ctx.fillStyle = "#1B1813";
        ctx.strokeStyle = stress(sev);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ax + armL + 18, ay, 16, 0, 7);
        ctx.fill();
        ctx.stroke();
        // load arrow (bending)
        ctx.strokeStyle = CYAN;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ax + armL + 18, ay - 40);
        ctx.lineTo(ax + armL + 18, ay - 18);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax + armL + 13, ay - 26);
        ctx.lineTo(ax + armL + 18, ay - 16);
        ctx.lineTo(ax + armL + 23, ay - 26);
        ctx.stroke();
        ctx.fillStyle = FAINT;
        ctx.font = '10.5px var(--font-mono)';
        ctx.fillText("cyclic load", ax + armL - 14, ay - 46);
        ctx.fillText(
          ori === "good" ? "layers ∥ load" : "layers ⊥ load",
          ax + 4,
          ay - armT / 2 - 8
        );
      }
      animators.push(draw);
      update();
    })();

    // redraw on resize for crispness (animators re-setup each frame anyway)
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        /* force a reflow-driven redraw */
      }, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
    };
  }, []);

  return (
    <div className="fpl" ref={rootRef}>
      <style>{CSS_TEXT}</style>

      <div className="wrap">
        <header>
          <div className="eyebrow">First Principles · Quadcopter Frames</div>
          <h1>
            Why your frame
            <br />
            fights <span className="hl">back</span>.
          </h1>
          <p className="lede">
            Most drone &quot;rules&quot; are downstream of a handful of physical
            realities. Drag the sliders below and watch the physics misbehave —
            when something turns{" "}
            <b style={{ color: "var(--hot)" }}>hot</b>, the frame is working
            against your flight controller, not with it.
          </p>
        </header>
      </div>

      {/* 1. CANTILEVER */}
      <section>
        <div className="wrap">
          <div className="tag">
            <span className="n">01</span> / STRUCTURAL STIFFNESS
          </div>
          <h2>The arm is a diving board (and L³ is brutal)</h2>
          <p className="cause">
            a motor on an arm is a cantilever loaded at the tip
          </p>
          <p className="body">
            A motor bolted to the end of an arm is a beam fixed at one end,
            pushed at the other. Tip deflection follows{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>
              δ = F·L³ / (3·E·I)
            </span>
            . That <b>cubed length term</b> is the trap: it doesn&apos;t scale
            gently.
          </p>

          <div className="lab">
            <div className="lab-head">
              <span className="t">SIM · cantilever_deflection</span>
              <div className="dots">
                <i className="on"></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <canvas id="c-cant" height={300} role="img" aria-label="Cantilever beam deflection simulation"></canvas>
            <div className="controls">
              <div className="ctrl">
                <label>
                  Arm length L <span className="val" id="cant-L">100%</span>
                </label>
                <input type="range" id="cant-L-in" min={50} max={200} defaultValue={100} aria-label="Arm length" />
              </div>
              <div className="ctrl">
                <label>
                  Cross-section{" "}
                  <span className="val" id="cant-sec">hollow tube</span>
                </label>
                <div className="seg" id="cant-seg">
                  <button data-v="tube" className="on">HOLLOW TUBE</button>
                  <button data-v="rod">SOLID ROD</button>
                  <button data-v="flat">THIN FLAT</button>
                </div>
              </div>
            </div>
            <div className="readouts">
              <div className="ro">
                <span className="lbl">Tip deflection</span>
                <span className="num" id="cant-def">1.0×</span>
              </div>
              <div className="ro">
                <span className="lbl">Stiffness (∝ I)</span>
                <span className="num" id="cant-I">100%</span>
              </div>
              <div className="ro">
                <span className="lbl">Thrust axis tilt</span>
                <span className="num" id="cant-tilt">0.0°</span>
              </div>
            </div>
            <div className="status" id="cant-status">
              Baseline arm. The thrust vector points straight up.
            </div>
          </div>

          <p className="body">
            Two things break when the arm flexes. First, the motor <b>tilts</b>,
            so its thrust no longer points straight up — the FC must permanently
            steer to cancel a force you built in by accident. Second, a flexing
            arm is a <b>spring storing energy</b>, so it oscillates (that&apos;s
            section 02). Notice the cross-section: a hollow tube is far stiffer
            per gram than a solid rod, because stiffness lives in{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>I</span>{" "}
            (how far material sits from the bending axis), not in raw mass.
          </p>
          <div className="analogy">
            A diving board. A short, thick board barely moves. Make it twice as
            long and it doesn&apos;t sag twice as much — it sags <b>eight</b>{" "}
            times as much, and now it bounces you for ages after you step off.
          </div>
          <div className="takeaway">
            <span className="k">DON&apos;T</span>
            <span className="v">
              Stretch arms for clearance or make them thin-and-pretty without
              checking deflection. Doubling length is an 8× flex penalty. Reach
              for tall/hollow sections before you reach for more material.
            </span>
          </div>
        </div>
      </section>

      {/* 2. RESONANCE */}
      <section>
        <div className="wrap">
          <div className="tag">
            <span className="n">02</span> / VIBRATION &amp; CONTROL
          </div>
          <h2>Resonance: the bug software cannot fix</h2>
          <p className="cause">
            prop frequency overlapping the frame&apos;s natural frequency closes
            a feedback loop
          </p>
          <p className="body">
            Every structure rings at natural frequencies —{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>
              f ∝ √(stiffness / mass)
            </span>
            . Your spinning props are a forcing function at a specific frequency.
            Slide the prop frequency under the frame&apos;s resonant peak and
            watch the amplitude explode.
          </p>

          <div className="lab">
            <div className="lab-head">
              <span className="t">SIM · resonance_sweep</span>
              <div className="dots">
                <i></i>
                <i className="on"></i>
                <i></i>
              </div>
            </div>
            <canvas id="c-res" height={340} role="img" aria-label="Resonance frequency sweep simulation"></canvas>
            <div className="controls">
              <div className="ctrl">
                <label>
                  Prop frequency (forcing){" "}
                  <span className="val" id="res-f">120 Hz</span>
                </label>
                <input type="range" id="res-f-in" min={20} max={480} defaultValue={120} aria-label="Prop frequency" />
              </div>
              <div className="ctrl">
                <label>
                  Frame stiffness → moves peak{" "}
                  <span className="val" id="res-k">280 Hz</span>
                </label>
                <input type="range" id="res-k-in" min={120} max={440} defaultValue={280} aria-label="Frame stiffness" />
              </div>
            </div>
            <div className="readouts">
              <div className="ro">
                <span className="lbl">Vibration gain</span>
                <span className="num" id="res-gain">1.1×</span>
              </div>
              <div className="ro">
                <span className="lbl">IMU noise</span>
                <span className="num" id="res-noise">low</span>
              </div>
              <div className="ro">
                <span className="lbl">PID feedback loop</span>
                <span className="num" id="res-loop">stable</span>
              </div>
            </div>
            <div className="status" id="res-status">
              Forcing frequency is clear of the resonant peak. The frame stays
              quiet.
            </div>
          </div>

          <p className="body">
            Why this is catastrophic and not just annoying: the IMU sits{" "}
            <i>on</i> the frame and reads that vibration as if it were real
            motion. The PID loop &quot;corrects&quot; the noise by commanding the
            motors — which feeds energy <b>back into the resonance</b>.
            You&apos;ve built a positive feedback loop. And once vibration
            exceeds half the gyro&apos;s sample rate it <b>aliases</b> down into
            the control band as low-frequency garbage you mathematically cannot
            filter out after sampling. That&apos;s the wall: people tune PIDs for
            hours trying to fix a mechanical problem that no software setting can
            reach.
          </p>
          <div className="analogy">
            A tuning fork. Tap it and it rings at one pitch. Now sing that exact
            pitch at it — it starts humming on its own, louder and louder. The
            prop is your voice; the frame is the fork.
          </div>
          <div className="takeaway">
            <span className="k">DON&apos;T</span>
            <span className="v">
              Assume PID tuning can rescue a vibrating frame. Stiffen the frame
              (raises its natural frequency away from prop range), balance props,
              and soft-mount the FC — but verify the damper&apos;s own resonance
              doesn&apos;t land in a bad band.
            </span>
          </div>
        </div>
      </section>

      {/* 3. CG BALANCE */}
      <section>
        <div className="wrap">
          <div className="tag">
            <span className="n">03</span> / MASS &amp; BALANCE
          </div>
          <h2>Center of gravity off the thrust center</h2>
          <p className="cause">
            for level hover, net torque about the CG must be zero
          </p>
          <p className="body">
            The CG has to sit at the centroid of thrust — the center of the motor
            square. Drag the battery off-center and the motors are forced into a
            permanent asymmetric split just to keep level. You&apos;re spending
            control authority to fight your own layout.
          </p>

          <div className="lab">
            <div className="lab-head">
              <span className="t">SIM · cg_balance · top-down</span>
              <div className="dots">
                <i></i>
                <i></i>
                <i className="on"></i>
              </div>
            </div>
            <canvas id="c-cg" height={320} role="img" aria-label="Center of gravity balance simulation"></canvas>
            <div className="controls">
              <div className="ctrl">
                <label>
                  Battery position X <span className="val" id="cg-x">0%</span>
                </label>
                <input type="range" id="cg-x-in" min={-100} max={100} defaultValue={0} aria-label="Battery position X" />
              </div>
              <div className="ctrl">
                <label>
                  Battery position Y <span className="val" id="cg-y">0%</span>
                </label>
                <input type="range" id="cg-y-in" min={-100} max={100} defaultValue={0} aria-label="Battery position Y" />
              </div>
            </div>
            <div className="readouts">
              <div className="ro">
                <span className="lbl">CG offset</span>
                <span className="num" id="cg-off">0.0 cm</span>
              </div>
              <div className="ro">
                <span className="lbl">Worst motor load</span>
                <span className="num" id="cg-load">25%</span>
              </div>
              <div className="ro">
                <span className="lbl">Control reserve lost</span>
                <span className="num" id="cg-lost">0%</span>
              </div>
            </div>
            <div className="status" id="cg-status">
              CG sits on the thrust center. All four motors share the load
              equally.
            </div>
          </div>

          <p className="body">
            The bars are each motor&apos;s share of the load. With the CG centered
            they&apos;re equal. Shift the battery and the motors nearest the CG
            carry far more — they run hot, hit their ceiling sooner, and the
            headroom they&apos;re burning is headroom you no longer have to{" "}
            <i>correct</i> a gust. Same logic applies to the IMU: mount it near
            the CG, or during rotation it picks up an extra acceleration{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>
              a = α × r
            </span>{" "}
            that isn&apos;t real translation.
          </p>
          <div className="analogy">
            Carrying a tray of drinks. Hold it centered and your arm is relaxed.
            Slide everything to one edge and you&apos;re straining constantly just
            to keep it flat — with nothing left to react if someone bumps you.
          </div>
          <div className="takeaway">
            <span className="k">DON&apos;T</span>
            <span className="v">
              Mount the battery wherever it fits and trim it out in software.
              Trim consumes permanent thrust margin. Physically balance the build
              around the motor centroid, then place the IMU near that same point.
            </span>
          </div>
        </div>
      </section>

      {/* 4. MOMENT OF INERTIA */}
      <section>
        <div className="wrap">
          <div className="tag">
            <span className="n">04</span> / ROTATIONAL DYNAMICS
          </div>
          <h2>Moment of inertia is a trade, not a free lunch</h2>
          <p className="cause">τ = I·α — mass far from center resists rotation</p>
          <p className="body">
            Agility is angular acceleration:{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>
              α = τ / I
            </span>
            . Moment of inertia{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>
              I = Σ m·r²
            </span>{" "}
            grows with the <b>square</b> of how far mass sits from center. Pull
            mass inward and the same motor torque snaps the craft faster; push it
            out and it gets sluggish but calmer.
          </p>

          <div className="lab">
            <div className="lab-head">
              <span className="t">SIM · moment_of_inertia</span>
              <div className="dots">
                <i></i>
                <i></i>
                <i className="on"></i>
              </div>
            </div>
            <canvas id="c-moi" height={300} role="img" aria-label="Moment of inertia rotation simulation"></canvas>
            <div className="controls">
              <div className="ctrl">
                <label>
                  Mass distribution{" "}
                  <span className="val" id="moi-r">centered</span>
                </label>
                <input type="range" id="moi-r-in" min={20} max={100} defaultValue={60} aria-label="Mass distribution" />
              </div>
            </div>
            <div className="readouts">
              <div className="ro">
                <span className="lbl">Moment of inertia I</span>
                <span className="num" id="moi-I">1.0×</span>
              </div>
              <div className="ro">
                <span className="lbl">Response α (fixed τ)</span>
                <span className="num" id="moi-a">1.0×</span>
              </div>
              <div className="ro">
                <span className="lbl">Character</span>
                <span className="num" id="moi-ch">balanced</span>
              </div>
            </div>
            <div className="status" id="moi-status">
              A balanced trade between agility and stability.
            </div>
          </div>

          <p className="body">
            The craft is doing a fixed-torque flip — watch how fast it rotates as
            you redistribute mass. You can&apos;t have maximum agility <i>and</i>{" "}
            maximum stability from the same layout: concentrating mass near the
            center buys snappy response (racing), spreading it out buys steadiness
            and smoother footage (cinema/heavy-lift).
          </p>
          <div className="analogy">
            A figure skater. Arms out, they spin slowly and steadily. Arms tucked
            in, the same push spins them into a blur. The mass didn&apos;t change
            — only how far it sits from the axis.
          </div>
          <div className="takeaway">
            <span className="k">DON&apos;T</span>
            <span className="v">
              Hang heavy gear (batteries, cameras, long booms) far from center and
              then wonder why it feels mushy. Decide whether you want agile or
              stable first, then place mass to match — you&apos;re choosing, not
              optimizing.
            </span>
          </div>
        </div>
      </section>

      {/* 5. THRUST MARGIN */}
      <section>
        <div className="wrap">
          <div className="tag">
            <span className="n">05</span> / CONTROL AUTHORITY
          </div>
          <h2>Thrust-to-weight: control needs a reserve</h2>
          <p className="cause">
            correcting a disturbance requires thrust above hover thrust
          </p>
          <p className="body">
            To hover, motors run at a fraction of max:{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>
              hover throttle = 1 / (T:W)
            </span>
            . To <i>correct</i> a disturbance they must push harder than hover. If
            hover already eats most of your thrust, there is nothing left to
            control with. Slide the ratio toward 1:1 and watch the reserve vanish.
          </p>

          <div className="lab">
            <div className="lab-head">
              <span className="t">SIM · thrust_authority</span>
              <div className="dots">
                <i></i>
                <i></i>
                <i className="on"></i>
              </div>
            </div>
            <canvas id="c-tw" height={260} role="img" aria-label="Thrust-to-weight control reserve simulation"></canvas>
            <div className="controls">
              <div className="ctrl">
                <label>
                  Thrust-to-weight ratio{" "}
                  <span className="val" id="tw-r">2.0 : 1</span>
                </label>
                <input type="range" id="tw-r-in" min={105} max={400} defaultValue={200} aria-label="Thrust-to-weight ratio" />
              </div>
            </div>
            <div className="readouts">
              <div className="ro">
                <span className="lbl">Hover throttle</span>
                <span className="num" id="tw-hover">50%</span>
              </div>
              <div className="ro">
                <span className="lbl">Control reserve</span>
                <span className="num" id="tw-res">50%</span>
              </div>
              <div className="ro">
                <span className="lbl">Verdict</span>
                <span className="num" id="tw-verdict">healthy</span>
              </div>
            </div>
            <div className="status" id="tw-status">
              Plenty of headroom above hover to react to gusts and commands.
            </div>
          </div>

          <p className="body">
            The grey is hover thrust; the colored band above it is everything you
            have left to fight gravity&apos;s surprises. Below about <b>2:1</b>{" "}
            you&apos;re in a design dead end — the craft can technically lift off
            but can&apos;t reliably catch itself. (Yaw is the weakest axis of all:
            a quad yaws only by the small reaction torque from differential prop
            drag, so it has far less authority than pitch or roll to begin with.)
          </p>
          <div className="analogy">
            Jogging with headroom to sprint vs. already sprinting flat-out. If
            you&apos;re maxed just to keep pace, you can&apos;t dodge when a dog
            runs into the road. Hover is your pace; control is the sprint you need
            in reserve.
          </div>
          <div className="takeaway">
            <span className="k">DON&apos;T</span>
            <span className="v">
              Spec motors/props that only just lift the all-up weight. Aim for
              ~2:1 or better so there&apos;s authority left over after hover — and
              remember yaw needs its own margin.
            </span>
          </div>
        </div>
      </section>

      {/* 6. ANISOTROPY */}
      <section>
        <div className="wrap">
          <div className="tag">
            <span className="n">06</span> / MATERIALS · 3D PRINTING
          </div>
          <h2>Printed parts are anisotropic — orientation is structural</h2>
          <p className="cause">
            FDM layer bonds are weaker than the layers themselves
          </p>
          <p className="body">
            An FDM part isn&apos;t one solid lump — it&apos;s stacked layers glued
            at the seams, and that glue line is the weak axis. Under constant
            vibration, cracks start and run <b>along the layer lines</b>. So print
            orientation isn&apos;t cosmetic: align the layers so your main stress
            isn&apos;t trying to peel them apart. Flip the orientation below to see
            the difference.
          </p>

          <div className="lab">
            <div className="lab-head">
              <span className="t">SIM · print_orientation · fatigue</span>
              <div className="dots">
                <i></i>
                <i></i>
                <i className="on"></i>
              </div>
            </div>
            <canvas id="c-aniso" height={280} role="img" aria-label="3D-print layer orientation fatigue simulation"></canvas>
            <div className="controls">
              <div className="ctrl">
                <label>
                  Layer orientation <span className="val" id="an-or">aligned</span>
                </label>
                <div className="seg" id="an-seg">
                  <button data-v="good" className="on">ALIGNED (strong)</button>
                  <button data-v="bad">CROSS-LAYER (weak)</button>
                </div>
              </div>
              <div className="ctrl">
                <label>
                  Load cycles (vibration){" "}
                  <span className="val" id="an-cyc">0</span>
                </label>
                <input type="range" id="an-cyc-in" min={0} max={100} defaultValue={0} aria-label="Load cycles" />
              </div>
            </div>
            <div className="readouts">
              <div className="ro">
                <span className="lbl">Stress vs. layer line</span>
                <span className="num" id="an-stress">along grain</span>
              </div>
              <div className="ro">
                <span className="lbl">Crack risk</span>
                <span className="num" id="an-risk">low</span>
              </div>
            </div>
            <div className="status" id="an-status">
              Bending load runs along the layers, not across the bonds. Fatigue
              stays low.
            </div>
          </div>

          <p className="body">
            Material choice rides on top of this. PLA <b>creeps and softens with
            heat</b> — a warm motor or a sun-baked launch pad can make a PLA arm
            sag right where you need stiffness. PETG, ASA, nylon (PA12), or
            carbon-filled blends hold up far better under heat and fatigue. Pure
            stiff materials also &quot;ring,&quot; which is partly why carbon fiber
            is loved: stiff <i>and</i> naturally damped. (And one non-physics
            gotcha that still kills builds: motor screws a hair too long punch into
            the windings and short the motor.)
          </p>
          <div className="analogy">
            A wooden plank. Bend it <i>with</i> the grain and it&apos;s tough. Bend
            it <i>across</i> the grain and it splits along the fibers with ease.
            Layer lines are your grain.
          </div>
          <div className="takeaway">
            <span className="k">DON&apos;T</span>
            <span className="v">
              Print an arm in whatever orientation slices fastest, in PLA, and call
              it done. Orient layers along the load path, pick a heat- and
              fatigue-tolerant material, and check screw lengths against the motor.
            </span>
          </div>
        </div>
      </section>

      <div className="wrap">
        <footer>
          Built from first principles · drag, observe, break things. <br />
          <b>Hot = the frame is fighting your flight controller.</b> Stiffness,
          balance, and margin are the cheap fixes; software is not.
        </footer>
      </div>
    </div>
  );
}

const CSS_TEXT = `
.fpl{
  --bg:#100D09; --panel:#1B1813; --panel-2:#100D09; --grid:rgba(217,201,168,0.10);
  --ink:#F1ECE0; --text:#D9C9A8; --dim:#9A9082; --faint:rgba(154,144,130,0.72);
  --cool:#D9C9A8; --warn:#C9762E; --hot:#FF6A00; --cyan:#F1ECE0;
  --line:rgba(217,201,168,0.18);
  --disp:var(--font-display); --body:var(--font-body); --mono:var(--font-mono);
  color:var(--text); font-family:var(--body);
  font-size:17px; line-height:1.72; -webkit-font-smoothing:antialiased;
  background:var(--bg);
  background-image:radial-gradient(1200px 620px at 50% -8%, #1B1813 0%, var(--bg) 58%);
}
.fpl *{box-sizing:border-box}
.fpl .wrap{max-width:960px; margin:0 auto; padding:0 20px}

/* HERO */
.fpl header{padding:84px 0 48px; position:relative}
.fpl .eyebrow{font-family:var(--mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase;
  color:var(--cool); margin-bottom:22px; display:flex; align-items:center; gap:12px}
.fpl .eyebrow::before{content:""; width:34px; height:1px; background:var(--cool); display:inline-block}
.fpl h1{font-family:var(--disp); font-weight:700; color:var(--ink); font-size:clamp(34px,6vw,62px); line-height:1.02;
  margin:0 0 22px; letter-spacing:-.01em}
.fpl h1 .hl{color:var(--hot)}
.fpl .lede{font-size:clamp(17px,2.2vw,20px); color:var(--text); max-width:680px; margin:0}
.fpl .lede b{color:var(--ink); font-weight:600}

/* SECTION */
.fpl section{padding:40px 0; border-top:1px solid var(--line)}
.fpl .tag{font-family:var(--mono); font-size:12px; letter-spacing:.18em; color:var(--faint);
  text-transform:uppercase; margin-bottom:10px}
.fpl .tag .n{color:var(--cool)}
.fpl h2{font-family:var(--disp); font-weight:600; color:var(--ink); font-size:clamp(23px,3.4vw,32px); margin:0 0 8px; letter-spacing:-.01em}
.fpl .cause{font-family:var(--mono); font-size:12.5px; color:var(--hot); margin:0 0 20px; letter-spacing:.02em}
.fpl .cause::before{content:"root cause → "; color:var(--faint)}
.fpl p.body{color:var(--text); margin:16px 0; font-size:16.5px}
.fpl p.body b{color:var(--ink); font-weight:600}
.fpl .analogy{border-left:2px solid var(--cyan); padding:8px 0 8px 16px; margin:18px 0;
  color:var(--ink); font-size:16px}
.fpl .analogy::before{content:"ANALOGY"; display:block; font-family:var(--mono); font-size:10px;
  letter-spacing:.2em; color:var(--cyan); margin-bottom:4px}
.fpl .takeaway{display:flex; gap:12px; align-items:flex-start; margin-top:18px; padding:14px 16px;
  background:var(--panel-2); border:1px solid var(--line); border-radius:0}
.fpl .takeaway .k{font-family:var(--mono); color:var(--hot); font-size:11px; letter-spacing:.16em; flex-shrink:0; padding-top:2px}
.fpl .takeaway .v{font-size:15.5px; color:var(--ink)}

/* LAB PANEL */
.fpl .lab{background:var(--panel); border:1px solid var(--line); border-radius:0;
  margin:24px 0; overflow:hidden}
.fpl .lab-head{display:flex; justify-content:space-between; align-items:center;
  padding:11px 16px; border-bottom:1px solid var(--line); background:var(--panel-2)}
.fpl .lab-head .t{font-family:var(--mono); font-size:11.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--dim)}
.fpl .dots{display:flex; gap:6px}
.fpl .dots i{width:8px; height:8px; border-radius:0; background:var(--line); display:block}
.fpl .dots i.on{background:var(--cool)}
.fpl canvas{display:block; width:100%; background:
    radial-gradient(circle at 50% 40%, #16110B 0%, #0B0805 70%)}
.fpl .controls{padding:16px; display:flex; flex-wrap:wrap; gap:18px 26px; border-top:1px solid var(--line)}
.fpl .ctrl{flex:1 1 200px; min-width:180px}
.fpl .ctrl label{display:flex; justify-content:space-between; font-family:var(--mono); font-size:11px;
  letter-spacing:.08em; color:var(--dim); text-transform:uppercase; margin-bottom:8px}
.fpl .ctrl label .val{color:var(--cool); font-weight:700}
.fpl input[type=range]{ -webkit-appearance:none; appearance:none; width:100%; height:4px;
  background:var(--line); border-radius:0; outline:none}
.fpl input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none;
  width:17px; height:17px; border-radius:0; background:var(--cool); cursor:pointer;
  border:2px solid var(--bg); box-shadow:0 0 0 1px var(--cool)}
.fpl input[type=range]::-moz-range-thumb{ width:17px; height:17px; border-radius:0; background:var(--cool);
  cursor:pointer; border:2px solid var(--bg)}
.fpl .readouts{display:flex; flex-wrap:wrap; gap:10px; padding:0 16px 16px}
.fpl .ro{font-family:var(--mono); font-size:13px; background:var(--panel-2); border:1px solid var(--line);
  border-radius:0; padding:8px 12px; min-width:120px}
.fpl .ro .lbl{color:var(--dim); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; display:block; margin-bottom:3px}
.fpl .ro .num{font-size:16px; font-weight:700}
.fpl .seg{display:inline-flex; gap:0; border:1px solid var(--line); border-radius:0; overflow:hidden}
.fpl .seg button{font-family:var(--mono); font-size:11px; letter-spacing:.06em; background:var(--panel-2);
  color:var(--dim); border:none; padding:8px 14px; cursor:pointer; transition:.15s}
.fpl .seg button + button{border-left:1px solid var(--line)}
.fpl .seg button.on{background:var(--cool); color:var(--bg); font-weight:700}
.fpl .status{font-family:var(--mono); font-size:13px; padding:0 16px 16px; color:var(--dim)}
.fpl .status b{color:var(--cool)}
.fpl .status.bad b{color:var(--hot)}

.fpl footer{padding:48px 0 70px; border-top:1px solid var(--line); color:var(--faint);
  font-family:var(--mono); font-size:12px; letter-spacing:.05em}
.fpl footer b{color:var(--dim)}

@media (max-width:560px){
  .fpl .controls{gap:16px; padding:14px}
  .fpl header{padding:60px 0 36px}
  .fpl .ctrl{flex:1 1 100%; min-width:0}
  .fpl .seg{display:flex; width:100%}
  .fpl .seg button{flex:1; padding:9px 6px; font-size:10px; letter-spacing:.02em}
  .fpl .ro{flex:1 1 calc(50% - 5px); min-width:0}
}
@media (prefers-reduced-motion: reduce){
  .fpl canvas{}
}
`;
