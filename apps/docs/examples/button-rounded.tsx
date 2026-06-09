import { Button } from "@blips/ui/components/button";
import { ArrowUp } from "@phosphor-icons/react";

export default function ButtonRounded() {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <ArrowUp />
      </Button>
    </div>
  );
}
