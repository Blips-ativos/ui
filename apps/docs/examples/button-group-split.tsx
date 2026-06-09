import { Button } from "@blips/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@blips/ui/components/button-group";
import { Plus } from "@phosphor-icons/react";

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
