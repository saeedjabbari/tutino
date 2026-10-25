import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ArrowLeft, Shield, Check } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const MigrationModal: React.FC = () => {
  const { isMigrationModalOpen, closeMigrationModal, submitMigration, user, openAuthModal } = useAuth();

  const [domain, setDomain] = useState('');
  const [previousHost, setPreviousHost] = useState('');
  const [panel, setPanel] = useState<'cPanel' | 'DirectAdmin' | 'Plesk' | 'Other'>('cPanel');
  const [controlPanelUrl, setControlPanelUrl] = useState('');
  const [panelUsername, setPanelUsername] = useState('');
  const [panelPassword, setPanelPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isMigrationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !previousHost.trim() || !controlPanelUrl.trim()) {
      setErrorMsg('لطفاً نام دامنه، شرکت هاستینگ قبلی و آدرس کنترل‌پنل را وارد فرمایید.');
      return;
    }

    if (!user) {
      closeMigrationModal();
      openAuthModal('login');
      return;
    }

    submitMigration(domain, previousHost, panel, controlPanelUrl);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeMigrationModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={closeMigrationModal}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <BerryLogo size={18} />
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              انتقال ۱۰۰٪ رایگان و بدون قطعی
            </span>
          </div>
          <h3 className="text-xl font-black text-white">فرم درخواست مهاجرت به توتینو</h3>
          <p className="text-xs text-slate-300 mt-1">تیم فنی توتینو تمام اطلاعات سایت شما را با حفظ کامل رتبه سئو منتقل می‌کند.</p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">درخواست مهاجرت با موفقیت ثبت شد</h4>
            <p className="text-xs text-slate-500">
              کارشناسان مهاجرت توتینو تا حداکثر ۳۰ دقیقه دیگر انتقال سایت را آغاز نموده و از طریق تیکت اطلاع‌رسانی خواهند کرد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">دامنه سایت</label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="mysite.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">شرکت هاستینگ فعلی</label>
                <input
                  type="text"
                  placeholder="نام شرکت فعلی"
                  value={previousHost}
                  onChange={(e) => setPreviousHost(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نوع کنترل‌پنل</label>
                <select
                  value={panel}
                  onChange={(e) => setPanel(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800 cursor-pointer"
                >
                  <option value="cPanel">cPanel</option>
                  <option value="DirectAdmin">DirectAdmin</option>
                  <option value="Plesk">Plesk</option>
                  <option value="Other">سایر پنل‌ها</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">آدرس ورود به پنل (URL)</label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="https://cpanel.mysite.com:2083"
                  value={controlPanelUrl}
                  onChange={(e) => setControlPanelUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نام کاربری کنترل‌پنل</label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="username"
                  value={panelUsername}
                  onChange={(e) => setPanelUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">کلمه عبور کنترل‌پنل</label>
                <input
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  value={panelPassword}
                  onChange={(e) => setPanelPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">توضیحات و نیازمندی‌های خاص (اختیاری)</label>
              <textarea
                rows={2}
                placeholder="توضیحاتی مانند نسخه PHP، پایگاه داده خاص یا ماژول‌های مورد نیاز..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-[11px] text-emerald-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>کلیه اطلاعات امنیتی به صورت رمزنگاری‌شده در سرور ذخیره و پس از پایان انتقال حذف می‌گردند.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-sm transition-all shadow-md shadow-rose-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>ارسال درخواست مهاجرت رایگان به توتینو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
