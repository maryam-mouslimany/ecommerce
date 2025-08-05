import React from 'react';
import { Button } from '../../../../components/Button';
import { CartItem } from '../CartItem';
import styles from './styles.module.css';
import perfumeImg from '../../../../assets/images/perfume.jpg';

export const OrderSummary = ({ onCheckout }) => {
  // Mock cart data - in real app this would come from state/context
  const cartItems = [
    {
      id: 1,
      name: "Name of the perfum",
      brand: "Chanel",
      size: "300ml",
      price: 32.00,
      image: perfumeImg
    },
    {
      id: 2,
      name: "Name of the perfum",
      brand: "Chanel",
      size: "300ml",
      price: 32.00,
      image: perfumeImg
    },
    {
      id: 3,
      name: "Name of the perfum",
      brand: "Chanel",
      size: "300ml",
      price: 32.00,
      image: perfumeImg
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.orderSummary}>
      <h2 className={styles.title}>Order Summary</h2>
      
      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>total</span>
        <span className={styles.totalAmount}>${total.toFixed(2)}</span>
      </div>

      <div className={styles.checkoutButton}>
        <Button
          label="Proceed To Checkout"
          variant="primary"
          onClick={onCheckout}
        />
      </div>
    </div>
  );
}; 