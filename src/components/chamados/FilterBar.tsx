import { useState } from 'react';
import { Card, Row, Col, Input, Select, Button } from 'antd';
import { DeleteOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import type { FilterBarProps } from '@/types';
import { STATUS, PRIORIDADES, AREAS } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';

export function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}: Omit<FilterBarProps, 'onOpenModal'>) {
  const [showFilters, setShowFilters] = useState(false);
  const { isMobile } = useBreakpoint();

  const { searchInput, handleSearchChange, handleClearSearch } = useDebouncedSearch(
    filters.busca ?? '',
    (value) => onFilterChange('busca', value),
    1000
  );

  const handleClearAll = () => {
    handleClearSearch();
    onClearFilters();
    if (isMobile) setShowFilters(false);
  };

  const hasActiveFilters = !!(filters.status || filters.prioridade || filters.area || filters.busca);

  return (
    <Card style={{ background: "none", border: 'none', padding: 0 }}
      styles={{ body: { padding: "0 0px 10px 0px" } }}
    >
      {isMobile ? (
        <>
          <Row gutter={[8, 8]} align="middle">
            <Col flex="auto">
              <Input
                placeholder="Título, ID, Equipamento..."
                value={searchInput}
                onChange={handleSearchChange}
                prefix={<SearchOutlined style={{ color: '#bbb' }} />}
                allowClear
                onClear={handleClearSearch}
              />
            </Col>
            <Col>
              <Button
                icon={<FilterOutlined />}
                onClick={() => setShowFilters(!showFilters)}
                type={hasActiveFilters ? 'primary' : 'default'}
                ghost={hasActiveFilters}
              />
            </Col>
          </Row>

          {showFilters && (
            <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
              <Col xs={7}>
                <Select
                  placeholder="Status"
                  value={filters.status}
                  onChange={(value) => onFilterChange('status', value)}
                  options={STATUS.map((s) => ({ label: s, value: s }))}
                  allowClear
                  style={{ width: '100%' }}
                  size="middle"
                />
              </Col>
              <Col xs={7}>
                <Select
                  placeholder="Prioridade"
                  value={filters.prioridade}
                  onChange={(value) => onFilterChange('prioridade', value)}
                  options={PRIORIDADES.map((p) => ({ label: p, value: p }))}
                  allowClear
                  style={{ width: '100%' }}
                  size="middle"
                />
              </Col>
              <Col xs={7}>
                <Select
                  placeholder="Área"
                  value={filters.area}
                  onChange={(value) => onFilterChange('area', value)}
                  options={AREAS.map((a) => ({ label: a, value: a }))}
                  allowClear
                  style={{ width: '100%' }}
                  size="middle"
                />
              </Col>
              <Col xs={3}>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={handleClearAll}
                  block
                />
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row gutter={[8, 8]} align="middle">
          <Col flex="auto">
            <Input
              placeholder="Título, ID, Equipamento..."
              value={searchInput}
              onChange={handleSearchChange}
              prefix={<SearchOutlined style={{ color: '#bbb' }} />}
              allowClear
              onClear={handleClearSearch}
            />
          </Col>
          <Col>
            <Select
              placeholder="Status"
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              options={STATUS.map((s) => ({ label: s, value: s }))}
              allowClear
              style={{ width: 150 }}
            />
          </Col>
          <Col>
            <Select
              placeholder="Prioridade"
              value={filters.prioridade}
              onChange={(value) => onFilterChange('prioridade', value)}
              options={PRIORIDADES.map((p) => ({ label: p, value: p }))}
              allowClear
              style={{ width: 150 }}
            />
          </Col>
          <Col>
            <Select
              placeholder="Área"
              value={filters.area}
              onChange={(value) => onFilterChange('area', value)}
              options={AREAS.map((a) => ({ label: a, value: a }))}
              allowClear
              style={{ width: 160 }}
            />
          </Col>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              onClick={handleClearAll}
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
