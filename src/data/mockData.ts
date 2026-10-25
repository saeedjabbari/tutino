import { HostingPlan, DomainTld, SupportTicket, Invoice, UserService, UserDomain, MigrationRequest } from '../types';

export const HOSTING_PLANS: HostingPlan[] = [
  {
    id: 'linux-standard',
    name: 'خرید هاست لینوکس',
    category: 'linux',
    targetAudience: 'مخصوص سایت‌های کوچک تا متوسط',
    description: 'هاست لینوکس توتینو با کنترل پنل cPanel به شما اجازه می‌دهد سرویس‌تان را با Perl, PHP, Ruby مدیریت کنید و به شکلی بهینه از منابع بهره ببرید.',
    priceMonthly: 840000,
    priceAnnual: 8064000,
    specs: {
      disk: '۱۰ گیگابایت NVMe Enterprise',
      ram: '۲ گیگابایت رم اختصاصی',
      cpu: '۲ هسته پردازنده AMD EPYC',
      bandwidth: 'نامحدود و بهینه‌سازی شده',
      webServer: 'LiteSpeed Enterprise Web Server',
      freeSSL: true,
      backup: 'بک‌آپ‌گیری هفتگی و ماهانه ابری',
      controlPanel: 'cPanel آخرین نسخه'
    }
  },
  {
    id: 'wordpress-pro',
    name: 'خرید هاست وردپرس',
    category: 'wordpress',
    targetAudience: 'مخصوص سایت‌های نسبتاً پربازدید',
    description: 'بهترین هاست برای وردپرس اشتراکی یعنی هاست حرفه‌ای توتینو در چند لایه و با راهکارهای اختصاصی برای بالاترین سطح سرعت و امنیت بهینه‌سازی شده است.',
    priceMonthly: 890000,
    priceAnnual: 8544000,
    popular: true,
    specs: {
      disk: '۲۵ گیگابایت NVMe نسل چهارم',
      ram: '۴ گیگابایت رم اختصاصی DDR5',
      cpu: '۳ هسته پردازنده قدرتمند',
      bandwidth: 'نامحدود با پورت ۱۰ گیگابیت',
      webServer: 'LiteSpeed به همراه افزونه کش اختصاصی LSCache',
      freeSSL: true,
      backup: 'بک‌آپ‌گیری روزانه خودکار در سرور مجزا',
      controlPanel: 'cPanel به همراه ابزار WP-CLI و استیجینگ'
    }
  },
  {
    id: 'woocommerce-scale',
    name: 'خرید هاست ووکامرس',
    category: 'woocommerce',
    targetAudience: 'ایمن و سریع بفروشید',
    description: 'کسب و کار خود را به یک فروشگاه آنلاین تبدیل کنید و به کمک کش اختصاصی توتینو برای فروشگاه‌های بر پایه‌ی ووکامرس، پاسخگوی خیل عظیم مشتریان باشید.',
    priceMonthly: 1645000,
    priceAnnual: 15792000,
    specs: {
      disk: '۵۰ گیگابایت NVMe Gen4 با سرعت خواندن ۷۰۰۰MB/s',
      ram: '۸ گیگابایت رم اختصاصی DDR5 ECC',
      cpu: '۵ هسته اختصاصی High Frequency',
      bandwidth: 'نامحدود با تضمین پایداری ۹۹.۹۹٪',
      webServer: 'LiteSpeed Enterprise لایسنس اصلی + Redis Cache',
      freeSSL: true,
      backup: 'بک‌آپ روزانه و ساعتی دیتابیس در ۳ نقطه جغرافیایی',
      controlPanel: 'cPanel + افزونه‌های شتاب‌دهنده دیتابیس MySQL'
    }
  },
  {
    id: 'economic-starter',
    name: 'خرید هاست اقتصادی',
    category: 'economic',
    targetAudience: 'بهترین نقطه برای آشنایی با وردپرس',
    description: 'هاست اقتصادی توتینو نقطه شروع خوبی برای آشنایی و میزبانی وردپرس است. اگر یک سایت نوپا دارید و می‌خواهید کمتر هزینه کنید، این سرویس گزینه مناسبی برای شماست.',
    priceMonthly: 840000,
    priceAnnual: 8064000,
    specs: {
      disk: '۵ گیگابایت حافظه پرسرعت SSD',
      ram: '۱.۵ گیگابایت رم اختصاصی',
      cpu: '۱ هسته پردازنده ابری',
      bandwidth: '۱۰۰ گیگابایت ترافیک ماهانه',
      webServer: 'Apache / Nginx بهینه‌شده',
      freeSSL: true,
      backup: 'بک‌آپ هفتگی منظم',
      controlPanel: 'cPanel استاندارد'
    }
  }
];

