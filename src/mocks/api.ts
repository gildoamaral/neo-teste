import type {
  ChamadoComTimeline,
  ChamadoFilters,
  ChamadoListResponse,
  EstatisticasDashboard,
  PrioridadesType,
} from "@/types";
import { AREAS, PRIORIDADES } from "@/types";
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
        c.instalacao.toLowerCase().includes(busca) ||
        c.id.toString().includes(busca),
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
export async function fetchEstatisticas(): Promise<EstatisticasDashboard> {
  await simularDelay();

  const chamados = gerarTodosChamados();

  const totalChamados = chamados.length;
  const chamadosAbertos = chamados.filter((c) => c.status === "Aberto").length;
  const resolvidos = chamados.filter((c) => c.status === "Resolvido").length;
  const cancelados = chamados.filter((c) => c.status === "Cancelado").length;
  const totalAtivos = totalChamados - cancelados;
  const taxaResolucao =
    totalAtivos > 0 ? Math.round((resolvidos / totalAtivos) * 100) : 0;

  const chamadosComResposta = chamados.filter(
    (c) => c.status !== "Aberto" && c.status !== "Cancelado",
  );
  const somaHoras = chamadosComResposta.reduce((acc, c) => {
    const diff =
      new Date(c.ultimaAtualizacao).getTime() - new Date(c.abertura).getTime();
    return acc + diff / 3600000;
  }, 0);
  const tempoMedioResposta =
    chamadosComResposta.length > 0
      ? Math.round(somaHoras / chamadosComResposta.length)
      : 0;

  const chamadosPorArea = AREAS.map((area) => ({
    name: area,
    value: chamados.filter((c) => c.area === area).length,
  }));

  const chamadosPorPrioridade = PRIORIDADES.map((p) => ({
    name: p,
    value: chamados.filter((c) => c.prioridade === p).length,
  }));

  // Agrupa chamados por dia (últimos 45 dias)
  const hoje = new Date();
  const inicio = new Date(hoje);
  inicio.setDate(inicio.getDate() - 45);

  const contagemPorDia: Record<string, number> = {};
  for (let d = new Date(inicio); d <= hoje; d.setDate(d.getDate() + 1)) {
    contagemPorDia[d.toISOString().slice(0, 10)] = 0;
  }

  chamados.forEach((c) => {
    const dia = c.abertura.slice(0, 10);
    if (dia in contagemPorDia) {
      contagemPorDia[dia]++;
    }
  });

  const chamadosPorDia = Object.entries(contagemPorDia)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, chamados]) => ({ date, chamados }));

  return {
    stats: {
      totalChamados,
      chamadosAbertos,
      taxaResolucao,
      tempoMedioResposta,
    },
    chamadosPorArea,
    chamadosPorPrioridade,
    chamadosPorDia,
  };
}
