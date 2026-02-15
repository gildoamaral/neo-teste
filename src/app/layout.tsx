import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/lib/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Neoestech - Gestão de Chamados',
  description: 'Plataforma de monitoramento operacional',
};

const theme = {
  token: {
    colorPrimary: '#ec6725',
    borderRadius: 6,
    fontFamily: inter.style.fontFamily,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} style={{ margin: 0 }}>
        <ReactQueryProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}