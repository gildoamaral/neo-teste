import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchChamados } from "@/mocks/api";
import type {
  ChamadoFilters,
  PrioridadesType,
  StatusType,
  AreasType,
} from "@/types";

vi.mock("@/utils/simularDelay", () => ({
  simularDelay: vi.fn().mockResolvedValue(undefined),
}));

const baseFilters: ChamadoFilters = {
  pagina: 1,
  porPagina: 200,
};

describe("fetchChamados – filtros e ordenação", () => {
  it("deve filtrar chamados por prioridade", async () => {
    const prioridade: PrioridadesType = "Crítica";
    const result = await fetchChamados({ ...baseFilters, prioridade });

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((c) => c.prioridade === prioridade)).toBe(true);
  });

  it("deve filtrar por busca textual (título, equipamento, instalação ou id)", async () => {
    const all = await fetchChamados(baseFilters);
    const target = all.data[0];
    const searchTerm = target.titulo.split(" ").slice(0, 2).join(" ");

    const result = await fetchChamados({ ...baseFilters, busca: searchTerm });

    expect(result.data.length).toBeGreaterThan(0);
    expect(
      result.data.every(
        (c) =>
          c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.instalacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.id.toString().includes(searchTerm.toLowerCase()),
      ),
    ).toBe(true);
  });

  it("deve combinar múltiplos filtros simultaneamente", async () => {
    const status: StatusType = "Aberto";
    const area: AreasType = "Energia";

    const result = await fetchChamados({ ...baseFilters, status, area });

    result.data.forEach((c) => {
      expect(c.status).toBe(status);
      expect(c.area).toBe(area);
    });
  });

  it("deve ordenar por data de abertura descendente", async () => {
    const result = await fetchChamados({
      ...baseFilters,
      ordenarPor: "abertura",
      ordemDirecao: "desc",
    });

    for (let i = 1; i < result.data.length; i++) {
      const prev = new Date(result.data[i - 1].abertura).getTime();
      const curr = new Date(result.data[i].abertura).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("deve ordenar por data de abertura", async () => {
    const result = await fetchChamados({
      ...baseFilters,
      ordenarPor: "abertura",
      ordemDirecao: "asc",
    });

    for (let i = 1; i < result.data.length; i++) {
      const prev = new Date(result.data[i - 1].abertura).getTime();
      const curr = new Date(result.data[i].abertura).getTime();
      expect(prev).toBeLessThanOrEqual(curr);
    }
  });

  it("deve ordenar por prioridade", async () => {
    const PESO: Record<PrioridadesType, number> = {
      Crítica: 0,
      Alta: 1,
      Média: 2,
      Baixa: 3,
    };

    const result = await fetchChamados({
      ...baseFilters,
      ordenarPor: "prioridade",
      ordemDirecao: "desc",
    });

    for (let i = 1; i < result.data.length; i++) {
      const prev = PESO[result.data[i - 1].prioridade];
      const curr = PESO[result.data[i].prioridade];
      expect(prev).toBeLessThanOrEqual(curr);
    }
  });

  it("deve retornar lista vazia para busca sem resultados", async () => {
    const result = await fetchChamados({
      ...baseFilters,
      busca: "Não Existo e Nunca Existi",
    });

    expect(result.data).toHaveLength(0);
    expect(result.total).toBe(0);
  });
});
