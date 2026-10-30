import { Kbd, KbdGroup } from "@blips/ui/components/kbd";

export default function KbdGroupExample() {
  return (
    <p className="text-sm text-muted-foreground">
      Use{" "}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{" "}
      para abrir a paleta de comandos
    </p>
  );
}
