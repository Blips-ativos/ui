# @blips/ai — fase 1: pacote e componentes de chat

Data: 2026-10-06 · Branch: `feat/blips-ai` (a partir de `feat/base-ui-v3`) · Specs irmãs: fase 2 (demais
componentes do AI Elements) e fase 3 (demais pacotes do libraries.dev).

## Contexto

A `@blips/ui` v3 (PR #17) é shadcn base-mira sobre Base UI. Falta uma camada de componentes para
interfaces de agente: conversa, resposta em streaming, raciocínio, ferramentas, citações. Duas fontes
abertas cobrem isso:

- **AI Elements** (`vercel/ai-elements`, Apache-2.0, upstream em `6a9d5b1`): 49 componentes React escritos
  sobre shadcn new-york (Radix) e ícones lucide.
- **libraries.dev** (`Jakubantalik/Libraries.dev`, MIT): 7 efeitos visuais (WebGL/canvas) publicados no npm,
  sem dependência de runtime além do React.

Consumidores iniciais: `blips-agents-chat` (que vai para React 19) e outras interfaces de agente do time.

## Objetivo da fase 1

Criar o pacote `@blips/ai` (`packages/ai`) com toda a infraestrutura (build, licença, CSS, docs, skills,
release) e os componentes de chat.

**Escopo (15):**

| Origem | Componentes |
|---|---|
| AI Elements | `conversation`, `message`, `prompt-input`, `reasoning`, `chain-of-thought`, `sources`, `inline-citation`, `code-block`, `confirmation`, `context`, `shimmer`, `suggestion`, `tool` |
| libraries.dev | `thinking-orbs`, `border-beam` |

`loader`, citado no planejamento, **não existe mais no upstream** (o AI Elements o trocou pelo `shimmer`);
fica fora porque a cobertura é medida contra os arquivos reais de `packages/elements/src`.

**Fora de escopo:** os outros 36 componentes do AI Elements (fase 2) e os outros 5 do libraries.dev (fase 3).

## Decisões

### Pacote

- `packages/ai`, nome `@blips/ai`, versão `0.1.0`, `type: module`, `sideEffects: false`.
- **Sem barrel.** Só subpaths: `@blips/ai/components/<nome>` e `@blips/ai/fx/<nome>`. Um barrel importaria
  todos os peers opcionais e quebraria quem não os instalou.
- Os exports apontam para o fonte `.tsx` em `src/`, como na `@blips/ui` (Vite compila TSX de
  `node_modules`; Next precisa de `transpilePackages: ["@blips/ui", "@blips/ai"]`). O `build` (tsup, uma
  entrada por componente) existe para validar compilação e tipos e gera `dist/`.
- **CSS:** `@blips/ai/styles.css` só com `@source "./**/*.{ts,tsx}";` para o Tailwind do consumidor gerar as
  classes do pacote. O consumidor importa `@blips/ui/globals.css` e depois `@blips/ai/styles.css`. Tema,
  tokens e variantes vêm todos da `@blips/ui`.
- `files`: `dist`, `src`, `styles.css`, `LICENSE`, `THIRD_PARTY_NOTICES.md`.
- `license`: `MIT AND Apache-2.0`. `LICENSE` (MIT, Blips) para o código próprio; `THIRD_PARTY_NOTICES.md`
  com o texto integral da Apache-2.0 da Vercel (AI Elements), as MIT do libraries.dev e o aviso da Paper
  Shaders (Apache-2.0, via `metal-fx`, fase 3).

### Dependências

| Tipo | Pacotes |
|---|---|
| peer obrigatório | `@blips/ui ^3.0.0`, `react`/`react-dom` `^19` |
| peer opcional | `ai` (só tipos), `streamdown` + `@streamdown/{code,math,mermaid,cjk}`, `shiki` |
| dependência | `@phosphor-icons/react`, `class-variance-authority`, `motion`, `use-stick-to-bottom`, `tokenlens`, `nanoid`, `border-beam`, `thinking-orbs` |

Peers opcionais vão em `peerDependenciesMeta` com `optional: true`. Cada página de docs e reference de
skill diz quais o componente exige. React 19 porque o pacote passa `ref` como prop (padrão da v3) e
porque o upstream assume React 19.

### Composição com a `@blips/ui` (decisão do dono: opção 1)

- O `@blips/ai` **compõe** as primitivas da `@blips/ui`; não existe segunda família de mensagem.
- `message`: a casca é o `Message`/`MessageContent`/`MessageAvatar`/`MessageHeader`/`MessageFooter` da
  `@blips/ui`, reexportados com a mesma identidade (mesmo objeto, não cópia). O `@blips/ai` acrescenta só o
  que é de IA: `MessageResponse` (markdown em streaming via `streamdown`), `MessageActions`/`MessageAction`,
  `MessageBranch*` e afins do upstream.
- Anexos (fase 2: `attachments`) seguem a mesma regra sobre o `Attachment` da `@blips/ui`.
- Primitivas sempre por subpath: `@blips/ui/components/<x>`. Nunca o barrel `@blips/ui`.

### Port do AI Elements

Fonte: a saída do CLI (`shadcn add https://elements.ai-sdk.dev/api/registry/all.json`) num projeto de
referência base-mira; `question` (fora do `all.json`) vem do fonte do upstream.

| Upstream | `@blips/ai` |
|---|---|
| `@/components/ui/<x>` (Radix) | `@blips/ui/components/<x>` (Base UI), adaptando a API |
| `@/lib/utils` | `@blips/ui/lib/utils` |
| `asChild` | `render` (+ `nativeButton={false}` quando o elemento não é `<button>`) |
| `data-[state=open]` etc. | `data-open:`/`data-closed:`… (variantes do `globals.css` da `@blips/ui`) |
| `lucide-react` | `@phosphor-icons/react`, nome com sufixo `Icon` |
| `@radix-ui/react-use-controllable-state` | `src/lib/use-controllable-state.ts` próprio |
| `import { X } from "ai"` | `import type { X } from "ai"` (componentes apresentacionais) |
| classes | as do upstream, ajustadas só onde a primitiva Base UI/base-mira exige |

Todo arquivo portado começa com:

```ts
// Adaptado de vercel/ai-elements (packages/elements/src/<nome>.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.
```

Os componentes são **apresentacionais**: recebem `status`, `state`, `parts` por props. A tradução de eventos
(AI SDK ou AgentOS do Agno) fica no consumidor.

### libraries.dev

`border-beam` e `thinking-orbs` entram como dependência npm. `src/fx/<nome>.tsx` reexporta o componente e
os tipos e expõe padrões Blips (paleta a partir do `#FCBA28`, tamanhos coerentes com a densidade mira).
Nada do conteúdo Pro (exports do Studio, presets) entra no repo.

### Docs, skills e release

- Site de docs: seção **IA** (`content/docs/ai/`), uma página por componente, demos em
  `examples/ai-<nome>-*.tsx`; o app de docs depende de `@blips/ai` e importa `@blips/ai/styles.css`.
- Skill `building`: `references/ai/<nome>.md` por componente (quando usar, import por subpath, props reais,
  peers exigidos, composição com a `@blips/ui`, exemplo v3 que compila), guia `components/ai-chat.md` e
  tabela no `SKILL.md` com gatilho de IA na descrição.
- Skill `installing`: instalação do `@blips/ai` e dos peers.
- Skill `reviewing`: regras do `@blips/ai` (subpath, não recriar bolha/mensagem de chat existente, peers
  declarados, `ai` só tipo) acusadas pelo `scripts/check.mjs`, com fixtures que passam e que falham.
- Release: trilho `release-ai: vX.Y.Z` no `.github/workflows/release.yml` e no `.claude/commands/release.md`,
  no molde do `release-brand:`; tag `ai-vX.Y.Z`. O primeiro publish depende do Trusted Publisher do
  `@blips/ai` no npmjs, que é passo manual do dono.

## Aceite da fase 1

1. `packages/ai` com os 15 componentes; cada arquivo portado com o cabeçalho acima.
2. `pnpm typecheck` (todas as tasks), `pnpm --filter @blips/ai build` e build estático do site verdes;
   `biome check packages/ai` limpo.
3. Em `packages/ai/src`: zero `@radix-ui`, `lucide`, `asChild`, import do barrel `@blips/ui`; todo
   `from "ai"` é `import type`.
4. `pnpm pack` do `@blips/ai` lista `THIRD_PARTY_NOTICES.md` e `LICENSE`.
5. Teste de fumaça (Vite + React 19, tarballs da `@blips/ui` e do `@blips/ai`): `tsc`, `vite build` e render
   SSR + cliente de todos os componentes sem erro.
6. Docs com uma página por componente; skills com uma reference por componente; trilho `release-ai`.
7. Revisão adversarial da fase com achados confirmados corrigidos.
