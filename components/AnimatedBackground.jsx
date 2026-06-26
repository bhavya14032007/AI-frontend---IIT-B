"use client";
import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Orb config
    const orbs = [
      { x: 0.15, y: 0.2,  r: 0.45, color: '17,76,90',   speed: 0.0004 },
      { x: 0.85, y: 0.15, r: 0.38, color: '255,153,50',  speed: 0.0003 },
      { x: 0.5,  y: 0.8,  r: 0.5,  color: '17,76,90',   speed: 0.00035 },
      { x: 0.75, y: 0.65, r: 0.3,  color: '255,200,1',   speed: 0.0005 },
      { x: 0.2,  y: 0.75, r: 0.32, color: '209,232,226', speed: 0.00025 },
    ];

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep background
      ctx.fillStyle = '#0d1e27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb, i) => {
        const ox = (orb.x + Math.sin(t * orb.speed + i * 1.3) * 0.12) * canvas.width;
        const oy = (orb.y + Math.cos(t * orb.speed * 1.4 + i * 0.9) * 0.1) * canvas.height;
        const radius = orb.r * Math.min(canvas.width, canvas.height) * 0.5;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        grad.addColorStop(0,   `rgba(${orb.color}, 0.22)`);
        grad.addColorStop(0.5, `rgba(${orb.color}, 0.08)`);
        grad.addColorStop(1,   `rgba(${orb.color}, 0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Subtle noise overlay grid effect
      ctx.strokeStyle = 'rgba(209,232,226,0.025)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
}
