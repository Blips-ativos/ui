# Menubar

Import: `@blips/ui/components/menubar`

Barra horizontal de menus no estilo de aplicativo desktop (Arquivo, Editar,
Exibir). Use em editores e ferramentas densas. Para um único menu de ações, use
Dropdown Menu (`dropdown-menu.md`); para navegação do site, Navigation Menu.

Exports (iguais nas duas versões, 16 nomes): `Menubar`, `MenubarMenu`,
`MenubarTrigger`, `MenubarContent`, `MenubarPortal`, `MenubarGroup`,
`MenubarLabel`, `MenubarItem`, `MenubarShortcut`, `MenubarSeparator`,
`MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`,
`MenubarSubTrigger`, `MenubarSubContent`.

## Notas comuns

- Estrutura: `Menubar` > `MenubarMenu` (um por menu) > `MenubarTrigger` + `MenubarContent` > itens.
- `MenubarContent` padrão: `align="start"`, `alignOffset={-4}`, `sideOffset={8}`.
- `MenubarItem`: `inset` (alinha com itens que têm indicador), `variant` (`"default"` ou `"destructive"`), `disabled`.
- `MenubarShortcut` é só texto à direita (`⌘T`): não registra o atalho.
- `MenubarCheckboxItem`: `checked` + `onCheckedChange`. `MenubarRadioGroup`: `value` + `onValueChange`; `MenubarRadioItem`: `value`.
- O comportamento de item (clique, manter aberto, label em grupo) segue o Dropdown Menu da mesma versão: veja `dropdown-menu.md`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitivas: `Menubar` de `@base-ui/react/menubar` na raiz; cada menu é um `Menu`
do Base UI. Os `Menubar*` são wrappers finos sobre os `DropdownMenu*` da lib.

| Componente | Notas |
|---|---|
| `Menubar` | `orientation`, `loopFocus`, `modal`, `disabled`. **Não existem** `value`/`onValueChange`/`defaultValue` (qual menu está aberto). |
| `MenubarMenu` | É o `DropdownMenu` (`Menu.Root`): controle cada menu com `open` / `onOpenChange(open, eventDetails)`. Sem `value`. |
| `MenubarTrigger` | Troque o elemento com `render`. Aberto: `aria-expanded` / `data-popup-open`. |
| `MenubarItem` | `onClick` (não `onSelect`); `closeOnClick={false}` mantém o menu aberto. |
| `MenubarLabel` | É `Menu.GroupLabel`: **precisa ficar dentro de `MenubarGroup`**. |
| `MenubarCheckboxItem` / `MenubarRadioItem` | Indicador `CheckIcon` à **esquerda** (`pl-7.5`). `onCheckedChange(checked, eventDetails)`. |

Visual: raiz `h-9 rounded-lg border p-1`, itens `min-h-7 text-xs/relaxed`, popup `rounded-lg ring-1 ring-foreground/10`.

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@blips/ui/components/menubar";

export function MenuDoEditor() {
  const [regua, setRegua] = React.useState(true);
  const [tema, setTema] = React.useState("system");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => criarAba()}>
            Nova aba <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Compartilhar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Copiar link</MenubarItem>
              <MenubarItem>E-mail</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Excluir</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={regua} onCheckedChange={setRegua}>
            Mostrar régua
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Tema</MenubarLabel>
            <MenubarRadioGroup value={tema} onValueChange={setTema}>
              <MenubarRadioItem value="light">Claro</MenubarRadioItem>
              <MenubarRadioItem value="dark">Escuro</MenubarRadioItem>
              <MenubarRadioItem value="system">Sistema</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### Armadilhas

- `MenubarItem onSelect` não dispara: use `onClick`. `event.preventDefault()` não mantém aberto: use `closeOnClick={false}`.
- `MenubarLabel` solto quebra: envolva em `MenubarGroup`.
- `data-[state=open]:` no trigger não casa: use `aria-expanded:` ou `data-popup-open:`.

## v2.x — Radix

Primitiva: `@radix-ui/react-menubar`.

| Componente | Notas |
|---|---|
| `Menubar` | `value` / `onValueChange` / `defaultValue` (qual menu está aberto), `loop`, `dir`. |
| `MenubarMenu` | `value`. |
| `MenubarTrigger` | `asChild`. Aberto: `data-state="open"`. |
| `MenubarItem` | `onSelect`; `event.preventDefault()` no `onSelect` mantém aberto. |
| `MenubarLabel` | Pode ficar solto. |
| `MenubarCheckboxItem` | Indicador `Check` à esquerda. `onCheckedChange(checked)`. |
| `MenubarRadioItem` | Indicador `Circle` preenchido (bolinha) à esquerda. |
| `MenubarSubTrigger` | `CaretRight` à direita. |

Visual: raiz `h-9 rounded-md border shadow-xs`, itens `text-sm py-1.5`.

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@blips/ui/components/menubar"

export function MenuDoEditor() {
  const [regua, setRegua] = React.useState(true)
  const [tema, setTema] = React.useState("system")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => criarAba()}>
            Nova aba <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Excluir</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={regua} onCheckedChange={setRegua}>
            Mostrar régua
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Tema</MenubarLabel>
          <MenubarRadioGroup value={tema} onValueChange={setTema}>
            <MenubarRadioItem value="light">Claro</MenubarRadioItem>
            <MenubarRadioItem value="dark">Escuro</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
```

## Exemplos na docs

`menubar-demo`, `menubar-icons`, `menubar-radio` (em `apps/docs/examples/`, escritos para a v3).
