"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  shape: "circle" | "star" | "heart";
  color: string;
  rotate: number;
  rotateSpeed: number;
};

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["--accent", "--mauve", "--lavender", "--accent-soft"];
    const shapes: Particle["shape"][] = ["circle", "star", "heart"];

    const getColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(colors[Math.floor(Math.random() * colors.length)])
        .trim() || "#a96f6b";

    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: getColor(),
      rotate: Math.random() * Math.PI * 2,
      rotateSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Klik → partikel di sekitar menyebar
    const onClick = (e: MouseEvent) => {
      particles.forEach((p) => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 3;
          p.vy += (dy / dist) * force * 3;
        }
      });
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    const drawStar = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const radius = i % 2 === 0 ? r : r * 0.4;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawHeart = (x: number, y: number, r: number) => {
      ctx.beginPath();
      const topCurveHeight = r * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // kiri
      ctx.bezierCurveTo(x, y, x - r / 2, y, x - r / 2, y + topCurveHeight);
      ctx.bezierCurveTo(
        x - r / 2,
        y + (r + topCurveHeight) / 2,
        x,
        y + (r + topCurveHeight) / 1.4,
        x,
        y + r,
      );
      // kanan
      ctx.bezierCurveTo(
        x,
        y + (r + topCurveHeight) / 1.4,
        x + r / 2,
        y + (r + topCurveHeight) / 2,
        x + r / 2,
        y + topCurveHeight,
      );
      ctx.bezierCurveTo(x + r / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    let rafId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Garis dari kursor ke partikel terdekat
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / 180) * 0.25;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      // Garis penghubung antar partikel
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      particles.forEach((p) => {
        // Gerakan
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Pertahankan kecepatan minimum
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.05;

        // Batas
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Hindari mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Rotasi
        p.rotate += p.rotateSpeed;

        // Gambar
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotate);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.shape === "star") {
          drawStar(0, 0, p.size * 2);
        } else if (p.shape === "heart") {
          drawHeart(0, -p.size, p.size * 1.5);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Blob dekoratif di pinggir */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "40vw",
            height: "40vw",
            top: "-15%",
            left: "-15%",
            background: "var(--accent)",
            opacity: 0.14,
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            backgroundColor: ["#8f5a56", "#d4a5a0", "#8f5a56"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: "35vw",
            height: "35vw",
            bottom: "-15%",
            right: "-15%",
            background: "var(--mauve)",
            opacity: 0.14,
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
            backgroundColor: ["#6f5c78", "#b8a6c2", "#6f5c78"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: "25vw",
            height: "25vw",
            top: "20%",
            right: "-10%",
            background: "var(--lavender)",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            backgroundColor: ["#b8aec8", "#d4a5a0", "#b8aec8"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: "30vw",
            height: "30vw",
            bottom: "10%",
            left: "-10%",
            background: "var(--accent-soft)",
            opacity: 0.18,
            filter: "blur(90px)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            backgroundColor: ["#e8d5d2", "#b8aec8", "#e8d5d2"],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Canvas partikel */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
    </>
  );
}