import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";

const items = [
  {
    value: "notifications",
    trigger: "Notificações",
    content:
      "Escolha como receber notificações. Você pode ativar alertas por e-mail ou notificações push no celular.",
  },
  {
    value: "privacy",
    trigger: "Privacidade e segurança",
    content:
      "Controle suas preferências de privacidade e segurança. Ative a autenticação em dois fatores, gerencie dispositivos conectados, revise sessões ativas e configure o compartilhamento de dados.",
  },
  {
    value: "billing",
    trigger: "Cobrança e assinatura",
    content:
      "Veja seu plano atual, o histórico de pagamentos e as próximas faturas. Atualize a forma de pagamento, troque de plano ou cancele a assinatura.",
  },
];

export default function AccordionMultiple() {
  return (
    <Accordion
      multiple
      defaultValue={["notifications"]}
      className="mx-auto max-w-lg"
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
