# Toast

Import: `@blips/ui/components/toast`

> **Só existe na v3.x.** Em repo v2 (`@blips/ui` 2.x) este Toast não existe: use o
> Sonner (`sonner.md`), que existe nas duas versões. Veja `v2-vs-v3.md`.

Notificações efêmeras sobre o `Toast` do Base UI (`@base-ui/react/toast`), com
gerenciador próprio (`toast.add(...)`), pilha animada, gesto de arrastar para
dispensar, ícone por tipo, ação e botão de fechar. **O padrão do projeto
continua sendo o Sonner** (`sonner.md`); use este Toast só quando o repo já o
adotou ou quando precisar do controle do Base UI (prioridade, `update`, dados
customizados). Não use os dois no mesmo app.

Exports: `Toaster`, `toast`, `createToastManager`, `useToastManager`,
`ToastProvider`, `ToastPortal`, `ToastViewport`, `Toast`, `ToastContent`,
`ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`.

## Como funciona

- **`Toaster` é um Provider e envolve o app** (`<Toaster>{children}</Toaster>`): ele monta o Provider, o Portal, o Viewport (canto inferior direito, `max-w-sm`) e a lista de toasts. Props: `toastManager` (padrão: o `toast` exportado pela lib), `timeout` (ms, padrão do Base UI), `limit` (quantos ficam visíveis).
- **`toast`** é um gerenciador global criado com `createToastManager()`. Pode ser chamado de qualquer lugar (inclusive fora de componentes):
  - `toast.add({ title, description, type, timeout, priority, actionProps, onClose, data })` → retorna o `id`.
  - `toast.update(id, { … })`, `toast.close(id?)` (sem id fecha todos).
  - `toast.promise(promise, { loading, success, error })` (cada um string, opções ou função do resultado).
- `type` decide o ícone: `"success"` (`CheckCircleIcon`), `"info"` (`InfoIcon`), `"warning"` (`WarningIcon`), `"error"` (`XCircleIcon` vermelho), `"loading"` (`SpinnerIcon` girando). Sem `type`, sem ícone.
- `actionProps` vira o botão de ação (`Button variant="outline" size="sm"`): `{ children: "Desfazer", onClick() { … } }`.
- O botão de fechar (`Button variant="ghost" size="icon-sm"`, `XIcon`) tem `aria-label` em inglês ("Close toast"); para pt-BR, monte a lista à mão com `ToastClose aria-label="Fechar"`.
- `useToastManager()` (dentro do Provider) devolve `{ toasts, add, close, update, promise }`.
- Peças (`Toast`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`) servem para montar uma lista customizada dentro de `ToastProvider` + `ToastPortal` + `ToastViewport`, iterando `useToastManager().toasts` e passando `toast={item}` ao `Toast`.

## Exemplo

```tsx
// app/layout.tsx
import { Toaster } from "@blips/ui/components/toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster limit={3}>{children}</Toaster>
      </body>
    </html>
  );
}
```

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import { toast } from "@blips/ui/components/toast";

export function AcoesDoEvento({
  salvarEvento,
}: {
  salvarEvento: () => Promise<{ nome: string }>;
}) {
  function criar() {
    const id = toast.add({
      type: "success",
      title: "Evento criado",
      description: "Domingo, 3 de dezembro às 9h",
      actionProps: {
        children: "Desfazer",
        onClick() {
          toast.close(id);
          toast.add({ description: "Criação do evento desfeita." });
        },
      },
    });
  }

  function salvar() {
    toast.promise(salvarEvento(), {
      loading: "Salvando evento…",
      success: (evento) => `${evento.nome} salvo.`,
      error: "Não foi possível salvar o evento.",
    });
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={criar}>Criar evento</Button>
      <Button variant="outline" onClick={salvar}>Salvar</Button>
    </div>
  );
}
```

Vários `Toaster` na mesma página (ex.: demos isoladas): crie um gerenciador por
instância com `createToastManager()` e passe em `toastManager`.

## Armadilhas

- `<Toaster />` solto no fim do `body` (como no Sonner) não fornece contexto para `useToastManager`: ele precisa **envolver** quem usa o hook. O `toast` global funciona em qualquer caso, desde que exista um `Toaster` montado com o mesmo gerenciador.
- Conflito de nomes com o Sonner: os dois exportam `Toaster` e `toast`. Não importe os dois no mesmo arquivo sem alias. (No barrel `@blips/ui`, o `Toaster` deste componente sai como `ToastToaster`; pelo subpath `@blips/ui/components/toast`, que é o import recomendado, chama-se `Toaster`.)
- Não há `toast.success(...)`: o tipo vai em `toast.add({ type: "success", … })`.

## Exemplos na docs

`toast-demo`, `toast-types`, `toast-action`, `toast-promise` (em `apps/docs/examples/`).
