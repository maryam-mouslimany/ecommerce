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
  
  // Debug: Log the product data structure
  console.log('Card component product data:', product);

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
      id: product?.id || Date.now(),
      title,
      price,
      image: perfumeImg,
      // Add complete product information for cart
      brand: product?.brand?.name || 'Unknown',
      size: product?.variants?.[0]?.size_ml ? `${product.variants[0].size_ml}ml` : 'N/A',
      product: product // Store full product object for future reference
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
        
        {/* Brand Information */}
        <div className={styles.info}>
          <Caption 
            caption={`Brand: ${product?.brand?.name || 'Unknown'}`} 
            variant="small"
          />
        </div>
        
        {/* Size Information */}
        <div className={styles.info}>
          <Caption 
            caption={`Size: ${product?.variants?.[0]?.size_ml ? `${product.variants[0].size_ml}ml` : 'N/A'}`}
            variant="small"
          />
        </div>
        
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
