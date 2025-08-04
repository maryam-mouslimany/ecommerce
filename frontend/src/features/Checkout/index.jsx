import React, { useState } from 'react';
import Header from '../../components/Header';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import styles from './styles.module.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    fullName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with:', formData);
  };

  return (
    <div className={styles.checkoutPage}>
      <Header />
      
      <div className={styles.pageTitle}>
        <h1>Checkout Page</h1>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.formSection}>
          <CheckoutForm 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </div>
        
        <div className={styles.summarySection}>
          <OrderSummary onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 