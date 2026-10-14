import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { INITIAL_FAQS } from '../data/initialData';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
            <HelpCircle className="w-4 h-4" />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            الأسئلة <span className="text-gradient-gold">الشائعة</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            كل ما يهمك معرفته حول آلية العمل، سرعة التسليم، وحقوق التصاميم.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {INITIAL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#7C3AED]/40 shadow-md'
                    : 'bg-white/80 backdrop-blur-md border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full py-5 px-6 text-right flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#7C3AED] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
