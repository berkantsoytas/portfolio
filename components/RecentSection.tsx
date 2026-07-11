import Link from "next/link";
import BlogCard from "./BlogCard";
import HomeNoteTree from "./HomeNoteTree";
import { getBlogPosts, getNotesIndex } from "@/lib/content";
import { cookies } from "next/headers";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function RecentSection() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "tr") as "tr" | "en";

  const posts = getBlogPosts(locale).slice(0, 3);
  const noteTree = getNotesIndex(locale);

  const dict = locale === "tr" 
    ? (await import("@/lib/dictionaries/tr.json")).default
    : (await import("@/lib/dictionaries/en.json")).default;

  const readTimeLabel = dict["blog.min_read"];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-sm font-medium text-foreground">
            <span className="text-foreground-dim">$</span>{" "}
            {dict["home.recent_posts"]}
          </h2>
          <Link
            href="/blog"
            className="text-xs font-mono text-foreground-dim hover:text-foreground transition-colors"
          >
            {dict["home.view_all"]} →
          </Link>
        </div>
        <div className="space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard
                key={post.slug}
                {...post}
                formattedDate={formatDate(post.date)}
                readTimeLabel={readTimeLabel}
              />
            ))
          ) : (
            <p className="text-sm text-foreground-dim font-mono">
              ∅ No posts yet
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-sm font-medium text-foreground">
            <span className="text-foreground-dim">$</span>{" "}
            {dict["home.recent_notes"]}
          </h2>
          <Link
            href="/notes"
            className="text-xs font-mono text-foreground-dim hover:text-foreground transition-colors"
          >
            {dict["home.view_all"]} →
          </Link>
        </div>
        <div className="rounded-lg border border-border p-2">
          <HomeNoteTree nodes={noteTree} />
        </div>
      </div>
    </section>
  );
}
