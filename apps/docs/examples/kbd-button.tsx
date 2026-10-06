import { Button } from "@blips/ui/components/button";
import { Kbd } from "@blips/ui/components/kbd";

export default function KbdButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm">
        Aceitar <Kbd data-icon="inline-end">⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm">
        Cancelar <Kbd data-icon="inline-end">Esc</Kbd>
      </Button>
    </div>
  );
}
