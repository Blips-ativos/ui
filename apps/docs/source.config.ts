import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { transformers } from "@/lib/highlight-code";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    // Replace fumadocs' default code highlighter with rehype-pretty-code
    // (shadcn/ui's docs pipeline) so code blocks get line numbers, titles,
    // line highlighting and the package-manager command metadata.
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers,
        },
      ]);

      return plugins;
    },
  },
});
