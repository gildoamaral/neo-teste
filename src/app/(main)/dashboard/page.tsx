'use client';

import { useState } from 'react';
import { Typography, Row, Col, Card, Segmented, Spin } from 'antd';
import {
  AlertOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useDashboard } from '@/hooks/useDashboard';
import { StatCard } from '@/components/ui/StatCard';

const { Title, Text } = Typography;

const PIE_COLORS = ['#cf1322', '#fa8c16', '#108ee9', '#87d068'];
const BAR_COLOR = '#ec6725';

export default function DashboardPage() {
  const [days, setDays] = useState<number>(30);
  const { data, isLoading } = useDashboard(days);

  if (isLoading || !data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Spin size="large" />
      </div>
    );
  }

  const { stats, chamadosPorPrioridade, chamadosPorArea, chamadosPorDia } = data;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Gestão de Chamados</Title>
          <Text type="secondary">Painel gerencial de indicadores</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 14 }}>
          {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </Text>
      </div>

      {/* Stat Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total de Chamados"
            value={stats.totalChamados}
            subtitle={`${stats.totalChamados} registrados`}
            icon={<FileTextOutlined style={{ color: '#cf1322' }} />}
            iconBgColor="#fff1f0"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Chamados Críticos Ativos"
            value={stats.criticosAtivos}
            subtitle="Requer atenção"
            icon={<AlertOutlined style={{ color: '#fa8c16' }} />}
            iconBgColor="#fff7e6"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Taxa de Resolução"
            value={`${stats.taxaResolucao}%`}
            subtitle="Resolvidos vs total ativo"
            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            iconBgColor="#f6ffed"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Chamados Cancelados"
            value={stats.cancelados}
            subtitle="Total cancelados"
            icon={<CloseCircleOutlined style={{ color: '#8c8c8c' }} />}
            iconBgColor="#f5f5f5"
          />
        </Col>
      </Row>

      {/* Charts Row 1: Bar + Pie */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<Text strong>Chamados por Área</Text>} styles={{ body: { padding: '16px 24px' } }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chamadosPorArea}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <RechartsTooltip />
                <Bar dataKey="value" fill={BAR_COLOR} radius={[4, 4, 0, 0]} name="Chamados" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Text strong>Distribuição por Prioridade</Text>} styles={{ body: { padding: '16px 24px' } }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chamadosPorPrioridade}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                >
                  {chamadosPorPrioridade.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 2: Line */}
      <Card
        title={<Text strong>Volume de Chamados por Dia</Text>}
        extra={
          <Segmented
            options={[
              { label: '30 dias', value: 30 },
              { label: '60 dias', value: 60 },
              { label: '90 dias', value: 90 },
            ]}
            value={days}
            onChange={(value) => setDays(value as number)}
          />
        }
        styles={{ body: { padding: '16px 24px' } }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chamadosPorDia}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => format(new Date(value), 'dd/MM')}
              interval="preserveStartEnd"
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <RechartsTooltip
              labelFormatter={(value) => format(new Date(value), "dd 'de' MMMM", { locale: ptBR })}
            />
            <Line
              type="monotone"
              dataKey="chamados"
              stroke={BAR_COLOR}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Chamados"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
