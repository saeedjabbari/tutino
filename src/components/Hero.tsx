import React from 'react';
import { Check, ArrowLeft, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const Hero: React.FC = () => {
  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDomain = () => {
    const el = document.getElementById('domain-search');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-white via-rose-50/25 to-[#FFF5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right/Hero Text Content (in RTL right column is first) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-900 text-xs font-bold mb-6 border border-rose-200/60">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
              <span>توتینو (tutino.host) · میزبانی تخصصی ۷۰۰۰۰+ وب‌سایت و فروشگاه آنلاین</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              خرید هاست، خرید سرور و ثبت دامنه در <span className="text-rose-600">توتینو</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              از تنوع سرویس‌های میزبانی وب تا بهینه‌سازی سرعت و مهاجرت رایگان، ما تمام مسیر رشد یک وب‌سایت نوپای وردپرسی تا یک فروشگاه بزرگ اینترنتی را در بستری امن، چابک و باطراوت فراهم کرده‌ایم.
            </p>

            {/* 3 Checkmark Perks */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm font-semibold text-slate-700 mb-9">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>راه‌اندازی آنی و تحویل خودکار</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>گواهی SSL رایگان مادام‌العمر</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>پشتیبانی شبانه‌روزی ۲۴/۷</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToPricing}
                className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 text-base active:scale-95"
              >
                <span>خرید هاست توتینو</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToDomain}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-rose-50/50 text-slate-800 font-bold border border-rose-200/80 rounded-xl transition-colors flex items-center justify-center gap-2 text-base shadow-xs"
              >
                <span>مشاهده پلان‌های هاستینگ</span>
              </button>
            </div>

            {/* Fast Stats Row */}
            <div className="mt-12 pt-8 border-t border-rose-100 grid grid-cols-3 gap-6 w-full max-w-xl text-right">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-rose-600 font-tabular">۹۹.۹۹٪</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">تضمین پایداری و آپتایم</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-tabular">۷۰۰۰۰+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">سایت و فروشگاه فعال</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-tabular">۱۵ دقیقه</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">میانگین پاسخگویی تیکت</div>
              </div>
            </div>

          </div>

          {/* Left/Graphic Illustration Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg">
              
              {/* Backing subtle berry glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-400/20 via-pink-400/20 to-emerald-400/10 rounded-3xl blur-2xl -z-10"></div>
              
              <div className="relative bg-white rounded-3xl p-3 shadow-2xl border border-rose-100 overflow-hidden">
                <img
                  src="./images/hero_tutino_hosting_1792918746953.jpg"
                  alt="میزبانی ابری توتینو - سرورهای پرسرعت با معماری مدرن"
                  className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />

                {/* Floating pill badge on image */}
                <div className="absolute bottom-6 right-6 left-6 bg-slate-950/90 backdrop-blur-md text-white rounded-2xl p-4 shadow-xl border border-rose-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BerryLogo className="w-9 h-9" />
                    <div>
                      <div className="text-xs text-slate-400">قدرت پردازش سرورهای توتینو</div>
                      <div className="text-sm font-bold text-rose-400">۱۲ برابر سریع‌تر با LiteSpeed Enterprise</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    NVMe Gen4
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
