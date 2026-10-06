# Instalando a @blips/ai

Componentes de interface de agente (conversa, resposta em streaming, raciocínio,
ferramentas, fontes, prompt, efeitos visuais) portados do AI Elements
(Apache-2.0) e do libraries.dev (MIT) sobre a `@blips/ui` v3.x. Esta reference
é **aditiva** ao setup da `@blips/ui`: faça primeiro o da stack
(`nextjs.md` ou `vite.md`) e só depois o abaixo.

## Pré-requisitos (gate)

| Exigência | Por quê | Se não atender |
| --- | --- | --- |
| `@blips/ui` **^3** (trilha v3.x — Base UI) | peer obrigatório; o pacote compõe `Message`, `Bubble`, `Collapsible`, `Button`… da v3 | Repo em 2.x: **pare**. Subir para 3.x é migração (API muda), só com pedido explícito |
| `react` e `react-dom` **^19** | peer obrigatório; os componentes passam `ref` como prop e assumem React 19 | React 17/18: **pare** e alinhe com o usuário (atualizar o React é decisão dele) |
| `moduleResolution` `"bundler"` (ou `node16`+) | só existem subpath exports | Ajuste como na reference do Next |

## 1. Instalar

```bash
pnpm add @blips/ai
```

`@phosphor-icons/react`, `motion`, `use-stick-to-bottom`, `tokenlens`, `nanoid`,
`class-variance-authority`, `border-beam` e `thinking-orbs` já vêm como
dependências do pacote. Instale como dependência direta só o que o **código do
app** importar (ex.: `@phosphor-icons/react` para os ícones das suas telas, que
a `@blips/ui` já exige do mesmo jeito).

## 2. Peers opcionais por componente

Os peers pesados são opcionais no `package.json` do pacote (o install não
falha sem eles), mas **o componente que os importa quebra o build** se faltarem.
Declare no `package.json` do app os peers de **cada** componente que importar:

| Componente (subpath) | Peers que o app precisa declarar |
| --- | --- |
| `components/message` | `streamdown`, `@streamdown/code`, `@streamdown/math`, `@streamdown/mermaid`, `@streamdown/cjk`, `ai` (tipos) |
| `components/reasoning` | `streamdown`, `@streamdown/code`, `@streamdown/math`, `@streamdown/mermaid`, `@streamdown/cjk` |
| `components/code-block` | `shiki` |
| `components/tool` | `shiki` (usa o `CodeBlock`), `ai` (tipos) |
| `components/conversation` | `ai` (tipos) |
| `components/confirmation` | `ai` (tipos) |
| `components/context` | `ai` (tipos) |
| `components/prompt-input` | `ai` (tipos) |
| `components/shimmer`, `components/suggestion`, `components/sources`, `components/chain-of-thought`, `components/inline-citation` | — |
| `fx/border-beam`, `fx/thinking-orbs` | — |

Faixas aceitas (peerDependencies do pacote): `streamdown ^2.7.0`,
`@streamdown/code ^2`, `@streamdown/math ^1`, `@streamdown/mermaid ^1`,
`@streamdown/cjk ^1`, `shiki ^4`, `ai >=6`.

**`ai` é peer opcional só de tipos; em projeto TypeScript, `pnpm add -D ai`.**
O pacote só faz `import type` do `ai` (nenhum runtime do AI SDK). Só que os
exports apontam para o fonte `.tsx`, então o `tsc` do app compila esses arquivos
e, sem `ai` instalado, falha com `TS2307: Cannot find module 'ai'` dentro de
`node_modules/@blips/ai/src/...` (verificado: `skipLibCheck` não cobre `.tsx`).

- Regra geral (AgentOS do Agno, WebSocket próprio, ou só os tipos): `ai` em
  `devDependencies`.
- App que usa o `useChat`: `@ai-sdk/react` em `dependencies` (ele já traz o
  runtime do `ai` como dependência própria, com versão fixa); `ai` continua em
  `devDependencies`, na mesma versão que o `@ai-sdk/react` fixa, para não haver
  duas cópias dos tipos. `ai` só vai para `dependencies` se o **código do app**
  importar runtime dele (ex.: `DefaultChatTransport` para outra rota).

Exemplo, tela de chat completa (`ai-chat.md` da skill building):

```bash
pnpm add @blips/ai streamdown @streamdown/code @streamdown/math @streamdown/mermaid @streamdown/cjk shiki
pnpm add -D ai
```

## 3. CSS (ordem importa)

No CSS de entrada do app (o mesmo que importa o globals da lib):

```css
@import "@blips/ui/globals.css";
@import "@blips/ai/styles.css";
```

