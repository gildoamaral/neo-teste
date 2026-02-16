import {  Layout, Space, Typography } from 'antd';

const Header = () => {
  const { Header } = Layout;
  const { Title, Text } = Typography;
  
  const view = "tecnico"; 
  
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
    }}>
      <div className='flex flex-col justify-center'>
        <Title level={4} style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
          Gestão de Chamados
        </Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {view === "tecnico" ? "Visão operacional dos chamados" : "Painel gerencial de indicadores"}
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