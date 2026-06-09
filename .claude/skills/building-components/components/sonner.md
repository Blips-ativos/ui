# Sonner (Toaster)

**Categoria:** Composition | **Deps:** `sonner`, `next-themes`, `@phosphor-icons/react` | **"use client":** Sim

## Exports
Toaster

## Recursos
Integra `useTheme()` do next-themes. Ícones customizados: CircleCheck, OctagonX, TriangleAlert, Info, LoaderCircle.

## Uso

```tsx
// No layout
import { Toaster } from "@blips/ui"
<Toaster />

// Disparar toasts
import { toast } from "sonner"
toast("Evento criado")
toast.success("Salvo com sucesso")
toast.error("Algo deu errado")
toast.warning("Verifique os dados informados")
toast.info("Nova atualização disponível")
toast.loading("Processando...")

// Com ação
toast("Arquivo excluído", {
  action: { label: "Desfazer", onClick: () => console.log("Undo") },
})
```
