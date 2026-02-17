import { ChamadosPorAreaChartProps } from '@/types';
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

export function ChamadosPorAreaChart({ data }: ChamadosPorAreaChartProps) {
  return (
    <Card
      title={<Text strong>Chamados por Área</Text>}
      styles={{ body: { padding: '12px 16px', userSelect: 'none' } }}
    >
      <ResponsiveContainer width="100%" height={250} style={{ outline: 'none' }} >
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }} style={{ outline: 'none' }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}  />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={0} textAnchor="end" height={50} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={30} />
          <RechartsTooltip cursor={false} />
          <Bar
            dataKey="value"
            fill={BAR_COLOR}
            radius={[4, 4, 0, 0]}
            name="Chamados"
            barSize={32}
            style={{ outline: 'none' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
