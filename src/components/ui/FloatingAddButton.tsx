'use client';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<PlusOutlined style={{ fontSize: 24 }} />}
      onClick={onClick}
      size="large"
      style={{
        position: 'fixed',
        bottom: 50,
        right: 32,
        width: 55,
        height: 55,
        zIndex: 1000,
        boxShadow: '0 6px 16px rgba(236, 103, 37, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
