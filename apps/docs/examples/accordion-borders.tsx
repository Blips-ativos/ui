import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";

const items = [
  {
    value: "billing",
    trigger: "Como funciona a cobrança?",
    content:
      "Oferecemos planos mensais e anuais. A cobrança é feita no início de cada ciclo e você pode cancelar quando quiser. Todos os planos incluem backups automáticos, suporte 24/7 e membros ilimitados.",
  },
  {
    value: "security",
    trigger: "Meus dados estão seguros?",
    content:
      "Sim. Usamos criptografia de ponta a ponta, conformidade SOC 2 Tipo II e auditorias de segurança independentes. Os dados são criptografados em repouso e em trânsito.",
  },
  {
    value: "integration",
    trigger: "Quais integrações vocês suportam?",
    content: (
      <>
        <p>
          Integramos com mais de 500 ferramentas, como Slack, Zapier, Salesforce
          e HubSpot. Também é possível criar integrações próprias com a nossa
          API REST e webhooks.
        </p>
        <p>A documentação da API traz exemplos em mais de 10 linguagens.</p>
      </>
    ),
  },
];

export default function AccordionBorders() {
  return (
    <Accordion defaultValue={["billing"]} className="mx-auto max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="font-medium">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
