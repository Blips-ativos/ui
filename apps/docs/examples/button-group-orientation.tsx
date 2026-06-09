import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { Minus, Plus } from "@phosphor-icons/react";

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
      <Button variant="outline" size="icon">
        <Minus />
      </Button>
    </ButtonGroup>
  );
}
