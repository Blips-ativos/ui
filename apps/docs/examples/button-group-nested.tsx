"use client";

import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous">
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next">
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
