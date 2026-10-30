import { Button } from "@blips/ui/components/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function ButtonSize() {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="xs" variant="outline">
          Extra pequeno
        </Button>
        <Button size="icon-xs" aria-label="Enviar" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Pequeno
        </Button>
        <Button size="icon-sm" aria-label="Enviar" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Padrão</Button>
        <Button size="icon" aria-label="Enviar" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="lg">
          Grande
        </Button>
        <Button size="icon-lg" aria-label="Enviar" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  );
}
