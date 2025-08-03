import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputField } from "../../../../components/InputField";
import { Button } from "../../../../components/Button";
import SelectInput from "../../../../components/SelectInput";
import data from "../../../../data/productsAttachments.json";
import styles from "./styles.module.css";
import { fetchData } from "../../../../services/api";

function ProductForm() {
  const { id } = useParams();
  console.log(id);
  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedAccords, setSelectedAccords] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [variant, setVariant] = useState({ size_ml: "", price: "", stock: "" });

  useEffect(() => {
    if (isEditMode) {
      fetchData(`/admin/view-product/${id}`, "GET")
        .then((res) => {
          const product = res.data.data;
          setName(product.name);
          setGender(product.gender);
          setBrandId(product.brand.id);
          setCategoryId(product.category.id);
          setVariant({
            size_ml: product.variants[0].size_ml,
            price: product.variants[0].price,
            stock: product.variants[0].stock,
          });
          setSelectedAccords(product.accords.map((a) => a.id));
          setImageUrl(product.images[0]?.url || "");
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [isEditMode, id]);

  const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    action: isEditMode ? "update" : "create",
    name,
    gender,
    brand_id: parseInt(brandId),
    category_id: parseInt(categoryId),
    accords: selectedAccords,
    variants: [variant],
    images: [{ url: imageUrl }],
  };

  const url = isEditMode
    ? `/admin/add-update-products/${id}`
    : "/admin/add-update-products";

  fetchData(url, "POST", payload)
    .then((res) => {
      console.log(
        isEditMode
          ? "Product updated successfully:"
          : "Product created successfully:",
        res.data
      );

      if (!isEditMode) {
        setName("");
        setGender("");
        setBrandId("");
        setCategoryId("");
        setVariant({ size_ml: "", price: "", stock: "" });
        setSelectedAccords([]);
        setImageUrl("");
      }
    })
    .catch((err) =>
      console.error(
        isEditMode ? "Error updating product:" : "Error creating product:",
        err
      )
    );
};

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <h2 className={styles.title}>
            {isEditMode ? "Update Product" : "Create Product"}
          </h2>

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
            label={isEditMode ? "Update Product" : "Create Product"}
            onClick={handleSubmit}
            variant="primary"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
