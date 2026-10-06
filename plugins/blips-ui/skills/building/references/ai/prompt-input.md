# PromptInput

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/prompt-input`

Caixa de envio de um chat com agente: `<form>` com textarea que cresce com o
conteúdo, Enter envia e Shift+Enter quebra linha (respeitando IME), anexos por
clique, colar ou arrastar (com validação de tipo, tamanho e quantidade), botão
de envio que vira "parar" durante o streaming, menu de ações, seletor de modelo
e paletas (`Command`, `HoverCard`). Monta sobre o `InputGroup` da @blips/ui
(`../input-group.md`).

## Quando usar (e quando não)

- **Use** como entrada de qualquer chat com agente/LLM, com ou sem anexos.
- **Não use** para campo de busca ou formulário comum: `InputGroup` +
  `InputGroupTextarea` da @blips/ui bastam e não carregam a lógica de anexos.
- **Não use** para chat humano-humano sem IA se não precisa de status de
  streaming: o `InputGroup` resolve.
- A lista de anexos **não é desenhada** pelo PromptInput: você lê os arquivos
  com `usePromptInputAttachments()` e desenha com o `Attachment` da @blips/ui
  (`../attachment.md`) dentro do `PromptInputHeader`.

## Peers exigidos

Nenhum peer de runtime. `nanoid` e `@phosphor-icons/react` são dependências
da @blips/ai.

`ai` é peer opcional e só de tipos (`ChatStatus`, `FileUIPart`,
`SourceDocumentUIPart`), nenhum código de runtime. Como a @blips/ai publica o
fonte `.tsx`, num projeto TypeScript instale como **devDependency** para o
compilador resolver os tipos:

```bash
pnpm add @blips/ai
pnpm add -D ai
```

## API

### `PromptInput` (o `<form>`)

`Omit<HTMLAttributes<HTMLFormElement>, "onSubmit" | "onError">` mais:

| Prop | Tipo | Notas |
|---|---|---|
| `onSubmit` | `(message: { text: string; files: FileUIPart[] }, event) => void \| Promise<void>` | **Obrigatória.** Os anexos chegam com `url` convertida de `blob:` para data URL. Limpa os anexos se não lançar (ou se a Promise resolver); se lançar/rejeitar, mantém os anexos. O **texto**: no modo não controlado, o `form.reset()` roda **antes** do `onSubmit`, então o texto some mesmo com erro; com `PromptInputProvider`, o texto também só é limpo no sucesso. |
| `accept` | `string` | Ex.: `"image/*,application/pdf"`. Vazio = qualquer tipo. |
| `multiple` | `boolean` | Seleção múltipla no seletor de arquivos. |
| `maxFiles` | `number` | Excedentes são descartados com `onError`. |
| `maxFileSize` | `number` | Em bytes. |
| `onError` | `(err: { code: "max_files" \| "max_file_size" \| "accept"; message: string }) => void` | `message` vem em inglês: mostre seu texto pt-BR a partir do `code` (ex.: `toast`). |
| `globalDrop` | `boolean` | Aceita arquivo solto em qualquer lugar da página. Padrão: só no form. |
| `syncHiddenInput` | `boolean` | Legado do upstream, sem efeito prático. Não use. |

### Partes

| Export | Props | Notas |
|---|---|---|
| `PromptInputBody` | `HTMLAttributes<HTMLDivElement>` | `display: contents`; agrupa o textarea. |
| `PromptInputTextarea` | Props do `InputGroupTextarea` | `name="message"`, `field-sizing-content max-h-48 min-h-16`. Placeholder padrão **em inglês** ("What would you like to know?"): passe `placeholder`. Enter envia (não envia se o submit estiver `disabled`); Backspace com campo vazio remove o último anexo; colar arquivo anexa. `onKeyDown` seu roda antes; `preventDefault()` cancela o comportamento interno. |
| `PromptInputHeader` | Props do `InputGroupAddon` (sem `align`) | Linha acima do textarea (`order-first`), para anexos/fontes. |
| `PromptInputFooter` | Props do `InputGroupAddon` (sem `align`) | Linha abaixo, `justify-between`: ferramentas à esquerda, envio à direita. |
| `PromptInputTools` | `HTMLAttributes<HTMLDivElement>` | Agrupa botões/menus do rodapé. |
| `PromptInputButton` | Props do `InputGroupButton` + `tooltip?: string \| { content: ReactNode; shortcut?: string; side? }` | `variant="ghost"`; `size` automático: `icon-sm` com 1 filho, `sm` com ícone + texto. |
| `PromptInputSubmit` | Props do `InputGroupButton` + `status?: ChatStatus`, `onStop?: () => void` | `variant="default"`, `size="icon-sm"`. Ícone por status: `ArrowBendDownLeftIcon` (pronto), `Spinner` (`submitted`), `SquareIcon` (`streaming`), `XIcon` (`error`). Com `onStop` e status `submitted`/`streaming`, vira `type="button"` e chama `onStop`. `aria-label` padrão "Submit"/"Stop" (inglês): sobrescreva. |
| `PromptInputActionMenu` / `…Trigger` / `…Content` / `…Item` | `DropdownMenu` da @blips/ui (Base UI Menu) | Trigger é um `PromptInputButton` (padrão `PlusIcon`). `Content` com `align="start"`. Item usa `onClick` (não `onSelect`). |
| `PromptInputActionAddAttachments` | Props do `DropdownMenuItem` + `label?: string` | Abre o seletor de arquivos. Label padrão em inglês ("Add photos or files"). |
| `PromptInputActionAddScreenshot` | Props do `DropdownMenuItem` + `label?: string` | Captura a tela (`getDisplayMedia`) e anexa PNG. Label padrão "Take screenshot". |
| `PromptInputSelect` / `…Trigger` / `…Content` / `…Item` / `…Value` | `Select` da @blips/ui (Base UI) | Seletor de modelo/agente. Trigger sem borda e `text-muted-foreground`. Passe `items` no `PromptInputSelect` para o valor exibir o rótulo. |
| `PromptInputHoverCard` / `…Trigger` / `…Content` | `HoverCard` da @blips/ui (Base UI PreviewCard) | `Trigger` com `delay`/`closeDelay` (padrão 0) e `<a>` por padrão; `Content` com `align="start"`. |
| `PromptInputCommand` / `…Input` / `…List` / `…Empty` / `…Group` / `…Item` / `…Separator` | `Command` da @blips/ui | Paleta (ex.: "/" para comandos, "@" para fontes). |
| `PromptInputTabsList` / `…Tab` / `…TabLabel` / `…TabBody` / `…TabItem` | `div`/`h3` estilizados | Listas dentro de um hover card. |

### Estado e hooks

| Export | Uso |
|---|---|
| `PromptInputProvider` (`initialInput?: string`) | Opcional. Sobe o estado (texto + anexos) para fora do `PromptInput`, para ler/escrever o texto de outro lugar (ex.: `Suggestion` que preenche o campo). Sem ele, o PromptInput é não controlado. |
| `usePromptInputController()` | Dentro do provider: `{ textInput: { value, setInput, clear }, attachments }`. Lança fora do provider. |
| `usePromptInputAttachments()` | Dentro do `PromptInput` (ou provider): `{ files, add, remove, clear, openFileDialog, fileInputRef }`. `files` são `FileUIPart & { id }`. |
| `useProviderAttachments()` | Anexos do provider, fora do `PromptInput`. |
| `usePromptInputReferencedSources()` | `{ sources, add, remove, clear }` de `SourceDocumentUIPart`, local ao `PromptInput`. |
| tipos | `PromptInputMessage`, `AttachmentsContext`, `TextInputContext`, `ReferencedSourcesContext`, `PromptInputControllerProps`, `PromptInputButtonTooltip` e os `*Props`. |

## Composição com a @blips/ui

- A moldura é o `InputGroup` (borda, foco, `aria-invalid`); `PromptInputHeader`
  e `PromptInputFooter` são `InputGroupAddon align="block-end"`.
- Anexos: `AttachmentGroup` + `Attachment size="sm"` da @blips/ui no
  `PromptInputHeader`, com `AttachmentAction` para remover.
- Seletor de modelo: mesma API do `Select` v3 (`items`, `onValueChange(value,
  eventDetails)`); ver `../select.md`.
- Erros de anexo: `toast` do `Sonner` da @blips/ui.
- Sugestões (`suggestion.md`) ficam acima do PromptInput, fora do form.

## Exemplo v3

```tsx
"use client";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@blips/ai/components/prompt-input";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import { FileTextIcon, XIcon } from "@phosphor-icons/react";
import type { ChatStatus } from "ai";
import { useState } from "react";

