import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('App error caught by ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 text-center font-cairo">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7C3AED] mb-4 text-2xl font-bold">
            ت
          </div>
          <h1 className="text-xl font-bold mb-2">استوديو تكه (TAKKA)</h1>
          <p className="text-sm text-slate-600 mb-6 max-w-sm">
            حدث خطأ أثناء تحميل بعض الملفات، يرجى تحديث الصفحة أو المحاولة مجدداً.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-bold shadow-md hover:bg-[#6D28D9] transition-all cursor-pointer"
          >
            تحديث الصفحة الآن
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
