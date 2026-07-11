"use client";

import { useEffect, useRef, useCallback } from "react";
import type { NoteNode } from "@/lib/content";

type GraphNode = {
  id: string;
  name: string;
  type: "folder" | "file";
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphViewProps = {
  nodes: NoteNode[];
};

export default function GraphView({ nodes }: GraphViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const buildGraph = useCallback(() => {
    const graphNodes: GraphNode[] = [];
    const graphLinks: GraphLink[] = [];

    function walk(items: NoteNode[], parentId?: string) {
      for (const item of items) {
        const id = `node-${item.slug}`;
        graphNodes.push({ id, name: item.name, type: item.type });

        if (parentId) {
          graphLinks.push({ source: parentId, target: id });
        }

        if (item.children) {
          walk(item.children, id);
        }
      }
    }

    walk(nodes);
    return { graphNodes, graphLinks };
  }, [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;

    const ctx = canvas.getContext("2d")!;
    const { graphNodes, graphLinks } = buildGraph();
    if (graphNodes.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `400px`;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 400;
    const cx = width / 2;
    const cy = height / 2;

    const folderNodes = graphNodes.filter((n) => n.type === "folder");
    const fileNodes = graphNodes.filter((n) => n.type === "file");

    const positions: Record<string, { x: number; y: number; vx: number; vy: number }> = {};

    // Place folders in a circle
    folderNodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / folderNodes.length - Math.PI / 2;
      const radius = Math.min(130, 60 + folderNodes.length * 10);
      positions[node.id] = {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });

    // Place files near their parent folders
    fileNodes.forEach((node) => {
      const link = graphLinks.find((l) => l.target === node.id);
      const parentId = link?.source ?? "";
      const parentPos = positions[parentId];
      if (parentPos) {
        positions[node.id] = {
          x: parentPos.x + (Math.random() - 0.5) * 100,
          y: parentPos.y + 40 + Math.random() * 60,
          vx: 0,
          vy: 0,
        };
      } else {
        positions[node.id] = {
          x: cx + (Math.random() - 0.5) * 200,
          y: cy + 60 + Math.random() * 80,
          vx: 0,
          vy: 0,
        };
      }
    });

    let hoveredNode: string | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let animId: number;

    canvas.addEventListener("mousemove", (e) => {
      const r = canvas!.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });

    function checkHover() {
      hoveredNode = null;
      for (const node of graphNodes) {
        const p = positions[node.id];
        if (!p) continue;
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const hitR = node.type === "folder" ? 28 : 14;
        if (dx * dx + dy * dy < hitR * hitR) {
          hoveredNode = node.id;
          canvas!.style.cursor = "pointer";
          return;
        }
      }
      canvas!.style.cursor = "default";
    }

    function simulate() {
      // Repulsion
      for (let i = 0; i < graphNodes.length; i++) {
        for (let j = i + 1; j < graphNodes.length; j++) {
          const a = graphNodes[i];
          const b = graphNodes[j];
          const pa = positions[a.id];
          const pb = positions[b.id];
          if (!pa || !pb) continue;
          let dx = pb.x - pa.x;
          let dy = pb.y - pa.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (a.type === "folder" && b.type === "folder") ? 6000 / (dist * dist) : 3000 / (dist * dist);
          pa.vx -= (dx / dist) * force;
          pa.vy -= (dy / dist) * force;
          pb.vx += (dx / dist) * force;
          pb.vy += (dy / dist) * force;
        }
      }

      // Attraction along links
      for (const link of graphLinks) {
        const ps = positions[link.source];
        const pt = positions[link.target];
        if (!ps || !pt) continue;
        const dx = pt.x - ps.x;
        const dy = pt.y - ps.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = dist * 0.015;
        ps.vx += (dx / dist) * force;
        ps.vy += (dy / dist) * force;
        pt.vx -= (dx / dist) * force;
        pt.vy -= (dy / dist) * force;
      }

      // Gravity per group
      for (const node of graphNodes) {
        const p = positions[node.id];
        if (!p) continue;
        const link = graphLinks.find((l) => l.target === node.id);
        const parentId = link?.source;
        const parentPos = parentId ? positions[parentId] : null;

        if (node.type === "folder") {
          p.vx += (cx - p.x) * 0.003;
          p.vy += (cy - p.y) * 0.003;
        } else if (parentPos) {
          p.vx += (parentPos.x - p.x) * 0.008;
          p.vy += (parentPos.y + 50 - p.y) * 0.008;
        } else {
          p.vx += (cx - p.x) * 0.004;
          p.vy += (cy - p.y) * 0.004;
        }
      }

      // Apply
      for (const node of graphNodes) {
        const p = positions[node.id];
        if (!p) continue;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        p.x = Math.max(20, Math.min(width - 20, p.x));
        p.y = Math.max(20, Math.min(height - 20, p.y));
      }

      // Draw
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      // Links
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.8;
      for (const link of graphLinks) {
        const ps = positions[link.source];
        const pt = positions[link.target];
        if (!ps || !pt) continue;
        ctx.beginPath();
        ctx.moveTo(ps.x, ps.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }

      // Draw file nodes
      for (const node of fileNodes) {
        const p = positions[node.id];
        if (!p) continue;
        const isHovered = hoveredNode === node.id;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#f5f5f5" : "rgba(255,255,255,0.3)";
        ctx.fill();
        if (isHovered) {
          ctx.fillStyle = "#a3a3a3";
          ctx.font = "10px JetBrains Mono, monospace";
          ctx.textAlign = "center";
          ctx.fillText(node.name, p.x, p.y - 10);
        }
      }

      // Draw folder nodes
      for (const node of folderNodes) {
        const p = positions[node.id];
        if (!p) continue;
        const isHovered = hoveredNode === node.id;

        // Folder circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 26 : 22, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)";
        ctx.fill();
        ctx.strokeStyle = isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Label
        ctx.fillStyle = isHovered ? "#f5f5f5" : "#a3a3a3";
        ctx.font = isHovered ? "11px JetBrains Mono, monospace" : "10px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, p.x, p.y);
      }

      checkHover();
      animId = requestAnimationFrame(simulate);
    }

    simulate();

    return () => cancelAnimationFrame(animId);
  }, [buildGraph, nodes]);

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] rounded-lg border border-border bg-surface-alt/20">
        <p className="font-mono text-xs text-foreground-dim">∅ No graph data</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border">
      <canvas ref={canvasRef} className="block w-full" style={{ height: "400px" }} />
    </div>
  );
}
