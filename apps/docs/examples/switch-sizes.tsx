import { Label } from "@blips/ui/components/label";
import { Switch } from "@blips/ui/components/switch";

export default function SwitchSizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Switch id="switch-size-sm" size="sm" />
        <Label htmlFor="switch-size-sm">Pequeno</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-size-default" size="default" />
        <Label htmlFor="switch-size-default">Padrão</Label>
      </div>
    </div>
  );
}
