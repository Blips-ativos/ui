# Skeleton

**Categoria:** Primitive | **Deps:** Nenhuma externa | **"use client":** Não

## Source

```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }
```

## Usage

```tsx
import { Skeleton } from "@blips/ui"

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-12 w-12 rounded-full" />
<div className="space-y-3">
  <Skeleton className="h-[125px] w-full rounded-xl" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```