export const DOMAIN_TLDS: DomainTld[] = [
  { extension: 'ir', pricePerYear: 49000, renewalPrice: 49000, featured: true },
  { extension: 'com', pricePerYear: 980000, renewalPrice: 980000, featured: true },
  { extension: 'net', pricePerYear: 1150000, renewalPrice: 1150000 },
  { extension: 'org', pricePerYear: 1090000, renewalPrice: 1090000 },
  { extension: 'shop', pricePerYear: 390000, renewalPrice: 1250000, featured: true },
  { extension: 'online', pricePerYear: 280000, renewalPrice: 990000 },
  { extension: 'co', pricePerYear: 1450000, renewalPrice: 1450000 },
  { extension: 'site', pricePerYear: 310000, renewalPrice: 920000 }
];

export const BENCHMARKS = [
  { server: 'LiteSpeed', reqPerSec: 69618, color: 'bg-rose-500', barWidth: '100%', highlight: true },
  { server: 'Nginx', reqPerSec: 6025, color: 'bg-slate-500', barWidth: '9%', highlight: false },
  { server: 'Apache', reqPerSec: 826, color: 'bg-slate-400', barWidth: '2%', highlight: false },
];

export const TESTIMONIALS = [
  {
    quote: 'حدود دو ساله داریم از خدمات توتینو استفاده می‌کنیم. نقطه قوت توتینو در مقایسه با سایر شرکت‌ها، پشتیبانی خوش‌رو و حرفه‌ایه؛ هم‌زمان پاسخ‌دهی عالیه و پایداری سرورها بدون قطعی بوده است.',
    author: 'امین آرامش',
    role: 'موسس پادکست و رسانه',
    company: 'کارنکن',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    quote: 'در صرافی ایکس‌پی، هر کلیک کاربر مهمه. زیرساخت توتینو باعث شد پایداری مثال‌زدنی و پشتیبانی همیشه‌دردسترس به ما این امکان رو بده تا یک تجربه کاربری بسیار سریع و روان بسازیم.',
    author: 'مهران فتحی',
    role: 'مدیر مارکتینگ',
    company: 'صرافی ایکس‌پی',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    quote: 'تجربه مهاجرت تیم فنی ما به هاستینگ توتینو بی‌نظیر بود. سرعت لود وب‌سایت ما بیش از ۴۰ درصد بهبود پیدا کرد و پایداری در کمپین‌های پرترافیک بدون ثانیه‌ای افت کیفیت حفظ شد.',
    author: 'سارا رضایی',
    role: 'مدیر ارشد زیرساخت',
    company: 'پلتفرم تجارت ابری',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  }
];

export const BRAND_LOGOS = [
  { name: 'طاقچه', en: 'Taqche' },
  { name: 'دیجی‌کالا', en: 'Digikala' },
  { name: 'ازکی', en: 'Azki' },
  { name: 'دیجی‌پی', en: 'Digipay' },
  { name: 'والکس', en: 'Wallex' },
  { name: 'دیوار', en: 'Divar' },
  { name: 'علی‌بابا', en: 'Alibaba' },
  { name: 'اسنپ', en: 'Snapp' },
  { name: 'کارنکن', en: 'Karnakon' }
];

