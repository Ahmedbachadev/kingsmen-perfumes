import React from 'react';
import { MapPin } from 'lucide-react';
import type { CustomerAddress } from '../../orders/types/order';

interface Props {
  addresses?: CustomerAddress[];
}

export const CustomerAddresses: React.FC<Props> = ({ addresses = [] }) => {
  if (addresses.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Addresses</h3>
        <p className="text-sm text-neutral-500">No addresses on file.</p>
      </div>
    );
  }

  // Group addresses by uniqueness or just display them all (in reality a customer might have same address duplicated if guest checkout used multiple times, but let's just list them)
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-neutral-400" />
        Addresses ({addresses.length})
      </h3>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
        {addresses.map((address, index) => (
          <div key={address.id || index} className="p-4 rounded-lg border border-neutral-100 bg-neutral-50 relative">
            {index === 0 && (
              <span className="absolute top-4 right-4 bg-neutral-900 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
            <p className="font-medium text-neutral-900 text-sm mb-1">
              {address.first_name} {address.last_name}
              {address.company && <span className="text-neutral-500 font-normal"> ({address.company})</span>}
            </p>
            <p className="text-sm text-neutral-600">
              {address.address1}
              {address.address2 && <>, {address.address2}</>}
            </p>
            <p className="text-sm text-neutral-600">
              {address.city}{address.province ? `, ${address.province}` : ''} {address.postal_code}
            </p>
            <p className="text-sm text-neutral-600">{address.country}</p>
            {address.phone && (
              <p className="text-sm text-neutral-500 mt-2">Phone: {address.phone}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
