import { Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ColumnsType } from 'antd/es/table';
import { Ticket } from '@/types/ticket';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityTag } from '@/components/ui/PriorityTag';

export const getChamadosColumns = (
  onViewDetails: (ticketId: number) => void
): ColumnsType<Ticket> => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    render: (id) => <span style={{ fontWeight: 'bold', color: '#888' }}>#{id}</span>,
  },
  {
    title: 'Título / Equipamento',
    dataIndex: 'titulo',
    render: (text, record) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 500 }}>{text}</span>
        <span style={{ fontSize: '12px', color: '#666' }}>{record.equipamento}</span>
      </div>
    ),
  },
  {
    title: 'Área',
    dataIndex: 'area',
    width: 140,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 140,
    render: (status) => <StatusBadge status={status} />,
  },
  {
    title: 'Prioridade',
    dataIndex: 'prioridade',
    width: 120,
    render: (p) => <PriorityTag priority={p} />,
  },
  {
    title: 'Abertura',
    dataIndex: 'abertura',
    width: 150,
    render: (date) => (
      <Tooltip title={format(new Date(date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}>
        {format(new Date(date), 'dd/MM/yyyy HH:mm')}
      </Tooltip>
    ),
  },
  {
    title: 'Ações',
    key: 'actions',
    width: 80,
    align: 'center',
    render: (_, record) => (
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => onViewDetails(record.id!)}
      />
    ),
  },
];
