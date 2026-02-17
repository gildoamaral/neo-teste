import { Card, Typography, Segmented } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { VolumeChamadosDiaChartProps } from '@/types';

const { Text } = Typography;
const BAR_COLOR = '#ec6725';

export function VolumeChamadosDiaChart({
  data,
  days,
  onDaysChange,
}: VolumeChamadosDiaChartProps) {
  return (
    <Card
      title={<Text strong style={{ fontSize: 14 }}>Chamados por Dia</Text>}
      extra={
        <Segmented
          size="small"
          options={[
            { label: '15d', value: 15 },
            { label: '30d', value: 30 },
            { label: '45d', value: 45 },
          ]}
          value={days}
          onChange={(value) => onDaysChange(value as number)}
        />
      }
      styles={{ body: { padding: '12px 16px', userSelect: 'none' } }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => format(new Date(value), 'dd/MM')}
            interval={Math.max(1, Math.floor(data.length / 8))}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={30} />
          <RechartsTooltip
            cursor={false}
            labelFormatter={(value) =>
              format(new Date(value), "dd 'de' MMMM", { locale: ptBR })
            }
          />
          <Line
            type="monotone"
            dataKey="chamados"
            stroke={BAR_COLOR}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
            name="Chamados"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
