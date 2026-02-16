import type {
  ChamadoComTimeline,
  ChamadoFilters,
  ChamadoListResponse,
  PrioridadesType,
} from "@/types";
import { gerarTodosChamados, adicionarChamado } from "./gerador";
import { simularDelay } from "@/utils/simularDelay";

const PRIORIDADE_PESO: Record<PrioridadesType, number> = {
  Crítica: 0,
  Alta: 1,
  Média: 2,
  Baixa: 3,
};

// axios GET /chamados
export async function fetchChamados(
  filters: ChamadoFilters,
): Promise<ChamadoListResponse> {
  await simularDelay();

  let chamados = [...gerarTodosChamados()];

  // Filtros
  if (filters.status)
    chamados = chamados.filter((c) => c.status === filters.status);

  if (filters.prioridade)
    chamados = chamados.filter((c) => c.prioridade === filters.prioridade);

  if (filters.area) chamados = chamados.filter((c) => c.area === filters.area);

  if (filters.busca) {
    const busca = filters.busca.toLowerCase();
    chamados = chamados.filter(
      (c) =>
        c.titulo.toLowerCase().includes(busca) ||
        c.equipamento.toLowerCase().includes(busca) ||
        c.instalacao.toLowerCase().includes(busca),
    );
  }

  // Ordenação
  if (filters.ordenarPor === "abertura") {
chamados.sort((a, b) => {
  const timeA = new Date(a.abertura).getTime();
  const timeB = new Date(b.abertura).getTime();
  return filters.ordemDirecao === "desc" ? timeB - timeA : timeA - timeB;
});
  } else if (filters.ordenarPor === "prioridade") {
    chamados.sort((a, b) => {
      const diff =
        PRIORIDADE_PESO[a.prioridade] - PRIORIDADE_PESO[b.prioridade];
      return filters.ordemDirecao === "desc" ? -diff : diff;
    });
  }

  const total = chamados.length;
  const totalPaginas = Math.ceil(total / filters.porPagina);
  const inicio = (filters.pagina - 1) * filters.porPagina;
  const fim = inicio + filters.porPagina;
  const data = chamados.slice(inicio, fim);

  return {
    data,
    total,
    pagina: filters.pagina,
    porPagina: filters.porPagina,
    totalPaginas,
  };
}

// axios GET /chamados/:id
export async function fetchChamadoById(
  id: number,
): Promise<ChamadoComTimeline | null> {
  await simularDelay();

  const chamados = gerarTodosChamados();
  return chamados.find((c) => c.id === id) ?? null;
}

// axios POST /chamados
export async function criarChamado(
  dados: Omit<
    ChamadoComTimeline,
    "id" | "abertura" | "ultimaAtualizacao" | "timeline" | "status"
  >,
): Promise<ChamadoComTimeline> {
  await simularDelay();

  const chamados = gerarTodosChamados();
  const maxId = chamados.reduce((max, c) => Math.max(max, c.id), 0);
  const agora = new Date().toISOString();

  const novo: ChamadoComTimeline = {
    ...dados,
    id: maxId + 1,
    status: "Aberto",
    abertura: agora,
    ultimaAtualizacao: agora,
    timeline: [
      {
        data: agora,
        descricao: "Chamado aberto manualmente pelo usuário.",
        usuario: "Usuário",
      },
    ],
  };

  adicionarChamado(novo);
  return novo;
}

// axios GET /estatisticas
export async function fetchEstatisticas() {
  await simularDelay();

  const chamados = gerarTodosChamados();

  const porStatus: Record<string, number> = {};
  const porArea: Record<string, number> = {};
  const porPrioridade: Record<string, number> = {};

  let totalAbertosMs = 0;
  let countAbertos = 0;

  const agora = Date.now();

  for (const c of chamados) {
    porStatus[c.status] = (porStatus[c.status] ?? 0) + 1;
    porArea[c.area] = (porArea[c.area] ?? 0) + 1;
    porPrioridade[c.prioridade] = (porPrioridade[c.prioridade] ?? 0) + 1;

    if (c.status === "Aberto" || c.status === "Em andamento") {
      totalAbertosMs += agora - new Date(c.abertura).getTime();
      countAbertos++;
    }
  }

  const tempoMedioAbertoHoras =
    countAbertos > 0 ? Math.round(totalAbertosMs / countAbertos / 3600000) : 0;

  return {
    total: chamados.length,
    porStatus,
    porArea,
    porPrioridade,
    tempoMedioAbertoHoras,
  };
}
