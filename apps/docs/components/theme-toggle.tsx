"use client";

import { Button } from "@blips/ui/components/button";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      aria-label="Alternar tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden [html.dark_&]:block" />
      <Moon className="block [html.dark_&]:hidden" />
    </Button>
  );
}
