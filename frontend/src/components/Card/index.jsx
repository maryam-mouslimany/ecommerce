import styles from "./index.module.css";
import { Button } from "../Button";
import { FaShoppingCart } from "react-icons/fa";
import { Caption } from "../Caption";
import perfumeImg from "../../assets/images/perfume.jpg";
import { addItemToLocalCart } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Card = ({ title, price, onViewMore, product }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log('handleAddToCart called');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    console.log('User is authenticated, proceeding with add to cart');
    const productData = {
      id: product?.id || Date.now(), // fallback ID if product object not available
      title,
      price,
      image: perfumeImg // using default image for now
    };
    
    console.log('Product data to add:', productData);
    try {
      addItemToLocalCart(productData);
      console.log('Product successfully added to cart:', productData);
      // Optionally, you could add a toast notification here instead of alert
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Optionally, you could add an error toast notification here instead of alert
    }
  };

  return (
    <div className={styles.card}>
      <img src={perfumeImg} alt="Perfume" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <Caption variant="big" caption={price} />
        <div className={styles.actions}>
          <Button
            label="Add to cart"
            variant="primary"
            iconLeft={<FaShoppingCart />}
            onClick={handleAddToCart}
          />
          <button
            type="button"
            className={styles.linkButton}
            onClick={onViewMore}
          >
            <Caption caption="view more" />
          </button>
        </div>
      </div>
    </div>
  );
};
