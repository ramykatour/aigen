'use client';

import { motion } from 'framer-motion';
import { Sparkles, Trash2 } from 'lucide-react';

interface ChatHeaderProps {
  onClear: () => void;
}

export function ChatHeader({ onClear }: ChatHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="py-4 border-b border-white/10"
    >
      <div className="flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">AI Chat</h1>
            <p className="text-xs text-gray-400">Powered by aigen</p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
