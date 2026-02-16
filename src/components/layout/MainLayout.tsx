'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';
import Sider from './Sider';
import AppHeader from './Header';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const { Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>

      <Sider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      <Layout style={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
        <AppHeader
          isMobile={isMobile}
          onMenuClick={() => setDrawerOpen(true)}
        />

        <Content style={{ margin: '0 16px', padding: 5, minHeight: 280, borderRadius: 8 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}