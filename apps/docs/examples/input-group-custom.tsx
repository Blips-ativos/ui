import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@blips/ui/components/input-group";

export default function InputGroupCustom() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <textarea
          data-slot="input-group-control"
          className="field-sizing-content flex min-h-16 w-full resize-none rounded-md bg-transparent px-2 py-2 text-sm outline-none transition-[color,box-shadow] md:text-xs/relaxed"
          placeholder="Textarea com redimensionamento automático..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton className="ml-auto" size="sm" variant="default">
            Enviar
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
