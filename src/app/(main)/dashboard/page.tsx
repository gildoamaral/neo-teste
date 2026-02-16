'use client';

import { useMemo, useState } from 'react';
import { Row, Col, Card, Skeleton } from 'antd';
import { useEstatisticas } from '@/hooks/useChamados';
import {
  DashboardHeader,
  StatCards,
  ChamadosPorAreaChart,
  DistribuicaoPrioridadeChart,
  VolumeChamadosDiaChart,
} from '@/components/dashboard';

export default function DashboardPage() {
  const { data, isLoading } = useEstatisticas();
  const [days, setDays] = useState(30);

  const chamadosPorDiaFiltrado = useMemo(() => {
    if (!data) return [];
    return data.chamadosPorDia.slice(-days);
  }, [data, days]);

  if (isLoading || !data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DashboardHeader />
        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4].map((i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <Card>
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  const { stats, chamadosPorPrioridade, chamadosPorArea } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DashboardHeader />
      <StatCards stats={stats} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <ChamadosPorAreaChart data={chamadosPorArea} />
        </Col>
        <Col xs={24} md={12}>
          <DistribuicaoPrioridadeChart data={chamadosPorPrioridade} />
        </Col>
      </Row>
      <VolumeChamadosDiaChart
        data={chamadosPorDiaFiltrado}
        days={days}
        onDaysChange={setDays}
      />
    </div>
  );
}