export const FAQS = [
  {
    question: 'هاستینگ توتینو چیست؟',
    answer: 'هاستینگ یا میزبانی وب در توتینو (tutino.host)، فضایی ایزوله و پرسرعت بر روی سرورهای ابری با درایوهای NVMe Gen4 و وب‌سرور لایت‌اسپید است تا وب‌سایت یا فروشگاه شما با بیشترین سرعت برای کاربران بارگذاری شود.'
  },
  {
    question: 'چطور از میان پلن‌های توتینو مناسب‌ترین گزینه را برای سایت خود پیدا کنم؟',
    answer: 'اگر وب‌سایت شما تازه تاسیس است، هاست اقتصادی یا هاست لینوکس توتینو گزینه‌ای عالی است. برای وب‌سایت‌های وردپرسی پربازدید، هاست وردپرس با ماژول کش اختصاصی LSCache و برای فروشگاه‌های ووکامرسی، هاست ووکامرس پرقدرت را پیشنهاد می‌کنیم.'
  },
  {
    question: 'آیا می‌توانم وب‌سایت فعال روی هاست دیگری را به توتینو انتقال بدهم؟',
    answer: 'بله، انتقال تمام وب‌سایت‌های شما از هر شرکت هاستینگ دیگری به توتینو کاملاً رایگان، بدون قطعی حتی برای ۱ ثانیه (Zero-Downtime) و توسط تیم فنی مجرب توتینو انجام می‌شود.'
  },
  {
    question: 'برای شروع، هاست ماهانه مناسب‌تر است یا میزبانی سالانه؟',
    answer: 'در توتینو امکان پرداخت هر دو دوره فراهم است؛ در سفارش‌های سالانه، تخفیف ویژه معادل ۲ ماه میزبانی رایگان و یک دامنه ir هدیه به شما تعلق می‌گیرد.'
  },
  {
    question: 'چطور می‌توانم دامین و هاست هدیه دریافت کنم؟',
    answer: 'با خرید هر یک از پلن‌های سالانه هاست وردپرس یا ووکامرس در توتینو، یک دامنه ملی ir هدیه و همچنین گواهینامه امنیتی Let’s Encrypt SSL رایگان مادام‌العمر بر روی سرویس شما فعال می‌گردد.'
  },
  {
    question: 'تفاوت هاست ووکامرس توتینو با سرورهای اشتراکی معمولی چیست؟',
    answer: 'هاست ووکامرس توتینو دارای منابع ایزوله پردازشی بالا، کانفیگ اختصاصی کش شیء Redis و وب‌سرور LiteSpeed با لایسنس اصلی است که می‌تواند بدون کندی از ترافیک‌های همزمان پشتیبانی کند.'
  },
  {
    question: 'آیا توتینو سرور مجازی (VPS) و اختصاصی نیز ارائه می‌کند؟',
    answer: 'بله، توتینو سرورهای مجازی ابری در لوکیشن‌های ایران (دیتاسنترهای افرانت و برج میلاد) و خارج (آلمان Hetzner و فنلاند) با درایوهای NVMe Gen4 و پورت‌های پرسرعت گیگابیتی ارائه می‌دهد.'
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'چگونه سرعت لود وردپرس را به زیر ۱ ثانیه برسانیم؟ راهنمای جامع کانفیگ LSCache در توتینو',
    category: 'آموزش وردپرس',
    readTime: '۶ دقیقه مطالعه',
    date: '۲۸ اردیبهشت ۱۴۰۳',
    summary: 'بررسی دقیق تنظیمات کش لایت‌اسپید، فشرده‌سازی تصاویر و بهینه‌سازی دیتابیس برای فروشگاه‌های آنلاین.'
  },
  {
    id: 2,
    title: 'مقایسه جامع وب‌سرورهای لایت‌اسپید، انجین‌ایکس و آپاچی در ترافیک سنگین',
    category: 'زیرساخت و سرور',
    readTime: '۸ دقیقه مطالعه',
    date: '۲۲ اردیبهشت ۱۴۰۳',
    summary: 'نتایج تست استرس ۲۰۰ کاربر همزمان و توان پردازش پاسخ‌های PHP در انواع وب‌سرورها.'
  },
  {
    id: 3,
    title: 'چک‌لیست امنیتی هاستینگ: محافظت در برابر حملات DDOS و نفوذ به دیتابیس',
    category: 'امنیت وب',
    readTime: '۵ دقیقه مطالعه',
    date: '۱۵ اردیبهشت ۱۴۰۳',
    summary: 'اقدامات ضروری برای جلوگیری از تزریق SQL، فایروال‌های لایه ۷ و تنظیمات احراز هویت دومرحله‌ای.'
  }
];

// Initial default user mock data for rich instant dashboard experience
export const INITIAL_USER_SERVICES: UserService[] = [
  {
    id: 'srv-101',
    planId: 'wordpress-pro',
    planName: 'هاست وردپرس حرفه‌ای توتینو (ایران)',
    domain: 'myonlinestore.ir',
    ipAddress: '185.143.232.55',
    location: 'iran',
    status: 'active',
    billingCycle: 'annual',
    price: 8544000,
    renewalDate: '۱۴۰۴/۰۲/۱۵',
    diskUsageGb: 7.2,
    diskTotalGb: 25.0,
    bandwidthUsageGb: 48.5,
    bandwidthTotalGb: 500.0,
    controlPanelUrl: 'https://cp-ir1.tutino.host:2083'
  },
  {
    id: 'srv-102',
    planId: 'linux-standard',
    planName: 'هاست لینوکس استاندارد توتینو (آلمان)',
    domain: 'blog-dev.com',
    ipAddress: '94.130.180.24',
    location: 'foreign',
    status: 'active',
    billingCycle: 'monthly',
    price: 840000,
    renewalDate: '۱۴۰۳/۰۹/۱۰',
    diskUsageGb: 2.1,
    diskTotalGb: 10.0,
    bandwidthUsageGb: 14.8,
    bandwidthTotalGb: 200.0,
    controlPanelUrl: 'https://cp-de3.tutino.host:2083'
  }
];

