import { Button } from "@blips/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@blips/ui/components/button-group";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";

export default function ButtonGroupTextDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="blips.com.br" />
        <Button variant="outline">Abrir</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText render={<Label htmlFor="button-group-text-input" />}>
          Usuário
        </ButtonGroupText>
        <Input id="button-group-text-input" placeholder="Digite algo aqui..." />
      </ButtonGroup>
    </div>
  );
}
