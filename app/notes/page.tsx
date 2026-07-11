"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import FileTree from "@/components/FileTree";
import GraphView from "@/components/GraphView";
import AnimationGallery from "@/components/AnimationGallery";
import type { NoteNode } from "@/lib/content";

function NoteContent({ slug }: { slug: string }) {
  const [mdContent, setMdContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState(false);
  const { locale } = useI18n();
  const slugRef = useRef(slug);

  useEffect(() => {
    slugRef.current = slug;
    setTitle("");
    // Don't reset mdContent/error synchronously — let stale responses get ignored
    fetch(`/api/notes-content?slug=${slug}&locale=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        if (slugRef.current !== slug) return; // stale response
        if (data.error) {
          setError(true);
          setMdContent(null);
        } else {
          setTitle((data.frontmatter?.title as string) ?? slug);
          setMdContent(data.content as string);
        }
      })
      .catch(() => {
        if (slugRef.current === slug) setError(true);
      });
  }, [slug, locale]);

  if (error)
    return (
      <p className="font-mono text-sm text-foreground-dim">Note not found.</p>
    );
  if (!mdContent)
    return <p className="font-mono text-sm text-foreground-dim">Loading...</p>;

  const lines = mdContent.split("\n");
  let inCodeBlock = false;
  const renderedLines: {
    type: string;
    content: string;
    key: number;
    code?: string[];
  }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        const code: string[] = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith("```")) {
          code.push(lines[j]);
          j++;
        }
        renderedLines.push({ type: "code", content: "", key: i, code });
        i = j;
      }
      continue;
    }
    if (line.startsWith("## ")) {
      renderedLines.push({
        type: "h2",
        content: line.replace("## ", ""),
        key: i,
      });
    } else if (line.startsWith("### ")) {
      renderedLines.push({
        type: "h3",
        content: line.replace("### ", ""),
        key: i,
      });
    } else if (line.startsWith("- ")) {
      renderedLines.push({
        type: "li",
        content: line.replace("- ", ""),
        key: i,
      });
    } else if (line.trim() === "") {
      renderedLines.push({ type: "br", content: "", key: i });
    } else {
      const html = line
        .replace(
          /`([^`]+)`/g,
          "<code class='text-foreground bg-surface-hover px-1 rounded text-xs'>$1</code>",
        )
        .replace(
          /\*\*(.+?)\*\*/g,
          "<strong class='text-foreground'>$1</strong>",
        )
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
      renderedLines.push({ type: "p", content: html, key: i });
    }
  }

  return (
    <div>
      <h2 className="font-mono font-semibold text-foreground text-lg mb-4">
        {title}
      </h2>
      <div className="prose-custom text-sm">
        {renderedLines.map((r) => {
          if (r.type === "h2")
            return (
              <h2
                key={r.key}
                className="font-mono text-foreground text-base mt-5 mb-2 pb-1 border-b border-border"
              >
                {r.content}
              </h2>
            );
          if (r.type === "h3")
            return (
              <h3
                key={r.key}
                className="font-mono text-foreground text-sm mt-4 mb-1"
              >
                {r.content}
              </h3>
            );
          if (r.type === "li")
            return (
              <li
                key={r.key}
                className="text-foreground-dim ml-4 list-disc text-sm"
              >
                {r.content}
              </li>
            );
          if (r.type === "br") return <br key={r.key} />;
          if (r.type === "code")
            return (
              <pre
                key={r.key}
                className="bg-surface-alt border border-border rounded-md p-3 my-3 overflow-x-auto"
              >
                <code className="text-xs text-foreground">
                  {r.code?.join("\n")}
                </code>
              </pre>
            );
          return (
            <p
              key={r.key}
              className="text-sm text-foreground-dim mb-1 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: r.content }}
            />
          );
        })}
      </div>
    </div>
  );
}

function FolderBrowser({
  nodes,
  onSelect,
}: {
  nodes: NoteNode[];
  onSelect: (slug: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setExpanded((prev) => {
      const next = { ...prev };
      // If already expanded, collapse it; otherwise expand and set as selected
      if (next[slug]) {
        delete next[slug];
        setSelectedFolder(null);
      } else {
        next[slug] = true;
        setSelectedFolder(slug);
      }
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {nodes.map((node) => {
        if (node.type === "folder") {
          const isOpen = expanded[node.slug];
          return (
            <div key={node.slug}>
              <button
                onClick={() => toggle(node.slug)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  isOpen
                    ? "border-border-bright bg-surface-hover"
                    : "border-border hover:border-border-bright hover:bg-surface-alt/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{isOpen ? "▣" : "▣"}</span>
                  <div>
                    <p className="font-mono text-sm text-foreground">
                      {node.name}
                    </p>
                    <p className="text-[10px] font-mono text-foreground-dim mt-0.5">
                      {node.children?.length ?? 0} notes
                    </p>
                  </div>
                  <span className="ml-auto text-foreground-dim text-xs">
                    {isOpen ? "▾" : "▸"}
                  </span>
                </div>
              </button>
              {isOpen && node.children && (
                <div className="ml-4 mt-2 space-y-1">
                  {node.children.map((child) => (
                    <button
                      key={child.slug}
                      onClick={() => onSelect(child.slug)}
                      className="w-full text-left px-4 py-2 rounded-md border border-border/50 hover:border-border hover:bg-surface-alt/30 transition-colors flex items-center gap-2"
                    >
                      <span className="text-[10px] text-foreground-dim">▸</span>
                      <span className="font-mono text-xs text-foreground-dim hover:text-foreground transition-colors">
                        {child.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function RelatedNotes({ slug }: { slug: string }) {
  const [allNotes, setAllNotes] = useState<NoteNode[]>([]);
  const { locale } = useI18n();

  useEffect(() => {
    fetch(`/api/notes-index?locale=${locale}`)
      .then((r) => r.json())
      .then(setAllNotes)
      .catch(() => setAllNotes([]));
  }, [locale]);

  const flatFiles = allNotes.flatMap((n) => {
    if (n.type === "file") return [n];
    return n.children?.filter((c) => c.type === "file") ?? [];
  });
  const related = flatFiles.filter((n) => n.slug !== slug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div>
      <h4 className="font-mono text-xs font-medium text-foreground-dim uppercase tracking-wider mb-3">
        Suggested
      </h4>
      <div className="space-y-2">
        {related.map((n) => (
          <a
            key={n.slug}
            href={`/notes?note=${n.slug}`}
            className="block px-3 py-2 rounded border border-border hover:border-border-bright hover:bg-surface-hover transition-colors"
          >
            <p className="font-mono text-xs text-foreground truncate">
              {n.name}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

function NotesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeSlug = searchParams.get("note");
  const { t, locale } = useI18n();
  const [nodes, setNodes] = useState<NoteNode[]>([]);
  const [view, setView] = useState<"default" | "graph">("default");
  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/notes-index?locale=${locale}`)
      .then((r) => r.json())
      .then(setNodes)
      .catch(() => setNodes([]));
  }, [locale]);

  const handleSelect = (slug: string) => {
    router.push(`/notes?note=${slug}`);
  };

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-sm text-foreground-dim mb-2">
            <span className="text-foreground-dim">$</span> {t("notes.subtitle")}
          </p>
          <h1 className="text-2xl font-mono font-semibold text-foreground">
            {t("notes.title")}
          </h1>
        </div>
        <button
          onClick={() => setMobileTreeOpen(!mobileTreeOpen)}
          className="md:hidden px-3 py-1.5 text-xs font-mono border border-border rounded-md hover:border-border-bright transition-colors"
        >
          {mobileTreeOpen ? "Close Tree" : "Tree"}
        </button>
      </div>

      {mobileTreeOpen && (
        <div className="md:hidden mb-6 rounded-lg border border-border bg-surface p-3 max-h-[50vh] overflow-y-auto">
          <FileTree nodes={nodes} activeSlug={activeSlug ?? undefined} />
        </div>
      )}

      <div className="flex gap-6">
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="sticky top-20">
            <div className="rounded-lg border border-border bg-surface-alt/20 p-2 max-h-[70vh] overflow-y-auto">
              <FileTree nodes={nodes} activeSlug={activeSlug ?? undefined} />
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {activeSlug ? (
            <NoteContent slug={activeSlug} />
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setView("default")}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                    view === "default"
                      ? "bg-foreground text-surface"
                      : "border border-border text-foreground-dim hover:text-foreground"
                  }`}
                >
                  {t("notes.tree_view")}
                </button>
                <button
                  onClick={() => setView("graph")}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                    view === "graph"
                      ? "bg-foreground text-surface"
                      : "border border-border text-foreground-dim hover:text-foreground"
                  }`}
                >
                  {t("notes.graph_view")}
                </button>
              </div>

              {nodes.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-mono text-sm text-foreground-dim">
                    ∅ {t("notes.no_notes")}
                  </p>
                </div>
              ) : view === "graph" ? (
                <GraphView nodes={nodes} />
              ) : (
                <div>
                  <FolderBrowser nodes={nodes} onSelect={handleSelect} />
                  <AnimationGallery />
                </div>
              )}
            </div>
          )}
        </main>

        {activeSlug && (
          <aside className="w-48 shrink-0 hidden lg:block">
            <div className="sticky top-20">
              <RelatedNotes slug={activeSlug} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 font-mono text-sm text-foreground-dim">
          Loading...
        </div>
      }
    >
      <NotesContent />
    </Suspense>
  );
}
