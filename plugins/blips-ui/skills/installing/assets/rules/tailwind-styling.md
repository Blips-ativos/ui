---
paths:
  - "**/*.tsx"
  - "**/*.css"
description: Estilização com Tailwind v4 CSS-first — tema único via @blips/ui/globals.css, tokens semânticos, sem tailwind.config.js.
---

# Tailwind v4 — CSS-first

- **Nunca crie `tailwind.config.js`/`.ts`** — o v4 é configurado no CSS
  (`@theme`, `@source`, `@custom-variant`), e toda a config deste repo vem de
  `@import "@blips/ui/globals.css"` no CSS de entrada. O arquivo JS nem seria
  lido.
- **Tema é fonte única**: não copie tokens, não redeclare `@theme`, não
  adicione `@import "tailwindcss"` de novo. Atualização de tema acontece na
  lib, não aqui.
- **Use tokens semânticos**: `bg-primary` (amarelo Blips `#FCBA28` — o único
  acento de marca), `text-muted-foreground`, `bg-card`, `border-border`,
  `text-destructive`... Nunca hardcode (`bg-[#fcba28]`, `bg-yellow-400`).
- Tipografia: `font-sans` (Inter), `font-display` (Quicksand — títulos),
  `font-mono` (JetBrains Mono). Já carregadas pelo globals.
- **Não adicione `@source` "por garantia"** — a auto-detecção do v4 cobre o
  código do app. Use `@source` apenas para conteúdo fora da detecção (pasta
  gitignorada, código fora da raiz do projeto).
- Sem CSS-in-JS e sem `style` inline para o que existe como utility. Variantes
  locais de componente: CVA (`class-variance-authority`, já vem com a lib).
- Dark mode: classe `.dark` no `<html>` (custom-variant da lib). `next-themes`
  já vem como dependência da lib para quem precisar de toggle.
