import { Separator } from "@blips/ui/components/separator";

export default function SeparatorVerticalMenu() {
  return (
    <div className="flex items-center gap-2 text-sm md:gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium">Configurações</span>
        <span className="text-xs text-muted-foreground">
          Gerencie preferências
        </span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">Conta</span>
        <span className="text-xs text-muted-foreground">
          Perfil e segurança
        </span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">Ajuda</span>
        <span className="text-xs text-muted-foreground">Suporte e docs</span>
      </div>
    </div>
  );
}
