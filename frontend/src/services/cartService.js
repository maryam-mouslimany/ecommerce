import api from './api';

export const cartService = {
  // Add item to cart
  addToCart: async (cartData) => {
    try {
      const response = await api.post('/v1/cart/add', cartData);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Get cart items
  getCart: async () => {
    try {
      const response = await api.get('/v1/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/v1/cart/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/v1/cart/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await api.delete('/v1/cart/clear');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

// LocalStorage cart management functions
export const addItemToLocalCart = (product) => {
  console.log('addItemToLocalCart called with product:', product);
  
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Current cart:', cart);
    
    const existingItem = cart.find(item => item.id === product.id);
    console.log('Existing item found:', existingItem);
    
    if (existingItem) {
      existingItem.quantity += 1;
      console.log('Updated existing item quantity:', existingItem.quantity);
    } else {
      const newItem = { ...product, quantity: 1, addedAt: new Date().toISOString() };
      cart.push(newItem);
      console.log('Added new item to cart:', newItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart successfully updated:', cart);
    console.log('localStorage cart:', localStorage.getItem('cart'));
  } catch (error) {
    console.error('Error in addItemToLocalCart:', error);
    throw error;
  }
};

// Get cart items from localStorage
export const getLocalCart = () => {
  try {
    const cartData = localStorage.getItem('cart');
    console.log('Raw localStorage cart data:', cartData);
    
    if (!cartData) {
      console.log('No cart data found in localStorage');
      return [];
    }
    
    const parsedCart = JSON.parse(cartData);
    console.log('Parsed cart data:', parsedCart);
    console.log('Cart item count:', parsedCart.length);
    
    // Validate each item
    parsedCart.forEach((item, index) => {
      console.log(`Cart item ${index}:`, {
        id: item.id,
        title: item.title,
        price: item.price,
        priceType: typeof item.price,
        quantity: item.quantity
      });
    });
    
    return parsedCart;
  } catch (error) {
    console.error('Error parsing cart data from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('cart');
    return [];
  }
};

// Remove item from localStorage cart
export const removeItemFromLocalCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

// Update item quantity in localStorage cart
export const updateLocalCartItemQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      return removeItemFromLocalCart(productId);
    }
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

// Clear localStorage cart
export const clearLocalCart = () => {
  localStorage.removeItem('cart');
};

// Get cart item count from localStorage
export const getLocalCartItemCount = () => {
  const cart = getLocalCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
