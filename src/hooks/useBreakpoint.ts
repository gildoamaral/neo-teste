"use client";

import { useCallback, useSyncExternalStore } from "react";

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

interface BreakpointState {
  width: number;
  current: BreakpointKey;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAbove: (bp: BreakpointKey) => boolean;
  isBelow: (bp: BreakpointKey) => boolean;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return 1200;
}

export function useBreakpoint(): BreakpointState {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const getCurrent = useCallback((): BreakpointKey => {
    if (width >= BREAKPOINTS.xxl) return "xxl";
    if (width >= BREAKPOINTS.xl) return "xl";
    if (width >= BREAKPOINTS.lg) return "lg";
    if (width >= BREAKPOINTS.md) return "md";
    if (width >= BREAKPOINTS.sm) return "sm";
    return "xs";
  }, [width]);

  const isAbove = useCallback(
    (bp: BreakpointKey) => width >= BREAKPOINTS[bp],
    [width],
  );

  const isBelow = useCallback(
    (bp: BreakpointKey) => width < BREAKPOINTS[bp],
    [width],
  );

  return {
    width,
    current: getCurrent(),
    isMobile: width < BREAKPOINTS.md,
    isTablet: width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
    isAbove,
    isBelow,
  };
}
