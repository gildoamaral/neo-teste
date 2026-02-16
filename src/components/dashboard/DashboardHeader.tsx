import { Typography } from 'antd';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const { Title, Text } = Typography;

export function DashboardHeader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
      }}
    >
      <div>
        <Title level={2} style={{ margin: 0 }}>
          Gestão de Chamados
        </Title>
        <Text type="secondary">Painel gerencial de indicadores</Text>
      </div>
      <Text type="secondary" style={{ fontSize: 14 }}>
        {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </Text>
    </div>
  );
}
