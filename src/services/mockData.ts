import { Ticket, AREAS, STATUS, PRIORIDADES } from '@/types/ticket';
import { fakerPT_BR as faker } from '@faker-js/faker';
import staticData from '@/mocks/chamados.json'; 

function createRandomTicket(id: number): Ticket {
  const abertura = faker.date.recent({ days: 90 });
  const atualizacao = faker.date.between({ from: abertura, to: new Date() });

  const statusRandom = faker.helpers.arrayElement(STATUS);
  
  const areaRandom = faker.helpers.arrayElement(AREAS);
  const prioridadeRandom = faker.helpers.arrayElement(PRIORIDADES);

  return {
    id,
    titulo: faker.lorem.sentence({ min: 3, max: 6 }).replace('.', ''),
    area: areaRandom,
    prioridade: prioridadeRandom,
    status: statusRandom,
    equipamento: `${faker.commerce.productName()} - ${faker.string.alphanumeric(3).toUpperCase()}`,
    instalacao: `Unidade ${faker.location.city()}`,
    descricao: faker.lorem.paragraph(),
    responsavel: Math.random() > 0.3 ? faker.person.fullName() : null, // 30% de chance de ser null
    abertura: abertura.toISOString(),
    ultimaAtualizacao: atualizacao.toISOString(),
  };
}

let cachedData: Ticket[] = [];

export const getMockDatabase = (): Ticket[] => {
  if (cachedData.length > 0) return cachedData;

  const initialTickets = staticData as unknown as Ticket[];

  const TOTAL_TARGET = 1000;
  const missingCount = TOTAL_TARGET - initialTickets.length;
  
  const generatedTickets: Ticket[] = [];
  const startId = 1013; 

  for (let i = 0; i < missingCount; i++) {
    generatedTickets.push(createRandomTicket(startId + i));
  }

  cachedData = [...initialTickets, ...generatedTickets];

  cachedData.sort((a, b) => 
    new Date(b.abertura).getTime() - new Date(a.abertura).getTime()
  );

  return cachedData;
};