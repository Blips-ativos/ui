import { Button } from "@blips/ui/components/button";

export default function ButtonInvalid() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button aria-invalid="true">Padrão</Button>
      <Button variant="secondary" aria-invalid="true">
        Secundário
      </Button>
      <Button variant="outline" aria-invalid="true">
        Contorno
      </Button>
      <Button variant="ghost" aria-invalid="true">
        Ghost
      </Button>
    </div>
  );
}
