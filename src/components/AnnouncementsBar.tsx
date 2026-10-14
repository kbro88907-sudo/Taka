import React, { useState } from 'react';
import { Megaphone, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { openWhatsApp } from '../utils/whatsapp';

export const AnnouncementsBar: React.FC = () => {
  const { announcements } = useApp();
  const [dismissed, setDismissed] = useState(false);

  const activeAnnouncements = announcements.filter((a) => a.active);
  if (activeAnnouncements.length === 0 || dismissed) return null;

  const current = activeAnnouncements[0];

  return (
    <div className="bg-purple-50/90 backdrop-blur-md border-b border-purple-100 px-4 py-2 text-xs text-slate-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="flex items-center gap-1 text-[#7C3AED] font-bold shrink-0">
            <Megaphone className="w-3.5 h-3.5" />
            <span>جديد تكه:</span>
          </span>
          <span className="text-slate-900 font-medium truncate">{current.title}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() =>
              openWhatsApp(
                `أهلاً تكه، حابب أعرف تفاصيل أكتر عن إعلانكم بخصوص: "${current.title}"`
              )
            }
            className="text-[11px] font-bold text-[#B45309] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{current.linkText || 'اكتشف المزيد'}</span>
            <ArrowLeft className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-700"
            aria-label="إغلاق الإعلان"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
