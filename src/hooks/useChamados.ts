import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchChamados,
  fetchChamadoById,
  criarChamado,
  fetchEstatisticas,
} from "@/mocks/api";
import type { ChamadoFilters, ChamadoComTimeline } from "@/types";

export function useChamados(filters: ChamadoFilters) {
  return useQuery({
    queryKey: ["chamados", filters],
    queryFn: () => fetchChamados(filters),
    placeholderData: (previousData) => previousData,
  });
}

export function useChamadoDetalhe(id: number | null) {
  return useQuery({
    queryKey: ["chamado", id],
    queryFn: () => fetchChamadoById(id!),
    enabled: id !== null,
  });
}

export function useCriarChamado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      dados: Omit<
        ChamadoComTimeline,
        "id" | "abertura" | "ultimaAtualizacao" | "timeline" | "status"
      >,
    ) => criarChamado(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
      queryClient.invalidateQueries({ queryKey: ["estatisticas"] });
    },
  });
}

export function useEstatisticas() {
  return useQuery({
    queryKey: ["estatisticas"],
    queryFn: fetchEstatisticas,
  });
}
