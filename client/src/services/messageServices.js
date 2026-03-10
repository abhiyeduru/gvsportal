import axiosInstance from "@/lib/axiosInstance";

// Send a message
export const sendMessage = async (messageData) => {
  const response = await axiosInstance.post("/api/messages/send", messageData);
  return response.data;
};

// Get conversation with a specific user
export const getConversation = async (otherUserId) => {
  const response = await axiosInstance.get(`/api/messages/conversation/${otherUserId}`);
  return response.data;
};

// Get all conversations
export const getAllConversations = async () => {
  const response = await axiosInstance.get("/api/messages/conversations");
  return response.data;
};

// Get unread message count
export const getUnreadCount = async () => {
  const response = await axiosInstance.get("/api/messages/unread-count");
  return response.data;
};

// Mark messages as read
export const markAsRead = async (senderId) => {
  const response = await axiosInstance.patch(`/api/messages/mark-read/${senderId}`);
  return response.data;
};

// Delete a message
export const deleteMessage = async (messageId) => {
  const response = await axiosInstance.delete(`/api/messages/${messageId}`);
  return response.data;
};
