import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/services/dashboardApi";

export function useDashboard(days: number = 30) {
  return useQuery({
    queryKey: ["dashboard", days],
    queryFn: () => fetchDashboardData(days),
  });
}
