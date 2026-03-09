'use client';

import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function useConfetti(throwConfetti: boolean) {
  useEffect(() => {
    if (!throwConfetti) return;

    confetti({
      particleCount: 120,
      spread: 80,
      startVelocity: 45,
      origin: { x: 0.5, y: 1 },
      zIndex: 50,
    });
  }, [throwConfetti]);
}
