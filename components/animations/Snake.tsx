"use client";

import { useEffect, useRef, useState } from "react";

const GRID = 10;

export default function Snake() {
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
    let W = 300;
    let H = 140;
    let COLS = 30;
    let ROWS = 14;

    function resize() {
      const rect = wrapper!.getBoundingClientRect();
      W = rect.width;
      H = Math.min(160, W * 0.45);
      COLS = Math.floor(W / GRID);
      ROWS = Math.floor(H / GRID);
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

    let snake = [{ x: 5, y: Math.floor(ROWS / 2) }];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let food = { x: 15, y: Math.floor(ROWS / 2) };
    let gameOver = false;
    let tick = 0;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (dir.y !== 1) nextDir = { x: 0, y: -1 }; break;
        case "ArrowDown": if (dir.y !== -1) nextDir = { x: 0, y: 1 }; break;
        case "ArrowLeft": if (dir.x !== 1) nextDir = { x: -1, y: 0 }; break;
        case "ArrowRight": if (dir.x !== -1) nextDir = { x: 1, y: 0 }; break;
      }
    };
    window.addEventListener("keydown", handleKey);

    function reset() {
      snake = [{ x: 5, y: Math.floor(ROWS / 2) }];
      for (let i = 1; i < 3; i++) snake.push({ x: 5 - i, y: Math.floor(ROWS / 2) });
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      food = { x: Math.floor(COLS * 0.7), y: Math.floor(ROWS / 2) };
      gameOver = false;
      scoreRef.current = 0;
      setScore(0);
    }

    const handleClick = () => { if (gameOver) reset(); };
    canvas.addEventListener("click", handleClick);

    function loop() {
      tick++;

      if (!gameOver && tick % 7 === 0) {
        dir = { ...nextDir };
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) gameOver = true;
        if (snake.some((s) => s.x === head.x && s.y === head.y)) gameOver = true;

        if (!gameOver) {
          snake.unshift(head);
          if (head.x === food.x && head.y === food.y) {
            scoreRef.current++;
            setScore(scoreRef.current);
            food = {
              x: Math.floor(Math.random() * (COLS - 2)) + 1,
              y: Math.floor(Math.random() * (ROWS - 2)) + 1,
            };
          } else {
            snake.pop();
          }
        }
      }

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      for (let x = 0; x <= W; x += GRID) {
        ctx.strokeStyle = "rgba(255,255,255,0.02)";
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(food.x * GRID, food.y * GRID, GRID - 1, GRID - 1);

      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#f5f5f5" : "rgba(255,255,255,0.25)";
        ctx.fillRect(s.x * GRID, s.y * GRID, GRID - 1, GRID - 1);
      });

      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`SNAKE: ${scoreRef.current}`, W - 8, 12);

      if (gameOver) {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "12px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 5);
        ctx.font = "8px JetBrains Mono, monospace";
        ctx.fillText("click to restart", W / 2, H / 2 + 12);
      }

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
      <canvas ref={canvasRef} className="block w-full rounded cursor-pointer" />
      <p className="text-[10px] font-mono text-foreground-dim mt-1.5 text-center">
        [arrow keys] snake · score: {score}
      </p>
    </div>
  );
}
