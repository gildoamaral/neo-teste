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

const { Text } = Typography;

const BAR_COLOR = '#ec6725';

interface LineChartDataItem {
  date: string;
  chamados: number;
}

interface VolumeChamadosDiaChartProps {
  data: LineChartDataItem[];
  days: number;
  onDaysChange: (days: number) => void;
}

export function VolumeChamadosDiaChart({
  data,
  days,
  onDaysChange,
}: VolumeChamadosDiaChartProps) {
  return (
    <Card
      title={<Text strong>Volume de Chamados por Dia</Text>}
      extra={
        <Segmented
          options={[
            { label: '15 dias', value: 15 },
            { label: '30 dias', value: 30 },
            { label: '45 dias', value: 45 },
          ]}
          value={days}
          onChange={(value) => onDaysChange(value as number)}
        />
      }
      styles={{ body: { padding: '16px 24px' } }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => format(new Date(value), 'dd/MM')}
            interval={Math.max(1, Math.floor(data.length / 10))}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <RechartsTooltip
            labelFormatter={(value) =>
              format(new Date(value), "dd 'de' MMMM", { locale: ptBR })
            }
          />
          <Line
            type="monotone"
            dataKey="chamados"
            stroke={BAR_COLOR}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Chamados"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
