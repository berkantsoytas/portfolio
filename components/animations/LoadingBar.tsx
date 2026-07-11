"use client";

import { useEffect, useRef, useState } from "react";

const quotes = [
  "Compiling kernel modules...",
  "Warming up cache nodes...",
  "Syncing blockchain state...",
  "Resolving dependency graph...",
  "Optimizing query planner...",
  "Rebalancing Kafka partitions...",
  "Reticulating splines...",
  "Sharding database cluster...",
  "Negotiating TLS handshake...",
  "Garbage collecting heap...",
  "Spawning container processes...",
  "Rewriting git history...",
];

export default function LoadingBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let p = 0;
    let W = 300;
    let H = 100;
    let currentQuote = quotes[0];

    function resize() {
      const rect = wrapper!.getBoundingClientRect();
      W = rect.width;
      H = 100;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    function loop() {
      p += 0.4;
      if (p >= 100) {
        p = 0;
        currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
      }
      setProgress(Math.floor(p));

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Terminal window
      const margin = W * 0.08;
      const barW = W - margin * 2;
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.strokeRect(margin, 20, barW, 60);

      // Dots
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(margin + 15 + i * 12, 32, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bar bg
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(margin + 10, 48, barW - 20, 10);

      // Bar fill
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(margin + 10, 48, ((p / 100) * (barW - 20)), 10);

      // Percent
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.floor(p)}%`, W / 2, 42);

      // Quote
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillText(currentQuote, W / 2, 72);

      animId = requestAnimationFrame(loop);
    }

    loop();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <canvas ref={canvasRef} className="block w-full rounded" />
      <p className="text-[10px] font-mono text-foreground-dim mt-1.5 text-center">loading · {progress}%</p>
    </div>
  );
}
