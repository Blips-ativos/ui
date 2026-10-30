# Textarea

Import: `@blips/ui/components/textarea`

Campo de texto multilinha. `<textarea>` nativo nas duas versões, com
`field-sizing-content` (cresce com o conteúdo) e `min-h-16`. Props:
`React.ComponentProps<"textarea">`. Sem variantes.

Export (igual nas duas versões): `Textarea`.

## Notas comuns

- Estado de erro por `aria-invalid` (automático dentro de `FormControl`/`Field`).
- Para limitar altura, use `max-h-*` + `overflow-auto`; para altura fixa, `field-sizing-fixed` + `rows`.
- Com botões ou contador colados, use `InputGroupTextarea` (veja `input-group.md`).

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferenças visuais:

| | v2.x — Radix | v3.x — Base UI |
|---|---|---|
| Redimensionar | livre (padrão do navegador) | **`resize-none`** por padrão; reabilite com `className="resize-y"` |
| Padding / texto | `px-3`, `text-base md:text-sm`, `shadow-xs` | `px-2`, `text-sm md:text-xs/relaxed`, `bg-input/20` |
| Foco | `ring-[3px] ring-ring/50` | `ring-2 ring-ring/30` |

```tsx
import { Label } from "@blips/ui/components/label";
import { Textarea } from "@blips/ui/components/textarea";

export function Observacoes() {
  return (
    <div className="grid w-full max-w-md gap-1.5">
      <Label htmlFor="observacoes">Observações</Label>
      <Textarea id="observacoes" placeholder="Detalhes do atendimento" />
      <p className="text-muted-foreground text-xs">
        Visível só para o time interno.
      </p>
    </div>
  );
}
```

Com react-hook-form, envolva em `FormControl` (veja `form.md`):

```tsx
<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea placeholder="Fale um pouco sobre você" {...field} />
      </FormControl>
      <FormDescription>Até 160 caracteres.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Exemplos na docs

`textarea-demo`, `textarea-with-label`, `textarea-disabled`, `textarea-invalid` (em `apps/docs/examples/`, escritos para a v3).
