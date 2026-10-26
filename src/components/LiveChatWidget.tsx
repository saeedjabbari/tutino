import React, { useState } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'سلام! به هاستینگ توتینو خوش‌آمدید 🍓 چطور می‌تونم در انتخاب هاست یا ثبت دامنه بهتون کمک کنم؟',
      timestamp: 'هم‌اکنون'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'تفاوت هاست وردپرس و لینوکس توتینو چیه؟',
    'هزینه ثبت دامنه .ir و .com چقدره؟',
    'فرایند انتقال و مهاجرت رایگان چطور انجام می‌شه؟',
    'آیا سرور آلمان برای سئو بهتره یا ایران؟'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'هم‌اکنون'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      let reply = 'ممنون از پیامتون! کارشناسان توتینو آماده پاسخگویی هستند. برای دریافت پاسخ سریع‌تر می‌توانید از بخش ناحیه کاربری تیکت پشتیبانی ارسال فرمایید.';
      
      const lower = text.toLowerCase();
      if (lower.includes('وردپرس') || lower.includes('لینوکس')) {
        reply = 'هاست وردپرس توتینو مجهز به وب‌سرور LiteSpeed Enterprise و ماژول کش LSCache به همراه درایوهای NVMe Gen4 است که سرعت لود سایت‌های وردپرسی را تا ۱۲ برابر نسبت به هاست معمولی افزایش می‌دهد!';
      } else if (lower.includes('دامنه') || lower.includes('ir') || lower.includes('قیمت')) {
        reply = 'ثبت دامنه ملی .ir در توتینو با تعرفه ویژه سالانه ۴۹,۰۰۰ تومان و دامنه‌های بین‌المللی .com با ۹۸۰,۰۰۰ تومان ثبت و در چند دقیقه فعال می‌شوند.';
      } else if (lower.includes('مهاجرت') || lower.includes('انتقال')) {
        reply = 'انتقال سایت شما به توتینو کاملاً رایگان و بدون حتی یک ثانیه قطعی (Zero-Downtime) توسط تیم فنی ما انجام می‌شود. کافیست فرم مهاجرت را ثبت کنید.';
      } else if (lower.includes('آلمان') || lower.includes('ایران') || lower.includes('سرور')) {
        reply = 'سرورهای ایران توتینو پینگ فوق‌العاده برای کاربران داخل کشور و اینترنت نیم‌بها دارند؛ سرورهای آلمان (Hetzner) نیز دسترسی بی‌نظیر بین‌المللی با پورت ۱۰ گیگابیت ارائه می‌دهند.';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        timestamp: 'هم‌اکnow'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      
      {/* Floating Support Button - Unified compact capsule so text and strawberry never overlap */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-white hover:bg-rose-50/60 text-slate-800 hover:text-rose-700 pl-4 pr-2.5 py-2 rounded-full shadow-lg hover:shadow-xl border border-rose-200/90 transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
          dir="rtl"
          aria-label="پشتیبانی آنلاین توتینو"
          title="پشتیبانی آنلاین ۲۴/۷ توتینو"
        >
          {/* Small compact strawberry badge */}
          <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-xs group-hover:rotate-12 transition-transform shrink-0 relative">
            <BerryLogo size={16} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
          </div>

          {/* Clear support text */}
          <div className="flex flex-col text-right leading-tight">
            <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              پشتیبانی آنلاین توتینو
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              پاسخگویی سریع ۲۴/۷
            </span>
          </div>

          <MessageSquare className="w-4 h-4 text-rose-500 mr-1 shrink-0" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-right">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                  <BerryLogo size={24} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>پشتیبان آنلاین توتینو</span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">۲۴/۷</span>
                </h4>
                <p className="text-[11px] text-slate-400">پاسخگویی سریع کمتر از ۱ دقیقه</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFFBFB]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-rose-100 text-rose-600'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <BerryLogo size={16} />}
                </div>

                <div className={`max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-rose-600 text-white rounded-tr-xs font-medium shadow-xs'
                    : 'bg-white text-slate-800 rounded-tl-xs border border-rose-100 shadow-xs'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/80' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Quick Questions suggestion */}
            {messages.length === 1 && (
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-2 font-medium">سوالات پرتکرار کاربران:</span>
                <div className="flex flex-col gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-right text-xs bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-700 hover:text-rose-700 p-2.5 rounded-xl border border-slate-200 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="پیام خود را بنویسید..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 bg-slate-100 text-slate-900 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 shadow-xs active:scale-95"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
