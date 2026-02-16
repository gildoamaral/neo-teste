'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';

import Sider from './Sider';
import Header from './Header';

const { Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>

      <Sider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout style={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
        <Header />

        <Content style={{ margin: '0 16px', padding: 5, minHeight: 280, borderRadius: 8 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}