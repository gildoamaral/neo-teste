'use client';

import { Card, Space, Typography } from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { StatusBadge } from './StatusBadge';
import { PriorityTag } from './PriorityTag';
import type { ChamadoComTimeline } from '@/types';

const { Text } = Typography;

interface ChamadoCardProps {
  chamado: ChamadoComTimeline;
  onClick: (chamado: ChamadoComTimeline) => void;
}

export function ChamadoCard({ chamado, onClick }: ChamadoCardProps) {
  return (
    <Card
      size="small"
      hoverable
      onClick={() => onClick(chamado)}
      style={{ marginBottom: 8 }}
      styles={{ body: { padding: '12px 16px' } }}
    >
      {/* Top: ID + Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text
          style={{
            color: 'var(--primary-color)',
            fontFamily: 'var(--font-details)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          #{chamado.id}
        </Text>
        <Space size={4}>
          <StatusBadge status={chamado.status} />
          <PriorityTag prioridade={chamado.prioridade} />
        </Space>
      </div>

      {/* Title */}
      <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>
        {chamado.titulo}
      </Text>

      {/* Details row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          <EnvironmentOutlined style={{ marginRight: 4 }} />
          {chamado.area}
        </Text>
        {chamado.responsavel && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            <UserOutlined style={{ marginRight: 4 }} />
            {chamado.responsavel}
          </Text>
        )}
        <Text type="secondary" style={{ fontSize: 12 }}>
          <ClockCircleOutlined style={{ marginRight: 4 }} />
          {dayjs(chamado.abertura).format('DD/MM/YY HH:mm')}
        </Text>
      </div>
    </Card>
  );
}
