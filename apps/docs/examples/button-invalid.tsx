import { Button } from "@blips/ui/components/button";

export default function ButtonInvalid() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button aria-invalid="true">Default</Button>
      <Button variant="secondary" aria-invalid="true">
        Secondary
      </Button>
      <Button variant="outline" aria-invalid="true">
        Outline
      </Button>
      <Button variant="ghost" aria-invalid="true">
        Ghost
      </Button>
    </div>
  );
}
