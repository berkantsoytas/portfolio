"use client";

import { useEffect, useRef } from "react";

const snippets = [
  `fn main() {\n    println!("Hello, world!");\n}`,
  `func handleRequest(w http.ResponseWriter, r *http.Request) {\n    json.NewEncoder(w).Encode(data)\n}`,
  `contract Token {\n    mapping(address => uint) public balances;\n}`,
  `SELECT * FROM users\nWHERE status = 'active'\nORDER BY created_at DESC;`,
  `kafka.consume("events", func(msg Message) {\n    process(msg)\n})`,
  `docker run -d \\\n  --name service \\\n  -p 8080:8080 \\\n  myapp:latest`,
  `git commit -m "fix: resolve race condition in event loop"`,
  `curl -X POST https://api.example.com/v1/deploy \\\n  -H "Content-Type: application/json" \\\n  -d '{"env": "prod"}'`,
];

export default function Typewriter() {
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
    let currentSnippet = snippets[0];
    let charIndex = 0;

    function resize() {
      const rect = wrapper!.getBoundingClientRect();
      W = rect.width;
      H = 110;
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
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      const displayText = currentSnippet.slice(0, charIndex);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.textAlign = "left";

      const lines = displayText.split("\n");
      lines.forEach((line, i) => {
        ctx.fillText(line, 12, 18 + i * 13);
      });

      if (charIndex < currentSnippet.length) {
        const lastLine = lines[lines.length - 1] || "";
        const cursorX = 12 + (ctx.measureText(lastLine).width || 0);
        const cursorY = 18 + (lines.length - 1) * 13;
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(cursorX, cursorY - 8, 5, 11);
      }

      charIndex++;
      const delay = Math.random() < 0.08 ? 6 : 2;

      if (charIndex > currentSnippet.length + 40) {
        charIndex = 0;
        currentSnippet = snippets[Math.floor(Math.random() * snippets.length)];
      }

      animId = window.setTimeout(() => {
        requestAnimationFrame(loop);
      }, delay * 20);
    }

    loop();
    return () => {
      window.clearTimeout(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <canvas ref={canvasRef} className="block w-full rounded" />
      <p className="text-[10px] font-mono text-foreground-dim mt-1.5 text-center">code typewriter</p>
    </div>
  );
}
