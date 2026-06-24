import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function EmptySearch() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MagnifyingGlass />
        </EmptyMedia>
        <EmptyTitle>Nenhum resultado encontrado</EmptyTitle>
        <EmptyDescription>
          Não encontramos nada para "relatório anual". Tente outros termos ou
          remova os filtros aplicados.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Limpar filtros
        </Button>
      </EmptyContent>
    </Empty>
  );
}
