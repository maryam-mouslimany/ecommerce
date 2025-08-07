import api from "./api";

export const cartService = {
  addToCart: async (cartData) => {
    try {
      const response = await api.post("/v1/cart/add", cartData);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  getCart: async () => {
    try {
      const response = await api.get("/v1/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/v1/cart/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/v1/cart/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await api.delete("/v1/cart/clear");
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },
};

const notifyCartUpdated = () => {
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const addItemToLocalCart = (product) => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    notifyCartUpdated();

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Cart updated: ${
          existingItem ? "Updated quantity" : "Added new item"
        } for product ${product.id}`
      );
    }
  } catch (error) {
    console.error("Error in addItemToLocalCart:", error);
    throw error;
  }
};

export const getLocalCart = () => {
  try {
    const cartData = localStorage.getItem("cart");

    if (!cartData) {
      return [];
    }

    const parsedCart = JSON.parse(cartData);
    return parsedCart;
  } catch (error) {
    console.error("Error parsing cart data from localStorage:", error);

    localStorage.removeItem("cart");
    return [];
  }
};

export const removeItemFromLocalCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  notifyCartUpdated();
  return updatedCart;
};

export const updateLocalCartItemQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      return removeItemFromLocalCart(productId);
    }
    item.quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    notifyCartUpdated();
  }
  return cart;
};

export const clearLocalCart = () => {
  localStorage.removeItem("cart");
  notifyCartUpdated();
};

export const getLocalCartItemCount = () => {
  const cart = getLocalCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
