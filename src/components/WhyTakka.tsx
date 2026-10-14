import React from 'react';
import { Zap, Crown, Eye, MessageCircle, ArrowLeft } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';

export const WhyTakka: React.FC = () => {
  const pillars = [
    {
      icon: <Zap className="w-6 h-6 text-[#7C3AED]" />,
      title: 'سرعة استثنائية في التسليم',
      description: 'وداعاً لشهور الانتظار والمماطلة. في تكه نسلم مسوداتك الأولى في 24-48 ساعة، ومشاريعك المتكاملة بمواعيد صارمة لا تقبل التأخير.',
      kicker: 'من 24 إلى 48 ساعة',
    },
    {
      icon: <Crown className="w-6 h-6 text-[#B45309]" />,
      title: 'فخامة تليق بعلامتك',
      description: 'نصمم كل تفصيلة بدقة متناهية: تناسق الألوان، الخطوط العربية الفاخرة، والطباعة الاحترافية لتبدو علامتك التجارية بأعلى درجات الرقي والاحترافية.',
      kicker: 'معايير VIP راقية',
    },
    {
      icon: <Eye className="w-6 h-6 text-[#C026D3]" />,
      title: 'أفكار برة الصندوق توقف السكرول',
      description: 'نبتعد تماماً عن القوالب الجاهزة والمستهلكة. كل بوست، ريلز، أو منيو يتم تصميمه بفكرة إبداعية تلتفت لها الأنظار وتحرك رغبة الشراء لدى العميل.',
      kicker: 'تصاميم حصرية 100%',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#0284C7]" />,
      title: 'دعم وتواصل مباشر على واتساب',
      description: 'بدون روتين أو إيميلات معقدة؛ مدير حسابك معك على واتساب خطوة بخطوة للرد على استفساراتك وتعديلاتك الفورية في أي وقت.',
      kicker: 'تواصل فوري 7 أيام',
    },
  ];

  return (
    <section id="why-takka" className="py-24 relative bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Heading side */}
          <div className="lg:col-span-5 text-right">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
              <span className="w-2 h-2 rounded-full bg-[#B45309]" />
              <span>لماذا يختارنا أصحاب المشاريع؟</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 [text-wrap:balance]">
              مش مجرد تصميم.. <br />
              <span className="text-gradient-purple">شراكة نمو حقيقية</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-medium">
              في عالم مليء بالتصاميم المتشابهة والمملة، اسمنا "تكه" لأننا نضع لمسة الإتقان والسرعة التي تصنع فارقاً جوهرياً في جذب العملاء ومضاعفة الإيرادات.
            </p>

            <button
              onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] hover:opacity-95 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-purple-500/20"
            >
              <span>تحدث مع فريق تكه الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Right / 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#7C3AED]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 shadow-xs">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-slate-400 mb-1">{item.kicker}</div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
