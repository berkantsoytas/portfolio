type ProjectCardProps = {
  name: string;
  description: string;
  tags: string[];
  url?: string;
  source?: string;
};

export default function ProjectCard({
  name,
  description,
  tags,
  url,
  source,
}: ProjectCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border hover:border-border-bright hover:bg-surface-alt/50 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-mono text-sm font-medium text-foreground">
          {name}
        </h4>
        <div className="flex gap-2 shrink-0">
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-foreground-dim hover:text-foreground transition-colors"
            >
              &lt;/&gt;
            </a>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-foreground-dim hover:text-foreground transition-colors"
            >
              ↗
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-foreground-dim mb-3 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-mono rounded bg-surface-hover text-foreground-dim border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
