/**
 * Dados fictícios dos blocks da home. Nada aqui vem de cliente real: nomes,
 * valores e números de série foram inventados para ilustrar telas do dia a
 * dia da Blips (locação, cobrança, garantia, IoT e atendimento).
 */

export const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const percentual = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

export const dataLonga = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

/* ------------------------------------------------------------------------ */
/* Contratos de locação                                                      */
/* ------------------------------------------------------------------------ */

export type StatusContrato = "ativo" | "atraso" | "encerrado";

export type Contrato = {
  id: string;
  cliente: string;
  equipamento: string;
  status: StatusContrato;
  mensalidade: number;
};

export const contratos: Contrato[] = [
  {
    id: "CT-2041",
    cliente: "Padaria Trigo Dourado",
    equipamento: "Forno combinado 10 GN",
    status: "ativo",
    mensalidade: 1890,
  },
  {
    id: "CT-2038",
    cliente: "Mercado Bom Preço",
    equipamento: "Expositor refrigerado 2 m",
    status: "atraso",
    mensalidade: 1240.5,
  },
  {
    id: "CT-2035",
    cliente: "Café Esquina",
    equipamento: "Máquina de espresso 2 grupos",
    status: "ativo",
    mensalidade: 980,
  },
  {
    id: "CT-2029",
    cliente: "Restaurante Sabor da Serra",
    equipamento: "Lava-louças de capota",
    status: "encerrado",
    mensalidade: 1560,
  },
  {
    id: "CT-2024",
    cliente: "Sorveteria Polar",
    equipamento: "Freezer horizontal 500 L",
    status: "ativo",
    mensalidade: 640,
  },
];

/* ------------------------------------------------------------------------ */
/* Fatura                                                                    */
/* ------------------------------------------------------------------------ */

export type ItemFatura = {
  descricao: string;
  detalhe: string;
  valor: number;
};

export const fatura = {
  numero: "FAT-11872",
  cliente: "Padaria Trigo Dourado",
  vencimento: new Date(2026, 10, 10),
  itens: [
    {
      descricao: "Locação · Forno combinado 10 GN",
      detalhe: "Mensalidade de novembro",
      valor: 1890,
    },
    {
      descricao: "Manutenção preventiva",
      detalhe: "Visita técnica trimestral",
      valor: 210,
    },
    {
      descricao: "Monitoramento IoT",
      detalhe: "Plano básico · 1 sensor",
      valor: 49.9,
    },
  ] satisfies ItemFatura[],
  desconto: 94.5,
};

/* ------------------------------------------------------------------------ */
/* Atendimento com o agente Salvador                                         */
/* ------------------------------------------------------------------------ */

export type MensagemAtendimento = {
  id: string;
  autor: "cliente" | "agente";
  texto: string;
  horario: string;
};

export const conversa: MensagemAtendimento[] = [
  {
    id: "m1",
    autor: "cliente",
    texto: "Oi! Meu boleto de novembro ainda não chegou.",
    horario: "09:12",
  },
  {
    id: "m2",
    autor: "agente",
    texto:
      "Olá! Encontrei o contrato CT-2041. A fatura de novembro vence em 10/11 e já está disponível.",
    horario: "09:12",
  },
  {
    id: "m3",
    autor: "agente",
    texto: "Quer que eu envie a segunda via por aqui ou por e-mail?",
    horario: "09:12",
  },
  {
    id: "m4",
    autor: "cliente",
    texto: "Por aqui mesmo, obrigado.",
    horario: "09:13",
  },
];

/* ------------------------------------------------------------------------ */
/* Frota de equipamentos (IoT)                                               */
/* ------------------------------------------------------------------------ */

export type EstadoEquipamento = "online" | "offline" | "manutencao";

export type Equipamento = {
  serie: string;
  nome: string;
  local: string;
  estado: EstadoEquipamento;
  ultimoSinal: string;
  bateria: number;
};

