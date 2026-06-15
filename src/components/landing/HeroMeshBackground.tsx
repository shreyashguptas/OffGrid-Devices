"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated mesh-network background for the company hero.
 *
 * A field of drifting nodes links up with hairlines wherever they're close; the
 * cursor becomes a node that energizes the mesh around it, and Ember "packets"
 * relay hop-by-hop the way Meshtastic routing spreads. On mount the network
 * "powers on" — growing outward from a home node over ~2s so the hero is full
 * and alive within a couple seconds rather than trickling in.
 *
 * Design notes:
 *  - Colors are read at runtime from the brand CSS tokens (`--color-ember`,
 *    `--color-sand`, …) so the canvas tracks the active theme, including the
 *    light-mode token swap. Falls back to the dark-mode hexes if reading fails.
 *  - Respects `prefers-reduced-motion` (renders one static frame, no loop).
 *  - Pauses when scrolled out of view (IntersectionObserver) or the tab is
 *    hidden (visibilitychange) — it's the highest-traffic page, so it idles
 *    cheaply. Pointer-events are off; the parent section drives the cursor.
 *
 * Client Component (canvas + rAF). Rendered behind the home hero copy by
 * FlightPlanHome, which layers a legibility scrim on top.
 */

type RGB = [number, number, number];
type MeshNode = { x: number; y: number; vx: number; vy: number; energy: number };
type Packet = { a: number; b: number; t: number; hops: number; prev: number };

const FALLBACK = {
  ember: [255, 106, 0] as RGB,
  sand: [217, 201, 168] as RGB,
  dim: [154, 144, 130] as RGB,
  bone: [241, 236, 224] as RGB,
};

