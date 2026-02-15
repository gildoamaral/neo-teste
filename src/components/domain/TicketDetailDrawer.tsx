import React from 'react';
import { Drawer, Descriptions, Timeline, Spin, Tag, Typography } from 'antd';
import { useTicketDetails } from '@/hooks/useTickets';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityTag } from '@/components/ui/PriorityTag';
import { format } from 'date-fns';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TicketDetailDrawerProps {
  ticketId: number | null;
  onClose: () => void;
}

export const TicketDetailDrawer: React.FC<TicketDetailDrawerProps> = ({ ticketId, onClose }) => {
  const { data: ticket, isLoading } = useTicketDetails(ticketId);

  return (
    <Drawer
      title={ticket ? `Chamado #${ticket.id}` : 'Detalhes do Chamado'}
      placement="right"
      onClose={onClose}
      open={!!ticketId}
      width={600}
    >
      {isLoading || !ticket ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Descriptions title="Informações Gerais" bordered column={1} labelStyle={{ width: '160px' }}>
            <Descriptions.Item label="Título">{ticket.titulo}</Descriptions.Item>
            <Descriptions.Item label="Equipamento">{ticket.equipamento}</Descriptions.Item>
            <Descriptions.Item label="Instalação">{ticket.instalacao}</Descriptions.Item>
            <Descriptions.Item label="Área">{ticket.area}</Descriptions.Item>
            <Descriptions.Item label="Prioridade">
              <PriorityTag priority={ticket.prioridade} />
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <StatusBadge status={ticket.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Responsável">
              {ticket.responsavel || <Text type="secondary">Não atribuído</Text>}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 24 }}>
            <h3>Descrição</h3>
            <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 6 }}>
              <Text>{ticket.descricao}</Text>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <h3>Linha do Tempo</h3>
            <Timeline
              mode="left"
              items={[
                {
                  label: format(new Date(ticket.ultimaAtualizacao), 'dd/MM/yyyy HH:mm'),
                  children: 'Última atualização registrada no sistema',
                  color: 'blue',
                },
                {
                  dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                  label: format(new Date(ticket.abertura), 'dd/MM/yyyy HH:mm'),
                  children: 'Chamado aberto automaticamente pelo monitoramento',
                  color: 'green',
                },
              ]}
            />
          </div>
        </>
      )}
    </Drawer>
  );
};