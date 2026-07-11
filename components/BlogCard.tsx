"use client";

import Link from "next/link";

type BlogCardProps = {
  slug: string;
  title: string;
  formattedDate: string;
  date: string;
  tags: string[];
  readTime: number;
  readTimeLabel: string;
  excerpt: string;
};

export default function BlogCard({
  slug,
  title,
  formattedDate,
  date,
  tags,
  readTime,
  readTimeLabel,
  excerpt,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="p-4 rounded-lg border border-border hover:border-border-bright hover:bg-surface-alt/50 transition-all">
        <div className="flex items-center gap-3 text-xs font-mono text-foreground-dim mb-2">
          <time dateTime={date}>{formattedDate}</time>
          <span>·</span>
          <span>
            {readTime} {readTimeLabel}
          </span>
        </div>

        <h3 className="font-mono font-medium text-foreground group-hover:text-accent transition-colors mb-1.5">
          {title}
        </h3>

        <p className="text-sm text-foreground-dim line-clamp-2 mb-3 leading-relaxed">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-tag-bg text-tag-fg border border-tag-border"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
