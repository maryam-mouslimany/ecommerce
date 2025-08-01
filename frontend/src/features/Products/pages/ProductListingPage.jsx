import products from "../../../data/products.json";
import styles from "./index.module.css";
import { useState } from "react";
import { Card } from "../../../components/Card";
import { Modal } from "../../../components/Modal";
import { CardDetails } from "../components/CardDetails";

export const ProductListingPage = ({ title, price }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div className={styles.container}>
      {products.map((product) => (
        // <div key={product.id} style={{ marginBottom: "1.5rem" }}>
        //   <h3>{product.name}</h3>
        //   <p>Brand: {product.brand.name}</p>
        //   <p>Category: {product.category.name}</p>
        //   <p>Gender: {product.gender}</p>
        //   <img
        //     src={product.images[0]?.url}
        //     alt={product.name}
        //     style={{ width: "150px", height: "auto" }}
        //   />
        //   <ul>
        //     {product.variants.map((variant) => (
        //       <li key={variant.id}>
        //         {variant.size_ml}ml — ${variant.price} ({variant.stock} in
        //         stock)
        //       </li>
        //     ))}
        //   </ul>
        //   <p>Accords: {product.accords.map((a) => a.name).join(", ")}</p>
        // </div>

        <Card
          title={product.name}
          price={`$${product.variants[0]?.price}`}
          onViewMore={() => setSelectedProduct(product)}
        />
      ))}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && <CardDetails product={selectedProduct} />}
      </Modal>
    </div>
  );
};
