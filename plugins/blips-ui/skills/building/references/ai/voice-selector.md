# Voice Selector

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/voice-selector`

Seletor da **voz de síntese** (TTS) de um agente: um `Dialog` da @blips/ui com
`Command` (busca, grupos, itens) e peças para descrever cada voz (nome,
descrição, gênero, sotaque, idade) e tocar uma prévia. O componente não
conhece provedor nenhum (ElevenLabs, OpenAI, Polly…): a lista de vozes, o
áudio da prévia e o que fazer com a escolha ficam no app.

## Quando usar (e quando não)

- **Use** na configuração de um agente de voz ou de leitura em voz alta,
  quando há várias vozes e vale ouvir antes de escolher.
- **Não use** para escolher o microfone de entrada: isso é `MicSelector`
  (`mic-selector.md`).
- **Não use** para escolher o modelo de linguagem: isso é `ModelSelector`
  (`model-selector.md`).
- Com 2 ou 3 vozes fixas e sem prévia, um `Select` ou `RadioGroup` da
  @blips/ui (`../select.md`, `../radio-group.md`) basta.

## Peers exigidos

Nenhum. Só @blips/ui (`dialog`, `command`, `button`, `spinner`) e ícones
Phosphor.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. O componente não importa `ai`; se o seu
código usar tipos do AI SDK, `ai` entra só como **devDependency**
(`pnpm add -D ai`, sempre `import type`).

## API

Estrutura e estado:

| Export | Props | Notas |
|---|---|---|
| `VoiceSelector` | Props do `Dialog` (Base UI) exceto `open`/`onOpenChange`/`defaultOpen`, mais `value?`, `defaultValue?`, `onValueChange?: (value: string \| undefined) => void`, `open?`, `defaultOpen?` (`false`), `onOpenChange?: (open: boolean) => void` | Raiz e provider. `onOpenChange` recebe só o booleano. |
| `useVoiceSelector()` | — | `{ value, setValue, open, setOpen }`. Só dentro de `VoiceSelector` (lança fora). |
| `VoiceSelectorTrigger` | Props do `DialogTrigger` | Troca de elemento com `render` (ex.: `render={<Button variant="outline" />}`). |
| `VoiceSelectorContent` | Props do `DialogContent` + `title?: ReactNode` | `DialogContent p-0` com `DialogTitle sr-only` (padrão "Seletor de voz") e um `Command` em volta dos `children`. |
| `VoiceSelectorDialog` | Props do `CommandDialog` (`title` padrão "Seletor de voz", `description` padrão "Busque uma voz para selecionar.") | Alternativa ao par `VoiceSelector` + `VoiceSelectorContent`: um `CommandDialog` **independente**, com `open`/`onOpenChange` do próprio Dialog, fora do contexto do `VoiceSelector`. |
| `VoiceSelectorInput` | Props do `CommandInput` | Placeholder padrão "Buscar voz...". |
| `VoiceSelectorList` | Props do `CommandList` | |
| `VoiceSelectorEmpty` | Props do `CommandEmpty` | Texto padrão "Nenhuma voz encontrada.". |
| `VoiceSelectorGroup` | Props do `CommandGroup` (`heading`) | |
| `VoiceSelectorItem` | Props do `CommandItem` (`value`, `keywords`, `onSelect`…) | `px-4 py-2`. **Não** grava o valor nem fecha sozinho: faça isso no `onSelect`. |
| `VoiceSelectorShortcut` / `VoiceSelectorSeparator` | Props do `CommandShortcut` / `CommandSeparator` | |

Descrição da voz (todas `ComponentProps<"span">`, salvo indicação):

| Export | Props extras | Renderiza |
|---|---|---|
| `VoiceSelectorName` | — | `flex-1 truncate font-medium`. |
| `VoiceSelectorDescription` | — | `text-muted-foreground text-xs`. |
| `VoiceSelectorGender` | `value?: "male" \| "female" \| "transgender" \| "androgyne" \| "non-binary" \| "intersex"` | Ícone Phosphor (`GenderMaleIcon`, `GenderFemaleIcon`, `GenderTransgenderIcon`, `GenderNeuterIcon`, `GenderNonbinaryIcon`, `GenderIntersexIcon`); sem `value`, `DotIcon`. `children` substitui o ícone. |
| `VoiceSelectorAccent` | `value?: string` (`"brazilian"`, `"portuguese"`, `"american"`, `"british"`, `"spanish"`, `"argentinian"`… 30 chaves em inglês) | Emoji de bandeira; chave desconhecida não mostra nada. `children` substitui o emoji. |
| `VoiceSelectorAge` | — | `text-xs tabular-nums`; o texto é seu ("30–40"). |
| `VoiceSelectorAttributes` | (`ComponentProps<"div">`) | Linha `flex items-center text-xs` para gênero • sotaque • idade. |
| `VoiceSelectorBullet` | — | `•` com `aria-hidden`. |
| `VoiceSelectorPreview` | (`ComponentProps<"button">` sem `children`) + `playing?`, `loading?`, `onPlay?: () => void`, `playLabel?` ("Reproduzir prévia"), `pauseLabel?` ("Pausar prévia"), `loadingLabel?` ("Carregando prévia") | `Button outline icon-sm` `size-6` com `PlayIcon`/`PauseIcon`/`Spinner`. O clique faz `stopPropagation` (não seleciona o item), chama seu `onClick` e depois `onPlay`. Desabilitado com `loading`. |

## Composição com a @blips/ui

- Gatilho: `VoiceSelectorTrigger render={<Button variant="outline" />}` da
  @blips/ui, com o nome da voz atual no texto.
- A prévia toca um `<audio>` (ou `new Audio(url)`) controlado pelo app;
  `playing`/`loading` vêm do seu estado.
- Num formulário de configuração do agente: `Field` + `FieldLabel` da
  @blips/ui em volta do gatilho (`../field.md`).

## Exemplo v3

```tsx
"use client";

