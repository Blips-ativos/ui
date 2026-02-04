---
name: add-component
description: Adiciona um componente Blips UI ao projeto atual
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: [component-name]
---

# Adicionar Componente Blips UI

Quando o usuário pedir para adicionar um componente, siga estes passos:

## 1. Verificar Configuração do Projeto

Primeiro, verifique se existe um arquivo `components.json` na raiz do projeto:

```bash
ls components.json 2>/dev/null || echo "NOT_FOUND"
```

Se não existir, pergunte ao usuário se deseja inicializar o projeto com Blips UI usando a skill `setup-project`.

## 2. Verificar Componente Solicitado

O argumento `$ARGUMENTS` contém o nome do componente solicitado.

Componentes disponíveis:
- `button` - Botão com variantes e tamanhos
- `card` - Container para conteúdo com header, content e footer
- `input` - Campo de entrada de texto

## 3. Buscar o Componente no Registry

Leia o arquivo do componente no registry:

```
packages/ui/registry/default/ui/$ARGUMENTS.tsx
```

## 4. Copiar para o Projeto

Determine o diretório de componentes do projeto a partir do `components.json`:

```json
{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

Copie o componente para o diretório correto, ajustando os imports:
- Substitua `@/lib/utils` pelo caminho correto do projeto
- Mantenha as dependências externas iguais

## 5. Instalar Dependências

Verifique as dependências necessárias no `registry/registry.json` e instale:

```bash
pnpm add [dependências]
```

### Dependências por Componente

| Componente | Dependências |
|------------|--------------|
| button | @radix-ui/react-slot, class-variance-authority |
| card | (nenhuma adicional) |
| input | (nenhuma adicional) |

Dependências comuns para todos: `clsx`, `tailwind-merge`

## 6. Verificar Utilitário cn()

Certifique-se de que o arquivo `lib/utils.ts` existe com a função `cn()`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 7. Mostrar Exemplo de Uso

Após adicionar o componente, mostre um exemplo de como usá-lo:

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Click me</Button>;
}
```

## Mensagens de Erro

- Se o componente não existir: "Componente '$ARGUMENTS' não encontrado. Componentes disponíveis: button, card, input"
- Se o projeto não estiver configurado: "Projeto não configurado. Use /blips-ui:setup-project primeiro"
