# Accordion

Import: `@blips/ui/components/accordion`

Seções empilhadas que expandem e recolhem. Use para FAQ, grupos de configurações e
conteúdo secundário que não precisa estar sempre visível.

Exports (iguais nas duas versões): `Accordion`, `AccordionItem`, `AccordionTrigger`,
`AccordionContent`.

## Notas comuns

- Ícone do trigger é Phosphor (nunca lucide).
- A animação usa os utilitários `animate-accordion-down` / `animate-accordion-up` do `globals.css` da lib.
- Cada `AccordionItem` precisa de um `value` único.
- `AccordionContent` aplica o `className` na `div` interna (o padding fica certo sem brigar com a animação de altura).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/accordion`.

### Sub-componentes

| Componente | Descrição |
|---|---|
| `Accordion` | `Accordion.Root`. Já vem como caixa com borda: `flex w-full flex-col overflow-hidden rounded-md border`. |
| `AccordionItem` | `Accordion.Item`. `not-last:border-b`; item aberto ganha `data-open:bg-muted/50`. |
| `AccordionTrigger` | `Accordion.Header` + `Accordion.Trigger`. `p-2 text-xs/relaxed font-medium`. Alterna `CaretDownIcon`/`CaretUpIcon` (`data-slot="accordion-trigger-icon"`) conforme `aria-expanded`. |
| `AccordionContent` | `Accordion.Panel`. Anima com `--accordion-panel-height`. Div interna: `pt-0 pb-4`, links sublinhados, `mb-4` entre parágrafos. |

### Props

**Accordion (Root)**

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `multiple` | `boolean` | `false` | Permite vários itens abertos. Sem ele, só um fica aberto. |
| `defaultValue` | `any[]` | — | Itens abertos de início (não controlado). **Sempre array**, mesmo com um item só. |
| `value` | `any[]` | — | Itens abertos (controlado). Sempre array. |
| `onValueChange` | `(value: any[], eventDetails) => void` | — | Mudança dos itens abertos. |
| `disabled` | `boolean` | `false` | Desabilita o accordion inteiro. |
| `hiddenUntilFound` | `boolean` | `false` | Deixa a busca do navegador (Ctrl+F) achar e abrir painéis fechados. |
| `keepMounted` | `boolean` | `false` | Mantém os painéis no DOM fechados. |

Não existem `type` nem `collapsible`: todo item fecha ao clicar de novo.

**AccordionItem**: `value` (identificador), `disabled`, `onOpenChange(open, eventDetails)`.

**AccordionTrigger**: `render`, `nativeButton`. Estado: `data-panel-open`, `aria-expanded`; desabilitado vira `aria-disabled`.

**AccordionContent**: `keepMounted`, `hiddenUntilFound`. Estado: `data-open`/`data-closed`, `data-starting-style`/`data-ending-style`.

### Exemplos

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";

export function FaqAccordion() {
  return (
    <Accordion defaultValue={["item-1"]} className="max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>É acessível?</AccordionTrigger>
        <AccordionContent>Sim. Segue o padrão WAI-ARIA.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Já vem estilizado?</AccordionTrigger>
        <AccordionContent>
          Sim. Usa os mesmos tokens dos outros componentes da lib.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

Vários abertos ao mesmo tempo:

```tsx
<Accordion multiple defaultValue={["notificacoes", "privacidade"]}>
  <AccordionItem value="notificacoes">
    <AccordionTrigger>Notificações</AccordionTrigger>
    <AccordionContent>Escolha como receber alertas.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="privacidade">
    <AccordionTrigger>Privacidade</AccordionTrigger>
    <AccordionContent>Controle o compartilhamento de dados.</AccordionContent>
  </AccordionItem>
</Accordion>
```

Controlado:

```tsx
const [abertos, setAbertos] = React.useState<string[]>([]);

<Accordion value={abertos} onValueChange={setAbertos}>
  {/* itens */}
</Accordion>
```

Sem a caixa com borda padrão: `<Accordion className="rounded-none border-0">`.

### Armadilhas

- `defaultValue="item-1"` (string) não abre nada: use `["item-1"]`.
- Seletores de consumidor: `data-open:` / `group-data-open:`; `data-[state=open]:` não casa.

## v2.x — Radix

Primitiva: `@radix-ui/react-accordion`.

### Sub-componentes

| Componente | Descrição |
|---|---|
| `Accordion` | `AccordionPrimitive.Root`, sem estilo próprio (sem borda externa). |
| `AccordionItem` | `border-b last:border-b-0`. |
| `AccordionTrigger` | `py-4 text-sm font-medium hover:underline`. Ícone `CaretDown` que gira 180° com `[&[data-state=open]>svg]:rotate-180`. |
| `AccordionContent` | `text-sm`, anima com `--radix-accordion-content-height`. Div interna: `pt-0 pb-4`. |

### Props

**Accordion (Root)**

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | **obrigatório** | Um ou vários itens abertos. |
| `collapsible` | `boolean` | `false` | Com `type="single"`, permite fechar o item aberto clicando de novo. |
| `defaultValue` | `string` (single) \| `string[]` (multiple) | — | Itens abertos de início. |
| `value` | `string` \| `string[]` | — | Controlado. |
| `onValueChange` | `(value: string \| string[]) => void` | — | Mudança dos itens abertos. |
| `disabled` | `boolean` | `false` | Desabilita tudo. |

**AccordionItem**: `value` (obrigatório), `disabled`.
**AccordionTrigger**: `asChild`. Estado: `data-state="open" | "closed"`.
**AccordionContent**: `forceMount`. Estado: `data-state`.

### Exemplos

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion"

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Informações do produto</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Nosso produto principal combina tecnologia e design.</p>
          <p>Inclui processamento avançado e interface intuitiva.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Entrega</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Entrega padrão em 3 a 5 dias úteis; expressa em 1 a 2.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

Vários abertos:

```tsx
<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Seção um</AccordionTrigger>
    <AccordionContent>Conteúdo um</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Seção dois</AccordionTrigger>
    <AccordionContent>Conteúdo dois</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Exemplos na docs

`accordion-demo`, `accordion-basic`, `accordion-multiple`, `accordion-disabled`, `accordion-borders`, `accordion-card` (em `apps/docs/examples/`, escritos para a v3).
