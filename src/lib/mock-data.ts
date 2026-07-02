// Dados de exemplo (mock) — protótipo navegável do Sistema de Credenciamento HUM.
// Nenhuma persistência real: serve para demonstrar fluxos e telas.

export type ContratoStatus =
  | "Pendente"
  | "Em análise"
  | "Aguardando assinatura"
  | "Ativo"
  | "Encerrado"
  | "Suspenso";

export type EntrevistaResultado = "Agendada" | "Aprovado" | "Recusado";

export type ModeloContrato = "Biomédico" | "Médico" | "Radiologista" | "Demais categorias";

export interface Edital {
  id: string;
  numero: string;
  processo: string;
  funcao: string;
  area: string;
  setor: string;
  vigente: boolean;
  publicadoEm: string;
  encerraEm: string;
}

export interface Credenciado {
  id: string;
  nome: string;
  cpfCnpj: string;
  funcao: string;
  area: ModeloContrato;
  edital: string;
  email: string;
}

export interface Entrevista {
  id: string;
  candidato: string;
  funcao: string;
  edital: string;
  data: string; // ISO date
  horario: string;
  responsavel: string;
  resultado: EntrevistaResultado;
  observacoes?: string;
}

export interface Contrato {
  id: string;
  numero: string;
  credenciado: string;
  cpfCnpj: string;
  modelo: ModeloContrato;
  setor: string;
  status: ContratoStatus;
  inicio: string; // ISO
  termino: string; // ISO
}

export interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  data: string; // ISO datetime
  tipo: "contrato" | "entrevista" | "assinatura" | "alerta";
  lida: boolean;
}

export const MODELOS_CONTRATO: ModeloContrato[] = [
  "Biomédico",
  "Médico",
  "Radiologista",
  "Demais categorias",
];

export const CONTRATO_STATUS: ContratoStatus[] = [
  "Pendente",
  "Em análise",
  "Aguardando assinatura",
  "Ativo",
  "Encerrado",
  "Suspenso",
];

export const editais: Edital[] = [
  {
    id: "ed-1",
    numero: "001/2026",
    processo: "23076.001234/2026-10",
    funcao: "Médico Plantonista — Clínica Médica",
    area: "Médico",
    setor: "Pronto Atendimento",
    vigente: true,
    publicadoEm: "2026-06-02",
    encerraEm: "2026-07-30",
  },
  {
    id: "ed-2",
    numero: "002/2026",
    processo: "23076.001789/2026-55",
    funcao: "Biomédico — Análises Clínicas",
    area: "Biomédico",
    setor: "Laboratório",
    vigente: true,
    publicadoEm: "2026-06-10",
    encerraEm: "2026-08-12",
  },
  {
    id: "ed-3",
    numero: "003/2026",
    processo: "23076.002001/2026-31",
    funcao: "Médico Radiologista",
    area: "Radiologista",
    setor: "Diagnóstico por Imagem",
    vigente: true,
    publicadoEm: "2026-06-18",
    encerraEm: "2026-08-20",
  },
  {
    id: "ed-4",
    numero: "012/2025",
    processo: "23076.009912/2025-88",
    funcao: "Enfermeiro — UTI Adulto",
    area: "Demais categorias",
    setor: "Unidade de Terapia Intensiva",
    vigente: false,
    publicadoEm: "2025-11-05",
    encerraEm: "2025-12-20",
  },
  {
    id: "ed-5",
    numero: "009/2025",
    processo: "23076.008431/2025-12",
    funcao: "Fisioterapeuta Hospitalar",
    area: "Demais categorias",
    setor: "Reabilitação",
    vigente: false,
    publicadoEm: "2025-09-01",
    encerraEm: "2025-10-15",
  },
];

