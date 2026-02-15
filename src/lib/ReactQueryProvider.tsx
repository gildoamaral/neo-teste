'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Evita refetch ao trocar de aba (opcional)
        staleTime: 1000 * 60, 
      },
    },
  }));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}