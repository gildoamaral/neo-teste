'use client';

import { Button, Result } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Result
      status="error"
      title="Erro ao carregar dados"
      subTitle={message ?? 'Ocorreu um erro inesperado. Tente novamente.'}
      extra={
        <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
          Tentar novamente
        </Button>
      }
    />
  );
}
