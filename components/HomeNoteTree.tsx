"use client";

import { useState } from "react";
import Link from "next/link";
import type { NoteNode } from "@/lib/content";

function TreeItem({
  node,
  depth = 0,
}: {
  node: NoteNode;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(depth < 1);

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md border border-border hover:border-border-bright hover:bg-surface-alt/50 transition-all group"
        >
          <span className="text-xs font-mono text-foreground-dim shrink-0 w-4">
            {expanded ? "▾" : "▸"}
          </span>
          <span className="text-xs font-mono text-foreground-dim shrink-0">▣</span>
          <span className="text-sm font-mono text-foreground group-hover:text-foreground transition-colors">
            {node.name}
          </span>
          {node.children && (
            <span className="text-[10px] font-mono text-foreground-dim ml-auto">
              {node.children.length} notes
            </span>
          )}
        </button>
        {expanded && node.children && (
          <div className="ml-4 mt-1 space-y-1">
            {node.children.map((child) => (
              <TreeItem key={child.slug} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/notes?note=${node.slug}`}
      className="flex items-center gap-2 px-3 py-2 rounded-md border border-transparent hover:border-border hover:bg-surface-alt/30 transition-all group"
      style={{ marginLeft: `${depth * 16}px` }}
    >
      <span className="text-xs font-mono text-foreground-dim shrink-0 w-4 text-center">
        ▸
      </span>
      <span className="text-sm font-mono text-foreground-dim truncate group-hover:text-foreground transition-colors">
        {node.name}
      </span>
    </Link>
  );
}

type HomeNoteTreeProps = {
  nodes: NoteNode[];
};

export default function HomeNoteTree({ nodes }: HomeNoteTreeProps) {
  if (nodes.length === 0) {
    return <p className="text-sm text-foreground-dim font-mono">∅ No notes yet</p>;
  }

  return (
    <div className="space-y-1">
      {nodes.map((node) => (
        <TreeItem key={node.slug} node={node} />
      ))}
    </div>
  );
}
