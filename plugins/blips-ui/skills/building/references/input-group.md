# Input Group

Import: `@blips/ui/components/input-group`

Campo com ícone, prefixo/sufixo, botão, atalho ou barra de ferramentas colados,
dentro de uma mesma borda. Use em busca, URL, senha com "mostrar", campo de
chat com botão de enviar, contador de caracteres. Não monte isso com `div` +
`absolute` em volta de um `Input`.

Exports (iguais nas duas versões): `InputGroup`, `InputGroupAddon`,
`InputGroupButton`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea`.

| Componente | Descrição |
|---|---|
| `InputGroup` | Contêiner `role="group"` com a borda, o foco (`focus-within`) e o estado de erro (quando o controle tem `aria-invalid`). |
| `InputGroupInput` | `Input` sem borda nem anel próprios (`data-slot="input-group-control"`). |
| `InputGroupTextarea` | `Textarea` sem borda, `resize-none`. Com ele o grupo fica de altura automática. |
| `InputGroupAddon` | Área de ícone/texto/botão. Prop `align`: `"inline-start"` (padrão, à esquerda), `"inline-end"` (à direita), `"block-start"` (faixa em cima), `"block-end"` (faixa embaixo). Clicar no addon foca o input. |
| `InputGroupText` | Texto discreto dentro do addon (prefixo `https://`, contador). |
| `InputGroupButton` | `Button` compacto para dentro do addon. Props: `variant` (padrão `"ghost"`), `size` (`"xs"` padrão, `"sm"`, `"icon-xs"`, `"icon-sm"`), `type` (padrão `"button"`). |

## Notas comuns

- A ordem no JSX não importa: o `align` do addon decide a posição (`order-first`/`order-last`). Escreva o controle primeiro e os addons depois.
- Botão só com ícone: `aria-label` ou `<span className="sr-only">`.
- Erro: `aria-invalid` no `InputGroupInput`/`InputGroupTextarea` (o grupo inteiro fica vermelho).
- Em react-hook-form, espalhe o `field` no `InputGroupInput`/`InputGroupTextarea` (dentro de `Field` ou `FormControl`).
- Ícones Phosphor.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

- `InputGroupButton` repassa ao `Button` Base UI: troque o elemento com `render` (sem `asChild`). Para usá-lo como gatilho de Tooltip/Dropdown/Popover, passe-o no `render` do trigger.
- Tamanhos: grupo `h-7`; texto do addon `text-xs/relaxed`; ícones do addon `size-3.5`; padding `pl-2`/`pr-2`. `InputGroupButton`: `xs` `h-5`, `sm` herda o Button (`h-6`), `icon-xs` `size-6`, `icon-sm` `size-7`.
- Foco: `border-ring` + `ring-2 ring-ring/30`.
- `Kbd` dentro do addon ganha estilo automático.
- Além do clique, Enter/Espaço no addon também focam o input (extensão Blips para acessibilidade).

```tsx
import {
  ArrowUpIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";
import { Kbd } from "@blips/ui/components/kbd";
import { Separator } from "@blips/ui/components/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";

export function ExemplosInputGroup() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      {/* Busca com atalho */}
      <InputGroup>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>

      {/* Prefixo + botão com tooltip */}
      <InputGroup>
        <InputGroupInput placeholder="exemplo.com.br" className="pl-1!" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  size="icon-xs"
                  className="rounded-full"
                  aria-label="Informações"
                />
              }
            >
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>Domínio sem o protocolo.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>

      {/* Chat com barra embaixo */}
      <InputGroup>
        <InputGroupTextarea placeholder="Pergunte qualquer coisa..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" size="icon-xs" className="rounded-full" aria-label="Anexar">
            <PlusIcon />
          </InputGroupButton>
          <InputGroupText className="ml-auto">52% usado</InputGroupText>
          <Separator orientation="vertical" className="data-vertical:h-4" />
          <InputGroupButton variant="default" size="icon-xs" className="rounded-full">
            <ArrowUpIcon />
            <span className="sr-only">Enviar</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

Dropdown no addon: `<DropdownMenuTrigger render={<InputGroupButton size="icon-xs" aria-label="Mais opções" />}>`.

## v2.x — Radix

- `InputGroupButton` é o `Button` Radix: aceita `asChild`. Como gatilho de Tooltip/Dropdown/Popover, use `TooltipTrigger asChild` envolvendo o `InputGroupButton`.
- Tamanhos: grupo `h-9`; texto do addon `text-sm`; ícones `size-4`; padding `pl-3`/`pr-3`. `InputGroupButton`: `xs` `h-6`, `sm` `h-8`, `icon-xs` `size-6`, `icon-sm` `size-8`.
- Foco: `ring-1 ring-ring`.

```tsx
import { Info, MagnifyingGlass } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export function ExemplosInputGroup() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon>
          <MagnifyingGlass />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="exemplo.com.br" className="pl-1!" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs" className="rounded-full" aria-label="Informações">
                <Info />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>Domínio sem o protocolo.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea placeholder="Descreva o problema" rows={4} />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums">0/100 caracteres</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

## Exemplos na docs

`input-group-demo`, `input-group-icon`, `input-group-text`, `input-group-button`, `input-group-tooltip`, `input-group-dropdown`, `input-group-spinner`, `input-group-kbd`, `input-group-textarea`, `input-group-custom` (em `apps/docs/examples/`, escritos para a v3).
