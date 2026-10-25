import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Globe, ArrowLeft, Shield } from 'lucide-react';
import { DOMAIN_TLDS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { DomainCheckResult } from '../types';

export const DomainChecker: React.FC = () => {
  const { registerNewDomain, openPaymentModal } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTld, setSelectedTld] = useState('ir');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<DomainCheckResult | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    // Clean up domain query
    let cleanName = searchTerm.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    let ext = selectedTld;

    if (cleanName.includes('.')) {
      const parts = cleanName.split('.');
      cleanName = parts[0];
      ext = parts[1] || selectedTld;
    }

    setTimeout(() => {
      // Simulate real domain lookup
      const isReserved = ['google', 'apple', 'digikala', 'shaparak', 'varzesh3', 'tutino'].includes(cleanName);
      const isAvailable = !isReserved;

      const tldObj = DOMAIN_TLDS.find(t => t.extension === ext) || DOMAIN_TLDS[0];

      setSearchResult({
        domain: cleanName,
        extension: ext,
        isAvailable,
        price: tldObj.pricePerYear
      });
      setIsSearching(false);
    }, 450);
  };

  const handleRegister = (result: DomainCheckResult) => {
    const inv = registerNewDomain(result.domain, result.extension, 1);
    openPaymentModal(inv);
  };

  return (
    <section id="domain-search" className="py-12 bg-white border-y border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#1F101A] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-rose-950/50">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-wider mb-2 block">
              جستجو و ثبت آنلاین دامنه در توتینو
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              نام برند و وب‌سایت رویاهایتان را همین امروز ثبت کنید
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              ثبت آنی انواع پسوندهای ملی (.ir) و بین‌المللی با ارزان‌ترین تعرفه و پنل مدیریت اختصاصی DNS
            </p>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-2 rounded-2xl border border-rose-500/20 backdrop-blur-md">
              <div className="flex-1 flex items-center gap-3 px-3 w-full">
                <Search className="w-5 h-5 text-rose-400 shrink-0" />
                <input
                  type="text"
                  dir="ltr"
                  placeholder="مثال: mybrand یا sitename"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-base font-medium py-2"
                />
              </div>

              {/* TLD Selector */}
              <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto justify-end">
                <select
                  value={selectedTld}
                  onChange={(e) => setSelectedTld(e.target.value)}
                  className="bg-slate-800 text-rose-400 font-bold text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none cursor-pointer"
                  dir="ltr"
                >
                  {DOMAIN_TLDS.map((tld) => (
                    <option key={tld.extension} value={tld.extension}>
                      .{tld.extension}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl transition-all shadow-md shadow-rose-600/30 active:scale-95 disabled:opacity-50 whitespace-nowrap"
                >
                  {isSearching ? 'در حال بررسی...' : 'بررسی دامنه'}
                </button>
              </div>
            </div>
          </form>

          {/* Search Result Box */}
          {searchResult && (
            <div className="max-w-3xl mx-auto mt-6 animate-in fade-in duration-200">
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                searchResult.isAvailable 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-rose-500/10 border-rose-500/30'
              }`}>
                <div className="flex items-center gap-3">
                  {searchResult.isAvailable ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white font-tabular" dir="ltr">
                        {searchResult.domain}.{searchResult.extension}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        searchResult.isAvailable 
                          ? 'bg-emerald-400/20 text-emerald-300' 
                          : 'bg-rose-400/20 text-rose-300'
                      }`}>
                        {searchResult.isAvailable ? 'آزاد برای ثبت' : 'قبلاً ثبت شده'}
                      </span>
                    </div>
                    {searchResult.isAvailable && (
                      <p className="text-xs text-slate-300 mt-0.5">
                        قیمت ثبت ۱ ساله در توتینو: <span className="font-bold text-rose-400 font-tabular">{searchResult.price.toLocaleString('fa-IR')} تومان</span>
                      </p>
                    )}
                  </div>
                </div>

                {searchResult.isAvailable ? (
                  <button
                    onClick={() => handleRegister(searchResult)}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center gap-1.5 shadow-md active:scale-95 whitespace-nowrap"
                  >
                    <span>ثبت این دامنه</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedTld(searchResult.extension === 'ir' ? 'com' : 'ir');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 whitespace-nowrap"
                  >
                    بررسی پسوند‌های دیگر
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Popular TLD badges */}
          <div className="max-w-3xl mx-auto mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">پسوندهای پرطرفدار:</span>
            {DOMAIN_TLDS.slice(0, 5).map(tld => (
              <button
                key={tld.extension}
                onClick={() => {
                  setSelectedTld(tld.extension);
                  if (searchTerm) {
                    setSearchResult(null);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedTld === tld.extension
                    ? 'bg-rose-600 text-white border-rose-500 font-bold shadow-xs'
                    : 'bg-white/5 border-white/10 hover:border-rose-400/50 text-slate-300'
                }`}
              >
                <span dir="ltr">.{tld.extension}</span>
                <span className="opacity-80 font-tabular">{tld.pricePerYear.toLocaleString('fa-IR')} ت</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
