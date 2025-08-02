import products from "../../../data/products.json";
import styles from "./index.module.css";
import { useState } from "react";
import { Card } from "../../../components/Card";
import { Modal } from "../../../components/Modal";
import { CardDetails } from "../components/CardDetails";
import { FilterComponent } from "../components/ProductFilter";
export const ProductListingPage = ({ title, price }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <div className={styles.parentContainer}>
        <FilterComponent />
      </div>
      <div className={styles.container}>
        {products.map((product) => (
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
    </div>
  );
};
