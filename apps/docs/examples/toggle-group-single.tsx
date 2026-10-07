import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";

export default function ToggleGroupSingle() {
  return (
    <ToggleGroup defaultValue={["left"]} spacing={1}>
      <ToggleGroupItem value="left" aria-label="Alinhar à esquerda">
        <TextAlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Centralizar">
        <TextAlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Alinhar à direita">
        <TextAlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
