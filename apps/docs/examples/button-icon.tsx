import { Button } from "@blips/ui/components/button";
import { ArrowCircleUpIcon } from "@phosphor-icons/react";

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon" aria-label="Enviar">
      <ArrowCircleUpIcon />
    </Button>
  );
}
