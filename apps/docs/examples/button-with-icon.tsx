import { Button } from "@blips/ui/components/button";
import { ArrowRightIcon, GitBranchIcon } from "@phosphor-icons/react";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">
        <GitBranchIcon data-icon="inline-start" /> Nova branch
      </Button>
      <Button variant="outline">
        Continuar <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
