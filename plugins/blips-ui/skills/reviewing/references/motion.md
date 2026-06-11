# Movimento — reference canônica de motion (verificável)

Fonte única dos critérios de movimento da Blips UI. A **designing** define a
*personalidade* de motion (produto = sóbrio, sem spring; criativo = opt-in) e
**aponta para cá**; esta reference define **se o motion deve rodar, por quanto
tempo, com qual curva e qual piso de acessibilidade**. Não contradiz a
designing — a complementa com os números e o porquê.

Base primária: animation-discipline (Tversky/Morrison/Bétrancourt 2002 IJHCS;
Material 3 motion tokens; WCAG 2.2.2/2.3.1; WebKit `prefers-reduced-motion`
2017) + emilkowalski-motion (controles em 140–220 ms). Severidades entre
parênteses: exatamente **bloqueante** ou **aviso**. Cada regra marcada
**auto-verificável (check.mjs)** (grepável/heurística mecânica) ou **julgamento
(revisor)** (exige ler o contexto).

## Quando o motion ganha o lugar dele

Motion **confirma** uma reorientação espaço-temporal real — navegação,
expansão de container, follow-through de gesto, feedback de progresso. Não
ensina, não decora, não sinaliza "premium", não preenche silêncio: a
meta-análise Tversky 2002 (IJHCS 57, pp. 247–262) mostrou que todo estudo que
"provava" que animação ensina melhor tinha controle quebrado; equalizado,
animação **não** vence o estático para ensinar sistemas complexos (p. 257), e o
ganho aparente esconde **pior retenção** (Palmiter & Elkerton, p. 255).

1. **Motion não é o único sinal de uma mudança de estado.** Sempre pareie com
   afordância estática (cor/posição/label) — usuário de reduced-motion perde a
   animação. Porquê: acessibilidade e robustez do feedback. (bloqueante)
   *julgamento (revisor)*
2. **Motion CONFIRMA estado, não o EXECUTA.** Aplique optimistic UI / atualize
   o dado primeiro; a animação acompanha. Porquê: animar *para* mudar o estado
   acopla latência percebida ao tempo da curva. Casa com `ui-states.md` #6
   (optimistic só em mutação pequena/reversível). (aviso) *julgamento (revisor)*
3. **Sem coreografia de herói em ferramenta de produtividade.** O orçamento de
   motion vive no micro-feedback funcional dentro do produto, não em sequências
   de landing. Porquê: motion decorativo no canvas de trabalho distrai e
   atrasa. (aviso) *julgamento (revisor)*

## Tabela de durações (lei)

