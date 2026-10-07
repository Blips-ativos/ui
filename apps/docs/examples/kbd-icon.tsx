import { Kbd, KbdGroup } from "@blips/ui/components/kbd";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleDashedIcon,
} from "@phosphor-icons/react";

export default function KbdIcon() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>
          <CircleDashedIcon />
        </Kbd>
        <Kbd>
          <ArrowLeftIcon />
        </Kbd>
        <Kbd>
          <ArrowRightIcon />
        </Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>
          <ArrowLeftIcon />
          Esquerda
        </Kbd>
        <Kbd>
          <CircleDashedIcon />
          Voz ativada
        </Kbd>
      </KbdGroup>
    </div>
  );
}
