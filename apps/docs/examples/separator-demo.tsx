import { Separator } from "@blips/ui/components/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm text-sm">
      <div className="flex flex-col gap-1">
        <h4 className="leading-none font-medium">Blips UI</h4>
        <p className="text-muted-foreground">
          A biblioteca de componentes da Blips.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Código</div>
        <Separator orientation="vertical" />
        <div>Changelog</div>
      </div>
    </div>
  );
}
