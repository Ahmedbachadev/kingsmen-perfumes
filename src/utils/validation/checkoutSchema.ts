export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  area: string;
  streetAddress: string;
  postalCode: string;
  notes?: string;
}

export interface CheckoutFormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  province?: string;
  city?: string;
  area?: string;
  streetAddress?: string;
  postalCode?: string;
}

export function validateCheckoutForm(
  data: CheckoutFormData,
  config?: { requireEmail?: boolean; requirePostalCode?: boolean }
): { isValid: boolean; errors: CheckoutFormErrors } {
  const errors: CheckoutFormErrors = {};

  // Full Name
  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // Phone
  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    // Remove non-digit characters to test length
    const digitsOnly = data.phone.replace(/\D/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      errors.phone = 'Please enter a valid phone number (8-15 digits)';
    }
  }

  // Email (Required if config.requireEmail is true, otherwise optional but validated if provided)
  if (config?.requireEmail && (!data.email || !data.email.trim())) {
    errors.email = 'Email address is required by store policy';
  } else if (data.email && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Province
  if (!data.province || !data.province.trim()) {
    errors.province = 'Province / State is required';
  }

  // City
  if (!data.city || !data.city.trim()) {
    errors.city = 'City is required';
  }

  // Area
  if (!data.area || !data.area.trim()) {
    errors.area = 'Area / Neighborhood is required';
  }

  // Street Address
  if (!data.streetAddress || !data.streetAddress.trim()) {
    errors.streetAddress = 'Street address is required';
  }

  // Postal Code (Required if config.requirePostalCode is true)
  if (config?.requirePostalCode && (!data.postalCode || !data.postalCode.trim())) {
    errors.postalCode = 'Postal code is required by store policy';
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
