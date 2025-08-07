import api from "./api";

export const productService = {
  getProducts: async (filters = {}, page = 1, perPage = 15) => {
    try {
      const params = new URLSearchParams({
        page,
        per_page: perPage,
        ...filters,
      });

      const response = await api.get(`/v1/products?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getFilterOptions: async () => {
    try {
      const response = await api.get("/v1/products/filter-options");
      return response.data;
    } catch (error) {
      console.error("Error fetching filter options:", error);
      throw error;
    }
  },

  getProductDetails: async (id) => {
    try {
      const response = await api.get(`/v1/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  },
};
