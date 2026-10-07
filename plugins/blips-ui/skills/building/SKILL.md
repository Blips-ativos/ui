---
name: building
description: "Padrões, APIs e convenções da biblioteca Blips UI (@blips/ui) — shadcn/ui sobre Base UI (v3.x) ou Radix (v2.x), com instruções separadas para cada versão — e da @blips/ai (componentes de interface de agente sobre a v3.x). Use sempre que criar, modificar ou revisar QUALQUER código de interface — páginas, componentes, formulários, tabelas, modais, sheets, gráficos, sidebars, layouts ou estilização —, inclusive mudanças pequenas (trocar variante de Button, adicionar Badge, corrigir layout). Cobre .tsx com @blips/ui, Tailwind CSS, react-hook-form, TanStack Table, Recharts, primitivas Base UI/Radix, loading/empty states, acessibilidade e design responsivo. Dispara também em UI de IA: chat, agente, streaming, raciocínio, tool call, prompt input, fontes e citações, fluxo/canvas de agente, voz e transcrição, plano e tarefas do agente, terminal e artefatos de código, AI Elements ou @blips/ai."
---

# Construindo Componentes UI

Esta skill contém a referência completa para construir UI com a biblioteca Blips UI. A lib tem duas linhas: **v3.x**, sobre primitivas **Base UI** (`@base-ui/react`, estilo shadcn base-mira), e **v2.x**, sobre primitivas **Radix UI**. Nas duas, os componentes vêm de `@blips/ui/components/*`, com Tailwind CSS e ícones Phosphor (`@phosphor-icons/react`). Os exemplos de busca de dados são agnósticos — conecte os componentes à camada de dados do seu app (React Query, SWR, tRPC, etc.).

## Protocolo de Raciocínio

Antes de escrever ou modificar QUALQUER código de UI, você DEVE seguir este processo de raciocínio e compartilhá-lo com o usuário. Isso garante que os componentes certos sejam usados com os padrões corretos.

### Passo 0: Detectar a versão da @blips/ui

Antes de tudo, descubra qual linha da lib o repositório usa — a API muda entre elas
(`render` vs `asChild`, `data-open` vs `data-[state=open]`, Accordion com arrays,
AlertDialogAction que não fecha sozinho, ícones `*Icon`…):

1. Leia `package.json` → `dependencies["@blips/ui"]` (ou `devDependencies`).
2. Se o valor for ambíguo (`workspace:*`, `latest`, range), leia
   `node_modules/@blips/ui/package.json` → `version`.

| Versão | Trilha a seguir em cada reference |
|---|---|
| `2.x` | seção **`## v2.x — Radix`** |
| `3.x` | seção **`## v3.x — Base UI`** |
| sem `@blips/ui` (instalação nova) | **v3.x — Base UI** |

Declare a trilha no raciocínio ("Repo em @blips/ui 3.1.0 → trilha v3.x — Base UI")
e leia **só** a seção correspondente de cada reference. Nunca aplique instrução v3
num repo v2, nem o contrário. As diferenças transversais (render/asChild, atributos
de estado, Tooltip, Separator, ícones, densidade, recharts, componentes só da v3)
estão em [`references/v2-vs-v3.md`](references/v2-vs-v3.md) — leia-o na primeira
tarefa de UI do repo e sempre que for migrar código entre versões.

### Passo 1: Identificar a Tarefa de UI

Classifique o que está construindo:

| Categoria | Exemplos | Comece em |
|-----------|----------|-----------|
| **Componente único** | Button, Badge, Input, Avatar | `references/<componente>.md` |
| **Padrão composto** | Combobox, formulário em Sheet, Data Table | `components/<padrão>.md` |
| **Página/seção completa** | Dashboard, layout com sidebar | `blocks/<bloco>.md` |
| **Alteração pequena** | Trocar variante, corrigir espaçamento, adicionar prop | `references/<componente>.md` para verificar API |
| **Interface de IA** | Chat com agente, resposta em streaming, raciocínio, tool call, prompt | `components/ai-chat.md` + `references/ai/<componente>.md` (só v3.x) |

**Página/seção NOVA sem direção visual declarada?** Antes de continuar,
invoque **blips-ui:designing** (direção de densidade/profundidade/layout/tom é
pré-requisito — sem ela, todo dashboard sai igual). Mudança pequena em tela
existente: siga a direção já estabelecida na tela.

