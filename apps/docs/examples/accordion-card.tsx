import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";
import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

const items = [
  {
    value: "plans",
    trigger: "Quais planos de assinatura vocês oferecem?",
    content: (
      <>
        <p>
          Temos três planos: Inicial (R$ 49/mês), Profissional (R$ 149/mês) e
          Empresarial (R$ 499/mês). Cada plano amplia o armazenamento, o acesso
          à API, a prioridade no suporte e os recursos de colaboração.
        </p>
        <p>
          <a href="#planos">A cobrança anual</a> tem 20% de desconto. Todos os
          planos incluem 14 dias de teste grátis, sem cartão de crédito.
        </p>
        <Button size="sm">
          Ver planos
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
      </>
    ),
  },
  {
    value: "billing",
    trigger: "Como funciona a cobrança?",
    content: (
      <p>
        A cobrança acontece automaticamente no início de cada ciclo. Aceitamos
        cartões de crédito, Pix e boleto. Você recebe a nota fiscal por e-mail
        após cada pagamento.
      </p>
    ),
  },
  {
    value: "cancel",
    trigger: "Como cancelo minha assinatura?",
    content: (
      <p>
        Você pode cancelar a qualquer momento nas configurações da conta, sem
        multa. O acesso continua até o fim do período já pago.
      </p>
    ),
  },
];

export default function AccordionCard() {
  return (
    <Card className="mx-auto w-full max-w-lg gap-4">
      <CardHeader>
        <CardTitle>Assinatura e cobrança</CardTitle>
        <CardDescription>
          Perguntas frequentes sobre conta, planos e pagamentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion multiple defaultValue={["plans"]}>
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
