import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { CloudArrowUpIcon } from "@phosphor-icons/react";

export default function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudArrowUpIcon />
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
