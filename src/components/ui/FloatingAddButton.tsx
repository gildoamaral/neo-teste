'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('.main-content-area') as HTMLElement | null;
    const target = scrollContainer ?? window;

    const handleScroll = () => {
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        setHidden(scrollTop + clientHeight >= scrollHeight - 10);
      } else {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        setHidden(scrollTop + clientHeight >= scrollHeight - 10);
      }
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

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
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'scale(0.8)' : 'scale(1)',
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    />
  );
}
