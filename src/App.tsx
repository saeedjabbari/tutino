/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DomainChecker } from './components/DomainChecker';
import { PricingPlans } from './components/PricingPlans';
import { FeaturesSection } from './components/FeaturesSection';
import { SupportSection } from './components/SupportSection';
import { TechBenchmark } from './components/TechBenchmark';
import { WhyLimoo } from './components/WhyLimoo';
import { Testimonials } from './components/Testimonials';
import { MigrationBanner } from './components/MigrationBanner';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { BottomCta } from './components/BottomCta';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AuthModal } from './components/AuthModal';
import { OrderModal } from './components/OrderModal';
import { MigrationModal } from './components/MigrationModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';

// Dashboard views
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { MyServices } from './components/Dashboard/MyServices';
import { MyDomains } from './components/Dashboard/MyDomains';
import { SupportTickets } from './components/Dashboard/SupportTickets';
import { BillingInvoices } from './components/Dashboard/BillingInvoices';
import { NewServiceOrder } from './components/Dashboard/NewServiceOrder';
import { MigrationTracker } from './components/Dashboard/MigrationTracker';

const MainAppContent: React.FC = () => {
  const { activeView } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      
      {activeView === 'landing' ? (
        /* Full Landing Page matching Limoo Host */
        <>
          <Header />
          <main className="flex-1">
            <Hero />
            <DomainChecker />
            <PricingPlans />
            <FeaturesSection />
            <SupportSection />
            <TechBenchmark />
            <WhyLimoo />
            <Testimonials />
            <MigrationBanner />
            <BlogSection />
            <FaqSection />
            <BottomCta />
          </main>
          <Footer />
        </>
      ) : (
        /* Client Area Dashboard */
        <DashboardLayout>
          {activeView === 'dashboard' && <DashboardOverview />}
          {activeView === 'services' && <MyServices />}
          {activeView === 'domains' && <MyDomains />}
          {activeView === 'tickets' && <SupportTickets />}
          {activeView === 'billing' && <BillingInvoices />}
          {activeView === 'new-order' && <NewServiceOrder />}
          {activeView === 'migration' && <MigrationTracker />}
        </DashboardLayout>
      )}

      {/* Global Interactive Modals & Live Chat */}
      <AuthModal />
      <OrderModal />
      <MigrationModal />
      <PaymentGatewayModal />
      <LiveChatWidget />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
