import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#161628] border border-white/15 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-[#00F0FF] shrink-0" />}
      <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
    </div>
  );
};
