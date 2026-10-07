# Model Selector

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/model-selector`

Seletor de modelo de linguagem em formato de paleta: um `Dialog` da @blips/ui
com `Command` (busca, grupos por provedor, itens, atalhos), mais peças para o
logotipo do provedor (`ModelSelectorLogo`, servido pelo models.dev), grupo de
logotipos e nome do modelo. A lista de modelos e o que fazer com a escolha
ficam no app.

## Quando usar (e quando não)

- **Use** quando o usuário escolhe entre **muitos** modelos (dezenas, vários
  provedores) e a busca ajuda: playground, comparação de modelos, tela de
  configuração de agente com os modelos do LiteLLM.
- **Não use** para 2 a 5 opções fixas na caixa de mensagem: isso é o
  `PromptInputSelect` (`prompt-input.md`), que é um `Select` compacto.
- **Não use** para escolher a voz (`voice-selector.md`) ou o microfone
  (`mic-selector.md`).
- Seleção com busca **dentro de um formulário**, sem paleta modal:
  `Combobox` da @blips/ui (`../combobox.md`).

## Peers exigidos

Nenhum. Só @blips/ui (`dialog`, `command`, `button`) e ícones Phosphor.

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
| `ModelSelector` | Props do `Dialog` (Base UI: `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`…) | Só repassa ao `Dialog`; não guarda o modelo escolhido. |
| `ModelSelectorTrigger` | Props do `DialogTrigger` | Troca de elemento com `render` (ex.: `render={<Button variant="outline" />}`). |
| `ModelSelectorContent` | Props do `DialogContent` + `title?: ReactNode` ("Selecionar modelo"), `closeLabel?: string` ("Fechar"), `showCloseButton?` (`true`) | `DialogContent overflow-hidden p-0` com `DialogTitle sr-only` e um `Command` em volta dos `children`. O X é um `DialogClose` + `Button ghost icon-sm` com `closeLabel` em `sr-only`. |
| `ModelSelectorDialog` | Props do `CommandDialog` (`title` "Selecionar modelo", `description` "Busque um modelo para usar…") | Alternativa ao par `ModelSelector` + `ModelSelectorContent`: um `CommandDialog` pronto, com `open`/`onOpenChange` próprios. |
| `ModelSelectorInput` | Props do `CommandInput` | Placeholder padrão "Buscar modelo…". |
| `ModelSelectorList` | Props do `CommandList` | |
| `ModelSelectorEmpty` | Props do `CommandEmpty` | Texto padrão "Nenhum modelo encontrado.". |
| `ModelSelectorGroup` | Props do `CommandGroup` (`heading`) | Um grupo por provedor. |
| `ModelSelectorItem` | Props do `CommandItem` (`value`, `keywords`, `onSelect`…) | **Não** grava nem fecha sozinho: faça no `onSelect`. |
| `ModelSelectorShortcut` | Props do `CommandShortcut` | Atalho à direita (ex.: `⌘1`). |
| `ModelSelectorSeparator` | Props do `CommandSeparator` | |
| `ModelSelectorLogo` | `ComponentProps<"img">` sem `src` + `provider` | `<img src="https://models.dev/logos/${provider}.svg">` 12×12, `size-3 dark:invert`. `provider` aceita qualquer string, com autocomplete para ~55 conhecidos (`"anthropic"`, `"openai"`, `"google"`, `"amazon-bedrock"`, `"mistral"`, `"deepseek"`…). `alt` padrão `Logotipo de ${provider}`. |
| `ModelSelectorLogoGroup` | `ComponentProps<"div">` | Logos sobrepostos (`-space-x-1`, anel e fundo) para modelo servido por vários provedores. |
| `ModelSelectorName` | `ComponentProps<"span">` | `flex-1 truncate text-left`. |

## Composição com a @blips/ui

- Gatilho: `ModelSelectorTrigger render={<Button variant="outline" />}` com
  logo + nome + `CaretUpDownIcon`, largura fixa (`w-56 justify-between`).
- Modelo atual marcado: `data-checked` no item (o `CommandItem` da @blips/ui
  mostra o check) ou um `CheckIcon` no fim.
- Fonte da lista: no ecossistema Blips os agentes falam com modelos pelo
  LiteLLM; a lista vem do backend (nomes de deployment), nunca de chamadas
  diretas a provedores no navegador.

## Exemplo v3

```tsx
"use client";

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@blips/ai/components/model-selector";
import { Button } from "@blips/ui/components/button";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface Modelo {
  id: string;
  nome: string;
  provedor: string;
}

