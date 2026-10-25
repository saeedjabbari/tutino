import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Server,
  Globe,
  CreditCard,
  LifeBuoy,
  HardDrive,
  ArrowUpRight,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BerryLogo } from '../BerryIcon';

export const DashboardOverview: React.FC = () => {
  const { user, services, domains, tickets, invoices, setActiveView } = useAuth();

  const activeServices = services.filter(s => s.status === 'active');
  const unpaidInvoices = invoices.filter(i => i.status === 'unpaid');
  const openTickets = tickets.filter(t => t.status !== 'closed');

  // Compute total disk usage
  const totalDiskUsed = services.reduce((acc, s) => acc + s.diskUsageGb, 0);
  const totalDiskCap = services.reduce((acc, s) => acc + s.diskTotalGb, 0) || 35;
  const diskPercent = Math.min(100, Math.round((totalDiskUsed / totalDiskCap) * 100));

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#2A0815] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BerryLogo size={18} />
            <span className="text-rose-400 font-bold text-xs uppercase tracking-wider">
              خوش آمدید، {user?.fullName} 🍓
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            پیشخوان مدیریت سرویس‌های ابری توتینو
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            تمام منابع سخت‌افزاری سرورها، کش لایت‌اسپید، تیکت‌های پشتیبانی و تمدید دامنه‌ها در وضعیت نرمال و پایدار قرار دارند.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveView('new-order')}
            className="flex-1 md:flex-none px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>خرید هاست توتینو</span>
          </button>

          <button
            onClick={() => setActiveView('tickets')}
            className="flex-1 md:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>ارسال تیکت</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Services */}
        <div
          onClick={() => setActiveView('services')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">سرویس‌های فعال</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-tabular">{activeServices.length}</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">پایداری ۹۹.۹۹٪ ابری</span>
        </div>

        {/* Domains */}
        <div
          onClick={() => setActiveView('domains')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">دامنه‌های ثبت شده</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-tabular">{domains.length}</div>
          <span className="text-[11px] text-blue-600 font-bold mt-1 block">DNSهای فعال در توتینو</span>
        </div>

        {/* Invoices */}
        <div
          onClick={() => setActiveView('billing')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">فاکتورهای پرداخت نشده</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              unpaidInvoices.length > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
            }`}>
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-tabular">{unpaidInvoices.length}</div>
          <span className={`text-[11px] font-bold mt-1 block ${unpaidInvoices.length > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
            {unpaidInvoices.length > 0 ? 'نیاز به تسویه' : 'همه فاکتورها تسویه شده'}
          </span>
        </div>

        {/* Tickets */}
        <div
          onClick={() => setActiveView('tickets')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">تیکت‌های باز</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LifeBuoy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-tabular">{openTickets.length}</div>
          <span className="text-[11px] text-purple-600 font-bold mt-1 block">پاسخگویی آنلاین توتینو</span>
        </div>

      </div>

      {/* Resource Health Monitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Resource Monitor 1: Disk */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-rose-600" />
              <h4 className="text-sm font-bold text-slate-900">فضای ذخیره‌سازی NVMe توتینو</h4>
            </div>
            <span className="text-xs font-black text-rose-600 font-tabular">{diskPercent}٪</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-rose-600 rounded-full transition-all"
              style={{ width: `${diskPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>مصرف شده: <strong className="font-tabular text-slate-800">{totalDiskUsed.toFixed(1)} GB</strong></span>
            <span>کل فضا: <strong className="font-tabular text-slate-800">{totalDiskCap} GB</strong></span>
          </div>
        </div>

        {/* Resource Monitor 2: Web Server Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-900">وضعیت وب‌سرور LiteSpeed</h4>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Online</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            ماژول کش اختصاصی LSCache فعال است؛ مصرف CPU سرور در محدوده بهینه ۱۰٪ قرار دارد.
          </p>
          <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
            <span>نرخ کش شدن صفحات:</span>
            <span className="font-black text-emerald-600 font-tabular">۹۸.۴٪</span>
          </div>
        </div>

        {/* Resource Monitor 3: Security & Firewall */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <h4 className="text-sm font-bold text-slate-900">امنیت و گواهی SSL</h4>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">فعال</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            گواهی امنیتی Let's Encrypt و فایروال ضد حمله DDoS لایه ۷ بر روی تمامی دامنه‌ها مستقر است.
          </p>
          <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
            <span>حملات مسدودشده اخیر:</span>
            <span className="font-black text-slate-800 font-tabular">۳۴ مورد</span>
          </div>
        </div>

      </div>

      {/* Active Services Summary Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-slate-900">سرویس‌های هاست و سرور توتینو من</h3>
          <button
            onClick={() => setActiveView('services')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <span>مدیریت کامل سرویس‌ها</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium pb-2">
                <th className="pb-3 pr-2">نام سرویس</th>
                <th className="pb-3">دامنه متصل</th>
                <th className="pb-3">آی‌پی سرور</th>
                <th className="pb-3">سررسید تمدید</th>
                <th className="pb-3">وضعیت</th>
                <th className="pb-3 pl-2 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-2 font-bold text-slate-900">
                    {srv.planName}
                  </td>
                  <td className="py-3.5 font-tabular text-slate-600 font-semibold" dir="ltr">
                    {srv.domain}
                  </td>
                  <td className="py-3.5 font-tabular text-slate-500" dir="ltr">
                    {srv.ipAddress}
                  </td>
                  <td className="py-3.5 font-tabular">
                    {srv.renewalDate}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      srv.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {srv.status === 'active' ? 'فعال' : 'در انتظار پرداخت'}
                    </span>
                  </td>
                  <td className="py-3.5 pl-2 text-left">
                    <a
                      href={srv.controlPanelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-800 rounded-lg text-xs font-bold transition-colors"
                    >
                      <span>ورود به cPanel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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
