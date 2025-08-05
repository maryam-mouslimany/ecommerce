import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Button } from "../../../../components/Button";

export const FilterComponent = ({ onApply, options = {} }) => {
  const [gender, setGender] = useState("");
  const [brandId, setBrandId] = useState("");

  const { brands = [], genders = [] } = options;

  const handleApply = () => {
    const filters = {};
    if (gender) filters.gender = gender.toLowerCase();
    if (brandId) filters.brand_id = brandId;
    onApply(filters);
  };

  const handleClear = () => {
    setGender("");
    setBrandId("");
    onApply({});
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>Filter Products</h3>
      </div>
      <div>
        {" "}
        <div className={styles.section}>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">-- All Genders --</option>
            {genders.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.section}>
          <label>Brand:</label>
          <select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
            <option value="">-- All Brands --</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button onClick={handleApply} variant="primary" label="Apply Filters" />
        <Button
          onClick={handleClear}
          variant="secondary"
          label="Clear Filters"
        />
      </div>
    </div>
  );
};
