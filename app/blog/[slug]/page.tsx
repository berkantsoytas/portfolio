import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { getBlogPost, getBlogPosts, type Locale } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "tr") as Locale;
  const post = getBlogPost(slug, locale);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "tr") as Locale;

  const dict = locale === "tr"
    ? (await import("@/lib/dictionaries/tr.json")).default
    : (await import("@/lib/dictionaries/en.json")).default;

  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const content = await renderMDX(post.content);
  const readTimeLabel = dict["blog.min_read"];

  // Related posts (same tags)
  const allPosts = getBlogPosts(locale);
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 2);

  return (
    <div className="py-8 flex gap-8">
      {/* Left sidebar — Back + meta */}
      <aside className="w-48 shrink-0 hidden md:block">
        <div className="sticky top-20 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-mono text-foreground-dim hover:text-foreground transition-colors"
          >
            ← {dict["blog.back"]}
          </Link>

          <div>
            <h4 className="font-mono text-xs font-medium text-foreground mb-2 uppercase tracking-wider">
              Meta
            </h4>
            <div className="space-y-1 text-xs font-mono text-foreground-dim">
              <p>{formatDate(post.date)}</p>
              <p>{post.readTime} {readTimeLabel}</p>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-medium text-foreground mb-2 uppercase tracking-wider">
                Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-tag-bg text-tag-fg border border-tag-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Center — Content */}
      <main className="flex-1 min-w-0 max-w-3xl">
        <article>
          <h1 className="text-2xl font-mono font-semibold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Mobile meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-foreground-dim mb-8 md:hidden">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readTime} {readTimeLabel}</span>
            <Link href="/blog" className="hover:text-foreground">← {dict["blog.back"]}</Link>
          </div>

          {/* Mobile tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-6 md:hidden">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-tag-bg text-tag-fg border border-tag-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose-custom">{content}</div>
        </article>

        {/* Mobile related posts */}
        {related.length > 0 && (
          <div className="mt-10 lg:hidden">
            <h4 className="font-mono text-xs font-medium text-foreground mb-3 uppercase tracking-wider">
              Related
            </h4>
            <div className="space-y-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block px-3 py-2 rounded border border-border hover:border-border-bright hover:bg-surface-hover transition-colors"
                >
                  <p className="font-mono text-xs text-foreground truncate">
                    {r.title}
                  </p>
                  <p className="text-[10px] text-foreground-dim mt-0.5">
                    {r.readTime} {readTimeLabel}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Right sidebar — Related */}
      <aside className="w-48 shrink-0 hidden lg:block">
        <div className="sticky top-20">
          {related.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-medium text-foreground mb-3 uppercase tracking-wider">
                Related
              </h4>
              <div className="space-y-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block px-3 py-2 rounded border border-border hover:border-border-bright hover:bg-surface-hover transition-colors"
                  >
                    <p className="font-mono text-xs text-foreground truncate">
                      {r.title}
                    </p>
                    <p className="text-[10px] text-foreground-dim mt-0.5">
                      {r.readTime} {readTimeLabel}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
