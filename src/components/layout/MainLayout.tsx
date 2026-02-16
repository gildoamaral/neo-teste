'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';

import Sider from './Sider';
import Header from './Header';

const { Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout>
        <Header />

        <Content style={{ margin: '0 16px', padding: 5, minHeight: 280, borderRadius: 8 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}