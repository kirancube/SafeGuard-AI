import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  FileText, 
  Hospital, 
  Building2, 
  Scale, 
  User,
  HeartPulse
} from 'lucide-react';
import { ChatMessage } from '../types';

interface AiSafetyChatbotProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const AiSafetyChatbot: React.FC<AiSafetyChatbotProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    { label: 'What are my legal rights if followed?', icon: Scale },
    { label: 'Emergency First Aid for panic attack', icon: HeartPulse },
    { label: 'How to handle uncomfortable situation in cab?', icon: ShieldCheck },
    { label: 'What to tell 112 Police when calling?', icon: Building2 },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Bot className="w-4 h-4 text-rose-400" />
            <span>GEMINI AI SAFETY & LEGAL ASSISTANT</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            24/7 AI Safety Chatbot
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Ask for instant safety advice, step-by-step emergency instructions, first aid procedures, nearby police/hospital lookup, and legal rights protection under women safety laws.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col h-[520px] shadow-xl">
        {/* Quick Prompts Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 border-b border-slate-800 scrollbar-none">
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => onSendMessage(qp.label)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium whitespace-nowrap transition border border-slate-700 shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-rose-400" />
                <span>{qp.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Stream Messages Box */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-rose-600 text-white font-medium rounded-tr-none shadow-md'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none space-y-2'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="text-[10px] text-slate-400 block text-right mt-1 opacity-75">{msg.timestamp}</span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-rose-400 italic">
              <div className="w-8 h-8 rounded-xl bg-rose-600/20 flex items-center justify-center text-rose-400 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <span>SafeGuard Gemini AI is formulating safety instructions...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-800">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything (e.g. 'How to stay safe while walking alone at night?')"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50 shadow-lg shadow-rose-600/30"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
