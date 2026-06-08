# Calendar

**Categoria:** Composition
**Dependências:** `react-day-picker`, `lucide-react`, `@/components/button`
**"use client":** Sim

## Source

(Large component - wraps `DayPicker` from `react-day-picker` with custom classNames and components.)

## Exports

| Export | Tipo |
|---|---|
| `Calendar` | Component |
| `CalendarDayButton` | Component |

## Uso

```tsx
import { Calendar } from "@blips/ui"

// Single date
const [date, setDate] = useState<Date | undefined>()
<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

// Range
const [range, setRange] = useState<DateRange | undefined>()
<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />

// Com Popover (date picker)
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">{date ? format(date, "PPP") : "Pick a date"}</Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>

// Com dropdown navigation
<Calendar captionLayout="dropdown" fromYear={2000} toYear={2030} />
```
