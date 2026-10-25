import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-rose-950/40 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800 text-xs sm:text-sm">
          
          {/* Column 1: خرید هاست */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-rose-500 pr-2">خرید هاست توتینو</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">هاست ایران</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">هاست وردپرس</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">هاست ووکامرس</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">هاست لینوکس cPanel</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">هاست دانلود</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">هاست ایمیل سازمانی</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">نمایندگی هاست وردپرس</a></li>
              <li><a href="#pricing" className="hover:text-rose-400 transition-colors">نمایندگی هاست لینوکس</a></li>
            </ul>
          </div>

          {/* Column 2: سرور اختصاصی */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-rose-500 pr-2">خرید سرور اختصاصی</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور اختصاصی ایران</a></li>
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور اختصاصی آلمان</a></li>
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور ابری Enterprise</a></li>
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور فروشگاهی مقیاس‌پذیر</a></li>
            </ul>
          </div>

          {/* Column 3: سرور مجازی */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-rose-500 pr-2">سرور مجازی (VPS)</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور مجازی ایران</a></li>
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور مجازی آلمان</a></li>
              <li><a href="#technology" className="hover:text-rose-400 transition-colors">سرور مجازی فنلاند</a></li>
            </ul>
          </div>

          {/* Column 4: خرید دامنه */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-rose-500 pr-2">خرید دامنه</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#domain-search" className="hover:text-rose-400 transition-colors">ثبت دامنه IR</a></li>
              <li><a href="#domain-search" className="hover:text-rose-400 transition-colors">ثبت دامنه خارجی (.com, .net)</a></li>
              <li><a href="#domain-search" className="hover:text-rose-400 transition-colors">انتقال دامنه به توتینو</a></li>
              <li><a href="#domain-search" className="hover:text-rose-400 transition-colors">هویز دامنه آنلاین</a></li>
            </ul>
          </div>

          {/* Column 5: توتینو */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-rose-500 pr-2">توتینو (tutino.host)</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#why-tutino" className="hover:text-rose-400 transition-colors">درباره توتینو</a></li>
              <li><a href="#support-section" className="hover:text-rose-400 transition-colors">تماس با ما</a></li>
              <li><a href="#why-tutino" className="hover:text-rose-400 transition-colors">فرصت‌های شغلی</a></li>
              <li><a href="#why-tutino" className="hover:text-rose-400 transition-colors">قوانین و شرایط سرویس‌دهی</a></li>
              <li><a href="#why-tutino" className="hover:text-rose-400 transition-colors">همکاری در فروش (Affiliate)</a></li>
              <li><a href="#blog" className="hover:text-rose-400 transition-colors">وبلاگ آموزشی توتینو</a></li>
            </ul>
          </div>

        </div>

        {/* Brand statement & Contact info */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-slate-800 text-xs sm:text-sm">
          
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <BerryLogo className="w-9 h-9" />
              <div className="flex flex-col">
                <span className="text-xl font-black text-white">توت<span className="text-rose-500">ینو</span></span>
                <span className="text-[10px] text-rose-400" dir="ltr">tutino.host</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              توتینو با الهام از طراوت و چابکی، با هدف ارائه خدمات میزبانی وب و سرورهای ابری با بالاترین پایداری و استانداردهای نوین تکنولوژی متولد شد. ما باور داریم کسب‌وکارهای آنلاین شایسته بهترین سرعت، امنیت خلل‌ناپذیر و پشتیبانی صمیمانه هستند.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-2.5">
            <h5 className="font-bold text-white text-xs mb-3">راهنمای ارتباطی و پشتیبانی:</h5>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-rose-400 shrink-0" />
              <span>تلفن تماس: <strong className="font-tabular text-white" dir="ltr">۰۲۱ - ۹۱۰۹۷۶۲۹</strong> (روزهای کاری ۹ تا ۱۷)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-rose-400 shrink-0" />
              <span>ایمیل: <strong className="text-white" dir="ltr">info@tutino.host</strong></span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری توتینو، طبقه پنجم</span>
            </div>
          </div>

        </div>

        {/* Trust Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <ShieldCheck className="w-6 h-6 text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300 block font-bold">اینماد الکترونیکی</span>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <ShieldCheck className="w-6 h-6 text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300 block font-bold">ستاد ساماندهی</span>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <ShieldCheck className="w-6 h-6 text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300 block font-bold">اتحادیه کسب‌وکارها</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <span>طراحی، میزبانی و پشتیبانی توسط توتینو</span>
            <span>🍓</span>
            <span>© ۱۴۰۳ تمامی حقوق محفوظ است.</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
