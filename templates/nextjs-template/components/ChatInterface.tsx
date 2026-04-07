'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/lib/store';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, clearChat } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <ChatHeader onClear={clearChat} />

      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center"
                >
                  <svg
                    className="w-12 h-12 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
                >
                  Welcome to AI Chat
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-lg max-w-md mx-auto"
                >
                  Start a conversation with AI. Ask questions, get help, or just chat.
                </motion.p>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isStreaming={isLoading && index === messages.length - 1 && message.role === 'assistant'}
                />
              ))
            )}
          </AnimatePresence>

          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-violet-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-violet-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-violet-400 rounded-full typing-dot" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
}
