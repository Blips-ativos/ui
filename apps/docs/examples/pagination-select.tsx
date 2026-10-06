"use client";

import { Field, FieldLabel } from "@blips/ui/components/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@blips/ui/components/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

export default function PaginationSelect() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="pagination-rows-per-page">
          Linhas por página
        </FieldLabel>
        <Select defaultValue="25">
          <SelectTrigger className="w-20" id="pagination-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="Anterior" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="Próxima" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
