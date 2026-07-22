import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransitionStore } from './TransitionContext';
import type { TransitionType } from './TransitionContext';
import { fetcher } from '../../lib/fetcher';

export function useTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition, saveScrollPosition } = useTransitionStore();

  const triggerTransition = useCallback(async (to: string, type: TransitionType = 'overlay') => {
    if (location.pathname === to) return;

    // Save scroll position for the current route
    saveScrollPosition(location.pathname, window.scrollY);

    startTransition(to, type);

    if (type === 'overlay') {
      // The overlay handles actual navigation once it reaches 'visible' state
    } else if (type === 'morph') {
      navigate(to);
    } else {
      // For slide, navigate immediately. 
      // LayoutId or AnimatePresence will handle the visual transition.
      navigate(to);
    }
  }, [location.pathname, navigate, startTransition, saveScrollPosition]);

  return triggerTransition;
}
