import React, { useState } from 'react';
import {
  X,
  Lock,
  LogOut,
  Tag,
  Package,
  Megaphone,
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PricingPackage, SpecialOffer, Announcement, PortfolioItem } from '../types';
import defaultMenuImg from '../assets/images/portfolio_restaurant_menu_1791997543674.jpg';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    packages,
    updatePackage,
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    portfolio,
    addPortfolioItem,
    deletePortfolioItem,
    resetToDefaults,
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'packages' | 'offers' | 'announcements' | 'portfolio'>(
    'packages'
  );

  // States for Package Editing
  const [editingPkg, setEditingPkg] = useState<PricingPackage | null>(null);

  // States for New Offer Form
  const [newOffer, setNewOffer] = useState<{
    title: string;
    description: string;
    discountPercent: number;
    serviceName: string;
    expiryDate: string;
    active: boolean;
  }>({
    title: '',
    description: '',
    discountPercent: 25,
    serviceName: 'خدمات المطاعم والكافيهات',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    active: true,
  });

  // States for New Announcement Form
  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    linkText: 'اكتشف المزيد',
    active: true,
  });

  // States for New Portfolio Item Form
  const [newPort, setNewPort] = useState<{
    title: string;
    category: 'social' | 'restaurants' | 'branding';
    image: string;
    client: string;
    description: string;
    tags: string;
  }>({
    title: '',
    category: 'restaurants',
    image: defaultMenuImg,
    client: '',
    description: '',
    tags: 'منيو, تصميم فاخر',
  });

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setPasswordInput('');
    }
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPkg) {
      updatePackage(editingPkg);
      setEditingPkg(null);
    }
  };

  const handleAddOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.title.trim()) return;
    addOffer(newOffer);
    setNewOffer({
      title: '',
      description: '',
      discountPercent: 20,
      serviceName: 'خدمات السوشيال ميديا',
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: true,
    });
  };

  const handleAddAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title.trim()) return;
    addAnnouncement(newAnn);
    setNewAnn({
      title: '',
      content: '',
      linkText: 'اكتشف المزيد',
      active: true,
    });
  };

  const handleAddPortSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPort.title.trim() || !newPort.image.trim()) return;
    addPortfolioItem({
      title: newPort.title.trim(),
      category: newPort.category,
      image: newPort.image.trim(),
      client: newPort.client.trim() || 'عميل تكه',
      description: newPort.description.trim(),
      tags: newPort.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setNewPort({
      title: '',
      category: 'restaurants',
      image: '/src/assets/images/portfolio_restaurant_menu_1791997543674.jpg',
      client: '',
      description: '',
      tags: 'تصميم, هوية',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121222] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0E0E1A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#00F0FF]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">لوحة تحكم إدارة تكه (Admin)</h2>
              <span className="text-xs text-[#B8B8C7]">
                التحكم بالباقات، العروض المؤقتة، الإعلانات ومعرض الأعمال
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="p-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="إغلاق لوحة التحكم"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Password Authentication Gate */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-[#D4AF37] mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">الدخول الآمن للوحة التحكم</h3>
            <p className="text-xs sm:text-sm text-[#B8B8C7] mb-6">
              يرجى إدخال رمز المرور السري المخصص لإدارة محتوى الموقع.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center tracking-widest text-lg focus:outline-none focus:border-[#00F0FF] transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-[#0A0A12] bg-gradient-to-r from-[#D4AF37] to-[#FDE047] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                دخول لوحة التحكم
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-3 bg-[#0D0D18] border-b border-white/5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'packages'
                    ? 'bg-[#7C3AED] text-white shadow-md'
                    : 'text-[#B8B8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>الباقات والأسعار ({packages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'offers'
                    ? 'bg-[#7C3AED] text-white shadow-md'
                    : 'text-[#B8B8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>العروض المؤقتة ({offers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('announcements')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'announcements'
                    ? 'bg-[#7C3AED] text-white shadow-md'
                    : 'text-[#B8B8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>الإعلانات ({announcements.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-[#7C3AED] text-white shadow-md'
                    : 'text-[#B8B8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>معرض الأعمال ({portfolio.length})</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-right">
              {/* TAB 1: PACKAGES */}
              {activeTab === 'packages' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white">تعديل باقات الأسعار المباشرة:</h4>
                    <span className="text-xs text-[#B8B8C7]">التعديلات تنعكس فوراً على الموقع والواتساب</span>
                  </div>

                  {editingPkg ? (
                    <form onSubmit={handleSavePackage} className="p-6 rounded-2xl bg-white/5 border border-[#D4AF37]/40 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#D4AF37]">تعديل بيانات الباقة</span>
                        <button
                          type="button"
                          onClick={() => setEditingPkg(null)}
                          className="text-xs text-white/60 hover:text-white"
                        >
                          إلغاء
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">اسم الباقة</label>
                          <input
                            type="text"
                            value={editingPkg.name}
                            onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">السعر المعروض</label>
                          <input
                            type="text"
                            value={editingPkg.price}
                            onChange={(e) => setEditingPkg({ ...editingPkg, price: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">الوصف المختصر</label>
                        <input
                          type="text"
                          value={editingPkg.description}
                          onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">
                          المميزات (ميزة في كل سطر)
                        </label>
                        <textarea
                          rows={4}
                          value={editingPkg.features.join('\n')}
                          onChange={(e) =>
                            setEditingPkg({
                              ...editingPkg,
                              features: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm font-sans"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingPkg.isPopular}
                            onChange={(e) => setEditingPkg({ ...editingPkg, isPopular: e.target.checked })}
                            className="rounded border-white/20 text-[#D4AF37]"
                          />
                          <span>تمييز كباقة رئيسية بإطار ذهبي (Featured)</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl text-xs font-bold text-[#0A0A12] bg-[#D4AF37] hover:bg-[#FDE047] transition-all cursor-pointer"
                      >
                        حفظ التعديلات
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="text-base font-bold text-white">{pkg.name}</h5>
                              {pkg.isPopular && (
                                <span className="text-[10px] bg-[#D4AF37] text-[#0A0A12] font-bold px-2 py-0.5 rounded">
                                  مميزة بإطار ذهبي
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#00F0FF] font-bold mb-1">{pkg.price} {pkg.period}</div>
                            <p className="text-xs text-[#B8B8C7]">{pkg.description}</p>
                          </div>

                          <button
                            onClick={() => setEditingPkg(pkg)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#7C3AED]/20 border border-[#7C3AED] text-[#00F0FF] hover:bg-[#7C3AED]/40 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>تعديل الباقة</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SPECIAL OFFERS */}
              {activeTab === 'offers' && (
                <div className="space-y-6">
                  {/* Add Offer Form */}
                  <form onSubmit={handleAddOfferSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#00F0FF]" />
                      <span>إضافة عرض مؤقت جديد مع تاريخ انتهاء</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">عنوان العرض</label>
                        <input
                          type="text"
                          required
                          value={newOffer.title}
                          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                          placeholder="مثال: خصم 30% على هوية المطاعم والمنيو"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">الخدمة المستهدفة</label>
                        <input
                          type="text"
                          required
                          value={newOffer.serviceName}
                          onChange={(e) => setNewOffer({ ...newOffer, serviceName: e.target.value })}
                          placeholder="مثال: خدمات المطاعم والكافيهات"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">نسبة الخصم (%)</label>
                        <input
                          type="number"
                          min="5"
                          max="90"
                          value={newOffer.discountPercent}
                          onChange={(e) => setNewOffer({ ...newOffer, discountPercent: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">تاريخ انتهاء العرض</label>
                        <input
                          type="date"
                          required
                          value={newOffer.expiryDate}
                          onChange={(e) => setNewOffer({ ...newOffer, expiryDate: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">تفاصيل العرض</label>
                      <input
                        type="text"
                        value={newOffer.description}
                        onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                        placeholder="تفاصيل العرض الذي يظهر للعميل..."
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] hover:opacity-90 cursor-pointer"
                    >
                      إضافة العرض وتفعيله
                    </button>
                  </form>

                  {/* List of Offers */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-white">العروض الحالية:</h5>
                    {offers.length === 0 ? (
                      <div className="text-xs text-white/40 py-4 text-center">لا توجد عروض مضافة حالياً.</div>
                    ) : (
                      offers.map((offer) => (
                        <div
                          key={offer.id}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-white">{offer.title}</span>
                              <span className="text-xs bg-[#D4AF37] text-black font-bold px-2 py-0.5 rounded">
                                خصم {offer.discountPercent}%
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded ${
                                  offer.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}
                              >
                                {offer.active ? 'مفعل ويظهر بالشريط' : 'معطل'}
                              </span>
                            </div>
                            <div className="text-xs text-[#B8B8C7]">ينتهي في: {offer.expiryDate}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateOffer({ ...offer, active: !offer.active })}
                              className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                            >
                              {offer.active ? 'تعطيل' : 'تفعيل'}
                            </button>
                            <button
                              onClick={() => deleteOffer(offer.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer"
                              title="حذف العرض"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <div className="space-y-6">
                  {/* Add Announcement Form */}
                  <form onSubmit={handleAddAnnSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-[#00F0FF]" />
                      <span>إضافة إعلان عن خدمة جديدة أو تحديث</span>
                    </h5>

                    <div>
                      <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">عنوان الإعلان</label>
                      <input
                        type="text"
                        required
                        value={newAnn.title}
                        onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                        placeholder="مثال: إطلاق خدمة تصوير ريلز المطاعم في القاهرة والجيزة"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">محتوى الإعلان</label>
                      <textarea
                        rows={2}
                        value={newAnn.content}
                        onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                        placeholder="تفاصيل الخدمة الجديدة..."
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] hover:opacity-90 cursor-pointer"
                    >
                      نشر الإعلان
                    </button>
                  </form>

                  {/* List of Announcements */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-white">الإعلانات المنشورة:</h5>
                    {announcements.map((ann) => (
                      <div
                        key={ann.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-white">{ann.title}</span>
                            <span className="text-xs text-white/40">{ann.date}</span>
                          </div>
                          <p className="text-xs text-[#B8B8C7]">{ann.content}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateAnnouncement({ ...ann, active: !ann.active })}
                            className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                          >
                            {ann.active ? 'إخفاء' : 'إظهار'}
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(ann.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer"
                            title="حذف الإعلان"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PORTFOLIO */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  {/* Add Portfolio Item Form */}
                  <form onSubmit={handleAddPortSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#00F0FF]" />
                      <span>إضافة عمل جديد لمعرض الأعمال</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">عنوان العمل</label>
                        <input
                          type="text"
                          required
                          value={newPort.title}
                          onChange={(e) => setNewPort({ ...newPort, title: e.target.value })}
                          placeholder="مثال: منيو وهوية كافيه لاتيه آرت"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">التصنيف</label>
                        <select
                          value={newPort.category}
                          onChange={(e) => setNewPort({ ...newPort, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#18182A] border border-white/10 text-white text-sm"
                        >
                          <option value="restaurants">مطاعم وقوائم طعام</option>
                          <option value="social">سوشيال ميديا وريلز</option>
                          <option value="branding">هويات بصرية وكافيهات</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">اسم العميل / المكان</label>
                        <input
                          type="text"
                          value={newPort.client}
                          onChange={(e) => setNewPort({ ...newPort, client: e.target.value })}
                          placeholder="مثال: كافيه أورا - الشيخ زايد"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">رابط أو مسار الصورة</label>
                        <input
                          type="text"
                          required
                          value={newPort.image}
                          onChange={(e) => setNewPort({ ...newPort, image: e.target.value })}
                          placeholder="مسار محلي أو رابط ويب مباشر"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">الكلمات الدلالية (مفصولة بفاصلة)</label>
                      <input
                        type="text"
                        value={newPort.tags}
                        onChange={(e) => setNewPort({ ...newPort, tags: e.target.value })}
                        placeholder="منيو, باركود QR, هوية مطعم"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B8B8C7] mb-1">شرح موجز للعمل والنتائج</label>
                      <textarea
                        rows={2}
                        value={newPort.description}
                        onChange={(e) => setNewPort({ ...newPort, description: e.target.value })}
                        placeholder="ماذا قدمنا للعميل وما النتيجة المحققة؟"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#C026D3] hover:opacity-90 cursor-pointer"
                    >
                      إضافة للرئيسية والمعرض
                    </button>
                  </form>

                  {/* Portfolio Items List */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-white">الأعمال الحالية في المعرض:</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolio.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-14 rounded-lg object-cover shrink-0 bg-black/40"
                            />
                            <div className="truncate">
                              <h6 className="text-xs font-bold text-white truncate">{item.title}</h6>
                              <span className="text-[11px] text-[#D4AF37] block truncate">{item.client}</span>
                              <span className="text-[10px] text-white/40">{item.category}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => deletePortfolioItem(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0"
                            title="حذف العمل"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Reset Defaults */}
            <div className="p-4 bg-[#0A0A12] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#B8B8C7]">
              <span>البيانات محفوظة محلياً في المتصفح ومهيأة للربط مع Firebase Firestore.</span>
              <button
                onClick={() => {
                  if (window.confirm('هل تريد استعادة البيانات والأسعار الافتراضية؟')) {
                    resetToDefaults();
                  }
                }}
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة البيانات الافتراضية</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
