import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Controles de zoom"
      className="h-fit"
    >
      <Button variant="outline" size="icon" aria-label="Aumentar">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Diminuir">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}
