import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";

export default function ToggleGroupSpacing() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        variant="outline"
        size="sm"
        defaultValue={["top"]}
        spacing={0}
      >
        <ToggleGroupItem value="top">Topo</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Base</ToggleGroupItem>
        <ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
        <ToggleGroupItem value="right">Direita</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        variant="outline"
        size="sm"
        defaultValue={["top"]}
        spacing={2}
      >
        <ToggleGroupItem value="top">Topo</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Base</ToggleGroupItem>
        <ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
        <ToggleGroupItem value="right">Direita</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
