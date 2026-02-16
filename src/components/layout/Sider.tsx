import { AppstoreOutlined, BellOutlined, CustomerServiceOutlined, LeftOutlined, RightOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Space, Typography } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface SiderProps {
  viewMode: 'tech' | 'manager';
  setViewMode: (mode: 'tech' | 'manager') => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sider = ({ viewMode, setViewMode, collapsed, setCollapsed }: SiderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = pathname.includes('dashboard')
    ? 'dashboard'
    : pathname.includes('chamados')
      ? 'chamados'
      : 'chamados';

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="dark"
      width={280}
      style={{
        background: '#14181F',
        position: 'relative',
      }}
    >
      {/* Logo Area */}
      <div style={{
        padding: collapsed ? '20px 12px' : '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {!collapsed ? (
          <>
            <Space align="center" size={12}>
              <div style={{
                width: 40,
                height: 40,
                background: '#ec6725',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: '#fff'
              }}>
                N
              </div>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>NEO</span>
            </Space>
            <Button
              type="text"
              icon={<LeftOutlined style={{ color: '#8b8d98' }} />}
              size="small"
              onClick={() => setCollapsed(!collapsed)}
            />
          </>
        ) : (
          <Button
            type="text"
            icon={<RightOutlined style={{ color: '#8b8d98' }} />}
            size="small"
            onClick={() => setCollapsed(!collapsed)}
          />
        )}
      </div>

      {/* View Mode Section */}
      {!collapsed && (
        <div style={{ padding: '24px 24px 20px' }}>
          <Typography.Title level={5} style={{
            color: '#8b8d98',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1,
            margin: 0,
            marginBottom: 16
          }}>
            MODO DE VISUALIZAÇÃO
          </Typography.Title>

          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <Button
              type={viewMode === 'tech' ? 'primary' : 'default'}
              icon={<ToolOutlined />}
              onClick={() => setViewMode('tech')}
              style={{
                background: viewMode === 'tech' ? '#ec6725' : 'transparent',
                borderColor: viewMode === 'tech' ? '#ec6725' : '#3a3d52',
                color: viewMode === 'tech' ? '#fff' : '#8b8d98',
                width: 48,
                height: 48
              }}
            />
            <Button
              type={viewMode === 'manager' ? 'primary' : 'default'}
              icon={<UserOutlined />}
              onClick={() => setViewMode('manager')}
              style={{
                background: viewMode === 'manager' ? '#fff' : 'transparent',
                borderColor: viewMode === 'manager' ? '#fff' : '#3a3d52',
                color: viewMode === 'manager' ? '#1a1d2e' : '#8b8d98',
                width: 48,
                height: 48,
                borderRadius: '50%'
              }}
            />
            <Button
              icon={<AppstoreOutlined />}
              style={{
                background: 'transparent',
                borderColor: '#3a3d52',
                color: '#8b8d98',
                width: 48,
                height: 48
              }}
            />
          </div>

          <Typography.Text style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
            Visão Técnico
          </Typography.Text>
        </div>
      )}

      {/* Menu */}
      <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            if (key === 'chamados' || key === 'dashboard') {
              router.push(`/${key}`);
            }
          }}
          style={{ 
            background: 'transparent',
            border: 'none',
            marginTop: 8
          }}
          theme="dark"
          items={[
            {
              key: 'chamados',
              icon: <CustomerServiceOutlined style={{ fontSize: 18 }} />,
              label: <span style={{ fontSize: 15 }}>Chamados</span>,
              style: { 
                height: 48,
                marginBottom: 4,
                background: selectedKey === 'chamados' ? 'rgba(236, 103, 37, 0.1)' : 'transparent',
                borderLeft: selectedKey === 'chamados' ? '3px solid #ec6725' : 'none'
              }
            },
            {
              key: 'dashboard',
              icon: <BellOutlined style={{ fontSize: 18 }} />,
              label: <span style={{ fontSize: 15 }}>Dashboards</span>,
              style: { 
                height: 48,
                marginBottom: 4,
                background: selectedKey === 'dashboard' ? 'rgba(236, 103, 37, 0.1)' : 'transparent',
                borderLeft: selectedKey === 'dashboard' ? '3px solid #ec6725' : 'none'
              }
            },
            // {
            //   key: 'configuracoes',
            //   icon: <SettingOutlined style={{ fontSize: 18 }} />,
            //   label: <span style={{ fontSize: 15 }}>Configurações</span>,
            //   style: { 
            //     height: 48,
            //     background: selectedKey === 'configuracoes' ? 'rgba(236, 103, 37, 0.1)' : 'transparent',
            //     borderLeft: selectedKey === 'configuracoes' ? '3px solid #ec6725' : 'none'
            //   }
            // },
          ]}
        />

      {/* User Profile Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: collapsed ? '20px 12px' : '20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 12
      }}>
        <Avatar
          size={40}
          style={{
            backgroundColor: '#3a3d52',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16
          }}
        >
          AS
        </Avatar>
        {!collapsed && (
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Ana Silva</div>
            <div style={{ color: '#8b8d98', fontSize: 12 }}>Supervisora</div>
          </div>
        )}
      </div>
    </Layout.Sider>
  )
}

export default Sider