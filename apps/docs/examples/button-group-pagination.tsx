import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

export default function ButtonGroupPagination() {
  return (
    <ButtonGroup aria-label="Paginação">
      <Button variant="outline" size="sm">
        <ArrowLeftIcon data-icon="inline-start" />
        Anterior
      </Button>
      {[1, 2, 3, 4, 5].map((page) => (
        <Button key={page} variant="outline" size="sm">
          {page}
        </Button>
      ))}
      <Button variant="outline" size="sm">
        Próxima
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </ButtonGroup>
  );
}
