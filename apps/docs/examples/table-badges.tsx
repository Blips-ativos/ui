import { Badge } from "@blips/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";

const tasks = [
  {
    task: "Criar a página inicial",
    status: "Concluída",
    statusVariant: "default",
    priority: "Alta",
  },
  {
    task: "Implementar a API",
    status: "Em andamento",
    statusVariant: "secondary",
    priority: "Média",
  },
  {
    task: "Escrever os testes",
    status: "Pendente",
    statusVariant: "outline",
    priority: "Baixa",
  },
] as const;

export default function TableBadges() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tarefa</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Prioridade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((item) => (
          <TableRow key={item.task}>
            <TableCell className="font-medium">{item.task}</TableCell>
            <TableCell>
              <Badge variant={item.statusVariant}>{item.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Badge variant="outline">{item.priority}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
