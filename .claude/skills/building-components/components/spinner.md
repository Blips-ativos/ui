# Spinner

**Categoria:** Primitive | **Deps:** `lucide-react` | **"use client":** Não

## Source

```tsx
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2Icon>) {
  return <Loader2Icon className={cn("animate-spin", className)} role="status" aria-label="Loading" {...props} />
}

export { Spinner }
```

## Usage

```tsx
import { Spinner } from "@blips/ui"
<Spinner />
<Spinner className="size-8" />
```
