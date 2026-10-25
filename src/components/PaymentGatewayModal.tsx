import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const PaymentGatewayModal: React.FC = () => {
  const { isPaymentModalOpen, closePaymentModal, activeInvoiceToPay, payInvoice, setActiveView } = useAuth();

  const [cardNumber, setCardNumber] = useState('6037-9918-2432-8871');
  const [cvv2, setCvv2] = useState('482');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [dynamicPin, setDynamicPin] = useState('892134');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  if (!isPaymentModalOpen || !activeInvoiceToPay) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      payInvoice(activeInvoiceToPay.id);
      setIsProcessing(false);
      setIsPaidSuccess(true);
    }, 1200);
  };

  const handleFinish = () => {
    setIsPaidSuccess(false);
    closePaymentModal();
    setActiveView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150 text-right">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Gateway Bar */}
        <div className="bg-[#1E293B] text-white p-5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <BerryLogo size={22} />
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                <span>درگاه پرداخت الکترونیک شاپرک</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">امن SSL</span>
              </div>
              <div className="text-[11px] text-slate-400">به‌پرداخت ملت / زرین‌پال - توتینو (tutino.host)</div>
            </div>
          </div>

          <button
            onClick={closePaymentModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isPaidSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl font-black text-slate-900">پرداخت با موفقیت انجام شد 🍓</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              شماره پیگیری تراکنش: <strong className="font-tabular text-slate-900">TRX-{Math.floor(1000000 + Math.random() * 9000000)}</strong>
              <br />
              سرویس شما به صورت آنی در کلاود توتینو فعال گردید و مشخصات اتصال ارسال شد.
            </p>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm transition-all shadow-md mt-4"
            >
              مشاهده سرویس در ناحیه کاربری توتینو
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            
            {/* Invoice summary box */}
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>شماره فاکتور:</span>
                <span className="font-bold text-slate-900 font-tabular">{activeInvoiceToPay.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>شرح سرویس:</span>
                <span className="font-medium text-slate-800 line-clamp-1">{activeInvoiceToPay.title}</span>
              </div>
              <div className="pt-2 border-t border-rose-200/60 flex justify-between text-sm font-bold text-slate-900">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-rose-600 text-base font-black font-tabular">{activeInvoiceToPay.amount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            {/* Card number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">شماره کارت بانکی ۱۶ رقمی</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <CreditCard className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">کد شناسایی (CVV2)</label>
                <input
                  type="text"
                  dir="ltr"
                  maxLength={4}
                  value={cvv2}
                  onChange={(e) => setCvv2(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-center font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تاریخ انقضا (ماه / سال)</label>
                <div className="flex items-center gap-1.5" dir="ltr">
                  <input
                    type="text"
                    maxLength={2}
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    className="w-1/2 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-center font-bold"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    className="w-1/2 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-center font-bold"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">رمز پویا (یکبار مصرف)</label>
                <button
                  type="button"
                  onClick={() => alert('رمز پویا پیامک شد: ۸۹۲۱۳۴')}
                  className="text-[11px] text-rose-600 font-bold hover:underline"
                >
                  درخواست رمز پویا
                </button>
              </div>
              <input
                type="password"
                dir="ltr"
                value={dynamicPin}
                onChange={(e) => setDynamicPin(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-black rounded-xl text-sm transition-all shadow-md shadow-rose-600/20 active:scale-95 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>در حال ارتباط با بانک مرکزی...</span>
                ) : (
                  <>
                    <span>پرداخت {activeInvoiceToPay.amount.toLocaleString('fa-IR')} تومان</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>اتصال رمزنگاری شده ۲۵۶ بیتی به شبکه بانکی شاپرک</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
