# Input

Import: `@blips/ui/components/input`

Campo de texto de uma linha. Props: `React.ComponentProps<"input">` (todos os
atributos HTML, inclusive `type`). Sem variantes: **não existem** `size`,
`variant` nem `inputVariants` em nenhuma versão; ajuste com `className`.

Export (igual nas duas versões): `Input`.

## Notas comuns

- Estado de erro: `aria-invalid` deixa a borda e o anel em `destructive`. Com `FormControl`/`Field`, isso vem automático.
- `type="file"` já tem estilo para o botão do arquivo.
- Com ícone, prefixo, sufixo ou botão colado, use `InputGroup` (veja `input-group.md`), não um `div` com `absolute`.
- Máscaras (CPF, CNPJ, telefone, moeda, CEP): veja `components/forms/masks.md` (listado no `SKILL.md`).

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferenças só de implementação e visual:

| | v2.x — Radix | v3.x — Base UI |
|---|---|---|
| Elemento | `<input>` nativo | `Input` de `@base-ui/react/input` (integra com o Field do Base UI); continua renderizando `<input>` |
| Altura / padding | `h-9 px-3`, `shadow-xs` | `h-7 px-2`, sem sombra, `bg-input/20` |
| Texto | `text-base md:text-sm` | `text-sm md:text-xs/relaxed` |
| Foco | `ring-[3px] ring-ring/50` | `ring-2 ring-ring/30` |

```tsx
import { Button } from "@blips/ui/components/button";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";

export function Campos() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" placeholder="voce@empresa.com" />
        <p className="text-muted-foreground text-xs">Usado para login.</p>
      </div>

      <div className="flex items-center gap-2">
        <Input type="search" placeholder="Buscar" />
        <Button type="submit">Buscar</Button>
      </div>

      <Input id="arquivo" type="file" />
      <Input disabled placeholder="Não editável" />
      <Input aria-invalid placeholder="Campo com erro" />
    </div>
  );
}
```

Em formulário com validação, use `Field` (`field.md`) ou `Form` (`form.md`), que ligam `id`, `aria-describedby` e `aria-invalid`.

## Exemplos na docs

`input-demo`, `input-with-label`, `input-description`, `input-button`, `input-file`, `input-disabled`, `input-invalid`, `input-form` (em `apps/docs/examples/`, escritos para a v3).