export const frota: Equipamento[] = [
  {
    serie: "BLP-7731",
    nome: "Expositor refrigerado",
    local: "Mercado Bom Preço · Campinas",
    estado: "online",
    ultimoSinal: "há 2 min",
    bateria: 86,
  },
  {
    serie: "BLP-6120",
    nome: "Freezer horizontal",
    local: "Sorveteria Polar · Santos",
    estado: "manutencao",
    ultimoSinal: "há 3 h",
    bateria: 41,
  },
  {
    serie: "BLP-5598",
    nome: "Forno combinado",
    local: "Padaria Trigo Dourado · Sorocaba",
    estado: "offline",
    ultimoSinal: "há 2 dias",
    bateria: 12,
  },
];

/* ------------------------------------------------------------------------ */
/* Receita recorrente (MRR)                                                  */
/* ------------------------------------------------------------------------ */

export const receitaMensal = [
  { mes: "mai", receita: 412300 },
  { mes: "jun", receita: 428900 },
  { mes: "jul", receita: 431200 },
  { mes: "ago", receita: 455800 },
  { mes: "set", receita: 468400 },
  { mes: "out", receita: 491750 },
];

/* ------------------------------------------------------------------------ */
/* Chamado de garantia                                                       */
/* ------------------------------------------------------------------------ */

export const equipamentosDoCliente = [
  { valor: "BLP-5598", rotulo: "Forno combinado 10 GN · BLP-5598" },
  { valor: "BLP-7731", rotulo: "Expositor refrigerado 2 m · BLP-7731" },
  { valor: "BLP-6120", rotulo: "Freezer horizontal 500 L · BLP-6120" },
];

/* ------------------------------------------------------------------------ */
/* Notificações                                                              */
/* ------------------------------------------------------------------------ */

export type PreferenciaNotificacao = {
  id: string;
  titulo: string;
  descricao: string;
  ativo: boolean;
};

export const preferenciasNotificacao: PreferenciaNotificacao[] = [
  {
    id: "cobranca",
    titulo: "Cobrança",
    descricao: "Faturas emitidas, vencimentos e pagamentos confirmados.",
    ativo: true,
  },
  {
    id: "manutencao",
    titulo: "Manutenção preventiva",
    descricao: "Lembrete 3 dias antes de cada visita técnica.",
    ativo: true,
  },
  {
    id: "contratos",
    titulo: "Contratos a vencer",
    descricao: "Aviso 30 dias antes do fim da vigência.",
    ativo: false,
  },
  {
    id: "iot",
    titulo: "Alertas de IoT",
    descricao: "Temperatura fora da faixa e equipamento sem sinal.",
    ativo: true,
  },
];

/* ------------------------------------------------------------------------ */
/* Indicadores                                                               */
/* ------------------------------------------------------------------------ */

export type Indicador = {
  id: string;
  rotulo: string;
  valor: string;
  /** Variação em relação ao mês anterior, em fração (0.021 = 2,1%). */
  variacao: number;
  /** Quando subir é ruim (ex.: inadimplência), a cor da variação inverte. */
  subirEhRuim?: boolean;
};

export const indicadores: Indicador[] = [
  {
    id: "inadimplencia",
    rotulo: "Inadimplência",
    valor: "3,8%",
    variacao: -0.006,
    subirEhRuim: true,
  },
  {
    id: "ativos",
    rotulo: "Equipamentos ativos",
    valor: new Intl.NumberFormat("pt-BR").format(12480),
    variacao: 0.034,
  },
  { id: "nps", rotulo: "NPS", valor: "72", variacao: 0.041 },
  {
    id: "ticket",
    rotulo: "Ticket médio",
    valor: brl.format(1148.3),
    variacao: -0.012,
  },
];

/* ------------------------------------------------------------------------ */
/* Onboarding do cliente                                                     */
/* ------------------------------------------------------------------------ */

export type EtapaOnboarding = {
  id: string;
  titulo: string;
  concluida: boolean;
};

export const etapasOnboarding: EtapaOnboarding[] = [
  { id: "cadastro", titulo: "Cadastro e análise de crédito", concluida: true },
  { id: "contrato", titulo: "Contrato assinado", concluida: true },
  { id: "entrega", titulo: "Entrega e instalação", concluida: false },
  { id: "treinamento", titulo: "Treinamento da equipe", concluida: false },
];
