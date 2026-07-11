"use client";

import { useEffect, useRef } from "react";

type Cell = {
  x: number;
  y: number;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
  visited: boolean;
};

export default function MazeGen() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = 300;
    let H = 100;
    let CELL = 8;
    let COLS = 37;
    let ROWS = 12;

    function resize() {
      const rect = wrapper!.getBoundingClientRect();
      W = rect.width;
      H = Math.min(140, W * 0.4);
      CELL = Math.max(5, Math.floor(W / 45));
      COLS = Math.floor(W / CELL);
      ROWS = Math.floor(H / CELL);
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
      initMaze();
    }

    let grid: Cell[][] = [];
    let stack: Cell[] = [];
    let generating = true;
    let current: Cell | null = null;

    function initMaze() {
      grid = [];
      for (let y = 0; y < ROWS; y++) {
        grid[y] = [];
        for (let x = 0; x < COLS; x++) {
          grid[y][x] = {
            x, y,
            walls: { top: true, right: true, bottom: true, left: true },
            visited: false,
          };
        }
      }
      stack = [];
      current = grid[0][0];
      current.visited = true;
      stack.push(current);
      generating = true;
    }

    function getUnvisitedNeighbor(c: Cell): Cell | null {
      const neighbors: Cell[] = [];
      if (c.y > 0 && !grid[c.y - 1][c.x].visited) neighbors.push(grid[c.y - 1][c.x]);
      if (c.x < COLS - 1 && !grid[c.y][c.x + 1].visited) neighbors.push(grid[c.y][c.x + 1]);
      if (c.y < ROWS - 1 && !grid[c.y + 1][c.x].visited) neighbors.push(grid[c.y + 1][c.x]);
      if (c.x > 0 && !grid[c.y][c.x - 1].visited) neighbors.push(grid[c.y][c.x - 1]);
      if (neighbors.length === 0) return null;
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    }

    function removeWalls(a: Cell, b: Cell) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      if (dx === 1) { a.walls.left = false; b.walls.right = false; }
      if (dx === -1) { a.walls.right = false; b.walls.left = false; }
      if (dy === 1) { a.walls.top = false; b.walls.bottom = false; }
      if (dy === -1) { a.walls.bottom = false; b.walls.top = false; }
    }

    initMaze();
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    function loop() {
      if (generating && stack.length > 0 && current) {
        current = stack[stack.length - 1];
        const next = getUnvisitedNeighbor(current);
        if (next) {
          next.visited = true;
          removeWalls(current, next);
          stack.push(next);
        } else {
          stack.pop();
        }
        if (stack.length === 0) generating = false;
      }

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 0.8;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cell = grid[y][x];
          if (!cell) continue;
          const px = x * CELL;
          const py = y * CELL;

          if (cell === current && generating) {
            ctx.fillStyle = "rgba(255,255,255,0.06)";
            ctx.fillRect(px, py, CELL, CELL);
          }

          if (cell.walls.top) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + CELL, py); ctx.stroke(); }
          if (cell.walls.right) { ctx.beginPath(); ctx.moveTo(px + CELL, py); ctx.lineTo(px + CELL, py + CELL); ctx.stroke(); }
          if (cell.walls.bottom) { ctx.beginPath(); ctx.moveTo(px, py + CELL); ctx.lineTo(px + CELL, py + CELL); ctx.stroke(); }
          if (cell.walls.left) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + CELL); ctx.stroke(); }
        }
      }

      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillText(generating ? "generating..." : "done ✓", 4, 8);

      animId = requestAnimationFrame(loop);
    }

    loop();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <canvas ref={canvasRef} className="block w-full rounded" />
      <p className="text-[10px] font-mono text-foreground-dim mt-1.5 text-center">maze generation (DFS)</p>
    </div>
  );
}
