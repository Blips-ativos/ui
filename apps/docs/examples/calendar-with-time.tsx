"use client";

import { Calendar } from "@blips/ui/components/calendar";
import { Card, CardContent, CardFooter } from "@blips/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import { ClockIcon } from "@phosphor-icons/react";
import * as React from "react";
import { ptBR } from "react-day-picker/locale";

const timeInputClassName =
  "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none";

export default function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  );

  return (
    <Card size="sm" className="mx-auto w-fit">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          className="p-0"
        />
      </CardContent>
      <CardFooter className="border-t bg-card">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="calendar-time-from">Início</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="calendar-time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className={timeInputClassName}
              />
              <InputGroupAddon>
                <ClockIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="calendar-time-to">Fim</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="calendar-time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                className={timeInputClassName}
              />
              <InputGroupAddon>
                <ClockIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
}
