import styles from "./index.module.css";
import rectangle from "../../../../assets/images/Rectangle.png";
import { useState } from "react";

export const CardDetails = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id
  );

  const handleChange = (e) => {
    setSelectedVariantId(parseInt(e.target.value));
  };

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={rectangle} alt="Perfume" className={styles.image} />
      </div>

      <div className={styles.right}>
        <h2 className={styles.name}>{product.name}</h2>
        <p>
          <strong>Brand:</strong> {product.brand.name}
        </p>
        <p>
          <strong>Category:</strong> {product.category.name}
        </p>
        <p>
          <strong>Gender:</strong> {product.gender}
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

        {product.accords.length > 0 && (
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
      </div>
    </div>
  );
};
