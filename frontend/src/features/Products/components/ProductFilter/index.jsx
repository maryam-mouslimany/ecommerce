import { useState } from "react";
import styles from "./index.module.css";
import { Button } from "../../../../components/Button";
export const FilterComponent = ({ onApply }) => {
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const genderOptions = ["Male", "Female", "Unisex"];
  const priceOptions = ["Under $50", "$50 - $100", "Over $100"];
  const brandOptions = ["Nike", "Adidas", "Puma"];

  const handleApply = () => {
    const filters = { gender, price, brand };
    onApply(filters);
  };

  return (
    <div className={styles.container}>
      <h3>Filter Products</h3>

      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">-- Select --</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label>Price:</label>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">-- Select --</option>
          {priceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label>Brand:</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">-- Select --</option>
          {brandOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleApply} variant="primary" label="Apply Filters" />
    </div>
  );
};
