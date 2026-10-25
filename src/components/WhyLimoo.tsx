import React from 'react';
import { Headphones, Server, Zap, RefreshCw } from 'lucide-react';

export const WhyLimoo: React.FC = () => {
  const highlights = [
    {
      title: 'پشتیبانی تخصصی ۲۴ ساعته',
      description: 'پاسخگویی سریع و فنی در تمام طول شبانه‌روز و ۳۶۵ روز سال بدون تاخیر',
      icon: Headphones,
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      title: 'جدیدترین نسل سخت‌افزار',
      description: 'استفاده از سرورهای اختصاصی HP با پردازنده‌های AMD EPYC و حافظه ECC DDR5',
      icon: Server,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'تکنولوژی کش بهینه‌شده توتینو',
      description: 'پیکربندی اختصاصی ماژول LSCache برای فروشگاه‌های ووکامرس و سایت‌های وردپرسی',
      icon: Zap,
      color: 'bg-pink-50 text-pink-600 border-pink-200'
    },
    {
      title: '۳۰ روز ضمانت بازگشت وجه',
      description: 'در صورت عدم رضایت از کیفیت سرویس، بازگشت ۱۰۰٪ وجه بدون قید و شرط',
      icon: RefreshCw,
      color: 'bg-sky-50 text-sky-600 border-sky-200'
    }
  ];

  return (
    <section id="why-tutino" className="py-20 bg-white border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-14">
          چرا <span className="text-rose-600">توتینو</span> بهترین میزبانی وب را ارائه می‌کند؟
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group p-6 rounded-3xl hover:bg-rose-50/30 transition-colors"
            >
              {/* Circular Badge Icon */}
              <div className={`w-24 h-24 rounded-full ${item.color} border-2 flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className="w-10 h-10" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
