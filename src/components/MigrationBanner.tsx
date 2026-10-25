import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export const MigrationBanner: React.FC = () => {
  const { openMigrationModal } = useAuth();

  return (
    <section id="migration" className="py-20 bg-rose-50/60 border-y border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text / Explainer Column */}
          <div className="lg:col-span-7 text-right">
            <span className="text-rose-600 font-extrabold text-xs uppercase tracking-wider block mb-2">
              مهاجرت رایگان به توتینو
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-snug mb-5">
              گذشته غیرقابل تغییر است؛ در مورد ادامه‌ی مسیر مطمئن هستید؟
            </h2>
            <p className="text-base text-slate-700 leading-relaxed max-w-2xl mb-8">
              انتقال هاست و مهاجرت به سرویس میزبانی جدید ممکن است کمی دلهره‌آور باشد؛ ما در توتینو ریسک را به صفر رسانده‌ایم؛ فرقی ندارد که سایت شما در حال حاضر کجاست، تیم پشتیبانی توتینو فرایند انتقال را آسان کرده است، بدون اینکه حتی ۱ ثانیه آفلاین شوید یا سئوی سایت‌تان آسیب ببیند.
            </p>

            <div className="space-y-3 mb-8 text-sm font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>انتقال ۱۰۰٪ رایگان توسط متخصصین فنی توتینو</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>بدون قطعی و Zero-Downtime در جریان انتقال دیتابیس</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>بررسی نهایی سرعت، کش و گواهینامه SSL پس از انتقال</span>
              </div>
            </div>

            <button
              onClick={openMigrationModal}
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-rose-600/30 inline-flex items-center gap-2 active:scale-95"
            >
              <span>مهاجرت به توتینو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Graphic Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              <div className="rounded-3xl overflow-hidden shadow-xl border border-rose-200/80 bg-white p-3">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/src/assets/images/migration_portal_stairs_1792846396502.jpg"
                    alt="فرایند مهاجرت آسان به توتینو"
                    className="w-full h-auto aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Transfer status bar */}
                  <div className="absolute top-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-rose-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-slate-800">در حال انتقال به سرورهای توتینو</span>
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-tabular">
                      ۱۰۰٪ رایگان
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
