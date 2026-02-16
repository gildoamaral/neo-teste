'use client';

import { Tag } from 'antd';
import type { StatusType } from '@/types';

const STATUS_COLORS: Record<StatusType, string> = {
  'Aberto': 'orange',
  'Em andamento': 'blue',
  'Resolvido': 'green',
  'Cancelado': 'default',
};

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Tag color={STATUS_COLORS[status]}>{status}</Tag>;
}
