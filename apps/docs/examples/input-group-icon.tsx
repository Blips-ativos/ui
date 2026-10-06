import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import {
  CheckIcon,
  CreditCardIcon,
  EnvelopeSimpleIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@phosphor-icons/react";

export default function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Digite seu e-mail" />
        <InputGroupAddon>
          <EnvelopeSimpleIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Número do cartão" />
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Número do cartão" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
