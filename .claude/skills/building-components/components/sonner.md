# Sonner (Toaster)

**Categoria:** Composition | **Deps:** `sonner`, `next-themes`, `lucide-react` | **"use client":** Sim

## Exports
Toaster

## Features
Integrates `useTheme()` from next-themes. Custom icons: CircleCheck, OctagonX, TriangleAlert, Info, LoaderCircle.

## Usage

```tsx
// In layout
import { Toaster } from "@blips/ui"
<Toaster />

// Trigger toasts
import { toast } from "sonner"
toast("Event created")
toast.success("Saved successfully")
toast.error("Something went wrong")
toast.warning("Check your input")
toast.info("New update available")
toast.loading("Processing...")

// With action
toast("File deleted", {
  action: { label: "Undo", onClick: () => console.log("Undo") },
})
```
