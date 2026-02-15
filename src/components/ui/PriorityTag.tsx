import React from 'react';
import { Tag } from 'antd';
import { PrioridadeType } from '@/types/ticket';

const priorityColorMap: Record<PrioridadeType, string> = {
  'Crítica': '#cf1322', // Vermelho Escuro
  'Alta': '#fa8c16',    // Laranja
  'Média': '#108ee9',   // Azul
  'Baixa': '#87d068',   // Verde Claro
};

interface PriorityTagProps {
  priority: PrioridadeType;
}

export const PriorityTag: React.FC<PriorityTagProps> = ({ priority }) => {
  return (
    <Tag color={priorityColorMap[priority] || 'default'} style={{ fontWeight: 600 }}>
      {priority.toUpperCase()}
    </Tag>
  );
};