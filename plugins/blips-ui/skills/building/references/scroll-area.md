# Scroll Area

Import: `@blips/ui/components/scroll-area`

Área rolável com barra de rolagem estilizada e igual em todos os navegadores. Use
em listas longas dentro de painéis, popovers e cards. Precisa de altura (ou
largura) limitada para rolar.

Exports (iguais nas duas versões): `ScrollArea`, `ScrollBar`.

## Notas comuns

- `ScrollArea` já renderiza Viewport + `ScrollBar` vertical + Corner. O elemento que rola é o Viewport (`data-slot="scroll-area-viewport"`).
- Rolagem horizontal: adicione `<ScrollBar orientation="horizontal" />` dentro do `ScrollArea` e dê ao conteúdo `flex` sem quebra (`w-max` ou `shrink-0` nos filhos).
- Barra fina (`w-2.5`/`h-2.5`) com thumb `rounded-full bg-border`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/scroll-area`.

- `ScrollArea`: `ScrollArea.Root.Props` (`overflowEdgeThreshold`, `render`). **Não existem** `type` (`auto`/`always`/`scroll`/`hover`) nem `scrollHideDelay`.
- `ScrollBar`: `orientation` (`"vertical"` padrão), `keepMounted` (no lugar de `forceMount`).
- Estado para estilizar: `data-horizontal`/`data-vertical`, `data-hovering`, `data-scrolling` na barra; no Root, `data-has-overflow-x`/`-y` e `data-overflow-*`. A barra se esconde quando não há overflow.

```tsx
import { ScrollArea } from "@blips/ui/components/scroll-area";
import { Separator } from "@blips/ui/components/separator";

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);

export function ListaDeVersoes() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Versões</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-xs">
            {tag}
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

Barra que só aparece ao rolar ou passar o mouse:

```tsx
<ScrollBar className="opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100" />
```

## v2.x — Radix

Primitiva: `@radix-ui/react-scroll-area`.

- `ScrollArea`: `type` (`"hover"` padrão Radix; também `"auto"`, `"always"`, `"scroll"`), `scrollHideDelay` (ms), `dir`, `asChild`.
- `ScrollBar`: `orientation`, `forceMount`.
- Estado: `data-state="visible" | "hidden"`, `data-orientation`.

```tsx
import { ScrollArea, ScrollBar } from "@blips/ui/components/scroll-area"

export function Galeria({ fotos }: { fotos: { id: string; src: string }[] }) {
  return (
    <ScrollArea type="always" className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {fotos.map((foto) => (
          <img key={foto.id} src={foto.src} alt="" className="h-40 w-32 rounded-md object-cover" />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

## Exemplos na docs

`scroll-area-demo`, `scroll-area-horizontal-demo` (em `apps/docs/examples/`, escritos para a v3).
