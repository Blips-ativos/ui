# Estados de UI — padrão Blips (verificável)

Base: Polaris, IBM Carbon, NN/g, GitLab Pajamas, Material 3, Apple HIG,
Baymard, WCAG 2.2, TanStack Query/TkDodo (fontes no CREATION-LOG).
Severidades entre parênteses; cada regra marcada como **auto-verificável
(check.mjs)** — lintável por grep/script — ou **julgamento (revisor)** —
exige inspeção da árvore renderizada. O loop de UI mapeia a TanStack Query
(`isPending`/`isError`/`isFetching`/`refetch`) e aos componentes da lib
(`Skeleton`, `Spinner`, `Alert`, `Progress`, `Sonner/Toaster`,
`AlertDialog`). A falha de UI gerada por IA mais comum é entregar SÓ o
estado populado — daí a cobertura obrigatória abaixo.

## As 8 regras canônicas

1. **Toda view com `useQuery` renderiza os 3 estados** na ordem `isPending` →
   `isError` → dados; sem `data?.` como único tratamento no caminho feliz.
   Inclui o pré-requisito: o `queryFn` com `fetch` lança em `!res.ok` — senão
   `isError` nunca dispara. (bloqueante) — _julgamento (revisor)_
2. **Carga inicial = Skeleton espelhando o layout** (tabelas, cards, listas),
   preservando o shell da página; Spinner só para ações pontuais e conteúdo
   não-esqueletizável (ex.: charts). **Nunca spinner de página inteira.**
   Refetch (`isFetching`) não re-mostra skeleton. (bloqueante) —
   _julgamento (revisor)_
3. **Erro de carregamento = Alert inline no lugar do conteúdo + "Tentar
   novamente" (`refetch`)**. NUNCA toast para erro de carregamento (efêmero,
   desconectado do conteúdo — consenso Polaris/NN/g/Carbon). Página de erro
   só para falha de rota inteira. (bloqueante) — _julgamento (revisor)_
4. **Toda lista/tabela/dashboard tem empty state com anatomia: ícone + título
   + descrição + ação** — DUAS variantes: "sem dados" (CTA de criar) e "sem
   resultados de filtro" (CTA de limpar filtro). `<p>Nada encontrado</p>`
   solto não cumpre. (bloqueante) — _julgamento (revisor)_
5. **Mutação: `isPending` no próprio botão (disabled + spinner) + toast
   sonner** `success`/`error` no callback do `mutate` (invalidação no
   `useMutation`); exige `<Toaster />` montado no layout. (bloqueante se sem
   feedback nenhum; aviso se feedback incompleto) — _auto-verificável
   (check.mjs): `sonner`/`<Toaster` ausentes são grep; completude é revisor_
6. **Optimistic update só em mutações pequenas, reversíveis e de baixa
   falha** (toggle, reordenar) — default é invalidar e aguardar. (aviso) —
   _julgamento (revisor)_
7. **Operações longas/mensuráveis (>10s, upload, lote) = Progress
   determinate**, não spinner indefinido. (aviso) — _julgamento (revisor)_
8. **Consistência**: o mesmo tipo de espera usa o mesmo indicador no app
   inteiro — via componentes da lib (Skeleton/Spinner/Alert/Progress), nunca
   variações ad-hoc. (aviso) — _julgamento (revisor)_

Acessibilidade dos estados (aviso): bloco de loading com `role="status"` ou
texto `sr-only` ("Carregando…") — Skeleton puro é invisível para leitor de
tela. (Detalhada na matriz ARIA abaixo.) — _julgamento (revisor)_

## (a) Thresholds de loading — escolha o indicador pela DURAÇÃO esperada

Escolha pelo tempo esperado da requisição, **não** pelo que a lib tem à mão.
Por quê: indicador cedo demais (≤300ms) pisca e parece bug; tarde demais
(spinner eterno) parece travado. Nunca deixe spinner girando para sempre —
abra um `timeout` em toda requisição (Query: `staleTime`/retry não substitui
timeout de UI).

