import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";

export default function CardSmall() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Card size="default">
        <CardHeader>
          <CardTitle>Tamanho padrão</CardTitle>
          <CardDescription>Espaçamento interno de 16px.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>O padrão para a maior parte das telas.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ação
          </Button>
        </CardFooter>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Tamanho pequeno</CardTitle>
          <CardDescription>Espaçamento interno de 12px.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Mais compacto, bom para dashboards densos.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Ação
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
