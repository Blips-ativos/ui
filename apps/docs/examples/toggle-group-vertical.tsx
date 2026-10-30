import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";

export default function ToggleGroupVertical() {
  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      orientation="vertical"
      defaultValue={["all"]}
      spacing={0}
    >
      <ToggleGroupItem value="all">Todos</ToggleGroupItem>
      <ToggleGroupItem value="active">Ativos</ToggleGroupItem>
      <ToggleGroupItem value="completed">Concluídos</ToggleGroupItem>
      <ToggleGroupItem value="archived">Arquivados</ToggleGroupItem>
    </ToggleGroup>
  );
}
