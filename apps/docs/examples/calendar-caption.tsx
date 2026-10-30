"use client";

import { Calendar } from "@blips/ui/components/calendar";
import { Card, CardContent } from "@blips/ui/components/card";
import * as React from "react";
import { ptBR } from "react-day-picker/locale";

export default function CalendarCaption() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  );

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          locale={ptBR}
        />
      </CardContent>
    </Card>
  );
}
