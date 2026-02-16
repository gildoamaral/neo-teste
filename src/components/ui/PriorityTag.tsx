'use client';

import { Tag } from 'antd';
import type { PrioridadesType } from '@/types';

const PRIORIDADE_COLORS: Record<PrioridadesType, string> = {
  'Crítica': '#DC2828',
  'Alta': '#d46b08',
  'Média': 'blue',
  'Baixa': 'green',
};

interface PriorityTagProps {
  prioridade: PrioridadesType;
}

export function PriorityTag({ prioridade }: PriorityTagProps) {
  return (
    <Tag
      color={PRIORIDADE_COLORS[prioridade]}
      style={{ fontWeight: prioridade === 'Crítica' ? 500 : 500, borderRadius: 15, padding: '0 8px', fontSize: 12 }}
    >
      {prioridade === 'Crítica' ? '⚠ ' : ''}
      {prioridade}
    </Tag>
  );
}
