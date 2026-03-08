import React, { useState } from "react";
import { Search, User, Send, Paperclip } from "lucide-react";
import ParentSidebar from "./ParentSidebar";
import ParentTopbar from "./ParentTopbar";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);

  const chats = [
    { id: 1, name: "Rahul Sharma", subject: "Physics", lastMessage: "Sure, let's schedule the demo class for tomorrow", time: "2 min ago", unread: 2 },
    { id: 2, name: "Priya Singh", subject: "Mathematics", lastMessage: "I've prepared the study materials for next week", time: "1 hour ago", unread: 0 },
    { id: 3, name: "Amit Kumar", subject: "Chemistry", lastMessage: "Thank you for the feedback on the last session", time: "2 hours ago", unread: 1 }
  ];

  const messages = [
    { id: 1, sender: "teacher", message: "Hello! I'm excited to help your child with Physics.", time: "10:30 AM" },
    { id: 2, sender: "parent", message: "Thank you! We're looking forward to starting the classes.", time: "10:32 AM" },
    { id: 3, sender: "teacher", message: "Sure, let's schedule the demo class for tomorrow", time: "10:35 AM" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-inter">
      <div className="flex">
        <ParentSidebar />

        <div className="ml-[260px] flex-1">
          <ParentTopbar title="Messages" searchPlaceholder="Search conversations..." />

          <div className="flex h-[calc(100vh-70px)]">
            {/* Chat List */}
            <div className="w-80 bg-white border-r border-[#E5E7EB]">
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] h-4 w-4" />
                  <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] text-sm" />
                </div>
              </div>
              <div className="overflow-y-auto">
                {chats.map((chat) => (
                  <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-4 border-b border-[#E5E7EB] cursor-pointer hover:bg-gray-50 ${selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-r-[#5B3DF5]' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-[#111827] truncate">{chat.name}</h3>
                          <span className="text-xs text-[#6B7280]">{chat.time}</span>
                        </div>
                        <p className="text-xs text-[#6B7280] mb-1">{chat.subject} Teacher</p>
                        <p className="text-sm text-[#6B7280] truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-[#5B3DF5] rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-[#E5E7EB]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#5B3DF5] to-[#7A5CFF] rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#111827]">Rahul Sharma</h3>
                    <p className="text-sm text-[#6B7280]">Physics Teacher</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'parent' ? 'bg-[#5B3DF5] text-white' : 'bg-gray-100 text-[#111827]'}`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'parent' ? 'text-purple-200' : 'text-[#6B7280]'}`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-[#E5E7EB]">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-[#6B7280] hover:text-[#111827] transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input type="text" placeholder="Type your message..." className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF5] text-sm" />
                  </div>
                  <button className="p-2 bg-[#5B3DF5] text-white rounded-lg hover:bg-[#4B2BBF] transition-colors">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;