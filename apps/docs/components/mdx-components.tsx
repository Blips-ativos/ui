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
 * Mapa de componentes MDX no padrão shadcn/ui: a tipografia é estilizada
 * elemento a elemento com utilitárias do Tailwind (sem `prose`/Typography),
 * o que evita conflitos como o pill de `code` vazando para o bloco de código.
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
  h1: ({ className, children, id, ...props }: React.ComponentProps<"h1">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h1
        id={headingId}
        className={cn(
          "font-display mt-2 scroll-m-28 text-3xl font-bold tracking-tight",
          className
        )}
        {...props}
      >
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h1>
    );
  },
  h2: ({ className, children, id, ...props }: React.ComponentProps<"h2">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h2
        id={headingId}
        className={cn(
          "font-display mt-10 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+h3]:mt-6! [&+p]:mt-4!",
          className
        )}
        {...props}
      >
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h2>
    );
  },
  h3: ({ className, children, id, ...props }: React.ComponentProps<"h3">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h3
        id={headingId}
        className={cn(
          "font-display mt-12 scroll-m-28 text-lg font-medium tracking-tight [&+p]:mt-4!",
          className
        )}
        {...props}
      >
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h3>
    );
  },
  h4: ({ className, children, id, ...props }: React.ComponentProps<"h4">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h4
        id={headingId}
        className={cn(
          "font-display mt-8 scroll-m-28 text-base font-medium tracking-tight",
          className
        )}
        {...props}
      >
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h4>
    );
  },
  h5: ({ className, children, id, ...props }: React.ComponentProps<"h5">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h5
        id={headingId}
        className={cn(
          "mt-8 scroll-m-28 text-base font-medium tracking-tight",
          className
        )}
        {...props}
      >
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h5>
    );
  },
  h6: ({ className, children, id, ...props }: React.ComponentProps<"h6">) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h6
        id={headingId}
        className={cn(
          "mt-8 scroll-m-28 text-base font-medium tracking-tight",
          className
        )}
        {...props}
      >
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h6>
    );
  },
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
    <strong className={cn("font-medium", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="no-scrollbar my-6 w-full overflow-y-auto rounded-xl border">
      <table
        className={cn(
          "relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr className={cn("m-0 border-b", className)} {...props} />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
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
    <figure className={cn(className)} {...props} />
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
    className,
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
    // Código inline
    if (typeof props.children === "string") {
      return (
        <code
          className={cn(
            "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none",
            className
          )}
          {...props}
        />
      );
    }

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

    // Bloco de código padrão com botão de copiar
    return (
      <>
        {__raw__ && <CopyButton value={__raw__} />}
        <code className={className} {...props} />
      </>
    );
  },
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-display mt-8 scroll-m-32 text-lg font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
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
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      className={cn("mt-6 rounded-md border", className)}
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
        "text-muted-foreground hover:text-primary data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none!",
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
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  ComponentPreview,
  Kbd,
  ColorTokens,
  BrandAssets,
};
