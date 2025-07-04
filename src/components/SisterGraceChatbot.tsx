"use client";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "../context/LanguageContext";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
  saintRecommendations?: string[];
  scriptureReferences?: string[];
  liturgicalSeason?: string;
  spiritualMaturity?: string;
  emotionalTone?: string;
  topicCategory?: string;
}

interface SisterGraceChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SisterGraceChatbot({
  isOpen,
  onClose,
}: SisterGraceChatbotProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ userMessage: string; assistantMessage: string }>
  >([]);
  const [dailyMessage, setDailyMessage] = useState<{
    saint: string;
    message: string;
    theme: string;
    scriptureReference: string;
    liturgicalSeason: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conversationContext, setConversationContext] = useState<{
    spiritualMaturity: string;
    emotionalTone: string;
    topicCategory: string;
  } | null>(null);
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadConversationHistory = useCallback(async (userId: string) => {
    try {
      setConversationHistory([]);
    } catch (error) {
      console.error("Error loading conversation history:", error);
    }
  }, []);

  const checkUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await loadConversationHistory(user.id);
    }
  }, [loadConversationHistory, supabase.auth]);

  const fetchDailyMessage = useCallback(async () => {
    try {
      const response = await fetch("/api/ai/daily-message");
      if (response.ok) {
        const data = await response.json();
        setDailyMessage(data);
      }
    } catch (error) {
      console.error("Error fetching daily message:", error);
    }
  }, []);

  const initializeChat = useCallback(() => {
    const welcomeMessage: Message = {
      id: "1",
      content: `Peace be with you, my dear child! I'm Sister Grace, and I'm here to walk with you on your spiritual journey. 

${
  dailyMessage
    ? `Today's inspiration from ${dailyMessage.saint}: "${dailyMessage.message}" 
Theme: ${dailyMessage.theme}
Scripture: ${dailyMessage.scriptureReference}

`
    : ""
}Whether you need prayer, guidance, or simply someone to listen, I'm here with the love and wisdom of our Catholic tradition. How may I help you grow closer to our Lord today?`,
      isUser: false,
      timestamp: new Date(),
      liturgicalSeason: dailyMessage?.liturgicalSeason,
    };

    setMessages([welcomeMessage]);
  }, [dailyMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkUser();
    fetchDailyMessage();
  }, [checkUser, fetchDailyMessage]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen, messages.length, initializeChat]);

  const generateAISisterGraceResponse = async (
    userMessage: string,
  ): Promise<Message> => {
    try {
      setError(null);

      const response = await fetch("/api/ai/spiritual-guidance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        let errorMessage = "I'm experiencing some technical difficulties right now.";
        
        if (response.status === 429) {
          errorMessage = "🙏 Sister Grace is currently helping many souls and is temporarily unavailable due to high demand. Please try again in a few moments. In the meantime, I'm here with a loving response for you.";
        } else if (response.status === 500) {
          errorMessage = "🕊️ Sister Grace's AI guidance is temporarily offline for maintenance. Don't worry - I'm still here to offer you spiritual comfort and wisdom from our Catholic tradition.";
        } else if (response.status === 503) {
          errorMessage = "⛪ Our spiritual guidance service is currently experiencing high traffic from faithful souls worldwide. Please try again shortly, and I'll provide you with traditional Catholic wisdom in the meantime.";
        }
        
        setError(errorMessage);
        return generateFallbackResponse(userMessage, errorMessage);
      }

      const data = await response.json();

      // Check if we received HTML instead of JSON (common error)
      if (typeof data === 'string' && data.includes('<!DOCTYPE')) {
        setError("🔧 Sister Grace's advanced guidance is temporarily unavailable due to technical maintenance. I'm providing you with traditional Catholic wisdom instead.");
        return generateFallbackResponse(userMessage, "Service temporarily unavailable");
      }

      // Update conversation history
      setConversationHistory((prev) => [
        { userMessage, assistantMessage: data.response },
        ...prev.slice(0, 4), // Keep last 5 exchanges
      ]);

      // Update conversation context for UI display
      if (data.conversationContext) {
        setConversationContext({
          spiritualMaturity: data.conversationContext.spiritualMaturity || 'growing',
          emotionalTone: data.conversationContext.emotionalTone || 'peaceful',
          topicCategory: data.conversationContext.topicCategory || 'General Spiritual Guidance'
        });
      }

      return {
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        saintRecommendations: data.saintRecommendations,
        scriptureReferences: data.scriptureReferences,
        liturgicalSeason: data.liturgicalSeason,
        spiritualMaturity: data.conversationContext?.spiritualMaturity,
        emotionalTone: data.conversationContext?.emotionalTone,
        topicCategory: data.conversationContext?.topicCategory,
      };
    } catch (error) {
      console.error("Error generating AI response:", error);
      
      // Provide user-friendly error messages
      let userFriendlyError = "🕊️ Sister Grace's AI guidance is temporarily unavailable, but I'm still here to provide you with spiritual comfort from our Catholic tradition.";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        userFriendlyError = "🌐 There seems to be a connection issue. Sister Grace's advanced guidance is temporarily offline, but I can still offer you traditional Catholic wisdom.";
      }
      
      setError(userFriendlyError);
      return generateFallbackResponse(userMessage, userFriendlyError);
    }
  };

  const generateFallbackResponse = (userMessage: string, errorContext?: string): Message => {
    const fallbackResponses = [
      "My dear child, I hear your heart speaking. Let us turn to prayer and ask for God's guidance in this moment. 'Trust in the Lord with all your heart, and do not lean on your own understanding.' (Proverbs 3:5)",
      "Peace be with you. In times of uncertainty, remember that our Lord is always near. May I suggest we pray together for clarity and strength?",
      "Your words touch my heart. Let us remember the words of St. Teresa of Avila: 'Let nothing disturb you. God does not change.' How can we bring this peace into your situation?",
      "Thank you for sharing with me. Sometimes the most powerful response is simply to be present with God in silence. Would you like me to share a prayer that might bring you comfort?",
    ];

    return {
      id: Date.now().toString(),
      content:
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      isUser: false,
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const aiResponse = await generateAISisterGraceResponse(inputValue);

      // Simulate typing delay
      setTimeout(() => {
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      console.error("Error in handleSendMessage:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const quickSuggestions = [
    "I need help with prayer",
    "I'm struggling with faith",
    "Can you recommend a saint for my situation?",
    "Help me understand this Scripture",
    "I need guidance for my vocation",
    "Prayers for family healing",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-900 rounded-lg shadow-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Enhanced Header with Context */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">👩‍🏫</span>
              </div>
              <div>
                <h3 className="font-semibold">{t.chatbot.title}</h3>
                <p className="text-sm opacity-90">{t.chatbot.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-xl font-bold"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          
          {/* Conversation Context Indicator */}
          {conversationContext && (
            <div className="mt-2 text-xs opacity-80 bg-white bg-opacity-20 rounded px-2 py-1">
              <span className="font-medium">Context:</span> {conversationContext.topicCategory} • 
              <span className="ml-1">{conversationContext.emotionalTone}</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 m-2">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.isUser
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none shadow-md"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-bl-none shadow-sm border"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>

                {/* Enhanced Saint Recommendations */}
                {message.saintRecommendations &&
                  message.saintRecommendations.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">🕊️</span>
                        <p className="font-semibold text-blue-800 text-sm">
                          {t.chatbot.saintRecommendations}
                        </p>
                      </div>
                      <ul className="text-blue-700 text-xs space-y-1">
                        {message.saintRecommendations.map((saint, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{saint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Enhanced Scripture References */}
                {message.scriptureReferences &&
                  message.scriptureReferences.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">📖</span>
                        <p className="font-semibold text-green-800 text-sm">
                          {t.chatbot.scriptureReflection}
                        </p>
                      </div>
                      <ul className="text-green-700 text-xs space-y-2">
                        {message.scriptureReferences.map((verse, index) => (
                          <li key={index} className="bg-white bg-opacity-50 p-2 rounded italic">
                            {verse}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Enhanced Timestamp with Context */}
                <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                  <span>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.liturgicalSeason && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      {message.liturgicalSeason}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[85%] border shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{t.chatbot.typing}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Quick Suggestions */}
        {showSuggestions && messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-600 mb-2 font-medium">
              {t.chatbot.quickTopics}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-2 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 text-left border border-blue-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Input */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.chatbot.shareHeart}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
              rows={2}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium shadow-md"
            >
              {t.chatbot.send}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {t.chatbot.guidanceDescription}
          </p>
          <p className="text-xs text-gray-400 mt-2 text-center">
            ✝️ Made with prayer & love ✝️
          </p>
        </div>
      </div>
    </div>
  );
}

export function SisterGraceButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-40"
        aria-label={t.chatbot.chatWith}
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">👩‍🏫</span>
          <span className="hidden sm:inline font-medium">
            {t.chatbot.title}
          </span>
        </div>
      </button>

      <SisterGraceChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
