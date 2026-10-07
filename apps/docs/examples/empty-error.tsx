import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { ArrowClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react";

export default function EmptyError() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WarningCircleIcon />
        </EmptyMedia>
        <EmptyTitle>Não foi possível carregar</EmptyTitle>
        <EmptyDescription>
          Ocorreu um erro ao buscar os dados. Verifique sua conexão e tente
          novamente.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          <ArrowClockwiseIcon data-icon="inline-start" />
          Tentar novamente
        </Button>
      </EmptyContent>
    </Empty>
  );
}
