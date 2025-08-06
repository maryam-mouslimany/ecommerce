import api from './api';

export const chatbotService = {
  sendMessage: async (message) => {
    try {
      const response = await api.post('/v1/ai/chat', {
        message
      });
      return response.data;
    } catch (error) {
      console.error('Chatbot error:', error);
      throw error;
    }
  }
}; 