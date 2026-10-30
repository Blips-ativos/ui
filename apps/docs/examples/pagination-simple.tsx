import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@blips/ui/components/pagination";

const pages = [1, 2, 3, 4, 5];

export default function PaginationSimple() {
  return (
    <Pagination>
      <PaginationContent>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === 2}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
