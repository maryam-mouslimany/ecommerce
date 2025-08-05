import styles from "./index.module.css";
import { useState, useEffect } from "react";
import { Card } from "../../../components/Card";
import { Modal } from "../../../components/Modal";
import { CardDetails } from "../components/CardDetails";
import { FilterComponent } from "../components/ProductFilter";
import { productService } from "../../../services/productService";
import Pagination from "../../../components/Pagination";
import Header from "../../../components/Header";

export const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    fetchProducts(filters, page);
    fetchFilterOptions();
  }, [filters, page]);

  const fetchProducts = async (filters, page) => {
    try {
      setLoading(true);
      const response = await productService.getProducts(filters, page);
      setProducts(response.data.data);
      setTotalPages(response.data.last_page || 1);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await productService.getFilterOptions();
      setFilterOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch filter options", error);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewMore = async (product) => {
    try {
      setLoadingProduct(true);
      const response = await productService.getProductDetails(product.id);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product details", error);
      // Fallback to basic product data
      setSelectedProduct(product);
    } finally {
      setLoadingProduct(false);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.parentContainer}>
        <FilterComponent onApply={handleApplyFilters} options={filterOptions} />
      </div>
      {loading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : (
        <>
          <div className={styles.container}>
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                price={`$${product.variants[0]?.price || 'N/A'}`}
                onViewMore={() => handleViewMore(product)}
              />
            ))}
          </div>
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && <CardDetails product={selectedProduct} />}
      </Modal>
    </div>
  );
};
