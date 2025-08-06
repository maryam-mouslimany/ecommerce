import { FaCheckCircle } from "react-icons/fa";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../contexts/AuthContext";

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  console.log('OrderConfirmation page loaded - isAuthenticated:', isAuthenticated, 'user:', user);

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.icon} />
      <h2 className={styles.title}>Your Order Is Completed!</h2>
      <p className={styles.description}>
        Thank you for your order! Your order is being processed and will be
        completed within 3–6 hours. You will receive an email confirmation when
        your order is completed.
      </p>
      <Button
        onClick={handleContinueShopping}
        variant="primary"
        label=" Continue Shopping"
      />
    </div>
  );
};
