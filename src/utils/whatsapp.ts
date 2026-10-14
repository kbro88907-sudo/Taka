export const TAKKA_PHONE = '201142519392';
export const TAKKA_DISPLAY_PHONE = '01142519392';

/**
 * Returns a direct WhatsApp chat URL with URL-encoded Arabic message
 */
export function getWhatsAppUrl(message?: string): string {
  const defaultMsg = 'أهلاً تكه، حابب أستفسر عن خدماتكم وأبدأ مشروع جديد معاك.';
  const text = encodeURIComponent(message?.trim() || defaultMsg);
  return `https://wa.me/${TAKKA_PHONE}?text=${text}`;
}

export function openWhatsApp(message?: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export const WhatsAppMessages = {
  heroStart: 'أهلاً تكه، شفت موقعكم وحابب أبدأ مشروع جديد معاكم بأعلى جودة وسرعة!',
  heroPortfolio: 'أهلاً تكه، عجبني شغلكم في المعرض وعايز أعرف تفاصيل أكتر للتعاقد.',
  packageBooking: (packageName: string, price: string) =>
    `أهلاً تكه، حابب أحجز "${packageName}" (بسعر ${price})، ومحتاج أعرف خطوات البدء فوراً.`,
  serviceInquiry: (serviceTitle: string) =>
    `أهلاً تكه، مهتم بخدمة "${serviceTitle}"، وعايز أعرف تفاصيل الأسعار ومواعيد التسليم.`,
  portfolioSpecific: (itemTitle: string, client: string) =>
    `أهلاً تكه، شوفت تصميم "${itemTitle}" لـ (${client}) وعايز تصميم فخم ومميز زيه لعلامتي التجارية.`,
  specialOffer: (offerTitle: string, discount: number) =>
    `أهلاً تكه، مهتم بالعرض الخاص "${offerTitle}" بخصم ${discount}% وحابب ألحق العرض قبل ما ينتهي.`,
  floatingChat: 'أهلاً استوديو تكه، محتاج استشارة سريعة بخصوص مشروعي.',
  leadForm: (name: string, service: string, phone: string, notes: string) =>
    `*طلب جديد من موقع تكه*\n\n` +
    `👤 *الاسم:* ${name}\n` +
    `📱 *رقم التواصل:* ${phone}\n` +
    `⚡ *الخدمة المطلوبة:* ${service}\n` +
    `📝 *تفاصيل المشروع:* ${notes || 'لا يوجد تفاصيل إضافية'}\n\n` +
    `منتظر ردكم السريع للبدء!`,
};
