import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Clock, PlusCircle } from 'lucide-react';

export const MigrationTracker: React.FC = () => {
  const { migrations, openMigrationModal } = useAuth();

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">پیگیری مهاجرت سایت به توتینو</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            وضعیت انتقال اطلاعات، دیتابیس‌ها و ایمیل‌ها از شرکت هاستینگ قبلی
          </p>
        </div>

        <button
          onClick={openMigrationModal}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>درخواست انتقال سایت جدید</span>
        </button>
      </div>

      {/* Migrations List */}
      <div className="space-y-4">
        {migrations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
            هنوز درخواست مهاجرتی ثبت نکرده‌اید.
          </div>
        ) : (
          migrations.map((mig) => (
            <div
              key={mig.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900 font-tabular" dir="ltr">
                    {mig.domain}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    mig.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {mig.status === 'completed' ? 'انتقال موفقیت‌آمیز' : 'در حال انتقال توسط کارشناسان توتینو'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
                  <span>هاست قبلی: <strong className="text-slate-800">{mig.previousHost}</strong></span>
                  <span>کنترل‌پنل: <strong className="text-slate-800">{mig.previousPanel}</strong></span>
                  <span>تاریخ ثبت: <strong className="font-tabular text-slate-800">{mig.createdAt}</strong></span>
                </div>

                {/* Progress bar */}
                <div className="pt-2 max-w-md">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">پیشرفت انتقال داده‌ها</span>
                    <span className="font-bold font-tabular text-emerald-700">{mig.progressPercent}٪</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${mig.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                {mig.status === 'completed' ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تست عملکرد و SSL با موفقیت انجام شد</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200">
                    <Clock className="w-4 h-4 animate-spin text-rose-600" />
                    <span>انتقال بدون قطعی در دست اقدام است</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
