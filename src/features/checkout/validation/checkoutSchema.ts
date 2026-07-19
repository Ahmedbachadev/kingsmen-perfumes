import { z } from 'zod';

export const checkoutSchema = z.object({
  // Contact Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().regex(/^(\+92|03|923)\d{9}$/, 'Please enter a valid Pakistani phone number (e.g., 03001234567)'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),

  // Shipping Address
  province: z.string().min(2, 'Province is required'),
  city: z.string().min(2, 'City is required'),
  area: z.string().min(2, 'Area is required'),
  address1: z.string().min(5, 'Street address is required'),
  postalCode: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
