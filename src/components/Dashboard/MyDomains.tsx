import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Globe, Lock, PlusCircle, Check, Settings, Save } from 'lucide-react';
import { UserDomain } from '../../types';

export const MyDomains: React.FC = () => {
  const { domains, updateNameservers, addDnsRecord, setActiveView } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState<UserDomain>(domains[0]);
  
  // Nameservers editing
  const [ns1, setNs1] = useState(selectedDomain?.nameservers[0] || 'ns1.tutino.host');
  const [ns2, setNs2] = useState(selectedDomain?.nameservers[1] || 'ns2.tutino.host');
  const [nsSaved, setNsSaved] = useState(false);

  // DNS Record form
  const [recordType, setRecordType] = useState('A');
  const [recordHost, setRecordHost] = useState('@');
  const [recordValue, setRecordValue] = useState('');
  const [recordTtl, setRecordTtl] = useState(14400);
  const [showAddDns, setShowAddDns] = useState(false);

  const handleSelectDomain = (dom: UserDomain) => {
    setSelectedDomain(dom);
    setNs1(dom.nameservers[0] || 'ns1.tutino.host');
    setNs2(dom.nameservers[1] || 'ns2.tutino.host');
    setNsSaved(false);
  };

  const handleSaveNs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDomain) return;
    updateNameservers(selectedDomain.id, ns1, ns2);
    setNsSaved(true);
    setTimeout(() => setNsSaved(false), 2000);
  };

  const handleAddDnsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordValue.trim() || !selectedDomain) return;

    addDnsRecord(selectedDomain.id, {
      type: recordType,
      host: recordHost,
      value: recordValue.trim(),
      ttl: recordTtl
    });

    setRecordValue('');
    setShowAddDns(false);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">مدیریت دامنه‌ها در توتینو</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            تنظیمات نیم‌سرورها (Nameservers)، مدیریت رکوردهای DNS و وضعیت مالکیت
          </p>
        </div>

        <button
          onClick={() => setActiveView('new-order')}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>ثبت دامنه جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Domain List (Right side) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 px-2 block mb-2">لیست دامنه‌های فعال شما</span>
          {domains.map((dom) => {
            const isSelected = selectedDomain?.id === dom.id;

            return (
              <button
                key={dom.id}
                onClick={() => handleSelectDomain(dom)}
                className={`w-full text-right p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20'
                    : 'border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 font-tabular" dir="ltr">
                    {dom.name}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    فعال
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>انقضا: <strong className="font-tabular">{dom.expiryDate}</strong></span>
                  <span className="text-[11px] text-rose-700">قفل انتقال فعال</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Settings (Left side) */}
        {selectedDomain && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Domain Overview Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-tabular" dir="ltr">
                    {selectedDomain.name}
                  </h3>
                  <span className="text-xs text-slate-500">ثبت شده در توتینو: {selectedDomain.registrationDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200">
                    <Lock className="w-3.5 h-3.5" />
                    <span>قفل ضد سرقت (Transfer Lock) فعال است</span>
                  </div>
                </div>
              </div>

              {/* Nameservers Editor */}
              <form onSubmit={handleSaveNs} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-rose-600" />
                    <span>نیم‌سرورهای دامنه (DNS Nameservers)</span>
                  </h4>
                  {nsSaved && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>نیم‌سرورها با موفقیت بروزرسانی شدند</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Nameserver 1</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={ns1}
                      onChange={(e) => setNs1(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Nameserver 2</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={ns2}
                      onChange={(e) => setNs2(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5 text-rose-400" />
                  <span>ذخیره تغییرات نیم‌سرورها</span>
                </button>
              </form>
            </div>

            {/* DNS Zone Records Management */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">رکوردهای DNS ابری توتینو</h4>
                  <p className="text-xs text-slate-400 mt-0.5">اتصال ساب‌دامین‌ها، ایمیل سرور و سرویس‌های ابری</p>
                </div>

                <button
                  onClick={() => setShowAddDns(!showAddDns)}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>افزودن رکورد جدید</span>
                </button>
              </div>

              {/* Add DNS Record Drawer */}
              {showAddDns && (
                <form onSubmit={handleAddDnsSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">نوع رکورد</label>
                      <select
                        value={recordType}
                        onChange={(e) => setRecordType(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      >
                        <option value="A">A Record (IPv4)</option>
                        <option value="CNAME">CNAME</option>
                        <option value="MX">MX (Mail)</option>
                        <option value="TXT">TXT (SPF/DKIM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">نام یا هاست</label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="@ یا sub"
                        value={recordHost}
                        onChange={(e) => setRecordHost(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">مقدار رکورد (Value / IP)</label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="185.143.232.55"
                        value={recordValue}
                        onChange={(e) => setRecordValue(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddDns(false)}
                      className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg"
                    >
                      ثبت رکورد
                    </button>
                  </div>
                </form>
              )}

              {/* Existing DNS Records Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold pb-2">
                      <th className="pb-2">نوع</th>
                      <th className="pb-2">هاست (Name)</th>
                      <th className="pb-2">مقدار (Value)</th>
                      <th className="pb-2">TTL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-tabular">
                    {selectedDomain.dnsRecords?.map((rec, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 font-bold text-rose-600">{rec.type}</td>
                        <td className="py-2.5 font-semibold text-slate-800" dir="ltr">{rec.host}</td>
                        <td className="py-2.5 text-slate-600" dir="ltr">{rec.value}</td>
                        <td className="py-2.5 text-slate-400">{rec.ttl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
