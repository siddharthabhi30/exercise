// stickman.js — Athletic Pictogram Silhouette Renderer
// Renders human exercise poses as clean, high-contrast Olympic/airport-style pictogram silhouettes:
// - Graduated limb thicknesses (powerful thighs, tapered shins, shaped arms)
// - Solid athletic tapered torso with distinct shoulder & hip anatomy
// - Visual depth via near/far limb contrast
// - Dynamic kettlebell positioning for swings, racks, and overhead presses
// - CSS variables for instant light/dark mode adaptation

const L = { torso: 48, ua: 26, fa: 24, th: 36, sh: 30, head: 12.5 };
const GROUND = 185, CX = 100;
const rad = d => d * Math.PI / 180;
const add = (p, a, len) => [p[0] + Math.sin(rad(a)) * len, p[1] + Math.cos(rad(a)) * len];

function normalize(p) {
  const q = { torso: 0, armF: [0, 0], legF: [0, 0], lift: 0, kb: null, ...p };
  q.armB = p.armB || q.armF;
  q.legB = p.legB || q.legF;
  return q;
}

function solve(p, view) {
  const front = view === 'front', m = front ? -1 : 1;
  const hip = [0, 0];
  const neck = add(hip, 180 - p.torso, L.torso);
  const head = add(neck, 180 - p.torso, L.head + 4.5);
  const sw = front ? 14 : 0, hw = front ? 8 : 0;
  const shF = add(neck, 90 - p.torso, sw), shB = add(neck, 90 - p.torso, -sw);
  const hpF = add(hip, 90, hw), hpB = add(hip, 90, -hw);

  const limb = (o, [a1, a2], len1, len2, s) => {
    const j = add(o, a1 * s, len1);
    return [o, j, add(j, a2 * s, len2)];
  };

  const J = {
    hip, neck, head,
    shF, shB, hpF, hpB,
    armF: limb(shF, p.armF, L.ua, L.fa, 1),
    armB: limb(shB, p.armB, L.ua, L.fa, m),
    legF: limb(hpF, p.legF, L.th, L.sh, 1),
    legB: limb(hpB, p.legB, L.th, L.sh, m),
  };

  if (p.kb) {
    const isBoth = p.kb === 'both';
    const hF = J.armF[2], hB = J.armB[2];
    const elbowF = J.armF[1], elbowB = J.armB[1];

    let h, elb;
    if (isBoth) {
      h = [(hF[0] + hB[0]) / 2, (hF[1] + hB[1]) / 2];
      elb = [(elbowF[0] + elbowB[0]) / 2, (elbowF[1] + elbowB[1]) / 2];
    } else if (p.kb === 'B') {
      h = hB; elb = elbowB;
    } else {
      h = hF; elb = elbowF;
    }

    // Forearm vertical angle
    const fdy = h[1] - elb[1];

    if (fdy < -8) {
      // Forearm points UP (press, front rack, curl lockout)
      const sideOffset = front ? (p.kb === 'B' ? -9 : 9) : 7;
      J.kb = [h[0] + sideOffset, h[1] - 4];
      J.kbHandle = [h[0], h[1]];
    } else {
      // Forearm points DOWN or FORWARD (swings, carries, deadlifts)
      J.kb = [h[0], h[1] + 13];
      J.kbHandle = [h[0], h[1] + 6];
    }
  }

  return J;
}

function points(J) {
  return [
    J.neck,
    [J.head[0], J.head[1] + L.head],
    ...J.armF, ...J.armB,
    ...J.legF, ...J.legB,
    J.shF, J.shB, J.hpF, J.hpB,
    ...(J.kb ? [[J.kb[0], J.kb[1] + 9]] : [])
  ];
}

function lerpPose(a, b, k) {
  const out = {};
  for (const key in a) {
    const x = a[key], y = b[key];
    if (typeof x === 'number') out[key] = x + (y - x) * k;
    else if (Array.isArray(x)) out[key] = x.map((v, i) => v + (y[i] - v) * k);
    else out[key] = k < 0.5 ? x : y;
  }
  return out;
}
const ease = k => (1 - Math.cos(Math.PI * k)) / 2;

const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  parent && parent.appendChild(e); return e;
}

