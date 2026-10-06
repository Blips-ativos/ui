# Separator

Import: `@blips/ui/components/separator`

Linha fina (horizontal ou vertical) para dividir grupos de conteúdo. Cor `bg-border`.

Export (igual nas duas versões): `Separator`.

## Notas comuns

- `orientation`: `"horizontal"` (padrão) ou `"vertical"`.
- Horizontal: `h-px w-full`. Vertical: `w-px` e altura do contêiner flex.
- Uso típico: header com `SidebarTrigger` + separador vertical + breadcrumb; listas; seções de card ou popover.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/separator`. Props: `SeparatorPrimitive.Props`
(`orientation`, `className` string ou função de estado, `render`).

- **Não existe `decorative`**: passar a prop quebra o typecheck. O separador é sempre semântico (`role="separator"` + `aria-orientation`). Para algo puramente visual, passe `role="none"` / `aria-hidden` ou use um `<div>`.
- Estilos por orientação: `data-horizontal:` / `data-vertical:`. Vertical usa `self-stretch` (não `h-full`).

```tsx
import { Separator } from "@blips/ui/components/separator";

export function SeparatorDemo() {
  return (
    <div className="text-xs">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">Blips UI</h4>
        <p className="text-muted-foreground">Biblioteca de componentes da Blips.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Código</span>
      </div>
    </div>
  );
}
```

No header com sidebar:

```tsx
<header className="flex h-12 items-center gap-2 px-4">
  <SidebarTrigger className="-ml-1" />
  <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
  <Breadcrumb>…</Breadcrumb>
</header>
```

### Armadilhas

- `data-[orientation=vertical]:h-4` não casa com o separador v3: use `data-vertical:h-4`.

## v2.x — Radix

Primitiva: `@radix-ui/react-separator`.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direção. |
| `decorative` | `boolean` | `true` (padrão da lib) | `true` renderiza `role="none"`; `false` renderiza `role="separator"`. |
| `asChild` | `boolean` | `false` | Troca o elemento. |

Estilos por orientação: `data-[orientation=horizontal]:` / `data-[orientation=vertical]:`. Vertical usa `h-full`.

```tsx
import { Separator } from "@blips/ui/components/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Blips UI</h4>
        <p className="text-sm text-muted-foreground">Biblioteca de componentes da Blips.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
      </div>
    </div>
  )
}
```

No header com sidebar: `<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />`.

## Exemplos na docs

`separator-demo`, `separator-list`, `separator-vertical-menu` (em `apps/docs/examples/`, escritos para a v3).
