import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { fetchData } from "../../../../services/api";
import Table from "../../components/Table";
import Header from "../../../../components/Header";
import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <p className={styles.loadingText}>Loading...</p>;
  if (!product) return <p className={styles.errorText}>Product not found.</p>;

  const variantColumns = [
    { header: "Size (ml)", key: "size_ml" },
    { header: "Price ($)", key: "price" },
    { header: "Stock", key: "stock" },
  ];

  const accordsList = product.accords.map((a) => a.name).join(", ");

  return (
    <>
      <Header />
      <div className={styles.detailsContainer}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{product.name}</h1>
          <Button size="large" variant="primary" label="Edit" onClick={() => navigate(`/admin-update-product/${id}`)} >

        </Button>
      </div>
      <div className={styles.info}>
        <div className={styles.infoText}>
          <p className={styles.infoItem}>
            <strong>Brand:</strong> {product.brand?.name || "N/A"}
          </p>
          <p className={styles.infoItem}>
            <strong>Category:</strong> {product.category?.name || "N/A"}
          </p>
          <p className={styles.infoItem}>
            <strong>Gender:</strong> {product.gender}
          </p>
          <p className={styles.infoItem}>
            <strong>Accords:</strong> {accordsList || "None"}
          </p>
        </div>

        {product.images?.[0]?.url && (
          <img
            src={product.images[0].url}
            alt={product.name}
            className={styles.productImage}
          />
        )}
      </div>

      <div className={styles.variantsSection}>
        <h2 className={styles.subtitle}>Product Variants</h2>
        <Table columns={variantColumns} data={product.variants || []} />
      </div>
    </div >
    </>
  );
};

export default ProductDetails;