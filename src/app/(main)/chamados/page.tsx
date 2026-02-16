'use client';

import { useState, useCallback } from 'react';
import {
  Table,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Skeleton,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { useChamados, useChamadoDetalhe } from '@/hooks/useChamados';
import { StatusBadge, PriorityTag, DrawerDetail, ErrorState, EmptyState } from '@/components/domain';
import NovoChamadoModal from '@/components/domain/CreateTicketModal';
import type { ChamadoComTimeline, ChamadoFilters } from '@/types';
import { STATUS, PRIORIDADES, AREAS } from '@/types';

export default function ChamadosListView() {
  const [filters, setFilters] = useState<ChamadoFilters>({
    pagina: 1,
    porPagina: 15,
    ordenarPor: 'abertura',
    ordemDirecao: 'desc',
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useChamados(filters);
  const { data: chamadoDetalhe, isLoading: isLoadingDetalhe } = useChamadoDetalhe(selectedId);

  const handleRowClick = useCallback((record: ChamadoComTimeline) => {
    setSelectedId(record.id);
    setDrawerOpen(true);
  }, []);

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      _filters: Record<string, unknown>,
      sorter: SorterResult<ChamadoComTimeline> | SorterResult<ChamadoComTimeline>[]
    ) => {
      const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
      setFilters((prev) => ({
        ...prev,
        pagina: pagination.current ?? 1,
        porPagina: pagination.pageSize ?? 15,
        ordenarPor: singleSorter?.field === 'prioridade' ? 'prioridade' : 'abertura',
        ordemDirecao: singleSorter?.order === 'ascend' ? 'asc' : 'desc',
      }));
    },
    []
  );

  const updateFilter = useCallback(
    (key: keyof ChamadoFilters, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [key]: value, pagina: 1 }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      pagina: 1,
      porPagina: 15,
      ordenarPor: 'abertura',
      ordemDirecao: 'desc',
    });
  }, []);

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
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

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Buscar por título..."
              prefix={<SearchOutlined />}
              value={filters.busca ?? ''}
              onChange={(e) => updateFilter('busca', e.target.value || undefined)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Status"
              value={filters.status}
              onChange={(value) => updateFilter('status', value)}
              options={STATUS.map((s) => ({ label: s, value: s }))}
              allowClear
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Prioridade"
              value={filters.prioridade}
              onChange={(value) => updateFilter('prioridade', value)}
              options={PRIORIDADES.map((p) => ({ label: p, value: p }))}
              allowClear
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Área"
              value={filters.area}
              onChange={(value) => updateFilter('area', value)}
              options={AREAS.map((a) => ({ label: a, value: a }))}
              allowClear
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={3}>
            <Button icon={<ClearOutlined />} onClick={clearFilters} block>
              Limpar
            </Button>
          </Col>
          <Col xs={24} sm={12} md={3}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
              block
            >
              Novo
            </Button>
          </Col>
        </Row>
      </Card>

      {isLoading ? (
        <Card>
          <Skeleton active paragraph={{ rows: 12 }} />
        </Card>
      ) : data && data.data.length === 0 ? (
        <Card>
          <EmptyState description="Nenhum chamado encontrado com os filtros aplicados" />
        </Card>
      ) : (
        <Table
          dataSource={data?.data}
          columns={columns}
          rowKey="id"
          onChange={handleTableChange}
          pagination={{
            current: data?.pagina,
            pageSize: data?.porPagina,
            total: data?.total,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '25', '50'],
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} chamados`,
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: 'pointer' },
          })}
          scroll={{ x: 900 }}
          size="middle"
        />
      )}

      <DrawerDetail
        chamado={chamadoDetalhe}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedId(null);
        }}
        loading={isLoadingDetalhe}
      />

      <NovoChamadoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
