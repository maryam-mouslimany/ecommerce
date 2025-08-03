import React from 'react';
import { InputField } from '../../../../components/InputField';
import styles from './styles.module.css';

export const CheckoutForm = ({ formData, onInputChange }) => {
  const handleChange = (name) => (e) => {
    onInputChange(name, e.target.value);
  };

  return (
    <div className={styles.checkoutForm}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact Information</h2>
        <InputField
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="e.g. +1555 123 4567"
          value={formData.phoneNumber}
          onChange={handleChange('phoneNumber')}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping address</h2>
        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="e.g. John Doe"
          value={formData.fullName}
          onChange={handleChange('fullName')}
        />
        <InputField
          label="Address"
          type="text"
          name="address"
          placeholder="e.g. 123 Main St"
          value={formData.address}
          onChange={handleChange('address')}
        />
        <InputField
          label="Appartment"
          type="text"
          name="apartment"
          placeholder="e.g. Apt. 12B"
          value={formData.apartment}
          onChange={handleChange('apartment')}
        />
        <InputField
          label="City"
          type="text"
          name="city"
          placeholder="e.g. New York"
          value={formData.city}
          onChange={handleChange('city')}
        />
        <InputField
          label="Country"
          type="text"
          name="country"
          placeholder="e.g. United States"
          value={formData.country}
          onChange={handleChange('country')}
        />
        <InputField
          label="Postal code"
          type="text"
          name="postalCode"
          placeholder="e.g. 10001"
          value={formData.postalCode}
          onChange={handleChange('postalCode')}
        />
      </div>
    </div>
  );
}; 