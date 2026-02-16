import { faker } from "@faker-js/faker/locale/pt_BR";
import type {
  AreasType,
  ChamadoComTimeline,
  ChamadoTimeline,
  StatusType,
} from "@/types";
import { AREAS, PRIORIDADES, STATUS } from "@/types";
import seedData from "./chamados.json";

const EQUIPAMENTOS_POR_AREA: Record<AreasType, string[]> = {
  Refrigeração: [
    "Compressor Bitzer 4TCS-8.2",
    "Câmara Fria #01",
    "Câmara Fria #02",
    "Câmara Fria #03",
    "Rack de Refrigeração #12",
    "Sensor PT100 #347",
    "Controlador Carel pCO5 #89",
    "Evaporador Güntner #04",
    "Condensador Bohn #07",
  ],
  Energia: [
    "Quadro Elétrico QD-01",
    "Nobreak APC 3kVA",
    "Medidor Geral Loja",
    "Painel LED FLV-02",
    "Transformador 150kVA",
    "Gerador Diesel 200kVA",
    "Banco de Capacitores BC-01",
  ],
  "Ar-condicionado": [
    "Split Inverter 60k BTU",
    "Condensadora VRF Daikin",
    "Fan Coil Carrier 36k BTU",
    "Chiller Trane 100 TR",
    "Split Hi-Wall 12k BTU",
  ],
  Água: [
    "Bomba Centrífuga BC-02",
    "Reservatório Superior 10.000L",
    "Hidrômetro Digital HD-01",
    "Válvula Solenóide VS-03",
    "Pressurizador Rowa 350",
  ],
};

const INSTALACOES = [
  "Loja Centro - SP",
  "CD Logístico - RJ",
  "Escritório Sede - SP",
  "Loja Norte - AM",
  "Loja Sul - PR",
  "Loja Oeste - MG",
  "Loja Leste - BA",
  "CD Norte - PA",
  "Loja Shopping - DF",
  "Filial Serra - RS",
];

const RESPONSAVEIS = [
  "Carlos Silva",
  "Ana Costa",
  "Roberto Lima",
  "Marcos Oliveira",
  "Fernanda Santos",
  "Ricardo Almeida",
  "Juliana Ferreira",
  "Pedro Nascimento",
  null,
];

const TITULOS_POR_AREA: Record<AreasType, string[]> = {
  Refrigeração: [
    "Compressor com temperatura acima do limite",
    "Sensor de temperatura offline",
    "Vazamento de gás refrigerante detectado",
    "Porta da câmara fria não vedando",
    "Falha no controlador do balcão refrigerado",
    "Alarme de porta aberta da câmara",
    "Condensador com baixa eficiência",
    "Evaporador com formação de gelo excessiva",
    "Pressão do sistema fora do range",
    "Temperatura da câmara acima do setpoint",
  ],
  Energia: [
    "Queda de tensão na rede elétrica principal",
    "Iluminação do setor piscando",
    "Nobreak com bateria fraca",
    "Consumo de energia acima da média",
    "Disjuntor desarmando repetidamente",
    "Falha no gerador de emergência",
    "Fator de potência abaixo do limite",
    "Pico de demanda detectado",
    "Harmônicas acima do permitido",
    "Falha no banco de capacitores",
  ],
  "Ar-condicionado": [
    "Ar-condicionado da sala desligou",
    "Condensador com acúmulo de sujeira",
    "Fan coil com ruído excessivo",
    "Temperatura da sala acima do conforto",
    "Vazamento de água no split",
    "Erro no sistema VRF",
    "Filtro de ar saturado",
    "Compressor do AC não liga",
    "Controle remoto sem comunicação",
    "Drenagem do AC obstruída",
  ],
  Água: [
    "Vazamento na tubulação principal",
    "Nível do reservatório crítico",
    "Bomba de recalque com falha",
    "Hidrômetro com leitura irregular",
    "Pressão da rede abaixo do normal",
    "Válvula solenóide travada",
    "Consumo de água acima do padrão",
    "Bomba pressurizadora com ruído",
    "Boia do reservatório com defeito",
    "Vazamento detectado no subsolo",
  ],
};