### Passo 2: Listar Componentes Envolvidos

Nomeie cada componente que será utilizado. Para cada um, declare:
- Qual arquivo de referência será consultado (ex: `references/button.md`)
- Se precisa de um guia de composição (ex: `components/forms/forms.md`)
- Quais padrões compartilhados se aplicam (formRef, Popover modal, Sheet width override)
- Em qual trilha (v3.x ou v2.x) a API será lida

### Passo 3: Ler Antes de Escrever

Leia os arquivos de referência relevantes. Só então escreva código. Isso previne:
- Usar props/variantes erradas (ex.: na v3.x, `sm:max-w-lg` em vez de `sm:data-[side=right]:max-w-lg` no Sheet)
- Usar a API da versão errada (ex: `asChild` num repo v3, `render` num repo v2)
- Perder convenções do projeto (ex: esquecer prop `modal` no Popover dentro de Sheet)
- Reinventar padrões que já existem no codebase

**Exemplo de saída do raciocínio:**

> Construindo formulário de edição de aluno dentro de um Sheet.
>
> Versão: `@blips/ui` 3.0.0 no package.json → trilha **v3.x — Base UI** (triggers com `render`, ícones `*Icon`).
> Componentes: Sheet, Form, Input, Select, Button, Sonner (para toast de feedback)
> Referências a consultar: `references/sheet.md`, `references/form.md`, `references/input.md`, `references/select.md`
> Guia de composição: `components/sheet.md`, `components/forms/forms.md`, `components/forms/schemas.md`
> Padrões compartilhados: formRef (botão de submit no SheetFooter), `className="flex flex-1 flex-col overflow-hidden"` no wrapper do form

---

## Divulgação Progressiva

Esta skill é organizada em 3 níveis. Leia apenas o que precisa — comece pelo nível mais alto que corresponde à sua tarefa:

| Nível | Diretório | Conteúdo | Quando ler |
|-------|-----------|----------|------------|
| **1. Atômico** | [`references/`](references/) | API shadcn/ui por componente (props, variantes, exports, exemplos), com seções v3.x e v2.x | Precisa da API exata de um componente base |
| **2. Composição** | [`components/`](components/) | Padrões compostos específicos do projeto | Construindo UI composta com convenções do projeto |
| **3. Página** | [`blocks/`](blocks/) | Padrões de página/seção completos | Montando páginas inteiras ou seções principais |

---

## Nível 1: Referências

Um arquivo por componente em `references/<nome-do-componente>.md`.

Para consultar a API de um componente: leia `references/<nome>.md` onde `<nome>` corresponde ao arquivo do componente em `packages/ui/src/components/`.

Disponíveis nas duas versões: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp, kbd, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

**Só na v3.x** (não existem num repo v2): attachment, bubble, combobox, direction, item, marker, message, message-scroller, native-select, questionnaire, toast.

Diferenças transversais entre as versões: [`references/v2-vs-v3.md`](references/v2-vs-v3.md).

Cada arquivo contém: caminho de importação e conteúdo comum primeiro; depois as seções `## v3.x — Base UI` e `## v2.x — Radix`, cada uma com sub-componentes, props, exemplos e notas daquela versão. Quando a API é igual nas duas, o arquivo diz "API igual na v2.x e na v3.x." e traz um único exemplo.


### Componentes de IA (@blips/ai)

Pacote à parte, `@blips/ai`, que **compõe** a @blips/ui v3.x (exige `@blips/ui`
^3 e React 19; num repo v2.x não existe). Sem barrel: import sempre por subpath
(`@blips/ai/components/<nome>` ou `@blips/ai/fx/<nome>`). Os componentes são
apresentacionais: recebem `parts`/`state`/`status` prontos, e o mapeamento do
AI SDK ou de eventos próprios (ex.: AgentOS do Agno) fica no app. Alguns exigem
peers opcionais (Streamdown, Shiki, `@xyflow/react`, `media-chrome`,
`@rive-app/react-webgl2`, `react-jsx-parser`, `ansi-to-react`, `ai`): cada
reference diz quais. Os componentes de canvas exigem ainda que o app importe
`@xyflow/react/dist/style.css` uma vez (a @blips/ai não importa CSS de peer), e
o `jsx-preview` exige o override `pnpm.overrides`
`"react-jsx-parser>@types/react": "^19.2.0"` (e `>@types/react-dom`), porque o
parser traz `@types/react` 18. `ai` é peer
só de tipos (sem runtime); como o pacote publica `.tsx`, em projeto TypeScript
instale como devDependency (`pnpm add -D ai`). Quem usa `MessageResponse` (ou
`Reasoning`) importa `streamdown/styles.css` e declara `@source` do dist do
`streamdown` e dos quatro plugins `@streamdown/*`, mais o `katex.min.css`
(setup: skill **blips-ui:installing**).
Para montar a tela inteira, comece por [`components/ai-chat.md`](components/ai-chat.md).

