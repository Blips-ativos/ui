import { Button } from "@blips/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@blips/ui/components/button-group";

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copiar
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Colar
      </Button>
    </ButtonGroup>
  );
}
