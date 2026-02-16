import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEO — Plataforma de Monitoramento',
  description: 'Sistema de gestão de chamados e monitoramento operacional',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
