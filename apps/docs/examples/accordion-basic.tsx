import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";

const items = [
  {
    value: "item-1",
    trigger: "Como redefino minha senha?",
    content:
      "Clique em 'Esqueci minha senha' na tela de login, informe seu e-mail e enviaremos um link para redefinir a senha. O link expira em 24 horas.",
  },
  {
    value: "item-2",
    trigger: "Posso trocar de plano?",
    content:
      "Sim, você pode subir ou descer de plano a qualquer momento nas configurações da conta. A mudança vale a partir do próximo ciclo de cobrança.",
  },
  {
    value: "item-3",
    trigger: "Quais formas de pagamento vocês aceitam?",
    content:
      "Aceitamos os principais cartões de crédito, Pix e boleto. Todos os pagamentos são processados com segurança pelos nossos parceiros.",
  },
];

export default function AccordionBasic() {
  return (
    <Accordion defaultValue={["item-1"]} className="mx-auto max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
