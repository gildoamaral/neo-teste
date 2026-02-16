import { AREAS, PRIORIDADES } from "@/types/ticket";
import { getMockDatabase } from "./mockData";

const DELAY_MS = 500;

export interface DashboardStats {
  totalChamados: number;
  criticosAtivos: number;
  taxaResolucao: number;
  cancelados: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface LineChartDataItem {
  date: string;
  chamados: number;
}

export interface DashboardData {
  stats: DashboardStats;
  chamadosPorPrioridade: ChartDataItem[];
  chamadosPorArea: ChartDataItem[];
  chamadosPorDia: LineChartDataItem[];
}

export async function fetchDashboardData(
  days: number = 30,
): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const allTickets = getMockDatabase();

  // Stats
  const totalChamados = allTickets.length;

  const criticosAtivos = allTickets.filter(
    (t) =>
      t.prioridade === "Crítica" &&
      (t.status === "Aberto" || t.status === "Em andamento"),
  ).length;

  const resolvidos = allTickets.filter((t) => t.status === "Resolvido").length;
  const abertosEmAndamento = allTickets.filter(
    (t) =>
      t.status === "Aberto" ||
      t.status === "Em andamento" ||
      t.status === "Resolvido",
  ).length;
  const taxaResolucao =
    abertosEmAndamento > 0
      ? Math.round((resolvidos / abertosEmAndamento) * 100)
      : 0;

  const cancelados = allTickets.filter((t) => t.status === "Cancelado").length;

  // Chamados por Prioridade (PieChart)
  const chamadosPorPrioridade: ChartDataItem[] = PRIORIDADES.map((p) => ({
    name: p,
    value: allTickets.filter((t) => t.prioridade === p).length,
  }));

  // Chamados por Área (BarChart)
  const chamadosPorArea: ChartDataItem[] = AREAS.map((a) => ({
    name: a,
    value: allTickets.filter((t) => t.area === a).length,
  }));

  // Chamados por Dia (LineChart) - últimos N dias
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - days);

  const ticketsInRange = allTickets.filter(
    (t) => new Date(t.abertura) >= startDate && new Date(t.abertura) <= now,
  );

  const dailyMap: Record<string, number> = {};
  for (let i = 0; i <= days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split("T")[0]; // YYYY-MM-DD
    dailyMap[key] = 0;
  }

  ticketsInRange.forEach((t) => {
    const key = new Date(t.abertura).toISOString().split("T")[0];
    if (dailyMap[key] !== undefined) {
      dailyMap[key]++;
    }
  });

  const chamadosPorDia: LineChartDataItem[] = Object.entries(dailyMap).map(
    ([date, count]) => ({
      date,
      chamados: count,
    }),
  );

  return {
    stats: { totalChamados, criticosAtivos, taxaResolucao, cancelados },
    chamadosPorPrioridade,
    chamadosPorArea,
    chamadosPorDia,
  };
}
