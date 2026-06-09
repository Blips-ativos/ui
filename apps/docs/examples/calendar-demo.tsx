"use client";
import { Calendar } from "@blips/ui/components/calendar";
import { useState } from "react";
export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
