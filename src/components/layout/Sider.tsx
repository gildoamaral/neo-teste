import { SiderProps } from '@/types';
import { BellOutlined, CustomerServiceOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Layout, Menu, Space, Typography } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../ui/Logo';

export const Sider = ({ collapsed, setCollapsed, isMobile, drawerOpen, setDrawerOpen }: SiderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = pathname.includes('dashboard')
    ? 'dashboard'
    : pathname.includes('chamados')
      ? 'chamados'
      : 'chamados';

  const handleNavigate = (key: string) => {
    if (key === 'chamados' || key === 'dashboard') {
      router.push(`/${key}`);
      if (isMobile) setDrawerOpen(false);
    }
  };

  const siderContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        padding: collapsed && !isMobile ? '20px 12px' : '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed && !isMobile ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        height: 64,
        flexShrink: 0,
      }}>
        {(!collapsed || isMobile) ? (
          <>
            <Logo/>
            {!isMobile && (
              <Button
                type="text"
                icon={<LeftOutlined style={{ color: '#8b8d98' }} />}
                size="small"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
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

      <div style={{ flex: 1, overflow: 'auto' }}>
        {(!collapsed || isMobile) &&
          <div className='flex justify-center items-center mt-5'>
            <Typography.Title level={5} style={{
              color: '#8b8d98',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1,
            }}>
              MODO DE VISUALIZAÇÃO
            </Typography.Title>
          </div>
        }

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleNavigate(key)}
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
          ]}
        />
      </div>

      <div style={{
        padding: collapsed && !isMobile ? '20px 12px' : '20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
        gap: 12,
        flexShrink: 0,
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
        {(!collapsed || isMobile) && (
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Ana Silva</div>
            <div style={{ color: '#8b8d98', fontSize: 12 }}>Supervisora</div>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size={280}
        styles={{ body: { padding: 0, background: '#14181F' }, header: { display: 'none' } }}
      >
        {siderContent}
      </Drawer>
    );
  }

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="dark"
      width={260}
      style={{
        background: '#14181F',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {siderContent}
    </Layout.Sider>
  );
}

export default Sider