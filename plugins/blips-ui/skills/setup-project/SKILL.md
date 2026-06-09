---
name: setup-project
description: Configura um projeto para usar Blips UI
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: [style]
---

# Configurar Projeto para Blips UI

Esta skill configura um projeto React/Next.js para usar componentes Blips UI.

## 1. Detectar Tipo de Projeto

Verifique o tipo de projeto:

```bash
# Next.js
ls next.config.* 2>/dev/null && echo "NEXTJS"

# Vite
ls vite.config.* 2>/dev/null && echo "VITE"

# Create React App
grep "react-scripts" package.json && echo "CRA"
```

## 2. Verificar Tailwind CSS

Verifique se Tailwind CSS v4 está instalado:

```bash
grep '"tailwindcss"' package.json
```

Se não estiver instalado:

```bash
pnpm add -D tailwindcss
```

## 3. Criar Arquivo de Configuração

Crie o arquivo `components.json` na raiz do projeto:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "phosphor"
}
```

Ajuste o caminho do CSS conforme o projeto:
- Next.js App Router: `app/globals.css`
- Next.js Pages: `styles/globals.css`
- Vite: `src/index.css`

## 4. Criar Estrutura de Diretórios

```bash
mkdir -p components/ui lib hooks
```

## 5. Criar Utilitário cn()

Crie `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 6. Instalar Dependências Base

```bash
pnpm add clsx tailwind-merge class-variance-authority
```

## 7. Configurar CSS Variables

Adicione as variáveis CSS ao arquivo de estilos global:

```css
@import "tailwindcss";

@theme {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(240 10% 3.9%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(240 10% 3.9%);
  --color-popover: hsl(0 0% 100%);
  --color-popover-foreground: hsl(240 10% 3.9%);
  --color-primary: hsl(240 5.9% 10%);
  --color-primary-foreground: hsl(0 0% 98%);
  --color-secondary: hsl(240 4.8% 95.9%);
  --color-secondary-foreground: hsl(240 5.9% 10%);
  --color-muted: hsl(240 4.8% 95.9%);
  --color-muted-foreground: hsl(240 3.8% 46.1%);
  --color-accent: hsl(240 4.8% 95.9%);
  --color-accent-foreground: hsl(240 5.9% 10%);
  --color-destructive: hsl(0 84.2% 60.2%);
  --color-destructive-foreground: hsl(0 0% 98%);
  --color-border: hsl(240 5.9% 90%);
  --color-input: hsl(240 5.9% 90%);
  --color-ring: hsl(240 5.9% 10%);
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: hsl(240 10% 3.9%);
    --color-foreground: hsl(0 0% 98%);
    --color-card: hsl(240 10% 3.9%);
    --color-card-foreground: hsl(0 0% 98%);
    --color-popover: hsl(240 10% 3.9%);
    --color-popover-foreground: hsl(0 0% 98%);
    --color-primary: hsl(0 0% 98%);
    --color-primary-foreground: hsl(240 5.9% 10%);
    --color-secondary: hsl(240 3.7% 15.9%);
    --color-secondary-foreground: hsl(0 0% 98%);
    --color-muted: hsl(240 3.7% 15.9%);
    --color-muted-foreground: hsl(240 5% 64.9%);
    --color-accent: hsl(240 3.7% 15.9%);
    --color-accent-foreground: hsl(0 0% 98%);
    --color-destructive: hsl(0 62.8% 30.6%);
    --color-destructive-foreground: hsl(0 0% 98%);
    --color-border: hsl(240 3.7% 15.9%);
    --color-input: hsl(240 3.7% 15.9%);
    --color-ring: hsl(240 4.9% 83.9%);
  }
}

* {
  border-color: var(--color-border);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

## 8. Mensagem de Sucesso

Após configurar, mostre:

```
✓ Projeto configurado para Blips UI

Próximos passos:
1. Adicione componentes com: /blips-ui:add-component [nome]
2. Componentes disponíveis: button, card, input

Documentação: https://ui.blips.com
```
