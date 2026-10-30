"use client";

import { Calendar } from "@blips/ui/components/calendar";
import { Card, CardContent } from "@blips/ui/components/card";
import { addDays } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

export default function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          locale={ptBR}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </CardContent>
    </Card>
  );
}
