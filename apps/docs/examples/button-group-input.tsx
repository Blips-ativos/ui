import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { Input } from "@blips/ui/components/input";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="MagnifyingGlass..." />
      <Button variant="outline" aria-label="MagnifyingGlass">
        <MagnifyingGlass />
      </Button>
    </ButtonGroup>
  );
}
