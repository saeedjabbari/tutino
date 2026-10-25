import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle, Send } from 'lucide-react';
import { SupportTicket } from '../../types';

export const SupportTickets: React.FC = () => {
  const { tickets, createSupportTicket, replyToTicket } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(tickets[0] || null);
  
  // New Ticket form
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState<'technical' | 'billing' | 'sales' | 'devops_migration'>('technical');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [message, setMessage] = useState('');

  // Reply text
  const [replyText, setReplyText] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTkt = createSupportTicket(subject.trim(), department, priority, message.trim());
    setSelectedTicket(newTkt);
    setIsCreatingNew(false);
    setSubject('');
    setMessage('');
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    replyToTicket(selectedTicket.id, replyText.trim());
    setReplyText('');
  };

  const currentTicketInState = tickets.find(t => t.id === selectedTicket?.id) || selectedTicket;

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case 'answered':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">پاسخ داده شده</span>;
      case 'in_progress':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">در حال بررسی</span>;
      case 'waiting_user':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">در انتظار پاسخ شما</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">بسته شده</span>;
    }
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">پشتیبانی و تیکت‌های توتینو</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            ارتباط مستقیم با تیم فنی، کارشناسان لایت‌اسپید، وردپرس و امور مالی
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>ارسال تیکت جدید</span>
        </button>
      </div>

      {isCreatingNew ? (
        /* Create New Ticket Form */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs max-w-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="font-bold text-base text-slate-900">ثبت درخواست و تیکت جدید</h3>
            <button
              onClick={() => setIsCreatingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              انصراف و بازگشت
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">موضوع تیکت</label>
              <input
                type="text"
                placeholder="مثال: سوال درباره تنظیمات کش LSCache یا ارتقای پلن"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">دپارتمان مربوطه</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  <option value="technical">پشتیبانی فنی هاست و وردپرس</option>
                  <option value="billing">امور مالی و صورتحساب‌ها</option>
                  <option value="sales">مشاوره و خرید سرویس</option>
                  <option value="devops_migration">خدمات مهاجرت سایت به توتینو</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">میزان اهمیت و اولویت</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  <option value="low">کم (پاسخ در طول روز)</option>
                  <option value="medium">متوسط</option>
                  <option value="high">بالا (پاسخ سریع)</option>
                  <option value="urgent">فوری و قطعی سرویس</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">متن کامل پیام و شرح مشکل</label>
              <textarea
                rows={5}
                placeholder="لطفاً شرح کامل مسئله، پیام‌های خطا، آدرس URL یا نام دامنه مربوطه را قید فرمایید..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-600/20 transition-all active:scale-95"
            >
              ارسال تیکت به کارشناسان توتینو
            </button>
          </form>
        </div>
      ) : (
        /* Tickets Split View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Ticket List (Right) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-400 px-2 block mb-2">تاریخچه درخواست‌ها</span>
            {tickets.map((tkt) => {
              const isSelected = currentTicketInState?.id === tkt.id;

              return (
                <button
                  key={tkt.id}
                  onClick={() => setSelectedTicket(tkt)}
                  className={`w-full text-right p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-500 font-tabular">{tkt.ticketNumber}</span>
                    {getStatusBadge(tkt.status)}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mb-2">
                    {tkt.subject}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{tkt.department === 'technical' ? 'فنی' : 'مالی'}</span>
                    <span className="font-tabular">{tkt.updatedAt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Ticket Conversation View (Left) */}
          {currentTicketInState ? (
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-[500px]">
              
              {/* Ticket Top bar */}
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-rose-600 font-tabular">{currentTicketInState.ticketNumber}</span>
                    {getStatusBadge(currentTicketInState.status)}
                  </div>
                  <h3 className="text-base font-black text-slate-900">{currentTicketInState.subject}</h3>
                </div>

                <div className="text-xs text-slate-400 font-tabular">
                  ثبت شده: {currentTicketInState.createdAt}
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[450px]">
                {currentTicketInState.messages.map((msg) => {
                  const isSupport = msg.sender === 'support';

                  return (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                        isSupport
                          ? 'bg-rose-50/60 border-rose-100 mr-4'
                          : 'bg-white border-slate-200/80 ml-4'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 text-xs">
                        <span className={`font-bold ${isSupport ? 'text-rose-800' : 'text-slate-800'}`}>
                          {msg.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-tabular">{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-700 whitespace-pre-line">{msg.message}</p>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleReplySubmit} className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="پاسخ خود را بنویسید..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-xs active:scale-95"
                >
                  <span>ارسال پاسخ</span>
                  <Send className="w-3.5 h-3.5 rotate-180" />
                </button>
              </form>

            </div>
          ) : (
            <div className="lg:col-span-8 bg-white rounded-3xl p-12 text-center text-slate-400">
              یک تیکت را برای مشاهده جزئیات انتخاب نمایید.
            </div>
          )}

        </div>
      )}

    </div>
  );
};
