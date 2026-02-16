'use client';

import React, { useState } from 'react';
import { Layout, Avatar, Typography } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import Sider from './Sider';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'tech' | 'manager'>('tech');

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider
        viewMode={viewMode}
        setViewMode={setViewMode}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Title level={5} style={{ margin: 0, marginRight: 16 }}>Olá, Marco</Title>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ec6725' }} />
          </div>
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#F9FAFB', borderRadius: 8 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}