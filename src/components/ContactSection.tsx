import React, { useState } from 'react';
import { MessageSquare, Phone, Send, CheckCircle2 } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages, TAKKA_DISPLAY_PHONE } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('إدارة سوشيال ميديا وبوستات');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'إدارة سوشيال ميديا وبوستات',
    'تصميم منيو وهوية مطاعم وكافيهات',
    'مونتاج ريلز وفيديوهات قصيرة',
    'موشن جرافيك احترافي',
    'حملات إعلانية ممولة (Ads)',
    'باقة متكاملة VIP',
    'أخرى / استفسار عام',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const message = WhatsAppMessages.leadForm(
      name.trim(),
      service,
      phone.trim() || 'لم يحدد',
      notes.trim()
    );

    openWhatsApp(message);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info Side */}
          <div className="lg:col-span-5 text-right">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
              <span className="w-2 h-2 rounded-full bg-[#B45309]" />
              <span>جاهزون للانطلاق</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 [text-wrap:balance]">
              ابدأ مشروعك في <span className="text-gradient-purple">تكه</span> واحدة
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-medium">
              لا تنتظر طويلاً.. تواصل معنا مباشرة عبر واتساب لنناقش تفاصيل مشروعك ونبدأ فوراً في إعداد الهوية أو خطة السوشيال ميديا لمضاعفة نتائجك.
            </p>

            {/* Direct Big WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#25D366]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">رقم الواتساب المباشر:</span>
                    <span className="text-lg font-black text-slate-900 tracking-wider tabular-nums">
                      {TAKKA_DISPLAY_PHONE}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  متصل الآن
                </span>
              </div>

              <button
                onClick={() => openWhatsApp(WhatsAppMessages.heroStart)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>محادثة فورية على واتساب</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 space-y-1 font-medium">
              <div>⚡ الرد السريع خلال أقل من 15 دقيقة طوال ساعات العمل.</div>
              <div>⚡ استشارة تسويقية أولية مجانية لمشروعك.</div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_45px_rgba(0,0,0,0.05)] relative">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                أرسل تفاصيل مشروعك
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
                املأ البيانات وسيتم تحويلها لرسالة واتساب جاهزة للتواصل الفوري.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم أو اسم البراند / المطعم *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: مطعم شاورما السلطان أو كريم أحمد"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      رقم الهاتف / الواتساب
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="مثال: 01012345678"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-colors tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      نوع الخدمة المطلوبة *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-colors"
                    >
                      {serviceOptions.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تفاصيل أو ملاحظات عن المشروع
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أخبرنا بالمطلوب أو الأهداف والموعد المقترح..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C026D3] hover:shadow-[0_8px_25px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>إرسال واستشارة فورية عبر واتساب</span>
                </button>

                {submitted && (
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 pt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم فتح واتساب وجاري إرسال البيانات..</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