export const INITIAL_USER_DOMAINS: UserDomain[] = [
  {
    id: 'dom-1',
    name: 'myonlinestore.ir',
    status: 'active',
    registrationDate: '۱۴۰۲/۰۲/۱۵',
    expiryDate: '۱۴۰۴/۰۲/۱۵',
    autoRenew: true,
    nameservers: ['ns1.tutino.host', 'ns2.tutino.host'],
    locked: true,
    dnsRecords: [
      { type: 'A', host: '@', value: '185.143.232.55', ttl: 14400 },
      { type: 'CNAME', host: 'www', value: 'myonlinestore.ir', ttl: 14400 },
      { type: 'MX', host: '@', value: 'mail.myonlinestore.ir', ttl: 14400 }
    ]
  },
  {
    id: 'dom-2',
    name: 'blog-dev.com',
    status: 'active',
    registrationDate: '۱۴۰۱/۰۹/۱۰',
    expiryDate: '۱۴۰۴/۰۹/۱۰',
    autoRenew: false,
    nameservers: ['ns3.tutino.host', 'ns4.tutino.host'],
    locked: true,
    dnsRecords: [
      { type: 'A', host: '@', value: '94.130.180.24', ttl: 14400 },
      { type: 'CNAME', host: 'www', value: 'blog-dev.com', ttl: 14400 }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-8921',
    invoiceNumber: 'TT-8921',
    title: 'تمدید هاست وردپرس حرفه‌ای - myonlinestore.ir (دوره سالانه)',
    amount: 8544000,
    issueDate: '۱۴۰۳/۰۲/۱۵',
    dueDate: '۱۴۰۳/۰۲/۲۰',
    status: 'paid',
    serviceType: 'hosting',
    serviceId: 'srv-101'
  },
  {
    id: 'inv-9442',
    invoiceNumber: 'TT-9442',
    title: 'تمدید هاست لینوکس استاندارد - blog-dev.com (ماهانه)',
    amount: 840000,
    issueDate: '۱۴۰۳/۰۸/۱۰',
    dueDate: '۱۴۰۳/۰۸/۱۵',
    status: 'unpaid',
    serviceType: 'hosting',
    serviceId: 'srv-102'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-401',
    ticketNumber: 'TKT-98431',
    subject: 'درخواست فعال‌سازی ماژول ionCube Loader و اتصال به درگاه پرداخت',
    department: 'technical',
    priority: 'high',
    status: 'answered',
    createdAt: '۱۴۰۳/۰۸/۰۲ - ۱۰:۳۰',
    updatedAt: '۱۴۰۳/۰۸/۰۲ - ۱۱:۱۵',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        senderName: 'محمد رضایی',
        message: 'با سلام، برای نصب پلاگین اختصاصی فروشگاهم نیاز به فعال بودن ionCube در نسخه PHP 8.2 دارم. همچنین ممنون می‌شم وضعیت دسترسی به درگاه پرداخت شاپرک رو چک بفرمایید.',
        timestamp: '۱۴۰۳/۰۸/۰۲ - ۱۰:۳۰'
      },
      {
        id: 'msg-2',
        sender: 'support',
        senderName: 'امیرحسین (پشتیبان فنی توتینو)',
        message: 'درود بر شما کاربر گرامی توتینو؛ ماژول ionCube Loader بر روی نسخه PHP 8.2 هاست شما فعال گردید. همچنین پورت‌های اتصال به سرورهای شاپرک و زرین‌پال کاملاً باز بوده و تست اتصال با موفقیت انجام شد. در صورت نیاز به هرگونه راهنمایی بیشتر در خدمت شما هستیم.',
        timestamp: '۱۴۰۳/۰۸/۰۲ - ۱۱:۱۵'
      }
    ]
  }
];

export const INITIAL_MIGRATIONS: MigrationRequest[] = [
  {
    id: 'mig-1',
    domain: 'myonlinestore.ir',
    previousHost: 'میزبان‌پارس',
    previousPanel: 'cPanel',
    controlPanelUrl: 'https://cpanel.myonlinestore.ir',
    status: 'completed',
    createdAt: '۱۴۰۲/۰۲/۱۴',
    progressPercent: 100
  }
];
