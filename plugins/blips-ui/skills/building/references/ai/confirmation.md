# Confirmation

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Pedido de aprovação humana para uma chamada de ferramenta (human-in-the-loop):
mostra a pergunta e os botões enquanto a aprovação está pendente, e a
mensagem de "autorizado" ou "recusado" depois da resposta. É um `Alert` da
@blips/ui com slots que aparecem conforme `state` e `approval`. Adaptado do
`confirmation` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** quando a tool exige aprovação antes de executar (AI SDK:
  `needsApproval` na tool → part em `approval-requested`; Agno: tool com
  confirmação do usuário, mapeada para os mesmos estados).
- **Não use** para confirmar ação do próprio usuário na UI (excluir,
  descartar): isso é `AlertDialog` da @blips/ui.
- **Não use** para exibir parâmetros/resultado: isso é `tool.md`. Os dois
  combinam: `Confirmation` dentro do `ToolContent`.

## Import

```tsx
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@blips/ai/components/confirmation";
```

## Peers exigidos

Nenhum em runtime. `ai` só para tipos (`ToolUIPart["state"]`); use
`import type`.

## API

| Componente | Props reais | Notas |
|---|---|---|
| `Confirmation` | `state: ToolUIPart["state"]` (obrigatório), `approval?: { id: string; approved?: boolean; reason?: string }`, mais props do `Alert` da @blips/ui | **Renderiza `null`** sem `approval` ou com `state` `input-streaming`/`input-available`. Classe base `flex flex-col gap-2`. |
| `ConfirmationTitle` | props do `AlertDescription` | `inline`. Coloque os três slots abaixo dentro dele. |
| `ConfirmationRequest` | `children?` | Só aparece em `approval-requested`. |
| `ConfirmationAccepted` | `children?` | Só com `approval.approved === true` e `state` em `approval-responded`, `output-denied` ou `output-available`. |
| `ConfirmationRejected` | `children?` | Só com `approval.approved === false` e os mesmos três estados. |
| `ConfirmationActions` | props de `<div>` | Só em `approval-requested`. `flex justify-end gap-2 self-end`. |
| `ConfirmationAction` | props do `Button` da @blips/ui | `type="button"`, `h-8 px-3 text-sm` por padrão; `variant` livre. |

Os slots leem o contexto do `Confirmation`; fora dele, lançam erro.

## Composição com a @blips/ui

- Dentro do `Tool` (`ToolContent`) ou logo abaixo do `ToolHeader`, no
  `MessageContent` do `Message` da @blips/ui.
- Ações: `ConfirmationAction` é um `Button` (Base UI) — `variant="outline"`
  para recusar, padrão para autorizar. Ícones Phosphor.
- A resposta é do app: no AI SDK,
  `addToolApprovalResponse({ id: part.approval.id, approved })` do
  `useChat`; no Agno, a chamada de continuação do run com a decisão.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@blips/ai/components/confirmation";
import type { ToolPart } from "@blips/ai/components/tool";
import { CheckIcon, XIcon } from "@phosphor-icons/react";

export function AprovarFerramenta({
  part,
  onResponder,
}: {
  part: ToolPart;
  onResponder: (id: string, approved: boolean) => void;
}) {
  return (
    <Confirmation approval={part.approval} state={part.state}>
      <ConfirmationTitle>
        <ConfirmationRequest>
          O agente quer emitir a segunda via do boleto. Autoriza?
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <CheckIcon className="inline size-4" /> Você autorizou a emissão.
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <XIcon className="inline size-4" /> Você recusou a emissão.
        </ConfirmationRejected>
      </ConfirmationTitle>
      <ConfirmationActions>
        <ConfirmationAction
          onClick={() => part.approval && onResponder(part.approval.id, false)}
          variant="outline"
        >
          Recusar
        </ConfirmationAction>
        <ConfirmationAction
          onClick={() => part.approval && onResponder(part.approval.id, true)}
        >
          Autorizar
        </ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  );
}
```

## Armadilhas

- **Some sem `approval`.** Se o seu mapeamento de eventos não preencher
  `approval.id`, nada aparece, nem a pergunta. Confira o objeto antes de
  culpar o componente.
- **Some em `input-available`.** É proposital: a tool ainda não pediu
  aprovação.
- **Textos todos seus.** Não há texto padrão; escreva pergunta e respostas
  em pt-BR.
- **`part.approval` é opcional no tipo.** Guarde (`part.approval && …`) antes
  de ler `id` no `onClick`.
