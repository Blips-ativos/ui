import { Toggle } from "@blips/ui/components/toggle";

export default function ToggleSize() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Alternar pequeno" size="sm">
        Pequeno
      </Toggle>
      <Toggle variant="outline" aria-label="Alternar padrão" size="default">
        Padrão
      </Toggle>
      <Toggle variant="outline" aria-label="Alternar grande" size="lg">
        Grande
      </Toggle>
    </div>
  );
}
