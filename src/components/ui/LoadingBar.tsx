'use client';

import { useIsFetching } from '@tanstack/react-query';

export function LoadingBar() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, transparent, var(--primary-color), transparent)',
          animation: 'loadingSlide 600ms ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes loadingSlide {
          0% {
            transform: translateX(-100%);
            width: 40%;
          }
          50% {
            width: 60%;
          }
          100% {
            transform: translateX(250%);
            width: 40%;
          }
        }
      `}</style>
    </div>
  );
}
