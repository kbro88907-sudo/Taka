import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, ArrowLeft, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';

export const SpecialOfferBanner: React.FC = () => {
  const { offers } = useApp();
  const activeOffer = offers.find((o) => o.active);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!activeOffer) return;

    const calculateTime = () => {
      const difference = new Date(activeOffer.expiryDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [activeOffer]);

  if (!activeOffer) return null;

  return (
    <aside
      aria-label="عرض خاص ترويجي"
      className="relative z-30 bg-gradient-to-r from-[#7C3AED]/90 via-[#9333EA]/90 to-[#C026D3]/90 text-white border-b border-white/15 px-4 py-2.5 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
        {/* Title and discount */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#0A0A12] font-black text-xs shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            خصم {activeOffer.discountPercent}%
          </span>
          <span className="font-bold text-white tracking-wide">
            {activeOffer.title}
          </span>
          <span className="hidden lg:inline text-white/80 text-xs">
            ({activeOffer.serviceName})
          </span>
        </div>

        {/* Countdown and CTA */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg border border-white/10 tabular-nums">
            <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>متبقي:</span>
            <span>{activeOffer.expiryDate ? `${timeLeft.days}ي ${timeLeft.hours}س ${timeLeft.minutes}د ${timeLeft.seconds}ث` : 'لفترة محدودة'}</span>
          </div>

          <button
            onClick={() =>
              openWhatsApp(
                WhatsAppMessages.specialOffer(activeOffer.title, activeOffer.discountPercent)
              )
            }
            className="inline-flex items-center gap-1.5 bg-white text-[#7C3AED] hover:bg-[#00F0FF] hover:text-[#0A0A12] px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer shadow-sm"
          >
            <span>الحق العرض</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
