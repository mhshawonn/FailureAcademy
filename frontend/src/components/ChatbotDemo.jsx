import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa';
import api, { parseErrorMessage } from '../services/api.js';

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([
    { id: 1, author: 'bot', text: 'Hey dreamer, what are we iterating on today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendPrompt = async () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), author: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setIsTyping(true);
    try {
      const response = await api.post('/api/chatbot', { message: userMessage.text });
      const { reply, suggestions } = response.data;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, author: 'bot', text: reply, suggestions: suggestions ?? [] },
      ]);
    } catch (error) {
      toast.error(parseErrorMessage(error));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-midnight-soft/75 p-6 shadow-xl">
      <div className="absolute -top-32 right-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <h2 className="text-2xl font-semibold text-white">Chatbot Sneak Peek</h2>
      <p className="mt-2 text-sm text-white/70">
        A future AI mentor that diffuses anxiety, rewires failure narratives, and nudges your next brave step.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="h-72 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-3 max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                message.author === 'user'
                  ? 'ml-auto bg-primary text-slate-900'
                  : 'bg-white/10 text-slate-100 shadow-inner'
              }`}
            >
              <p>{message.text}</p>
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion) => (
                    <span key={suggestion} className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest">
                      {suggestion}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && <p className="text-xs text-white/60">Bot is crafting something inspiring…</p>}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about exams, courses, mindsets..."
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                sendPrompt();
              }
            }}
          />
          <button
            type="button"
            onClick={sendPrompt}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-slate-900 transition hover:bg-primary-light"
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDemo;
