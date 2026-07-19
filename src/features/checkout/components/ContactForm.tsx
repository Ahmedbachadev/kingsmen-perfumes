import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormData } from '../validation/checkoutSchema';

interface Props {
  form: UseFormReturn<CheckoutFormData>;
}

export const ContactForm: React.FC<Props> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.firstName ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Ahmed"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.lastName ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Khan"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.phone ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="03001234567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.email ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="ahmed@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
