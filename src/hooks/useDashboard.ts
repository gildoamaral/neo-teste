import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/services/dashboardApi";
import { fetchEstatisticas } from '@/mocks/api';

export function useDashboard(days: number = 30) {
  return useQuery({
    queryKey: ["dashboard", days],
    queryFn: () => fetchDashboardData(days),
  });
}

export function useEstatisticas() {
  return useQuery({
    queryKey: ["estatisticas"],
    queryFn: fetchEstatisticas,
  });
}
