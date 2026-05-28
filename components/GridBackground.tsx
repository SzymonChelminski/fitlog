'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';

const DENSITY      = 0.000130;
const MIN_P        = 90;
const MAX_P        = 260;
const BASE_SPEED   = 0.24;
const CONNECT_DIST = 145;
const REPEL_RADIUS = 145;
const REPEL_FORCE  = 3.5;
const RETURN_LERP  = 0.020;

const SPOTLIGHT_SPRING = { stiffness: 360, damping: 38, mass: 0.25 } as const;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  nvx: number; nvy: number;
  r: number;
}

function createParticles(w: number, h: number): Particle[] {
  const count = Math.min(MAX_P, Math.max(MIN_P, Math.floor(w * h * DENSITY)));
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = BASE_SPEED * (0.55 + Math.random() * 0.9);
    const nvx   = Math.cos(angle) * speed;
    const nvy   = Math.sin(angle) * speed;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: nvx, vy: nvy,
      nvx, nvy,
      r: 1.2 + Math.random() * 1.4,
    };
  });
}

export function GridBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef    = useRef({ x: -9999, y: -9999 });
  const rafRef       = useRef<number>(0);

  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);
  const sx   = useSpring(rawX, SPOTLIGHT_SPRING);
  const sy   = useSpring(rawY, SPOTLIGHT_SPRING);

  const spotlight = useMotionTemplate`radial-gradient(
    520px circle at ${sx}px ${sy}px,
    rgba(79,70,229,0.12) 0%,
    rgba(56,189,248,0.04) 45%,
    transparent 70%
  )`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onLeave = () => {
      cursorRef.current = { x: -9999, y: -9999 };
      rawX.set(-9999);
      rawY.set(-9999);
    };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    const isDark = () => document.documentElement.classList.contains('dark');

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const ps = particlesRef.current;
      const { x: cx, y: cy } = cursorRef.current;
      const dark = isDark();

      ctx.clearRect(0, 0, w, h);

      for (const p of ps) {
        const dx   = p.x - cx;
        const dy   = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const strength = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_FORCE;
          p.vx += (dx / dist) * strength * 0.11;
          p.vy += (dy / dist) * strength * 0.11;
        }
        p.vx += (p.nvx - p.vx) * RETURN_LERP;
        p.vy += (p.nvy - p.vy) * RETURN_LERP;
        p.x  += p.vx;
        p.y  += p.vy;

        const m = 12;
        if (p.x < -m)    p.x += w + m * 2;
        if (p.x > w + m) p.x -= w + m * 2;
        if (p.y < -m)    p.y += h + m * 2;
        if (p.y > h + m) p.y -= h + m * 2;
      }

      const lineBase = dark ? 0.22 : 0.13;
      ctx.lineWidth = 1;

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx   = ps[i].x - ps[j].x;
          const dy   = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const t     = 1 - dist / CONNECT_DIST;
            const alpha = lineBase * t * t;
            ctx.strokeStyle = dark
              ? `rgba(255,255,255,${alpha.toFixed(3)})`
              : `rgba(15,23,42,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }

      const dotAlpha = dark ? 0.55 : 0.38;
      ctx.fillStyle = dark
        ? `rgba(255,255,255,${dotAlpha})`
        : `rgba(15,23,42,${dotAlpha})`;

      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [rawX, rawY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 88% at 50% 42%, black 25%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 90% 88% at 50% 42%, black 25%, transparent 100%)',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ background: spotlight }}
      />
    </div>
  );
}
