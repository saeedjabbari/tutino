import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserService, UserDomain, SupportTicket, Invoice, HostingPlan, MigrationRequest, ServerLocation } from '../types';
import {
  INITIAL_USER_SERVICES,
  INITIAL_USER_DOMAINS,
  INITIAL_INVOICES,
  INITIAL_TICKETS,
  INITIAL_MIGRATIONS
} from '../data/mockData';

interface AuthContextType {
  user: User | null;
  services: UserService[];
  domains: UserDomain[];
  tickets: SupportTicket[];
  invoices: Invoice[];
  migrations: MigrationRequest[];
  activeView: 'landing' | 'dashboard' | 'services' | 'domains' | 'tickets' | 'billing' | 'new-order' | 'migration';
  setActiveView: (view: 'landing' | 'dashboard' | 'services' | 'domains' | 'tickets' | 'billing' | 'new-order' | 'migration') => void;
  
  // Modals
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register' | 'otp';
  setAuthModalMode: (mode: 'login' | 'register' | 'otp') => void;
  
  isOrderModalOpen: boolean;
  openOrderModal: (plan: HostingPlan) => void;
  closeOrderModal: () => void;
  selectedPlanForOrder: HostingPlan | null;

  isMigrationModalOpen: boolean;
  openMigrationModal: () => void;
  closeMigrationModal: () => void;

  isPaymentModalOpen: boolean;
  openPaymentModal: (invoice: Invoice) => void;
  closePaymentModal: () => void;
  activeInvoiceToPay: Invoice | null;

  // Actions
  login: (credential: string, pass: string) => boolean;
  loginAsDemo: () => void;
  register: (fullName: string, phone: string, email: string, pass: string) => boolean;
  verifyOtp: (code: string) => boolean;
  logout: () => void;
  
