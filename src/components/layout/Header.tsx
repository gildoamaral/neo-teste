import {  Layout, Space, Typography } from 'antd';
import { usePathname } from 'next/navigation';

const Header = () => {
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
      marginBottom: 16
    }}>
      <div className='flex flex-col justify-center'>
        <Title level={4} style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
          Gestão de Chamados
        </Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {getSubtitle()}
        </Text>
      </div>
      
      <Space size={16} align="center">
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {dataHoje}
        </Text>
      </Space>
    </Header>
  )
}

export default Header