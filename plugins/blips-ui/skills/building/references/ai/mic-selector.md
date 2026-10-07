# Mic Selector

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/mic-selector`

Combobox de microfones: um `Popover` da @blips/ui com `Command` (busca +
lista) que lista os dispositivos `audioinput` do navegador
(`navigator.mediaDevices.enumerateDevices()`). Ao abrir pela primeira vez,
pede permissão de microfone (`getUserMedia`) para os nomes dos dispositivos
aparecerem, e reage a `devicechange` (fone conectado/desconectado). O valor é
o `deviceId` do microfone escolhido. Também exporta o hook `useAudioDevices`,
para quem quer só a lista.

## Quando usar (e quando não)

- **Use** em telas de voz (ditado, agente de voz, gravação) quando o usuário
  pode ter mais de um microfone e a escolha importa (headset vs. microfone do
  notebook).
- **Não use** para escolher entre opções que não são dispositivos: uma lista
  fixa é `Select` ou `Combobox` da @blips/ui (`../select.md`,
  `../combobox.md`).
- **Não use** para escolher a voz do agente (síntese): isso é `VoiceSelector`
  (`voice-selector.md`).
- Se o app só grava com o microfone padrão, não precisa dele: `SpeechInput`
  (`speech-input.md`) usa o padrão do sistema.

## Peers exigidos

Nenhum. Só @blips/ui (`popover`, `command`, `button`) e ícones Phosphor.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. O componente não importa `ai`; se o seu
código usar tipos do AI SDK, `ai` entra só como **devDependency**
(`pnpm add -D ai`, sempre `import type`).

## API

| Export | Props | Notas |
|---|---|---|
| `MicSelector` | Props do `Popover` (Base UI) exceto `open`/`onOpenChange`/`defaultOpen`, mais `value?`, `defaultValue?`, `onValueChange?: (value: string \| undefined) => void`, `open?`, `defaultOpen?` (`false`), `onOpenChange?: (open: boolean) => void` | Raiz e provider. `value` é o `deviceId`. `onOpenChange` recebe só o booleano (sem `eventDetails` do Base UI). |
| `MicSelectorTrigger` | Props do `Button` | `PopoverTrigger render={<Button variant="outline" />}`; acrescenta `CaretUpDownIcon` depois dos `children`. Mede a própria largura (`ResizeObserver`) e o conteúdo usa a mesma. |
| `MicSelectorValue` | `ComponentProps<"span">` + `placeholder?: ReactNode` | Nome do microfone selecionado (via `MicSelectorLabel`) ou o placeholder, padrão "Selecione o microfone...". `flex-1 text-left`. |
| `MicSelectorContent` | Props do `Command` + `popoverOptions?: ComponentProps<typeof PopoverContent>` | `PopoverContent` `p-0` com `width` igual ao trigger. As props vão para o `Command`; as do popover (`align`, `side`…) vão em `popoverOptions`. |
| `MicSelectorInput` | Props do `CommandInput` | Placeholder padrão "Buscar microfone...". |
| `MicSelectorList` | Props do `CommandList` sem `children` + `children: (devices: MediaDeviceInfo[]) => ReactNode` | **Render function** com a lista de microfones. |
| `MicSelectorEmpty` | Props do `CommandEmpty` | Texto padrão "Nenhum microfone encontrado.". |
| `MicSelectorItem` | Props do `CommandItem` | `onSelect` interno: grava o valor do item e fecha. Dê `value={device.deviceId}`. |
| `MicSelectorLabel` | `ComponentProps<"span">` + `device: MediaDeviceInfo` | Mostra `device.label`; se terminar em `(abcd:1234)` (vendor:product do USB), separa o código em `text-muted-foreground`. |
| `useAudioDevices()` | — | `{ devices: MediaDeviceInfo[], loading, error: string \| null, hasPermission, loadDevices }`. Lista sem pedir permissão na montagem; `loadDevices()` pede permissão e relista. |

## Composição com a @blips/ui

- O gatilho é o `Button outline` da @blips/ui: largura com `className`
  (`w-64 justify-between`) no `MicSelectorTrigger`.
- Num formulário, envolva com `Field`/`FieldLabel` da @blips/ui (`../field.md`);
  o rótulo aponta para o botão com `id`.
- Junto do `SpeechInput`: os dois ficam lado a lado, mas o `SpeechInput` não
  recebe `deviceId`. Para gravar no microfone escolhido, o app passa
  `{ audio: { deviceId: { exact: id } } }` ao próprio `getUserMedia`.
- Erro de permissão: `useAudioDevices().error` num `Alert` da @blips/ui
  (`../alert.md`); o componente só registra no console.

## Exemplo v3

```tsx
"use client";

