export type ServiceCategory = 'social' | 'restaurants' | 'other';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  iconName: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export type PortfolioCategory = 'all' | 'social' | 'restaurants' | 'branding';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'social' | 'restaurants' | 'branding';
  image: string;
  client: string;
  description: string;
  tags: string[];
  date: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  badge?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  serviceName: string;
  expiryDate: string; // YYYY-MM-DD
  active: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  linkText?: string;
  active: boolean;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  business: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
