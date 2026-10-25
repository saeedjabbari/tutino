import React, { useState } from 'react';
import { TESTIMONIALS, BRAND_LOGOS } from '../data/mockData';
import { ChevronRight, ChevronLeft, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section className="py-20 bg-[#FFF5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonial Cards Carousel Container */}
        <div className="relative max-w-5xl mx-auto mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {TESTIMONIALS.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-rose-100 shadow-xs flex flex-col justify-between relative hover:shadow-md transition-shadow"
              >
                {/* Quote Icon */}
                <div className="text-rose-500 mb-4">
                  <Quote className="w-10 h-10 rotate-180 opacity-60" />
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-8">
                  {item.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-rose-50">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center font-black text-rose-700 text-lg">
                    {item.author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.author}</h4>
                    <p className="text-xs text-slate-500">
                      {item.role} <span className="font-bold text-rose-600">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows below/sides */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white border border-rose-200 text-slate-700 hover:bg-rose-50 transition-colors shadow-xs active:scale-95"
              aria-label="نظر قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-400 font-medium">نظرات بنیان‌گذاران و مدیران ارشد فناوری درباره توتینو</span>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white border border-rose-200 text-slate-700 hover:bg-rose-50 transition-colors shadow-xs active:scale-95"
              aria-label="نظر بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Partner Brands Grid */}
        <div className="pt-10 border-t border-rose-100 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
            میزبان مطمئن برندهای پیشرو و کسب‌وکارهای نام‌آشنای ایران در بستر توتینو
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all">
            {BRAND_LOGOS.map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 font-black text-base sm:text-lg text-slate-700 hover:text-rose-600 transition-colors cursor-default"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-rose-300"></div>
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
