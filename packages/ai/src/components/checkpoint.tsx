"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/checkpoint.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Button } from "@blips/ui/components/button";
import { Separator } from "@blips/ui/components/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import { cn } from "@blips/ui/lib/utils";
import type { IconProps } from "@phosphor-icons/react";
import { BookmarkSimpleIcon } from "@phosphor-icons/react";
import type { ComponentProps, HTMLAttributes } from "react";

export type CheckpointProps = HTMLAttributes<HTMLDivElement>;

export const Checkpoint = ({
  className,
  children,
  ...props
}: CheckpointProps) => (
  <div
    className={cn(
      "flex items-center gap-0.5 overflow-hidden text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
    <Separator />
  </div>
);

export type CheckpointIconProps = IconProps;

export const CheckpointIcon = ({
  className,
  children,
  ...props
}: CheckpointIconProps) =>
  children ?? (
    <BookmarkSimpleIcon
      className={cn("size-4 shrink-0", className)}
      {...props}
    />
  );

export type CheckpointTriggerProps = ComponentProps<typeof Button> & {
  tooltip?: string;
};

export const CheckpointTrigger = ({
  children,
  variant = "ghost",
  size = "sm",
  tooltip,
  ...props
}: CheckpointTriggerProps) =>
  tooltip ? (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button size={size} type="button" variant={variant} {...props} />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Button size={size} type="button" variant={variant} {...props}>
      {children}
    </Button>
  );
