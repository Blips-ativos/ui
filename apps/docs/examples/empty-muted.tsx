import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function EmptyMuted() {
  return (
    <Empty className="bg-muted">
      <EmptyHeader>
        <EmptyTitle>Nenhum resultado encontrado</EmptyTitle>
        <EmptyDescription>
          Nenhum resultado para a sua busca. Tente ajustar os termos.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Tentar novamente</Button>
        <Button
          variant="link"
          size="sm"
          // biome-ignore lint/a11y/useAnchorContent: o texto do link vem dos children do Button
          render={<a href="#ajuda" />}
          nativeButton={false}
          className="text-muted-foreground"
        >
          Saiba mais
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
      </EmptyContent>
    </Empty>
  );
}
