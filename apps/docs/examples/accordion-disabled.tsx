import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";

const items = [
  {
    value: "item-1",
    trigger: "Consigo ver o histórico da minha conta?",
    content:
      "Sim. O histórico completo, com transações, mudanças de plano e chamados de suporte, fica na seção Histórico do painel.",
    disabled: false,
  },
  {
    value: "item-2",
    trigger: "Recursos do plano premium",
    content:
      "Esta seção traz informações sobre os recursos premium. Faça upgrade do plano para acessar este conteúdo.",
    disabled: true,
  },
  {
    value: "item-3",
    trigger: "Como atualizo meu e-mail?",
    content:
      "Você pode atualizar o e-mail nas configurações da conta. Enviaremos uma mensagem de verificação para o novo endereço confirmar a troca.",
    disabled: false,
  },
];

export default function AccordionDisabled() {
  return (
    <Accordion className="mx-auto max-w-lg">
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
