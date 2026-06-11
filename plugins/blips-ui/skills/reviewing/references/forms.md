# Formulários — padrão Blips (verificável)

Reference canônica do ciclo de vida de validação em formulários, mapeada ao
stack real: **react-hook-form (RHF) + zod + `@blips/ui` Form** (`FormField` /
`FormItem` / `FormLabel` / `FormControl` / `FormMessage` / `FormDescription`).
Decide *quando* o campo diz que está errado, *como* o erro chega à tecnologia
assistiva e *onde* a regra mora. A a11y de `Label`/`aria-describedby`/
`aria-invalid` está em **accessibility.md** (regra 2) — referenciada, não
duplicada; formatação de moeda/data está em **data-formatting.md** — não repita.

Fonte primária: WHATWG Constraint Validation, CSS Selectors L4 (`:user-invalid`),
WCAG 2.2 SC 3.3.x, ARIA APG forms, Standard Schema, Baymard 2024 inline-validation,
WebAIM Million 2026.

## O que o `@blips/ui` Form JÁ garante vs. o que sobra pro dev

`FormField > FormItem > FormLabel + FormControl (+ FormDescription) + FormMessage`
gera, via `useFormField`, automaticamente: `id` único (`useId`), `htmlFor` do
label, `aria-describedby` (description + message), `aria-invalid={!!error}`, e
`FormMessage` lê `fieldState.error.message` (não passe texto à mão) e **retorna
`null` quando não há erro** (some sozinho ao sair do estado inválido — máquina de
estados de graça). Não reescreva nada disso.

| Garantido pelo `@blips/ui` Form | Responsabilidade do dev |
|---|---|
| `id`/`htmlFor`/`aria-describedby`/`aria-invalid` por campo | Schema zod com mensagens **adaptativas pt-BR** |
| `FormMessage` lê `error.message` e some quando válido | `mode`/`reValidateMode` corretos no `useForm` |
| `data-[error=true]:text-destructive` no label | `role="alert"` no erro inline (o Form **não** põe — ver regra 5b) |
| Wiring de `Controller` (`field` props) | Não resetar campos no erro; sumário no topo em forms longos |

> **Gap conhecido:** o `FormMessage` do `@blips/ui` renderiza `text-destructive`
> mas **não** emite `role="alert"`. Sem isso o erro inline não é anunciado ao
> aparecer. Adicione `role="alert"` no `FormMessage` da composição (regra 5b).

## Regras (severidade + verificabilidade)

1. **`mode` correto no `useForm` — valida no 1º blur, revalida no input.**
   Use `mode: "onTouched"` (ou `"onBlur"`) + `reValidateMode: "onChange"`. Isso
   implementa a transição da máquina de estados: o erro nasce em
   `invalid-after-touched` (1º blur pós-edição) e, uma vez inválido, limpa no
   `input` — o usuário não precisa borrar de novo pra dispensar. **Proibido**
   `mode: "onChange"` puro (valida a cada tecla, hostil) e `mode: "all"` em
   campos de digitação. *Porquê:* Baymard — disparo precoce é a falha de UX mais
   ruidosa ("por que diz que meu email tá errado se nem terminei?").
   *julgamento (revisor)*: inspecionar o `useForm` — `mode:` ausente ou
   `mode: "onChange"`/`"all"` em campos de digitação (grep por `useForm(` é
   dica, não veredito). (bloqueante)

2. **Erro só aparece em `invalid-after-touched` — nunca de `pristine`/`dirty`
   puro — e some ao sair de qualquer estado inválido.** O `@blips/ui` já faz
   isso (regra 1 + `FormMessage` retorna `null`). Em **CSS** estilize com
   `:user-invalid`, **NUNCA `:invalid`** — `:invalid` pinta borda vermelha já no
   load (sinal "validação sem teste"); `:user-invalid` casa só após submit ou
   blur com valor ruim. *Porquê:* `:invalid` vermelho no load é o anti-padrão
   clássico de "validação sem teste"; `:user-invalid` espera a interação do
   usuário. *julgamento (revisor)*: inspecionar o CSS — `:invalid` cru (sem ser
   `:user-invalid`/`:-moz-ui-invalid`) (grep por `:invalid` é dica, não
   veredito). (bloqueante)

