import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { RetroCard } from './RetroCard';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const GeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm the AI assistant for Rohit's portfolio. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const apiKey = process.env.API_KEY || ''; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!apiKey) {
      setError("API Key is missing. Please configure process.env.API_KEY.");
      return;
    }

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        You are an AI assistant for a Web Engineer and CS Student named "Rohit".
        Your goal is to professionally and enthusiastically represent Rohit to potential employers or collaborators.
        
        Here is Rohit's profile data:
        - Name: Rohit
        - Role: CS Student (BITS Pilani) & Full Stack Web Engineer.
        - Top Skills: React, TypeScript, Tailwind CSS, Node.js, Python, AI Integration (Gemini API).
        - Design Style: Retro, Bento, Pixel Perfect.
        - Education: B.E. Computer Science at BITS Pilani (2022-2026).
        - Projects: 
            1. "RetroFolio" (This website) - React/Tailwind portfolio.
            2. "TaskMaster" - AI-powered todo list.
            3. "EcoTrack" - Carbon footprint calculator.
        
        Tone: Friendly, technical but accessible, concise, and slightly witty. Use a confident tone.
      `;

      const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText || "I couldn't generate a response." }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the AI brain." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <RetroCard className="h-[500px] flex flex-col bg-white w-full">
      {/* Header */}
      <div className="bg-retro-dark text-white p-4 flex items-center gap-3 border-b-3 border-retro-dark">
        <div className="bg-retro-purple p-2 rounded-lg text-white shadow-[2px_2px_0px_0px_#fff]">
          <Sparkles size={18} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-bold leading-none text-lg">Ask AI about Rohit</h3>
          <span className="text-xs text-gray-300 font-mono">Powered by Gemini 2.5</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center border-3 border-retro-dark flex-shrink-0 shadow-retro-sm
              ${msg.role === 'user' ? 'bg-retro-orange' : 'bg-retro-blue'}
            `}>
              {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
            </div>
            <div className={`
              max-w-[80%] p-4 rounded-2xl border-3 border-retro-dark text-sm font-medium
              ${msg.role === 'user' 
                ? 'bg-white rounded-tr-none shadow-[4px_4px_0px_0px_#232323]' 
                : 'bg-retro-cream rounded-tl-none shadow-[4px_4px_0px_0px_#232323]'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2">
             <div className="w-10 h-10 rounded-xl bg-retro-blue flex items-center justify-center border-3 border-retro-dark shadow-retro-sm">
              <Bot size={20} className="text-white" />
            </div>
            <div className="bg-retro-cream p-4 rounded-2xl rounded-tl-none border-3 border-retro-dark flex items-center gap-2 shadow-[4px_4px_0px_0px_#232323]">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-mono font-bold">Thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-xs text-center bg-red-100 p-2 rounded border border-red-400 font-bold">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-3 border-retro-dark">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about my experience..."
            className="w-full pl-4 pr-14 py-4 bg-stone-100 border-3 border-retro-dark rounded-xl focus:outline-none focus:bg-white focus:ring-0 focus:border-retro-purple transition-colors font-bold text-stone-700 placeholder-stone-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 p-2 bg-retro-dark text-white rounded-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[2px_2px_0px_0px_#888]"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </RetroCard>
  );
};