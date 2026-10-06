# Navigation Menu

Import: `@blips/ui/components/navigation-menu`

Menu de navegação de site (header de marketing, docs) com painéis que abrem no
hover/clique. Não use para navegação de app interno: lá a convenção é Sidebar
(`sidebar.md`). Para ações, Dropdown Menu; para barra estilo desktop, Menubar.

## Notas comuns

- Estrutura: `NavigationMenu` > `NavigationMenuList` > `NavigationMenuItem` > (`NavigationMenuTrigger` + `NavigationMenuContent`) ou `NavigationMenuLink`.
- Item sem painel (link direto no topo): `NavigationMenuLink` com `className={navigationMenuTriggerStyle()}`.
- `navigationMenuTriggerStyle` (cva) aplica o visual do trigger a qualquer elemento.
- `NavigationMenuLink` aceita `active` (link da página atual, `data-active`).
- O trigger mostra um caret Phosphor que gira quando aberto.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/navigation-menu`. Exports: `NavigationMenu`,
`NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`,
`NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`,
`navigationMenuTriggerStyle`, **`NavigationMenuPositioner`** (novo),
`NavigationMenuViewport`.

| Componente | Notas |
|---|---|
| `NavigationMenu` | `value` / `defaultValue` / `onValueChange(value, eventDetails)`, **`delay`** e **`closeDelay`** (no Root), `orientation`, e a prop da lib **`align`** (`"start"` padrão) para o popup. Monta sozinho o `NavigationMenuPositioner` (Portal + Positioner + Popup + Viewport). |
| `NavigationMenuContent` | Renderizado **sempre** dentro do popup posicionado. `keepMounted`. |
| `NavigationMenuLink` | `render` para usar o `Link` do framework (`render={<Link href="/x" />}`), `active`, `closeOnClick`. `text-xs/relaxed`, `flex-row gap-1.5`. |
| `NavigationMenuTrigger` | `h-9 text-xs rounded-lg`. Aberto: `data-popup-open`. Sem `asChild`. |
| `NavigationMenuPositioner` | `side` (`"bottom"`), `sideOffset` (`8`), `align` (`"start"`), `alignOffset` (`0`). Só para compor um popup próprio. |
| `NavigationMenuViewport` | Wrapper do Viewport do Base UI. O `NavigationMenu` já renderiza um; use só ao montar seu próprio Positioner/Popup (senão duplica). |
| `NavigationMenuIndicator` | Baseado em `NavigationMenu.Icon`; não há a seta animada sob a lista do Radix. |

A prop `viewport` continua no tipo, mas está **`@deprecated` e não faz nada**: o
modo `viewport={false}` (painel inline abaixo do item) não existe no Base UI.

Estado: `data-popup-open`/`data-open` no trigger; animação por
`data-starting-style`/`data-ending-style`/`data-activation-direction`.

```tsx
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@blips/ui/components/navigation-menu";

export function MenuDoSite() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-96 gap-1 p-1">
              <li>
                <NavigationMenuLink render={<Link href="/locacao" />}>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Locação</span>
                    <span className="text-muted-foreground line-clamp-2">
                      Equipamentos com pagamento mensal.
                    </span>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/docs" />}
            className={navigationMenuTriggerStyle()}
          >
            Documentação
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Armadilhas

- `viewport={false}` (ou `viewport={isMobile}`) não tem efeito: no mobile, troque o menu por uma Sheet/Drawer.
- `delayDuration`/`skipDelayDuration` não existem: `delay`/`closeDelay` no `NavigationMenu` (o Trigger não tem delay).
- `asChild` não existe no Link nem no Trigger: use `render`.
- `--radix-navigation-menu-viewport-*` virou `--popup-width`/`--popup-height`/`--positioner-*`.

## v2.x — Radix

Primitiva: `@radix-ui/react-navigation-menu`. Exports: `NavigationMenu`,
`NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`,
`NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`,
`NavigationMenuViewport`, `navigationMenuTriggerStyle`.

| Componente | Notas |
|---|---|
| `NavigationMenu` | `value`/`onValueChange(value)`, `delayDuration`, `skipDelayDuration`, `orientation`, e a prop da lib **`viewport`** (padrão `true`). Com `viewport`, renderiza o `NavigationMenuViewport` (painel compartilhado, animado); com `viewport={false}`, cada `NavigationMenuContent` aparece inline sob o item. |
| `NavigationMenuLink` | `asChild` para o `Link` do framework; `active`. `flex-col gap-1 text-sm`. |
| `NavigationMenuTrigger` | `asChild`. Aberto: `data-state="open"`. |
| `NavigationMenuIndicator` | Seta que acompanha o trigger ativo. |

```tsx
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@blips/ui/components/navigation-menu"

export function MenuDoSite({ isMobile }: { isMobile: boolean }) {
  return (
    <NavigationMenu viewport={!isMobile}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-96 gap-2 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/locacao">
                    <div className="text-sm font-medium">Locação</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      Equipamentos com pagamento mensal.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Documentação</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

## Exemplos na docs

`navigation-menu-demo` (em `apps/docs/examples/`, escrito para a v3).
