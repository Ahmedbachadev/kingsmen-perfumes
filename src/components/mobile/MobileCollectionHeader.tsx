import { GlassCard } from '../shared/GlassCard';
import { useCMSContext } from '../../contexts/CMSContext';

export const MobileCollectionHeader = () => {
  const { config } = useCMSContext();
  return (
    <GlassCard className="p-6 md:p-8 w-[92%] max-w-[400px] mx-auto text-left relative z-20 flex-shrink-0">
      <span className="text-[#E8D3A2] text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-semibold mb-3 md:mb-4 block opacity-90">
        Gentlemen Collection
      </span>
      <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-3 md:mb-4 leading-[1.15] whitespace-pre-line">
        {config.collections.gentlemen.title}
      </h2>
      <p className="text-white/60 text-[13px] md:text-[14px] font-light leading-relaxed whitespace-pre-line">
        {config.collections.gentlemen.description}
      </p>
    </GlassCard>
  );
};