import {
  VoiceSelector,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorContent,
  VoiceSelectorDescription,
  VoiceSelectorEmpty,
  VoiceSelectorGender,
  type VoiceSelectorGenderProps,
  VoiceSelectorGroup,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorPreview,
  VoiceSelectorTrigger,
} from "@blips/ai/components/voice-selector";
import { Button } from "@blips/ui/components/button";
import { useRef, useState } from "react";

interface Voz {
  id: string;
  nome: string;
  descricao: string;
  genero: VoiceSelectorGenderProps["value"];
  generoTexto: string;
  sotaque: string;
  idade: string;
  previa: string;
}

const vozes: Voz[] = [
  {
    descricao: "Calma e acolhedora, boa para suporte",
    genero: "female",
    generoTexto: "feminina",
    id: "helena",
    idade: "30–40",
    nome: "Helena",
    previa: "/vozes/helena.mp3",
    sotaque: "brazilian",
  },
  {
    descricao: "Direta e firme, boa para cobrança",
    genero: "male",
    generoTexto: "masculina",
    id: "rafael",
    idade: "40–50",
    nome: "Rafael",
    previa: "/vozes/rafael.mp3",
    sotaque: "brazilian",
  },
];

export function VozDoAgente() {
  const [voz, setVoz] = useState<string | undefined>("helena");
  const [aberto, setAberto] = useState(false);
  const [tocando, setTocando] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const alternarPrevia = (v: Voz) => {
    audioRef.current?.pause();
    if (tocando === v.id) {
      setTocando(null);
      return;
    }
    const audio = new Audio(v.previa);
    audio.addEventListener("ended", () => setTocando(null));
    audioRef.current = audio;
    setTocando(v.id);
    audio.play().catch(() => setTocando(null));
  };

  const atual = vozes.find((v) => v.id === voz);

  return (
    <VoiceSelector
      onOpenChange={(proximo) => {
        setAberto(proximo);
        if (!proximo) {
          audioRef.current?.pause();
          setTocando(null);
        }
      }}
      onValueChange={setVoz}
      open={aberto}
      value={voz}
    >
      <VoiceSelectorTrigger render={<Button variant="outline" />}>
        {atual ? `Voz: ${atual.nome}` : "Escolher voz"}
      </VoiceSelectorTrigger>
      <VoiceSelectorContent title="Voz do agente">
        <VoiceSelectorInput />
        <VoiceSelectorList>
          <VoiceSelectorEmpty />
          <VoiceSelectorGroup heading="Português">
            {vozes.map((v) => (
              <VoiceSelectorItem
                key={v.id}
                keywords={[v.descricao]}
                onSelect={() => {
                  setVoz(v.id);
                  setAberto(false);
                }}
                value={v.nome}
              >
                <VoiceSelectorPreview
                  onPlay={() => alternarPrevia(v)}
                  playing={tocando === v.id}
                />
                <div className="flex flex-1 flex-col gap-0.5">
                  <VoiceSelectorName>{v.nome}</VoiceSelectorName>
                  <VoiceSelectorDescription>
                    {v.descricao}
                  </VoiceSelectorDescription>
                </div>
                <VoiceSelectorAttributes className="gap-1.5">
                  <VoiceSelectorGender value={v.genero} />
                  <span className="sr-only">Voz {v.generoTexto}</span>
                  <VoiceSelectorBullet />
                  <VoiceSelectorAccent value={v.sotaque} />
                  <VoiceSelectorBullet />
                  <VoiceSelectorAge>{v.idade}</VoiceSelectorAge>
                </VoiceSelectorAttributes>
              </VoiceSelectorItem>
            ))}
          </VoiceSelectorGroup>
        </VoiceSelectorList>
      </VoiceSelectorContent>
    </VoiceSelector>
  );
}
```

## Armadilhas

- **`VoiceSelectorItem` não seleciona nada sozinho.** Diferente do
  `MicSelectorItem`, ele é um `CommandItem` puro: grave a voz e feche no
  `onSelect` (estado próprio, como no exemplo, ou `useVoiceSelector()` num
  componente filho do `VoiceSelector`).
- **`VoiceSelectorDialog` não fala com o `VoiceSelector`.** É outro `Dialog`;
  `useVoiceSelector()` lança dentro dele se não houver um `VoiceSelector` por
  fora. Use um caminho ou o outro.
- **Ícone de gênero e bandeira não são lidos por leitor de tela.** O SVG e o
  emoji não têm rótulo: acrescente um `sr-only` com o texto (exemplo), ou passe
  o texto em `children` para trocar o ícone por palavra.
- **Bandeiras viram letras no Windows** (o sistema não desenha emoji de
  bandeira: "🇧🇷" aparece como "BR"). Se o sotaque importa, escreva o texto
  em `children` (`<VoiceSelectorAccent>pt-BR</VoiceSelectorAccent>`).
- As chaves de `VoiceSelectorAccent` são em inglês (`"brazilian"`, não
  `"brasileiro"`). Chave fora da lista não mostra nada, sem erro.
- **Pare a prévia ao fechar e ao trocar de voz.** O componente não toca
  áudio; um `Audio` esquecido continua falando depois do dialog fechado.
- `value` do item é o texto que a busca filtra: use o nome (e `keywords` para
  a descrição). O id da voz fica no seu estado, não no `value` do cmdk.
- `onOpenChange` é a assinatura simples (`(open: boolean) => void`), não a do
  Base UI com `eventDetails`.
- O gatilho troca de elemento com `render`, nunca `asChild`.
