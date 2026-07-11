import fs from "fs";
import path from "path";

export type Locale = "tr" | "en";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readTime: number;
  locale: Locale;
  excerpt: string;
  content: string;
};

export type NoteNode = {
  name: string;
  slug: string;
  type: "file" | "folder";
  children?: NoteNode[];
};

const contentDir = path.join(process.cwd(), "content");

function extractFrontmatter(
  raw: string
): { frontmatter: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: raw };

    const frontmatter: Record<string, unknown> = {};
    for (const line of match[1].split("\n")) {
      const sep = line.indexOf(":");
      if (sep === -1) continue;
      const key = line.slice(0, sep).trim();
      let value: unknown = line.slice(sep + 1).trim();
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (!isNaN(Number(value))) value = Number(value);
      else if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1).split(",").map((s) => {
          const trimmed = s.trim();
          return trimmed.replace(/^["']|["']$/g, "");
        });
      }
      frontmatter[key] = value;
    }

  return { frontmatter, content: match[2].trim() };
}

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string")
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

function estimateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  const blogDir = path.join(contentDir, "blog");
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir);
  const ext = `.${locale}.mdx`;
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(ext)) continue;

    const slug = file.slice(0, -ext.length);
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { frontmatter, content } = extractFrontmatter(raw);

    posts.push({
      slug,
      title: (frontmatter.title as string) ?? slug,
      date: (frontmatter.date as string) ?? "",
      tags: parseTags(frontmatter.tags),
      readTime: estimateReadTime(content),
      locale,
      excerpt: (frontmatter.excerpt as string) ?? content.slice(0, 160),
      content,
    });
  }

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return posts;
}

export function getBlogPost(
  slug: string,
  locale: Locale
): BlogPost | null {
  const posts = getBlogPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getNotesIndex(locale: Locale): NoteNode[] {
  const indexPath = path.join(contentDir, `notes-index.${locale}.json`);
  if (fs.existsSync(indexPath)) {
    const raw = fs.readFileSync(indexPath, "utf-8");
    return JSON.parse(raw) as NoteNode[];
  }
  // fallback: generate from filesystem
  return buildNotesTree(locale);
}

export function getNoteContent(
  slug: string,
  locale: Locale
): { frontmatter: Record<string, unknown>; content: string } | null {
  // Try all extensions in notes dir recursively
  return findNoteFile(slug, locale);
}

export function getAllNotes(locale: Locale): NoteNode[] {
  return getNotesIndex(locale);
}

function buildNotesTree(locale: Locale): NoteNode[] {
  const notesDir = path.join(contentDir, "notes");
  if (!fs.existsSync(notesDir)) return [];

  const ext = `.${locale}.mdx`;
  const tree: NoteNode[] = [];

  function walk(dir: string): NoteNode[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const nodes: NoteNode[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const children = walk(path.join(dir, entry.name));
        if (children.length > 0) {
          nodes.push({
            name: entry.name,
            slug: entry.name,
            type: "folder",
            children,
          });
        }
      } else if (entry.name.endsWith(ext)) {
        const slug = entry.name.slice(0, -ext.length);
        nodes.push({
          name: slug,
          slug,
          type: "file",
        });
      }
    }

    return nodes;
  }

  return walk(notesDir);
}

function findNoteFile(
  slug: string,
  locale: Locale
): { frontmatter: Record<string, unknown>; content: string } | null {
  const notesDir = path.join(contentDir, "notes");
  if (!fs.existsSync(notesDir)) return null;

  const ext = `.${locale}.mdx`;

  function search(dir: string): string | null {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = search(fullPath);
        if (found) return found;
      } else if (
        entry.name === `${slug}${ext}` ||
        entry.name.endsWith(`/${slug}${ext}`)
      ) {
        return fs.readFileSync(fullPath, "utf-8");
      }
    }
    return null;
  }

  // Also try direct match
  for (const root of fs.readdirSync(notesDir, { withFileTypes: true })) {
    const fullPath = path.join(notesDir, root.name);
    if (root.isDirectory()) {
      const sub = path.join(fullPath, `${slug}${ext}`);
      if (fs.existsSync(sub)) {
        const raw = fs.readFileSync(sub, "utf-8");
        return extractFrontmatter(raw);
      }
      // search recursively
      const found = search(fullPath);
      if (found) return extractFrontmatter(found);
    } else if (root.name === `${slug}${ext}`) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      return extractFrontmatter(raw);
    }
  }

  return null;
}
