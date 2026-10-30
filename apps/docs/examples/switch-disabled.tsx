import { Label } from "@blips/ui/components/label";
import { Switch } from "@blips/ui/components/switch";

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled-unchecked" disabled />
        <Label htmlFor="switch-disabled-unchecked">
          Desabilitado (desligado)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled-checked" defaultChecked disabled />
        <Label htmlFor="switch-disabled-checked">Desabilitado (ligado)</Label>
      </div>
    </div>
  );
}
