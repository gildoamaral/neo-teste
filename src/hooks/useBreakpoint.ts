"use client";

import { useState, useEffect, useCallback } from "react";

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
  mounted: boolean;
  isAbove: (bp: BreakpointKey) => boolean;
  isBelow: (bp: BreakpointKey) => boolean;
}

export function useBreakpoint(): BreakpointState {
  // Always start with desktop width to avoid hydration mismatch
  const [width, setWidth] = useState<number>(1200);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);

    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setWidth(window.innerWidth);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

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
    mounted,
    isAbove,
    isBelow,
  };
}
