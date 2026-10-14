import React, { useState } from 'react';
import { MessageSquare, Lock, X } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages, TAKKA_DISPLAY_PHONE } from '../utils/whatsapp';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsAdminOpen } = useApp();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const quickLinks = [
    { name: 'الرئيسية', href: '#' },
    { name: 'خدماتنا المتكاملة', href: '#services' },
    { name: 'لماذا تكه؟', href: '#why-takka' },
    { name: 'معرض الأعمال', href: '#portfolio' },
    { name: 'الباقات والأسعار', href: '#pricing' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          {/* Brand Info */}
          <div className="lg:col-span-5 text-right">
            <div className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#C026D3] to-[#0284C7] p-[2px] flex items-center justify-center shadow-xs">
                <span className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#B45309] font-bold text-lg">
                  ت
                </span>
              </span>
              <span className="font-extrabold text-2xl">
                تكه <span className="text-xs font-semibold text-[#7C3AED] uppercase">TAKKA</span>
              </span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-6 font-medium">
              وكالة تصميم وتسويق رقمي تدمج الفخامة والسرعة، متخصصة في ابتكار هويات المطاعم والكافيهات، إدارة السوشيال ميديا، الموشن جرافيك وتصاميم توقف السكرول.
            </p>

            <div className="text-xs text-slate-600 flex items-center gap-3 font-semibold">
              <span>واتساب المباشر:</span>
              <button
                onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
                className="font-black text-[#7C3AED] hover:underline tabular-nums cursor-pointer"
              >
                {TAKKA_DISPLAY_PHONE}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 text-right">
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-wide">روابط سريعة</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#7C3AED] py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Guarantee & Direct Action */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-wide">ابدأ مشروعك اليوم</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4 font-medium">
              فريقنا جاهز لمناقشة أهدافك والبدء فوراً في تسليم تصاميم تصنع فارقاً حقيقياً لمشروعك.
            </p>

            <button
              onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>محادثة واتساب سريعة</span>
            </button>
          </div>
        </div>

        {/* Bottom bar with Subtle Hidden Admin Entrance at the very bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} استوديو <span className="text-[#B45309] font-bold">تكه (TAKKA)</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              سياسة الخصوصية وشروط الاستخدام
            </button>
            <span>·</span>
            {/* Subtle discreet Admin entrance strictly placed at the bottom */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-400 hover:text-[#7C3AED] transition-colors flex items-center gap-1 cursor-pointer"
              title="دخول لوحة التحكم المشفرة"
            >
              <Lock className="w-3 h-3" />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">سياسة الاستخدام والخصوصية - تكه</h3>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto font-normal">
              <p>
                <strong>حقوق الملكية الفكرية:</strong> تنتقل كامل حقوق ملكية التصاميم والهويات والشعارات والملفات المفتوحة المعتمدة للعميل بمجرد اكتمال سداد قيمة المشروع بالكامل.
              </p>
              <p>
                <strong>سرية البيانات:</strong> نحافظ في استوديو تكه على سرية معلومات وأسرار العمل وخطط الأسعار الخاصة بشركائنا ولا يتم مشاركتها مع أي طرف ثالث.
              </p>
              <p>
                <strong>سياسة التعديلات:</strong> نلتزم بجولات التعديل المتفق عليها في الباقة حتى الوصول للنتيجة المطلوبة والمعتمدة.
              </p>
              <p>
                <strong>التواصل:</strong> يتم اعتماد المراسلات والاتفاقات المنفذة عبر تطبيق واتساب لضمان السرعة والتوثيق المباشر.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
