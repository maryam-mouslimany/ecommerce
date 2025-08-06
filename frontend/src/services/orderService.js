import api from './api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('authToken');
};

// Add auth header to requests
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const orderService = {
  // Get all orders for admin (with optional status filter)
  getOrders: async (status = null, page = 1, perPage = 20) => {
    try {
      const params = { page, per_page: perPage };
      if (status && status !== 'All') {
        params.status = status.toLowerCase();
      }

      const response = await api.get('/admin/getOrder', {
        params,
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const response = await api.post(`/admin/edit-order-status/${orderId}`, {
        status: newStatus.toLowerCase()
      }, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get customer orders (for regular users)
  getCustomerOrders: async (page = 1, perPage = 20) => {
    try {
      const response = await api.get('/v1/user/orders', {
        params: { page, per_page: perPage },
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
  }
};

export default orderService;
