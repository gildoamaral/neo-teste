import { z } from 'zod';
import { AREAS, PRIORIDADES } from '@/types';

export const novoChamadoSchema = z.object({
  titulo: z
    .string()
    .min(5, 'O título deve ter pelo menos 5 caracteres')
    .max(120, 'O título deve ter no máximo 120 caracteres'),
  area: z.enum(AREAS, {
    error: 'Selecione uma área',
  }),
  prioridade: z.enum(PRIORIDADES, {
    error: 'Selecione uma prioridade',
  }),
  descricao: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres'),
  equipamento: z
    .string()
    .min(3, 'O equipamento deve ter pelo menos 3 caracteres')
    .max(100, 'O equipamento deve ter no máximo 100 caracteres'),
  instalacao: z
    .string()
    .min(3, 'A instalação deve ter pelo menos 3 caracteres')
    .max(100, 'A instalação deve ter no máximo 100 caracteres'),
  responsavel: z.string().nullable().optional(),
});

export type NovoChamadoForm = z.infer<typeof novoChamadoSchema>;