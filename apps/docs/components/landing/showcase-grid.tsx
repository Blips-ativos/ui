import { Logo } from "@blips/brand";
import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import { Switch } from "@blips/ui/components/switch";

type Cell = {
  label: string;
  content: React.ReactNode;
};

const CELLS: Cell[] = [
  {
    label: "Componentes",
    content: (
      <span className="font-mono text-5xl text-foreground tabular-nums tracking-tighter">
        54
      </span>
    ),
  },
  {
    label: "Button",
    content: (
      <>
        <Button variant="secondary" size="sm" className="rounded-none">
          Secundário
        </Button>
        <Button variant="outline" size="sm" className="rounded-none">
          Outline
        </Button>
      </>
    ),
  },
  {
    label: "Badge",
    content: (
      <>
        <Badge variant="secondary">Estável</Badge>
        <Badge variant="outline">v2</Badge>
      </>
    ),
  },
  {
    label: "Switch",
    content: (
      <>
        <Switch defaultChecked aria-label="Exemplo ligado" />
        <Switch aria-label="Exemplo desligado" />
      </>
    ),
  },
  {
    label: "Release",
    content: (
      <span className="font-mono text-2xl text-foreground tabular-nums tracking-tight">
        v2.0.1
        <span className="ml-2 text-muted-foreground text-sm">· MIT</span>
      </span>
    ),
  },
  {
    label: "Marca",
    content: <Logo variant="mark-circle" title="Blips" className="size-10" />,
  },
];

export function ShowcaseGrid() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.28em]">
          {"// Componentes ao vivo"}
        </p>
      </div>
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {CELLS.map((cell, i) => (
          <div
            key={cell.label}
            className="landing-reveal flex flex-col gap-5 bg-background p-6 sm:p-8"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
              {cell.label}
            </span>
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {cell.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
