import { Card, Typography } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

const { Text } = Typography;

const BAR_COLOR = '#ec6725';

interface ChartDataItem {
  name: string;
  value: number;
}

interface ChamadosPorAreaChartProps {
  data: ChartDataItem[];
}

export function ChamadosPorAreaChart({ data }: ChamadosPorAreaChartProps) {
  return (
    <Card
      title={<Text strong>Chamados por Área</Text>}
      styles={{ body: { padding: '16px 24px' } }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <RechartsTooltip />
          <Bar
            dataKey="value"
            fill={BAR_COLOR}
            radius={[4, 4, 0, 0]}
            name="Chamados"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
