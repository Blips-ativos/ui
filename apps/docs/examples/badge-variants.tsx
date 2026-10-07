import { Badge } from "@blips/ui/components/badge";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Padrão</Badge>
      <Badge variant="secondary">Secundário</Badge>
      <Badge variant="destructive">Destrutivo</Badge>
      <Badge variant="outline">Contorno</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  );
}
