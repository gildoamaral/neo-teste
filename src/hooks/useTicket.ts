import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTickets, fetchTicketById, createTicket } from '@/services/api';
import { TicketFilters, Ticket } from '@/types/ticket';

export function useTickets(filters: TicketFilters) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => fetchTickets(filters),
    placeholderData: (previousData) => previousData, 
  });
}

export function useTicketDetails(id: number | null) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => fetchTicketById(id!),
    enabled: !!id,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}