import React from 'react';
import { Sparkles, ArrowLeft, Phone } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';

export const TopWelcomeBar: React.FC = () => {
  return (
    <aside
      aria-label="رسالة ترحيبية"
      className="relative z-50 bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C026D3] text-white py-2 px-4 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-right">
        {/* Welcome Text */}
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-[#FDE047] shrink-0 animate-pulse" />
          <span>
            أهلاً بكم في استوديو <strong className="font-extrabold text-[#FDE047]">تكه (TAKKA)</strong> — شريككم الإبداعي في تصميم الهويات، قوائم الطعام، وإدارة السوشيال ميديا باحترافية وسرعة فائقة!
          </span>
        </div>

        {/* Quick WhatsApp Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-bold text-slate-900 bg-white hover:bg-[#FDE047] rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Phone className="w-3 h-3 text-[#7C3AED]" />
            <span>تواصل معنا الآن</span>
            <ArrowLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