import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
} from "@blips/ai/components/mic-selector";
import { useState } from "react";

export function EscolherMicrofone({
  onEscolher,
}: {
  onEscolher: (deviceId: string | undefined) => void;
}) {
  const [microfone, setMicrofone] = useState<string>();

  return (
    <MicSelector
      onValueChange={(id) => {
        setMicrofone(id);
        onEscolher(id);
      }}
      value={microfone}
    >
      <MicSelectorTrigger className="w-72 justify-between">
        <MicSelectorValue />
      </MicSelectorTrigger>
      <MicSelectorContent>
        <MicSelectorInput />
        <MicSelectorEmpty />
        <MicSelectorList>
          {(dispositivos) =>
            dispositivos.map((dispositivo) => (
              <MicSelectorItem
                key={dispositivo.deviceId}
                keywords={[dispositivo.label]}
                value={dispositivo.deviceId}
              >
                <MicSelectorLabel device={dispositivo} />
              </MicSelectorItem>
            ))
          }
        </MicSelectorList>
      </MicSelectorContent>
    </MicSelector>
  );
}
```

## Armadilhas

- **`value={device.deviceId}` no item é obrigatório.** Sem ele o cmdk usa o
  texto do item como valor, e o `MicSelectorValue` (que procura por
  `deviceId`) mostra o placeholder para sempre.
- **Busca por nome precisa de `keywords`.** Com `value` = `deviceId`, o cmdk
  filtra pelo id (uma string opaca); passe `keywords={[device.label]}` para a
  busca achar "Headset".
- **Destacar já seleciona.** O `Command` interno recebe `value`/`onValueChange`
  do seletor, e no cmdk isso é o item **destacado**: passar o mouse ou as setas
  sobre um item já dispara `onValueChange` com o `deviceId` dele (herdado do
  upstream). Do mesmo jeito, abrir o popover sem nada selecionado (ou digitar
  na busca) destaca o primeiro item e já o grava como valor. Não troque o
  microfone de uma gravação em andamento dentro do `onValueChange`; aplique a
  troca ao fechar (`onOpenChange(false)`).
- **Nomes vazios antes da permissão.** Até o usuário autorizar o microfone, o
  navegador devolve `label: ""` (e às vezes um único dispositivo genérico).
  A permissão é pedida ao abrir o popover; numa tela que precisa dos nomes
  antes, chame `useAudioDevices().loadDevices()` num clique.
- **HTTPS ou localhost.** Sem contexto seguro não existe
  `navigator.mediaDevices`: a lista fica vazia e `error` vem preenchido com
  "Não foi possível listar os microfones.".
- `MicSelectorList` recebe uma função, então o `MicSelectorEmpty` fica fora
  dela, direto no `MicSelectorContent` (como no exemplo).
- `onOpenChange` é a assinatura simples (`(open: boolean) => void`), não a do
  Base UI com `eventDetails`. Não tente ler `eventDetails.reason` aqui.
- O gatilho troca de elemento com `render` (é um `Button` Base UI), nunca
  `asChild`.
