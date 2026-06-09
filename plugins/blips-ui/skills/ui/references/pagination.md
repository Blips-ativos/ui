# Pagination

Import: `@blips/ui/components/pagination`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Pagination` | `<nav>` | Root container with `aria-label="pagination"`. Centered flex layout. |
| `PaginationContent` | `<ul>` | Horizontal list of pagination items with `gap-1`. Uses `forwardRef`. |
| `PaginationItem` | `<li>` | Wrapper for individual pagination elements. Uses `forwardRef`. |
| `PaginationLink` | `<a>` | Page number link. Uses `buttonVariants` for styling. Supports active state. |
| `PaginationPrevious` | `PaginationLink` | "Previous" navigation with left chevron icon and text label. |
| `PaginationNext` | `PaginationLink` | "Next" navigation with right chevron icon and text label. |
| `PaginationEllipsis` | `<span>` | Dots indicator (...) for skipped page ranges. Hidden from screen readers. |

## Props & Variants

### Pagination

Standard `React.ComponentProps<'nav'>`.

**Default styles:**
- `mx-auto flex w-full justify-center`

### PaginationLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | `boolean` | `false` | Highlights as current page. Uses `outline` variant when active, `ghost` otherwise. |
| `size` | `VariantProps<typeof buttonVariants>['size']` | `"icon"` | Button size variant |
| `href` | `string` | - | Link target |

**Active state:**
- Active: `buttonVariants({ variant: "outline" })` + `aria-current="page"`
- Inactive: `buttonVariants({ variant: "ghost" })`

### PaginationPrevious / PaginationNext

Extend `PaginationLink` props. Override `size` to `"default"`.

**PaginationPrevious styles:** `gap-1 pl-2.5`
**PaginationNext styles:** `gap-1 pr-2.5`

### PaginationEllipsis

Standard `React.ComponentProps<'span'>`.

**Default styles:**
- `flex h-9 w-9 items-center justify-center`
- Contains `DotsThree` icon + screen-reader text "More pages"
- `aria-hidden` on the span

## Usage

### Basic Pagination

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@blips/ui/components/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Controlled Pagination (with onClick)

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@blips/ui/components/pagination"

function PaginatedList({ totalPages, currentPage, onPageChange }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onPageChange(currentPage - 1)
            }}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault()
                onPageChange(page)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onPageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` (`CaretLeft`, `CaretRight`, `DotsThree`).
- Uses `buttonVariants` from `@selfie/ui/components/button` for link styling.
- The component uses `forwardRef` pattern for `PaginationContent` and `PaginationItem`.
- The project has a custom `pagination.tsx` noted in `packages/ui/CLAUDE.md` -- this is the shadcn-based pagination component.

## All Examples

- `pagination-demo` - Standard pagination with previous, numbered pages, ellipsis, and next
