import styles from "./index.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { addItemToLocalCart } from "../../../../services/cartService";
import { useAuth } from "../../../../contexts/AuthContext";

export const CardDetails = ({ product }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleChange = (e) => {
    setSelectedVariantId(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    console.log('CardDetails handleAddToCart called');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    if (!selectedVariantId) {
      console.log('No variant selected');
      alert('Please select a variant before adding to cart');
      return;
    }

    console.log('User is authenticated, proceeding with add to cart');
    setIsAddingToCart(true);

    try {
      const selectedVariant = product.variants.find(
        (v) => v.id === selectedVariantId
      );
      
      const cartItem = {
        id: `${product.id}-${selectedVariantId}`, // Unique ID for this product-variant combination
        productId: product.id,
        variantId: selectedVariantId,
        title: product.name,
        name: product.name,
        price: selectedVariant.price,
        brand: product?.brand?.name || 'Unknown',
        size: selectedVariant?.size_ml ? `${selectedVariant.size_ml}ml` : 'N/A',
        image: product.images?.[0]?.url || null,
        product: product, // Keep full product reference
        selectedVariant: selectedVariant
      };
      
      console.log('Cart item to add:', cartItem);
      addItemToLocalCart(cartItem);
      console.log('Product successfully added to cart');
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert('Error adding product to cart!');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );
  const mainImage = product.images && product.images.length > 0 ? product.images[0].url : null;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {mainImage ? (
          <img src={mainImage} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.placeholderImage}>No Image Available</div>
        )}
      </div>

      <div className={styles.right}>
        <h2 className={styles.name}>{product.name}</h2>
        {product.brand && (
          <p>
            <strong>Brand:</strong> {product.brand.name}
          </p>
        )}
        {product.category && (
          <p>
            <strong>Category:</strong> {product.category.name}
          </p>
        )}
        <p>
          <strong>Gender:</strong> {product.gender || 'Not specified'}
        </p>

        <div className={styles.variants}>
          <h3>Select Size:</h3>
          {product.variants.map((variant) => (
            <label key={variant.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="variant"
                value={variant.id}
                checked={selectedVariantId === variant.id}
                onChange={handleChange}
              />
              {variant.size_ml}ml — <strong>${variant.price}</strong> (
              {variant.stock} in stock)
            </label>
          ))}
        </div>

        {product.accords && product.accords.length > 0 && (
          <div className={styles.accords}>
            <h3>Accords:</h3>
            <p>{product.accords.map((a) => a.name).join(", ")}</p>
          </div>
        )}

        {product.description && (
          <div className={styles.description}>
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>
        )}

        <div className={styles.cartSection}>
          {selectedVariant && (
            <div className={styles.selectedPrice}>
              <h3>Price: ${selectedVariant.price}</h3>
            </div>
          )}
          
          <Button 
            onClick={handleAddToCart}
            disabled={isAddingToCart || !selectedVariant || selectedVariant.stock === 0}
            variant="primary"
            label={isAddingToCart ? "Adding..." : "Add to Cart"}
          />
        </div>
      </div>
    </div>
  );
};
