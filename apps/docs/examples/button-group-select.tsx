"use client";

import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { Input } from "@blips/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";
import { ArrowRightIcon } from "@phosphor-icons/react";

const currencies = [
  { label: "R$", value: "BRL" },
  { label: "US$", value: "USD" },
  { label: "€", value: "EUR" },
];

export default function ButtonGroupSelect() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select items={currencies} defaultValue="BRL">
          <SelectTrigger className="font-mono" aria-label="Moeda">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10,00" inputMode="decimal" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Enviar" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
