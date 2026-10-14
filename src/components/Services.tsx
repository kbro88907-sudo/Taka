import React, { useState } from 'react';
import {
  LayoutGrid,
  Palette,
  Film,
  Sparkles,
  Target,
  Compass,
  UtensilsCrossed,
  Image as ImageIcon,
  Crown,
  QrCode,
  Flame,
  Camera,
  FileText,
  Sparkle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';
import { ServiceCategory } from '../types';

export const Services: React.FC = () => {
  const { services } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');

  const getServiceIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-[#7C3AED]' };
    switch (name) {
      case 'LayoutGrid':
        return <LayoutGrid {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Film':
        return <Film {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Target':
        return <Target {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed {...props} />;
      case 'Image':
        return <ImageIcon {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'QrCode':
        return <QrCode {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      case 'Camera':
        return <Camera {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'Sparkle':
        return <Sparkle {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'جميع الخدمات', count: services.length },
    { id: 'social', label: 'خدمات السوشيال ميديا', count: services.filter(s => s.category === 'social').length },
    { id: 'restaurants', label: 'المطاعم والكافيهات', count: services.filter(s => s.category === 'restaurants').length },
    { id: 'other', label: 'مناسبات وعروض خاصة', count: services.filter(s => s.category === 'other').length },
  ];

  return (
    <section id="services" className="py-24 relative bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
            <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            <span>حلول إبداعية متكاملة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            خدمات تصنع الفارق.. <span className="text-gradient-purple">بسرعة وإتقان</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            سواء كنت صاحب مطعم يبحث عن منيو وهوية تملأ الصالة، أو علامة تجارية ترغب في زيادة التفاعل والمبيعات عبر السوشيال، تكه تضعك في المقدمة.
          </p>
        </div>

        {/* Functional Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm max-w-2xl mx-auto mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#7C3AED]/50 hover:shadow-[0_12px_35px_rgba(124,58,237,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7C3AED]/10 transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-50 text-[#B45309] border border-amber-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                  {service.description}
                </p>

                {/* Features points */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => openWhatsApp(WhatsAppMessages.serviceInquiry(service.title))}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 hover:bg-[#7C3AED] hover:text-white border border-slate-200 hover:border-[#7C3AED] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>طلب الخدمة عبر واتساب</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