const agentes = [
  { label: "Salvador (suporte)", value: "salvador" },
  { label: "Aurora (importação)", value: "aurora" },
];

function AnexosDoPrompt() {
  const { files, remove } = usePromptInputAttachments();
  if (files.length === 0) {
    return null;
  }
  return (
    <PromptInputHeader>
      <AttachmentGroup>
        {files.map((file) => (
          <Attachment key={file.id} size="sm">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.filename}</AttachmentTitle>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label={`Remover ${file.filename}`}
                onClick={() => remove(file.id)}
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </AttachmentGroup>
    </PromptInputHeader>
  );
}

export function CaixaDeEnvio({
  status,
  onEnviar,
  onParar,
}: {
  status: ChatStatus;
  onEnviar: (mensagem: PromptInputMessage, agente: string) => void;
  onParar: () => void;
}) {
  const [agente, setAgente] = useState("salvador");
  const gerando = status === "submitted" || status === "streaming";

  return (
    <PromptInput
      accept="image/*,application/pdf"
      maxFileSize={10 * 1024 * 1024}
      multiple
      onSubmit={(mensagem) => onEnviar(mensagem, agente)}
    >
      <AnexosDoPrompt />
      <PromptInputBody>
        <PromptInputTextarea placeholder="Pergunte sobre contratos, boletos ou chamados…" />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger aria-label="Mais ações" />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments label="Anexar fotos ou arquivos" />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <PromptInputSelect
            items={agentes}
            onValueChange={(valor) => {
              if (typeof valor === "string") {
                setAgente(valor);
              }
            }}
            value={agente}
          >
            <PromptInputSelectTrigger size="sm">
              <PromptInputSelectValue />
            </PromptInputSelectTrigger>
            <PromptInputSelectContent>
              {agentes.map((a) => (
                <PromptInputSelectItem key={a.value} value={a.value}>
                  {a.label}
                </PromptInputSelectItem>
              ))}
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>
        <PromptInputSubmit
          aria-label={gerando ? "Parar resposta" : "Enviar mensagem"}
          onStop={onParar}
          status={status}
        />
      </PromptInputFooter>
    </PromptInput>
  );
}
```

Com o AI SDK: `onEnviar={(m) => sendMessage({ text: m.text, files: m.files })}`,
`status` do `useChat()` e `onParar={stop}`. Com eventos próprios (AgentOS),
o app mantém o `status` (`submitted` ao enviar, `streaming` no primeiro
evento de conteúdo, `ready` no fim, `error` na falha). Ver
`../../components/ai-chat.md`.

## Armadilhas

- Textos padrão em inglês (placeholder, `aria-label` "Submit"/"Stop", labels do
  menu, `message` do `onError`): passe os seus em pt-BR. O `<input type="file">`
  escondido tem `aria-label="Upload files"` fixo, sem como trocar.
- **Sem `onStop`, o botão continua `type="submit"` durante o streaming**:
  clicar envia de novo. Sempre passe `onStop` junto de `status`.
- `PromptInputActionMenuTrigger` com `tooltip` quebra (o trigger do menu tenta
  aplicar o `render` no Tooltip). Use `aria-label`, sem `tooltip`, no trigger do
  menu.
- `DropdownMenuItem` do Base UI não tem `onSelect`: use `onClick`;
  `event.preventDefault()` no seu `onClick` cancela a ação interna. O menu
  fecha ao clicar (para manter aberto, `closeOnClick={false}`).
- No modo não controlado, o texto vem do `FormData` (`name="message"`): não
  troque o `name` do textarea. E o form é resetado antes do `onSubmit`: se o
  envio falhar, o texto digitado se perde (só os anexos ficam). Para manter o
  texto e permitir tentar de novo, use o `PromptInputProvider`. Para controlar o valor, use
  `PromptInputProvider` (não `value`/`onChange` soltos no textarea).
- `usePromptInputAttachments()` só funciona **dentro** do `PromptInput` (ou do
  provider): por isso o exemplo extrai `AnexosDoPrompt` como componente filho.
- `PromptInputHoverCard` não aceita `openDelay`/`closeDelay` (Radix): os
  atrasos ficam no `PromptInputHoverCardTrigger` (`delay`, `closeDelay`).
- O PromptInput não envia nada para a rede: `onSubmit` é seu. Não importe `ai`
  em runtime só para tipar: `import type`.
