import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, Phone, User as UserIcon, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { BerryLogo } from './BerryIcon';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    loginAsDemo,
    setActiveView
  } = useAuth();

  // Form states
  const [loginCredential, setLoginCredential] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // OTP state
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginCredential.trim() || !loginPassword.trim()) {
      setErrorMsg('لطفاً نام کاربری/شماره موبایل و کلمه عبور را وارد نمایید.');
      return;
    }

    const success = login(loginCredential, loginPassword);
    if (success) {
      setActiveView('dashboard');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('نام و نام خانوادگی الزامی است.');
      return;
    }
    if (!phone.trim() || !/^09\d{9}$/.test(phone.trim())) {
      setErrorMsg('شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('آدرس ایمیل معتبر وارد فرمایید.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('کلمه عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('کلمه عبور و تایید آن همخوانی ندارند.');
      return;
    }
    if (!acceptTerms) {
      setErrorMsg('پذیرش قوانین و مقررات توتینو الزامی است.');
      return;
    }

    // Switch to simulated OTP
    setAuthModalMode('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setErrorMsg('کد ۴ رقمی پیامک شده را وارد کنید.');
      return;
    }

    const ok = register(fullName, phone, email, password);
    if (ok) {
      setActiveView('dashboard');
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: 'ضعیف', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'متوسط', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'خوب', color: 'bg-emerald-400' };
    return { score: 100, label: 'بسیار قوی', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <BerryLogo size={24} />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">توتیـ<span className="text-rose-500">ـنو</span></span>
              <span className="text-[10px] text-rose-400 font-mono font-bold block -mt-1 tracking-wider">tutino.host</span>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            {authModalMode === 'login' && 'ورود به ناحیه کاربری هاستینگ توتینو'}
            {authModalMode === 'register' && 'عضویت و ثبت‌نام حساب جدید کاربری'}
            {authModalMode === 'otp' && 'تایید شماره موبایل (رمز یکبار مصرف)'}
          </p>
        </div>

        {/* Tab Switcher (Login vs Register) */}
        {authModalMode !== 'otp' && (
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => { setAuthModalMode('login'); setErrorMsg(''); }}
              className={`flex-1 py-3 text-center text-sm font-bold transition-colors ${
                authModalMode === 'login'
                  ? 'bg-white text-rose-600 border-b-2 border-rose-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ورود به حساب
            </button>
            <button
              onClick={() => { setAuthModalMode('register'); setErrorMsg(''); }}
              className={`flex-1 py-3 text-center text-sm font-bold transition-colors ${
                authModalMode === 'register'
                  ? 'bg-white text-rose-600 border-b-2 border-rose-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ثبت نام حساب جدید
            </button>
          </div>
        )}

        <div className="p-6">
          
          {/* Error Message banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {/* Quick Demo Access Bar */}
          {authModalMode === 'login' && (
            <div className="mb-6 p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100 flex items-center justify-between gap-3">
              <div className="text-xs text-rose-950">
                <span className="font-bold block flex items-center gap-1">
                  <span>تست فوری بدون ثبت‌نام؟</span>
                  <span>🍓</span>
                </span>
                <span className="text-slate-600 text-[11px]">ورود با یک کلیک به پنل مدیریت دمو</span>
              </div>
              <button
                onClick={() => {
                  loginAsDemo();
                  setActiveView('dashboard');
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ورود با کاربر دمو</span>
              </button>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شماره موبایل یا ایمیل
                </label>
                <div className="relative">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="09123456789 یا info@example.com"
                    value={loginCredential}
                    onChange={(e) => setLoginCredential(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                  />
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">کلمه عبور</label>
                  <button
                    type="button"
                    onClick={() => alert('لینک بازیابی رمز عبور به ایمیل/شماره شما ارسال خواهد شد.')}
                    className="text-[11px] text-rose-600 hover:underline"
                  >
                    فراموشی رمز عبور؟
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    dir="ltr"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-sm transition-all shadow-md shadow-rose-600/20 active:scale-95 mt-2"
              >
                ورود به حساب کاربری
              </button>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: علی محمدی"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                  />
                  <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره موبایل</label>
                  <div className="relative">
                    <input
                      type="tel"
                      dir="ltr"
                      placeholder="09123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                    />
                    <Phone className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ایمیل معتبر</label>
                  <div className="relative">
                    <input
                      type="email"
                      dir="ltr"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                    />
                    <Mail className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">کلمه عبور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    dir="ltr"
                    placeholder="حداقل ۶ کاراکتر"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">{strength.label}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تکرار کلمه عبور</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  dir="ltr"
                  placeholder="تکرار همان کلمه عبور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
                />
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2 pt-1 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span>
                  کلیه <span className="text-rose-600 font-bold">قوانین و مقررات میزبانی توتینو</span> را مطالعه کرده و می‌پذیرم.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-sm transition-all shadow-md shadow-rose-600/20 active:scale-95"
              >
                ثبت نام و ادامه
              </button>
            </form>
          )}

          {/* 3. OTP VERIFICATION FORM */}
          {authModalMode === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">کد تایید پیامکی</h4>
                <p className="text-xs text-slate-500">
                  کد تایید ۴ رقمی به شماره <strong dir="ltr">{phone}</strong> ارسال گردید.
                </p>
                <span className="text-[11px] text-rose-600 font-bold mt-1 inline-block">
                  (کد پیش‌فرض: ۱۲۳۴)
                </span>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={4}
                  dir="ltr"
                  placeholder="۱۲۳۴"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-2xl font-black py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-sm transition-all shadow-md active:scale-95"
              >
                تایید نهایی و ورود به داشبورد
              </button>

              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
              >
                ویرایش مشخصات یا شماره موبایل
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
