"use client";

import { useState } from "react";
import Link from "next/link";
import type { NoteNode } from "@/lib/content";

function FileTreeItem({
  node,
  depth = 0,
  activeSlug,
}: {
  node: NoteNode;
  depth?: number;
  activeSlug?: string;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const isActive = activeSlug === node.slug;

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-xs font-mono transition-colors ${
            isActive
              ? "text-foreground bg-surface-hover"
              : "text-foreground-dim hover:text-foreground hover:bg-surface-hover"
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span className="shrink-0 w-3 text-center text-[10px]">
            {expanded ? "▾" : "▸"}
          </span>
          <span className="text-foreground-dim">▣</span>
          <span>{node.name}</span>
        </button>
        {expanded && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem
                key={child.slug}
                node={child}
                depth={depth + 1}
                activeSlug={activeSlug}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/notes?note=${node.slug}`}
      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-colors ${
        isActive
          ? "text-foreground bg-surface-hover"
          : "text-foreground-dim hover:text-foreground hover:bg-surface-hover"
      }`}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
    >
      <span className="shrink-0 w-3 text-center text-[10px] opacity-0">
        ▸
      </span>
      <span>▸</span>
      <span className="truncate">{node.name}</span>
    </Link>
  );
}

type FileTreeProps = {
  nodes: NoteNode[];
  activeSlug?: string;
};

export default function FileTree({ nodes, activeSlug }: FileTreeProps) {
  return (
    <div className="py-2">
      {nodes.map((node) => (
        <FileTreeItem
          key={node.slug}
          node={node}
          activeSlug={activeSlug}
        />
      ))}
    </div>
  );
}
