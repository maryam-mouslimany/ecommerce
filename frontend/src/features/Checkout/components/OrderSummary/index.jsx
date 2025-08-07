import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { CartItem } from '../CartItem';
import styles from './styles.module.css';
import { getLocalCart, removeItemFromLocalCart, updateLocalCartItemQuantity } from '../../../../services/cartService';

export const OrderSummary = ({ onCheckout, loading: checkoutLoading = false }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const cart = getLocalCart();
      // Transform localStorage cart items to match expected format
      const transformedItems = cart.map(item => {
        console.log('Processing cart item:', item);
        
        // Handle price parsing safely
        let parsedPrice = 0;
        if (item.price) {
          if (typeof item.price === 'string') {
            // Remove currency symbols and parse
            parsedPrice = parseFloat(item.price.replace(/[$,]/g, '')) || 0;
          } else if (typeof item.price === 'number') {
            parsedPrice = item.price;
          }
        }
        
        console.log('Parsed price:', parsedPrice);
        
        return {
          id: item.id,
          name: item.title || item.name || 'Unknown Product',
          brand: item.brand || 'Unknown', // Use stored brand information
          size: item.size || 'N/A', // Use stored size information
          price: parsedPrice,
          quantity: item.quantity || 1,
          image: item.image,
          addedAt: item.addedAt
        };
      });
      setCartItems(transformedItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeItemFromLocalCart(itemId);
    loadCartItems(); // Reload cart items
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateLocalCartItemQuantity(itemId, newQuantity);
    loadCartItems(); // Reload cart items
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className={styles.orderSummary}>
        <h2 className={styles.title}>Order Summary</h2>
        <div className={styles.loading}>Loading cart items...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.orderSummary}>
        <h2 className={styles.title}>Order Summary</h2>
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.orderSummary}>
      <h2 className={styles.title}>Order Summary</h2>
      
      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
        <span className={styles.totalAmount}>${total.toFixed(2)}</span>
      </div>

      <div className={styles.checkoutButton}>
        <Button
          label={checkoutLoading ? "Processing..." : "Proceed To Checkout"}
          variant="primary"
          onClick={onCheckout}
          disabled={cartItems.length === 0 || checkoutLoading}
        />
      </div>
    </div>
  );
}; 