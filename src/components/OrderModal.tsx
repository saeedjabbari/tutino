import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ServerLocation } from '../types';
import { X, Check, Globe, ArrowLeft } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const OrderModal: React.FC = () => {
  const {
    isOrderModalOpen,
    closeOrderModal,
    selectedPlanForOrder,
    createHostingOrder,
    openPaymentModal,
    user,
    openAuthModal
  } = useAuth();

  const [domainName, setDomainName] = useState('');
  const [location, setLocation] = useState<ServerLocation>('iran');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOrderModalOpen || !selectedPlanForOrder) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) {
      setErrorMsg('لطفاً نام دامنه مورد نظر را وارد نمایید (مثال: mysite.com).');
      return;
    }

    if (!user) {
      closeOrderModal();
      openAuthModal('login');
      return;
    }

    const inv = createHostingOrder(selectedPlanForOrder, domainName.trim(), location, billingCycle);
    closeOrderModal();
    openPaymentModal(inv);
  };

  const currentPrice = billingCycle === 'annual'
    ? selectedPlanForOrder.priceAnnual
    : selectedPlanForOrder.priceMonthly;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={closeOrderModal}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <BerryLogo size={18} />
            </div>
            <span className="text-xs bg-rose-500/20 text-rose-300 font-bold px-2.5 py-0.5 rounded-full border border-rose-500/30">
              کانفیگ و سفارش سرویس توتینو
            </span>
          </div>
          <h3 className="text-xl font-black text-white">{selectedPlanForOrder.name}</h3>
          <p className="text-xs text-slate-300 mt-1">{selectedPlanForOrder.targetAudience}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Domain Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              نام دامنه وب‌سایت
            </label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                placeholder="example.com یا sitename.ir"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 font-medium"
              />
              <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              می‌توانید از دامنه فعلی‌تان استفاده کنید یا دامنه جدید در توتینو ثبت فرمایید.
            </span>
          </div>

          {/* Location Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              موقعیت سرور (دیتاسنتر ابری توتینو)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLocation('iran')}
                className={`p-3 rounded-2xl border text-right transition-all ${
                  location === 'iran'
                    ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                  <span>🇮🇷 ایران (برج میلاد / افرانت)</span>
                  {location === 'iran' && <Check className="w-4 h-4 text-rose-600" />}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">ترافیک نیم‌بها و پینگ زیر ۵ میلی‌ثانیه</div>
              </button>

              <button
                type="button"
                onClick={() => setLocation('foreign')}
                className={`p-3 rounded-2xl border text-right transition-all ${
                  location === 'foreign'
                    ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                  <span>🇩🇪 خارج (آلمان Hetzner)</span>
                  {location === 'foreign' && <Check className="w-4 h-4 text-rose-600" />}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">پورت ۱۰ گیگابیت بدون تحریم بین‌المللی</div>
              </button>
            </div>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              دوره پرداخت
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`p-3 rounded-2xl border text-right relative transition-all ${
                  billingCycle === 'annual'
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                  <span>سالانه (پیشنهادی)</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                    ۲ ماه هدیه 🍓
                  </span>
                </div>
                <div className="text-xs font-tabular font-bold text-emerald-700 mt-1">
                  {(selectedPlanForOrder.priceAnnual / 1000).toLocaleString('fa-IR')} هزار تومان
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`p-3 rounded-2xl border text-right transition-all ${
                  billingCycle === 'monthly'
                    ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                  <span>ماهانه</span>
                  {billingCycle === 'monthly' && <Check className="w-4 h-4 text-rose-600" />}
                </div>
                <div className="text-xs font-tabular font-bold text-slate-700 mt-1">
                  {(selectedPlanForOrder.priceMonthly / 1000).toLocaleString('fa-IR')} هزار تومان
                </div>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>هزینه سرویس میزبانی:</span>
              <span className="font-bold font-tabular text-slate-900">{currentPrice.toLocaleString('fa-IR')} تومان</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>گواهی امنیتی SSL و سئو:</span>
              <span className="font-bold text-emerald-600">رایگان مادام‌العمر</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>نصب وردپرس و انتقال سایت:</span>
              <span className="font-bold text-emerald-600">رایگان توسط توتینو</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
              <span>مبلغ کل فاکتور:</span>
              <span className="text-rose-600 text-base font-black font-tabular">{currentPrice.toLocaleString('fa-IR')} تومان</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-sm transition-all shadow-md shadow-rose-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>ثبت سفارش و پرداخت فاکتور</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
