---
name: building
description: "Padrões, APIs e convenções da biblioteca de componentes Blips UI (@blips/ui) — shadcn/ui + Radix. Use esta skill sempre que criar, modificar ou revisar QUALQUER código de interface — páginas, componentes, formulários, tabelas, modais, sheets, gráficos, sidebars, layouts ou estilização. Isso inclui: editar arquivos .tsx que usam componentes de @blips/ui, construir com Tailwind CSS, trabalhar com react-hook-form, TanStack Table, Recharts ou primitivas Radix. Até mudanças pequenas (trocar variante de Button, adicionar Badge, corrigir layout) se beneficiam desta skill para garantir que as convenções da biblioteca sejam seguidas. Dispara em qualquer tarefa de UI: criação de componente, layout de página, construção de formulário, data table, gráfico, modal, sheet, sidebar, estilização, design responsivo, acessibilidade, loading states, empty states ou refatoração de UI."
---

# Construindo Componentes UI

Esta skill contém a referência completa para construir UI com a biblioteca Blips UI. Utiliza primitivas Radix UI via `@blips/ui/components/*`, Tailwind CSS e ícones Phosphor (`@phosphor-icons/react`). Os exemplos de busca de dados são agnósticos — conecte os componentes à camada de dados do seu app (React Query, SWR, tRPC, etc.).

## Protocolo de Raciocínio

Antes de escrever ou modificar QUALQUER código de UI, você DEVE seguir este processo de raciocínio e compartilhá-lo com o usuário. Isso garante que os componentes certos sejam usados com os padrões corretos.

### Passo 1: Identificar a Tarefa de UI

Classifique o que está construindo:

| Categoria | Exemplos | Comece em |
|-----------|----------|-----------|
| **Componente único** | Button, Badge, Input, Avatar | `references/<componente>.md` |
| **Padrão composto** | Combobox, formulário em Sheet, Data Table | `components/<padrão>.md` |
| **Página/seção completa** | Dashboard, layout com sidebar | `blocks/<bloco>.md` |
| **Alteração pequena** | Trocar variante, corrigir espaçamento, adicionar prop | `references/<componente>.md` para verificar API |

**Página/seção NOVA sem direção visual declarada?** Antes de continuar,
invoque **blips-ui:designing** (direção de densidade/profundidade/layout/tom é
pré-requisito — sem ela, todo dashboard sai igual). Mudança pequena em tela
existente: siga a direção já estabelecida na tela.

### Passo 2: Listar Componentes Envolvidos

Nomeie cada componente que será utilizado. Para cada um, declare:
- Qual arquivo de referência será consultado (ex: `references/button.md`)
- Se precisa de um guia de composição (ex: `components/forms/forms.md`)
- Quais padrões compartilhados se aplicam (formRef, Popover modal, Sheet width override)

### Passo 3: Ler Antes de Escrever

Leia os arquivos de referência relevantes. Só então escreva código. Isso previne:
- Usar props/variantes erradas (ex: `sm:max-w-lg` em vez de `sm:data-[side=right]:max-w-lg` no Sheet)
- Perder convenções do projeto (ex: esquecer prop `modal` no Popover dentro de Sheet)
- Reinventar padrões que já existem no codebase

**Exemplo de saída do raciocínio:**

> Construindo formulário de edição de aluno dentro de um Sheet.
>
> Componentes: Sheet, Form, Input, Select, Button, Sonner (para toast de feedback)
> Referências a consultar: `references/sheet.md`, `references/form.md`, `references/input.md`, `references/select.md`
> Guia de composição: `components/sheet.md`, `components/forms/forms.md`, `components/forms/schemas.md`
> Padrões compartilhados: formRef (botão de submit no SheetFooter), `className="flex flex-1 flex-col overflow-hidden"` no wrapper do form

---

## Divulgação Progressiva

Esta skill é organizada em 3 níveis. Leia apenas o que precisa — comece pelo nível mais alto que corresponde à sua tarefa:

