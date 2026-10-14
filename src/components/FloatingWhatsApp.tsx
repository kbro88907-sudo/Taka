import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages, TAKKA_DISPLAY_PHONE } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 p-3.5 rounded-2xl shadow-xl max-w-xs animate-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2 left-2 text-slate-400 hover:text-slate-700"
            aria-label="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="text-right pr-1">
            <span className="text-xs font-bold text-[#7C3AED] block mb-0.5">
              مرحباً بك في استوديو تكه ⚡
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              عندك فكرة أو استفسار؟ احنا معاك أونلاين على واتساب للرد في دقائق!
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => openWhatsApp(WhatsAppMessages.floatingChat)}
        className="group relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="محادثة واتساب سريعة"
      >
        {/* Gentle Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 relative z-10" />

        {/* Floating Tag */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-white/95 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          واتساب مباشر: {TAKKA_DISPLAY_PHONE}
        </span>
      </button>
    </div>
  );
};
