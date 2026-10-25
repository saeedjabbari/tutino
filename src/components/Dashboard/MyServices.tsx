import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ExternalLink, RefreshCw, PlusCircle } from 'lucide-react';
import { UserService } from '../../types';

export const MyServices: React.FC = () => {
  const { services, renewService, openPaymentModal, setActiveView } = useAuth();
  const [selectedService, setSelectedService] = useState<UserService | null>(services[0] || null);

  const handleRenew = (srv: UserService) => {
    const inv = renewService(srv.id);
    openPaymentModal(inv);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">سرویس‌های توتینو من</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            مدیریت، تمدید و کنترل سرورها و پلن‌های هاستینگ ابری فعال
          </p>
        </div>

        <button
          onClick={() => setActiveView('new-order')}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>خرید هاست توتینو</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => {
          const diskPct = Math.round((srv.diskUsageGb / srv.diskTotalGb) * 100);
          const bwPct = Math.round((srv.bandwidthUsageGb / srv.bandwidthTotalGb) * 100);

          return (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top Badge & Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    srv.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {srv.status === 'active' ? 'فعال و آنلاین' : 'در انتظار فعال‌سازی'}
                  </span>

                  <span className="text-xs text-slate-500 font-medium">
                    {srv.location === 'iran' ? '🇮🇷 سرور ایران' : '🇩🇪 سرور آلمان'}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-1">{srv.planName}</h3>
                
                <div className="text-xs font-bold text-slate-600 font-tabular mb-4" dir="ltr">
                  دامنه: <strong className="text-rose-600">{srv.domain}</strong>
                </div>

                {/* Technical specs strip */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span>آدرس IP سرور:</span>
                    <span className="font-tabular font-bold text-slate-900" dir="ltr">{srv.ipAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>دوره پرداخت:</span>
                    <span className="font-bold text-slate-800">{srv.billingCycle === 'annual' ? 'سالانه' : 'ماهانه'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>سررسید بعدی تمدید:</span>
                    <span className="font-bold font-tabular text-slate-900">{srv.renewalDate}</span>
                  </div>
                </div>

                {/* Resource Meters */}
                <div className="space-y-3 mb-6">
                  {/* Disk */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">مصرف هارد NVMe توتینو</span>
                      <span className="font-bold font-tabular text-slate-800">{srv.diskUsageGb} GB از {srv.diskTotalGb} GB ({diskPct}٪)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-600 rounded-full" style={{ width: `${diskPct}%` }}></div>
                    </div>
                  </div>

                  {/* Bandwidth */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">پهنای باند ماهانه</span>
                      <span className="font-bold font-tabular text-slate-800">{srv.bandwidthUsageGb} GB از {srv.bandwidthTotalGb} GB ({bwPct}٪)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${bwPct}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={srv.controlPanelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ورود مستقیم به cPanel</span>
                </a>

                <button
                  onClick={() => handleRenew(srv)}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تمدید سرویس</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
