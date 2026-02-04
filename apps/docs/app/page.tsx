import { Button } from "@blips/ui/components/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Blips UI
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          A modern React component library built with Radix UI primitives and
          Tailwind CSS. Beautiful, accessible, and customizable.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components/button">Components</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
