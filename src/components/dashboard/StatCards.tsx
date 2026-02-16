import { Row, Col } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { StatCard } from '@/components/ui';

interface StatCardsProps {
  stats: {
    totalChamados: number;
    chamadosAbertos: number;
    taxaResolucao: number;
    tempoMedioResposta: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
      <Col xs={12} sm={12} lg={6}>
        <StatCard
          title="Total de Chamados"
          value={stats.totalChamados}
          subtitle={`${stats.totalChamados} registrados`}
          icon={<FileTextOutlined style={{ color: '#1890ff' }} />}
          iconBgColor="#e6f7ff"
        />
      </Col>
      <Col xs={12} sm={12} lg={6}>
        <StatCard
          title="Chamados Abertos"
          value={stats.chamadosAbertos}
          subtitle="Aguardando atendimento"
          icon={<FileOutlined style={{ color: '#fa8c16' }} />}
          iconBgColor="#fff7e6"
        />
      </Col>
      <Col xs={12} sm={12} lg={6}>
        <StatCard
          title="Taxa de Resolução"
          value={`${stats.taxaResolucao}%`}
          subtitle="Resolvidos vs total ativo"
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          iconBgColor="#f6ffed"
        />
      </Col>
      <Col xs={12} sm={12} lg={6}>
        <StatCard
          title="Tempo Médio de Resposta"
          value={`${stats.tempoMedioResposta}h`}
          subtitle="Média de tempo em aberto"
          icon={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
          iconBgColor="#f9f0ff"
        />
      </Col>
    </Row>
  );
}
