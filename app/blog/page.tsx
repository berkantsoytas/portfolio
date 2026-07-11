import Link from "next/link";
import { cookies } from "next/headers";
import { getBlogPosts, type Locale } from "@/lib/content";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "tr") as Locale;

  const dict =
    locale === "tr"
      ? (await import("@/lib/dictionaries/tr.json")).default
      : (await import("@/lib/dictionaries/en.json")).default;

  const posts = getBlogPosts(locale);
  const readTimeLabel = dict["blog.min_read"];

  // Build tag tree
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="py-8">
      <div className="mb-10">
        <p className="font-mono text-sm text-foreground-dim mb-2">
          <span className="text-foreground-dim">$</span> {dict["blog.subtitle"]}
        </p>
        <h1 className="text-2xl font-mono font-semibold text-foreground">
          {dict["blog.title"]}
        </h1>
      </div>

      <div className="flex gap-8">
        {/* Left sidebar — Tags */}
        <aside className="w-48 shrink-0 hidden md:block">
          <div className="sticky top-20">
            <h3 className="font-mono text-xs font-medium text-foreground mb-3 uppercase tracking-wider">
              {dict["blog.tags"]}
            </h3>
            <div className="space-y-1">
              {tags.map(([tag, count]) => (
                <div
                  key={tag}
                  className="flex items-center justify-between px-2 py-1 rounded text-xs font-mono text-foreground-dim hover:bg-surface-hover transition-colors"
                >
                  <span>#{tag}</span>
                  <span className="text-[10px]">{count}</span>
                </div>
              ))}
              {tags.length === 0 && (
                <p className="text-xs font-mono text-foreground-dim">
                  ∅ No tags
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Main — Posts */}
        <main className="flex-1 min-w-0">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-mono text-sm text-foreground-dim">
                ∅ {dict["blog.no_posts"]}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="p-5 rounded-lg border border-border hover:border-border-bright hover:bg-surface-alt/50 transition-all">
                    <div className="flex items-center gap-3 text-xs font-mono text-foreground-dim mb-2">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>·</span>
                      <span>
                        {post.readTime} {readTimeLabel}
                      </span>
                    </div>
                    <h2 className="font-mono font-medium text-foreground group-hover:text-foreground transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-foreground-dim line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
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
                    <div className="mt-3 text-xs font-mono text-foreground-dim opacity-0 group-hover:opacity-100 transition-opacity">
                      {dict["blog.read_more"]}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
