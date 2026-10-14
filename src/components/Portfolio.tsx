import React, { useState } from 'react';
import { Maximize2, X, MessageSquare, ArrowLeft, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioCategory, PortfolioItem } from '../types';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';

export const Portfolio: React.FC = () => {
  const { portfolio } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? portfolio
      : portfolio.filter((item) => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'جميع الأعمال' },
    { id: 'social', label: 'سوشيال ميديا وريلز' },
    { id: 'restaurants', label: 'مطاعم وقوائم طعام' },
    { id: 'branding', label: 'هويات بصرية وكافيهات' },
  ];

  return (
    <section id="portfolio" className="py-24 relative bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
            <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            <span>معرض إبداعاتنا الحية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            أعمال حقيقية صنعت <span className="text-gradient-gold">أرقاماً ونجاحات</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            استعرض نماذج من هويات المطاعم، تصميمات المنيو، وحملات السوشيال ميديا التي قمنا بتنفيذها لشركاء نجاحنا.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white shadow-md shadow-purple-500/20'
                    : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white/85 backdrop-blur-md border border-slate-200/90 hover:border-[#7C3AED]/40 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl flex flex-col"
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Quick Expand Button Hover */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Client pill */}
                <div className="absolute bottom-4 right-4 text-xs font-bold px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#B45309] border border-amber-200 shadow-md">
                  {item.client}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#7C3AED] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Tags and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-[#7C3AED] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Preview Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 text-slate-700 hover:bg-[#7C3AED] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label="إغلاق المعاينة"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              {/* Image side */}
              <div className="md:col-span-7 bg-slate-950 flex items-center justify-center p-4">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-auto rounded-xl object-contain shadow-lg"
                />
              </div>

              {/* Info side */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-right bg-white">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B45309] mb-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{activeItem.client}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                    {activeItem.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {activeItem.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-400 block mb-2">العناصر المنفذة:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 text-[#7C3AED] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specific WhatsApp Button for this work */}
                <div className="pt-6 border-t border-slate-100">
                  <button
                    onClick={() => {
                      openWhatsApp(
                        WhatsAppMessages.portfolioSpecific(activeItem.title, activeItem.client)
                      );
                      setActiveItem(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] hover:shadow-lg transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>عايز تصميم زي ده لمشروعي</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