| Componente | Import | Reference | Quando usar |
|---|---|---|---|
| Message (IA) | `@blips/ai/components/message` | [references/ai/message.md](references/ai/message.md) | Resposta do modelo em markdown com streaming (`MessageResponse`), ações e ramos; casca `Message` reexportada da @blips/ui |
| Shimmer | `@blips/ai/components/shimmer` | [references/ai/shimmer.md](references/ai/shimmer.md) | Texto de status animado ("Pensando…") |
| Conversation | `@blips/ai/components/conversation` | [references/ai/conversation.md](references/ai/conversation.md) | Lista da conversa que gruda no fim, estado vazio, botão de rolar, exportar markdown |
| Suggestion | `@blips/ai/components/suggestion` | [references/ai/suggestion.md](references/ai/suggestion.md) | Sugestões de pergunta clicáveis |
| PromptInput | `@blips/ai/components/prompt-input` | [references/ai/prompt-input.md](references/ai/prompt-input.md) | Campo de prompt com envio/parar, anexos, menus e seletor de modelo |
| Context | `@blips/ai/components/context` | [references/ai/context.md](references/ai/context.md) | Uso da janela de contexto e custo em tokens |
| CodeBlock | `@blips/ai/components/code-block` | [references/ai/code-block.md](references/ai/code-block.md) | Código com realce (Shiki), copiar, números de linha |
| Reasoning | `@blips/ai/components/reasoning` | [references/ai/reasoning.md](references/ai/reasoning.md) | Raciocínio do modelo, recolhível, com duração |
| ChainOfThought | `@blips/ai/components/chain-of-thought` | [references/ai/chain-of-thought.md](references/ai/chain-of-thought.md) | Passos do agente (buscas, imagens, etapas) em linha do tempo |
| Tool | `@blips/ai/components/tool` | [references/ai/tool.md](references/ai/tool.md) | Chamada de ferramenta com estado, parâmetros e resultado |
| Confirmation | `@blips/ai/components/confirmation` | [references/ai/confirmation.md](references/ai/confirmation.md) | Aprovação humana de ferramenta (aprovar/recusar) |
| Sources | `@blips/ai/components/sources` | [references/ai/sources.md](references/ai/sources.md) | Lista recolhível das fontes consultadas |
| InlineCitation | `@blips/ai/components/inline-citation` | [references/ai/inline-citation.md](references/ai/inline-citation.md) | Citação no meio do texto com cartão e carrossel de fontes |
| BorderBeam | `@blips/ai/fx/border-beam` | [references/ai/border-beam.md](references/ai/border-beam.md) | Feixe animado na borda (ex.: prompt enquanto o agente trabalha) |
| ThinkingOrbs | `@blips/ai/fx/thinking-orbs` | [references/ai/thinking-orbs.md](references/ai/thinking-orbs.md) | Orbe animado pequeno (escala de texto) de "agente pensando" |
| **Fluxo e canvas (peer `@xyflow/react` + o app importa `@xyflow/react/dist/style.css`)** | | | |
| Canvas | `@blips/ai/components/canvas` | [references/ai/canvas.md](references/ai/canvas.md) | Área de fluxo (React Flow) com os padrões da Blips e rótulos de acessibilidade em pt-BR (`canvasAriaLabelConfig`): raiz dos demais componentes de canvas |
| Node | `@blips/ai/components/node` | [references/ai/node.md](references/ai/node.md) | Nó de fluxo: `Card` da @blips/ui com handles de entrada/saída, para custom nodes |
| Edge | `@blips/ai/components/edge` | [references/ai/edge.md](references/ai/edge.md) | Tipos de aresta `Edge.Animated` (caminho ativo) e `Edge.Temporary` (tracejada) para `edgeTypes` |
| Connection | `@blips/ai/components/connection` | [references/ai/connection.md](references/ai/connection.md) | Linha exibida enquanto o usuário arrasta uma conexão nova (`connectionLineComponent`) |
| Controls | `@blips/ai/components/controls` | [references/ai/controls.md](references/ai/controls.md) | Controles de zoom/enquadrar do canvas no visual da @blips/ui |
| Panel | `@blips/ai/components/panel` | [references/ai/panel.md](references/ai/panel.md) | Caixa flutuante sobre o canvas (ações, legenda, status do fluxo) |
| Toolbar | `@blips/ai/components/toolbar` | [references/ai/toolbar.md](references/ai/toolbar.md) | Barra de ações de um nó, visível ao selecioná-lo |
| **Voz e mídia** | | | |
| SpeechInput | `@blips/ai/components/speech-input` | [references/ai/speech-input.md](references/ai/speech-input.md) | Botão de ditado (Web Speech ou gravação + transcrição própria) |
| Transcription | `@blips/ai/components/transcription` | [references/ai/transcription.md](references/ai/transcription.md) | Transcrição com segmentos sincronizados ao tempo do áudio |
| MicSelector | `@blips/ai/components/mic-selector` | [references/ai/mic-selector.md](references/ai/mic-selector.md) | Seletor de microfone (dispositivos de áudio) com busca |
| VoiceSelector | `@blips/ai/components/voice-selector` | [references/ai/voice-selector.md](references/ai/voice-selector.md) | Seletor de voz de TTS com busca e prévia |
| AudioPlayer | `@blips/ai/components/audio-player` | [references/ai/audio-player.md](references/ai/audio-player.md) | Player de áudio (peer `media-chrome`) |
| Persona | `@blips/ai/components/persona` | [references/ai/persona.md](references/ai/persona.md) | Avatar animado do agente por estado (peer `@rive-app/react-webgl2`; `.riv` hospedados pela Vercel, use `src` com assets próprios em produção) |
| **Agente e tarefa** | | | |
| Agent | `@blips/ai/components/agent` | [references/ai/agent.md](references/ai/agent.md) | Cartão de configuração de um agente: instruções, ferramentas, schema de saída |
| Plan | `@blips/ai/components/plan` | [references/ai/plan.md](references/ai/plan.md) | Plano do agente recolhível, com título em streaming |
| Queue | `@blips/ai/components/queue` | [references/ai/queue.md](references/ai/queue.md) | Fila de mensagens/tarefas pendentes, com seções e anexos |
| Task | `@blips/ai/components/task` | [references/ai/task.md](references/ai/task.md) | Tarefa recolhível com itens e arquivos tocados |
| Checkpoint | `@blips/ai/components/checkpoint` | [references/ai/checkpoint.md](references/ai/checkpoint.md) | Marco na conversa para restaurar um estado anterior |
| Question | `@blips/ai/components/question` | [references/ai/question.md](references/ai/question.md) | Pergunta do agente ao usuário com opções e campo livre |
| **Código e dev** | | | |
| Artifact | `@blips/ai/components/artifact` | [references/ai/artifact.md](references/ai/artifact.md) | Painel de artefato gerado (cabeçalho, ações, conteúdo) |
| Commit | `@blips/ai/components/commit` | [references/ai/commit.md](references/ai/commit.md) | Commit com hash, autor, data e arquivos alterados |
| EnvironmentVariables | `@blips/ai/components/environment-variables` | [references/ai/environment-variables.md](references/ai/environment-variables.md) | Lista de variáveis de ambiente com valores ocultáveis e cópia |
| FileTree | `@blips/ai/components/file-tree` | [references/ai/file-tree.md](references/ai/file-tree.md) | Árvore de arquivos com pastas recolhíveis e seleção |
| JSXPreview | `@blips/ai/components/jsx-preview` | [references/ai/jsx-preview.md](references/ai/jsx-preview.md) | Prévia de JSX gerado em streaming (peer `react-jsx-parser`, com override de `@types/react` 19 para ele no `package.json` da raiz) |
| PackageInfo | `@blips/ai/components/package-info` | [references/ai/package-info.md](references/ai/package-info.md) | Pacote com versão, tipo de mudança e dependências |
| Sandbox | `@blips/ai/components/sandbox` | [references/ai/sandbox.md](references/ai/sandbox.md) | Execução de código pelo agente: status da tool + abas (código, saída); exige `shiki` |
| SchemaDisplay | `@blips/ai/components/schema-display` | [references/ai/schema-display.md](references/ai/schema-display.md) | Cartão de endpoint HTTP: método, caminho, parâmetros, corpo e resposta |
| Snippet | `@blips/ai/components/snippet` | [references/ai/snippet.md](references/ai/snippet.md) | Comando/trecho de uma linha com botão de copiar |
| StackTrace | `@blips/ai/components/stack-trace` | [references/ai/stack-trace.md](references/ai/stack-trace.md) | Stack trace JS/Node (formato V8) com erro, frames recolhíveis e cópia; traceback Python vai no Terminal |
| Terminal | `@blips/ai/components/terminal` | [references/ai/terminal.md](references/ai/terminal.md) | Saída de terminal com cores ANSI, status e cópia (peer `ansi-to-react`) |
| TestResults | `@blips/ai/components/test-results` | [references/ai/test-results.md](references/ai/test-results.md) | Resultado de testes: resumo, progresso, suítes e falhas |
| WebPreview | `@blips/ai/components/web-preview` | [references/ai/web-preview.md](references/ai/web-preview.md) | Prévia de página em iframe com barra de URL e console |
| **Conteúdo e modelo** | | | |
| Attachments | `@blips/ai/components/attachments` | [references/ai/attachments.md](references/ai/attachments.md) | Anexos de IA (`FileUIPart`) sobre o `Attachment` da @blips/ui, com prévia e remoção |
| Image | `@blips/ai/components/image` | [references/ai/image.md](references/ai/image.md) | Imagem gerada por modelo (`GeneratedFile` do AI SDK, base64) |
| ModelSelector | `@blips/ai/components/model-selector` | [references/ai/model-selector.md](references/ai/model-selector.md) | Seletor de modelo com busca, logos de provedor e grupos |
| OpenInChat | `@blips/ai/components/open-in-chat` | [references/ai/open-in-chat.md](references/ai/open-in-chat.md) | Menu "abrir em" outros chats (ChatGPT, Claude, v0…) com o prompt |

