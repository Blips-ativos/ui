# @blips/ai — fase 2: demais componentes do AI Elements

Data: 2026-10-06 · Branch: `feat/blips-ai` · Base: fase 1 (`2026-10-06-blips-ai-fase-1-chat.md`), cujas
decisões de pacote, port, composição, licença, docs, skills e release valem aqui sem repetição.

## Objetivo

Portar os 36 componentes do AI Elements (`packages/elements/src` @ `6a9d5b1`) que a fase 1 não cobriu, para
que o `@blips/ai` tenha cobertura total do upstream (49 de 49).

## Escopo (36)

| Grupo | Componentes | Dependências próprias |
|---|---|---|
| Fluxo/canvas | `canvas`, `node`, `edge`, `connection`, `controls`, `panel`, `toolbar` | `@xyflow/react` (peer opcional) |
| Voz e mídia | `speech-input`, `transcription`, `mic-selector`, `voice-selector`, `audio-player`, `persona` | `media-chrome` (audio-player), `@rive-app/react-webgl2` (persona) — peers opcionais |
| Agente e tarefa | `agent`, `plan`, `queue`, `task`, `checkpoint`, `question` | — |
| Código e dev | `artifact`, `commit`, `environment-variables`, `file-tree`, `jsx-preview`, `package-info`, `sandbox`, `schema-display`, `snippet`, `stack-trace`, `terminal`, `test-results`, `web-preview` | `react-jsx-parser` (jsx-preview), `ansi-to-react` (terminal, stack-trace) — peers opcionais |
| Conteúdo e modelo | `attachments`, `image`, `model-selector`, `open-in-chat` | — |

`question` não está no `all.json` do registry do upstream; a fonte é o arquivo do repositório.

## Decisões específicas da fase

- **Peers opcionais novos:** `@xyflow/react`, `@rive-app/react-webgl2`, `media-chrome`, `react-jsx-parser`,
  `ansi-to-react` (BSD-3-Clause). Entram em `peerDependencies` + `peerDependenciesMeta.optional` e como
  devDependencies do pacote e do site de docs. O import continua estático no arquivo do componente (como no
  upstream): quem importa o componente precisa do peer; quem não importa, não instala.
- **`attachments` compõe o `Attachment` da `@blips/ui`** (mesma regra do `message` na fase 1): reexporta a
  casca e acrescenta só o que é de IA (partes `FileUIPart`, prévia, remoção).
- **`persona`:** os arquivos `.riv` não são redistribuídos pelo pacote; o upstream os carrega em runtime do
  blob storage da Vercel e não declara licença para eles. O port mantém as variantes e URLs do upstream e
  acrescenta a prop `src` para apontar para assets próprios. Docs e skill recomendam hospedar os próprios
  `.riv` em produção. (Condição de parada do goal não se aplica: não há redistribuição.)
- **Componentes de canvas** dependem do CSS do React Flow (`@xyflow/react/dist/style.css`), que o consumidor
  importa; a página e a reference dizem isso.
- **APIs do navegador** (`speech-input`, `mic-selector`, `transcription`): continuam apresentacionais quando
  possível; onde o upstream usa Web Speech/MediaDevices, o componente precisa funcionar em SSR sem acessar
  `window` no render (só em efeito).

## Aceite da fase 2

1. Os 36 arquivos em `packages/ai/src/components`, cada um com cabeçalho de origem; cobertura 49/49 contra a
   lista do upstream (`gh api`), sem exclusão.
2. `pnpm typecheck`, `pnpm --filter @blips/ai build`, build do site verdes; Biome limpo em `packages/ai`.
3. Critério 5 da fase 1 (zero `@radix-ui`/`lucide`/`asChild`/barrel; `ai` só tipo) vale para os novos.
4. Uma página de docs e uma `references/ai/<nome>.md` por componente; `SKILL.md` atualizado.
5. Teste de fumaça com todos os componentes da fase 1 e da fase 2.
6. Revisão adversarial da fase com achados confirmados corrigidos.
