import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { PriorityTag } from '@/components/chamados/PriorityTag';
import { StatusBadge } from '@/components/chamados/StatusBadge';
import type { ChamadoComTimeline } from '@/types';

export const getChamadosColumns = (): ColumnsType<ChamadoComTimeline> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    render: (value: number) =>
      <span style={{ color: '#ec6725', fontWeight: 600 }}>#{value}</span>,
  },
  {
    title: 'Título',
    dataIndex: 'titulo',
    key: 'titulo',
    ellipsis: true,
  },
  {
    title: 'Área',
    dataIndex: 'area',
    key: 'area',
    width: 140,
  },
  {
    title: 'Prioridade',
    dataIndex: 'prioridade',
    key: 'prioridade',
    width: 120,
    sorter: true,
    render: (_: unknown, record: ChamadoComTimeline) => (
      <PriorityTag prioridade={record.prioridade} />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (_: unknown, record: ChamadoComTimeline) => (
      <StatusBadge status={record.status} />
    ),
  },
  {
    title: 'Abertura',
    dataIndex: 'abertura',
    key: 'abertura',
    width: 160,
    sorter: true,
    defaultSortOrder: 'descend' as const,
    render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm'),
  },
  {
    title: 'Responsável',
    dataIndex: 'responsavel',
    key: 'responsavel',
    width: 150,
    render: (value: string | null) => value ?? '—',
  },
];
