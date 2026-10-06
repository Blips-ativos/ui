"use client";

import { Button } from "@blips/ui/components/button";
import { Calendar } from "@blips/ui/components/calendar";
import { Card, CardContent, CardFooter } from "@blips/ui/components/card";
import { addDays } from "date-fns";
import * as React from "react";
import { ptBR } from "react-day-picker/locale";

const presets = [
  { label: "Hoje", value: 0 },
  { label: "Amanhã", value: 1 },
  { label: "Em 3 dias", value: 3 },
  { label: "Em 1 semana", value: 7 },
  { label: "Em 2 semanas", value: 14 },
];

export default function CalendarWithPresets() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  return (
    <Card className="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          locale={ptBR}
          fixedWeeks
          className="p-0 [--cell-size:--spacing(9.5)]"
        />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t">
        {presets.map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              const newDate = addDays(new Date(), preset.value);
              setDate(newDate);
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1)
              );
            }}
          >
            {preset.label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
}
