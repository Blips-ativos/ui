import { Button } from "@blips/ui/components/button";
import { GitBranch } from "@phosphor-icons/react";

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <GitBranch /> New Branch
    </Button>
  );
}
