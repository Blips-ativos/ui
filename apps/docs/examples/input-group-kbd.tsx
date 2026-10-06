import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import { Kbd, KbdGroup } from "@blips/ui/components/kbd";
import { MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react";

export default function InputGroupKbd() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Buscar aplicativos..." />
        <InputGroupAddon align="inline-end">Perguntar à IA</InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>Tab</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Digite para buscar..." />
        <InputGroupAddon>
          <SparkleIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>C</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
