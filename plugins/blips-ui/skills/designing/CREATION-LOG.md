# CREATION-LOG — designing

## 2026-06-10 — Fusão de design-principles + frontend-design

Origem: auto-grading de 2026-06-09 deu 5.5 e 4.0 às duas skills, com
conflitos doutrinários diretos (frontend-design proibia Inter — a fonte da
marca; mandava "dramatic shadows/gradient meshes" que o design-principles
listava como Never; design-principles mandava hand-rollar controles contra a
própria lib Radix; gatilhos colidiam com a building).

Decisões do usuário na fusão:
1. **Produto default + modo criativo opt-in** (landing/marketing/showcase;
   na dúvida, produto).
2. **Tokens sempre, sem exceção** — nem o modo criativo escolhe fonte/cor;
   a diferenciação vem de composição/escala/movimento/atmosfera sobre o tema.
3. **Direção de design mantida e reescopada** ao que é grau de liberdade real
   na Blips (densidade, profundidade, layout, tom) — cor/fonte saíram da mesa
   (eram o conflito com o tema fixo).
4. Validação: audit de qualidade de skill + teste de reconhecimento (3
   cenários), avaliados pelo criador.

O que sobreviveu de cada uma: do design-principles, os valores concretos
(grid 4px, receitas de profundidade, escala/easing/durações, Never mensurável,
o passo de Direção) e o aterramento em tokens; do frontend-design, a lista
anti-genérico e a doutrina de movimento/composição para superfícies criativas.
O que morreu: escolha de cor/fonte, hand-rolled controls, "Jony Ive-level",
seção motivacional, sugestão de Vue.

Skills antigas removidas; auto-verificação virou checklist binário
(fix da auditoria: era 100% subjetivo); handoffs explícitos para
building/reviewing.

## Validação (2026-06-10)

- **Reconhecimento: 5/5** — 3 cenários (dashboard denso, landing, settings)
  com modo, direção 4D e regras certos; B criativo SEM cor/fonte nova; C nunca
  criativo.
- **Audit: 8.3/10** (antigas: 5.5 e 4.0). 4 dos 5 problemas antigos mortos;
  o residual (ponte building→designing inexistente) + 4 ajustes do audit
  aplicados na sequência: classes reais na hierarquia de contraste, checklist
  escopado por modo, descrição <500 chars, claim de escalas verificável, e o
  Passo 1 da building agora invoca designing para tela nova sem direção.
- Pendência iteração 2: rodar o eval de pressão (id 1) — urgência não é
  licença para pular a direção obrigatória.

## 2026-06-10 — Mineração open-design (references da designing)

Fonte: nexu-io/open-design (Apache 2.0) — `plugins/blips-ui/NOTICE.md`.
3 references novas:
- `references/design-system.md` — o DESIGN.md da Blips no formato de 9 seções
  do open-design, 100% sobre os tokens reais do `globals.css` (a peça pedida).
  Correção factual aplicada: `--font-heading` é alias de Inter, só
  `--font-display` é Quicksand.
- `references/archetypes.md` — 16 arquétipos (8 produto + 8 criativos) como
  vocabulário de direção; tokens/fonte sempre do tema.
- `references/creative-presets.md` — 3 presets criativos opt-in (bans → técnica),
  sobre o tema fixo.

SKILL.md ganhou: tabela "do pedido à direção" (NL→dimensão, do design-brief),
a fórmula 80/20 anti-genérico, e ponteiros para as 3 references + para as
references de craft da reviewing (fonte única dos números). Fronteira explícita
archetypes ↔ creative-presets (vocabulário vs COMO binário; canônica vence).
