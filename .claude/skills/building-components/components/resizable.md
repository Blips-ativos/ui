# Resizable
**Categoria:** Compound | **Deps:** `react-resizable-panels`, `lucide-react` | **"use client":** Sim

Exports: ResizablePanelGroup, ResizablePanel, ResizableHandle

ResizableHandle has optional `withHandle` prop for visual grip icon.

Usage:
```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@blips/ui"

<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">Panel 1</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">Panel 2</div>
  </ResizablePanel>
</ResizablePanelGroup>
```
