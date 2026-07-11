import Link from "next/link";

type NoteCardProps = {
  slug: string;
  name: string;
  type: "file" | "folder";
};

export default function NoteCard({ slug, name, type }: NoteCardProps) {
  return (
    <Link
      href={type === "file" ? `/notes?note=${slug}` : "#"}
      className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-bright hover:bg-surface-alt/50 transition-all"
    >
      <span className="font-mono text-sm text-foreground-dim shrink-0">
        {type === "folder" ? "▣" : "▸"}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-sm text-foreground group-hover:text-foreground transition-colors truncate">
          {name}
        </p>
        <p className="text-[10px] font-mono text-foreground-dim mt-0.5">
          {type === "folder" ? "directory" : "note"}
        </p>
      </div>
    </Link>
  );
}