| Duração | Indicador (componente lib) | Por quê |
|---|---|---|
| 0–300 ms | **Nada** — renderiza síncrono | abaixo do limiar de percepção; um flash de skeleton vira ruído |
| 300 ms – 2 s | **`Skeleton`** espelhando o layout (ou spinner sutil) | preserva o shell; o usuário lê a estrutura enquanto espera |
| 2 – 10 s | `Skeleton` casado ao layout **ou `Spinner` rotulado** ("Carregando pagamentos…") | rótulo dá contexto; espera já é perceptível |
| 10 – 30 s | **`Progress` determinada + botão Cancelar** | espera longa precisa de progresso real e saída |
| 30 – 60 s | `Progress` + cancelar explícito | mantém controle; o aviso dos 15s já apareceu — não repita |
| 60 s+ | **Parar a animação** → `Alert` de erro com Tentar de novo / Cancelar | passou disso é falha; animação infinita esconde o travamento |

**Fallback dos 15s (bloqueante):** em qualquer espera que ultrapasse **15 s**,
exibir o aviso "Isto está demorando mais que o esperado." (uma vez — não
repetir aos 30s). Por quê: depois de ~15s o usuário precisa saber que o
sistema não congelou. — _julgamento (revisor)_

## (b) Cobertura de estados — 5 obrigatórios + 3 de form

Toda superfície que **busca, transforma ou aceita** dados renderiza os 5
estados; teste de render-and-screenshot por lista/tabela/card/form/painel.
Por quê: estado faltante é a falha silenciosa nº 1 de UI gerada por IA.

| Estado | Dispara quando | TanStack Query | Deve conter |
|---|---|---|---|
| **loading** | dados em voo | `isPending` (`isFetching` p/ refetch) | Skeleton/Spinner/shell + fallback de 15s |
| **empty** | sem registros ou query vazia | `data.length === 0` | título + explicação + CTA primário |
| **error** | fetch/servidor/validação falhou | `isError`, `error` | causa em pt-BR + ação de recuperação + input preservado |
| **populated** | dados presentes, caso primário | `data` | o estado para o qual o design foi desenhado |
| **edge** | volume extremo, strings longas, campo opcional faltando, rede parcial | — | layout que **não quebra** |

**Matriz de edge a sobreviver** (julgamento): tabela com 10.000+ linhas, todas
colunas numéricas, sort+filtro aplicados; card com título de 200 chars, sem
avatar, sem CTA secundário; form com todos opcionais vazios e obrigatórios no
tamanho máximo; busca de 1 caractere e busca de 1.000+ resultados.

Estados de form — somam **3** sobre os 5 (bloqueante se ausente o
submitted-pending; aviso nos demais):

| Estado | Dispara quando | Comportamento (react-hook-form) |
|---|---|---|
| **untouched** | campo ainda sem foco | estilo default; **sem** mensagem de validação |
| **dirty-valid** | usuário digitou e campo passa na validação | helper text persiste; **sem** coloração de "sucesso" |
| **submitted-pending** | submit clicado, aguardando servidor | botão entra em loading (`isSubmitting`/`isPending`); campos travam contra re-submit |

Timing de validação: validar **no blur**, não na primeira tecla; campos vivos
(senha) só validam por tecla **após o primeiro blur**; remover a mensagem de
erro no instante em que o input fica válido. — _julgamento (revisor)_

## (c) Disciplina de retry

Uma superfície de retry **não** é só um botão — ela tem regras de tempo. Por
quê: marteladas imediatas contra um backend caído pioram a falha; e após 3
tentativas o usuário já fez a parte dele — o sistema precisa de um humano.

- 1ª tentativa: dispara **imediatamente** no clique do usuário.
- 2ª e 3ª: **backoff exponencial 2 s → 4 s → 8 s** (máx 8 s).
- Após **3 falhas**: trocar **"Tentar de novo"** por **"Falar com o suporte"**
  + **error ID copiável** (ex.: `requestId`/`traceId` da resposta).
- Mostrar **"Última tentativa: há Xs"** na superfície de erro após a 1ª
  tentativa, para o usuário saber quão velha é a falha.

