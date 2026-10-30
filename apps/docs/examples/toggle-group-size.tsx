import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";

export default function ToggleGroupSize() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup size="sm" defaultValue={["day"]} variant="outline">
        <ToggleGroupItem value="day">Dia</ToggleGroupItem>
        <ToggleGroupItem value="week">Semana</ToggleGroupItem>
        <ToggleGroupItem value="month">Mês</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["day"]} variant="outline">
        <ToggleGroupItem value="day">Dia</ToggleGroupItem>
        <ToggleGroupItem value="week">Semana</ToggleGroupItem>
        <ToggleGroupItem value="month">Mês</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size="lg" defaultValue={["day"]} variant="outline">
        <ToggleGroupItem value="day">Dia</ToggleGroupItem>
        <ToggleGroupItem value="week">Semana</ToggleGroupItem>
        <ToggleGroupItem value="month">Mês</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
