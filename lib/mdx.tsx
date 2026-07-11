import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { ComponentProps, ReactNode } from "react";

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "plaintext",
};

function Code({ children, ...props }: ComponentProps<"code">) {
  return (
    <code {...props} className="text-sm">
      {children}
    </code>
  );
}

function Pre({ children, ...props }: ComponentProps<"pre">) {
  return (
    <pre {...props} className="!bg-surface-alt/50 !border-border">
      {children}
    </pre>
  );
}

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  );
}

function Th({ children, ...props }: ComponentProps<"th">) {
  return (
    <th
      {...props}
      className="border border-border px-3 py-2 text-left font-mono text-xs text-foreground bg-surface-alt/50"
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }: ComponentProps<"td">) {
  return (
    <td
      {...props}
      className="border border-border px-3 py-2 text-sm text-foreground-dim"
    >
      {children}
    </td>
  );
}

const components = {
  code: Code,
  pre: Pre,
  table: Table,
  th: Th,
  td: Td,
};

export async function renderMDX(content: string) {
  return (
    <MDXRemote
      source={content}
      components={components as MDXRemoteProps["components"]}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
