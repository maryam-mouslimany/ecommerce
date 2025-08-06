import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";
import { checkoutService } from "../../services/checkoutService";
import { clearLocalCart } from "../../services/cartService";
import styles from "./styles.module.css";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fullName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await checkoutService.checkout(formData);

      if (response.success) {
        // Clear the cart from localStorage
        clearLocalCart();

        // Navigate to the order confirmation page
        navigate("/order-confirmation");
      } else {
        setError(response.message || "Checkout failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.pageTitle}>
        <h1>Checkout Page</h1>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.formSection}>
          <CheckoutForm formData={formData} onInputChange={handleInputChange} />
        </div>

        <div className={styles.summarySection}>
          <OrderSummary onCheckout={handleCheckout} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
