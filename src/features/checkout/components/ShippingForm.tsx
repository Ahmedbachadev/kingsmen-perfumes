import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormData } from '../validation/checkoutSchema';

interface Props {
  form: UseFormReturn<CheckoutFormData>;
}

export const ShippingForm: React.FC<Props> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-900">Shipping Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-neutral-700 mb-1">
            Province
          </label>
          <select
            id="province"
            {...register('province')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow bg-white ${
              errors.province ? 'border-red-500' : 'border-neutral-300'
            }`}
          >
            <option value="">Select Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad">Islamabad Capital Territory</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            <option value="AJK">Azad Kashmir</option>
          </select>
          {errors.province && (
            <p className="mt-1 text-sm text-red-500">{errors.province.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            {...register('city')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.city ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Lahore"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-neutral-700 mb-1">
            Area / Society
          </label>
          <input
            id="area"
            type="text"
            {...register('area')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.area ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="DHA Phase 5"
          />
          {errors.area && (
            <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700 mb-1">
            Postal Code <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            id="postalCode"
            type="text"
            {...register('postalCode')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow ${
              errors.postalCode ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="54000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address1" className="block text-sm font-medium text-neutral-700 mb-1">
          Street Address
        </label>
        <textarea
          id="address1"
          {...register('address1')}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none transition-shadow resize-none ${
            errors.address1 ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="House/Apartment #, Street name"
        />
        {errors.address1 && (
          <p className="mt-1 text-sm text-red-500">{errors.address1.message}</p>
        )}
      </div>
    </div>
  );
};
