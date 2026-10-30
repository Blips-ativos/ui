import { Separator } from "@blips/ui/components/separator";

const rows = [
  { label: "Plano", value: "Empresarial" },
  { label: "Vencimento", value: "10/11/2026" },
  { label: "Forma de pagamento", value: "Boleto" },
];

export default function SeparatorList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      {rows.map((row, index) => (
        <div key={row.label} className="flex flex-col gap-2">
          {index > 0 && <Separator />}
          <dl className="flex items-center justify-between">
            <dt>{row.label}</dt>
            <dd className="text-muted-foreground">{row.value}</dd>
          </dl>
        </div>
      ))}
    </div>
  );
}
