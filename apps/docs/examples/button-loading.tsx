import { Button } from "@blips/ui/components/button";
import { Spinner } from "@blips/ui/components/spinner";

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Gerando
      </Button>
      <Button variant="secondary" disabled>
        Aguarde
        <Spinner data-icon="inline-end" />
      </Button>
    </div>
  );
}
