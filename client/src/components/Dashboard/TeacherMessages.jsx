import React, { useState } from 'react';
import TeacherLayout from './TeacherDashboard/TeacherLayout';
import {
  Plus,
  Star,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
  Users,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  MessageSquare,
  Inbox,
} from 'lucide-react';

const TeacherMessages = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'important', label: 'Important' },
  ];

  const teamConversations = [];
  const recentMessages = [];

  return (
    <TeacherLayout>
      <div className="p-6 bg-[#F7F8FC] min-h-screen">
        {/* Main Messages Container */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden h-[calc(100vh-140px)]">
          <div className="flex h-full">
            {/* Left Panel - Conversation List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              {/* Tabs */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex gap-2 mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-[#6C5DD3] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* New Message Button */}
                <button className="w-full bg-[#6C5DD3] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-semibold hover:bg-[#5B4DC2] transition-all">
                  <Plus className="w-5 h-5" />
                  New Message
                </button>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {/* Team Conversations */}
                <div className="p-4">
                  <p className="text-xs font-bold text-gray-400 mb-3 tracking-wider">TEAM</p>
                  {teamConversations.length > 0 ? (
                    <div className="space-y-2">
                      {teamConversations.map((conv) => (
                        <div
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv.id)}
                          className={`p-3 rounded-xl cursor-pointer transition-all ${
                            selectedConversation === conv.id
                              ? 'bg-[#6C5DD3] bg-opacity-10 border border-[#6C5DD3]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#6C5DD3] to-[#8B7FE8] rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                              {conv.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-800 text-sm truncate">{conv.name}</h4>
                                <span className="text-xs text-gray-400 ml-2">{conv.time}</span>
                              </div>
                              <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">No team conversations</p>
                    </div>
                  )}
                </div>

                {/* Recent Messages */}
                <div className="p-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 mb-3 tracking-wider">RECENT MESSAGE</p>
                  {recentMessages.length > 0 ? (
                    <div className="space-y-2">
                      {recentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => setSelectedConversation(msg.id)}
                          className={`p-3 rounded-xl cursor-pointer transition-all ${
                            selectedConversation === msg.id
                              ? 'bg-[#6C5DD3] bg-opacity-10 border border-[#6C5DD3]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {msg.avatar}
                              </div>
                              {msg.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-800 text-sm truncate">{msg.name}</h4>
                                {msg.unread > 0 && (
                                  <span className="w-5 h-5 bg-[#6C5DD3] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {msg.unread}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{msg.lastMessage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">No recent messages</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Chat Conversation */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Conversation</h3>
                      <p className="text-sm text-gray-500">Select a conversation to view messages</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Star className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold mb-2">No messages yet</p>
                      <p className="text-sm">Start a conversation to see messages here</p>
                    </div>
                  </div>

                  {/* Message Input Area */}
                  <div className="p-4 border-t border-gray-200">
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Undo">
                        <Undo className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Redo">
                        <Redo className="w-4 h-4 text-gray-500" />
                      </button>
                      <div className="w-px h-6 bg-gray-200 mx-1"></div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Bold">
                        <Bold className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Italic">
                        <Italic className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Underline">
                        <Underline className="w-4 h-4 text-gray-500" />
                      </button>
                      <div className="flex-1"></div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Emoji">
                        <Smile className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Attach">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Input Field */}
                    <div className="flex items-end gap-3">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message..."
                        rows={2}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all"
                      />
                      <button className="bg-[#6C5DD3] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5B4DC2] transition-all flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        SEND
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Inbox className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
                    <p className="text-sm mb-6">Choose a conversation from the list or start a new message</p>
                    <button className="bg-[#6C5DD3] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5B4DC2] transition-all inline-flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      New Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherMessages;
