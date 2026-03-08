import React, { useState } from 'react';
import SchoolLayout from './SchoolLayout';
import { Search, User, Send, Paperclip, Phone, Video } from 'lucide-react';

const SchoolMessages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    { 
      id: 1, 
      name: "John Smith", 
      role: "Math Teacher", 
      lastMessage: "Thank you for considering my application", 
      time: "2 min ago", 
      unread: 2,
      avatar: null
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      role: "English Teacher", 
      lastMessage: "I'm available for an interview next week", 
      time: "1 hour ago", 
      unread: 0,
      avatar: null
    },
    { 
      id: 3, 
      name: "Mike Wilson", 
      role: "Science Teacher", 
      lastMessage: "Looking forward to hearing from you", 
      time: "2 hours ago", 
      unread: 1,
      avatar: null
    }
  ];

  const messages = [
    { 
      id: 1, 
      sender: "teacher", 
      message: "Hello! I'm very interested in the Math Teacher position at your school.", 
      time: "10:30 AM",
      senderName: "John Smith"
    },
    { 
      id: 2, 
      sender: "school", 
      message: "Thank you for your interest! We'd like to schedule an interview with you.", 
      time: "10:32 AM",
      senderName: "School Admin"
    },
    { 
      id: 3, 
      sender: "teacher", 
      message: "That sounds great! I'm available any day next week.", 
      time: "10:35 AM",
      senderName: "John Smith"
    },
    { 
      id: 4, 
      sender: "school", 
      message: "Perfect! How about Tuesday at 2 PM?", 
      time: "10:37 AM",
      senderName: "School Admin"
    },
    { 
      id: 5, 
      sender: "teacher", 
      message: "Thank you for considering my application", 
      time: "10:40 AM",
      senderName: "John Smith"
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      setNewMessage('');
    }
  };

  return (
    <SchoolLayout>
      <div className="h-[calc(100vh-80px)] bg-[#F8F9FA]">
        <div className="flex h-full">
          {/* Chat List Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-[#6C5CE7] bg-opacity-10 border-r-4 border-r-[#6C5CE7]' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{chat.role}</p>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-[#6C5CE7] rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#8B7FE8] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedChatData.name}</h3>
                      <p className="text-sm text-gray-500">{selectedChatData.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-[#6C5CE7] hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-[#6C5CE7] hover:bg-gray-100 rounded-lg transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'school' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'school'
                            ? 'bg-[#6C5CE7] text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'school' ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-500 hover:text-[#6C5CE7] hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-[#6C5CE7] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No conversation selected</h3>
                  <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
};

export default SchoolMessages;