3. **`inputmode="numeric" pattern="[0-9]*"` em CEP / OTP / valores monetários —
   NUNCA `type="number"`.** `type="number"` adiciona spinners, remove zeros à
   esquerda, aplica decimal por locale e varia largura entre browsers — errado
   pra qualquer um desses. A forma certa (Baymard) é `<input type="text"
   inputmode="numeric" pattern="[0-9]*">` (o `pattern` dispara o teclado numérico
   no iOS Safari). Use o `InputOTP` do `@blips/ui` para OTP. *Porquê:* teclado
   certo no mobile sem o comportamento tóxico do `number`. *julgamento
   (revisor)*: inspecionar campos de CEP/OTP/valor — `type="number"` onde o
   `name`/label casa `cep|otp|codigo|token|valor|preco|cpf|cnpj|telefone` (grep
   por `type="number"` é dica, não veredito). (bloqueante)

4. **Nunca limpar/resetar campos no erro.** Em erro de submit (cliente ou
   servidor), preserve tudo que o usuário digitou — `reset()`/limpar valores no
   catch é proibido. *Porquê:* Baymard 2024 — 34% dos checkouts apagam o cartão
   ao errar um campo não relacionado; causa direta de abandono. Para dados
   sensíveis (cartão), valide os não-sensíveis primeiro ou separe a etapa de
   pagamento. *julgamento (revisor)*: inspecionar o handler de erro / `onError`
   (grep por `reset()`/`setValue("", …)` no path de erro é dica, não veredito).
   (bloqueante)

5a. **Sumário de erros no topo NÃO tem `role="alert"`.** O sumário de erros no
   topo (forms longos) é um container heading-led com `tabindex="-1"` que recebe
   **foco programático no submit** (renderize no DOM, *depois* `.focus()`),
   **SEM `role="alert"`**. *Porquê:* `role="alert"` + alvo de foco = anúncio
   duplo (o alert dispara na inserção, o foco anuncia nome+role). *julgamento
   (revisor)*: inspecionar o container do sumário — `role="alert"` junto de
   `tabindex="-1"` é proibido (grep por `role="alert"` em container com
   `tabindex="-1"` é dica, não veredito). (bloqueante)

5b. **Erro inline do campo tem `role="alert"`.** O `FormMessage` do `@blips/ui`
   não emite `role="alert"` — adicione na composição (`<FormMessage
   role="alert" />`) para o erro ser anunciado ao surgir sem mover foco.
   *Porquê:* sem `role="alert"` o erro inline aparece silenciosamente para a
   tecnologia assistiva. *julgamento (revisor)*: inspecionar a composição do
   `FormMessage` — ausência de `role="alert"` (grep por `FormMessage` sem
   `role="alert"` é dica, não veredito). (aviso)

6. **Sumário de erros no topo em forms longos, focado só no submit.** Lista de
   âncoras (`<a href="#campo">`) para os campos inválidos, dentro de container
   `tabindex="-1"` heading-led, que recebe `.focus()` ao falhar o submit (ou foco
   no 1º campo inválido se não houver sumário). Não mova foco a cada tecla.
   *Porquê:* WCAG G139 — em form longo o usuário não sabe quantos/quais campos
   falharam. *julgamento (revisor)*: presença e correção do sumário em forms com
   muitos campos. (aviso)

7. **Mensagens zod adaptativas em pt-BR: dizem o quê + como corrigir.** Toda
   regra do schema carrega `message`/`error` explícito, em português, específico
   do subcaso que falhou — **proibido** `"Invalid input"`, `"Campo inválido"`,
   `"Required"`, ou deixar a mensagem default do zod (vaza em inglês). Ex.: não
   `"Telefone inválido"` e sim `"Telefone deve ter 11 dígitos (com DDD)."`; satisfaz
   WCAG 3.3.3 (Error Suggestion). *Porquê:* Baymard — 98% dos sites usam erro
   genérico; a mensagem específica corta re-submits. *julgamento (revisor)*:
   inspecionar o schema zod — regras `.min(`/`.email(`/`.regex(` etc. sem
   `message`/`error`, ou strings genéricas `"Invalid input"`/`"Required"`/
   `"Campo inválido"` (grep é dica, não veredito). (bloqueante)

