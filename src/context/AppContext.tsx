import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PricingPackage,
  SpecialOffer,
  Announcement,
  PortfolioItem,
  ServiceItem,
} from '../types';
import {
  INITIAL_PACKAGES,
  INITIAL_OFFERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_PORTFOLIO,
  INITIAL_SERVICES,
} from '../data/initialData';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  packages: PricingPackage[];
  updatePackage: (pkg: PricingPackage) => void;

  offers: SpecialOffer[];
  addOffer: (offer: Omit<SpecialOffer, 'id'>) => void;
  updateOffer: (offer: SpecialOffer) => void;
  deleteOffer: (id: string) => void;

  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>) => void;
  updateAnnouncement: (ann: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'date'>) => void;
  deletePortfolioItem: (id: string) => void;

  services: ServiceItem[];

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  resetToDefaults: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PACKAGES: 'takka_packages_v2',
  OFFERS: 'takka_offers_v2',
  ANNOUNCEMENTS: 'takka_announcements_v2',
  PORTFOLIO: 'takka_portfolio_v2',
  AUTH: 'takka_admin_auth_v2',
};

const ADMIN_PASSWORD = '8889384444';

// Safe storage access that never crashes in strict environments or sandboxes
const safeGetItem = (key: string): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Storage access denied or blocked
  }
  return null;
};

const safeSetItem = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Storage access denied or blocked
  }
};

const safeRemoveItem = (key: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Storage access denied or blocked
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<PricingPackage[]>(() => {
    try {
      const saved = safeGetItem(STORAGE_KEYS.PACKAGES);
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    try {
      const saved = safeGetItem(STORAGE_KEYS.OFFERS);
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = safeGetItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = safeGetItem(STORAGE_KEYS.PORTFOLIO);
      return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return safeGetItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync state to safe storage
  useEffect(() => {
    try {
      safeSetItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    } catch {
      // ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      safeSetItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
    } catch {
      // ignore
    }
  }, [offers]);

  useEffect(() => {
    try {
      safeSetItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch {
      // ignore
    }
  }, [announcements]);

  useEffect(() => {
    try {
      safeSetItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
    } catch {
      // ignore
    }
  }, [portfolio]);

  const updatePackage = (updatedPkg: PricingPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)));
    showToast(`تم تحديث باقة "${updatedPkg.name}" بنجاح`);
  };

  const addOffer = (newOffer: Omit<SpecialOffer, 'id'>) => {
    const offer: SpecialOffer = {
      ...newOffer,
      id: `offer-${Date.now()}`,
    };
    setOffers((prev) => [offer, ...prev]);
    showToast('تمت إضافة العرض الترويجي الجديد بنجاح');
  };

  const updateOffer = (updatedOffer: SpecialOffer) => {
    setOffers((prev) => prev.map((o) => (o.id === updatedOffer.id ? updatedOffer : o)));
    showToast('تم تحديث بيانات العرض بنجاح');
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    showToast('تم حذف العرض بنجاح', 'info');
  };

  const addAnnouncement = (newAnn: Omit<Announcement, 'id' | 'date'>) => {
    const ann: Announcement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [ann, ...prev]);
    showToast('تم نشر الإعلان الجديد بنجاح');
  };

  const updateAnnouncement = (updatedAnn: Announcement) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === updatedAnn.id ? updatedAnn : a)));
    showToast('تم تحديث الإعلان');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('تم حذف الإعلان', 'info');
  };

  const addPortfolioItem = (itemData: Omit<PortfolioItem, 'id' | 'date'>) => {
    const newItem: PortfolioItem = {
      ...itemData,
      id: `port-${Date.now()}`,
      date: '2026',
    };
    setPortfolio((prev) => [newItem, ...prev]);
    showToast('تمت إضافة العمل الجديد إلى المعرض بنجاح');
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    showToast('تم حذف العمل من المعرض', 'info');
  };

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      safeSetItem(STORAGE_KEYS.AUTH, 'true');
      showToast('مرحباً بك في لوحة تحكم تكه', 'success');
      return true;
    }
    showToast('كلمة السر غير صحيحة، حاول مجدداً', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    safeRemoveItem(STORAGE_KEYS.AUTH);
    showToast('تم تسجيل الخروج من لوحة التحكم', 'info');
  };

  const resetToDefaults = () => {
    setPackages(INITIAL_PACKAGES);
    setOffers(INITIAL_OFFERS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setPortfolio(INITIAL_PORTFOLIO);
    showToast('تمت استعادة البيانات الافتراضية بنجاح', 'success');
  };

  return (
    <AppContext.Provider
      value={{
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
        services,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
