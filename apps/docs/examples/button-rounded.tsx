import { Button } from "@blips/ui/components/button";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function ButtonRounded() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      aria-label="Enviar"
    >
      <ArrowUpIcon />
    </Button>
  );
}
