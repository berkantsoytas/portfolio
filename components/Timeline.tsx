type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
  title: string;
};

export default function Timeline({ items, title }: TimelineProps) {
  return (
    <div>
      <h3 className="font-mono text-sm font-medium text-foreground mb-6">
        # {title}
      </h3>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} className="relative pl-6 pb-8 last:pb-0">
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border last:hidden" />
            <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-border-bright bg-surface flex items-center justify-center">
              <div className="w-[5px] h-[5px] rounded-full bg-foreground-dim" />
            </div>

            <div>
              <span className="text-xs font-mono text-foreground-dim">
                {item.period}
              </span>
              <h4 className="font-mono text-sm font-medium text-foreground mt-0.5">
                {item.title}
              </h4>
              <p className="text-xs font-mono text-foreground-dim mt-0.5">
                {item.subtitle}
              </p>
              <p className="text-sm text-foreground-dim mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