function mix(a: RGB, b: RGB, k: number): RGB {
  const t = k < 0 ? 0 : k > 1 ? 1 : k;
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function rgba(c: RGB, a: number): string {
  return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
}
function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
// deterministic per-index hash in [0,1] — stable node placement + packet picks
function hash(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

export function HeroMeshBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    if (!canvasMaybe) return;
    const ctxMaybe = canvasMaybe.getContext("2d");
    if (!ctxMaybe) return;
    // Non-null-typed aliases so the narrowing survives inside the closures below.
    const canvas: HTMLCanvasElement = canvasMaybe;
    const ctx: CanvasRenderingContext2D = ctxMaybe;
    const host: HTMLElement = canvas.parentElement ?? canvas;

    let W = 0;
    let H = 0;
    let raf = 0;
    let inView = true;

    const mouse = { x: 0, y: 0, active: false };
    const palette = { ...FALLBACK };

    // ---- read brand colors from CSS custom properties (theme-aware) --------
    function readColor(varName: string, fallback: RGB): RGB {
      try {
        const probe = document.createElement("span");
        probe.style.color = `var(${varName})`;
        probe.style.display = "none";
        host.appendChild(probe);
        const c = getComputedStyle(probe).color;
        host.removeChild(probe);
        const m = c.match(/[\d.]+/g);
        if (m && m.length >= 3) return [Number(m[0]), Number(m[1]), Number(m[2])];
      } catch {
        /* fall through to fallback */
      }
      return fallback;
    }
    function readPalette() {
      palette.ember = readColor("--color-ember", FALLBACK.ember);
      palette.sand = readColor("--color-sand", FALLBACK.sand);
      palette.dim = readColor("--color-dim", FALLBACK.dim);
      palette.bone = readColor("--color-bone", FALLBACK.bone);
    }

    // ---- mesh state --------------------------------------------------------
    let nodes: MeshNode[] = [];
    let LINK = 150;
    const INF = 320;
    let home = 0;
    let packets: Packet[] = [];
    let spawnTimer = 0;

    function build() {
      const n = clamp(Math.round((W * H) / 6500), 70, 300);
      nodes = [];
      for (let k = 0; k < n; k++) {
        nodes.push({
          x: hash(k + 3, 7) * W,
          y: hash(11, k + 5) * H,
          vx: (hash(k + 1, k + 2) - 0.5) * 0.3,
          vy: (hash(k + 9, k + 4) - 0.5) * 0.3,
          energy: 0,
        });
      }
      LINK = clamp(Math.min(W, H) * 0.13, 104, 156);
      home = 0;
      if (nodes[home]) {
        nodes[home].x = W * 0.2;
        nodes[home].y = H * 0.62;
      }
      packets = [];
      spawnTimer = 0;
      // seed a few packets so there's relay activity from the very first frame
      for (let s = 0; s < 4; s++) spawnFrom(home);
    }

    function neighbours(idx: number, exclude: number): number[] {
      const a = nodes[idx];
      const out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === idx || j === exclude) continue;
        const nj = nodes[j];
        if (Math.hypot(nj.x - a.x, nj.y - a.y) < LINK * 1.05) out.push(j);
      }
      return out;
    }
    function spawnFrom(idx: number) {
      if (packets.length > 30 || !nodes[idx]) return;
      const nb = neighbours(idx, -1);
      if (!nb.length) return;
      const to = nb[(hash(idx, packets.length + 1) * nb.length) | 0];
      packets.push({ a: idx, b: to, t: 0, hops: 0, prev: idx });
    }
    function stepNext(idx: number, prev: number): number {
      const nb = neighbours(idx, prev);
      if (!nb.length) return -1;
      const a = nodes[idx];
      const pa = nodes[prev] ?? a;
      const dirx = a.x - pa.x;
      const diry = a.y - pa.y;
      let best = -1;
      let bestScore = -1e9;
      for (let m = 0; m < nb.length; m++) {
        const nd = nodes[nb[m]];
        const vx = nd.x - a.x;
        const vy = nd.y - a.y;
        const len = Math.hypot(vx, vy) || 1;
        const score = (vx * dirx + vy * diry) / len + hash(idx, nb[m]) * 0.9;
        if (score > bestScore) {
          bestScore = score;
          best = nb[m];
        }
      }
      return best;
    }

    function frame(time: number) {
      const t = time / 1000;
      ctx.clearRect(0, 0, W, H);
      if (!nodes.length) build();

      // drift + wrap
      if (!reducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          if (i === home) continue;
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = W + 10;
          if (n.x > W + 10) n.x = -10;
          if (n.y < -10) n.y = H + 10;
          if (n.y > H + 10) n.y = -10;
        }
      }

      // energy comes only from the cursor now; packets supply the ambient life
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < INF) {
            const e = 1 - d / INF;
            if (e > n.energy) n.energy = e;
          }
        }
        n.energy *= 0.95;
      }

      // links — the full dull mesh is always drawn; energy brightens to Ember
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dd = Math.hypot(nj.x - ni.x, nj.y - ni.y);
          if (dd >= LINK) continue;
          const en = Math.max(ni.energy, nj.energy);
          const a = (1 - dd / LINK) * (0.42 + en * 0.5);
          if (a < 0.012) continue;
          ctx.strokeStyle = rgba(mix(palette.dim, palette.ember, en), a);
          ctx.beginPath();
          ctx.moveTo(ni.x, ni.y);
          ctx.lineTo(nj.x, nj.y);
          ctx.stroke();
        }
      }

      // cursor joins the mesh — bright links to nearby nodes
      if (mouse.active) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (dm < INF * 0.7) {
            ctx.strokeStyle = rgba(palette.ember, (1 - dm / (INF * 0.7)) * 0.7);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // packets — hop-by-hop relay. Ambient traces spawn from random nodes all
      // over the screen; moving the cursor traces from the node nearest it.
      if (!reducedMotion) {
        spawnTimer += 1;
        if (spawnTimer % 16 === 0) {
          spawnFrom(Math.floor(hash(spawnTimer, 7) * nodes.length));
        }
        if (mouse.active && spawnTimer % 7 === 0) {
          let nearest = -1;
          let nd = Infinity;
          for (let i = 0; i < nodes.length; i++) {
            const dx = nodes[i].x - mouse.x;
            const dy = nodes[i].y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < nd) {
              nd = d2;
              nearest = i;
            }
          }
          if (nearest >= 0) spawnFrom(nearest);
        }
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.t += 0.045;
          if (p.t >= 1) {
            const nx = stepNext(p.b, p.a);
            p.hops++;
            if (nx < 0 || p.hops > 6) {
              packets.splice(i, 1);
              continue;
            }
            if (hash(p.b, p.hops) > 0.78 && packets.length < 30) spawnFrom(p.b);
            p.prev = p.a;
            p.a = p.b;
            p.b = nx;
            p.t = 0;
          }
        }
      }
      for (let i = 0; i < packets.length; i++) {
        const pk = packets[i];
        const na = nodes[pk.a];
        const nb = nodes[pk.b];
        if (!na || !nb) continue;
        const et = pk.t * pk.t * (3 - 2 * pk.t); // smoothstep
        const x = na.x + (nb.x - na.x) * et;
        const y = na.y + (nb.y - na.y) * et;
        ctx.strokeStyle = rgba(palette.ember, 0.45 * (1 - pk.t) + 0.12);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
        const pulse = 0.85 + 0.15 * Math.sin(t * 7 + i);
        ctx.fillStyle = rgba(palette.ember, 0.95);
        ctx.beginPath();
        ctx.arc(x, y, 2.6 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(palette.bone, 0.6);
        ctx.beginPath();
        ctx.arc(x, y, 1.2 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes — every node is identical at rest (same 2.2px radius, same Sand
      // brightness). Only the cursor's energy changes a node: it brightens hard
      // toward a hot Ember dot with a Bone core. No node is special-cased.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const en = n.energy;
        if (en > 0.15) {
          ctx.shadowColor = rgba(palette.ember, 0.9);
          ctx.shadowBlur = 10 + en * 18;
        }
        ctx.fillStyle = rgba(mix(palette.sand, palette.ember, en), 0.6 + en * 0.4);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        if (en > 0.5) {
          ctx.fillStyle = rgba(palette.bone, (en - 0.5) * 1.6);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    }

    // ---- loop / lifecycle --------------------------------------------------
    function loop(time: number) {
      frame(time);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (reducedMotion) {
        frame(0);
        return;
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, canvas.clientWidth);
      H = Math.max(1, canvas.clientHeight);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reducedMotion) frame(0);
    }

    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouse.x = x;
      mouse.y = y;
      mouse.active = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    }
    function onLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else if (inView && !reducedMotion) start();
    }

    readPalette();
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (inView && !reducedMotion && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    const onScheme = () => readPalette();
    scheme.addEventListener?.("change", onScheme);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      scheme.removeEventListener?.("change", onScheme);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
