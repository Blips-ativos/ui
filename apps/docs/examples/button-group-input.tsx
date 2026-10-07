import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { Input } from "@blips/ui/components/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Buscar..." />
      <Button variant="outline" size="icon" aria-label="Buscar">
        <MagnifyingGlassIcon />
      </Button>
    </ButtonGroup>
  );
}
