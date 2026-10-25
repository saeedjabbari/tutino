import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Server,
  Globe,
  LifeBuoy,
  CreditCard,
  PlusCircle,
  Truck,
  LogOut,
  ExternalLink,
  Wallet,
  Menu,
  X
} from 'lucide-react';
import { BerryLogo } from '../BerryIcon';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, activeView, setActiveView, invoices, tickets, topUpWallet } = useAuth();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('500000');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unpaidCount = invoices.filter(i => i.status === 'unpaid').length;
  const openTicketCount = tickets.filter(t => t.status !== 'closed').length;

  const navItems = [
    { id: 'dashboard', label: 'پیشخوان و خلاصه وضعیت', icon: LayoutDashboard },
    { id: 'services', label: 'سرویس‌های من (هاست و ابری)', icon: Server },
    { id: 'domains', label: 'مدیریت دامنه‌ها', icon: Globe },
    { id: 'tickets', label: 'تیکت‌ها و پشتیبانی ۲۴/۷', icon: LifeBuoy, badge: openTicketCount > 0 ? openTicketCount : undefined },
    { id: 'billing', label: 'صورتحساب‌ها و مالی', icon: CreditCard, badge: unpaidCount > 0 ? unpaidCount : undefined },
    { id: 'new-order', label: 'سفارش سرویس یا دامنه جدید', icon: PlusCircle },
    { id: 'migration', label: 'پیگیری مهاجرت سایت', icon: Truck },
  ];

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(topUpAmount) || 0;
    if (val > 0) {
      topUpWallet(val);
      setIsTopUpOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans text-right">
      
      {/* Top Client Area Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-xs">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          
          {/* Right side in RTL: Brand & Mobile Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-2.5 group text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shadow-xs">
                <BerryLogo size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  ناحیه کاربری <span className="text-rose-600">توتینو</span>
                </span>
                <span className="text-[10px] text-slate-400 -mt-1 font-mono font-bold">tutino.host portal</span>
              </div>
            </button>
          </div>

          {/* Left side in RTL: User Wallet, Quick Actions, Profile */}
          <div className="flex items-center gap-3">
            
            {/* Wallet Balance Chip */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <div className="text-right">
                <span className="text-slate-500 text-[10px] block">موجودی کیف پول:</span>
                <span className="font-bold text-emerald-800 font-tabular">
                  {user ? user.walletBalance.toLocaleString('fa-IR') : '۰'} تومان
                </span>
              </div>
              <button
                onClick={() => setIsTopUpOpen(true)}
                className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold hover:bg-emerald-700 transition-colors"
                title="شارژ کیف پول"
              >
                +
              </button>
            </div>

            {/* Back to main website button */}
            <button
              onClick={() => setActiveView('landing')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>مشاهده وب‌سایت اصلی</span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                {user ? user.fullName[0] : 'U'}
              </div>
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900">{user?.fullName}</span>
                <span className="text-[10px] text-slate-400 font-tabular">{user?.phone}</span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
              title="خروج از حساب"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Desktop Sidebar (Right column in RTL) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-right ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black font-tabular ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#2A0815] text-white rounded-3xl p-4 shadow-sm text-right border border-rose-950/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-rose-400">پشتیبانی آنلاین توتینو فعال</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              کارشناسان توتینو آماده راهنمایی در کانفیگ سرور، سئو، SSL و دیتابیس هستند.
            </p>
            <button
              onClick={() => setActiveView('tickets')}
              className="w-full py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 text-xs font-bold rounded-xl border border-rose-500/30 transition-colors"
            >
              ثبت تیکت پشتیبانی ۲۴/۷
            </button>
          </div>
        </aside>

        {/* Mobile Slide-over Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div className="fixed inset-0 bg-slate-950/40" onClick={() => setMobileSidebarOpen(false)}></div>
            <div className="relative w-72 bg-white p-4 h-full shadow-2xl flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <BerryLogo size={20} />
                    <span className="font-bold text-slate-900">منوی پنل توتینو</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                {navItems.map((item) => {
                  const isActive = activeView === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id as any);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-right ${
                        isActive ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold font-tabular">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => { logout(); setMobileSidebarOpen(false); }}
                className="w-full py-2.5 text-center text-xs font-bold text-rose-600 bg-rose-50 rounded-xl"
              >
                خروج از حساب
              </button>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>

      {/* Top Up Wallet Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-right shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-slate-900">شارژ آنلاین کیف پول توتینو</h4>
              <button onClick={() => setIsTopUpOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">مبلغ به تومان</label>
                <input
                  type="number"
                  step="50000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold font-tabular text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {['200000', '500000', '1000000', '2000000'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTopUpAmount(val)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-slate-700 font-tabular transition-colors"
                  >
                    {parseInt(val).toLocaleString('fa-IR')} ت
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-rose-600/20"
              >
                افزایش موجودی و اتصال به بانک
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
