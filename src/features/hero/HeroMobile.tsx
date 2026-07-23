import { useEffect, useState } from 'react';
import { HeroMobileOverlay } from './HeroMobileOverlay';

export const HeroMobile = () => {
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  useEffect(() => {
    // Wait for the 4s GlobalLoader + 0.5s fade out to complete
    const timer = setTimeout(() => {
      setIsSequenceComplete(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <img
        src="/sequences/hero/mobile/ChatGPT Image Jul 23, 2026, 01_17_33 AM.png"
        alt="Kingsmen Hero"
        className="w-full h-full object-cover block"
      />
      <HeroMobileOverlay isSequenceComplete={isSequenceComplete} />
    </div>
  );
};