---

## Nível 2: Componentes (padrões compostos)

### Seleção & Overlay

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Combobox | [components/combobox.md](components/combobox.md) | Select com busca/filtro, dropdowns com dados da API |
| Dialog | [components/dialog.md](components/dialog.md) | Modais, confirmações (AlertDialog), formulários rápidos |
| Sheet | [components/sheet.md](components/sheet.md) | Painéis laterais, visualizações detalhadas, formulários complexos |

### Interface de IA (@blips/ai, só v3.x)

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Tela de chat | [components/ai-chat.md](components/ai-chat.md) | Conversa com agente: Conversation + Message + MessageResponse + Reasoning + Tool + Sources + PromptInput + Suggestion + Shimmer, com dados do AI SDK (`useChat`) ou de eventos próprios (AgentOS); fluxo de agente com Attachments, Plan/Task/Queue e Confirmation |

### Formulários (react-hook-form + Zod)

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Formulários | [components/forms/forms.md](components/forms/forms.md) | Estrutura do formulário, formRef, setup básico |
| Schemas | [components/forms/schemas.md](components/forms/schemas.md) | Validação Zod, documentos BR, enums |
| Componentes de Form | [components/forms/form-components.md](components/forms/form-components.md) | Input, Select, Switch, layouts em grid |
| Máscaras de Input | [components/forms/masks.md](components/forms/masks.md) | CPF, CNPJ, telefone, moeda, CEP |
| Upload de Arquivos | [components/forms/upload.md](components/forms/upload.md) | useFileUpload, drag-and-drop |
| Arrays de Form | [components/forms/arrays.md](components/forms/arrays.md) | Listas de campos dinâmicos, validação por item |

