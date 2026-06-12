# Crítica de design (scored) — gate de QUALIDADE

Esta reference é o **modo crítica** da reviewing — distinto do gate de
*conformidade* (as outras references checam "segue as regras?"; aqui é "**é bem
desenhado?**"). É **julgamento (revisor)** por inteiro — nada aqui é check.mjs.
O loop da **blips-ui:designing** invoca este modo após a building entregar.

> Adaptado de nexu-io/open-design (Apache 2.0) — `design-templates/critique/`,
> `discovery.ts` (crítica em 5 dimensões). Escala 0-10, mapeada ao nosso
> vocabulário de severidade.

## Disciplina de pontuação (leia antes de pontuar)

- **Evidência por nota, sempre.** "4 porque o hero mistura `font-display` com
  `font-sans` na mesma linha (cliente-card.tsx:22)" vence "parece
  inconsistente". Nota sem elemento citado é rejeitada.
- **Não puxe a média pra cima.** Se Hierarquia é 5 porque uma seção quebra, não
  suba pra 7 porque o resto está bom — a nota é a **pior banda sustentada**.
- **Não infle.** 7 = *forte*, não *aceitável*. Se tudo é 7+, você não criticou —
  média acima de 8 é suspeita, confira-se.
- **Nunca critique o artefato no mesmo turno em que o gerou** — olhos viciados.
  O loop roda após a entrega da building.

## As 5 dimensões (0-10, com bandas)

A 5ª dimensão tem **lente por superfície**: em **produto** é *Restrição*; em
**criativo** (landing/marketing) é *Distinção*.

### 1. Coerência (uma direção, não três brigando)
- **0–4** três estilos brigando; profundidade/escala/tom inconsistentes entre seções.
- **5–6** uma direção, mas metade dos elementos deriva.
- **7–8** coerente, deriva ocasional em borda.
- **9–10** cada elemento defende a mesma tese (a direção declarada no `<plano-de-design>`).

### 2. Hierarquia (o olho move sem fricção)
- **0–4** tudo grita; nada guia o olhar.
- **5–6** funciona no hero, quebra no corpo/listas.
- **7–8** níveis claros, colisão ocasional.
- **9–10** entrada → ação → detalhe legível em um olhar; 4 níveis de contraste usados.

### 3. Execução (craft/detalhe)
- **0–4** fita e barbante: espaçamento fora do grid, alinhamentos tortos.
- **5–6** quase tudo limpo, 1-2 seções esfarrapadas.
- **7–8** polido; olho treinado acha 2-3 deslizes.
- **9–10** grau-revista: grid perfeito, `tabular-nums` nos números, óptica cuidada.

### 4. Funcionalidade (cumpre o trabalho)
- **0–4** bonito mas não faz o trabalho; estados faltando (só o "populated").
- **5–6** funciona no caminho feliz; loading/empty/erro frágeis.
- **7–8** os estados existem e o fluxo é eficiente para o usuário-alvo.
- **9–10** defensivamente desenhada: todos os estados, edge cases, teclado.

### 5a. Restrição — *lente de PRODUTO* (cada elemento se justifica)
- **0–4** decoração a mais, cor sem significado, sombras/raios inflados.
- **5–6** contido no geral, com excessos pontuais.
- **7–8** quase nada sobra; cor só carrega significado.
- **9–10** intricate minimalism — remover qualquer coisa pioraria.

### 5b. Distinção — *lente de CRIATIVO* (tem alma, não é template)
- **0–4** AI-slop mediano: dava pra ser qualquer produto.
- **5–6** competente e esquecível.
- **7–8** UM momento memorável (o "20%" — tipografia, transição ou atmosfera).
- **9–10** vários movimentos que alguém "roubaria"; identificável sem o logo.

(Distinção pode legitimamente ser baixa num deliverable de produto — não force.)

## Severidade e gate (vocabulário da reviewing)

| Banda | Severidade | Significa |
| --- | --- | --- |
| **0–4** (quebrado) | **bloqueante** | regressão — conserte antes de declarar pronto |
| **5–6** (funcional) | **aviso** | passa, mas o revisor aponta o caminho pra forte |
| **7–10** (forte/excepcional) | — | ok |

**Pronto** = nenhuma dimensão na banda 0–4 **e** o gate de conformidade
(demais references) sem bloqueantes. No loop da designing: qualquer ≤4 →
conserte a **mais fraca**, re-pontue; **dois passes é normal**.

## Formato da saída (use exatamente este)

```
## Crítica de design — <escopo> (<produto|criativo>)

| Dimensão | Nota | Evidência (arquivo:linha / classe / elemento) |
| Coerência | n/10 | … |
| Hierarquia | n/10 | … |
| Execução | n/10 | … |
| Funcionalidade | n/10 | … |
| Restrição/Distinção | n/10 | … |

**Manter** (3-5 · o que está funcionando e NÃO pode quebrar na próxima iteração)
**Corrigir** (3-6 · ordenado por custo visual economizado por minuto · ≤1 frase cada)
**Ganhos rápidos** (3-5 · 5-15 min cada, alto sinal/ruído)

**Veredito**: dimensões quebradas (≤4): N · <pronto | re-itera na mais fraca>
```

A lista **Manter** alimenta a próxima iteração (o que preservar). **Corrigir** é
ordenada por impacto/esforço, não por dimensão.