No stack: o retry visível é o botão do `Alert` chamando `refetch()` (Query);
o backoff é da UI/wrapper, não do `retryDelay` interno do Query (esse cobre
retries automáticos, não o botão manual). — _julgamento (revisor)_

## (d) Composição do estado de erro — responde 3 perguntas, NESTA ordem

1. **O quê.** "Seu cartão foi recusado." — não "Algo deu errado."
2. **Por quê, se conhecível.** "Saldo insuficiente." ou "Rede indisponível —
   verifique sua conexão."
3. **O que fazer.** Botão de tentar de novo, caminho alternativo ou link de
   suporte.

**Preservar o input do usuário através do erro** (bloqueante): o form **não**
limpa no submit que falhou — re-digitar é punição. Por quê: erro com causa +
recuperação + input intacto transforma um beco sem saída em um passo.

Tiers de severidade — casar com o escopo da superfície (erro de validação de
campo NÃO justifica erro de página inteira):

| Tier | Superfície |
|---|---|
| campo | borda destructive + `FormMessage` inline; foco move ao campo |
| formulário | banner-resumo no topo + marcadores por campo |
| seção | `Alert` inline com retry; demais seções seguem funcionais |
| página | estado de erro cheio (ilustração + CTA de recuperação) |
| app | banner/modal persistente para perda crítica de função |

**Erro-como-empty: nunca.** Erro é estado próprio, com recuperação — não
colapsar em empty. — _julgamento (revisor); a coloração só-por-cor é grep
adjacente (ver `accessibility.md`)_

## (e) Matriz ARIA + foco por mudança de estado

Mudança de estado precisa ser **anunciada** e **focada** corretamente.
Componentes: `Sonner/Toaster` (toast = `role="status"` polite por default),
`Alert` (envolva com a live region certa), `AlertDialog` (Radix entrega
`role="alertdialog"` + foco). Por quê: sem live region o leitor de tela não
percebe que dados chegaram, falharam ou foram salvos.

| Mudança | ARIA | Ação de foco |
|---|---|---|
| Loading começa | `role="status"` + `aria-live="polite"` ("Carregando…") | **não** mover foco ao spinner |
| Loading termina (ação iniciada pelo usuário) | — | mover foco ao conteúdo carregado |
| Sucesso não-crítico / confirmação | `role="status"` + `aria-live="polite"` | **não** mover foco |
| Erro inline no submit | `role="alert"` + `aria-live="assertive"` na mensagem | mover foco ao 1º campo com erro |
| Erro crítico / confirmação destrutiva | `role="alertdialog"` (assertive) | mover foco ao dialog (Radix `AlertDialog`) |

**Regra de ouro (bloqueante):** a **live region precisa EXISTIR no DOM ANTES**
do conteúdo chegar. Adicionar `aria-live` junto com o conteúdo **não** dispara
o anúncio. Por quê: o leitor de tela só observa mutações de regiões que já
existiam — montar a região e o texto no mesmo render é silêncio. Na prática:
renderize o container `role="status"`/`role="alert"` (vazio) desde o início e
injete o texto depois — não monte o container condicionalmente junto do
texto. — _julgamento (revisor)_

## Erros comuns (lintar/inspecionar)

- Superfície só com estado populado; loading/empty/error/edge ausentes.
- Empty é um branco literal ou "Sem dados" sem título, explicação ou ação.
- Erro diz "Algo deu errado" sem causa nem recuperação.
- Spinner sem timeout; gira indefinidamente em requisição lenta ou falha.
- Submit limpa os campos na falha de validação, forçando re-digitação.
- Validação inline dispara na primeira tecla em vez de no blur.
- Loading de página inteira cobre o chrome quando só uma seção busca.
- Toast em posição diferente da dos toasts anteriores no mesmo artefato.
- Cor sozinha comunica erro — sem ícone, sem rótulo de texto.
- Toast auto-dismiss que não pausa no hover/foco (WCAG SC 2.2.1).
- `aria-live` montado junto com o conteúdo (anúncio não dispara).
- Skeleton shimmer em loop infinito — pare quando o conteúdo chega.

<!-- Fonte: nexu-io/open-design (Apache 2.0) — craft/state-coverage.md, craft/animation-discipline.md -->
