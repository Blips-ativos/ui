import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: "Blips UI",
      }}
      sidebar={{ defaultOpenLevel: 1 }}
      tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}
