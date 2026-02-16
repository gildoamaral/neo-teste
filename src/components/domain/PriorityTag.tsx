'use client';

import { Tag } from 'antd';
import type { PrioridadesType } from '@/types';

const PRIORIDADE_COLORS: Record<PrioridadesType, string> = {
  'Crítica': '#cf1322',
  'Alta': '#d46b08',
  'Média': '#d4b106',
  'Baixa': '#389e0d',
};

interface PriorityTagProps {
  prioridade: PrioridadesType;
}

export function PriorityTag({ prioridade }: PriorityTagProps) {
  return (
    <Tag
      color={PRIORIDADE_COLORS[prioridade]}
      style={{ fontWeight: prioridade === 'Crítica' ? 700 : 500 }}
    >
      {prioridade === 'Crítica' ? '⚠ ' : ''}
      {prioridade}
    </Tag>
  );
}
