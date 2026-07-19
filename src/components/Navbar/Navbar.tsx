import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSearchContext } from '../../contexts/SearchContext';
import { useCartContext } from '../../contexts/CartContext';
import { useTransition } from '../../features/transitions';

const NAV_LINKS_LEFT = ['Products', 'About'];
const NAV_LINKS_RIGHT = ['FAQ', 'Contact'];
const ALL_LINKS = [...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT];

export const Navbar = () => {
  const navigate = useTransition();
  const routeLocation = useLocation();
  const { scrollY } = useScroll();
  const [activeLink, setActiveLink] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { openSearch } = useSearchContext();
  const { openCart } = useCartContext();

  useEffect(() => {
    setTimeout(() => setIsInitialLoad(false), 1200);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < 100) {
      setIsHidden(false);
    } else if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'products') {
      navigate('/products', 'slide');
      return;
    }

    if (routeLocation.pathname !== '/') {
      navigate('/');
      // In a real app we'd wait for route change then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = ALL_LINKS.map(link => document.getElementById(link.toLowerCase()));
      let current = '';

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If section is in the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id;
          }
        }
      }

      if (current !== activeLink) {
        setActiveLink(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeLink]);

  // Cinematic scroll reactivity
  const scale = useTransform(scrollY, [0, 80], [1, 0.98]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0.15, 0.45]);
  const blur = useTransform(scrollY, [0, 80], [12, 24]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0.1, 0.4]);

  const highlightTarget = hoveredLink || activeLink;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: isHidden ? 0 : 1, y: isHidden ? -100 : 0 }}
      transition={{ duration: isInitialLoad ? 1.2 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        scale,
        willChange: 'transform, opacity'
      }}
      className="fixed top-8 left-0 right-0 mx-auto w-[92%] max-w-[1400px] h-[72px] z-50 hidden lg:flex items-center justify-between px-8 rounded-full"
    >
      {/* Premium Liquid Glass Background */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[rgba(235,213,179,0.2)] overflow-hidden pointer-events-none"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(10, 10, 12, ${v})`),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(150%)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(150%)`),
          boxShadow: useTransform(shadowOpacity, (v) => `0 20px 40px rgba(0,0,0,${v}), inset 0 1px 0 rgba(255,255,255,0.05)`),
          willChange: 'transform, backdrop-filter'
        }}
      >
        {/* Soft internal reflection sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-transparent pointer-events-none" />
      </motion.div>

      <div className="relative z-10 w-full flex items-center justify-between">

        {/* LEFT LINKS */}
        <div className="flex items-center gap-2">
          {NAV_LINKS_LEFT.map((link) => (
            <LinkItem
              key={link}
              link={link}
              isHighlighted={highlightTarget === link.toLowerCase()}
              onHover={() => setHoveredLink(link.toLowerCase())}
              onLeave={() => setHoveredLink(null)}
              onClick={(e) => handleScrollTo(link.toLowerCase(), e)}
            />
          ))}
        </div>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.a
            onClick={(e) => {
              e.preventDefault();
              if (routeLocation.pathname === '/') {
                handleScrollTo('hero', e);
              } else {
                navigate('/', 'overlay');
              }
            }}
            whileHover="hover"
            className="group relative flex items-center justify-center px-8 py-3 rounded-full cursor-pointer"
          >
            {/* Liquid Glass Pill Accent */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[rgba(235,213,179,0.02)] border border-[rgba(235,213,179,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden"
              variants={{
                hover: { boxShadow: '0 0 20px rgba(235,213,179,0.1)' }
              }}
            >
              {/* Logo Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </motion.div>

            <span className="relative z-10 font-serif text-[#FDFBF7] text-xl md:text-2xl tracking-[0.25em] uppercase group-hover:text-[#EBD5B3] transition-colors duration-500">
              Kingsmen
            </span>
          </motion.a>
        </div>

        {/* RIGHT LINKS + ICONS */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {NAV_LINKS_RIGHT.map((link) => (
              <LinkItem
                key={link}
                link={link}
                isHighlighted={highlightTarget === link.toLowerCase()}
                onHover={() => setHoveredLink(link.toLowerCase())}
                onLeave={() => setHoveredLink(null)}
                onClick={(e) => handleScrollTo(link.toLowerCase(), e)}
              />
            ))}
          </div>

          <div className="w-[1px] h-6 bg-[rgba(235,213,179,0.15)] mx-2" />

          {/* ICONS */}
          <div className="flex items-center gap-3">
            <IconButton Icon={Search} onClick={openSearch} layoutId="search-glass" />
            <IconButton Icon={ShoppingCart} onClick={openCart} layoutId="cart-drawer-bg" />
          </div>
        </div>

      </div>
    </motion.nav>
  );
};

// Extracted Link Component for shared layoutId animation
const LinkItem = ({
  link,
  isHighlighted,
  onHover,
  onLeave,
  onClick
}: {
  link: string;
  isHighlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <a
      href={`#${link.toLowerCase()}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative px-6 py-2.5 flex items-center justify-center cursor-pointer group"
    >
      {/* Liquid Glass Highlight (Active or Hovered) */}
      {isHighlighted && (
        <motion.div
          layoutId="nav-highlight"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="absolute inset-0 rounded-full bg-[rgba(235,213,179,0.08)] border border-[rgba(235,213,179,0.15)] shadow-[0_0_15px_rgba(235,213,179,0.05)]"
          style={{ willChange: "transform" }}
        />
      )}

      <span className={`relative z-10 font-sans text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${isHighlighted ? 'text-[#FDFBF7] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-[#A3A3A3] group-hover:text-[#FDFBF7]'}`}>
        {link}
      </span>
    </a>
  );
};

// Extracted Icon Button Component
const IconButton = ({ Icon, onClick, layoutId }: { Icon: any, onClick: () => void, layoutId?: string }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* Glass Orb Background */}
      <motion.div layoutId={layoutId} className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(235,213,179,0.15)] group-hover:border-[rgba(235,213,179,0.4)] transition-colors duration-500 shadow-[0_4px_10px_rgba(0,0,0,0.3)] pointer-events-none" />

      {/* Light Sweep */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.08)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      </div>

      <Icon className="relative z-10 w-[18px] h-[18px] text-[#A3A3A3] group-hover:text-[#FDFBF7] transition-colors duration-500" strokeWidth={1.5} />
    </motion.button>
  );
};