import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { ArrowClockwise, WarningCircle } from "@phosphor-icons/react";

export default function EmptyError() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WarningCircle />
        </EmptyMedia>
        <EmptyTitle>Não foi possível carregar</EmptyTitle>
        <EmptyDescription>
          Ocorreu um erro ao buscar os dados. Verifique sua conexão e tente
          novamente.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          <ArrowClockwise />
          Tentar novamente
        </Button>
      </EmptyContent>
    </Empty>
  );
}
