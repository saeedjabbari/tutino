export type ServerLocation = 'iran' | 'foreign';

export interface HostingPlan {
  id: string;
  name: string;
  category: string;
  targetAudience: string;
  description: string;
  priceMonthly: number; // in Toman
  priceAnnual: number;
  popular?: boolean;
  specs: {
    disk: string;
    ram: string;
    cpu: string;
    bandwidth: string;
    webServer: string;
    freeSSL: boolean;
    backup: string;
    controlPanel: string;
  };
}

export interface DomainTld {
  extension: string;
  pricePerYear: number; // in Toman
  renewalPrice: number;
  featured?: boolean;
}

export interface DomainCheckResult {
  domain: string;
  extension: string;
  isAvailable: boolean;
  price: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  walletBalance: number; // Toman
  avatar?: string;
  joinedDate: string;
}

export interface UserService {
  id: string;
  planId: string;
  planName: string;
  domain: string;
  ipAddress: string;
  location: ServerLocation;
  status: 'active' | 'pending' | 'suspended' | 'expired';
  billingCycle: 'monthly' | 'annual';
  price: number;
  renewalDate: string;
  diskUsageGb: number;
  diskTotalGb: number;
  bandwidthUsageGb: number;
  bandwidthTotalGb: number;
  controlPanelUrl: string;
}

export interface UserDomain {
  id: string;
  name: string;
  status: 'active' | 'expiring_soon' | 'expired';
  registrationDate: string;
  expiryDate: string;
  autoRenew: boolean;
  nameservers: string[];
  dnsRecords?: { type: string; host: string; value: string; ttl: number }[];
  locked: boolean;
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  department: 'technical' | 'billing' | 'sales' | 'devops_migration';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'answered' | 'waiting_user' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  title: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'cancelled';
  serviceType: 'hosting' | 'domain' | 'ssl' | 'server';
  serviceId?: string;
}

export interface MigrationRequest {
  id: string;
  domain: string;
  previousHost: string;
  previousPanel: 'cPanel' | 'DirectAdmin' | 'Plesk' | 'Other';
  controlPanelUrl: string;
  status: 'pending' | 'transferring' | 'completed';
  createdAt: string;
  progressPercent: number;
}
