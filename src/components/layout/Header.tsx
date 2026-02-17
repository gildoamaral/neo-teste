import { MenuOutlined } from '@ant-design/icons';
import { Button, Layout, Space, Typography } from 'antd';
import { usePathname } from 'next/navigation';
import { LoadingBar } from '@/components/ui/LoadingBar';

interface HeaderProps {
  isMobile: boolean;
  onMenuClick: () => void;
}

const AppHeader = ({ isMobile, onMenuClick }: HeaderProps) => {
  const { Header } = Layout;
  const { Title, Text } = Typography;
  const pathname = usePathname();
  
  const getSubtitle = () => {
    if (pathname?.includes('/chamados')) {
      return "Visão operacional dos chamados";
    }
    if (pathname?.includes('/dashboard')) {
      return "Painel gerencial de indicadores";
    }
    return "";
  }; 
  
  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Header style={{
      padding: '0 24px',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      borderBottom: '1px solid #e8e8e8',
      marginBottom: 16,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={onMenuClick}
            style={{ padding: 4 }}
          />
        )}
        <div className='flex flex-col justify-center'>
          <Title level={4} style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
            Gestão de Chamados
          </Title>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {getSubtitle()}
          </Text>
        </div>
      </div>
      
      {!isMobile && (
        <Space size={16} align="center">
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {dataHoje}
          </Text>
        </Space>
      )}
      <LoadingBar />
    </Header>
  )
}

export default AppHeader