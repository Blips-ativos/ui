import { Button } from "@blips/ui/components/button";

const sizes = ["xs", "sm", "default", "lg"] as const;
const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

export default function ButtonVariants() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          {variants.map((variant) => (
            <Button key={variant} size={size} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