| Nível | Diretório | Conteúdo | Quando ler |
|-------|-----------|----------|------------|
| **1. Atômico** | [`references/`](references/) | API shadcn/ui por componente (props, variantes, exports, exemplos) | Precisa da API exata de um componente base |
| **2. Composição** | [`components/`](components/) | Padrões compostos específicos do projeto | Construindo UI composta com convenções do projeto |
| **3. Página** | [`blocks/`](blocks/) | Padrões de página/seção completos | Montando páginas inteiras ou seções principais |

---

## Nível 1: Referências (54 componentes)

Um arquivo por componente shadcn/ui instalado em `references/<nome-do-componente>.md`.

Para consultar a API de um componente: leia `references/<nome>.md` onde `<nome>` corresponde ao arquivo do componente em `packages/ui/src/components/`.

Disponíveis: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp, item, kbd, label, menubar, native-select, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

Cada arquivo contém: caminho de importação, sub-componentes, props/variantes com classes CSS, exemplos de uso e notas específicas do projeto.

---

## Nível 2: Componentes (padrões compostos)

### Seleção & Overlay

| Padrão | Arquivo | Quando usar |
|--------|---------|-------------|
| Combobox | [components/combobox.md](components/combobox.md) | Select com busca/filtro, dropdowns com dados da API |
| Dialog | [components/dialog.md](components/dialog.md) | Modais, confirmações (AlertDialog), formulários rápidos |
| Sheet | [components/sheet.md](components/sheet.md) | Painéis laterais, visualizações detalhadas, formulários complexos |

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
| Select com busca | **Combobox** | Popover + Command: busca, navegação por teclado, toggle |
| Ação rápida/confirmação | **Dialog** | Modal centralizado, atenção focada |
| Confirmação destrutiva | **AlertDialog** | Sem fechar ao clicar fora |
| Visualização detalhada / formulário complexo | **Sheet** | Painel lateral, scroll full-height, footer fixo |
| Entrada de dados com validação | **Form** | react-hook-form + Zod, formRef para Sheet/Dialog |
| Visualização de dados | **Chart** | Recharts + ChartContainer, temas via variáveis CSS |
| Navegação do app | **Sidebar** | Colapsável, menus, grupos, modo ícone |
| Listagem de dados | **Data Table** | TanStack Table, suporte server-side |

---

## Padrões Compartilhados

Estes padrões aparecem frequentemente entre componentes. Internalize-os:

- **Controlled/Uncontrolled**: Todos os componentes de seleção usam `valueProp ?? internalValue`.
- **Form em Sheet**: Envolva `SheetBody`/`SheetFooter` em `<form className="flex flex-1 flex-col overflow-hidden">`. Dialog não precisa disso.
- **FormRef**: Quando o botão de submit está fora do formulário (ex: SheetFooter), use `formRef.current?.requestSubmit()`.
- **Popover em Sheet/Dialog**: Sempre adicione a prop `modal` no Popover para corrigir scroll.
- **Largura do Sheet**: Use `sm:data-[side=right]:max-w-lg` (não `sm:max-w-lg`).
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

- Leia o arquivo de referência relevante antes de usar qualquer componente
- Use `cn()` para classes condicionais
- Inclua componentes Title para acessibilidade (DialogTitle, SheetTitle)
- Use `AlertDialog` para confirmações destrutivas
- Use `formRef` quando o botão de submit estiver fora do formulário
- Use `satisfies ChartConfig` para segurança de tipos
- Adicione `min-h-[VALUE]` no ChartContainer
- Adicione `accessibilityLayer` nos componentes raiz dos gráficos
- Use a prop `tooltip` no SidebarMenuButton para modo ícone
- Defina `meta.title` em todas as colunas da tabela
- Use paginação server-side para listas > 100 itens

### NÃO FAÇA

- Não pule o protocolo de raciocínio — sempre identifique os componentes primeiro
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

- `packages/ui/src/components/` — Componentes base Radix/shadcn
- `packages/ui/src/hooks/` — Hooks customizados (use-file-upload, use-mobile)

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
