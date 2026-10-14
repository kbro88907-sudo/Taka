import React, { useState } from 'react';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data/initialData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = INITIAL_TESTIMONIALS;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#B45309]">
            <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            <span>ثقة لا تُقدّر بثمن</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            ماذا يقول عملاء <span className="text-gradient-purple">تكه؟</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            آراء وتجارب شركائنا من أصحاب المطاعم، الكافيهات، والبراندات الرائدة.
          </p>
        </div>

        {/* Testimonial Box */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            {/* Top quote icon */}
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] mb-6 shadow-2xs">
              <Quote className="w-6 h-6 rotate-180" />
            </div>

            {/* Content text */}
            <p className="text-base sm:text-xl text-slate-800 leading-relaxed mb-8 italic font-medium">
              "{current.content}"
            </p>

            {/* Stars rating */}
            <div className="flex items-center gap-1 mb-6 text-[#D97706]">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D97706]" />
              ))}
            </div>

            {/* Author info and navigation controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">{current.name}</h3>
                <div className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-2">
                  <span>{current.role}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[#B45309] font-bold">{current.business}</span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs"
                  aria-label="الرأي السابق"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="text-xs font-mono tabular-nums text-slate-500 font-bold">
                  {currentIndex + 1} / {testimonials.length}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs"
                  aria-label="الرأي التالي"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
