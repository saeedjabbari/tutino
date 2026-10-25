import React from 'react';
import { Users, HeartHandshake, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BerryLogo } from './BerryIcon';

export const SupportSection: React.FC = () => {
  const { user, setActiveView, openAuthModal } = useAuth();

  const handleSupportClick = () => {
    if (user) {
      setActiveView('tickets');
    } else {
      openAuthModal('login');
    }
  };

  return (
    <section id="support-section" className="py-20 bg-gradient-to-b from-white via-rose-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-right">
            <span className="text-rose-600 font-extrabold text-xs uppercase tracking-wider block mb-2">
              پشتیبانی تخصصی توتینو
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-5">
              حرفه‌ای‌ترین‌ها هم گاهی لحظات سختی دارند...
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-8">
              ممکن است در مدیریت وردپرس، دیتابیس یا سرور با چالش‌هایی روبه‌رو شوید که حل آن به بررسی دقیق کارشناسان فنی نیاز داشته باشد. روی سیستم پشتیبانی شبانه‌روزی توتینو حساب کنید؛ ما در تمام ساعات روز و ۳۶۵ روز سال در کنار شما هستیم تا خدمات میزبانی وب برای سایت شما با بالاترین سرعت و بدون کوچک‌ترین نقصی پیش برود.
            </p>

            {/* 3 Support Traits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              
              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs flex flex-col items-start text-right">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">تیم چند مهارتی و حرفه‌ای</h4>
                <p className="text-xs text-slate-500">مدیریت مسائل کوچک تا چالش‌های اساسی سرور</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs flex flex-col items-start text-right">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">پاسخ‌گویی دوستانه و ساده</h4>
                <p className="text-xs text-slate-500">تعامل صمیمانه برای رسیدن به بهترین راه‌حل</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs flex flex-col items-start text-right">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">پاسخ‌گویی ۲۴ ساعته</h4>
                <p className="text-xs text-slate-500">در تمام ۳۶۵ روز سال و بدون تعطیلی</p>
              </div>

            </div>

            <button
              onClick={handleSupportClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span>ارسال تیکت پشتیبانی به توتینو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Support Engineer Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Backing Card with Ruby Berry Gradient */}
              <div className="relative rounded-3xl p-6 bg-gradient-to-tr from-slate-950 via-[#2A101C] to-[#4C1126] text-white shadow-2xl overflow-hidden border border-rose-900/40">
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl"></div>
                
                <div className="relative rounded-2xl overflow-hidden border border-rose-500/30 mb-5">
                  <img
                    src="/src/assets/images/support_expert_portrait_1792846396051.jpg"
                    alt="مهندس پشتیبانی توتینو"
                    className="w-full h-auto aspect-square object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Speech bubble */}
                  <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 text-slate-900 shadow-xl border border-white/40 flex items-center gap-3">
                    <BerryLogo className="w-9 h-9" />
                    <div>
                      <div className="text-xs font-bold text-rose-800">پشتیبانی توتینو</div>
                      <div className="text-xs font-medium text-slate-700">چطور می‌تونم کمکتون کنم؟</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-rose-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>هم‌اکنون آنلاین و آماده پاسخگویی</span>
                  </span>
                  <span className="font-tabular font-bold">میانگین پاسخ: کمتر از ۱۵ دقیقه</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
