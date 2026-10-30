"use client";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";
import { DotsThreeOutlineIcon } from "@phosphor-icons/react";

const products = [
  { name: "Mouse sem fio", price: "R$ 149,90" },
  { name: "Teclado mecânico", price: "R$ 599,90" },
  { name: "Hub USB-C", price: "R$ 249,90" },
];

export default function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8" />
                  }
                >
                  <DotsThreeOutlineIcon />
                  <span className="sr-only">Abrir menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Duplicar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
