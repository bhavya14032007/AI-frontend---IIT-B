"use client";
import { useEffect, useRef, useCallback } from 'react';

// ─── Falling ball config for end-of-page celebration ───────────────────────
function makeFallingBall(canvasWidth) {
  const colors = [
    '#FFC801', '#FF9932', '#114C5A', '#D9E8E2',
    '#F1F6F4', '#FF6B6B', '#4ECDC4', '#45B7D1',
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
  ];
  return {
    x: Math.random() * canvasWidth,
    y: -20 - Math.random() * 200,
    r: 6 + Math.random() * 18,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 4,
    vy: 3 + Math.random() * 6,
    gravity: 0.15 + Math.random() * 0.1,
    opacity: 1,
    spin: (Math.random() - 0.5) * 0.2,
    angle: Math.random() * Math.PI * 2,
    alive: true,
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  // Refs for shared mutable state (avoids stale closures)
  const mouseRef      = useRef({ x: -999, y: -999 });
  const scrollRef     = useRef(0);
  const celebRef      = useRef(false);   // celebration triggered?
  const fallingRef    = useRef([]);      // falling balls array
  const celebDoneRef  = useRef(false);   // celebration finished cleanup?
  const trailRef      = useRef([]);      // cursor trail history

  // Mouse move handler
  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    // Push trail point
    trailRef.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    if (trailRef.current.length > 18) trailRef.current.shift();
  }, []);

  // Scroll handler
  const onScroll = useCallback(() => {
    scrollRef.current = window.scrollY;
    const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    // Trigger celebration when user is within 2% of the bottom
    if (scrollPct >= 0.98 && !celebRef.current) {
      celebRef.current = true;
      celebDoneRef.current = false;
      // Spawn 60 falling balls
      const canvas = canvasRef.current;
      const w = canvas ? canvas.width : window.innerWidth;
      fallingRef.current = Array.from({ length: 60 }, () => makeFallingBall(w));
    }
    // Reset celebration when user scrolls back up
    if (scrollPct < 0.90) {
      celebRef.current = false;
      fallingRef.current = [];
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener('resize',    resize,      { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll',    onScroll,    { passive: true });

    // ── Background orb definitions ──────────────────────────────────────────
    const orbs = [
      { bx: 0.15, by: 0.20, r: 0.45, color: '17,76,90',   sp: 0.0004, phase: 0 },
      { bx: 0.85, by: 0.15, r: 0.38, color: '255,153,50',  sp: 0.0003, phase: 2 },
      { bx: 0.50, by: 0.80, r: 0.50, color: '17,76,90',   sp: 0.00035,phase: 4 },
      { bx: 0.75, by: 0.65, r: 0.30, color: '255,200,1',   sp: 0.0005, phase: 1 },
      { bx: 0.20, by: 0.75, r: 0.32, color: '209,232,226', sp: 0.00025,phase: 3 },
    ];

    // Cursor ball colour cycle (hue-rotates over time)
    let cursorHue = 0;

    const draw = () => {
      t += 1;
      cursorHue = (cursorHue + 1.5) % 360;
      const W = canvas.width;
      const H = canvas.height;
      const scroll = scrollRef.current;
      const scrollPct = scroll / Math.max(1, document.body.scrollHeight - window.innerHeight);

      ctx.clearRect(0, 0, W, H);

      // ── Deep background ────────────────────────────────────────────────────
      ctx.fillStyle = '#0d1e27';
      ctx.fillRect(0, 0, W, H);

      // ── Background orbs (scroll-driven parallax) ───────────────────────────
      orbs.forEach((orb, i) => {
        // Base drift animation
        const driftX = Math.sin(t * orb.sp + orb.phase) * 0.10;
        const driftY = Math.cos(t * orb.sp * 1.3 + orb.phase) * 0.08;

        // Scroll shifts orbs vertically — each orb has different parallax depth
        const parallaxY = scrollPct * (0.15 + i * 0.06);

        const ox = (orb.bx + driftX) * W;
        const oy = (orb.by + driftY - parallaxY) * H;
        const radius = orb.r * Math.min(W, H) * 0.55;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        grad.addColorStop(0,   `rgba(${orb.color}, 0.25)`);
        grad.addColorStop(0.5, `rgba(${orb.color}, 0.09)`);
        grad.addColorStop(1,   `rgba(${orb.color}, 0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ── Subtle grid lines ──────────────────────────────────────────────────
      ctx.strokeStyle = 'rgba(209,232,226,0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── Celebration falling balls ──────────────────────────────────────────
      if (celebRef.current && fallingRef.current.length > 0) {
        fallingRef.current.forEach(ball => {
          if (!ball.alive) return;

          // Physics
          ball.vy  += ball.gravity;
          ball.x   += ball.vx;
          ball.y   += ball.vy;
          ball.angle += ball.spin;

          // Kill once off screen
          if (ball.y > H + ball.r * 2) ball.alive = false;

          ctx.save();
          ctx.globalAlpha = ball.opacity;
          ctx.translate(ball.x, ball.y);
          ctx.rotate(ball.angle);

          // Glowing ball
          const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, ball.r);
          glow.addColorStop(0,   ball.color + 'ff');
          glow.addColorStop(0.6, ball.color + 'aa');
          glow.addColorStop(1,   ball.color + '00');

          ctx.shadowColor = ball.color;
          ctx.shadowBlur  = 16;

          ctx.beginPath();
          ctx.arc(0, 0, ball.r, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.restore();
        });

        // Replenish if user is still at bottom
        const scrollPctNow = scrollRef.current / Math.max(1, document.body.scrollHeight - window.innerHeight);
        if (scrollPctNow >= 0.98 && fallingRef.current.filter(b => b.alive).length < 20) {
          for (let i = 0; i < 5; i++) {
            fallingRef.current.push(makeFallingBall(W));
          }
        }
      }

      // ── Cursor trail ───────────────────────────────────────────────────────
      const now = Date.now();
      const trail = trailRef.current.filter(p => now - p.t < 400);
      trailRef.current = trail;

      trail.forEach((pt, i) => {
        const age   = (now - pt.t) / 400;          // 0 = fresh, 1 = old
        const alpha = (1 - age) * 0.5;
        const size  = (1 - age) * 8;
        const hue   = (cursorHue + i * 18) % 360;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 90%, 65%, ${alpha})`;
        ctx.fill();
      });

      // ── Mouse-tracking multicolour ball ───────────────────────────────────
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx > 0) {
        // Outer glow ring
        const outerGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 48);
        outerGrad.addColorStop(0,   `hsla(${cursorHue}, 90%, 70%, 0.15)`);
        outerGrad.addColorStop(1,   `hsla(${cursorHue}, 90%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 48, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Core multicolour ball
        const ballGrad = ctx.createRadialGradient(mx - 5, my - 5, 1, mx, my, 18);
        ballGrad.addColorStop(0,   `hsla(${(cursorHue + 60) % 360}, 100%, 85%, 0.95)`);
        ballGrad.addColorStop(0.5, `hsla(${cursorHue}, 100%, 65%, 0.85)`);
        ballGrad.addColorStop(1,   `hsla(${(cursorHue + 180) % 360}, 100%, 55%, 0.6)`);

        ctx.shadowColor = `hsl(${cursorHue}, 100%, 70%)`;
        ctx.shadowBlur  = 24;

        ctx.beginPath();
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.fillStyle = ballGrad;
        ctx.fill();

        ctx.shadowBlur = 0;

        // Inner highlight
        ctx.beginPath();
        ctx.arc(mx - 5, my - 5, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll',    onScroll);
    };
  }, [onMouseMove, onScroll]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        cursor: 'none',
      }}
    />
  );
}
