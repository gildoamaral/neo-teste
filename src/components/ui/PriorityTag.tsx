import React from 'react';
import { Tag } from 'antd';

const priorityColorMap: Record<string, string> = {
  'Crítica': '#cf1322', // Vermelho Escuro
  'Alta': '#fa8c16',    // Laranja
  'Média': '#108ee9',   // Azul
  'Baixa': '#87d068',   // Verde Claro
};

interface PriorityTagProps {
  priority: string;
}

export const PriorityTag: React.FC<PriorityTagProps> = ({ priority }) => {
  return (
    <Tag color={priorityColorMap[priority] || 'default'} style={{ fontWeight: 600 }}>
      {priority.toUpperCase()}
    </Tag>
  );
};