"use client";

import { Calendar } from "@blips/ui/components/calendar";
import { Card, CardContent } from "@blips/ui/components/card";
import { ptBR } from "react-day-picker/locale";

export default function CalendarMultiple() {
  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar mode="multiple" locale={ptBR} />
      </CardContent>
    </Card>
  );
}
