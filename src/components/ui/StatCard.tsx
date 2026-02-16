import React from 'react';
import { Card, Typography } from 'antd';

const { Text, Title } = Typography;

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, iconBgColor = '#fff1f0' }) => {
  return (
    <Card
      styles={{ body: { padding: '20px 24px' } }}
      style={{ height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {title}
          </Text>
          <Title level={2} style={{ margin: '8px 0 4px' }}>
            {value}
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {subtitle}
          </Text>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            backgroundColor: iconBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};
