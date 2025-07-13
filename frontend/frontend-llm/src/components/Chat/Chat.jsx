import React, { useState, useEffect, useRef } from "react";
import { toolsApi, chatApi } from "../../services/api";
import { Send, Bot, User, Loader } from "lucide-react";

export default function Chat() {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await toolsApi.getTools();
        setTools(res.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    fetchTools();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !selectedTool) return;
    const userMessage = { role: "user", content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await chatApi.sendMessage(selectedTool, input);
      const botMessage = { role: "bot", content: res.data.response, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { role: "bot", content: `Error: ${error.response?.data?.detail || error.message}`, timestamp: new Date(), isError: true };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="chat-area flex flex-col h-full w-full max-w-3xl mx-auto overflow-hidden">
      {/* Tool Selection */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="input w-64"
        >
          <option value="">Choose a tool to chat with...</option>
          {tools.map(tool => (
            <option key={tool.id} value={tool.id}>
              {tool.name} ({tool.category})
            </option>
          ))}
        </select>
        <button
          onClick={clearChat}
          className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors"
          disabled={messages.length === 0}
        >
          Clear chat
        </button>
      </div>
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 select-none">
            <Bot className="w-12 h-12 mb-2" />
            <p className="text-base">Start a conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-base whitespace-pre-wrap break-words ${
                  message.role === "user"
                    ? "bg-[var(--color-accent)] text-white rounded-br-md"
                    : message.isError
                    ? "bg-red-600 text-white"
                    : "bg-[#35363a] text-[var(--color-text)] rounded-bl-md"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs opacity-60">{formatTime(message.timestamp)}</span>
                </div>
                {message.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#35363a] text-[var(--color-text)] px-4 py-3 rounded-2xl shadow-sm flex items-center gap-2 text-base">
              <Loader className="w-4 h-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="input-bar">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 bg-transparent resize-none text-[var(--color-text)] placeholder-gray-400 focus:outline-none"
            disabled={!selectedTool || loading}
            style={{ minHeight: 40, maxHeight: 120 }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !selectedTool || loading}
            className="input-send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 