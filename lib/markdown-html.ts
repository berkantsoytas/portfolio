import { marked } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;
let initPromise: Promise<void> | null = null;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&.*?;/g, "")
    .replace(/[^a-z0-9\u00e7\u015f\u011f\u0131\u00f6\u00fc]+/g, "-")
    .replace(/^-|-$/g, "") || "heading";

const stripMarkdown = (text: string) =>
  text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1");

export type MarkdownHeading = { level: number; text: string; id: string };

export async function markdownToHtml(
  md: string,
): Promise<{ html: string; headings: MarkdownHeading[] }> {
  if (!initPromise) {
    initPromise = (async () => {
      highlighter = await createHighlighter({
        themes: ["github-dark-dimmed"],
        langs: [
          "bash",
          "typescript",
          "javascript",
          "tsx",
          "jsx",
          "json",
          "yaml",
          "shell",
          "diff",
          "css",
          "html",
          "plaintext",
        ],
      });

      marked.use({
        renderer: {
          code({ text, lang }: { text: string; lang?: string }) {
            try {
              return highlighter!.codeToHtml(text.trimEnd(), {
                lang: lang || "plaintext",
                theme: "github-dark-dimmed",
              });
            } catch {
              // fallback: unknown language → plaintext
              return highlighter!.codeToHtml(text.trimEnd(), {
                lang: "plaintext",
                theme: "github-dark-dimmed",
              });
            }
          },
          heading({ text, depth }: { text: string; depth: number }) {
            const id = slugify(text);
            return `<h${depth} id="${id}">${text}</h${depth}>`;
          },
        },
        gfm: true,
        breaks: false,
      });
    })();
  }

  await initPromise;

  // Extract headings for outline (from raw markdown before rendering)
  const headings: MarkdownHeading[] = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(md)) !== null) {
    const level = match[1].length;
    const rawText = match[2];
    const text = stripMarkdown(rawText);
    const id = slugify(rawText);
    headings.push({ level, text, id });
  }

  // Convert to HTML
  const html = await marked.parse(md);

  return { html, headings };
}
