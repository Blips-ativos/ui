import { Button } from "@blips/ui/components/button";

const sizes = ["xs", "sm", "default", "lg"] as const;
const variants = [
  { variant: "default", label: "Padrão" },
  { variant: "secondary", label: "Secundário" },
  { variant: "outline", label: "Contorno" },
  { variant: "ghost", label: "Ghost" },
  { variant: "destructive", label: "Destrutivo" },
  { variant: "link", label: "Link" },
] as const;

export default function ButtonVariants() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          {variants.map(({ variant, label }) => (
            <Button key={variant} size={size} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
