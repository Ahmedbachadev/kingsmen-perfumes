export interface MarketingKPIs {
 activeCampaigns: number;
 activeCoupons: number;
 newsletterSubscribers: number;
 featuredProducts: number;
 featuredCollections: number;
 homepagePromotions: number;
}

export type ActivityType = 'campaign' | 'coupon' | 'newsletter';

export interface MarketingActivityItem {
 id: string;
 type: ActivityType;
 title: string;
 description: string;
 timestamp: string;
}

export interface MarketingAction {
 id: string;
 title: string;
 description: string;
 icon: string; // We'll map this to a Lucide component in the UI
 action: () => void;
}
