'use client';

import { motion } from 'framer-motion';
import { User, Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage as MessageType } from '@/lib/api';
import { formatTime, copyToClipboard } from '@/lib/utils';

interface ChatMessageProps {
  message: MessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await copyToClipboard(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} ${isUser ? 'message-user' : 'message-ai'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
            : 'bg-gradient-to-br from-violet-500 to-purple-600'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      <div className={`flex-1 max-w-[85%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`glass-strong rounded-2xl px-4 py-3 ${
            isUser ? 'rounded-tr-sm bg-blue-500/10 border-blue-500/20' : 'rounded-tl-sm'
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
              {isStreaming && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-5 ml-1 bg-violet-400 align-middle"
                />
              )}
            </p>
          </div>
        </motion.div>

        <div className={`flex items-center gap-2 mt-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>

          {!isUser && message.content && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
