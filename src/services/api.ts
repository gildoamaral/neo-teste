import { Ticket, TicketFilters, PaginatedResponse, PRIORIDADES } from '@/types/ticket';
import { getMockDatabase } from './mockData';

const DELAY_MS = 800; // Simula latência

const priorityWeight = {
  'Crítica': 4,
  'Alta': 3,
  'Média': 2,
  'Baixa': 1
};

export async function fetchTickets(filters: TicketFilters): Promise<PaginatedResponse<Ticket>> {
  // Simulaçao de latência
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  // Busca o "banco de dados"
  let data = [...getMockDatabase()];

  // 3. Aplica Filtros (Query Params)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    data = data.filter((t) => 
      t.titulo.toLowerCase().includes(searchLower) || 
      t.id!.toString().includes(searchLower)
    );
  }

  if (filters.status) data = data.filter((t) => t.status === filters.status);
  if (filters.area) data = data.filter((t) => t.area === filters.area);
  if (filters.prioridade) data = data.filter((t) => t.prioridade === filters.prioridade);

  data.sort((a, b) => {
    // Primeiro critério: Data (mais recente primeiro)
    const dateA = new Date(a.abertura).getTime();
    const dateB = new Date(b.abertura).getTime();
    if (dateA !== dateB) return dateB - dateA;

    // Critério de desempate: Prioridade
    return priorityWeight[b.prioridade as keyof typeof priorityWeight] - 
           priorityWeight[a.prioridade as keyof typeof priorityWeight];
  });

  // Paginação (Slice)
  const total = data.length;
  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

// Função para buscar um único ticket (usada no Drawer de detalhes)
export async function fetchTicketById(id: number): Promise<Ticket | undefined> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  const allTickets = getMockDatabase();
  return allTickets.find((t) => t.id === id);
}

// Função para criar ticket (usada no Formulário)
export async function createTicket(newTicket: Omit<Ticket, 'id' | 'abertura' | 'ultimaAtualizacao'>): Promise<Ticket> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  
  // Idealmente seria criado pelo backend, mas como estamos simulando, vamos criar aqui mesmo
  const db = getMockDatabase();
  const nextId = Math.max(...db.map(t => t.id!)) + 1;
  
  const ticket: Ticket = {
    ...newTicket,
    id: nextId,
    abertura: new Date().toISOString(),
    ultimaAtualizacao: new Date().toISOString(),
  };

  // Adiciona ao início do array (unshift) para aparecer primeiro
  db.unshift(ticket);
  
  return ticket;
}