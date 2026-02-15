'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Typography, Image } from 'antd';
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Define qual item do menu está ativo
  const selectedKey = pathname.includes('dashboard') ? 'dashboard' : 'chamados';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" width={250}>
        {/* Logo Area */}
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64 }}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsH7gXhm6b16YMtZPBv0MfDnDOJsi9O--DCw&s"
            alt="Neoestech"
            style={{ maxHeight: 32, maxWidth: '100%' }}
          />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => router.push(`/${key}`)}
          items={[
            {
              key: 'chamados',
              icon: <UnorderedListOutlined />,
              label: 'Chamados (Técnico)',
            },
            {
              key: 'dashboard',
              icon: <AppstoreOutlined />,
              label: 'Dashboard (Gestor)',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="bg-red-800">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Title level={5} style={{ margin: 0, marginRight: 16 }}>Olá, Marco</Title>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ec6725' }} />
          </div>
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff', borderRadius: 8 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}