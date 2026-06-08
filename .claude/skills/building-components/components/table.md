# Table

**Categoria:** Compound | **Deps:** Nenhuma externa | **"use client":** Não

## Exports
Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

All forwardRef for native HTML table elements. Table wrapped in `<div className="relative w-full overflow-auto">`.

## Props & Variants
**TableRow:** `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`

## Usage

```tsx
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "@blips/ui"

<Table>
  <TableCaption>List of users</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className="text-right">Amount</TableHead>
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
