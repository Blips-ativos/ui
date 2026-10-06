"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@blips/ui/components/combobox";

type Customer = { id: string; name: string; document: string; city: string };

const customers: Customer[] = [
  {
    id: "1",
    name: "Padaria Pão Dourado",
    document: "12.345.678/0001-90",
    city: "São Paulo",
  },
  {
    id: "2",
    name: "Restaurante Sabor Mineiro",
    document: "23.456.789/0001-01",
    city: "Belo Horizonte",
  },
  {
    id: "3",
    name: "Café da Praça",
    document: "34.567.890/0001-12",
    city: "Curitiba",
  },
  {
    id: "4",
    name: "Sorveteria Gelato",
    document: "45.678.901/0001-23",
    city: "Florianópolis",
  },
  {
    id: "5",
    name: "Pizzaria Forno a Lenha",
    document: "56.789.012/0001-34",
    city: "Recife",
  },
];

export default function ComboboxCustom() {
  return (
    <Combobox
      items={customers}
      itemToStringLabel={(customer: Customer) => customer.name}
      itemToStringValue={(customer: Customer) => customer.id}
    >
      <ComboboxInput placeholder="Buscar cliente..." className="w-72" />
      <ComboboxContent>
        <ComboboxEmpty>Nenhum cliente encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(customer: Customer) => (
            <ComboboxItem key={customer.id} value={customer}>
              <div className="flex flex-col">
                <span className="whitespace-nowrap font-medium">
                  {customer.name}
                </span>
                <span className="text-muted-foreground">
                  {customer.city} · {customer.document}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
