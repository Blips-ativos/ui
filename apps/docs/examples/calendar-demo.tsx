"use client";

import { Calendar } from "@blips/ui/components/calendar";
import * as React from "react";
import { ptBR } from "react-day-picker/locale";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={ptBR}
      className="rounded-md border"
    />
  );
}
