import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { PlusIcon } from "@phosphor-icons/react";

export default function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Pequeno
        </Button>
        <Button variant="outline" size="sm">
          Grupo
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Adicionar">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Padrão</Button>
        <Button variant="outline">Grupo</Button>
        <Button variant="outline" size="icon" aria-label="Adicionar">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Grande
        </Button>
        <Button variant="outline" size="lg">
          Grupo
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="Adicionar">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
