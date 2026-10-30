# Sheet

Import: `@blips/ui/components/sheet`

Painel que desliza de uma borda da tela, sobre um overlay. Use para detalhe de
registro, edição sem sair da lista, filtros avançados. Para confirmação curta,
Dialog ou Alert Dialog; para gaveta com gesto no mobile, Drawer.

Exports (iguais nas duas versões): `Sheet`, `SheetTrigger`, `SheetClose`,
`SheetContent`, `SheetHeader`, `SheetBody`, `SheetSection`, `SheetSectionTitle`,
`SheetFooter`, `SheetTitle`, `SheetDescription`. `SheetPortal` e `SheetOverlay`
são internos (não exportados). Não existe `sheetVariants`.

## Notas comuns

- `SheetContent` props da lib: `side` (`"top" | "right" | "bottom" | "left"`, padrão `"right"`) e `showCloseButton` (padrão `true`, botão X no canto).
- Laterais: `h-full w-3/4 sm:max-w-sm` (alargue com `className="sm:max-w-lg"`). Topo/base: largura total, altura automática.
- `SheetTitle` é obrigatório para acessibilidade (use `className="sr-only"` se não quiser mostrá-lo).
- **Extensões Blips** (não existem no shadcn):
  - `SheetBody`: área rolável entre header e footer (`flex-1 overflow-auto`); zera o próprio padding quando contém `SheetSection`.
  - `SheetSection`: bloco com `border-t` e padding.
  - `SheetSectionTitle`: título discreto da seção (`font-medium text-muted-foreground mb-4`).
- `SheetFooter` usa `mt-auto` para ficar no rodapé.
- Em `Sidebar` mobile, a lib já usa Sheet por dentro (veja `sidebar.md`).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `Dialog` de `@base-ui/react/dialog`.

| Componente | Notas |
|---|---|
| `Sheet` | `Dialog.Root`. `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `modal`, `disablePointerDismissal`. |
| `SheetTrigger` / `SheetClose` | Troque o elemento com `render={<Button … />}`. Sem `asChild`. |
| `SheetContent` | `Dialog.Popup` + Backdrop. `data-side={side}`. Props do Popup: `initialFocus`, `finalFocus`. Painel `bg-popover text-xs/relaxed`; overlay `bg-black/80` com `backdrop-blur-xs`. Botão de fechar é `<Button variant="ghost" size="icon-sm">` com `XIcon`. |
| `SheetHeader` / `SheetFooter` / `SheetBody` / `SheetSection` | padding `p-6`. |
| `SheetTitle` | `text-sm font-medium font-heading`. |
| `SheetDescription` | `text-xs/relaxed text-muted-foreground`. |

Estado: `data-open`/`data-closed`; animação por `data-starting-style`/`data-ending-style`.

```tsx
import { Button } from "@blips/ui/components/button";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetSection,
  SheetSectionTitle,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet";

export function EditarCliente() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Editar</SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Editar cliente</SheetTitle>
          <SheetDescription>As mudanças valem ao salvar.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetSectionTitle>Dados gerais</SheetSectionTitle>
            <div className="grid gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" defaultValue="Ana Souza" />
            </div>
          </SheetSection>
          <SheetSection>
            <SheetSectionTitle>Contato</SheetSectionTitle>
            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" />
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <Button type="submit">Salvar</Button>
          <SheetClose render={<Button variant="outline" />}>Cancelar</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

Controlado, impedindo fechar por clique fora:

```tsx
<Sheet open={aberto} onOpenChange={setAberto} disablePointerDismissal>
  <SheetContent side="left" showCloseButton={false}>…</SheetContent>
</Sheet>
```

### Armadilhas

- `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `onOpenAutoFocus`, `onCloseAutoFocus`, `forceMount` não existem no `SheetContent`. Dismiss se controla no `Sheet` (`disablePointerDismissal`, ou `onOpenChange` checando `eventDetails.reason` e chamando `eventDetails.cancel()`); foco por `initialFocus`/`finalFocus`.
- `className` com `data-[state=open]:` não casa: use `data-open:` / `data-starting-style:`.
- Não aninhe `<Button>` dentro de `SheetTrigger`/`SheetClose`: passe-o em `render`.

## v2.x — Radix

Primitiva: `@radix-ui/react-dialog`.

| Componente | Notas |
|---|---|
| `Sheet` | `open`, `defaultOpen`, `onOpenChange(open)`, `modal`. |
| `SheetTrigger` / `SheetClose` | `asChild` com um `Button`. |
| `SheetContent` | `Dialog.Content` + Overlay. Aceita `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `onOpenAutoFocus`, `onCloseAutoFocus`, `forceMount`. Painel `bg-background gap-4`; overlay `bg-black/50`. Botão de fechar é um `<button>` com ícone `X`. |
| `SheetHeader` / `SheetFooter` / `SheetBody` / `SheetSection` | padding `p-4`. |
| `SheetTitle` | `font-semibold`. |
| `SheetDescription` | `text-sm text-muted-foreground`. |

Estado: `data-state="open" | "closed"`.

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetSection,
  SheetSectionTitle,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet"

export function EditarCliente() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar</Button>
      </SheetTrigger>
      <SheetContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Editar cliente</SheetTitle>
          <SheetDescription>As mudanças valem ao salvar.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetSectionTitle>Dados gerais</SheetSectionTitle>
            {/* campos */}
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <Button type="submit">Salvar</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

## Exemplos na docs

`sheet-demo`, `sheet-side`, `sheet-sections`, `sheet-no-close-button` (em `apps/docs/examples/`, escritos para a v3).
