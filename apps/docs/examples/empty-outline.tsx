import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { CloudArrowUp } from "@phosphor-icons/react";

export default function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudArrowUp />
        </EmptyMedia>
        <EmptyTitle>Armazenamento vazio</EmptyTitle>
        <EmptyDescription>
          Envie arquivos para acessá-los de qualquer lugar.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Enviar arquivos
        </Button>
      </EmptyContent>
    </Empty>
  );
}
