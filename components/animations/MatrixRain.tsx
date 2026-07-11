"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = 300;
    let H = 120;
    let drops: number[] = [];
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&^%$#@!";

    function resize() {
      const rect = wrapper!.getBoundingClientRect();
      W = rect.width;
      H = 120;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
      const cols = Math.floor(W / 10);
      drops = Array(cols).fill(0).map(() => Math.random() * H);
    }
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    function loop() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "10px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 10;
        const y = drops[i];
        ctx.fillStyle = y > H * 0.6 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)";
        ctx.fillText(char, x, y);
        if (y > H + 10 && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 4 + Math.random() * 4;
      }

      animId = requestAnimationFrame(loop);
    }

    loop();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <canvas ref={canvasRef} className="block w-full rounded" />
      <p className="text-[10px] font-mono text-foreground-dim mt-1.5 text-center">matrix rain</p>
    </div>
  );
}
