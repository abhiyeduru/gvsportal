import Message from "../models/Message.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const messageControllers = {
  // Send a message
  sendMessage: async (req, res, next) => {
    try {
      const senderId = req.user.id;
      const { receiverId, message, relatedTo, relatedId } = req.body;

      // Validate receiver exists
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return next(createError(404, "Receiver not found"));
      }

      // Create message
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        message,
        relatedTo: relatedTo || "general",
        relatedId: relatedId || null,
      });

      await newMessage.save();

      // Populate sender info for response
      await newMessage.populate("sender", "fullName profilePic");
      await newMessage.populate("receiver", "fullName profilePic");

      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get conversation between two users
  getConversation: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { otherUserId } = req.params;

      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: otherUserId },
          { sender: otherUserId, receiver: userId },
        ],
      })
        .populate("sender", "fullName profilePic")
        .populate("receiver", "fullName profilePic")
        .sort({ createdAt: 1 });

      // Mark messages as read
      await Message.updateMany(
        {
          sender: otherUserId,
          receiver: userId,
          isRead: false,
        },
        { isRead: true }
      );

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all conversations (list of users you've chatted with)
  getAllConversations: async (req, res, next) => {
    try {
      const userId = req.user.id;

      // Get all unique users the current user has messaged with
      const sentMessages = await Message.find({ sender: userId }).distinct("receiver");
      const receivedMessages = await Message.find({ receiver: userId }).distinct("sender");

      // Combine and get unique user IDs
      const userIds = [...new Set([...sentMessages, ...receivedMessages])];

      // Get user details and last message for each conversation
      const conversations = await Promise.all(
        userIds.map(async (otherUserId) => {
          const lastMessage = await Message.findOne({
            $or: [
              { sender: userId, receiver: otherUserId },
              { sender: otherUserId, receiver: userId },
            ],
          })
            .sort({ createdAt: -1 })
            .populate("sender", "fullName profilePic")
            .populate("receiver", "fullName profilePic");

          const unreadCount = await Message.countDocuments({
            sender: otherUserId,
            receiver: userId,
            isRead: false,
          });

          const otherUser = await User.findById(otherUserId).select(
            "fullName profilePic role"
          );

          return {
            user: otherUser,
            lastMessage,
            unreadCount,
          };
        })
      );

      // Sort by last message time
      conversations.sort((a, b) => {
        const timeA = a.lastMessage?.createdAt || 0;
        const timeB = b.lastMessage?.createdAt || 0;
        return timeB - timeA;
      });

      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get unread message count
  getUnreadCount: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const unreadCount = await Message.countDocuments({
        receiver: userId,
        isRead: false,
      });

      res.status(200).json({
        success: true,
        unreadCount,
      });
    } catch (error) {
      next(error);
    }
  },

  // Mark messages as read
  markAsRead: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { senderId } = req.params;

      await Message.updateMany(
        {
          sender: senderId,
          receiver: userId,
          isRead: false,
        },
        { isRead: true }
      );

      res.status(200).json({
        success: true,
        message: "Messages marked as read",
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete a message
  deleteMessage: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { messageId } = req.params;

      const message = await Message.findById(messageId);

      if (!message) {
        return next(createError(404, "Message not found"));
      }

      // Only sender can delete their message
      if (message.sender.toString() !== userId) {
        return next(createError(403, "You can only delete your own messages"));
      }

      await Message.findByIdAndDelete(messageId);

      res.status(200).json({
        success: true,
        message: "Message deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
