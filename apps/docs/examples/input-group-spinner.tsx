import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@blips/ui/components/input-group";
import { Spinner } from "@blips/ui/components/spinner";
import { CircleNotchIcon } from "@phosphor-icons/react";

export default function InputGroupSpinner() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled="true">
        <InputGroupInput placeholder="Buscando..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled="true">
        <InputGroupInput placeholder="Processando..." disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled="true">
        <InputGroupInput placeholder="Salvando alterações..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Salvando...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled="true">
        <InputGroupInput placeholder="Atualizando dados..." disabled />
        <InputGroupAddon>
          <CircleNotchIcon className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Aguarde...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