export const credenciados: Credenciado[] = [
  {
    id: "cr-1",
    nome: "Dra. Helena Martins Costa",
    cpfCnpj: "482.119.330-77",
    funcao: "Médica Plantonista",
    area: "Médico",
    edital: "001/2026",
    email: "helena.costa@exemplo.com",
  },
  {
    id: "cr-2",
    nome: "Rafael Andrade Lima",
    cpfCnpj: "318.652.901-04",
    funcao: "Biomédico",
    area: "Biomédico",
    edital: "002/2026",
    email: "rafael.lima@exemplo.com",
  },
  {
    id: "cr-3",
    nome: "Dr. Paulo Tanaka",
    cpfCnpj: "201.774.558-90",
    funcao: "Médico Radiologista",
    area: "Radiologista",
    edital: "003/2026",
    email: "paulo.tanaka@exemplo.com",
  },
  {
    id: "cr-4",
    nome: "Juliana Ferreira Souza",
    cpfCnpj: "655.412.789-22",
    funcao: "Enfermeira",
    area: "Demais categorias",
    edital: "012/2025",
    email: "juliana.souza@exemplo.com",
  },
];

export const entrevistas: Entrevista[] = [
  {
    id: "en-1",
    candidato: "Dra. Helena Martins Costa",
    funcao: "Médica Plantonista",
    edital: "001/2026",
    data: "2026-07-08",
    horario: "09:30",
    responsavel: "Coord. Marcos Vinícius",
    resultado: "Agendada",
  },
  {
    id: "en-2",
    candidato: "Rafael Andrade Lima",
    funcao: "Biomédico",
    edital: "002/2026",
    data: "2026-07-09",
    horario: "14:00",
    responsavel: "Coord. Ana Beatriz",
    resultado: "Aprovado",
    observacoes: "Excelente experiência em análises clínicas. Apto para credenciamento.",
  },
  {
    id: "en-3",
    candidato: "Dr. Paulo Tanaka",
    funcao: "Médico Radiologista",
    edital: "003/2026",
    data: "2026-07-10",
    horario: "10:15",
    responsavel: "Coord. Marcos Vinícius",
    resultado: "Agendada",
  },
  {
    id: "en-4",
    candidato: "Carlos Eduardo Pires",
    funcao: "Médico Clínico",
    edital: "001/2026",
    data: "2026-06-28",
    horario: "11:00",
    responsavel: "Coord. Ana Beatriz",
    resultado: "Recusado",
    observacoes: "Documentação profissional incompleta no momento da entrevista.",
  },
];

export const contratos: Contrato[] = [
  {
    id: "ct-1",
    numero: "CT-2026-0001",
    credenciado: "Dra. Helena Martins Costa",
    cpfCnpj: "482.119.330-77",
    modelo: "Médico",
    setor: "Pronto Atendimento",
    status: "Ativo",
    inicio: "2026-03-01",
    termino: "2027-03-01",
  },
  {
    id: "ct-2",
    numero: "CT-2026-0002",
    credenciado: "Rafael Andrade Lima",
    cpfCnpj: "318.652.901-04",
    modelo: "Biomédico",
    setor: "Laboratório",
    status: "Aguardando assinatura",
    inicio: "2026-07-01",
    termino: "2027-07-01",
  },
  {
    id: "ct-3",
    numero: "CT-2026-0003",
    credenciado: "Dr. Paulo Tanaka",
    cpfCnpj: "201.774.558-90",
    modelo: "Radiologista",
    setor: "Diagnóstico por Imagem",
    status: "Em análise",
    inicio: "2026-07-15",
    termino: "2027-07-15",
  },
  {
    id: "ct-4",
    numero: "CT-2025-0044",
    credenciado: "Juliana Ferreira Souza",
    cpfCnpj: "655.412.789-22",
    modelo: "Demais categorias",
    setor: "Unidade de Terapia Intensiva",
    status: "Ativo",
    inicio: "2025-08-01",
    termino: "2026-07-25",
  },
  {
    id: "ct-5",
    numero: "CT-2025-0031",
    credenciado: "André Lopes Vidal",
    cpfCnpj: "770.221.118-49",
    modelo: "Médico",
    setor: "Cardiologia",
    status: "Ativo",
    inicio: "2025-07-10",
    termino: "2026-07-10",
  },
  {
    id: "ct-6",
    numero: "CT-2024-0098",
    credenciado: "Marina Quintela Reis",
    cpfCnpj: "904.336.221-07",
    modelo: "Demais categorias",
    setor: "Reabilitação",
    status: "Encerrado",
    inicio: "2024-06-01",
    termino: "2025-06-01",
  },
  {
    id: "ct-7",
    numero: "CT-2026-0007",
    credenciado: "Tiago Bernardes Alves",
    cpfCnpj: "112.998.443-60",
    modelo: "Médico",
    setor: "Pediatria",
    status: "Pendente",
    inicio: "2026-08-01",
    termino: "2027-08-01",
  },
];

