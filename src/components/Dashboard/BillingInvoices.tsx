import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle } from 'lucide-react';
import { Invoice } from '../../types';

export const BillingInvoices: React.FC = () => {
  const { invoices, openPaymentModal, user, topUpWallet } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [walletAmount, setWalletAmount] = useState('1000000');

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const handlePay = (inv: Invoice) => {
    openPaymentModal(inv);
  };

  const handleChargeWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(walletAmount) || 0;
    if (val > 0) {
      topUpWallet(val);
      alert(`مبلغ ${val.toLocaleString('fa-IR')} تومان به کیف پول توتینو افزوده شد.`);
    }
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">صورتحساب‌ها و مالی توتینو</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            مشاهده وضعیت فاکتورها، تاریخ سررسید و تسویه آنلاین با درگاه بانکی
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            همه فاکتورها
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filter === 'unpaid' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            پرداخت نشده
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filter === 'paid' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            پرداخت شده
          </button>
        </div>
      </div>

      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#2A0815] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-rose-950/40">
        <div>
          <span className="text-rose-400 font-bold text-xs uppercase tracking-wider block mb-1">
            کیف پول کاربری توتینو 🍓
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-tabular text-white">
              {user?.walletBalance.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs sm:text-sm text-rose-300 font-semibold">تومان</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            با شارژ موجودی، سرویس‌ها و دامنه‌ها به صورت خودکار در موعد مقرر تمدید خواهند شد.
          </p>
        </div>

        {/* Quick top-up form */}
        <form onSubmit={handleChargeWallet} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="number"
            step="100000"
            value={walletAmount}
            onChange={(e) => setWalletAmount(e.target.value)}
            className="w-36 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold font-tabular text-white focus:outline-none focus:border-rose-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap active:scale-95"
          >
            شارژ حساب
          </button>
        </form>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium pb-2">
                <th className="pb-3 pr-2">شماره فاکتور</th>
                <th className="pb-3">شرح سرویس</th>
                <th className="pb-3">تاریخ صدور</th>
                <th className="pb-3">سررسید</th>
                <th className="pb-3">مبلغ (تومان)</th>
                <th className="pb-3">وضعیت</th>
                <th className="pb-3 pl-2 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-2 font-bold font-tabular text-slate-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 font-semibold text-slate-800">
                    {inv.title}
                  </td>
                  <td className="py-3.5 font-tabular text-slate-500">
                    {inv.issueDate}
                  </td>
                  <td className="py-3.5 font-tabular text-slate-500">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 font-tabular font-black text-slate-900">
                    {inv.amount.toLocaleString('fa-IR')}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      inv.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {inv.status === 'paid' ? 'تسویه شده' : 'پرداخت نشده'}
                    </span>
                  </td>
                  <td className="py-3.5 pl-2 text-left">
                    {inv.status === 'unpaid' ? (
                      <button
                        onClick={() => handlePay(inv)}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs active:scale-95"
                      >
                        پرداخت آنلاین
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold text-xs flex items-center justify-end gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>رسید پرداخت</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
