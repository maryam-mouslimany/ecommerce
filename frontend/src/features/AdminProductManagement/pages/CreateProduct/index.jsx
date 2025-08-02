import React, { useState } from "react";
import { InputField } from "../../../../components/InputField";
import { Button } from "../../../../components/Button";
import SelectInput from "../../../../components/SelectInput";
import data from "../../../../data/productsAttachments.json";
import styles from "./styles.module.css"

function CreateProduct() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedAccords, setSelectedAccords] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [variant, setVariant] = useState({ size_ml: "", price: "", stock: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      gender,
      brand: { id: brandId },
      category: { id: categoryId },
      accords: selectedAccords,
      variants: variant,
    };

    console.log("Submitting Product:", newProduct);

  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <h2 className={styles.title}>Create Product</h2>

          <InputField
            label="Product Name"
            type="text"
            name="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <SelectInput
            name="gender"
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "unisex", label: "Unisex" },
            ]}
            required
          />

          <SelectInput
            name="brand"
            label="Brand"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            options={data.brands.map((b) => ({ value: b.id, label: b.name }))}
            required
          />

          <SelectInput
            name="category"
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={data.categories.map((c) => ({ value: c.id, label: c.name }))}
            required
          />

          <InputField
            label="Size (ml)"
            type="number"
            name="size_ml"
            placeholder="50"
            value={variant.size_ml}
            onChange={(e) => setVariant({ ...variant, size_ml: e.target.value })}
          />
          <InputField
            label="Price ($)"
            type="number"
            name="price"
            placeholder="55.00"
            value={variant.price}
            onChange={(e) => setVariant({ ...variant, price: e.target.value })}
          />
          <InputField
            label="Stock"
            type="number"
            name="stock"
            placeholder="22"
            value={variant.stock}
            onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
          />

          <SelectInput
            name="accords"
            label="Accords"
            value={selectedAccords}
            onChange={(e) =>
              setSelectedAccords(
                Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value))
              )
            }
            options={data.accordsList.map((a) => ({ value: a.id, label: a.name }))}
            multiple={true}
          />

          <InputField
            label="Image URL"
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </form>

        <div className={styles.buttonWrapper}>
          <Button
            label="Create Product"
            onClick={handleSubmit}
            variant="primary"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;