- **A @blips/ui primeiro.** Ela traz `@import "tailwindcss"`, o tema, os tokens
  e as variantes (`data-open:` etc.). O `styles.css` da @blips/ai **só** declara
  `@source` para o Tailwind do app gerar as classes usadas em
  `node_modules/@blips/ai/src`. Sem ele, os componentes de IA aparecem sem
  estilo (o Tailwind não varre `node_modules`).
- Não copie tokens, não crie `tailwind.config.js`, não importe
  `tailwindcss` de novo: tudo vem da @blips/ui.

**Streamdown (obrigatório se usar `MessageResponse`/`message` ou `reasoning`).**
O Streamdown renderiza o markdown com classes Tailwind próprias, que o
`styles.css` da @blips/ai não cobre. O README do `streamdown` 2.7 pede, no mesmo
CSS de entrada (caminho relativo do arquivo CSS até o `node_modules` que contém
o pacote; em monorepo, o da raiz):

```css
@import "streamdown/styles.css";
@source "../node_modules/streamdown/dist/*.js";
@source "../node_modules/@streamdown/code/dist/*.js";
/* repita para @streamdown/math, @streamdown/mermaid e @streamdown/cjk se estiverem instalados */
```

O `streamdown/styles.css` traz as animações de entrada do streaming e os
marcadores de lista (pode ser `import "streamdown/styles.css"` no JS). Fórmulas (`@streamdown/math`)
usam o CSS do KaTeX: `import "katex/dist/katex.min.css"`, com `katex` como
dependência direta (pnpm estrito). Esses `@source` **não** são o anti-padrão
do "@source defensivo": apontam para conteúdo fora da auto-detecção, que é
exatamente o caso legítimo. O check da reviewing não os acusa.

## 4. Next.js: `transpilePackages`

Como a @blips/ui, a @blips/ai publica o fonte `.tsx`. Acrescente-a:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // @blips/ui e @blips/ai publicam componentes como fonte .tsx.
  transpilePackages: ["@blips/ui", "@blips/ai"],
};
```

Sem a entrada `@blips/ai`, o build falha com erro de parse nos `.tsx` de
`node_modules/@blips/ai`. No Vite nada muda (compila TSX de `node_modules`).

Todos os componentes da @blips/ai têm `"use client"`: em Server Component,
renderize-os a partir de um componente cliente seu (a tela de chat já é
cliente por causa do estado).

## 5. Imports

Não existe barrel: `import { … } from "@blips/ai"` **não resolve**. Sempre
subpath:

```tsx
import { Conversation, ConversationContent } from "@blips/ai/components/conversation";
import { MessageResponse, messageAlign } from "@blips/ai/components/message";
import { BlipsBorderBeam } from "@blips/ai/fx/border-beam";
```

Por quê: um barrel importaria todos os componentes e, com eles, todos os peers
opcionais (Streamdown, Shiki), quebrando quem não os instalou.

## 6. Validação

1. `tsc --noEmit` do app passa (pega peer faltando: TS2307 em
   `node_modules/@blips/ai/src/...`).
2. `pnpm build` passa.
3. O CSS gerado contém classes que só existem na @blips/ai, por exemplo a do
   `Shimmer`: `grep -oE 'background-size: ?250% 100%' <css-do-build>` (sem o
   `@import "@blips/ai/styles.css"` ela não aparece).
4. Rode o check da **blips-ui:reviewing** (`scripts/check.mjs`): a dimensão
   `blips-ai` acusa barrel, subpath inexistente, peer não declarado, CSS fora
   de ordem, CSS do Streamdown ausente e chat recriado à mão.

## 7. CLAUDE.md do repo

Dentro dos marcadores `blips-ui:claude-md` (Passo 6 da SKILL.md), acrescente à
seção de UI um bullet:

```markdown
- **@blips/ai** (interfaces de agente): import só por subpath
  (`@blips/ai/components/<x>`, `@blips/ai/fx/<x>`); peers declarados por
  componente (ver skill blips-ui:installing → references/blips-ai.md); tela de
  chat segue `components/ai-chat.md` da skill blips-ui:building (casca
  `Message`/`Bubble` da @blips/ui, sem bolha ou lista recriada).
```

## Red flags

- `import … from "@blips/ai"` (barrel não existe)
- @blips/ai instalada em repo `@blips/ui` 2.x ou React < 19
- Componente importado sem os peers dele no `package.json` do app
- `@import "@blips/ai/styles.css"` antes do globals da @blips/ui, ou ausente
- `MessageResponse`/`Reasoning` sem `streamdown/styles.css` e sem o `@source`
  do `streamdown/dist` (markdown sem estilo)
- `ai` em `dependencies` só por causa dos tipos (o certo é `pnpm add -D ai`)
- `transpilePackages` sem `"@blips/ai"` (Next)
- Cópia do AI Elements via CLI (`components/ai-elements/*`) convivendo com a
  @blips/ai: duas famílias de chat no mesmo app
