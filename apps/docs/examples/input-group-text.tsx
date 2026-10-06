import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";

export default function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>R$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0,00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>BRL</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="exemplo" className="pl-0.5!" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com.br</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Digite seu usuário" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@blips.com.br</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Digite sua mensagem" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            Restam 120 caracteres
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
