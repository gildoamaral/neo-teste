import React from 'react';
import { Input, Select, Space, Card, Row, Col } from 'antd';
import { AREAS, STATUS, PRIORIDADES, StatusType, PrioridadeType, AreaType } from '@/types/ticket';
import { SearchOutlined } from '@ant-design/icons';

interface TicketFiltersProps {
  filters: {
    status?: StatusType;
    prioridade?: PrioridadeType;
    area?: AreaType;
    search?: string;
  };
  onFilterChange: (key: string, value: any) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Card styles={{ body: { padding: '16px' } }} style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]} align="middle">
        {/* Busca Textual */}
        <Col xs={24} md={8}>
          <Input 
            placeholder="Buscar por título ou ID..." 
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            allowClear
            defaultValue={filters.search}
            // Usamos onPressEnter ou onBlur para evitar reload a cada letra digitada
            onPressEnter={(e) => onFilterChange('search', e.currentTarget.value)}
            onBlur={(e) => onFilterChange('search', e.currentTarget.value)}
          />
        </Col>

        {/* Filtro de Status */}
        <Col xs={12} md={5}>
          <Select
            style={{ width: '100%' }}
            placeholder="Status"
            allowClear
            value={filters.status}
            onChange={(val) => onFilterChange('status', val)}
            options={[
              { label: 'Todos os Status', value: 'Todos' },
              ...STATUS.map(s => ({ label: s, value: s }))
            ]}
          />
        </Col>

        {/* Filtro de Área */}
        <Col xs={12} md={5}>
          <Select
            style={{ width: '100%' }}
            placeholder="Área"
            allowClear
            value={filters.area}
            onChange={(val) => onFilterChange('area', val)}
            options={[
              { label: 'Todas as Áreas', value: 'Todas' },
              ...AREAS.map(a => ({ label: a, value: a }))
            ]}
          />
        </Col>

        {/* Filtro de Prioridade */}
        <Col xs={12} md={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Prioridade"
            allowClear
            value={filters.prioridade}
            onChange={(val) => onFilterChange('prioridade', val)}
            options={[
              { label: 'Todas as Prioridades', value: 'Todas' },
              ...PRIORIDADES.map(p => ({ label: p, value: p }))
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
};