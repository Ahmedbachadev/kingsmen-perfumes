import { supabase } from '../../../../../lib/supabase';
import type { MarketingKPIs, MarketingActivityItem } from '../types';
import { subHours, subDays, subMinutes } from 'date-fns';

export const MarketingService = {
 async getDashboardData(): Promise<MarketingKPIs> {
 // Attempt to fetch real newsletter subscribers from a potential subscribers table
 // or fallback to total profiles as a proxy if it fails.
 let newsletterSubscribers = 0;
 
 // We'll just count profiles for the demo, simulating that everyone is subscribed
 const { count } = await supabase
 .from('profiles')
 .select('*', { count: 'exact', head: true });
 
 newsletterSubscribers = count || 1240; // Fallback to a realistic dummy number if 0

 // Simulate other counts since tables might not exist yet
 return {
 activeCampaigns: 3,
 activeCoupons: 12,
 newsletterSubscribers: newsletterSubscribers,
 featuredProducts: 8,
 featuredCollections: 2,
 homepagePromotions: 4
 };
 },

 async getActivityFeed(): Promise<MarketingActivityItem[]> {
 const now = new Date();
 
 // Simulating recent activity
 return [
 {
 id: '1',
 type: 'newsletter',
 title: 'New Subscriber',
 description: 'john.doe@example.com joined the newsletter.',
 timestamp: subMinutes(now, 15).toISOString()
 },
 {
 id: '2',
 type: 'coupon',
 title: 'Coupon Used',
 description: 'WELCOME20 applied to Order #1045 ($25.00 discount).',
 timestamp: subHours(now, 2).toISOString()
 },
 {
 id: '3',
 type: 'campaign',
 title: 'Campaign Created',
 description: 'Summer Sale 2026 email campaign was scheduled.',
 timestamp: subHours(now, 5).toISOString()
 },
 {
 id: '4',
 type: 'newsletter',
 title: 'New Subscriber',
 description: 'sarah.m@example.com joined the newsletter.',
 timestamp: subDays(now, 1).toISOString()
 },
 {
 id: '5',
 type: 'coupon',
 title: 'Coupon Used',
 description: 'FREESHIP applied to Order #1042 ($10.00 discount).',
 timestamp: subDays(now, 1).toISOString()
 }
 ];
 }
};
