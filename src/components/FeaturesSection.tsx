import React from 'react';
import { Lightbulb, DollarSign, ShieldCheck, Lock } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'نوآوری و چابکی',
      description: 'توتینو فراتر از ارائه سرویس‌های میزبانی وب به راه‌های معمول بسنده نکرده و با ابزارهای جدید و خلاقانه سعی در برطرف کردن هزینه بهتر نیازهای مشتریان دارد. سرورهای بهینه‌شده فروشگاهی و مقیاس‌پذیر، نمونه‌ای از این نوآوری‌ها هستند.',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      icon: DollarSign,
      title: 'قیمت‌های منصفانه',
      description: 'توتینو سرویس‌های مختلفی را متناسب با نیازهای متنوع کاربران ارائه کرده است؛ علاوه بر این در هر گروه از سرویس‌ها، پایه‌های قیمتی منعطف تعریف شده تا بدون هزینه‌های گزاف، دقیقاً به اندازه نیازتان پرداخت کنید.',
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: ShieldCheck,
      title: 'امنیت چندلایه',
      description: 'توتینو جدیدترین مکانیزم‌های دفاعی را برای حفاظت از اطلاعات مشتریان تدارک دیده است. سیستم تشخیصی و پیشگیری از نفوذ WAF، آنتی‌ویروس‌های بلادرنگ و سیستم هوشمند آنتی‌دی‌داس ابری از جمله این لایه‌ها هستند.',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: Lock,
      title: 'گواهینامه SSL رایگان',
      description: 'با خرید هر سرویس میزبانی وب از توتینو، یک گواهی SSL رایگان تجاری به شما تعلق می‌گیرد. هنگام خرید گواهینامه‌ی Let\'s Encrypt استاندارد را با یک کلیک فعال کنید و رتبه سئوی سایت را ارتقا دهید.',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          <div className="lg:col-span-7 text-right">
            <span className="text-rose-600 font-extrabold text-xs uppercase tracking-wider block mb-2">
              مزایای میزبانی وب به سبک توتینو
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-snug mb-4">
              امکاناتی که خیال کاربران را راحت می‌کند
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              فرقی ندارد که از توتینو دامنه بخرید یا انواع هاست و سرورهای ابری؛ در هر صورت، تیمی متخصص و به‌روز، در تمام مسیر رشد آنلاین همراه شما خواهند بود.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-rose-100 bg-rose-50/40 max-w-md w-full">
              <img
                src="/src/assets/images/features_tutino_cloud_1792918748587.jpg"
                alt="ترازوی تعادل امنیت و پایداری ابری توتینو"
                className="w-full h-auto aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFF8F9] rounded-3xl p-6 border border-rose-100 hover:border-rose-300 hover:bg-white hover:shadow-lg transition-all duration-200 group text-right flex flex-col justify-start"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-rose-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
