import { create } from 'zustand';
import { ChatMessage } from './api';

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  systemPrompt: 'You are a helpful AI assistant.',

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      ],
    })),

  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content,
        };
      }
      return { messages };
    }),

  setLoading: (loading) => set({ isLoading: loading, error: null }),

  setError: (error) => set({ error, isLoading: false }),

  clearChat: () => set({ messages: [], error: null }),

  setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
}));
