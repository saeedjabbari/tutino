import React from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BookOpen, Clock, ArrowLeft } from 'lucide-react';

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-rose-600 font-extrabold text-xs uppercase tracking-wider block mb-2">
            وبلاگ توتینو و تازه‌های آموزش میزبانی وب
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3">
            منبع آموزش وردپرس و انتخاب بهترین هاست
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            جدیدترین مقالات تخصصی، ترفندهای افزایش سرعت لود و راهنمای مدیریت سرور
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#FFF8F9] rounded-3xl p-6 border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all flex flex-col justify-between text-right group cursor-pointer"
            >
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="font-bold text-rose-600">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-rose-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-rose-100/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">{post.date}</span>
                <span className="font-bold text-slate-900 group-hover:text-rose-600 flex items-center gap-1">
                  <span>مطالعه مقاله</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