// Mounts an animated pictogram figure into container; returns stop()
function playExercise(container, ex) {
  container.innerHTML = '';
  const svg = el('svg', { viewBox: '0 0 200 200', width: '100%', height: '100%' }, container);

  // Subtle clean floor line
  el('line', {
    x1: 15, y1: GROUND, x2: 185, y2: GROUND,
    stroke: 'var(--ground-line, #cbd5e0)',
    'stroke-width': 2.5,
    'stroke-linecap': 'round'
  }, svg);

  const isFront = ex.view === 'front';
  const fadedOpacity = isFront ? '0.9' : '0.4';

  // Pictogram limb style: round caps with graduated thicknesses
  const mkSeg = (w, colorVar, op) => el('line', {
    stroke: colorVar,
    'stroke-width': w,
    'stroke-linecap': 'round',
    opacity: op || '1'
  }, svg);

  // Layers from back to front:
  // 1. Far limbs (B)
  const legB_thigh = mkSeg(13.5, 'var(--figure-faded, #718096)', fadedOpacity);
  const legB_shin  = mkSeg(10.5, 'var(--figure-faded, #718096)', fadedOpacity);
  const armB_upper = mkSeg(9.5,  'var(--figure-faded, #718096)', fadedOpacity);
  const armB_fore  = mkSeg(7.5,  'var(--figure-faded, #718096)', fadedOpacity);

  // 2. Torso (Solid capsule for side view, tapered polygon + bar for front view)
  let torsoFill = null, shoulderBar = null, hipBar = null;
  if (isFront) {
    torsoFill = el('polygon', { fill: 'var(--figure-body, #2d3748)' }, svg);
    shoulderBar = mkSeg(11, 'var(--figure-stroke, #2d3748)');
    hipBar = mkSeg(10, 'var(--figure-stroke, #2d3748)');
  }
  const torsoCore = mkSeg(isFront ? 14 : 17, 'var(--figure-stroke, #2d3748)');

  // 3. Near limbs (F) — with active color accent when holding single KB
  const isKBF = ex.kb && ex.kb !== 'B';
  const armF_color = isKBF ? 'var(--figure-active, #c0392b)' : 'var(--figure-stroke, #2d3748)';
  const legF_thigh = mkSeg(13.5, 'var(--figure-stroke, #2d3748)');
  const legF_shin  = mkSeg(10.5, 'var(--figure-stroke, #2d3748)');
  const armF_upper = mkSeg(10,   armF_color);
  const armF_fore  = mkSeg(8,    armF_color);

  // 4. Head
  const head = el('circle', { r: L.head, fill: 'var(--figure-stroke, #2d3748)' }, svg);

  // 5. Kettlebell (solid bell with handle)
  const kbHandle = el('circle', { r: 5, fill: 'none', stroke: 'var(--accent-kb, #c0392b)', 'stroke-width': 2.8 }, svg);
  const kbBell = el('circle', { r: 9.5, fill: 'var(--accent-kb, #c0392b)' }, svg);

  const frames = ex.frames.map(f => ({ ms: f.ms || 600, pose: normalize(f.pose) }));
  const p0 = points(solve(frames[0].pose, ex.view));
  const xs = p0.map(p => p[0]);
  const dx = CX - (Math.min(...xs) + Math.max(...xs)) / 2;
  const total = frames.reduce((s, f) => s + f.ms, 0);
  const t0 = performance.now();
  let raf;

  const setLine = (lineEl, p1, p2) => {
    lineEl.setAttribute('x1', p1[0]); lineEl.setAttribute('y1', p1[1]);
    lineEl.setAttribute('x2', p2[0]); lineEl.setAttribute('y2', p2[1]);
  };

  function draw(now) {
    let t = (now - t0) % total, i = 0;
    while (t > frames[i].ms) { t -= frames[i].ms; i++; }
    const a = frames[i], b = frames[(i + 1) % frames.length];
    const pose = lerpPose(a.pose, b.pose, ease(t / a.ms));
    const J = solve(pose, ex.view);
    const dy = GROUND - Math.max(...points(J).map(p => p[1])) - pose.lift;
    const T = ([x, y]) => [x + dx, y + dy];

    // Far Leg (thigh & shin)
    setLine(legB_thigh, T(J.legB[0]), T(J.legB[1]));
    setLine(legB_shin,  T(J.legB[1]), T(J.legB[2]));

    // Far Arm (upper & forearm)
    setLine(armB_upper, T(J.armB[0]), T(J.armB[1]));
    setLine(armB_fore,  T(J.armB[1]), T(J.armB[2]));

    // Torso & Head
    const hx_hy = T(J.hip), nx_ny = T(J.neck), head_pos = T(J.head);
    setLine(torsoCore, nx_ny, hx_hy);
    head.setAttribute('cx', head_pos[0]);
    head.setAttribute('cy', head_pos[1]);

    if (isFront) {
      const sf = T(J.shF), sb = T(J.shB);
      const hf = T(J.hpF), hb = T(J.hpB);
      setLine(shoulderBar, sb, sf);
      setLine(hipBar, hb, hf);
      torsoFill.setAttribute('points', `${sb[0]},${sb[1]} ${sf[0]},${sf[1]} ${hf[0]},${hf[1]} ${hb[0]},${hb[1]}`);
    }

    // Near Leg (thigh & shin)
    setLine(legF_thigh, T(J.legF[0]), T(J.legF[1]));
    setLine(legF_shin,  T(J.legF[1]), T(J.legF[2]));

    // Near Arm (upper & forearm)
    setLine(armF_upper, T(J.armF[0]), T(J.armF[1]));
    setLine(armF_fore,  T(J.armF[1]), T(J.armF[2]));

    // Kettlebell
    const showKB = !!J.kb;
    kbHandle.style.display = kbBell.style.display = showKB ? '' : 'none';
    if (showKB) {
      const kb = T(J.kb), kbh = T(J.kbHandle);
      kbHandle.setAttribute('cx', kbh[0]);
      kbHandle.setAttribute('cy', kbh[1]);
      kbBell.setAttribute('cx', kb[0]);
      kbBell.setAttribute('cy', kb[1]);
    }

    raf = requestAnimationFrame(draw);
  }

  raf = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(raf);
}
