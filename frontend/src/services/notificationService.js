import api from "./api";


export const getUserNotifications = async (userId) => {
  const response = await api.get(`/v1/user/notifications/${userId}`);
  return response.data?.data || [];
};


export const markNotificationAsRead = async (notificationId) => {
  const response = await api.post(`/admin/notifications/${notificationId}/read`);
  return response.data;
};
