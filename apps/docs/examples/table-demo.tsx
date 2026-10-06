import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";

const invoices = [
  {
    invoice: "FAT001",
    paymentStatus: "Pago",
    totalAmount: 250,
    paymentMethod: "Cartão de crédito",
  },
  {
    invoice: "FAT002",
    paymentStatus: "Pendente",
    totalAmount: 150,
    paymentMethod: "Pix",
  },
  {
    invoice: "FAT003",
    paymentStatus: "Em aberto",
    totalAmount: 350,
    paymentMethod: "Boleto",
  },
  {
    invoice: "FAT004",
    paymentStatus: "Pago",
    totalAmount: 450,
    paymentMethod: "Cartão de crédito",
  },
  {
    invoice: "FAT005",
    paymentStatus: "Pago",
    totalAmount: 550,
    paymentMethod: "Pix",
  },
  {
    invoice: "FAT006",
    paymentStatus: "Pendente",
    totalAmount: 200,
    paymentMethod: "Boleto",
  },
  {
    invoice: "FAT007",
    paymentStatus: "Em aberto",
    totalAmount: 300,
    paymentMethod: "Cartão de crédito",
  },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const total = invoices.reduce((acc, item) => acc + item.totalAmount, 0);

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Uma lista das suas faturas recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fatura</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">
              {currency.format(invoice.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{currency.format(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
