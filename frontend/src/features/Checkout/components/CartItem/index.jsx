import React from 'react';
import styles from './styles.module.css';

export const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemBrand}>Brand: {item.brand}</p>
        <p className={styles.itemSize}>Size: {item.size}</p>
        {item.addedAt && (
          <p className={styles.addedDate}>Added: {new Date(item.addedAt).toLocaleDateString()}</p>
        )}
      </div>
      
      <div className={styles.itemControls}>
        <div className={styles.quantityControls}>
          <button 
            className={styles.quantityBtn}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button 
            className={styles.quantityBtn}
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
        
        <div className={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
          {item.quantity > 1 && (
            <span className={styles.unitPrice}>(${item.price.toFixed(2)} each)</span>
          )}
        </div>
        
        <button 
          className={styles.removeBtn}
          onClick={() => onRemove(item.id)}
          title="Remove item"
        >
          ×
        </button>
      </div>
    </div>
  );
};
