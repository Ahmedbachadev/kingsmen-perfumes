export type ExportEntity = 'Products' | 'Orders' | 'Customers' | 'Inventory' | 'Collections' | 'Newsletter' | 'Sales Reports' | 'Financial Reports';

export type ExportFormat = 'CSV' | 'Excel' | 'PDF';

export type ExportStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed';

export type DateRangePreset = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'all';

export interface ExportJob {
 id: string;
 entity: ExportEntity;
 format: ExportFormat;
 status: ExportStatus;
 filename: string;
 createdAt: string;
 completedAt?: string;
 blobUrl?: string; // Stored object URL for the frontend download simulation
 error?: string;
 filters?: {
 dateRangePreset?: DateRangePreset;
 customFilter?: string;
 };
}