  createHostingOrder: (plan: HostingPlan, domain: string, location: ServerLocation, cycle: 'monthly' | 'annual') => Invoice;
  registerNewDomain: (domainName: string, tld: string, years?: number) => Invoice;
  renewService: (serviceId: string) => Invoice;
  payInvoice: (invoiceId: string) => boolean;
  topUpWallet: (amount: number) => void;
  createSupportTicket: (subject: string, department: 'technical' | 'billing' | 'sales' | 'devops_migration', priority: 'low' | 'medium' | 'high' | 'urgent', message: string) => SupportTicket;
  replyToTicket: (ticketId: string, messageText: string) => void;
  updateNameservers: (domainId: string, ns1: string, ns2: string) => void;
  addDnsRecord: (domainId: string, record: { type: string; host: string; value: string; ttl: number }) => void;
  submitMigration: (domain: string, host: string, panel: 'cPanel' | 'DirectAdmin' | 'Plesk' | 'Other', panelUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr-8921',
  fullName: 'محمد رضایی',
  email: 'm.rezaei@example.com',
  phone: '09123456789',
  walletBalance: 2450000,
  joinedDate: '۱۴۰۲/۰۱/۱۵'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from localStorage or use defaults
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('tutino_user');
      return saved ? JSON.parse(saved) : DEMO_USER; // Default logged in for easy test, can logout anytime
    } catch {
      return DEMO_USER;
    }
  });

  const [services, setServices] = useState<UserService[]>(() => {
    try {
      const saved = localStorage.getItem('tutino_services');
      return saved ? JSON.parse(saved) : INITIAL_USER_SERVICES;
    } catch {
      return INITIAL_USER_SERVICES;
    }
  });

  const [domains, setDomains] = useState<UserDomain[]>(() => {
    try {
      const saved = localStorage.getItem('tutino_domains');
      return saved ? JSON.parse(saved) : INITIAL_USER_DOMAINS;
    } catch {
      return INITIAL_USER_DOMAINS;
    }
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem('tutino_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('tutino_invoices');
      return saved ? JSON.parse(saved) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  });

  const [migrations, setMigrations] = useState<MigrationRequest[]>(() => {
    try {
      const saved = localStorage.getItem('tutino_migrations');
      return saved ? JSON.parse(saved) : INITIAL_MIGRATIONS;
    } catch {
      return INITIAL_MIGRATIONS;
    }
  });

  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'services' | 'domains' | 'tickets' | 'billing' | 'new-order' | 'migration'>('landing');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'otp'>('login');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPlanForOrder, setSelectedPlanForOrder] = useState<HostingPlan | null>(null);
  const [isMigrationModalOpen, setIsMigrationModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeInvoiceToPay, setActiveInvoiceToPay] = useState<Invoice | null>(null);

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('tutino_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tutino_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tutino_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('tutino_domains', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('tutino_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('tutino_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('tutino_migrations', JSON.stringify(migrations));
  }, [migrations]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openOrderModal = (plan: HostingPlan) => {
    setSelectedPlanForOrder(plan);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedPlanForOrder(null);
  };

  const openMigrationModal = () => setIsMigrationModalOpen(true);
  const closeMigrationModal = () => setIsMigrationModalOpen(false);

  const openPaymentModal = (invoice: Invoice) => {
    setActiveInvoiceToPay(invoice);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setActiveInvoiceToPay(null);
  };

  const login = (credential: string, _pass: string) => {
    const newUser: User = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      fullName: credential.includes('@') ? credential.split('@')[0] : 'کاربر توتینو',
      email: credential.includes('@') ? credential : 'user@example.com',
      phone: !credential.includes('@') ? credential : '09121112233',
      walletBalance: 1200000,
      joinedDate: '۱۴۰۳/۰۸/۲۴'
    };
    setUser(newUser);
    closeAuthModal();
    return true;
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
    closeAuthModal();
  };

  const register = (fullName: string, phone: string, email: string, _pass: string) => {
    const newUser: User = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      fullName,
      phone,
      email,
      walletBalance: 0,
      joinedDate: '۱۴۰۳/۰۸/۲۴'
    };
    setUser(newUser);
    closeAuthModal();
    return true;
  };

  const verifyOtp = (_code: string) => {
    if (!user) {
      setUser(DEMO_USER);
    }
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setUser(null);
    setActiveView('landing');
  };

  const createHostingOrder = (plan: HostingPlan, domain: string, location: ServerLocation, cycle: 'monthly' | 'annual'): Invoice => {
    const amount = cycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
    const invNumber = 'TT-' + Math.floor(1000 + Math.random() * 9000);
    const newServiceId = 'srv-' + Math.floor(100 + Math.random() * 900);

    const newInvoice: Invoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber: invNumber,
      title: `سفارش ${plan.name} (${location === 'iran' ? 'دیتاسنتر ایران' : 'دیتاسنتر آلمان'}) برای دامنه ${domain}`,
      amount,
      issueDate: '۱۴۰۳/۰۸/۲۴',
      dueDate: '۱۴۰۳/۰۸/۲۹',
      status: 'unpaid',
      serviceType: 'hosting',
      serviceId: newServiceId
    };

    // Staging the pending service
    const newService: UserService = {
      id: newServiceId,
      planId: plan.id,
      planName: `${plan.name} (${location === 'iran' ? 'ایران' : 'خارج'})`,
      domain,
      ipAddress: location === 'iran' ? '185.143.232.' + Math.floor(10 + Math.random() * 80) : '94.130.180.' + Math.floor(10 + Math.random() * 80),
      location,
      status: 'pending', // becomes active once invoice is paid
      billingCycle: cycle,
      price: amount,
      renewalDate: cycle === 'annual' ? '۱۴۰۴/۰۸/۲۴' : '۱۴۰۳/۰۹/۲۴',
      diskUsageGb: 0.1,
      diskTotalGb: parseInt(plan.specs.disk) || 20,
      bandwidthUsageGb: 0.0,
      bandwidthTotalGb: 500,
      controlPanelUrl: `https://cp-${location === 'iran' ? 'ir' : 'de'}.tutino.host:2083`
    };

    setServices(prev => [newService, ...prev]);
    setInvoices(prev => [newInvoice, ...prev]);

    return newInvoice;
  };

  const registerNewDomain = (domainName: string, tld: string, years: number = 1): Invoice => {
    const fullDomain = domainName.includes('.') ? domainName : `${domainName}.${tld}`;
    const priceMap: Record<string, number> = { ir: 49000, com: 980000, net: 1150000, org: 1090000, shop: 390000 };
    const basePrice = priceMap[tld.toLowerCase()] || 850000;
    const amount = basePrice * years;

    const invNumber = 'TT-' + Math.floor(1000 + Math.random() * 9000);
    const domainId = 'dom-' + Math.floor(100 + Math.random() * 900);

    const newInvoice: Invoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber: invNumber,
      title: `ثبت دامنه جدید ${fullDomain} (دوره ${years} ساله)`,
      amount,
      issueDate: '۱۴۰۳/۰۸/۲۴',
      dueDate: '۱۴۰۳/۰۸/۲۹',
      status: 'unpaid',
      serviceType: 'domain',
      serviceId: domainId
    };

    const newDomain: UserDomain = {
      id: domainId,
      name: fullDomain,
      status: 'active',
      registrationDate: '۱۴۰۳/۰۸/۲۴',
      expiryDate: '۱۴۰۴/۰۸/۲۴',
      autoRenew: true,
      nameservers: ['ns1.tutino.host', 'ns2.tutino.host'],
      locked: true,
      dnsRecords: [
        { type: 'A', host: '@', value: '185.143.232.1', ttl: 14400 },
        { type: 'CNAME', host: 'www', value: fullDomain, ttl: 14400 }
      ]
    };

    setDomains(prev => [newDomain, ...prev]);
    setInvoices(prev => [newInvoice, ...prev]);

    return newInvoice;
  };

  const renewService = (serviceId: string): Invoice => {
    const service = services.find(s => s.id === serviceId);
    const invNumber = 'TT-' + Math.floor(1000 + Math.random() * 9000);
    const amount = service ? service.price : 840000;

    const newInvoice: Invoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber: invNumber,
      title: `تمدید سرویس ${service?.planName || 'هاست'} - ${service?.domain || ''}`,
      amount,
      issueDate: '۱۴۰۳/۰۸/۲۴',
      dueDate: '۱۴۰۳/۰۸/۲۹',
      status: 'unpaid',
      serviceType: 'hosting',
      serviceId
    };

    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const payInvoice = (invoiceId: string): boolean => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return false;

    setInvoices(prev =>
      prev.map(item => item.id === invoiceId ? { ...item, status: 'paid' } : item)
    );

    // If it activated a service, turn its status to active
    if (inv.serviceId) {
      setServices(prev =>
        prev.map(s => s.id === inv.serviceId ? { ...s, status: 'active' } : s)
      );
    }

    return true;
  };

  const topUpWallet = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        walletBalance: user.walletBalance + amount
      });
    }
  };

  const createSupportTicket = (subject: string, department: 'technical' | 'billing' | 'sales' | 'devops_migration', priority: 'low' | 'medium' | 'high' | 'urgent', message: string): SupportTicket => {
    const ticketNum = 'TKT-' + Math.floor(10000 + Math.random() * 90000);
    const newTicket: SupportTicket = {
      id: 'tkt-' + Date.now(),
      ticketNumber: ticketNum,
      subject,
      department,
      priority,
      status: 'in_progress',
      createdAt: '۱۴۰۳/۰۸/۲۴ - ۱۲:۰۰',
      updatedAt: '۱۴۰۳/۰۸/۲۴ - ۱۲:۰۰',
      messages: [
        {
          id: 'msg-1',
          sender: 'user',
          senderName: user ? user.fullName : 'کاربر توتینو',
          message,
          timestamp: 'هم‌اکنون'
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);

    // Simulated instant friendly reply after 1.5 seconds from Tutino support
    setTimeout(() => {
      setTickets(currentTickets =>
        currentTickets.map(t => {
          if (t.id === newTicket.id) {
            return {
              ...t,
              status: 'answered',
              updatedAt: 'هم‌اکنون',
              messages: [
                ...t.messages,
                {
                  id: 'msg-auto-' + Date.now(),
                  sender: 'support',
                  senderName: 'مهرداد (کارشناس ارشد پشتیبانی توتینو)',
                  message: 'درود و وقت بخیر؛ پیام شما با اولویت بالا دریافت شد و توسط کارشناسان در دست بررسی است. اقدامات لازم در حال انجام است و نتیجه خدمت شما اعلام می‌گردد.',
                  timestamp: 'هم‌اکنون'
                }
              ]
            };
          }
          return t;
        })
      );
    }, 1800);

    return newTicket;
  };

  const replyToTicket = (ticketId: string, messageText: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'waiting_user',
            updatedAt: 'هم‌اکنون',
            messages: [
              ...t.messages,
              {
                id: 'msg-' + Date.now(),
                sender: 'user',
                senderName: user ? user.fullName : 'کاربر',
                message: messageText,
                timestamp: 'هم‌اکنون'
              }
            ]
          };
        }
        return t;
      })
    );
  };

  const updateNameservers = (domainId: string, ns1: string, ns2: string) => {
    setDomains(prev =>
      prev.map(d => d.id === domainId ? { ...d, nameservers: [ns1, ns2] } : d)
    );
  };

  const addDnsRecord = (domainId: string, record: { type: string; host: string; value: string; ttl: number }) => {
    setDomains(prev =>
      prev.map(d => {
        if (d.id === domainId) {
          const records = d.dnsRecords || [];
          return { ...d, dnsRecords: [...records, record] };
        }
        return d;
      })
    );
  };

  const submitMigration = (domain: string, host: string, panel: 'cPanel' | 'DirectAdmin' | 'Plesk' | 'Other', panelUrl: string) => {
    const newReq: MigrationRequest = {
      id: 'mig-' + Date.now(),
      domain,
      previousHost: host,
      previousPanel: panel,
      controlPanelUrl: panelUrl,
      status: 'transferring',
      createdAt: '۱۴۰۳/۰۸/۲۴',
      progressPercent: 35
    };

    setMigrations(prev => [newReq, ...prev]);
    closeMigrationModal();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        services,
        domains,
        tickets,
        invoices,
        migrations,
        activeView,
        setActiveView,
        
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode,

        isOrderModalOpen,
        openOrderModal,
        closeOrderModal,
        selectedPlanForOrder,

        isMigrationModalOpen,
        openMigrationModal,
        closeMigrationModal,

        isPaymentModalOpen,
        openPaymentModal,
        closePaymentModal,
        activeInvoiceToPay,

        login,
        loginAsDemo,
        register,
        verifyOtp,
        logout,

        createHostingOrder,
        registerNewDomain,
        renewService,
        payInvoice,
        topUpWallet,
        createSupportTicket,
        replyToTicket,
        updateNameservers,
        addDnsRecord,
        submitMigration
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