### Gráficos (Recharts + shadcn/ui)

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Gráficos | [components/charts/charts.md](components/charts/charts.md) | ChartConfig, Bar/Line/Pie básicos |
| Temas | [components/charts/theming.md](components/charts/theming.md) | Variáveis CSS, cores light/dark |
| Tooltip | [components/charts/tooltip.md](components/charts/tooltip.md) | Customização de tooltip, formatadores |
| Legenda | [components/charts/legend.md](components/charts/legend.md) | Posicionamento de legenda, legendas de PieChart |

### Sidebar

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Sidebar | [components/sidebar/sidebar.md](components/sidebar/sidebar.md) | Estrutura, Provider, variantes |
| Componentes | [components/sidebar/sidebar-components.md](components/sidebar/sidebar-components.md) | Header, Footer, Content, Group, Rail |
| Menu | [components/sidebar/menu.md](components/sidebar/menu.md) | MenuButton, Submenus, Badges |
| Temas | [components/sidebar/theming.md](components/sidebar/theming.md) | Variáveis CSS, dark mode |
| Padrões | [components/sidebar/patterns.md](components/sidebar/patterns.md) | Padrões admin, NavItem, rotas |
| Dados | [components/sidebar/data.md](components/sidebar/data.md) | RSC, carregamento de dados via API |