function gerarTimeline(status: StatusType, abertura: Date): ChamadoTimeline[] {
  const timeline: ChamadoTimeline[] = [
    {
      data: abertura.toISOString(),
      descricao:
        "Chamado aberto automaticamente pelo sistema de monitoramento.",
      usuario: "Sistema NEO",
    },
  ];

  if (status === "Aberto") return timeline;

  const horasDepois = faker.number.int({ min: 1, max: 8 });
  const dataAtribuicao = new Date(abertura.getTime() + horasDepois * 3600000);
  const responsavel = faker.helpers.arrayElement(
    RESPONSAVEIS.filter((r): r is string => r !== null),
  );

  timeline.push({
    data: dataAtribuicao.toISOString(),
    descricao: `Chamado atribuído para ${responsavel}.`,
    usuario: "Coordenação",
  });

  if (status === "Em andamento") {
    const horasInicio = faker.number.int({ min: 1, max: 4 });
    timeline.push({
      data: new Date(
        dataAtribuicao.getTime() + horasInicio * 3600000,
      ).toISOString(),
      descricao: "Técnico iniciou atendimento no local.",
      usuario: responsavel,
    });
    return timeline;
  }

  if (status === "Resolvido") {
    timeline.push({
      data: new Date(dataAtribuicao.getTime() + 2 * 3600000).toISOString(),
      descricao: "Técnico iniciou atendimento.",
      usuario: responsavel,
    });
    timeline.push({
      data: new Date(dataAtribuicao.getTime() + 6 * 3600000).toISOString(),
      descricao: "Problema corrigido e testado. Chamado encerrado.",
      usuario: responsavel,
    });
    return timeline;
  }

  if (status === "Cancelado") {
    timeline.push({
      data: new Date(dataAtribuicao.getTime() + 1 * 3600000).toISOString(),
      descricao: "Chamado cancelado — problema resolvido antes do atendimento.",
      usuario: "Coordenação",
    });
  }

  return timeline;
}

function gerarChamadoFake(id: number): ChamadoComTimeline {
  const area = faker.helpers.arrayElement([...AREAS]);
  const status = faker.helpers.arrayElement([...STATUS]);
  const prioridade = faker.helpers.arrayElement([...PRIORIDADES]);
  const equipamentos = EQUIPAMENTOS_POR_AREA[area];
  const titulos = TITULOS_POR_AREA[area];
  const abertura = faker.date.between({
    from: "2026-01-01T00:00:00Z",
    to: "2026-02-14T23:59:59Z",
  });

  const ultimaAtualizacao = new Date(
    abertura.getTime() + faker.number.int({ min: 0, max: 72 }) * 3600000,
  );

  const responsavelEscolhido =
    status === "Aberto"
      ? faker.helpers.arrayElement(RESPONSAVEIS)
      : faker.helpers.arrayElement(
          RESPONSAVEIS.filter((r): r is string => r !== null),
        );

  return {
    id,
    titulo: faker.helpers.arrayElement(titulos),
    area,
    prioridade,
    status,
    equipamento: faker.helpers.arrayElement(equipamentos),
    instalacao: faker.helpers.arrayElement(INSTALACOES),
    abertura: abertura.toISOString(),
    ultimaAtualizacao: ultimaAtualizacao.toISOString(),
    descricao: faker.lorem.sentences({ min: 1, max: 3 }),
    responsavel: responsavelEscolhido,
    timeline: gerarTimeline(status, abertura),
  };
}

function converterSeedParaChamadoComTimeline(
  seed: (typeof seedData)[number],
): ChamadoComTimeline {
  const chamado = seed as ChamadoComTimeline;
  const abertura = new Date(chamado.abertura);
  return {
    ...chamado,
    timeline: gerarTimeline(chamado.status, abertura),
  };
}

let chamadosCache: ChamadoComTimeline[] | null = null;

export function gerarTodosChamados(): ChamadoComTimeline[] {
  if (chamadosCache) return chamadosCache;

  faker.seed(42);

  const seedChamados = seedData.map(converterSeedParaChamadoComTimeline);

  const gerados: ChamadoComTimeline[] = [];
  for (let i = 0; i < 1000; i++) {
    gerados.push(gerarChamadoFake(2000 + i));
  }

  chamadosCache = [...seedChamados, ...gerados];
  return chamadosCache;
}

export function limparCache(): void {
  chamadosCache = null;
}

export function adicionarChamado(chamado: ChamadoComTimeline): void {
  const todos = gerarTodosChamados();
  todos.unshift(chamado);
}
