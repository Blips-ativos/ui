import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" defaultValue={["all"]}>
      <ToggleGroupItem value="all" aria-label="Mostrar todas">
        Todas
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Mostrar perdidas">
        Perdidas
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
