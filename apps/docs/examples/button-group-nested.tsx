import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button key={page} variant="outline" size="sm">
            {page}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Anterior">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Próxima">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
