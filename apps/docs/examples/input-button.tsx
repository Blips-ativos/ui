import { Button } from "@blips/ui/components/button";
import { Input } from "@blips/ui/components/input";

export default function InputButton() {
  return (
    <div className="flex w-full max-w-sm gap-2">
      <Input type="search" placeholder="Buscar..." className="flex-1" />
      <Button>Buscar</Button>
    </div>
  );
}
