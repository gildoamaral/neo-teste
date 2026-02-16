import { Card, Typography } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

const { Text } = Typography;

const PIE_COLORS = ['#cf1322', '#fa8c16', '#108ee9', '#87d068'];

interface ChartDataItem {
  name: string;
  value: number;
}

interface DistribuicaoPrioridadeChartProps {
  data: ChartDataItem[];
}

export function DistribuicaoPrioridadeChart({
  data,
}: DistribuicaoPrioridadeChartProps) {
  return (
    <Card
      title={<Text strong>Distribuição por Prioridade</Text>}
      styles={{ body: { padding: '12px 16px' } }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={45}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
