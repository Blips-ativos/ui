# Table

**Categoria:** Compound | **Deps:** Nenhuma externa | **"use client":** Não

## Exports
Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

Todos usam forwardRef para elementos nativos de tabela HTML. Table é envolvido em `<div className="relative w-full overflow-auto">`.

## Props & Variants
**TableRow:** `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`

## Uso

```tsx
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "@blips/ui"

<Table>
  <TableCaption>Lista de usuários</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>E-mail</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">John</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell className="text-right">$100.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$100.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```
