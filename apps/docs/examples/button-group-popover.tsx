import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@blips/ui/components/popover";
import { Textarea } from "@blips/ui/components/textarea";
import { CaretDownIcon, RobotIcon } from "@phosphor-icons/react";

export default function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <RobotIcon data-icon="inline-start" /> Copiloto
      </Button>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Abrir popover" />
          }
        >
          <CaretDownIcon />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72">
          <PopoverHeader>
            <PopoverTitle>Nova tarefa</PopoverTitle>
            <PopoverDescription>
              Descreva a tarefa em linguagem natural. O copiloto trabalha em
              segundo plano e abre um pull request para revisão.
            </PopoverDescription>
          </PopoverHeader>
          <Textarea
            placeholder="Descreva sua tarefa..."
            className="resize-none"
          />
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
}
