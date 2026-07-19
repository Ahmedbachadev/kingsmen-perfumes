import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
export type OverlayState = 'hidden' | 'entering' | 'visible' | 'exiting';
export type TransitionType = 'overlay' | 'morph' | 'slide' | 'none';

interface TransitionContextType {
  isTransitioning: boolean;
  overlayState: OverlayState;
  transitionType: TransitionType;
  targetRoute: string | null;
  startTransition: (route: string, type: TransitionType) => void;
  setOverlayState: (state: OverlayState) => void;
  setPageReady: () => void;
  completeTransition: () => void;
  saveScrollPosition: (route: string, scrollY: number) => void;
  getScrollPosition: (route: string) => number;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayState, setOverlayState] = useState<OverlayState>('hidden');
  const [transitionType, setTransitionType] = useState<TransitionType>('none');
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  const scrollPositions = useRef<Record<string, number>>({});

  const startTransition = useCallback((route: string, type: TransitionType) => {
    setIsTransitioning(true);
    setTransitionType(type);
    setTargetRoute(route);
    if (type === 'overlay') {
      setOverlayState('entering');
    }
  }, []);

  const setPageReady = useCallback(() => {
    if (transitionType === 'overlay' && overlayState === 'visible') {
      setOverlayState('exiting');
    } else if (transitionType !== 'overlay') {
      completeTransition();
    }
  }, [transitionType, overlayState]);

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    setOverlayState('hidden');
    setTransitionType('none');
    setTargetRoute(null);
  }, []);

  const saveScrollPosition = useCallback((route: string, scrollY: number) => {
    scrollPositions.current[route] = scrollY;
  }, []);

  const getScrollPosition = useCallback((route: string) => {
    return scrollPositions.current[route] || 0;
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        overlayState,
        transitionType,
        targetRoute,
        startTransition,
        setOverlayState,
        setPageReady,
        completeTransition,
        saveScrollPosition,
        getScrollPosition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionStore() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionStore must be used within a TransitionProvider');
  }
  return context;
}
