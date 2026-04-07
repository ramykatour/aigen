'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { streamChatResponse } from '@/lib/api';

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, isLoading, addMessage, updateLastMessage, setLoading, setError, systemPrompt } = useChatStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({ role: 'user', content: userMessage });

    // Add empty assistant message for streaming
    addMessage({ role: 'assistant', content: '' });
    setLoading(true);

    let fullResponse = '';

    await streamChatResponse(
      [{ role: 'system', content: systemPrompt }, ...messages, { role: 'user', content: userMessage }],
      (chunk) => {
        fullResponse += chunk;
        updateLastMessage(fullResponse);
      },
      (error) => {
        setError(error);
        updateLastMessage(`Error: ${error}`);
      },
      () => {
        setLoading(false);
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="py-4 border-t border-white/10"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-2 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none min-h-[56px] max-h-[200px]"
            style={{ fieldSizing: 'content' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25 transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-3">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10">Enter</kbd> to send,{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10">Shift + Enter</kbd> for new line
        </p>
      </form>
    </motion.div>
  );
}
