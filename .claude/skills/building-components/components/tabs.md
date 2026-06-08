# Tabs

**Categoria:** Compound | **Deps:** `@radix-ui/react-tabs` | **"use client":** Não

## Exports
Tabs, TabsList, TabsTrigger, TabsContent

## Uso

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@blips/ui"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo 1</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>
```
