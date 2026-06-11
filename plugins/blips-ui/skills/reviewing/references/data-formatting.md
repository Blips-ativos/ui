# Formatação de dados pt-BR — padrão Blips (verificável)

Base: MDN/Node ICU issues, Next.js hydration docs, date-fns v4, FormatJS
(fontes no CREATION-LOG). A Blips é gestora de ativos — dinheiro formatado
errado é defeito de produto.

1. **Módulo único de formatação** (`lib/formatters.ts` ou equivalente) com
   instâncias `Intl` criadas UMA vez em escopo de módulo (memoização — até
   30x mais rápido). `new Intl.*Format`/`toLocaleString` inline em componente
   é violação. (bloqueante se espalhado; aviso se pontual)
2. **Locale sempre explícito `'pt-BR'`** — omitir/`undefined` = formato varia
   por ambiente e causa hydration mismatch no Next (erro #418 documentado).
   (bloqueante)
3. **Moeda BRL**: `Intl.NumberFormat("pt-BR", { style: "currency", currency:
   "BRL" })`. SEM `currencyDisplay: "narrowSymbol"` (idêntico para BRL +
   RangeError em Safari antigo) e SEM `currencySign: "accounting"` (no-op em
   pt-BR). Formatação manual (`"R$ " + x.toFixed(2)`) é violação — perde
   separador de milhar e usa ponto decimal. (bloqueante)
4. **Testes**: nunca comparar com string digitada — o separador após `R$` é
   NBSP (U+00A0) e pode variar com ICU/engine. Assertar contra o próprio
   formatter ou normalizar whitespace no helper de teste. (aviso)
5. **Datas absolutas**: `Intl.DateTimeFormat("pt-BR")` (dd/MM/yyyy sai
   nativo); quando a hora importa, `timeZone` explícito
   (`America/Sao_Paulo`) ou formatar client-only. date-fns v4 (+`@date-fns/tz`)
   para aritmética/parse, com locale importado individualmente. (aviso)
6. **Tempo relativo ("há 2 dias") é client-only** (depende de `Date.now()` —
   mismatch por definição) e sai do módulo central
   (`Intl.RelativeTimeFormat`/`intlFormatDistance`). `suppressHydrationWarning`
   só como exceção pontual documentada. (bloqueante se SSR)
7. **`tabular-nums` + `text-right` em toda célula/valor numérico-financeiro**
   (colunas não "dançam"; fontes da lib têm `tnum`). (aviso)
8. **`notation: "compact"` ("R$ 1,5 mi") só em dashboards/cards agregados** —
   proibido em extratos, transações e valores acionáveis (arredondamento
   agressivo; abreviações pt-BR são mil/mi/bi). (aviso)