A convergência cross-design-system é **150 ms** (Material 3 `short3`, IBM
Carbon `moderate-01`, Polaris `150`, Tailwind default) — é o default de
confirmação de estado e o que a **designing** já declara ("150ms micro,
200–250ms transições").

| Duração | Uso | Porquê |
|---|---|---|
| **50–100 ms** | Feedback instantâneo: press de botão, commit de toggle, hover | Abaixo do limiar de "espera"; some na percepção |
| **150 ms** | **Default** — confirmação de estado | Ponto de convergência cross-DS; rápido e útil |
| **200–300 ms** | Entrada de UI: modal, sheet, dropdown, popover | Tempo de ler a entrada sem bloquear |
| **300–500 ms** | Cross-screen, morph de container, troca de viewpoint | Reorientação espacial precisa de mais frames |
| **> 500 ms** | **NUNCA** em microinteração | Acima disso o usuário nota o motion *como* motion e **espera** a UI em vez de trabalhar nela |

4. **Microinteração nunca passa de 500 ms.** Hover, press, toggle, validação,
   seleção de chip, expansão de linha ficam < 500 ms; `>500ms` só se vê em
   transição cross-screen/staged/nativa. Porquê: ver tabela. (aviso)
   *auto-verificável (check.mjs)* — duração arbitrária acima de 500 ms:
   `duration-[…ms]` / `[…s]` arbitrary acima de `500ms`/`0.5s`.
5. **Animação frequente ≤ 200 ms.** Um hover visto 50×/sessão, item de lista
   recorrente, badge que pisca a cada fetch. Porquê: o que se repete custa
   atenção a cada repetição. (aviso) *julgamento (revisor)*
6. **Mobile 20–30% mais curto** que o equivalente desktop. Porquê: a distância
   percorrida na tela é menor, então a mesma duração parece lenta. (aviso)
   *julgamento (revisor)*
7. **Saída mais rápida que a entrada** (assimetria): entrada ~200 ms, saída
   ~140 ms. Porquê: a saída lê como decisiva — o usuário já escolheu dispensar.
   (emilkowalski: 140–220 ms para a maioria dos controles.) (aviso)
   *julgamento (revisor)*

## Curve vs spring — e a lei do que animar

8. **Anime SÓ `transform` e `opacity`.** Nunca `width`/`height`/`top`/`left`/
   `margin`/layout. Porquê: transform/opacity são compostos na GPU sem reflow;
   propriedades de layout disparam reflow e travam o frame. Para auto-height,
   use o padrão `grid-template-rows: 0fr → 1fr` (ou o keyframe `accordion-down`
   já no tema), não animar `height` numérico. (bloqueante)
   *julgamento (revisor)* — o check.mjs não detecta isto; verifique manualmente
   `transition-[width|height|top|left]`, `transition-all` (suspeito) e keyframes
   animando `width`/`height`/`top`.
9. **Curve para valor entre dois pontos** (opacity, cor): use o easing de
   produto. **Spring para física** (posição, escala, rotação, gesto). Porquê:
   curva descreve interpolação de valor; spring descreve massa/tensão e parece
   física — usar curva num `scale()` que deveria "assentar" fica mecânico.
   (aviso) *julgamento (revisor)*
10. **Nunca animar a partir de `scale(0)`.** Comece em `scale(0.9)`+ com
    `opacity: 0`. Porquê: de zero a animação parece "estourar" do nada; 0.9
    lê como crescimento. (aviso) *julgamento (revisor)*

### Easing do tema (produto)

- **Produto: `cubic-bezier(0.25, 1, 0.5, 1)`** — ease-out (já declarado na
  **designing**; é o easing default desta lib). Porquê: front-loaded, chega ao
  alvo cedo e assenta — sensação responsiva sem o `ease` builtin (fraco) nem
  `ease-in` (lento/arrastado, proibido em entrada de UI).
- **Produto NÃO usa spring/bounce.** A designing já proíbe; aqui só ecoa: regra
  10 da designing ("sem spring/bounce em produto"). Spring/physics são
  ferramenta do **modo criativo** (opt-in), onde a **Motion lib** (React,
  `motion`) entra. Porquê: bounce sinaliza brincadeira, errado para gestão de
  ativos — no contexto de produto isto é bloqueante; no modo criativo é
  permitido (opt-in). (bloqueante) *julgamento (revisor)*

## prefers-reduced-motion (OBRIGATÓRIO)

11. **Toda animação que translada/escala/rotaciona/parallaxa respeita
    `@media (prefers-reduced-motion: reduce)`.** Regra de trabalho: **remova o
    motion-no-eixo** (translate/scale/rotate/parallax) e **mantenha o crossfade
    de opacity** como substituto quando a mudança ainda precisa ser comunicada.
    Porquê: WebKit enviou isso em 2017 contra gatilhos vestibulares; transform é
    o de maior custo. (bloqueante) *julgamento (revisor)* — o check.mjs não
    detecta isto; verifique manualmente se arquivo com `animate-`/`transition-`/
    keyframe de transform tem `prefers-reduced-motion` no projeto.
12. **View Transitions API não aplica reduced-motion sozinha.** Adicione o
    override na pseudo-elemento ou pule `startViewTransition`. Porquê: a spec
    não faz isso automaticamente — é responsabilidade do autor. (aviso)
    *julgamento (revisor)*

## Loops e motion ambiente

A tabela de durações é para one-shots. Loop tem outras regras.

13. **Loop > 5 s exige controle de pausa** (WCAG 2.2.2, **Nível A** — piso
    legal). Vale para qualquer conteúdo em movimento/piscando/rolando, não só
    vídeo. Porquê: usuários cognitivos/atencionais precisam parar. (bloqueante)
    *julgamento (revisor)*
14. **Spinner para aos 60 s** — escalar para progress/cancelar, não girar
    eternamente. Carrossel pausa após 3–5 ciclos; shimmer de skeleton só até o
    conteúdo chegar, nunca indefinido. Casa com `ui-states.md` #2/#7. Porquê:
    loop infinito mascara um estado travado. (aviso) *julgamento (revisor)*
15. **Reward animation é one-shot.** Confete, sparkle, level-up disparam uma vez
    e dispensam — sem timer de loop. Sem flash rápido: WCAG 2.3.1 (Nível A)
    proíbe mais de 3 flashes em 1 s (epilepsia fotossensível, piso inegociável).
    Porquê: loop de celebração vira ruído e pode disparar gatilho. (bloqueante o
    flash; aviso o loop) *julgamento (revisor)*
16. **Cancelar motion ambiente em troca de rota.** Porquê: animação órfã da tela
    anterior continua consumindo frame. (aviso) *julgamento (revisor)*

## Uma linguagem só + stagger

17. **UMA linguagem de motion por app** — não misturar easings, durações ou
    físicas sem motivo. Porquê: inconsistência lê como bug, não como
    intenção. (aviso) *julgamento (revisor)*
18. **Stagger só em grupos pequenos.** Lista longa com stagger faz a interface
    parecer lenta — cada item soma latência. Porquê: o delay acumulado vira
    espera. (aviso) *julgamento (revisor)*

## Notas factuais (corrija o folclore quando aparecer)

São correções a citar quando alguém justifica um valor com mito. Não são gate
por si — sinalizam que a fonte do autor está errada.

- **Easing "standard" do Material 3 é `cubic-bezier(0.2, 0, 0, 1)`** — NÃO o
  `cubic-bezier(0.4, 0, 0.2, 1)` repetido por aí (esse é o M2, preservado no M3
  sob o nome `legacy`). O `emphasized` do M3 é um **Bézier de dois segmentos**,
  não um cubic-bezier único — aproximações perdem o caráter front-loaded.
- **"Doherty threshold = 400 ms" não existe no paper original** (Doherty &
  Thadani, IBM 1982): o número "400" não aparece; o menor limiar medido é
  300 ms. Não use 400 ms "porque Doherty".
- **"Skeleton parece 11% mais rápido"**: Harrison/Yeo/Hudson (CHI 2010) mediram
  barras de progresso determinadas com ritmo desacelerando ao contrário (n=16),
  não skeletons — o mecanismo não transfere.
- **"Heer & Robertson: 300–1000 ms"**: testaram só 1,25 s e 2 s; a recomendação
  é "~1 s por estágio", para transição staged cross-screen, não micro.
- **Presets de spring da Apple**: `.snappy=0.25s / .smooth=0.35s` está errado —
  os três presets SwiftUI têm base 0,5 s, diferindo só no bounce (0 / 0,15 /
  0,3). (Irrelevante no produto Blips, que não usa spring — útil no criativo.)
- **"default" de spring é ambíguo**: motion.dev default ≈ ζ 0.5 (bouncy);
  React Spring `default` = ζ 0.997 (criticamente amortecido). Escolha
  conscientemente — não confie na palavra "default".

## Resumo de severidade

| Regra | Severidade | Verificação |
|---|---|---|
| 1 motion não é único sinal | bloqueante | julgamento |
| 2 confirma, não executa | aviso | julgamento |
| 3 sem herói em produtividade | aviso | julgamento |
| 4 micro ≤ 500 ms | aviso | check.mjs |
| 5 frequente ≤ 200 ms | aviso | julgamento |
| 6 mobile 20–30% mais curto | aviso | julgamento |
| 7 saída < entrada | aviso | julgamento |
| 8 só transform/opacity | bloqueante | julgamento |
| 9 curve vs spring | aviso | julgamento |
| 10 nunca scale(0) | aviso | julgamento |
| (easing/sem spring no produto) | bloqueante | julgamento |
| 11 prefers-reduced-motion | bloqueante | julgamento |
| 12 View Transitions reduced-motion | aviso | julgamento |
| 13 loop > 5 s tem pausa | bloqueante | julgamento |
| 14 spinner para aos 60 s | aviso | julgamento |
| 15 reward one-shot / flash | bloqueante (flash) / aviso (loop) | julgamento |
| 16 cancelar em troca de rota | aviso | julgamento |
| 17 uma linguagem só | aviso | julgamento |
| 18 stagger só em grupos pequenos | aviso | julgamento |

<!-- Fonte: nexu-io/open-design (Apache 2.0) — research/open-design/craft/animation-discipline.md, research/open-design/skills/emilkowalski-motion/SKILL.md, research/open-design/AGENTS.md (seção "UI animation philosophy") -->
