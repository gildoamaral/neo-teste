'use client';

import { useState } from 'react';
import { Table, Button, Typography, Space, TablePaginationConfig } from 'antd';
import { useTickets } from '@/hooks/useTickets';
import { TicketFilters } from '@/components/domain/TicketFilters';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { TicketDetailDrawer } from '@/components/domain/TicketDetailDrawer';
import { CreateTicketModal } from '@/components/domain/CreateTicketModal';
import { getChamadosColumns } from '@/components/domain/chamadosColumns';

const { Title } = Typography;

export default function ChamadosPage() {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const status = searchParams.get('status') || undefined;
  const prioridade = searchParams.get('prioridade') || undefined;
  const area = searchParams.get('area') || undefined;
  const search = searchParams.get('search') || undefined;

  const { data, isLoading, isError, refetch, isFetching } = useTickets({
    page,
    pageSize,
    status,
    prioridade,
    area,
    search,
  });


  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'Todos' && value !== 'Todas') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== 'page') {
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams.toString());
    if (pagination.current) params.set('page', pagination.current.toString());
    if (pagination.pageSize) params.set('pageSize', pagination.pageSize.toString());
    router.push(`?${params.toString()}`);
  };

  const columns = getChamadosColumns(setSelectedTicketId);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Gestão de Chamados</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()} loading={isFetching}>
            Atualizar
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>
            Novo Chamado
          </Button>
        </Space>
      </div>

      <TicketFilters
        filters={{ status, prioridade, area, search }}
        onFilterChange={handleFilterChange}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.total || 0,
          showSizeChanger: true,
          showTotal: (total) => `Total de ${total} chamados`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
      
      <TicketDetailDrawer ticketId={selectedTicketId} onClose={() => setSelectedTicketId(null)} />
      <CreateTicketModal visible={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}