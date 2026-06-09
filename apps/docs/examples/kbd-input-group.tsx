import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import { Kbd } from "@blips/ui/components/kbd";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function KbdInputGroup() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="MagnifyingGlass..." />
        <InputGroupAddon>
          <MagnifyingGlass />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
