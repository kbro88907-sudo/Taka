import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الخدمات', href: '#services' },
    { name: 'لماذا تكه؟', href: '#why-takka' },
    { name: 'الأعمال', href: '#portfolio' },
    { name: 'الباقات', href: '#pricing' },
    { name: 'آراء العملاء', href: '#testimonials' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] py-3'
          : 'bg-white/50 backdrop-blur-md py-4 sm:py-5 border-b border-slate-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark with brand flair */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#C026D3] to-[#0284C7] p-[2px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <span className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#B45309] font-bold text-lg">
                ت
              </span>
            </span>
            <span className="font-extrabold text-2xl tracking-normal text-slate-900">
              تكه <span className="text-xs font-semibold text-[#7C3AED] tracking-wider uppercase">TAKKA</span>
            </span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#7C3AED] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (Admin entry removed from top as requested) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C026D3] rounded-xl shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>اطلب دلوقتي</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 transition-all duration-300 shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-semibold text-slate-700 hover:text-[#7C3AED] py-2 border-b border-slate-100"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp(WhatsAppMessages.heroStart);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] rounded-xl shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>اطلب دلوقتي عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
