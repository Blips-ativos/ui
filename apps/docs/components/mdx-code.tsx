import { cn } from "@blips/ui/lib/utils";
import type { ComponentProps } from "react";
import { CodeBlockCommand } from "@/components/code-block-command";
import { CopyButton } from "@/components/copy-button";

/**
 * MDX overrides for code blocks rendered by rehype-pretty-code (shadcn-style):
 * - npm-command blocks render package-manager tabs (npm/pnpm/yarn/bun)
 * - other blocks get a copy button
 * - inline code keeps the muted pill style
 */
export const mdxCodeComponents = {
  pre: ({ className, children, ...props }: ComponentProps<"pre">) => (
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
  figure: ({ className, ...props }: ComponentProps<"figure">) => (
    <figure className={cn(className)} {...props} />
  ),
  figcaption: ({ className, ...props }: ComponentProps<"figcaption">) => (
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
  }: ComponentProps<"code"> & {
    __raw__?: string;
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
  }) => {
    // Inline code
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

    // Package-manager command block → tabs
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

    // Default code block with a copy button
    return (
      <>
        {__raw__ && <CopyButton value={__raw__} />}
        <code className={className} {...props} />
      </>
    );
  },
};
