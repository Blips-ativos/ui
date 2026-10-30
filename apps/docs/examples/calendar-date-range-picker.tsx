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
import { addDays, format } from "date-fns";
import { ptBR as ptBRDateFns } from "date-fns/locale";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

function formatDate(date: Date) {
  return format(date, "dd 'de' LLL, y", { locale: ptBRDateFns });
}

export default function CalendarDateRangePicker() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  return (
    <Field className="mx-auto w-72">
      <FieldLabel htmlFor="calendar-date-range-picker">Período</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="calendar-date-range-picker"
              className="justify-start px-2.5 font-normal"
            />
          }
        >
          <CalendarBlankIcon data-icon="inline-start" />
          {date?.from ? (
            date.to ? (
              <>
                {formatDate(date.from)} – {formatDate(date.to)}
              </>
            ) : (
              formatDate(date.from)
            )
          ) : (
            <span>Escolha um período</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