export const notificacoes: Notificacao[] = [
  {
    id: "nt-1",
    titulo: "Contrato próximo do vencimento",
    descricao: "CT-2026-0004 (Juliana Ferreira Souza) vence em 25 dias.",
    data: "2026-06-30T08:15:00",
    tipo: "alerta",
    lida: false,
  },
  {
    id: "nt-2",
    titulo: "Convocação para entrevista",
    descricao: "Entrevista de Dr. Paulo Tanaka agendada para 10/07 às 10:15.",
    data: "2026-06-29T16:40:00",
    tipo: "entrevista",
    lida: false,
  },
  {
    id: "nt-3",
    titulo: "Contrato gerado",
    descricao: "CT-2026-0002 foi gerado e aguarda assinatura.",
    data: "2026-06-28T11:05:00",
    tipo: "contrato",
    lida: true,
  },
  {
    id: "nt-4",
    titulo: "Assinatura confirmada",
    descricao: "Dra. Helena Martins Costa assinou o contrato CT-2026-0001.",
    data: "2026-06-26T09:20:00",
    tipo: "assinatura",
    lida: true,
  },
];

// ---------- Helpers ----------

export function diasParaVencer(termino: string): number {
  const hoje = new Date("2026-06-30");
  const fim = new Date(termino);
  return Math.round((fim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatarData(iso: string): string {
  const [y, m, d] = iso.split("T")[0].split("-");
  return `${d}/${m}/${y}`;
}

export function formatarDataHora(iso: string): string {
  const [date, time] = iso.split("T");
  return `${formatarData(date)} ${time?.slice(0, 5) ?? ""}`.trim();
}

// ============================================================
// Extensões para as telas administrativas do protótipo
// ============================================================

export type Situacao = "Ativo" | "Inativo" | "Pendente" | "Concluído" | "Cancelado";

// ---------- Dashboard ----------

export interface DashboardKpi {
  label: string;
  value: number;
  icon: "credenciados" | "ativos" | "pendencias" | "entrevistas" | "alertas";
}

export const dashboardKpis: DashboardKpi[] = [
  { label: "Credenciados", value: 90, icon: "credenciados" },
  { label: "Contratos ativos", value: 87, icon: "ativos" },
  { label: "Pendências", value: 5, icon: "pendencias" },
  { label: "Entrevistas", value: 7, icon: "entrevistas" },
  { label: "Alertas", value: 3, icon: "alertas" },
];

export interface AreaDistribuicao {
  area: string;
  total: number;
}

export const credenciadosPorArea: AreaDistribuicao[] = [
  { area: "Médico", total: 38 },
  { area: "Biomédico", total: 21 },
  { area: "Radiologista", total: 14 },
  { area: "Demais categorias", total: 17 },
];

export interface Alerta {
  id: string;
  titulo: string;
  descricao: string;
  severidade: "alta" | "media" | "baixa";
}

export const alertas: Alerta[] = [
  {
    id: "al-1",
    titulo: "Contrato vencido",
    descricao: "CT-2024-0098 (Marina Quintela Reis) está vencido há 3 dias.",
    severidade: "alta",
  },
  {
    id: "al-2",
    titulo: "Contrato próximo do vencimento",
    descricao: "CT-2025-0044 (Juliana Ferreira Souza) vence em 25 dias.",
    severidade: "media",
  },
  {
    id: "al-3",
    titulo: "Assinatura pendente",
    descricao: "CT-2026-0002 (Rafael Andrade Lima) aguarda assinatura.",
    severidade: "media",
  },
  {
    id: "al-4",
    titulo: "Documentação regularizada",
    descricao: "Dra. Helena Martins Costa entregou toda a documentação.",
    severidade: "baixa",
  },
];

// ---------- Cadastro de Funções ----------

export interface Funcao {
  id: string;
  codigo: string;
  nome: string;
  area: ModeloContrato;
  situacao: "Ativo" | "Inativo";
}

export const funcoes: Funcao[] = [
  { id: "fn-1", codigo: "F-001", nome: "Médico Plantonista", area: "Médico", situacao: "Ativo" },
  { id: "fn-2", codigo: "F-002", nome: "Médico Radiologista", area: "Radiologista", situacao: "Ativo" },
  { id: "fn-3", codigo: "F-003", nome: "Biomédico", area: "Biomédico", situacao: "Ativo" },
  { id: "fn-4", codigo: "F-004", nome: "Enfermeiro", area: "Demais categorias", situacao: "Ativo" },
  { id: "fn-5", codigo: "F-005", nome: "Fisioterapeuta", area: "Demais categorias", situacao: "Ativo" },
  { id: "fn-6", codigo: "F-006", nome: "Técnico de Radiologia", area: "Radiologista", situacao: "Inativo" },
];

// ---------- Convocações ----------

export interface Convocacao {
  id: string;
  edital: string;
  candidato: string;
  funcao: string;
  dataConvocacao: string;
  prazoResposta: string;
  situacao: "Pendente" | "Confirmada" | "Recusada";
}

export const convocacoes: Convocacao[] = [
  { id: "cv-1", edital: "001/2026", candidato: "Dra. Helena Martins Costa", funcao: "Médica Plantonista", dataConvocacao: "2026-06-25", prazoResposta: "2026-07-05", situacao: "Confirmada" },
  { id: "cv-2", edital: "002/2026", candidato: "Rafael Andrade Lima", funcao: "Biomédico", dataConvocacao: "2026-06-26", prazoResposta: "2026-07-06", situacao: "Pendente" },
  { id: "cv-3", edital: "003/2026", candidato: "Dr. Paulo Tanaka", funcao: "Médico Radiologista", dataConvocacao: "2026-06-27", prazoResposta: "2026-07-07", situacao: "Pendente" },
  { id: "cv-4", edital: "001/2026", candidato: "Carlos Eduardo Pires", funcao: "Médico Clínico", dataConvocacao: "2026-06-20", prazoResposta: "2026-06-30", situacao: "Recusada" },
];

// ---------- Situações (parametrização) ----------

export interface SituacaoCadastro {
  id: string;
  codigo: string;
  nome: string;
  categoria: "Credenciamento" | "Contrato" | "Trâmite";
  ativo: boolean;
}

export const situacoes: SituacaoCadastro[] = [
  { id: "st-1", codigo: "S-01", nome: "Aguardando análise", categoria: "Credenciamento", ativo: true },
  { id: "st-2", codigo: "S-02", nome: "Documentação pendente", categoria: "Credenciamento", ativo: true },
  { id: "st-3", codigo: "S-03", nome: "Apto para entrevista", categoria: "Credenciamento", ativo: true },
  { id: "st-4", codigo: "S-04", nome: "Contrato ativo", categoria: "Contrato", ativo: true },
  { id: "st-5", codigo: "S-05", nome: "Contrato encerrado", categoria: "Contrato", ativo: true },
  { id: "st-6", codigo: "S-06", nome: "Em tramitação", categoria: "Trâmite", ativo: false },
];

// ---------- Sorteio ----------

export interface Sorteio {
  id: string;
  edital: string;
  funcao: string;
  dataSorteio: string;
  inscritos: number;
  vagas: number;
  situacao: "Agendado" | "Realizado";
}

export const sorteios: Sorteio[] = [
  { id: "so-1", edital: "001/2026", funcao: "Médico Plantonista", dataSorteio: "2026-07-12", inscritos: 24, vagas: 4, situacao: "Agendado" },
  { id: "so-2", edital: "002/2026", funcao: "Biomédico", dataSorteio: "2026-07-15", inscritos: 12, vagas: 2, situacao: "Agendado" },
  { id: "so-3", edital: "003/2026", funcao: "Médico Radiologista", dataSorteio: "2026-06-28", inscritos: 9, vagas: 3, situacao: "Realizado" },
  { id: "so-4", edital: "012/2025", funcao: "Enfermeiro", dataSorteio: "2025-12-01", inscritos: 31, vagas: 6, situacao: "Realizado" },
];

// ---------- Trâmites ----------

export interface Tramite {
  id: string;
  protocolo: string;
  credenciado: string;
  tipo: "Credenciamento" | "Renovação" | "Recurso";
  etapa: string;
  responsavel: string;
  data: string;
  situacao: "Em andamento" | "Concluído" | "Pendente";
}

export const tramites: Tramite[] = [
  { id: "tr-1", protocolo: "TR-2026-0101", credenciado: "Dra. Helena Martins Costa", tipo: "Credenciamento", etapa: "Análise documental", responsavel: "Ana Beatriz", data: "2026-06-24", situacao: "Concluído" },
  { id: "tr-2", protocolo: "TR-2026-0102", credenciado: "Rafael Andrade Lima", tipo: "Credenciamento", etapa: "Entrevista", responsavel: "Marcos Vinícius", data: "2026-06-26", situacao: "Em andamento" },
  { id: "tr-3", protocolo: "TR-2026-0103", credenciado: "Dr. Paulo Tanaka", tipo: "Renovação", etapa: "Geração de contrato", responsavel: "Ana Beatriz", data: "2026-06-27", situacao: "Pendente" },
  { id: "tr-4", protocolo: "TR-2026-0104", credenciado: "Juliana Ferreira Souza", tipo: "Recurso", etapa: "Parecer jurídico", responsavel: "Marcos Vinícius", data: "2026-06-22", situacao: "Em andamento" },
];

// ---------- Cadastro (solicitações de credenciamento) ----------

export interface CadastroSolicitacao {
  id: string;
  protocolo: string;
  nome: string;
  cpf: string;
  funcao: string;
  edital: string;
  data: string;
  situacao: "Aguardando análise" | "Documentação pendente" | "Apto para entrevista";
}

export const cadastros: CadastroSolicitacao[] = [
  { id: "ca-1", protocolo: "SC-2026-0210", nome: "Fernanda Alves Rocha", cpf: "129.887.554-01", funcao: "Médica Plantonista", edital: "001/2026", data: "2026-06-28", situacao: "Aguardando análise" },
  { id: "ca-2", protocolo: "SC-2026-0211", nome: "Bruno Cardoso Melo", cpf: "356.221.908-33", funcao: "Biomédico", edital: "002/2026", data: "2026-06-27", situacao: "Documentação pendente" },
  { id: "ca-3", protocolo: "SC-2026-0212", nome: "Larissa Nunes Pereira", cpf: "774.109.665-88", funcao: "Médica Radiologista", edital: "003/2026", data: "2026-06-26", situacao: "Apto para entrevista" },
  { id: "ca-4", protocolo: "SC-2026-0213", nome: "Otávio Ramos Dias", cpf: "220.556.331-19", funcao: "Enfermeiro", edital: "001/2026", data: "2026-06-25", situacao: "Aguardando análise" },
];

