import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FrameSequence } from '../../sections/Hero/FrameSequence';
import { HeroOverlay } from '../../sections/Hero/HeroOverlay';
import { HeroMobile } from './HeroMobile';

export const HeroSection = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (isDesktop) {
    return (
      <>
        <HeroOverlay />
        <FrameSequence />
      </>
    );
  }

  return <HeroMobile />;
};
