import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@blips/ui/components/alert";

export default function AlertBasic() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Alert>
        <AlertTitle>Pronto! Suas alterações foram salvas.</AlertTitle>
      </Alert>
      <Alert>
        <AlertTitle>Pronto! Suas alterações foram salvas.</AlertTitle>
        <AlertDescription>Um alerta com título e descrição.</AlertDescription>
      </Alert>
      <Alert>
        <AlertDescription>
          Este tem só a descrição. Sem título e sem ícone.
        </AlertDescription>
      </Alert>
    </div>
  );
}
