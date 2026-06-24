import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { FolderPlus } from "@phosphor-icons/react";

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus />
        </EmptyMedia>
        <EmptyTitle>Nenhum projeto ainda</EmptyTitle>
        <EmptyDescription>
          Você ainda não criou nenhum projeto. Comece criando o seu primeiro.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">Criar projeto</Button>
          <Button size="sm" variant="outline">
            Importar
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
