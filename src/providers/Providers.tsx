'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntApp } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { useState } from 'react';

const THEME_CONFIG = {
  token: {
    colorPrimary: '#ec6725',
    borderRadius: 6,
    fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={THEME_CONFIG} locale={ptBR}>
        <AntApp>
          {children}
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
