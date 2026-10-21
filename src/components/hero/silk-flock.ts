// @ts-nocheck
// Anvax hero animation: "Silk to flock" (option 7a). No dependencies.
// Usage: const stop = mountSilkFlock(canvasEl); ... stop();
export function mountSilkFlock(canvas, opts = {}) {
  const BLUE = opts.blue || [47, 111, 237];
  const INK = opts.ink || [31, 37, 46];
  // Starts as the scattered flock, settles into the organised silk sheet once and stays there.
  const SETTLE_START = 0.6, SETTLE_END = 3.8;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const smooth = (a, b, v) => { const u = Math.max(0, Math.min(1, (v - a) / (b - a))); return u * u * (3 - 2 * u); };
  const proj = (X, Y, Z, cx, cy, a, b) => {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    const x1 = X * ca + Z * sa, z1 = -X * sa + Z * ca, y2 = Y * cb - z1 * sb, z2 = Y * sb + z1 * cb, s = 1 + z2 / 700;
    return [cx + x1 * s, cy + y2 * s, z2];
  };

  const ctx = canvas.getContext('2d');
  const D = 560; // design size; the scene scales to fit the canvas
  let W = D, H = D, scale = 1;
  const resize = () => {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(1, r.width); H = Math.max(1, r.height); scale = Math.min(W, H) / D;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const edgeF = (px, py, m) => Math.max(0, Math.min(1, Math.min(px, W - px, py, H - py) / m));

  const NU = 60, NV = 38, P = [];
  for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++)
    P.push({ u: i / (NU - 1) * 2 - 1, v: j / (NV - 1) * 2 - 1, fu: rnd() * Math.PI * 2, fv: rnd() * Math.PI * 2, r: 0.7 + rnd() * 0.9, j: rnd() * 6, x: 0, y: 0, z: 0, init: false });

  let last = 0;
  const frame = (t) => {
    const dt = Math.min(0.05, t - last); last = t;
    const a = t * 0.07, cx = W / 2, cy = H / 2, tw = 0.95 * Math.sin(t * 0.27), s1 = Math.sin(t * 0.21), s2 = Math.cos(t * 0.17);
    const gm = 1 - smooth(SETTLE_START, SETTLE_END, t);
    ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over';
    for (const p of P) {
      const { u, v } = p;
      const X = u * 215, Y = 55 * Math.sin(u * 2.2 + t * 0.7) * Math.cos(v * 1.5 - t * 0.5) + 34 * Math.sin((u + v) * 1.8 + t * 0.9), Z = v * 150;
      const th = tw * u + 0.35 * Math.sin(t * 0.4 + v), cs = Math.cos(th), sn = Math.sin(th), FY = Y * cs - Z * sn, FZ = Y * sn + Z * cs;
      const fu = p.fu + t * 0.25, fv = p.fv;
      const MX = 175 * Math.sin(fu) * (0.75 + 0.25 * Math.cos(fv + t * 0.3)) + 30 * s1 * Math.sin(fv * 2);
      const MY = 70 * Math.sin(2 * fu + t * 0.45) + 48 * Math.sin(fv + t * 0.35) * (0.6 + 0.4 * s2);
      const MZ = 120 * Math.cos(fu + 0.6 * s1) * Math.sin(fv * 0.5 + t * 0.2);
      const m = smooth(0, 1, gm * 1.25 - (u + 1) * 0.125);
      const tx = X + (MX - X) * m, ty = FY + (MY - FY) * m, tz = FZ + (MZ - FZ) * m;
      if (!p.init) { p.x = tx; p.y = ty; p.z = tz; p.init = true; }
      const k = Math.min(1, dt * p.r * (2.2 + 3 * (1 - m))), jx = Math.sin(t * 1.7 + p.j) * 4 * m, jy = Math.cos(t * 1.3 + p.j) * 4 * m;
      p.x += (tx + jx - p.x) * k; p.y += (ty + jy - p.y) * k; p.z += (tz - p.z) * k;
      const q = proj(p.x * scale, p.y * scale, p.z * scale, cx, cy, a, 0.38 - 0.18 * m);
      const f = Math.max(0, Math.min(1, (q[2] / scale + 170) / 340)), e = edgeF(q[0], q[1], 50 * scale), r = (0.8 + 1.2 * f) * Math.max(0.8, scale);
      const hl = Math.sin(u * 4 - t * 1.2 + v * 1.3) * (1 - m) + Math.sin(p.fu * 3 - t * 1.4 + p.fv * 0.3) * m;
      ctx.fillStyle = hl > 0.84 ? rgba(BLUE, (0.4 + 0.6 * (hl - 0.84) / 0.16) * e) : rgba(INK, (0.1 + 0.42 * f) * e);
      ctx.fillRect(q[0] - r / 2, q[1] - r / 2, r, r);
    }
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { for (let t = SETTLE_END; t <= SETTLE_END + 4; t += 1 / 30) frame(t); return () => ro.disconnect(); }

  let raf = 0, visible = true, elapsed = 0, prev = performance.now();
  const loop = (now) => { elapsed += Math.min(0.05, (now - prev) / 1000); prev = now; if (visible && !document.hidden) frame(elapsed); raf = requestAnimationFrame(loop); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; prev = performance.now(); });
  io.observe(canvas);
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
}
