import { Button } from "@blips/ui/components/button";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

const docsLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children do Button, injetados pelo render
  <a href="https://base-ui.com" target="_blank" rel="noreferrer" />
);

export default function ButtonRender() {
  return (
    <Button variant="outline" nativeButton={false} render={docsLink}>
      Abrir documentação <ArrowSquareOutIcon data-icon="inline-end" />
    </Button>
  );
}
