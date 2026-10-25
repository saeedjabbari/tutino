import React from 'react';
import { BENCHMARKS } from '../data/mockData';
import { Cpu, Zap, HardDrive, ShieldCheck, Gauge } from 'lucide-react';

export const TechBenchmark: React.FC = () => {
  return (
    <section id="technology" className="py-20 bg-slate-950 text-white relative overflow-hidden border-y border-rose-950/40">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-rose-400 font-extrabold text-xs uppercase tracking-wider block mb-2">
            فناوری توتینو
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            با نیم‌نگاهی به آینده حرکت می‌کنیم
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            تجهیز سرورها به آخرین متدهای ذخیره‌سازی NVMe، وب‌سرورهای لایسنس‌دار لایت‌اسپید و معماری رویدادمحور
          </p>
        </div>

        {/* Benchmark Visual Card & Explainer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column in RTL: Benchmark Bar Chart */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-rose-900/30 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-rose-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  مقایسه عملکرد وب‌سرور در سرورهای مختلف
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">منبع: LiteSpeed Tech</span>
            </div>

            {/* Performance Bars */}
            <div className="space-y-6">
              {BENCHMARKS.map((bench) => (
                <div key={bench.server} className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className={`font-bold ${bench.highlight ? 'text-rose-400' : 'text-slate-300'}`}>
                      {bench.server} {bench.highlight && 'Enterprise (مستقر در توتینو)'}
                    </span>
                    <span className="font-tabular font-bold text-white">
                      {bench.reqPerSec.toLocaleString('fa-IR')} <span className="text-[10px] text-slate-400">req/sec</span>
                    </span>
                  </div>

                  <div className="w-full h-7 bg-slate-950/70 rounded-xl overflow-hidden p-1 border border-slate-800">
                    <div
                      style={{ width: bench.barWidth }}
                      className={`h-full rounded-lg transition-all duration-1000 flex items-center justify-end px-2 ${
                        bench.highlight
                          ? 'bg-gradient-to-r from-rose-600 to-rose-400 text-white font-black text-xs shadow-md shadow-rose-600/40'
                          : 'bg-slate-700 text-slate-300 text-[10px]'
                      }`}
                    >
                      {bench.highlight && '🍓 تا ۸۴ برابر سریع‌تر'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>تست استاندارد ApacheBench در ۱۰۰ کاربر همزمان</span>
              <span className="text-rose-400 font-bold">پاسخگویی آنی زیر ۱۰ میلی‌ثانیه</span>
            </div>
          </div>

          {/* Right Column in RTL: Explanatory Content */}
          <div className="lg:col-span-6 text-right space-y-6">
            
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">لایسنس اورجینال لایت اسپید (LiteSpeed)</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                جایگزین قدرتمند آپاچی یعنی لایت اسپید ثابت کرده است چطور می‌تواند با معماری رویداد محور، بدون آسیب زدن به عملکرد سرور، پرفورمنس را بهبود ببخشد. نتایج یک بنچمارک از مقایسه‌ی پرفورمنس وب سرور Nginx ،Apache و LiteSpeed هنگام بارگذاری وردپرس نشان می‌دهد سرعت پردازش و انتقال داده توسط لایت اسپید، ۱۲ برابر بهتر از Nginx است و می‌تواند آپاچی را تا ۸۴ برابر سریع‌تر اجرا کند.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold">
                  <HardDrive className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">هارد دیسک‌های پرسرعت Enterprise NVMe</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                استفاده انحصاری از درایوهای NVMe Gen4 با نرخ انتقال داده بیش از ۷۰۰۰ مگابایت بر ثانیه در زیرساخت توتینو، باعث می‌شود پایگاه داده MySQL و پرس‌وجوهای سنگین فروشگاه ووکامرسی شما در کسری از ثانیه پردازش و اجرا شوند.
              </p>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">HTTP/3 QUIC Protocol</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">PHP 8.3 & OPcache</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">CloudLinux CageFS</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Redis Object Cache</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
