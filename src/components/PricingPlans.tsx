import React, { useState } from 'react';
import { HOSTING_PLANS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { HostingPlan, ServerLocation } from '../types';
import { Check, Zap, Server, ChevronLeft, Sparkles, Shield } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const PricingPlans: React.FC = () => {
  const { openOrderModal } = useAuth();
  const [location, setLocation] = useState<ServerLocation>('iran');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleOrder = (plan: HostingPlan) => {
    openOrderModal(plan);
  };

  return (
    <section id="pricing" className="py-20 bg-[#FFF5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          
          <div className="relative inline-block mb-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              خرید هاست <span className="text-rose-600">توتینو</span>
            </h2>
            {/* SEO Friendly decorative stamp */}
            <div className="absolute -top-6 -left-16 hidden sm:flex items-center gap-1 text-slate-600 rotate-[-12deg] text-xs font-bold">
              <span>دسته‌بندی SEO Friendly</span>
              <span>🍓</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mb-8">
            بهترین هاست با کانفیگ اختصاصی وب‌سرور لایت‌اسپید و کش چند لایه، متناسب با نیاز و مقیاس کسب‌وکار شما
          </p>

          {/* Location & Billing Cycle Toggles */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* Location Switcher: ایران vs خارج */}
            <div className="bg-white p-1 rounded-2xl shadow-xs border border-rose-200/80 flex items-center">
              <button
                onClick={() => setLocation('iran')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  location === 'iran'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇮🇷 دیتاسنتر ایران</span>
              </button>
              <button
                onClick={() => setLocation('foreign')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  location === 'foreign'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇩🇪 سرور خارج (آلمان)</span>
              </button>
            </div>

            {/* Billing Cycle Switcher: ماهانه vs سالانه */}
            <div className="bg-white p-1 rounded-2xl shadow-xs border border-rose-200/80 flex items-center">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-rose-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                پرداخت ماهانه
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-rose-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>پرداخت سالانه</span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                  ۲ ماه رایگان
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {HOSTING_PLANS.map((plan) => {
            const displayPrice = billingCycle === 'annual'
              ? Math.round(plan.priceAnnual / 12)
              : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl border ${
                  plan.popular
                    ? 'border-rose-500 shadow-md ring-2 ring-rose-500/20'
                    : 'border-rose-100/90 shadow-xs'
                }`}
              >
                {/* Popular Highlight Tag */}
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 bg-rose-600 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md shadow-rose-600/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>پیشنهاد پرطرفدار توتینو</span>
                  </div>
                )}

                {/* Top Info */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">
                    {plan.name}
                  </h3>
                  
                  <div className="text-xs font-bold text-rose-700 mb-4 bg-rose-50 px-2.5 py-1 rounded-lg inline-block border border-rose-100">
                    {plan.targetAudience}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed min-h-[56px] mb-6">
                    {plan.description}
                  </p>

                  {/* Feature specs list */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{plan.specs.disk}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{plan.specs.ram}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{plan.specs.webServer}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{plan.specs.backup}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <div className="mb-4">
                    <div className="text-[11px] text-slate-400">شروع قیمت از:</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 font-tabular">
                        {(displayPrice / 1000).toLocaleString('fa-IR')}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">هزار تومان / ماه</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-[10px] text-emerald-600 font-bold mt-1">
                        صورتحساب سالانه: {(plan.priceAnnual / 1000).toLocaleString('fa-IR')} هزار تومان
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleOrder(plan)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                      plan.popular
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/25'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{plan.name}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Server / Enterprise callout */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">نیاز به منابع و سرور اختصاصی Enterprise دارید؟</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                کانفیگ سفارشی انواع سرورهای اختصاصی HP با پردازنده‌های AMD EPYC و حافظه ECC متناسب با ترافیک‌های میلیونی
              </p>
            </div>
          </div>

          <a
            href="#support-section"
            className="px-6 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50/60 text-slate-800 font-bold text-sm whitespace-nowrap transition-colors"
          >
            مشاوره رایگان با تیم زیرساخت
          </a>
        </div>

      </div>
    </section>
  );
};
