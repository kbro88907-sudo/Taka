/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { TopWelcomeBar } from './components/TopWelcomeBar';
import { Navbar } from './components/Navbar';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { AnnouncementsBar } from './components/AnnouncementsBar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyTakka } from './components/WhyTakka';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#FAFAFC] text-slate-900 flex flex-col font-cairo selection:bg-[#7C3AED]/20 selection:text-[#7C3AED] relative overflow-x-hidden">
        {/* Welcome Greeting Banner at the Very Top */}
        <TopWelcomeBar />

        {/* Promotional Offers & Announcements */}
        <SpecialOfferBanner />
        <AnnouncementsBar />

        {/* Sticky Header with Transparent White Glassmorphism */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <Services />
          <WhyTakka />
          <Portfolio />
          <Pricing />
          <Testimonials />
          <FAQ />
          <ContactSection />
        </main>

        {/* Site Footer with Discreet Admin Access at the Bottom */}
        <Footer />

        {/* Interactive Overlays */}
        <FloatingWhatsApp />
        <AdminModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
