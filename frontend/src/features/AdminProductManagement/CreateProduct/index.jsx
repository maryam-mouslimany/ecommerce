import { useState } from "react";
import styles from "./styles.module.css";
import  {InputField}  from "../../../components/InputField";
import { Button } from "../../../components/Button";

const CreateProduct = () => {
  // Example static data for dropdowns
  const brands = ["Sweet Aroma", "Ocean Breeze", "Luxury Scents"];
  const categories = ["Perfume", "Body Spray", "Cologne"];

  const [formData, setFormData] = useState({
    name: "",
    brand: brands[0],
    category: categories[0],
    gender: "",
    size_ml: "",
    price: "",
    stock: "",
    image: "",
    accords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Create Product</h1>

      <form className={styles.form}>
        <InputField
          label="Product Name"
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
        />

        <label className={styles.label}>
          Brand
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={styles.select}
          >
            {brands.map((b, idx) => (
              <option key={idx} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.select}
          >
            {categories.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Gender
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>

        <InputField
          label="Size (ml)"
          type="number"
          name="size_ml"
          placeholder="Enter size in ml"
          value={formData.size_ml}
          onChange={handleChange}
        />

        <InputField
          label="Price ($)"
          type="number"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
        />

        <InputField
          label="Stock Quantity"
          type="number"
          name="stock"
          placeholder="Enter stock quantity"
          value={formData.stock}
          onChange={handleChange}
        />

        <InputField
          label="Image URL"
          type="text"
          name="image"
          placeholder="Enter product image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <InputField
          label="Accords"
          type="text"
          name="accords"
          placeholder="Comma separated (e.g. Sweet, Floral)"
          value={formData.accords}
          onChange={handleChange}
        />

        <div className={styles.buttonRow}>
          <Button label="Create Product" variant="primary" onClick={() => {}} />
          <Button label="Cancel" variant="secondary" outline onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
