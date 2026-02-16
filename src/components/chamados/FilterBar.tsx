import { useState } from 'react';
import { Card, Row, Col, Input, Select, Button } from 'antd';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import type { FilterBarProps } from '@/types';
import { STATUS, PRIORIDADES, AREAS } from '@/types';

const { Search } = Input;

export function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  onOpenModal,
}: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.busca ?? '');

  const handleSearch = (value: string) => {
    onFilterChange('busca', value || undefined);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <Search
            placeholder="Título, ID, Equipamento..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
            allowClear
            onClear={() => {
              setSearchInput('');
              onFilterChange('busca', undefined);
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Status"
            value={filters.status}
            onChange={(value) => onFilterChange('status', value)}
            options={STATUS.map((s) => ({ label: s, value: s }))}
            allowClear
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Prioridade"
            value={filters.prioridade}
            onChange={(value) => onFilterChange('prioridade', value)}
            options={PRIORIDADES.map((p) => ({ label: p, value: p }))}
            allowClear
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Área"
            value={filters.area}
            onChange={(value) => onFilterChange('area', value)}
            options={AREAS.map((a) => ({ label: a, value: a }))}
            allowClear
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={3}>
          <Button
            icon={<ClearOutlined />}
            onClick={() => {
              setSearchInput('');
              onClearFilters();
            }}
            block
          >
            Limpar
          </Button>
        </Col>
        <Col xs={24} sm={12} md={3}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onOpenModal}
            block
          >
            Novo
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 5 }}>
        <Col>
          <span style={{ fontSize: 12, color: '#888' }}>
            {!filters.status && !filters.prioridade && !filters.area && !filters.busca ? (
              'Nenhum filtro ativo'
            ) : (
              <>
                Filtros usados
                {filters.status && <> | Status: <strong>{filters.status}</strong></>}
                {filters.prioridade && <> | Prioridade: <strong>{filters.prioridade}</strong></>}
                {filters.area && <> | Área: <strong>{filters.area}</strong></>}
                {filters.busca && <> | Termo: <strong>&quot;{filters.busca}&quot;</strong></>}
              </>
            )}
          </span>
        </Col>
      </Row>
    </Card>
  );
}
