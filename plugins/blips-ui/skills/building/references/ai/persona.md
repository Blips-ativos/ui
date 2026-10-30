# Persona

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/persona`

Avatar animado de um agente (orbe/forma abstrata) desenhado pelo **Rive**
num `<canvas>` WebGL2. Reage a um `state` — `idle`, `listening`, `thinking`,
`speaking`, `asleep` — trocando as entradas da state machine `default` do
arquivo `.riv`. Seis variantes visuais (`obsidian`, padrão; `command`,
`glint`, `halo`, `mana`, `opal`); nas que têm cor dinâmica, o traço fica preto
no tema claro e branco no escuro, lendo `data-theme` / classe `.dark` no
`<html>` (convenção da @blips/ui) ou `prefers-color-scheme`.

## Quando usar (e quando não)

- **Use** como "rosto" de um agente de voz ou de uma tela de conversa em que
  o estado do agente (ouvindo, pensando, falando) precisa ficar óbvio à
  distância.
- **Não use** como avatar de cada mensagem num chat de texto: ali é o
  `MessageAvatar`/`Avatar` da @blips/ui (`../avatar.md`); um contexto WebGL
  por mensagem esgota o navegador.
- **Não use** como indicador de carregamento genérico: `Spinner` da @blips/ui,
  `Shimmer` (`shimmer.md`) ou `ThinkingOrbs` (`thinking-orbs.md`, sem peer).
- **Não use** como identidade visual da marca: o `.riv` padrão é da Vercel
  (ver "Assets `.riv`").

## Peers exigidos

`@rive-app/react-webgl2` (^4). O import é estático: importar este subpath
**sem** o pacote instalado quebra o build.

```bash
pnpm add @blips/ai @rive-app/react-webgl2
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar o estado com tipos do AI SDK (ex.: `ChatStatus` no mapeamento abaixo),
`ai` é peer opcional e só de tipos (sempre `import type`), e num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`), porque a
@blips/ai publica o fonte `.tsx`.

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. O Rive não tem folha própria.

### Assets `.riv` (leia antes de pôr em produção)

Os arquivos `.riv` das variantes **não vêm no pacote**: o componente os
baixa em runtime do blob storage da **Vercel**
(`https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/…`), como no AI
Elements, e a Vercel não declara licença para eles. Servem para
desenvolvimento e demonstração. Em produção:

- hospede os seus próprios `.riv` (S3/CloudFront, `public/` do Next) e passe
  a URL na prop **`src`**;
- o arquivo precisa ter a state machine **`default`** com as entradas
  booleanas `listening`, `thinking`, `speaking` e `asleep` (e, para cor
  dinâmica, um view model com a propriedade `color`);
- libere o domínio do `.riv` no `connect-src` da CSP se o app tiver CSP.

## API

Exports: `Persona` e os tipos `PersonaProps` e `PersonaState`.

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `state` | `PersonaState` (`"idle" \| "listening" \| "thinking" \| "speaking" \| "asleep"`) | `"idle"` | Obrigatória no tipo. `idle` = todas as entradas `false`. |
| `variant` | `"obsidian" \| "command" \| "glint" \| "halo" \| "mana" \| "opal"` | `"obsidian"` | Escolhe o `.riv` e o que ele suporta: `mana` e `opal` não têm cor dinâmica; `opal` não tem view model. Variante inválida lança erro. |
| `src` | `string` | — | URL de um `.riv` próprio; substitui o da variante (que continua definindo se há view model/cor dinâmica). |
| `className` | `string` | — | No `<canvas>`. Padrão `size-16 shrink-0`; troque o tamanho aqui (`size-32`). |
| `onLoad` / `onLoadError` | `RiveParameters["onLoad"]` / `["onLoadError"]` | — | Carregou / falhou o `.riv` (rede, CSP, arquivo inválido). |
| `onReady` | `() => void` | — | Rive pronto para animar. |
| `onPlay` / `onPause` / `onStop` | callbacks do Rive | — | Eventos de reprodução. |

Os callbacks são estabilizados por ref: trocar a função entre renders não
reinicializa o Rive.

## Composição com a @blips/ui

- O estado vem do app. Com o AI SDK: `status` do `useChat()` →
  `submitted` = `thinking`, `streaming` = `speaking`, `ready`/`error` =
  `idle`; com microfone aberto (`SpeechInput`, `speech-input.md`) =
  `listening`. Com AgentOS/Agno, mapeie os eventos de streaming no app
  (`../../components/ai-chat.md`).
- Ponha o estado em texto também (`sr-only` com `aria-live="polite"` ou uma
  legenda com `Shimmer`): o canvas não é lido por leitor de tela.
- Moldura: centralizado num `Card` da @blips/ui ou no
  `ConversationEmptyState` da conversa vazia (`conversation.md`).

## Exemplo v3

```tsx
"use client";

import { Persona, type PersonaState } from "@blips/ai/components/persona";
import type { ChatStatus } from "ai";

const rotulos: Record<PersonaState, string> = {
  asleep: "Agente em pausa",
  idle: "Agente pronto",
  listening: "Ouvindo",
  speaking: "Respondendo",
  thinking: "Pensando",
};

function estadoDoAgente(status: ChatStatus, ouvindo: boolean): PersonaState {
  if (ouvindo) {
    return "listening";
  }
  if (status === "submitted") {
    return "thinking";
  }
  if (status === "streaming") {
    return "speaking";
  }
  return "idle";
}

export function RostoDoAgente({
  status,
  ouvindo,
}: {
  status: ChatStatus;
  ouvindo: boolean;
}) {
  const estado = estadoDoAgente(status, ouvindo);

  return (
    <div className="flex flex-col items-center gap-2">
      <Persona
        className="size-32"
        onLoadError={() => console.error("Falha ao carregar a persona")}
        src="/personas/salvador.riv"
        state={estado}
        variant="halo"
      />
      <p aria-live="polite" className="text-muted-foreground text-xs">
        {rotulos[estado]}
      </p>
    </div>
  );
}
```

## Armadilhas

- **Produção sem `src` depende da Vercel.** Sem a prop, o `.riv` vem de um
  blob público da Vercel, sem licença declarada e fora do seu controle (pode
  sumir ou mudar). Hospede os seus.
- **`.riv` próprio com nomes diferentes não anima.** A state machine tem de
  se chamar `default` e as entradas `listening`/`thinking`/`speaking`/`asleep`;
  nome errado não dá erro, só fica parado.
- **Combine `variant` com o seu `.riv`.** Com `src`, a variante ainda decide
  se o componente procura view model e cor dinâmica: para um arquivo sem view
  model, use `variant="opal"`.
- **Um contexto WebGL2 por instância.** Navegadores limitam (~16) contextos
  WebGL por página: não renderize uma persona por mensagem nem numa lista.
  Em dev, o Strict Mode já é tratado (a inicialização espera um frame).
- **Canvas vazio no primeiro frame e no SSR.** O Rive só inicia no cliente,
  depois da montagem, e o tema começa em `light` até o efeito ler o real.
  Reserve o tamanho com `className` para não pular o layout.
- **Sem acessibilidade própria.** O canvas não tem rótulo nem estado legível;
  o texto do estado é responsabilidade do app (exemplo).
- `prefers-reduced-motion` não é respeitado pelo componente: para quem pediu
  menos movimento, passe `state="idle"` ou troque por um ícone estático.
- `state` é obrigatória no tipo (`PersonaProps`), apesar do padrão `"idle"` na
  implementação: sempre passe.
