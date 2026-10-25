import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BerryLogo } from './BerryIcon';
import {
  Server,
  Globe,
  Layers,
  Cpu,
  HelpCircle,
  BookOpen,
  User,
  LogIn,
  ChevronDown,
  Menu,
  X,
  Shield,
  Zap,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, openAuthModal, activeView, setActiveView, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navHostDropdown = [
    { title: 'هاست وردپرس توتینو', desc: 'بهینه‌شده برای سایت‌های پربازدید و وبلاگ‌ها', icon: Zap, href: '#pricing' },
    { title: 'هاست ووکامرس توتینو', desc: 'سرعت و امنیت فوق‌العاده برای فروشگاه آنلاین', icon: ShoppingBag, href: '#pricing' },
    { title: 'هاست لینوکس cPanel', desc: 'کنترل‌پنل محبوب با وب‌سرور لایت‌اسپید', icon: Layers, href: '#pricing' },
    { title: 'هاست اقتصادی توتینو', desc: 'شروع ارزان و باکیفیت برای سایت‌های نوپا', icon: Shield, href: '#pricing' },
  ];

  const navDomainDropdown = [
    { title: 'ثبت دامنه IR', desc: 'فقط ۴۹,۰۰۰ تومان سالانه با فعال‌سازی آنی', href: '#domain-search' },
    { title: 'دامنه‌های بین‌المللی (.com, .net)', desc: 'مالکیت ۱۰۰٪ و بدون تحریم', href: '#domain-search' },
    { title: 'انتقال دامنه به توتینو', desc: 'تمدید ۱ ساله هدیه با انتقال آسان', href: '#domain-search' },
  ];

  const navServerDropdown = [
    { title: 'سرور مجازی ایران', desc: 'پینگ تک‌رقمی و ترافیک نامحدود داخلی', href: '#server-section' },
    { title: 'سرور مجازی آلمان (Hetzner)', desc: 'پورت ۱۰ گیگابیت با آی‌پی تمیز', href: '#server-section' },
    { title: 'سرور اختصاصی Enterprise', desc: 'سخت‌افزار اختصاصی و مانیتورینگ ۲۴/۷', href: '#server-section' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-3 text-right focus-visible:outline-none group"
            >
              <BerryLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  توت<span className="text-rose-600">ینو</span>
                </span>
                <span className="text-[10px] text-rose-500/80 -mt-1 font-semibold tracking-wide" dir="ltr">tutino.host</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
              
              {/* Host Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('host')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => {
                    setActiveView('landing');
                    const el = document.getElementById('pricing');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
                >
                  هاست
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeDropdown === 'host' && (
                  <div className="absolute top-full right-0 w-80 p-2 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="grid grid-cols-1 gap-1">
                      {navHostDropdown.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => {
                            setActiveView('landing');
                            setActiveDropdown(null);
                          }}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-rose-50/80 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-rose-100 text-rose-700 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800 group-hover:text-rose-600">{item.title}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{item.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Domain Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('domain')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => {
                    setActiveView('landing');
                    const el = document.getElementById('domain-search');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
                >
                  ثبت و خرید دامنه
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeDropdown === 'domain' && (
                  <div className="absolute top-full right-0 w-72 p-2 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {navDomainDropdown.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setActiveView('landing');
                          setActiveDropdown(null);
                        }}
                        className="block p-3 rounded-xl hover:bg-rose-50/60 transition-colors"
                      >
                        <div className="text-sm font-bold text-slate-800">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.desc}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Server Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('server')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => {
                    setActiveView('landing');
                    const el = document.getElementById('technology');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
                >
                  سرور
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeDropdown === 'server' && (
                  <div className="absolute top-full right-0 w-72 p-2 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {navServerDropdown.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setActiveView('landing');
                          setActiveDropdown(null);
                        }}
                        className="block p-3 rounded-xl hover:bg-rose-50/60 transition-colors"
                      >
                        <div className="text-sm font-bold text-slate-800">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.desc}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* DevOps */}
              <a 
                href="#features" 
                onClick={() => setActiveView('landing')}
                className="px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors whitespace-nowrap"
              >
                خدمات DevOps
              </a>

              {/* Cooperation */}
              <a 
                href="#migration" 
                onClick={() => setActiveView('landing')}
                className="px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors whitespace-nowrap"
              >
                همکاری با ما
              </a>

              {/* About Us */}
              <a 
                href="#why-tutino" 
                onClick={() => setActiveView('landing')}
                className="px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors whitespace-nowrap"
              >
                درباره ما
              </a>

              {/* Blog / Academy */}
              <a 
                href="#blog" 
                onClick={() => setActiveView('landing')}
                className="px-3 py-2 rounded-lg hover:text-rose-600 hover:bg-rose-50/60 transition-colors whitespace-nowrap"
              >
                آکادمی توتینو
              </a>
            </nav>
          </div>

          {/* User Auth & Client Area Actions (Left side in RTL) */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    activeView !== 'landing'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{activeView === 'landing' ? 'ناحیه کاربری' : 'مشاهده وب‌سایت'}</span>
                </button>
                <div className="hidden sm:flex flex-col text-left text-xs border-r border-slate-200 pr-3">
                  <span className="font-bold text-slate-900">{user.fullName}</span>
                  <span className="text-rose-600 font-bold font-tabular">{user.walletBalance.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>ورود</span>
                </button>

                <button
                  onClick={() => openAuthModal('register')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md shadow-rose-600/20 transition-all active:scale-95"
                >
                  <span>ثبت نام</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-rose-100 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-800">
              <button 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="text-right px-3 py-2 rounded-lg hover:bg-rose-50"
              >
                صفحه اصلی توتینو (tutino.host)
              </button>
              <a 
                href="#pricing" 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="text-right px-3 py-2 rounded-lg hover:bg-rose-50"
              >
                خرید هاست (وردپرس، ووکامرس، لینوکس)
              </a>
              <a 
                href="#domain-search" 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="text-right px-3 py-2 rounded-lg hover:bg-rose-50"
              >
                ثبت و جستجوی دامنه
              </a>
              <a 
                href="#technology" 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="text-right px-3 py-2 rounded-lg hover:bg-rose-50"
              >
                فناوری لایت‌اسپید و NVMe
              </a>
              <a 
                href="#migration" 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="text-right px-3 py-2 rounded-lg hover:bg-rose-50"
              >
                مهاجرت رایگان به توتینو
              </a>
              <a 
                href="#faq" 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="text-right px-3 py-2 rounded-lg hover:bg-rose-50"
              >
                سوالات متداول
              </a>

              {user ? (
                <div className="pt-2 border-t border-rose-100 flex flex-col gap-2">
                  <button
                    onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2.5 bg-rose-600 text-white font-bold rounded-xl shadow-sm"
                  >
                    ورود به پنل کاربری ({user.fullName})
                  </button>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 text-rose-600 font-medium text-xs hover:bg-rose-50 rounded-xl"
                  >
                    خروج از حساب کاربری
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-rose-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                    className="py-2.5 text-center font-bold text-slate-800 bg-slate-100 rounded-xl"
                  >
                    ورود
                  </button>
                  <button
                    onClick={() => { openAuthModal('register'); setMobileMenuOpen(false); }}
                    className="py-2.5 text-center font-bold text-white bg-rose-600 rounded-xl shadow-xs"
                  >
                    ثبت نام
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
