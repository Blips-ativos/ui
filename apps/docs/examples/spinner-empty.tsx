import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { Spinner } from "@blips/ui/components/spinner";

export default function SpinnerEmpty() {
  return (
    <Empty className="w-full max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processando sua solicitação</EmptyTitle>
        <EmptyDescription>
          Aguarde enquanto preparamos os dados. Não atualize a página.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Cancelar</Button>
      </EmptyContent>
    </Empty>
  );
}
