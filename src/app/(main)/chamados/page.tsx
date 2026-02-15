'use client';

import React from 'react';
import { Table, Button, Typography, Space, Tooltip } from 'antd';
import { useTickets } from '@/hooks/useTickets';
import { TicketFilters } from '@/components/domain/TicketFilters';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityTag } from '@/components/ui/PriorityTag';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ReloadOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { AreaType, PrioridadeType, StatusType, Ticket } from '@/types/ticket';

const { Title } = Typography;

export default function ChamadosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Ler Estado da URL (ou usar defaults)
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const status = searchParams.get('status') as StatusType  || undefined;
  const prioridade = searchParams.get('prioridade') as PrioridadeType || undefined;
  const area = searchParams.get('area') as AreaType || undefined;
  const search = searchParams.get('search') || undefined;

  // 2. Buscar Dados (React Query)
  const { data, isLoading, isError, refetch, isFetching } = useTickets({
    page,
    pageSize,
    status,
    prioridade,
    area,
    search,
  });


  // 3. Função para Atualizar URL (e consequentemente o filtro)
  const handleFilterChange = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'Todos' && value !== 'Todas') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Resetar para página 1 ao filtrar
    if (key !== 'page') {
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  };

  const handleTableChange = (pagination: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pagination.current.toString());
    params.set('pageSize', pagination.pageSize.toString());
    router.push(`?${params.toString()}`);
  };

  // 4. Definição das Colunas
  const columns: ColumnsType<Ticket> = [
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
          onClick={() => console.log('Abrir Drawer para:', record.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Gestão de Chamados</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()} loading={isFetching}>
            Atualizar
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => console.log('Novo chamado')}>
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
    </div>
  );
}