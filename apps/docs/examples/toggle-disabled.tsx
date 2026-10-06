import { Toggle } from "@blips/ui/components/toggle";

export default function ToggleDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Alternar desabilitado" disabled>
        Desabilitado
      </Toggle>
      <Toggle variant="outline" aria-label="Alternar desabilitado" disabled>
        Desabilitado
      </Toggle>
    </div>
  );
}
