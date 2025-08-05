import React from 'react';
import styles from './styles.module.css';

export const CartItem = ({ item }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemBrand}>Brand: {item.brand}</p>
        <p className={styles.itemSize}>Size: {item.size}</p>
      </div>
      
      <div className={styles.itemPrice}>
        ${item.price.toFixed(2)}
      </div>
    </div>
  );
}; 