import React from 'react';
import { Badge } from 'antd';
import { STATUS, StatusType } from '@/types/ticket';

const statusColorMap: Record<StatusType, "success" | "processing" | "default" | "error" | "warning"> = {
  'Aberto': 'error',       // Vermelho
  'Em andamento': 'processing', // Azul
  'Resolvido': 'success',  // Verde 
  'Cancelado': 'default',  // Cinza 
};

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Fallback seguro caso venha um status desconhecido
  const statusKey = STATUS.includes(status) ? status : 'Aberto';
  
  return (
    <Badge 
      status={statusColorMap[statusKey]} 
      text={status} 
    />
  );
};