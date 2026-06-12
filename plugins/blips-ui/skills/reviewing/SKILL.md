---
name: reviewing
description: "Use ao FINALIZAR qualquer trabalho de UI em repos que usam @blips/ui — antes de declarar pronto/commitar — e quando pedirem para revisar interface: 'revisa essa tela', 'tá nos padrões da blips?', 'faz o review do componente', review de PR com mudanças de UI, ou auditoria de conformidade de um app. Também ao suspeitar de violações: imports do barrel, lucide-react, cores hardcoded, telas sem loading/empty/erro, dialogs sem título, dinheiro formatado à mão."
---

# Revisando UI contra os padrões Blips

## Visão geral

Valida trabalho de UI feito sobre a `@blips/ui` contra os padrões da Blips. Os
critérios canônicos vivem nas `references/` desta skill — **não revise de
memória**: nos baselines, revisores genéricos *inverteram* a convenção de
imports (mandaram trocar subpath por barrel, 2/2 vezes), inventaram violações
contra tokens que existem (`text-success`, `font-display`) e recomendaram
fixes contrários ao padrão. **Um review sem os fatos é pior que nenhum review.**

**Anuncie ao começar:** "Usando blips-ui:reviewing para validar o trabalho de UI."

## Regra de ouro (anti-inversão)

Antes de classificar QUALQUER achado sobre imports, tokens, tema ou contrato
do pacote, consulte `references/lib-facts.md`. Nunca afirme que algo "não
existe na lib" ou "não faz parte do contrato" sem confirmar lá (e, em caso de
dúvida, no próprio `node_modules/@blips/ui/src/`).

| Racionalização do revisor | Realidade verificada |
| --- | --- |
| "Subpaths não fazem parte do contrato; a API é o barrel" | O exports map publica `./components/*` — subpath é a CONVENÇÃO em React 18/19; o barrel quebra App Router (sem `"use client"` no dist) |
| "`text-success`/`font-display` não existem no tema" | Existem (`--color-success`, `--font-display: Quicksand`) — ver lib-facts |
| "Falta `@source` para node_modules" | O globals da lib declara o próprio `@source`; sugerir isso é o anti-padrão do @source defensivo |
| "Complete o override de token com o par + dark" | Override de token da lib é violação — tema é fonte única; a correção é REMOVER o override |

## Checklist (crie um todo por item)

1. **Definir o escopo** — o que revisar: diff da feature, diretórios tocados
   ou app inteiro (pergunte se ambíguo). Detecte a versão do React.
2. **Rodar o check mecânico** — `node <skill>/scripts/check.mjs <dir-do-app>`
   (determinístico: imports, lucide, tailwind.config, tokens copiados/hardcoded,
   `hsl(var(`, Intl sem locale, Dialog sem Title, icon-button sem label, deps
   fantasmas). Saída JSON; trate cada item como candidato confirmado.
3. **Despachar o revisor de julgamento** — subagente com o prompt
   `agents/ui-reviewer.md`, apontando o escopo e as references. Cobre o que
   grep não pega: estados de query, anatomia de empty state, ordem de hooks,
   estado derivado, headings, estrutura de página. **Sem ferramenta de
   subagentes disponível?** Execute você mesmo o prompt do ui-reviewer.md —
   lendo as references da dimensão ANTES de olhar o código (a ordem importa:
   critérios primeiro, código depois, para não ancorar no que o autor fez).
4. **Consolidar o relatório** — formato abaixo; deduplicar com o mecânico.
5. **Gate** — bloqueantes abertos = trabalho NÃO está pronto. Reporte e
   (se o fluxo for pós-building) corrija antes de declarar concluído.

## Dimensões e referências canônicas

São a **fonte única** dos critérios — `designing` e `building` apontam para cá.
Cada regra nas references é marcada **auto-verificável (check.mjs)** ou
**julgamento (revisor)**, com severidade **bloqueante** ou **aviso**. Leia a
reference da dimensão que está revisando ANTES do código.

| Dimensão | Reference | Cobre |
| --- | --- | --- |
| Fatos da lib | `references/lib-facts.md` | exports/imports por React, tokens do tema, deps embutidas |
| Construção | `references/component-standards.md` | extração, estado derivado, ordem de hooks, composição, **completude de código**, **proximidade/agrupamento (Leis de UX)**, estrutura de página |
| Estados de UI | `references/ui-states.md` | loading/empty/erro/mutação; thresholds de loading, retry, matriz ARIA/foco |
| Acessibilidade | `references/accessibility.md` | mínimos que o Radix não cobre; target size, foco, contraste, rótulos |
| Tipografia | `references/typography.md` | 3 pesos, medida, tracking, hierarchy lint, editorial |
| Formulários | `references/forms.md` | máquina de estados de validação, timing, RHF+Zod, nunca-resetar |
| Movimento | `references/motion.md` | durações, transform/opacity, reduced-motion, loops/WCAG |
| Formatação | `references/data-formatting.md` | BRL/datas/pt-BR (8 convenções) |
| Anti-genérico | `references/anti-slop.md` | "AI slop" P0/P1/P2: hexes banidos, emoji-ícone, fórmula 80/20 |

O `scripts/check.mjs` cobre o subconjunto **auto-verificável** dessas dimensões
(imports, ícones, tailwind, formatação, a11y, anti-slop, tipografia, motion,
construção). O revisor de julgamento cobre o resto.

### Dois modos de review

- **Conformidade** (default): "segue os padrões?" — as dimensões acima, gate
  bloqueante/aviso. É o que roda em PR/finalização de UI.
- **Crítica** (`references/critique.md`): "é *bem desenhado*?" — qualidade
  scored em 5 dimensões (Coerência/Hierarquia/Execução/Funcionalidade/
  Restrição-ou-Distinção, 0-10 com evidência). Invocado pelo **loop da
  blips-ui:designing** após a building entregar. Inteiramente julgamento.

## Formato do relatório (use exatamente este)

```
## Review de UI — <escopo>

### Violações dos padrões Blips
| # | Arquivo | Violação | Regra (reference) | Severidade | Correção |
(severidade vem DO PADRÃO — bloqueante/aviso — não invente)

### Observações gerais (fora dos padrões)
(bugs de runtime, sugestões de UX/responsividade etc. — NUNCA misturar com
as violações; é informação útil, não gate)

### Veredito
- Bloqueantes: N · Avisos: N → <pronto | requer correção>
```

## Red flags do PRÓPRIO review — pare e releia as references

- Recomendar barrel em React 18/19 (ou subpath em 17)
- Afirmar que um token/export "não existe" sem checar lib-facts
- Sugerir `@source`, copiar/"completar" tokens, ou criar token que já existe
- Severidade inventada em vez da do padrão
- Violação e observação geral misturadas na mesma lista
- Reportar "conforme" sem ter rodado o check mecânico

Construção de telas é guiada pela skill **blips-ui:building** (as correções
sugeridas devem apontar para os componentes/padrões dela).
