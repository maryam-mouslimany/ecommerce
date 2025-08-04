import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../../services/api";
import { Button } from "../../../../components/Button";
import SelectInput from "../../../../components/SelectInput";
import { InputField } from "../../../../components/InputField";
import { FaPlus, FaTimes } from 'react-icons/fa';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accords, setAccords] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedAccords, setSelectedAccords] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [variants, setVariants] = useState([{ size_ml: "", price: "", stock: "" }]);

  const genders = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "unisex", label: "Unisex" },
  ];

  // 1. Fetch Brands, Categories, and Accords first
  useEffect(() => {
    fetchData("/brands", "GET")
      .then(res => setBrands(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(err => console.error("Error fetching brands:", err));

    fetchData("/categories", "GET")
      .then(res => setCategories(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(err => console.error("Error fetching categories:", err));

    fetchData("/accords", "GET")
      .then(res => {
        const accordsData = Array.isArray(res.data.data) ? res.data.data : [];
        setAccords(accordsData);
      })
      .catch(err => console.error("Error fetching accords:", err));
  }, []);

  // 2. Fetch Product Data when in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      fetchData(`/admin/view-product/${id}`, "GET")
        .then((res) => {
          const product = res.data.data;
          setName(product.name);
          setGender(product.gender);
          setBrandId(product.brand.id.toString());
          setCategoryId(product.category.id.toString());
          setVariants(product.variants.map(v => ({
            size_ml: v.size_ml,
            price: v.price,
            stock: v.stock
          })))
          setImageUrl(product.images[0]?.url || "");

          // Store accord IDs as strings for <select multiple>
          const accordIds = product.accords.map((a) => a.id.toString());
          setSelectedAccords(accordIds);
          console.log("Preselected accord IDs:", accordIds);
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
      accords: selectedAccords.map(Number), // Convert back to numbers for API
      variants,
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
          setSelectedAccords([]);
          setImageUrl("");
          setVariants([{ size_ml: "", price: "", stock: "" }]);
        }
      })
      .catch((err) =>
        console.error(
          isEditMode ? "Error updating product:" : "Error creating product:",
          err
        )
      );
  };

  const addVariant = () => {
    setVariants([...variants, { size_ml: "", price: "", stock: "" }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  console.log("Accords options:", accords.map((a) => a.id.toString()));
  console.log("Selected accords:", selectedAccords);

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
            options={genders}
            required
          />

          <SelectInput
            name="brand"
            label="Brand"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            options={brands.map((b) => ({ value: b.id.toString(), label: b.name }))}
            required
          />

          <SelectInput
            name="category"
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categories.map((c) => ({ value: c.id.toString(), label: c.name }))}
            required
          />

          <SelectInput
            name="accords"
            label="Accords"
            value={selectedAccords}
            onChange={(e) =>
              setSelectedAccords(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
            options={accords.map((a) => ({ value: a.id.toString(), label: a.name }))}
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

          <div className={styles.variantsSection}>
            <div className={styles.variantsHeader}>
              <h3 className={styles.subtitle}>Variants</h3>
              <button
                type="button"
                onClick={addVariant}
                className={styles.addVariantBtn}
                title="Add Variant"
              >
                <FaPlus size={18} />
              </button>
            </div>
            
            {variants.map((v, index) => (
              <div key={index} className={styles.variantRow}>
                <InputField
                  label="Size (ml)"
                  type="number"
                  name={`size_${index}`}
                  placeholder="50"
                  value={v.size_ml}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].size_ml = e.target.value;
                    setVariants(updated);
                  }}
                />
                <InputField
                  label="Price ($)"
                  type="number"
                  name={`price_${index}`}
                  placeholder="55.00"
                  value={v.price}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].price = e.target.value;
                    setVariants(updated);
                  }}
                />
                <InputField
                  label="Stock"
                  type="number"
                  name={`stock_${index}`}
                  placeholder="22"
                  value={v.stock}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].stock = e.target.value;
                    setVariants(updated);
                  }}
                />
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className={styles.removeVariantBtn}
                    title="Remove Variant"
                  >
                    <FaTimes size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
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
};

export default ProductForm;