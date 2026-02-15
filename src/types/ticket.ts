import { z } from 'zod';

export const AREAS = ['Refrigeração', 'Energia', 'Ar-condicionado', 'Água'] as const;
export const STATUS = ['Aberto', 'Em andamento', 'Resolvido', 'Cancelado'] as const;
export const PRIORIDADES = ['Crítica', 'Alta', 'Média', 'Baixa'] as const;

export type AreaType = typeof AREAS[number];
export type StatusType = typeof STATUS[number];
export type PrioridadeType = typeof PRIORIDADES[number];

export const ticketSchema = z.object({
  id: z.number().optional(), // ID gerado pelo backend
  titulo: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  area: z.enum(AREAS, { error: () => ({ message: 'Selecione uma área válida' }) }),
  prioridade: z.enum(PRIORIDADES),
  status: z.enum(STATUS).default('Aberto'),
  equipamento: z.string().min(3, 'Nome do equipamento é obrigatório'),
  instalacao: z.string().min(3, 'Local da instalação é obrigatório'),
  descricao: z.string().min(10, 'Descrição deve ser detalhada'),
  responsavel: z.string().nullable().optional(),
  abertura: z.string(),
  ultimaAtualizacao: z.string(), 
});

export type Ticket = z.infer<typeof ticketSchema>;

export interface TicketFilters {
  page: number;
  pageSize: number;
  status?: StatusType;
  prioridade?: PrioridadeType;
  area?: AreaType;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}