### Data Table (TanStack Table)

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Data Table | [components/data-table/data-table.md](components/data-table/data-table.md) | Estrutura, exemplo mínimo |
| Setup | [components/data-table/setup.md](components/data-table/setup.md) | Instalação, hooks |
| Colunas | [components/data-table/columns.md](components/data-table/columns.md) | Definição de colunas, `meta.title` |
| Ordenação | [components/data-table/sorting.md](components/data-table/sorting.md) | Ordenação client/server |
| Filtragem | [components/data-table/filtering.md](components/data-table/filtering.md) | Filtros, debounce |
| Paginação | [components/data-table/pagination.md](components/data-table/pagination.md) | Client/server/cursor |
| Seleção de Linhas | [components/data-table/row-selection.md](components/data-table/row-selection.md) | Seleção, cross-page |
| Visibilidade | [components/data-table/visibility.md](components/data-table/visibility.md) | Toggle de colunas |
| Toolbar | [components/data-table/toolbar.md](components/data-table/toolbar.md) | Componentes de toolbar |

---

## Nível 3: Blocos (padrões de página)

| Bloco | Arquivo | Quando usar |
|-------|---------|-------------|
| Dashboard | [blocks/dashboard.md](blocks/dashboard.md) | Sidebar + gráficos + data table |
| Layouts de Sidebar | [blocks/sidebar-layouts.md](blocks/sidebar-layouts.md) | 16 variantes de layout com sidebar |
| Composições de Gráficos | [blocks/chart-compositions.md](blocks/chart-compositions.md) | Area, Bar, Line, Pie, Radar, Radial |

---

## Guia de Seleção de Componentes

| Necessidade | Componente | Por quê |
|-------------|-----------|---------|
| Select com busca | **Combobox** | v2.x: Popover + Command (`components/combobox.md`). v3.x: primitivo `Combobox` da lib (`references/combobox.md`), ou o mesmo padrão Popover + Command |
| Ação rápida/confirmação | **Dialog** | Modal centralizado, atenção focada |
| Confirmação destrutiva | **AlertDialog** | Sem fechar ao clicar fora |
| Visualização detalhada / formulário complexo | **Sheet** | Painel lateral, scroll full-height, footer fixo |
| Entrada de dados com validação | **Form** | react-hook-form + Zod, formRef para Sheet/Dialog |
| Visualização de dados | **Chart** | Recharts + ChartContainer, temas via variáveis CSS |
| Navegação do app | **Sidebar** | Colapsável, menus, grupos, modo ícone |
| Listagem de dados | **Data Table** | TanStack Table, suporte server-side |
| Chat com agente/LLM | **Conversation + Message (@blips/ai)** | Streaming, raciocínio, ferramentas e fontes sobre a casca `Message`/`Bubble` da @blips/ui (`components/ai-chat.md`) |

---

## Padrões Compartilhados

Estes padrões aparecem frequentemente entre componentes. Internalize-os:

- **Controlled/Uncontrolled**: Todos os componentes de seleção usam `valueProp ?? internalValue`.
- **Form em Sheet**: Envolva `SheetBody`/`SheetFooter` em `<form className="flex flex-1 flex-col overflow-hidden">`. Dialog não precisa disso.
- **FormRef**: Quando o botão de submit está fora do formulário (ex: SheetFooter), use `formRef.current?.requestSubmit()`.
- **Popover em Sheet/Dialog**: Sempre adicione a prop `modal` no Popover para corrigir scroll.
- **Largura do Sheet**: na v3.x, use `sm:data-[side=right]:max-w-lg` (o `SheetContent` emite `data-side` e a largura base vem de `data-[side=right]:sm:max-w-sm`, que um `sm:max-w-lg` solto não vence). Na v2.x, use `sm:max-w-lg`: o `SheetContent` Radix não emite `data-side`, então `sm:data-[side=right]:` nunca casa.
- **Estados vazios**: Sempre trate estados vazios/nulos (CommandEmpty, verificações de no-data).

---

## Regras

Os critérios canônicos de conformidade (construção de componentes, estados de
UI, acessibilidade, tipografia, formulários, movimento, formatação pt-BR e
fatos da lib) vivem nas **references da skill `blips-ui:reviewing`** — fonte
única. Dois mordem com frequência ao implementar:
`reviewing/references/motion.md` (durações, transform/opacity, reduced-motion —
animação é craft) e a **completude de código** em `component-standards.md`
(entregue o componente inteiro; nada de `// ...` ou "resto segue o padrão"). As
listas abaixo são o resumo
operacional durante a construção, não o critério de aceite.

### FAÇA

- Detecte a versão da `@blips/ui` (Passo 0) e leia só a seção da trilha certa
- Leia o arquivo de referência relevante antes de usar qualquer componente
- Use `cn()` para classes condicionais
- Inclua componentes Title para acessibilidade (DialogTitle, SheetTitle)
- Use `AlertDialog` para confirmações destrutivas
- Use `formRef` quando o botão de submit estiver fora do formulário
- Use `satisfies ChartConfig` para segurança de tipos
- Adicione `min-h-[VALUE]` no ChartContainer
- Adicione `accessibilityLayer` nos componentes raiz dos gráficos (v2.x/recharts 2; na v3.x o recharts 3 já liga por padrão)
- Use a prop `tooltip` no SidebarMenuButton para modo ícone
- Defina `meta.title` em todas as colunas da tabela
- Use paginação server-side para listas > 100 itens

### NÃO FAÇA

- Não pule o protocolo de raciocínio — sempre identifique a versão e os componentes primeiro
- Não misture trilhas: nada de `asChild`, `data-[state=…]` ou ícone sem sufixo em repo v3; nada de `render`, `data-open` ou componente só da v3 em repo v2
- Não use `useEffect` para medições de layout — use `useLayoutEffect`
- Não aninhe múltiplos modais
- Não use `useFieldArray` — prefira controle manual
- Não hardcode cores de gráficos — use `var(--color-KEY)`
- Não importe tooltip/legend do Recharts — use wrappers do shadcn
- Não use paginação client-side para > 100 itens
- Não duplique títulos de colunas — use apenas `meta.title`

---

## Localização dos Fontes

Na biblioteca `@blips/ui`:

- `packages/ui/src/components/` — Componentes base shadcn (Base UI na v3.x, Radix na v2.x)
- `packages/ui/src/hooks/` — Hooks customizados (use-file-upload, use-mobile)
- `packages/ai/src/components/` e `packages/ai/src/fx/` — `@blips/ai` (componentes de IA e efeitos visuais)

Componentes compostos (data tables, comboboxes de entidade, etc.) e utilitários de domínio (máscaras de input) vivem no app que consome a biblioteca.

---

## Antes de declarar pronto (obrigatório)

Construção concluída ≠ trabalho concluído. Ao terminar a tela/componente:

1. Invoque a skill **blips-ui:reviewing** sobre os arquivos que você tocou
   (ela roda o check mecânico + o revisor com os critérios canônicos).
2. **Bloqueantes encontrados → corrija e revise de novo.** Não negocie com o
   gate: quem implementou racionaliza o próprio desvio — por isso o critério é
   externo.
3. Só reporte "pronto" com o veredito da review (`Bloqueantes: 0`), citando-o.

Sem a skill reviewing disponível (plugin não instalado no ambiente): rode ao
menos o checklist FAÇA/NÃO FAÇA acima e declare explicitamente que a review
canônica não foi executada.
