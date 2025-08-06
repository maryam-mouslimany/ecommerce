import styles from "./index.module.css";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { cartService } from "../../../../services/cartService";

export const CardDetails = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const handleChange = (e) => {
    setSelectedVariantId(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      setCartMessage("Please select a size");
      return;
    }

    try {
      setIsAddingToCart(true);
      setCartMessage("");
      
      const response = await cartService.addToCart({
        product_variant_id: selectedVariantId,
        quantity: 1
      });
      
      if (response.success) {
        setCartMessage("Product added to cart successfully!");
      } else {
        setCartMessage("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage("Error adding product to cart");
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
          
          {cartMessage && (
            <div className={`${styles.message} ${cartMessage.includes('success') ? styles.success : styles.error}`}>
              {cartMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
