import { Button } from "@blips/ui/components/button";
import { Spinner } from "@blips/ui/components/spinner";

export default function SpinnerButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Carregando...
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Aguarde
      </Button>
      <Button variant="secondary" disabled>
        <Spinner data-icon="inline-start" />
        Processando
      </Button>
      <Button variant="outline" size="icon" disabled>
        <Spinner />
        <span className="sr-only">Carregando...</span>
      </Button>
    </div>
  );
}
