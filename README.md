# berkantsoytas.dev

Personal portfolio, blog & knowledge base — built with Next.js 16, Tailwind CSS v4, and TypeScript.

> **Theme**: Cyber-minimalist terminal aesthetic. Monochrome black/white with a terminal-inspired UI.
> **Languages**: Turkish (TR) + English (EN) — dual language support with cookie-based detection.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Content | MDX (frontmatter + markdown) |
| Rendering | server-side MDX via `next-mdx-remote/rsc` |
| Syntax Highlighting | `rehype-pretty-code` |
| Fonts | Inter (sans) + JetBrains Mono (mono) via `next/font/google` |
| Deployment | Static export / Node.js server |

## Features

### Portfolio/CV (`/portfolio`)

- Terminal-styled contact card with availability badge
- Categorized skill matrix (7 groups: Languages, Backend & Systems, Blockchain & Web3, Databases, Infrastructure & DevOps, Data & Messaging, AI & Automation)
- Timeline-based experience and education
- 8 real projects with descriptions, tags, source links
- `[tag]` metadata format

### Blog (`/blog`)

- MDX-based posts with frontmatter (title, date, tags, excerpt, read time)
- Tag-based sidebar with frequency counts
- Related posts (by shared tags) in detail view
- Per-post read time estimation
- TR/EN locale-paired content (e.g. `post-name.tr.mdx` / `post-name.en.mdx`)

### Notes / Knowledge Base (`/notes`)

- 3-column layout: FileTree (left) → Content (center) → Related (right)
- Recursive folder-based file tree from `notes-index.*.json`
- Force-directed GraphView with folder/file nodes
- AnimationGallery with 7 mini canvas demos (DinoRunner, MatrixRain, Snake, Particles, LoadingBar, MazeGen, Typewriter)
- MDX-rendered note content with rehype-pretty-code highlighting

### Infrastructure

- Dual language: custom I18nContext + JSON dictionaries + cookie locale detection
- Middleware (`proxy.ts`) for initial locale negotiation via `Accept-Language`
- API endpoints: `/api/notes-index`, `/api/notes-content`, `/api/profile`
- Metadata: Open Graph, Twitter Cards, canonical URLs, sitemap.xml, robots.txt

## Project Structure

```
.
├── app/
│   ├── api/              # API routes (notes-index, notes-content, profile)
│   ├── blog/             # Blog list + [slug] detail pages
│   ├── notes/            # Notes knowledge base page
│   ├── portfolio/        # CV / portfolio page
│   ├── globals.css       # Global styles, theme, prose, terminal effects
│   └── layout.tsx        # Root layout, fonts, I18nProvider
├── components/
│   ├── animations/       # 7 canvas animation components
│   ├── BlogCard.tsx      # Blog post card
│   ├── FileTree.tsx      # Recursive note tree sidebar
│   ├── GraphView.tsx     # Force-directed graph visualization
│   ├── HomeNoteTree.tsx  # Expandable note tree for homepage
│   ├── LanguageToggle.tsx# TR/EN switch
│   └── ...               # TerminalHero, Navbar, Footer, ProjectCard, Timeline
├── content/
│   ├── blog/             # Blog posts (*.tr.mdx, *.en.mdx)
│   └── notes/            # Note files (*.tr.mdx, *.en.mdx)
├── lib/
│   ├── content.ts        # MDX file reading + frontmatter parsing
│   ├── dictionaries/     # tr.json, en.json — UI string translations
│   ├── i18n-context.tsx  # Client-side locale state + t() function
│   └── mdx.tsx           # MDXRemote wrapper + custom components
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── proxy.ts              # Middleware for locale detection
└── README.md
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

### Writing a New Blog Post

1. Create two MDX files in `content/blog/`:
   - `your-post-slug.tr.mdx` (Turkish)
   - `your-post-slug.en.mdx` (English)

2. Frontmatter format:

   ```yaml
   ---
   title: "Your Post Title"
   date: "2026-07-25"
   tags: ["go", "architecture", "systems"]
   excerpt: "A brief description for cards and SEO."
   ---
   ```

### Adding Notes

1. Edit `content/notes-index.tr.json` and `content/notes-index.en.json` to define the tree structure
2. Create corresponding `.tr.mdx` / `.en.mdx` files under `content/notes/`

## Environment

No environment variables required. Site is fully self-contained.

## i18n Architecture

- **Detection Flow**: `proxy.ts` middleware → reads cookie → if absent, detects via `Accept-Language` → sets cookie
- **Server Components**: read `cookies().get("locale")` directly
- **Client Components**: `I18nProvider` reads cookie on mount → provides `locale`, `setLocale`, `t()` via context
- **Toggle Behavior**: sets cookie + triggers page reload for server component re-render
- **Dictionaries**: JSON files in `lib/dictionaries/` — one object per locale, flat key-value pairs

## Deployment

Designed for deployment on any Node.js platform (Vercel, Fly.io, Railway, self-hosted).

```bash
pnpm build
# Output in .next/ — deploy with `pnpm start`
```

Static export is also possible (note: API routes require server runtime).

## License

MIT
