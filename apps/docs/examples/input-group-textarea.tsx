import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";
import { ArrowClockwiseIcon, CodeIcon, CopyIcon } from "@phosphor-icons/react";

export default function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Olá, mundo!');"
          className="min-h-[200px] py-3"
        />
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-medium font-mono">
            <CodeIcon />
            script.js
          </InputGroupText>
          <InputGroupButton
            size="icon-xs"
            className="ml-auto"
            aria-label="Recarregar"
          >
            <ArrowClockwiseIcon />
          </InputGroupButton>
          <InputGroupButton size="icon-xs" variant="ghost" aria-label="Copiar">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Linha 1, Coluna 1</InputGroupText>
          <InputGroupText className="ml-auto">JavaScript</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
