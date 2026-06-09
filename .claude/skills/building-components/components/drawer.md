# Drawer

**Categoria:** Composition | **Deps:** `vaul` | **"use client":** Não

## Exports

`Drawer`, `DrawerPortal`, `DrawerOverlay`, `DrawerTrigger`, `DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`

## Uso

### Drawer básico

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@blips/ui"
import { Button } from "@blips/ui"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Ajustar meta</DrawerTitle>
      <DrawerDescription>Defina sua meta de atividade diária.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <p>Conteúdo da sua meta de atividade diária aqui</p>
    </div>
    <DrawerFooter>
      <Button>Enviar</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Drawer com estado controlado

```tsx
const [open, setOpen] = React.useState(false)

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button>Abrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Editar meta</DrawerTitle>
    </DrawerHeader>
    <div className="p-4 space-y-4">
      <Input placeholder="Digite sua meta..." />
      <Slider defaultValue={[33]} className="w-full" />
    </div>
    <DrawerFooter>
      <Button onClick={() => setOpen(false)}>Salvar</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Drawer com comportamento customizado

```tsx
<Drawer shouldScaleBackground>
  <DrawerTrigger asChild>
    <Button>Abrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Título do drawer</DrawerTitle>
      <DrawerDescription>A descrição do drawer vai aqui</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Área de conteúdo com padding</div>
    <DrawerFooter>
      <Button>Ação</Button>
      <DrawerClose>Cancelar</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Recursos

- **Alça de arraste**: O conteúdo inclui uma barra de arraste automática para interação amigável no mobile
- **Escalar fundo**: A prop `shouldScaleBackground` tem valor padrão `true`, fornecendo feedback visual quando o drawer está aberto
- **Responsivo**: Otimizado para dispositivos mobile e desktop
- **Acessível**: Construído sobre primitives acessíveis com suporte a teclado

## Props e Variantes

### Drawer
- `open`: boolean - Estado de abertura do drawer
- `onOpenChange`: (open: boolean) => void - Handler de mudança do estado de abertura
- `shouldScaleBackground`: boolean - Escalar o fundo quando aberto (padrão: true)
- `children`: ReactNode - Conteúdo do drawer

### DrawerTrigger
- `children`: ReactNode - Elemento que dispara o drawer
- `asChild`: boolean - Mesclar com as props do componente filho
- `className`: string - Classes CSS customizadas

### DrawerContent
- `children`: ReactNode - Conteúdo do drawer
- `className`: string - Classes CSS customizadas
- `side`: 'top' | 'right' | 'bottom' | 'left' - Posição do drawer (tipicamente embaixo no mobile)

### DrawerHeader
- `children`: ReactNode - Conteúdo do cabeçalho
- `className`: string - Classes CSS customizadas

### DrawerFooter
- `children`: ReactNode - Conteúdo do rodapé
- `className`: string - Classes CSS customizadas

### DrawerTitle
- `children`: ReactNode - Texto do título
- `className`: string - Classes CSS customizadas

### DrawerDescription
- `children`: ReactNode - Texto da descrição
- `className`: string - Classes CSS customizadas

### DrawerClose
- `children`: ReactNode - Conteúdo do botão de fechar
- `asChild`: boolean - Mesclar com as props do componente filho
- `className`: string - Classes CSS customizadas

### DrawerPortal
- `children`: ReactNode - Conteúdo do portal
- `className`: string - Classes CSS customizadas

### DrawerOverlay
- `className`: string - Classes CSS customizadas para o overlay de fundo
