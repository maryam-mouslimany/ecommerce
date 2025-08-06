import api from './api';
import { getLocalCart } from './cartService';
import { productService } from './productService';

export const checkoutService = {
  // Submit checkout order
  async checkout(formData) {
    try {
      // Get cart items from localStorage
      const cartItems = getLocalCart();
      
      // Fetch product details to get variant IDs
      const cartItemsWithVariants = await Promise.all(
        cartItems.map(async (item) => {
          try {
            // Get product details including variants
            const productDetails = await productService.getProductById(item.id);
            
            // Use the first available variant ID, or fallback to product ID
            const variantId = productDetails.variants && productDetails.variants.length > 0
              ? productDetails.variants[0].id
              : item.id;
              
            return {
              product_variant_id: variantId,
              quantity: item.quantity
            };
          } catch (error) {
            console.warn(`Failed to fetch variants for product ${item.id}, using product ID as variant ID:`, error);
            // Fallback to using product ID as variant ID
            return {
              product_variant_id: item.id,
              quantity: item.quantity
            };
          }
        })
      );
      
      // Prepare payload for the API
      const payload = {
        // Cart items with proper variant IDs
        cart_items: cartItemsWithVariants,
        
        // Shipping address
        shipping_address: {
          line1: formData.address,
          line2: formData.apartment,
          city: formData.city,
          region: '', // Not collected in current form
          country: formData.country,
          postal_code: formData.postalCode
        }
      };

      console.log('Checkout API Request:', payload);
      
      const response = await api.post('/v1/user/checkout', payload);
      
      console.log('Checkout API Response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Checkout API Error:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      throw error.response?.data || { message: 'Checkout failed' };
    }
  }
};

export default checkoutService;
