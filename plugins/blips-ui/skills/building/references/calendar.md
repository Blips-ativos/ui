# Calendar

Import: `@blips/ui/components/calendar`

Calendário sobre `react-day-picker` v9 (as duas versões). Exports: `Calendar`,
`CalendarDayButton`. A lib **não** reexporta tipos do react-day-picker: importe
`DateRange`, `Matcher` etc. de `react-day-picker`.

## Notas comuns

`Calendar` aceita todas as props do `DayPicker` mais:

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `mode` | `"single" \| "multiple" \| "range"` | — | Modo de seleção (prop do DayPicker). |
| `selected` / `onSelect` | `Date` \| `Date[]` \| `DateRange` | — | Seleção (prop do DayPicker). |
| `showOutsideDays` | `boolean` | `true` | Mostra dias dos meses vizinhos. |
| `captionLayout` | `"label" \| "dropdown" \| "dropdown-months" \| "dropdown-years"` | `"label"` | Cabeçalho do mês. |
| `buttonVariant` | variante do Button | `"ghost"` | Variante dos botões de navegação (prop da lib). |
| `disabled` | `Matcher \| Matcher[]` | — | Dias desabilitados. |
| `startMonth` / `endMonth` | `Date` | — | Limita a navegação (`fromDate`/`toDate` são da API antiga, deprecated no v9). |
| `numberOfMonths` | `number` | `1` | Meses lado a lado. |
| `locale` | `Locale` | — | Use `ptBR` de `react-day-picker/locale`. |
| `classNames` / `components` / `formatters` | — | — | Overrides do DayPicker. O `formatMonthDropdown` padrão mostra o mês abreviado. |

- Atributos no `CalendarDayButton`: `data-selected-single`, `data-range-start`, `data-range-end`, `data-range-middle`, `data-day`.
- Tamanho da célula pela variável `--cell-size` (sobrescreva com `className="[--cell-size:--spacing(8)]"`).
- Em `PopoverContent`/`CardContent` o fundo fica transparente automaticamente.
- Formate datas exibidas com `date-fns` + locale `ptBR` (`format(date, "PPP", { locale: ptBR })`).
- Chevrons Phosphor.

> A API do Calendar é quase igual nas duas versões, mas o date picker (Popover) e alguns detalhes mudam. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

- `--cell-size` padrão `--spacing(6)` e `--cell-radius` (`--radius-md`). Hoje, intervalo e `range_middle` usam `bg-muted`.
- O `locale` do Calendar é repassado ao `CalendarDayButton` (prop `locale?: Partial<Locale>`), e `data-day`/dropdown de mês formatam com `locale?.code`.
- Override da grade: `classNames.month_grid` (a chave `table` foi removida).
- Com `captionLayout="dropdown"`, os selects de mês/ano ficam sem borda e sem fundo.
- Ícones `CaretLeftIcon`/`CaretRightIcon`/`CaretDownIcon`.
- Date picker: `PopoverTrigger render={<Button … />}`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import { Calendar } from "@blips/ui/components/calendar";
import { Field, FieldLabel } from "@blips/ui/components/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { ptBR as ptBRDateFns } from "date-fns/locale";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

export function DataVencimento() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Field className="w-72">
      <FieldLabel htmlFor="vencimento">Vencimento</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id="vencimento"
              variant="outline"
              className="justify-start px-2.5 font-normal"
            />
          }
        >
          <CalendarBlankIcon data-icon="inline-start" />
          {date ? format(date, "PPP", { locale: ptBRDateFns }) : <span>Escolha uma data</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export function Periodo() {
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      locale={ptBR}
      className="rounded-lg border"
    />
  );
}
```

## v2.x — Radix

- `--cell-size` padrão `--spacing(8)`; hoje e intervalo usam `bg-accent`.
- `CalendarDayButton` não recebe `locale`: `data-day` e o dropdown de mês formatam com `"default"`.
- Override da grade: `classNames.month_grid` (é a chave do react-day-picker v9). A lib v2 passa uma chave `table` que o v9 ignora, então `classNames.table` não tem efeito.
- Com `captionLayout="dropdown"`, os selects têm borda (`border-input shadow-xs`) e foco com ring.
- Ícones `CaretLeft`/`CaretRight`/`CaretDown`.
- Date picker: `PopoverTrigger asChild` + `Button`.

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR as ptBRDateFns } from "date-fns/locale"
import { CalendarBlank } from "@phosphor-icons/react"
import type { DateRange } from "react-day-picker"
import { ptBR } from "react-day-picker/locale"
import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import { Calendar } from "@blips/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export function DataVencimento() {
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
          <CalendarBlank />
          {date ? format(date, "PPP", { locale: ptBRDateFns }) : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
      </PopoverContent>
    </Popover>
  )
}

export function Periodo() {
  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      locale={ptBR}
      className="rounded-md border shadow-sm"
    />
  )
}
```

Date picker com presets (v2): `Select` com "Hoje", "Amanhã", "Em uma semana" acima do `Calendar` dentro do `PopoverContent`, chamando `setDate(addDays(new Date(), Number(value)))`.

## Exemplos na docs

`calendar-demo`, `calendar-basic`, `calendar-range`, `calendar-multiple`, `calendar-caption`, `calendar-date-picker`, `calendar-date-range-picker`, `calendar-presets`, `calendar-booked-dates`, `calendar-custom-days`, `calendar-week-numbers`, `calendar-with-time` (v3).
