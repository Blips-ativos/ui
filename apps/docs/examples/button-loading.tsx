"use client";
import { Button } from "@blips/ui/components/button";
import { CircleNotch } from "@phosphor-icons/react";
export default function ButtonLoading() {
  return (
    <Button disabled>
      <CircleNotch className="animate-spin" />
      Please wait
    </Button>
  );
}