8. **Estado `submitting`: desabilita o submit + status em live region polite.**
   Use `isSubmitting`/`isPending` para `disabled` no `Button` e anuncie o
   progresso numa live region polite. **Proibido `aria-busy="true"` no botão**
   (`aria-busy` é para containers obsoletos, não botões). Não desabilite o submit
   indefinidamente por causa de checagem assíncrona de fundo (uniqueness/CEP):
   debounce 250–500 ms e anuncie via live region — só o submit espera o servidor.
   *Porquê:* `aria-busy` em botão é uso incorreto do atributo (é para containers);
   o estado certo é `disabled` + status em live region. *julgamento (revisor)*:
   inspecionar o `Button`/`button` de submit — `aria-busy` indevido (grep por
   `aria-busy` é dica, não veredito). (aviso)

9. **Erro de servidor por campo entra via `setError`, não throw.** Resposta de
   erro do servidor (validação autoritativa no submit) deve mapear para o campo
   com `setError(name, { message })` (RHF) usando o **texto do servidor**;
   trata-se como `invalid-after-submit`. Não jogue exceção que sobe pra Error
   Boundary (perde os dados do form). *Porquê:* servidor é a verdade, cliente é
   otimização — mesma intenção do schema zod compartilhado. *julgamento
   (revisor)*: inspecionar o `onError`/catch do mutation (TanStack Query). (aviso)

10. **Sem campos de re-digitação (confirmar email/CPF) e sem bloquear paste.**
    "Redigite o email" viola WCAG 3.3.7 (Redundant Entry) — permita colar e valide
    o campo único. Em senha / código de verificação, **nunca bloqueie paste**
    (WCAG 3.3.8 Accessible Authentication). *Porquê:* redigitar é fricção sem
    ganho real; bloquear paste quebra gerenciadores de senha. *julgamento
    (revisor)*: inspecionar campos sensíveis — `onPaste` com
    `preventDefault`/`return false` em `type="password"` ou OTP, ou par de campos
    `email`/`confirmEmail` (grep é dica, não veredito). (aviso)

## Máquina de estados do input (referência)

| Estado | Significado | UI / ação |
|---|---|---|
| `pristine` | Sem interação | Sem erro, sem check verde |
| `dirty` | Digitou, ainda focado | Sem erro ainda |
| `touched` | Borrou ao menos 1x após editar | Roda a constraint do campo |
| `invalid-after-touched` | Constraint falhou após blur | **Mostra erro** + `aria-describedby` |
| `invalid-after-submit` | Submit tentado, campo inválido | Idem + foco no sumário/1º inválido |
| `recovering` | Editando campo já inválido | Revalida no `input` (não espera blur) |
| `submitting` | Ação em voo | Desabilita submit + status polite (regra 8) |
| `server-error` | Servidor retornou erro do campo | Usa texto do servidor; = `invalid-after-submit` (regra 9) |

`mode: "onTouched"` + `reValidateMode: "onChange"` (RHF) e `:user-invalid` (CSS)
implementam essas transições de graça.

## Verificação mecânica

**Nenhuma regra de forms é checada pelo `check.mjs` — todas (1, 2, 3, 4, 5a,
5b, 6, 7, 8, 9, 10) exigem julgamento do revisor.** Os greps citados em cada
regra são pistas para o revisor, não veredito do gate. Não existe check dedicado
de formulário.

O gate só pega forms **indiretamente**, por outras dimensões, quando o sintoma
coincide com uma regra de outro reference: erro de borda/cor de validação escrito
como `hsl(var(--…))` ou cor hex crua cai no check de **tailwind**; texto de erro
com moeda/data formatada à mão (`Intl` sem locale, `toLocale*()` sem locale, `"R$
"` literal) cai no check de **formatação**; `tabindex` positivo no sumário cai no
check de **a11y**. Isso não cobre a lógica de validação (estados, `mode`,
`setError`, `:user-invalid`, `role="alert"`) — essa parte é toda revisão manual.

<!-- Fonte: nexu-io/open-design (Apache 2.0) — craft/form-validation.md -->
