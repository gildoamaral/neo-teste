import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { PriorityTag } from '@/components/chamados/PriorityTag';
import { StatusBadge } from '@/components/chamados/StatusBadge';
import type { ChamadoComTimeline } from '@/types';

export const getChamadosColumns = (): ColumnsType<ChamadoComTimeline> => [
  {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>ID</span>,
    dataIndex: 'id',
    key: 'id',
    width: 80,
    render: (value: number) =>
      <span style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-details)' }}>#{value}</span>,
  },
  {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>TÍTULO</span>,
    dataIndex: 'titulo',
    key: 'titulo',
    ellipsis: true,
  },
  {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>ÁREA</span>,
    dataIndex: 'area',
    key: 'area',
    width: 140,
    render: (value: string) => <span className='text-gray-500'>{value}</span>,
  },
  {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>PRIORIDADE</span>,
    dataIndex: 'prioridade',
    key: 'prioridade',
    width: 120,
    sorter: true,
    render: (_: unknown, record: ChamadoComTimeline) => (
      <PriorityTag prioridade={record.prioridade} />
    ),
  },
  {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>STATUS</span>,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (_: unknown, record: ChamadoComTimeline) => (
      <StatusBadge status={record.status} />
    ),
  },
    {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>RESPONSÁVEL</span>,
    dataIndex: 'responsavel',
    key: 'responsavel',
    width: 150,
    render: (value: string | null) => <span style={{ color: 'var(--text-foreground)' }}>{value ?? '—'}</span>,
  },
  {
    title: <span style={{ fontSize: 12, color: 'var(--text-foreground)' }}>ABERTURA</span>,
    dataIndex: 'abertura',
    key: 'abertura',
    width: 120,
    sorter: true,
    defaultSortOrder: 'descend' as const,
    render: (value: string) =>
      <span style={{ fontFamily: 'var(--font-details)', color: 'var(--text-foreground)' }}>{dayjs(value).format('DD/MM/YYYY')}</span>,
  },
];
