import { Kbd } from "@blips/ui/components/kbd";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";
import { cn } from "@blips/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { BrandAssets } from "@/components/brand/brand-assets";
import { ColorTokens } from "@/components/brand/color-tokens";
import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentPreview } from "@/components/component-preview";
import { CopyButton } from "@/components/copy-button";

/**
 * Mapa de componentes MDX. A tipografia vem do shadcn/typeset: a página envolve
 * o MDX em `.typeset.typeset-docs` e os elementos saem sem classes. Aqui só
 * fica comportamento — âncora dos títulos, tabela rolável, blocos de código —
 * e os componentes embutidos. Componentes da @blips/ui têm `data-slot` e ficam
 * fora do typeset sozinhos; os blocos do rehype-pretty-code saem com
 * `data-not-typeset` para manter a própria moldura.
 */

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return "";
}

function getHeadingId(children: React.ReactNode) {
  const id = getNodeText(children)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/'/g, "")
    .replace(/\?/g, "")
    .toLowerCase();
  return id || undefined;
}

function HeadingAnchor({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  if (!id) return children;

  return (
    <a className="group no-underline" href={`#${id}`}>
      <span className="underline-offset-4 group-hover:underline">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="text-muted-foreground ml-2 opacity-0 group-hover:opacity-100"
      >
        #
      </span>
    </a>
  );
}

export const mdxComponents = {
  h1: ({ children, id, ...props }: React.ComponentProps<"h1">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h1 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h1>
    );
  },
  h2: ({ children, id, ...props }: React.ComponentProps<"h2">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h2 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h2>
    );
  },
  h3: ({ children, id, ...props }: React.ComponentProps<"h3">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h3 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h3>
    );
  },
  h4: ({ children, id, ...props }: React.ComponentProps<"h4">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h4 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h4>
    );
  },
  h5: ({ children, id, ...props }: React.ComponentProps<"h5">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h5 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h5>
    );
  },
  h6: ({ children, id, ...props }: React.ComponentProps<"h6">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h6 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h6>
    );
  },
  table: (props: React.ComponentProps<"table">) => (
    <div className="typeset-scroll">
      <table {...props} />
    </div>
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className={cn(
        "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => (
    <figure
      // Bloco de código: moldura própria (globals.css), fora do typeset.
      data-not-typeset={
        "data-rehype-pretty-code-figure" in props ? "" : undefined
      }
      className={cn(className)}
      {...props}
    />
  ),
  figcaption: ({ className, ...props }: React.ComponentProps<"figcaption">) => (
    <figcaption
      className={cn(
        "text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
        className
      )}
      {...props}
    />
  ),
  code: ({
    __raw__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string;
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
  }) => {
    // Bloco de comando de gerenciador de pacotes → abas
    if (__npm__ && __yarn__ && __pnpm__ && __bun__) {
      return (
        <CodeBlockCommand
          __npm__={__npm__}
          __yarn__={__yarn__}
          __pnpm__={__pnpm__}
          __bun__={__bun__}
        />
      );
    }

    // Código inline (estilizado pelo typeset) ou bloco com botão de copiar
    return (
      <>
        {__raw__ && <CopyButton value={__raw__} />}
        <code {...props} />
      </>
    );
  },
  Step: (props: React.ComponentProps<"h3">) => <h3 {...props} />,
  Steps: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8 [&>h3]:step",
        className
      )}
      {...props}
    />
  ),
  Image: ({
    src,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      src={(src as string) || ""}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "justify-start gap-4 rounded-none bg-transparent px-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "text-muted-foreground hover:text-primary data-active:border-primary data-active:text-foreground rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-active:bg-transparent data-active:shadow-none!",
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative *:[figure]:first:mt-0 [&>.steps]:mt-6",
        className
      )}
      {...props}
    />
  ),
  Link,
  ComponentPreview,
  Kbd,
  ColorTokens,
  BrandAssets,
};
