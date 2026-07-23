import { supabase } from '../../../lib/supabase';
import type { CheckoutFormData } from '../validation/checkoutSchema';
import type { CartItemType } from '../../../contexts/CartContext';

export const checkoutService = {
  async placeOrder(data: CheckoutFormData, cartItems: CartItemType[], subtotal: number, shipping: number, total: number) {
    try {
      // 1. Generate Order Number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

      // 2. Check if customer exists by phone or email
      let customerId = null;
      const emailToCheck = data.email || `${data.phone}@guest.kingsmen.local`;
      
      const { data: existingCustomers, error: searchError } = await supabase
        .from('customers')
        .select('id')
        .or(`email.eq.${emailToCheck},phone.eq.${data.phone}`);

      if (!searchError && existingCustomers && existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
        
        // Optionally update the existing customer's name if they changed it
        await supabase
          .from('customers')
          .update({
            first_name: data.firstName,
            last_name: data.lastName,
          })
          .eq('id', customerId);
          
      } else {
        // Create new customer
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .insert({
            first_name: data.firstName,
            last_name: data.lastName,
            email: emailToCheck,
            phone: data.phone,
            status: 'active', // Adding default CRM status
          })
          .select()
          .single();
          
        if (customerError) {
          console.error('Error creating customer:', customerError);
        } else {
          customerId = customer.id;
        }
      }

      // 3. Create Shipping Address first to link to order
      let addressId = null;
      if (customerId) {
        const { data: addressData, error: addressError } = await supabase
          .from('customer_addresses')
          .insert({
            customer_id: customerId,
            first_name: data.firstName,
            last_name: data.lastName,
            address1: data.address1,
            address2: data.area,
            city: data.city,
            province: data.province,
            postal_code: data.postalCode || '',
            country: 'Pakistan',
            phone: data.phone,
          })
          .select('id')
          .single();
          
        if (addressError) {
          console.error('Error saving address:', addressError);
        } else if (addressData) {
          addressId = addressData.id;
        }
      }

      // 4. Create Order linked to Address
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_id: customerId,
          shipping_address_id: addressId,
          billing_address_id: addressId,
          status: 'pending',
          payment_status: 'pending',
          fulfillment_status: 'unfulfilled',
          subtotal,
          shipping,
          discount: 0,
          tax: 0,
          total,
          notes: 'Payment Method: Cash on Delivery',
        })
        .select()
        .single();

      if (orderError) throw new Error(`Failed to create order: ${orderError.message}`);

      // 5. Create Order Items and decrease inventory
      const orderItems = cartItems.map(item => {
        const price = parseFloat(item.priceRange?.minVariantPrice.amount || '0');
        return {
          order_id: order.id,
          product_id: item.id,
          product_name: item.title,
          sku: item.handle || '',
          price: price,
          quantity: item.quantity,
          total: price * item.quantity
        };
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw new Error(`Failed to create order items: ${itemsError.message}`);

      // 6. Update Inventory (Sequential)
      for (const item of cartItems) {
        const { data: currentProduct } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single();
          
        if (currentProduct) {
          await supabase
            .from('products')
            .update({ stock: Math.max(0, currentProduct.stock - item.quantity) })
            .eq('id', item.id);
        }
      }

      return { success: true, orderId: order.id, orderNumber };
    } catch (error: any) {
      console.error('Checkout error:', error);
      throw new Error(error.message || 'An unexpected error occurred during checkout.');
    }
  }
};
