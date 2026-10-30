"use client";

import { Calendar } from "@blips/ui/components/calendar";
import { ptBR } from "react-day-picker/locale";

export default function CalendarBasic() {
  return <Calendar mode="single" locale={ptBR} className="rounded-lg border" />;
}
