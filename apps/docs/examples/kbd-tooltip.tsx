import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import { Kbd, KbdGroup } from "@blips/ui/components/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";

export default function KbdTooltip() {
  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger render={<Button size="sm" variant="outline" />}>
          Salvar
        </TooltipTrigger>
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2">
            Salvar alterações <Kbd>S</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button size="sm" variant="outline" />}>
          Imprimir
        </TooltipTrigger>
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2">
            Imprimir documento
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </div>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
}
