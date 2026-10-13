import React from "react";
import { ArrowRight } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const NewsInsightsSection = ({ onSelectArticle, onExploreMore }) => {
  const { news } = useCMS();
  const articles = news && news.length > 0 ? news.slice(0, 3) : [];


  const handleCardClick = (item) => {
    if (onSelectArticle) {
      onSelectArticle(item);
    } else if (onExploreMore) {
      onExploreMore();
    }
  };

  return (
    <section
      id="insights"
      className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#EDF4FB] via-[#E2EDF8] to-[#EDF4FB] dark:from-[#08183A] dark:via-[#0D2456] dark:to-[#08183A] border-y border-sky-200/60 dark:border-sky-400/25 shadow-inner overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Radial Spotlight */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-sky-400/10 dark:bg-sky-500/15 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-sky-400/10 border border-blue-500/20 dark:border-sky-400/30 text-blue-600 dark:text-sky-300 font-mono text-xs font-semibold">
            <span>ARCHITECTURAL INSIGHTS & UPDATES</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            News & <span className="text-blue-600 dark:text-sky-400">Insights</span>
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
            Stay updated with our latest project milestones, technical innovations, and structural advancements across Lucknow.
          </p>
        </div>

        {/* Concept 4: Horizontal Editorial Gazette (Compact Height Rows) */}
        <div className="space-y-4 sm:space-y-4.5">
          {articles.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:to-[#081735] rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 border border-slate-200/90 dark:border-sky-400/25 shadow-sm hover:shadow-xl hover:border-blue-500/60 dark:hover:border-sky-400/60 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ring-1 ring-blue-100/50 dark:ring-sky-300/10"
            >
              {/* Left Wider Image */}
              <div className="relative w-full sm:w-[280px] md:w-[310px] lg:w-[330px] h-[170px] sm:h-[140px] md:h-[145px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-200/70 dark:border-sky-400/35 font-mono text-[10px] text-blue-600 dark:text-sky-300 font-semibold shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Center Content: Title & Compact 2-line Paragraph */}
              <div className="flex-1 min-w-0 py-0.5 space-y-1 sm:space-y-1.5 w-full">
                <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-400 dark:text-gray-400">
                  <span className="font-semibold text-blue-600 dark:text-sky-400">{item.date}</span>
                  <span>•</span>
                  <span>TECHNICAL DISPATCH</span>
                </div>

                <h3 className="font-display text-[15px] sm:text-[16.5px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-[12.5px] sm:text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed font-sans line-clamp-2 max-w-2xl">
                  {item.excerpt}
                </p>
              </div>

              {/* Right Action: Read More Pill Button */}
              <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow-md shadow-blue-600/20 transition-all cursor-pointer group/btn"
                >
                  <span>READ MORE</span>
                  <span className="w-4 h-4 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-[10px] group-hover/btn:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
