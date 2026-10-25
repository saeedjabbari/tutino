import React from 'react';
import { ArrowLeft, MessageSquare, PhoneCall } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const BottomCta: React.FC = () => {
  const { user, setActiveView, openAuthModal } = useAuth();

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSupportChat = () => {
    if (user) {
      setActiveView('tickets');
    } else {
      openAuthModal('login');
    }
  };

  return (
    <section className="bg-white">
      
      {/* 1. Track Success Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-rose-50/70 rounded-3xl p-8 sm:p-12 border border-rose-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 text-right">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight">
              با <span className="text-rose-600">توتینو</span>،<br />
              <span>موفقیت یک تجربه تکراریست</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
              توتینو تمام ابزارهای مدیریت و توسعه وب‌سایت را در اختیار شما قرار می‌دهد تا با خیالی آسوده، به برنامه‌های کسب‌وکارتان برسید و بهترین عملکرد را تجربه کنید.
            </p>

            <button
              onClick={scrollToPricing}
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-rose-600/30 inline-flex items-center gap-2 active:scale-95"
            >
              <span>خرید هاست توتینو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-rose-200/60 max-w-md w-full bg-white">
              <img
                src="/src/assets/images/racing_track_finish_1792846395707.jpg"
                alt="مسیر پیروزی و سرعت وب‌سایت با توتینو"
                className="w-full h-auto aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Pre-footer Call Box (Dark bar with berry CTA button) */}
      <div className="bg-slate-950 text-white py-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          
          <div className="flex flex-col gap-1">
            <div className="text-lg sm:text-xl font-bold flex items-center justify-center md:justify-start gap-2 text-white">
              <span>با ما حرف بزنید؛ خوش‌حال می‌شویم</span>
              <span className="text-rose-500 text-xl">🍓</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              همکاران ما در تیم پشتیبانی توتینو آماده پاسخگویی به سوالات شما هستند.
            </p>
          </div>

          <button
            onClick={handleSupportChat}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-rose-600/30 active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>ارتباط با پشتیبانی آنلاین</span>
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              ۷ روز هفته ۲۴ ساعت روز
            </span>
          </button>

        </div>
      </div>

    </section>
  );
};
