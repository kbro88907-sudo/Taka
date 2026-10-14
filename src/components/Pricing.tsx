import React from 'react';
import { Check, Sparkles, Phone, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';

export const Pricing: React.FC = () => {
  const { packages } = useApp();

  return (
    <section id="pricing" className="py-24 relative bg-white border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
            <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            <span>استثمار مدروس لنمو حقيقي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            باقات واضحة وبدون <span className="text-gradient-gold">تكاليف خفية</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            اختر الباقة المناسبة لمرحلة مشروعك، واضمن تسليماً احترافياً فورياً يدعم مبيعاتك وأرباحك من الشهر الأول.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const isFeatured = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-white/95 backdrop-blur-xl border-2 border-[#D4AF37] shadow-[0_12px_45px_rgba(212,175,55,0.18)] lg:-translate-y-3'
                    : 'bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:border-slate-300'
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FDE047] text-slate-950 text-xs font-black shadow-md uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      {pkg.badge || 'الباقة الأكثر طلباً'}
                    </span>
                  </div>
                )}

                <div>
                  {/* Package Title & Subtitle */}
                  <div className="mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[38px] font-normal">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{pkg.period}</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-bold text-slate-400 block mb-2">
                      مميزات الباقة:
                    </span>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                        <span
                          className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            isFeatured
                              ? 'bg-amber-100 text-[#B45309]'
                              : 'bg-purple-100 text-[#7C3AED]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="leading-normal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() =>
                    openWhatsApp(WhatsAppMessages.packageBooking(pkg.name, pkg.price))
                  }
                  className={`w-full py-3.5 px-6 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isFeatured
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#FDE047] to-[#D4AF37] text-slate-950 hover:shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-900 hover:bg-[#7C3AED] text-white transition-colors'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>{pkg.buttonText || 'احجز الباقة الآن'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom package notice */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-600 flex items-center justify-center gap-2 font-medium">
          <span>محتاج باقة مخصصة تناسب عدد فروع أو ميزانية محددة؟</span>
          <button
            onClick={() => openWhatsApp('أهلاً تكه، محتاج باقة وتفصيل خاص لعدد فروع ومشاريع محددة.')}
            className="text-[#7C3AED] underline hover:text-[#C026D3] font-bold cursor-pointer"
          >
            تواصل معنا لتفصيل باقتك
          </button>
        </div>
      </div>
    </section>
  );
};
