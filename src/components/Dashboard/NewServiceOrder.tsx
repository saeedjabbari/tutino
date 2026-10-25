import React, { useState } from 'react';
import { HOSTING_PLANS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { ServerLocation } from '../../types';
import { Globe } from 'lucide-react';
import { BerryLogo } from '../BerryIcon';

export const NewServiceOrder: React.FC = () => {
  const { createHostingOrder, openPaymentModal } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState(HOSTING_PLANS[1].id);
  const [domainName, setDomainName] = useState('');
  const [location, setLocation] = useState<ServerLocation>('iran');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedPlan = HOSTING_PLANS.find(p => p.id === selectedPlanId) || HOSTING_PLANS[1];
  const price = billingCycle === 'annual' ? selectedPlan.priceAnnual : selectedPlan.priceMonthly;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) {
      setErrorMsg('لطفاً نام دامنه وب‌سایت خود را وارد فرمایید.');
      return;
    }

    const inv = createHostingOrder(selectedPlan, domainName.trim(), location, billingCycle);
    openPaymentModal(inv);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">سفارش سرویس هاستینگ جدید توتینو</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          انتخاب پلن پرسرعت با وب‌سرور لایت‌اسپید اینترپرایز و تحویل آنی کمتر از ۱ دقیقه
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Plans Selection (Right) */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold text-slate-500 block mb-2">۱. انتخاب پلن هاستینگ توتینو:</span>
          
          <div className="space-y-3">
            {HOSTING_PLANS.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              const displayPrice = billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isSelected ? 'bg-rose-600 text-white font-bold' : 'border border-slate-300'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{plan.name}</h4>
                    </div>

                    <div className="text-sm font-black text-slate-900 font-tabular">
                      {(displayPrice / 1000).toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">هزار ت/ماه</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mr-7 mb-2">{plan.targetAudience}</p>

                  <div className="mr-7 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
                    <span>💾 {plan.specs.disk}</span>
                    <span>⚡ {plan.specs.ram}</span>
                    <span>🚀 {plan.specs.webServer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Configuration & Checkout (Left) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <span className="text-xs font-bold text-slate-500 block">۲. کانفیگ و ثبت نهایی:</span>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleOrder} className="space-y-4">
            
            {/* Domain */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">دامنه وب‌سایت</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  placeholder="mydomain.com"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">دیتاسنتر سرور ابری</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setLocation('iran')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    location === 'iran' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  🇮🇷 ایران (برج میلاد)
                </button>
                <button
                  type="button"
                  onClick={() => setLocation('foreign')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    location === 'foreign' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  🇩🇪 خارج (آلمان Hetzner)
                </button>
              </div>
            </div>

            {/* Billing Cycle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">دوره صورتحساب</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    billingCycle === 'annual' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  سالانه (۲ ماه هدیه 🍓)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    billingCycle === 'monthly' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  ماهانه
                </button>
              </div>
            </div>

            {/* Price Total */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">مبلغ کل فاکتور:</span>
              <span className="text-lg font-black text-rose-600 font-tabular">
                {price.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs transition-all shadow-md shadow-rose-600/20 active:scale-95"
            >
              صدور فاکتور و پرداخت آنلاین توتینو
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
