import { supabase } from '../lib/supabase';
import type { CheckoutFormData } from '../utils/validation/checkoutSchema';
import type { CartItemType } from '../contexts/CartContext';

export interface CreatedOrderResult {
  id: string;
  orderNumber: string;
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: any;
  createdAt: string;
}

export class CheckoutService {
  /**
   * Submit Cash on Delivery order to Supabase
   */
  static async placeCodOrder(
    formData: CheckoutFormData,
    cartItems: CartItemType[],
    subtotal: number,
    shippingFee: number,
    totalAmount: number,
    orderPrefix: string = 'KM-'
  ): Promise<CreatedOrderResult> {
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Your cart is empty. Please add items before checking out.');
    }

    // 1. Generate unique order number (e.g. KM-849201)
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const prefix = orderPrefix.endsWith('-') ? orderPrefix : `${orderPrefix}-`;
    const orderNumber = `${prefix}${randomCode}`;

    // 2. Format Address Object
    const shippingAddress = {
      name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      province: formData.province.trim(),
      city: formData.city.trim(),
      area: formData.area.trim(),
      line1: formData.streetAddress.trim(),
      postal_code: formData.postalCode.trim() || null,
      country: 'Pakistan'
    };

    const customerEmail = formData.email.trim() || `${formData.phone.replace(/\D/g, '')}@guest.kingsmen.com`;

    // 3. Create Order Row
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: formData.fullName.trim(),
        customer_email: customerEmail,
        customer_phone: formData.phone.trim(),
        shipping_address: shippingAddress as any,
        billing_address: shippingAddress as any,
        subtotal: subtotal,
        shipping_cost: shippingFee,
        shipping: shippingFee,
        discount: 0,
        tax: 0,
        total_amount: totalAmount,
        total: totalAmount,
        order_status: 'pending',
        status: 'pending',
        payment_status: 'pending',
        fulfillment_status: 'unfulfilled',
        private_notes: formData.notes?.trim() ? `Customer Note: ${formData.notes.trim()}` : null,
        notes: formData.notes?.trim() ? `Customer Note: ${formData.notes.trim()}` : null
      } as any)
      .select()
      .single();

    if (orderError || !newOrder) {
      console.error('Order creation error:', orderError);
      throw new Error(orderError?.message || 'Failed to create order. Please try again.');
    }

    const createdOrder = newOrder as any;

    // 4. Create Order Items
    const orderItemsPayload = cartItems.map((item) => {
      const unitPrice = parseFloat(item.priceRange?.minVariantPrice?.amount || '0');
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);

      return {
        order_id: createdOrder.id,
        product_id: isUuid ? item.id : null,
        variant_id: null,
        product_name: item.title,
        variant_name: null,
        sku: item.handle || null,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: unitPrice * item.quantity
      };
    });

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsPayload as any);

    if (itemsError) {
      console.error('Order items insertion error:', itemsError);
      // We don't throw here to avoid failing user after order row is created, but log error
    }

    // 5. Create Timeline Event
    try {
      await supabase.from('order_timeline').insert({
        order_id: createdOrder.id,
        status_type: 'order_status',
        status_value: 'pending',
        note: 'Order placed via Cash on Delivery'
      } as any);
    } catch (timelineErr) {
      console.warn('Failed to add order timeline record:', timelineErr);
    }

    // 6. Reduce Product Inventory
    for (const item of cartItems) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
      if (isUuid) {
        try {
          const { data: prod } = await supabase
            .from('products')
            .select('inventory')
            .eq('id', item.id)
            .single();

          if (prod && typeof (prod as any).inventory === 'number') {
            const currentInv = (prod as any).inventory;
            const updatedInv = Math.max(0, currentInv - item.quantity);
            await supabase
              .from('products')
              .update({ inventory: updatedInv } as any)
              .eq('id', item.id);
          }
        } catch (invErr) {
          console.warn(`Could not update inventory for product ${item.id}:`, invErr);
        }
      }
    }

    return {
      id: createdOrder.id,
      orderNumber: createdOrder.order_number,
      totalAmount: createdOrder.total_amount,
      customerName: createdOrder.customer_name,
      customerPhone: createdOrder.customer_phone,
      customerEmail: createdOrder.customer_email,
      shippingAddress: shippingAddress,
      createdAt: createdOrder.created_at
    };
  }
}
