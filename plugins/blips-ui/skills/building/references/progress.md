# Progress

Import: `@blips/ui/components/progress`

Barra de progresso determinado (upload, etapas concluídas). Para espera sem
porcentagem, use Spinner (ou, na v3, `value={null}`). Para carregar conteúdo,
Skeleton.

## Notas comuns

- `value` de 0 a 100 (com `max` padrão 100).
- Dê nome acessível: rótulo visível (na v3, `ProgressLabel`) ou `aria-label`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/progress`. Exports: `Progress`, `ProgressTrack`,
`ProgressIndicator`, `ProgressLabel`, `ProgressValue`.

| Componente | Descrição |
|---|---|
| `Progress` | Root como contêiner `flex flex-wrap gap-3`. Renderiza os `children` (rótulo, valor) e **depois** desenha a barra (`ProgressTrack > ProgressIndicator`) sozinho. |
| `ProgressTrack` | Trilho `h-1 w-full rounded-md bg-muted` (`data-slot="progress-track"`). |
| `ProgressIndicator` | Preenchimento `bg-primary`, dimensionado por largura pelo Base UI. |
| `ProgressLabel` | Rótulo `text-xs/relaxed font-medium`, ligado por `aria-labelledby`. |
| `ProgressValue` | Valor formatado (`ml-auto tabular-nums`). Aceita render function: `children(formattedValue, value)`. |

| Prop (Progress) | Tipo | Notas |
|---|---|---|
| `value` | `number \| null` | `null` = indeterminado (`data-indeterminate`). |
| `min` / `max` | `number` | `0` / `100`. |
| `format` | `Intl.NumberFormatOptions` | Formato do `ProgressValue`. |
| `locale`, `getAriaValueText`, `render` | | Sem `asChild`. |

Estado: `data-progressing`, `data-complete`, `data-indeterminate`.

```tsx
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@blips/ui/components/progress";

export function EnvioArquivo({ progresso }: { progresso: number | null }) {
  return (
    <Progress value={progresso} className="w-full max-w-sm">
      <ProgressLabel>Envio do contrato</ProgressLabel>
      <ProgressValue>
        {(formatado) => (progresso === null ? "Aguarde..." : formatado)}
      </ProgressValue>
    </Progress>
  );
}
```

Barra mais grossa ou de outra cor: o `className` do `Progress` cai no contêiner,
não na barra. Mire o track/indicador por seletor:

```tsx
<Progress
  value={72}
  aria-label="Meta do mês"
  className="[&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-indicator]]:bg-emerald-500"
/>
```

### Armadilhas

- `className="h-3"` no `Progress` não engrossa a barra (vai para o contêiner): use o seletor acima.
- Não aninhe `<ProgressTrack>` dentro de `<Progress>`: o Root já desenha o dele, e você terá duas barras. Para montar a barra à mão, use as primitivas `@base-ui/react/progress` com `ProgressTrack`/`ProgressIndicator` dentro.
- `ProgressTrack`, `ProgressIndicator`, `ProgressLabel` e `ProgressValue` vêm do subpath `@blips/ui/components/progress`.

## v2.x — Radix

Primitiva: `@radix-ui/react-progress`. Export: só `Progress`.

`Progress` é a própria barra (`relative h-2 w-full rounded-full bg-primary/20`);
o indicador se move por `translateX`. `className` estiliza a barra (`h-3`,
`bg-*`). Props: `value` (`number | null`), `max`, `getValueLabel`, `asChild`.
Estado: `data-state="loading" | "complete" | "indeterminate"`.

```tsx
import { Progress } from "@blips/ui/components/progress"

export function EnvioArquivo({ progresso }: { progresso: number }) {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Envio do contrato</span>
        <span className="text-muted-foreground tabular-nums">{progresso}%</span>
      </div>
      <Progress value={progresso} aria-label="Envio do contrato" />
    </div>
  )
}
```

## Exemplos na docs

`progress-demo`, `progress-label`, `progress-values`, `progress-controlled`, `progress-indeterminate` (em `apps/docs/examples/`, escritos para a v3).
