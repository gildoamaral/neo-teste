'use client';

import { Empty } from 'antd';

interface EmptyStateProps {
  description?: string;
}

export function EmptyState({ description }: EmptyStateProps) {
  return (
    <Empty
      description={description ?? 'Nenhum chamado encontrado'}
      style={{ padding: '60px 0' }}
    />
  );
}
