'use client';

import { useState, useCallback } from 'react';
import {
  Table,
  Card,
  Skeleton,
} from 'antd';
import type { TablePaginationConfig } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useChamados, useChamadoDetalhe } from '@/hooks/useChamados';
import { DrawerDetail, ErrorState, EmptyState, FilterBar } from '@/components/chamados';
import { getChamadosColumns } from './chamadosColumns';
import NovoChamadoModal from '@/components/chamados/CreateTicketModal';
import type { ChamadoComTimeline, ChamadoFilters } from '@/types';

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

  const columns = getChamadosColumns();

  return (
    <>
      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        onOpenModal={() => setModalOpen(true)}
      />

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
            showTitle: false,
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
