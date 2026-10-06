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
import { ptBR } from "react-day-picker/locale";

export default function CalendarDatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Field className="mx-auto w-72">
      <FieldLabel htmlFor="calendar-date-picker">Data</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="calendar-date-picker"
              className="justify-start px-2.5 font-normal"
            />
          }
        >
          <CalendarBlankIcon data-icon="inline-start" />
          {date ? (
            format(date, "PPP", { locale: ptBRDateFns })
          ) : (
            <span>Escolha uma data</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
