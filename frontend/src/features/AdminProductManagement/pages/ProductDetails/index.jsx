import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { fetchData } from "../../../../services/api";
import Table from "../../components/Table";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(`/admin/view-product/${id}`, "GET")
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  // Prepare variants table columns
  const variantColumns = [
    { header: "Size (ml)", key: "size_ml" },
    { header: "Price ($)", key: "price" },
    { header: "Stock", key: "stock" },
  ];

  // Convert accords to comma-separated string
  const accordsList = product.accords.map((a) => a.name).join(", ");

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.title}>{product.name}</h2>

      <div className={styles.info}>
        <p><strong>Brand:</strong> {product.brand?.name || "N/A"}</p>
        <p><strong>Category:</strong> {product.category?.name || "N/A"}</p>
        <p><strong>Gender:</strong> {product.gender}</p>
        <p><strong>Accords:</strong> {accordsList || "None"}</p>
        {product.images?.[0]?.url && (
          <img
            src={product.images[0].url}
            alt={product.name}
            className={styles.productImage}
          />
        )}
      </div>

      <h3 className={styles.subtitle}>Variants</h3>
      <Table columns={variantColumns} data={product.variants || []} />
    </div>
  );
};

export default ProductDetails;
