import { Button } from "@blips/ui/components/button";
import { ArrowRightIcon, ArrowUpIcon } from "@phosphor-icons/react";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Cancelar</Button>
      <Button>
        Enviar <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Enviar">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
