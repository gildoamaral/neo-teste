import { useState } from 'react';
import { Card, Row, Col, Input, Select, Button, Space } from 'antd';
import { ClearOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import type { FilterBarProps } from '@/types';
import { STATUS, PRIORIDADES, AREAS } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const { Search } = Input;

export function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  onOpenModal,
}: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.busca ?? '');
  const [showFilters, setShowFilters] = useState(false);
  const { isMobile } = useBreakpoint();

  const handleSearch = (value: string) => {
    onFilterChange('busca', value || undefined);
  };

  const hasActiveFilters = !!(filters.status || filters.prioridade || filters.area || filters.busca);

  return (
    <Card style={{ background: "none", border: 'none', padding: 0 }} 
      styles={{ body: { padding: "0 10px 10px 10px" } }}
    >
      <Row gutter={[8, 8]} align="middle">
        <Col flex="auto">
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
        {isMobile && (
          <Col>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setShowFilters(!showFilters)}
              type={hasActiveFilters ? 'primary' : 'default'}
              ghost={hasActiveFilters}
            />
          </Col>
        )}
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onOpenModal}
          >
            {!isMobile && 'Novo'}
          </Button>
        </Col>
      </Row>

      {/* Filter selects — always visible on desktop, toggled on mobile */}
      {(!isMobile || showFilters) && (
        <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
          <Col xs={24} sm={8} md={4}>
            <Select
              placeholder="Status"
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              options={STATUS.map((s) => ({ label: s, value: s }))}
              allowClear
              style={{ width: '100%' }}
              size={isMobile ? 'middle' : undefined}
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              placeholder="Prioridade"
              value={filters.prioridade}
              onChange={(value) => onFilterChange('prioridade', value)}
              options={PRIORIDADES.map((p) => ({ label: p, value: p }))}
              allowClear
              style={{ width: '100%' }}
              size={isMobile ? 'middle' : undefined}
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              placeholder="Área"
              value={filters.area}
              onChange={(value) => onFilterChange('area', value)}
              options={AREAS.map((a) => ({ label: a, value: a }))}
              allowClear
              style={{ width: '100%' }}
              size={isMobile ? 'middle' : undefined}
            />
          </Col>
          <Col xs={24} sm={8} md={3}>
            <Button
              icon={<ClearOutlined />}
              onClick={() => {
                setSearchInput('');
                onClearFilters();
                if (isMobile) setShowFilters(false);
              }}
              block
            >
              Limpar
            </Button>
          </Col>
        </Row>
      )}

      <Row style={{ marginTop: 5 }}>
        <Col>
          <span style={{ fontSize: 12, color: '#888', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            {!hasActiveFilters ? (
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
