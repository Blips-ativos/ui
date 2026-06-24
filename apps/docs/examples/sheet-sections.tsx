"use client";
import { Button } from "@blips/ui/components/button";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetSection,
  SheetSectionTitle,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet";

export default function SheetSections() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar empreendimento</Button>
      </SheetTrigger>
      <SheetContent className="sm:data-[side=right]:max-w-lg">
        <SheetHeader>
          <SheetTitle>Editar empreendimento</SheetTitle>
          <SheetDescription>
            Atualize as informações. O corpo rola; cabeçalho e rodapé ficam
            fixos.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetSectionTitle>Informações gerais</SheetSectionTitle>
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue="Residencial Aurora" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" defaultValue="12.345.678/0001-90" />
              </div>
            </div>
          </SheetSection>
          <SheetSection>
            <SheetSectionTitle>Endereço</SheetSectionTitle>
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="street">Logradouro</Label>
                <Input id="street" defaultValue="Av. Paulista, 1000" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" defaultValue="São Paulo" />
              </div>
            </div>
          </SheetSection>
          <SheetSection>
            <SheetSectionTitle>Observações</SheetSectionTitle>
            <div className="grid gap-1.5">
              <Label htmlFor="notes">Notas internas</Label>
              <Input id="notes" placeholder="Opcional" />
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar alterações</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
