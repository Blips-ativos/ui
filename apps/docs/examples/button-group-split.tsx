import { Button } from "@blips/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@blips/ui/components/button-group";
import { PlusIcon } from "@phosphor-icons/react";

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Botão</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary" aria-label="Adicionar">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
