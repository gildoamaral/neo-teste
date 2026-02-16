export const AREAS = [
  "Refrigeração",
  "Energia",
  "Ar-condicionado",
  "Água",
] as const;
export const STATUS = [
  "Aberto",
  "Em andamento",
  "Resolvido",
  "Cancelado",
] as const;
export const PRIORIDADES = ["Crítica", "Alta", "Média", "Baixa"] as const;

export type StatusType = (typeof STATUS)[number];
export type AreasType = (typeof AREAS)[number];
export type PrioridadesType = (typeof PRIORIDADES)[number];

export interface Chamado {
  id: number;
  titulo: string;
  area: AreasType;
  prioridade: PrioridadesType;
  status: StatusType;
  equipamento: string;
  instalacao: string;
  abertura: string;
  ultimaAtualizacao: string;
  descricao: string;
  responsavel: string | null;
}

export interface ChamadoTimeline {
  data: string;
  descricao: string;
  usuario: string;
}

export interface ChamadoComTimeline extends Chamado {
  timeline: ChamadoTimeline[];
}

export interface ChamadoFilters {
  status?: StatusType;
  prioridade?: PrioridadesType;
  area?: AreasType;
  busca?: string;
  ordenarPor?: "abertura" | "prioridade";
  ordemDirecao?: "asc" | "desc";
  pagina: number;
  porPagina: number;
}

export interface ChamadoListResponse {
  data: ChamadoComTimeline[];
  total: number;
  pagina: number;
  porPagina: number;
  totalPaginas: number;
}

export interface EstatisticasDashboard {
  stats: {
    totalChamados: number;
    chamadosAbertos: number;
    taxaResolucao: number;
    tempoMedioResposta: number;
  };
  chamadosPorArea: { name: string; value: number }[];
  chamadosPorPrioridade: { name: string; value: number }[];
  chamadosPorDia: { date: string; chamados: number }[];
}

export type ViewMode = "tecnico" | "gestor";

export interface DrawerDetailProps {
  chamado: ChamadoComTimeline | null | undefined;
  open: boolean;
  onClose: () => void;
  loading?: boolean;
}

export interface FilterBarProps {
  filters: ChamadoFilters;
  onFilterChange: (
    key: keyof ChamadoFilters,
    value: string | undefined,
  ) => void;
  onClearFilters: () => void;
  onOpenModal: () => void;
}

export interface SiderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}