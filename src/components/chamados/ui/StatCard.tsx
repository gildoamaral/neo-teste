import React from 'react';
import { Card, Typography } from 'antd';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const { Text, Title } = Typography;

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, iconBgColor = '#fff1f0' }) => {
  const { isMobile } = useBreakpoint();

  return (
    <Card
      styles={{ body: { padding: isMobile ? '12px' : '20px 24px' } }}
      style={{ height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text type="secondary" style={{ fontSize: isMobile ? 10 : 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {title}
          </Text>
          <Title level={isMobile ? 4 : 2} style={{ margin: '4px 0 2px' }}>
            {value}
          </Title>
          {!isMobile && (
            <Text type="secondary" style={{ fontSize: 13 }}>
              {subtitle}
            </Text>
          )}
        </div>
        {!isMobile && (
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
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
