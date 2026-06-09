# Calendar

Import: `@blips/ui/components/calendar`

## Sub-components

| Export | Description |
|--------|-------------|
| `Calendar` | Main calendar component wrapping `react-day-picker`'s `DayPicker`. Renders a month grid with navigation, day selection, and optional dropdown caption layout. |
| `CalendarDayButton` | Internal day button component using the project's `Button` with ghost variant. Handles focus, selection states, and range highlighting. |
| `DateRange` (type) | Re-exported from `react-day-picker` -- represents `{ from?: Date; to?: Date }`. |
| `DayEventHandler` (type) | Re-exported from `react-day-picker` -- event handler type for day interactions. |

## Props & Variants

`Calendar` accepts all `react-day-picker` `DayPicker` props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single"` \| `"multiple"` \| `"range"` | -- | Selection mode |
| `selected` | `Date` \| `Date[]` \| `DateRange` | -- | Currently selected date(s) |
| `onSelect` | `(date) => void` | -- | Selection callback |
| `showOutsideDays` | `boolean` | `true` | Show days from adjacent months |
| `captionLayout` | `"label"` \| `"dropdown"` \| `"dropdown-months"` \| `"dropdown-years"` | `"label"` | How month/year caption is displayed |
| `buttonVariant` | Button variant string | `"ghost"` | Variant for nav buttons (project-specific prop) |
| `disabled` | `Matcher` \| `Matcher[]` | -- | Days to disable |
| `fromDate` / `toDate` | `Date` | -- | Constrain navigable range |
| `numberOfMonths` | `number` | `1` | Number of months to display side by side |
| `className` | `string` | -- | Additional CSS classes on root |
| `classNames` | `Record<string, string>` | -- | Override internal element classes |
| `formatters` | `object` | -- | Custom formatters (default overrides `formatMonthDropdown` for short month names) |
| `components` | `object` | -- | Override internal sub-components (Root, Chevron, DayButton, WeekNumber) |

### CSS Custom Property

The component uses `--cell-size: 2rem` for consistent day cell dimensions.

### Key Data Attributes (on DayButton)

- `data-selected-single` -- single selected day (not part of range)
- `data-range-start`, `data-range-end`, `data-range-middle` -- range selection states
- `data-day` -- the day's localized date string

## Dependencies

- `react-day-picker` (latest)
- `date-fns`
- `@phosphor-icons/react` (CaretDown, CaretLeft, CaretRight)

## Usage

### Basic Single Date Selection

```tsx
"use client"

import * as React from "react"
import { Calendar } from "@blips/ui/components/calendar"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
    />
  )
}
```

### Date Picker with Popover

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@phosphor-icons/react"
import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import { Calendar } from "@blips/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Calendar />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
```

## All Examples

- `calendar-demo` -- Basic single date selection with dropdown caption
- `date-picker-demo` -- Calendar inside a Popover for date picking
- `date-picker-with-presets` -- Date picker with preset Select dropdown (Today, Tomorrow, etc.)
- `date-picker-with-range` -- Date range picker with two-month Calendar display

## All Example Variants

### date-picker-demo

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@phosphor-icons/react"

import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import { Calendar } from "@blips/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Calendar />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
```

### date-picker-with-presets

```tsx
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar } from "@phosphor-icons/react"

import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import { Calendar } from "@blips/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

export default function DatePickerWithPresets() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Calendar />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

### date-picker-with-range

```tsx
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar } from "@phosphor-icons/react"
import { type DateRange } from "react-day-picker"

import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import { Calendar } from "@blips/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Calendar />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
```

## Project Notes

- This project uses `@phosphor-icons/react` for chevron icons (CaretLeft, CaretRight, CaretDown).
- The `buttonVariant` prop is a project-specific extension not in upstream shadcn.
