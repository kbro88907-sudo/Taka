import React from 'react';
import { ArrowLeft, MessageSquare, Zap, ShieldCheck, Flame } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';
import heroStudioImage from '../assets/images/takka_hero_creative_1791997542444.jpg';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '+250', label: 'مشروع وهوية منجزة', sublabel: 'في مختلف الأنشطة' },
    { value: '48 س', label: 'أسرع تسليم للتصاميم', sublabel: 'دقة والتزام بالموعد' },
    { value: '99%', label: 'نسبة رضا العملاء', sublabel: 'تقييم 5 نجوم معتمد' },
    { value: '+85', label: 'مطعم وعلامة تجارية', sublabel: 'شراكات نجاح مستمرة' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C026D3]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Geometric Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 text-right">
            {/* Unboxed editorial kicker */}
            <div className="inline-flex items-center gap-2 mb-5 text-xs font-bold text-[#B45309]">
              <span className="w-2 h-2 rounded-full bg-[#B45309]" />
              <span className="tracking-widest uppercase">استوديو تكه للتصميم والتسويق الرقمي</span>
              <span className="text-slate-300">·</span>
              <span className="text-[#7C3AED]">سرعة وفخامة</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.2] mb-6 [text-wrap:balance]">
              تكه..{' '}
              <span className="text-gradient-purple">شغل مختلف،</span>
              <br />
              <span className="text-gradient-gold">بسرعة وبفخامة.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-medium">
              وكالتك المتخصصة في ابتكار هويات المطاعم والكافيهات، إدارة السوشيال ميديا، تصميم البوستات،
              ومونتاج الريلز التي توقف السكرول وتزيد مبيعاتك فوراً.. بدون تأخير وبأعلى معايير الجودة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C026D3] rounded-xl shadow-[0_8px_25px_rgba(124,58,237,0.3)] hover:shadow-[0_12px_30px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>ابدأ مشروعك دلوقتي</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollToSection('portfolio')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-slate-800 bg-white/80 hover:bg-white border border-slate-200 hover:border-[#7C3AED]/40 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>شوف أعمالنا</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-medium">تسليم سريع يبدأ من 48 ساعة</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B45309]" />
                <span className="font-medium">ضمان الجودة والتعديلات المعتمدة</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C026D3]" />
                <span className="font-medium">أفكار إبداعية خارج الصندوق</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#7C3AED]/20 via-slate-200/50 to-[#D4AF37]/20 shadow-xl">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={heroStudioImage}
                  alt="استوديو تكه للتصميم والتسويق الرقمي"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Floating highlight badge */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-[#7C3AED] font-bold block mb-0.5">جاهز للتنفيذ فوراً</span>
                    <h2 className="text-sm font-extrabold text-slate-900">تصميم سوشيال & هوية مطاعم</h2>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold bg-[#D4AF37] text-slate-950 rounded-lg shadow-sm">
                    تكه ⚡
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Stats & Impact Row Below Hero Split */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#7C3AED]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums tracking-tight mb-1">
                {item.value}
              </div>
              <div className="text-sm font-bold text-[#B45309] mb-0.5">{item.label}</div>
              <div className="text-xs text-slate-500 font-medium">{item.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
