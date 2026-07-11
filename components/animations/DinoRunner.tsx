"use client";

import { useEffect, useRef, useState } from "react";

export default function DinoRunner() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let dinoY = 60;
    let vy = 0;
    let jumping = false;
    let obstacleX = 400;
    let obstacleSpeed = 3;
    let frame = 0;
    let W = 0;
    let H = 100;

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
    }
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    const jump = () => {
      if (!jumping) { jumping = true; vy = -8; }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); jump(); }
    };
    const handleClick = () => jump();

    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("click", handleClick);

    const groundY = 85;

    function loop() {
      frame++;
      if (jumping) {
        dinoY += vy;
        vy += 0.5;
        if (dinoY >= groundY - 15) { dinoY = groundY - 15; jumping = false; vy = 0; }
      }

      obstacleX -= obstacleSpeed;
      if (obstacleX < -20) {
        obstacleX = W + 20;
        obstacleSpeed = 2.5 + Math.random() * 2.5;
        scoreRef.current++;
        setScore(scoreRef.current);
      }

      const dinoLeft = 40;
      const dinoRight = 55;
      const dinoTop = dinoY - 12;
      const dinoBottom = dinoY + 5;
      const obsLeft = obstacleX;
      const obsRight = obstacleX + 10;
      const obsTop = groundY - 30;
      const obsBottom = groundY;

      if (dinoRight > obsLeft && dinoLeft < obsRight && dinoBottom > obsTop && dinoTop < obsBottom) {
        scoreRef.current = 0;
        setScore(0);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Ground line
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(W, groundY);
      ctx.stroke();

      // Ground dots (speed lines)
      for (let i = 0; i < 5; i++) {
        const x = (frame * obstacleSpeed + i * 80) % (W + 40) - 20;
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fillRect(x, groundY + 5, 2, 2);
      }

      // Dino
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(40, dinoY - 12, 15, 15);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(52, dinoY - 9, 3, 3);
      ctx.fillStyle = "#f5f5f5";
      const legOff = Math.sin(frame * 0.15) * 3;
      ctx.fillRect(42, dinoY + 4, 4, 6 + legOff);
      ctx.fillRect(49, dinoY + 4, 4, 6 - legOff);

      // Cactus
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(obstacleX, groundY - 28, 10, 28);
      ctx.fillRect(obstacleX - 5, groundY - 18, 5, 12);

      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "9px JetBrains Mono, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE: ${scoreRef.current}`, W - 10, 15);

      animId = requestAnimationFrame(loop);
    }

    loop();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <canvas ref={canvasRef} className="block w-full cursor-pointer rounded" />
      <p className="text-[10px] font-mono text-foreground-dim mt-1.5 text-center">
        [click/space] dino runner · score: {score}
      </p>
    </div>
  );
}
