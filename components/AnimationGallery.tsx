"use client";

import { useState, useCallback } from "react";
import DinoRunner from "./animations/DinoRunner";
import MatrixRain from "./animations/MatrixRain";
import Snake from "./animations/Snake";
import Particles from "./animations/Particles";
import LoadingBar from "./animations/LoadingBar";
import MazeGen from "./animations/MazeGen";
import Typewriter from "./animations/Typewriter";

const animations = [
  { id: "dino", label: "dino-runner", comp: DinoRunner },
  { id: "matrix", label: "matrix-rain", comp: MatrixRain },
  { id: "snake", label: "snake-game", comp: Snake },
  { id: "particles", label: "particle-field", comp: Particles },
  { id: "loading", label: "loading-sim", comp: LoadingBar },
  { id: "maze", label: "maze-gen", comp: MazeGen },
  { id: "typewriter", label: "code-typer", comp: Typewriter },
];

export default function AnimationGallery() {
  const [active, setActive] = useState(() =>
    animations[Math.floor(Math.random() * animations.length)]
  );

  const shuffle = useCallback(() => {
    let next: typeof active;
    do {
      next = animations[Math.floor(Math.random() * animations.length)];
    } while (next.id === active.id);
    setActive(next);
  }, [active]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs font-medium text-foreground-dim uppercase tracking-wider">
          playground
        </h3>
        <button
          onClick={shuffle}
          className="text-[10px] font-mono text-foreground-dim hover:text-foreground border border-border hover:border-border-bright px-2 py-0.5 rounded transition-colors"
        >
          shuffle ↻
        </button>
      </div>
      <div className="rounded-lg border border-border bg-surface-alt/20 p-6">
        <div className="w-full">
          <active.comp />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {animations.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a)}
              className={`w-2 h-2 rounded-full transition-all ${
                a.id === active.id
                  ? "bg-foreground scale-125"
                  : "bg-border hover:bg-border-bright"
              }`}
              title={a.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
