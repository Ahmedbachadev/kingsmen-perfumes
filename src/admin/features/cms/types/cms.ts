export interface CMSHero {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  isVisible: boolean;
}

export interface CMSAboutFeature {
  id: string;
  title: string;
  description: string;
}

export interface CMSAbout {
  title: string;
  description: string;
  features: CMSAboutFeature[];
  buttonText: string;
  buttonLink: string;
}

export interface CMSCollection {
  id: string; // 'signature' | 'gentlemen' | 'ladies' | 'unisex'
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isVisible: boolean;
}

export interface CMSFaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export interface CMSNewsletter {
  title: string;
  description: string;
  successMessage: string;
}

export interface CMSFooter {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  copyright: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
  };
}

export interface CMSSeo {
  homepageTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}

export interface SiteConfig {
  hero: CMSHero;
  about: CMSAbout;
  collections: Record<string, CMSCollection>;
  faq: CMSFaqItem[];
  newsletter: CMSNewsletter;
  footer: CMSFooter;
  seo: CMSSeo;
}

// Default values so the frontend always has something to display
export const defaultSiteConfig: SiteConfig = {
  hero: {
    title: 'Discover The Essence Of True Luxury',
    subtitle: 'Meticulously crafted fragrances that leave an unforgettable impression.',
    primaryButtonText: 'Explore Collections',
    primaryButtonLink: '/products',
    secondaryButtonText: 'Our Story',
    secondaryButtonLink: '#about',
    isVisible: true
  },
  about: {
    title: 'The Kingsmen Difference',
    description: 'We believe that a fragrance is more than just a scent; it is an extension of your persona. Our master perfumers blend rare, ethically sourced ingredients to create olfactory masterpieces that stand the test of time.',
    features: [
      { id: '1', title: 'Exquisite Ingredients', description: 'Sourced from the finest growers worldwide.' },
      { id: '2', title: 'Master Craftsmanship', description: 'Blended by award-winning perfumers.' },
      { id: '3', title: 'Long-lasting', description: 'Extrait de Parfum concentration for maximum longevity.' }
    ],
    buttonText: 'Read Our Story',
    buttonLink: '/about'
  },
  collections: {
    signature: {
      id: 'signature',
      title: 'Signature Collection',
      description: 'Our most prestigious fragrances, designed for those who demand nothing but the absolute best.',
      buttonText: 'Discover Signature',
      buttonLink: '/products?collection=signature',
      isVisible: true
    },
    gentlemen: {
      id: 'gentlemen',
      title: 'Gentlemen Collection',
      description: 'Bold, sophisticated, and undeniably masculine. Fragrances that command respect.',
      buttonText: 'Shop Gentlemen',
      buttonLink: '/products?collection=gentlemen',
      isVisible: true
    },
    ladies: {
      id: 'ladies',
      title: 'Ladies Collection',
      description: 'Elegant, alluring, and timelessly feminine. Discover your signature scent.',
      buttonText: 'Shop Ladies',
      buttonLink: '/products?collection=ladies',
      isVisible: true
    },
    unisex: {
      id: 'unisex',
      title: 'Unisex Collection',
      description: 'Perfectly balanced fragrances that transcend gender boundaries.',
      buttonText: 'Shop Unisex',
      buttonLink: '/products?collection=unisex',
      isVisible: true
    }
  },
  faq: [
    {
      id: '1',
      question: 'What is the concentration of your fragrances?',
      answer: 'All our fragrances are Extrait de Parfum, featuring the highest concentration of fragrance oils (20-30%) for maximum longevity and sillage.',
      sortOrder: 1,
      isActive: true
    },
    {
      id: '2',
      question: 'How long do the fragrances last?',
      answer: 'Our Extrait de Parfums typically last 8-12 hours on the skin, and can linger for days on clothing.',
      sortOrder: 2,
      isActive: true
    },
    {
      id: '3',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship our exquisite fragrances worldwide. Shipping times and costs vary depending on the destination.',
      sortOrder: 3,
      isActive: true
    }
  ],
  newsletter: {
    title: 'Join The Inner Circle',
    description: 'Subscribe to receive exclusive access to new releases, private events, and insider content.',
    successMessage: 'Thank you for joining. Welcome to the Inner Circle.'
  },
  footer: {
    companyName: 'Kingsmen Perfumes',
    address: '123 Luxury Avenue, Suite 100, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'concierge@kingsmen.com',
    copyright: '© 2026 Kingsmen Perfumes. All rights reserved.',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      tiktok: 'https://tiktok.com'
    }
  },
  seo: {
    homepageTitle: 'Kingsmen Perfumes | Discover True Luxury',
    metaDescription: 'Meticulously crafted Extrait de Parfum fragrances. Explore our Signature, Gentlemen, Ladies, and Unisex collections.',
    keywords: 'luxury perfumes, extrait de parfum, fragrances, kingsmen',
    ogImage: 'https://kingsmen.com/og-image.jpg'
  }
};