const grupos: { provedor: string; rotulo: string; modelos: Modelo[] }[] = [
  {
    modelos: [
      { id: "salvador-sonnet", nome: "Claude Sonnet", provedor: "anthropic" },
      { id: "salvador-haiku", nome: "Claude Haiku", provedor: "anthropic" },
    ],
    provedor: "anthropic",
    rotulo: "Anthropic",
  },
  {
    modelos: [{ id: "salvador-gpt", nome: "GPT-5 mini", provedor: "openai" }],
    provedor: "openai",
    rotulo: "OpenAI",
  },
];

export function ModeloDoAgente({
  valor,
  onEscolher,
}: {
  valor: string;
  onEscolher: (id: string) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const atual = grupos.flatMap((g) => g.modelos).find((m) => m.id === valor);

  return (
    <ModelSelector onOpenChange={setAberto} open={aberto}>
      <ModelSelectorTrigger
        render={<Button className="w-56 justify-between" variant="outline" />}
      >
        {atual && <ModelSelectorLogo provider={atual.provedor} />}
        <ModelSelectorName>
          {atual?.nome ?? "Escolher modelo"}
        </ModelSelectorName>
        <CaretUpDownIcon className="size-4 text-muted-foreground" />
      </ModelSelectorTrigger>
      <ModelSelectorContent title="Modelo do agente">
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorEmpty />
          {grupos.map((grupo) => (
            <ModelSelectorGroup heading={grupo.rotulo} key={grupo.provedor}>
              {grupo.modelos.map((modelo) => (
                <ModelSelectorItem
                  data-checked={modelo.id === valor}
                  key={modelo.id}
                  keywords={[grupo.rotulo]}
                  onSelect={() => {
                    onEscolher(modelo.id);
                    setAberto(false);
                  }}
                  value={modelo.nome}
                >
                  <ModelSelectorLogo provider={modelo.provedor} />
                  <ModelSelectorName>{modelo.nome}</ModelSelectorName>
                </ModelSelectorItem>
              ))}
            </ModelSelectorGroup>
          ))}
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}
```

## Armadilhas

- **`ModelSelectorItem` não seleciona nem fecha.** Grave o modelo e feche o
  dialog no `onSelect` (estado `open` controlado, como no exemplo).
- **Logotipos vêm de `models.dev` em runtime.** É uma requisição externa por
  logo: bloqueada por CSP (`img-src`), offline ou em rede corporativa vira
  imagem quebrada, e o domínio fica sabendo de quem abriu a tela. Se isso
  importa, não use `ModelSelectorLogo`: passe um `<img>` com asset próprio ou
  um ícone.
- **Provedor fora da lista vira imagem quebrada**, sem erro: o tipo aceita
  qualquer string. Confira o slug no models.dev (`amazon-bedrock`, não
  `bedrock`).
- `dark:invert` inverte todo logo no tema escuro: logos coloridos ficam com
  as cores trocadas. Para esses, passe `className="dark:invert-0"`.
- `value` do item é o que a busca filtra (o nome). O id do modelo fica no seu
  estado; use `keywords` para o provedor entrar na busca.
- `ModelSelectorInput` usa a altura fixa do `CommandInput` da @blips/ui
  (`h-8`). Não acrescente `py-3.5`/`h-auto` como no AI Elements: estoura o
  `InputGroup`.
- O botão de fechar padrão da @blips/ui sai desligado (rótulo fixo em inglês);
  o X é o do próprio componente. Com `showCloseButton={false}`, garanta outro
  jeito de fechar além do Esc em telas de toque.
- `ModelSelectorDialog` é um `CommandDialog` independente: não misture com
  `ModelSelector` + `ModelSelectorContent` no mesmo seletor.
- Gatilho troca de elemento com `render`, nunca `asChild`.
