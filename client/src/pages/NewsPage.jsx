import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Share2,
  CheckCircle2,
  Building2,
  Layers,
  ShieldCheck,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import { Card3D } from "../components/ui/Card3D";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";
import { useCMS } from "../context/CMSContext";

export const NewsPage = ({ onInquiryClick, initialArticle, onClearInitialArticle }) => {
  const { news } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(initialArticle || null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync initialArticle from props when navigated from Home Page Read More
  React.useEffect(() => {
    if (initialArticle) {
      const match = (news || []).find((a) => a.id === initialArticle.id) || initialArticle;
      setActiveArticle(match);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [initialArticle, news]);


  // Freeze background page scroll & stop Lenis while article modal is open
  React.useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = "hidden";
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (window.__lenis) {
        window.__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [activeArticle]);

  const handleCloseModal = () => {
    setActiveArticle(null);
    document.body.style.overflow = "";
    if (window.__lenis) {
      window.__lenis.start();
    }
    if (onClearInitialArticle) {
      onClearInitialArticle();
    }
  };

  // Complete articles inventory matching home page NewsInsightsSection + curated architectural deep-dives
  const fallbackArticles = [
    {
      id: 1,
      title: "Key Safety Protocols on Active High-Rise Sites",
      category: "Safety & Compliance",
      date: "7/12/2026",
      readTime: "5 MIN READ",
      author: "ITLC SAFETY AUDIT",
      authorRole: "Senior Safety Controller, ITLC India",
      image: "/images/news/news_1_safety.webp",
      excerpt:
        "A detailed look at the structural safety measures, scaffolding rules, and audits that keep our active builds completely incident-free. Structural excellence combined with zero-incident execution is ITLC's hallmark.",
      fullStory: [
        "Across all multistory and luxury architectural projects under ITLC India Pvt. Ltd., site safety is treated as an uncompromising civil engineering discipline. Structural excellence cannot exist in isolation; it begins with the physical safety and systematic protection of every craftsman, certified welder, crane rigger, and structural supervisor working on site.",
        "Zero-Incident Scaffold Certification: In accordance with IS-2750 and OSHA 1926 standards, all modular cuplock and ringlock scaffolding systems undergo daily mechanical torque verification. Scaffold platforms must feature triple-tier toe boards, flame-retardant debris catchment netting, and color-coded physical tagging (Green: Cleared for Full Load; Red: Out of Service). Prior to each major slab pour, scaffolding base jacks and ledger stability are inspected with ultrasonic calipers to guarantee zero structural deflection under wet concrete hydrostatic pressure.",
        "Fall-Arrest & Dual-Lanyard Anchoring: For any work performed above 2.0 meters, 100% tie-off compliance is enforced using ANSI-certified full-body harnesses paired with shock-absorbing dual lanyards. Static lifelines engineered from 16mm high-tensile galvanized steel cables are anchored to verified structural column rebars, providing unhindered lateral mobility without compromising life safety.",
        "Heavy Rigging & High-Pressure Concrete Pumping: Crane lift operations are strictly controlled through calibrated wind anemometers that automatically trigger hoisting suspensions whenever site gusts exceed 38 km/h. High-pressure concrete pipeline joints are ultrasonically thickness-tested prior to each pour to prevent catastrophic burst incidents during vertical pumping across multistory elevations.",
        "Aerial Telemetry & Digital Safety Audits: Every active construction zone in Golf City and greater Lucknow is monitored with automated safety drones that map site logistics twice daily. Real-time footage is cross-referenced by our digital command desk to identify micro-infractions—such as missing chin straps, unbarricaded lift-shaft openings, or improper rebar capping—before they can develop into site hazards.",
        "Continuous Daily Toolbox Briefings: Each morning shifts commence with mandatory 15-minute specialized safety drills conducted in Hindi and regional dialects, ensuring every worker understands emergency descent paths, first-aid protocols, and heat-stress hydration schedules.",
      ],
      keyTakeaways: [
        "100% OSHA and Indian Standards (IS-456 / IS-2750) site safety compliance.",
        "Daily torque verification and triple-tag clearance for all modular scaffolding.",
        "Automated tower crane anemometer cutoffs triggered at 38 km/h wind speeds.",
        "Twice-daily aerial drone safety inspections cross-referenced with digital logs.",
        "Zero-incident engineering safety policy verified by certified supervisors.",
      ],
    },
    {
      id: 2,
      title: "Integrating Smart Technology in Commercial Sites",
      category: "Commercial Architecture",
      date: "7/10/2026",
      readTime: "5 MIN READ",
      author: "ITLC SYSTEMS ENGINEERING",
      authorRole: "Head of MEP & Automation, INFRA VISION",
      image: "/images/news/news_2_smart_tech.webp",
      excerpt:
        "From automated energy grids to touchless building entry, explore how IoT is reshaping modern architectural designs. Technology-driven space design is a major specialization of InfraVision by ITLC.",
      fullStory: [
        "Modern Grade-A corporate landmarks and high-footfall retail centers demand more than just robust physical structures—they require responsive, intelligent building organisms. INFRA VISION integrates IoT-enabled Building Management Systems (BMS) right from the civil excavation and foundation phases, embedding digital intelligence into the concrete fabric of Lucknow commercial landmarks.",
        "Circadian-Optimized Variable Refrigerant HVAC: Heating, ventilation, and air conditioning account for up to 55% of commercial operational expenditure. By pairing BACnet-compliant central chillers with ceiling-integrated infrared occupancy matrices and ambient CO2 sensors, airflow and temperature dynamically adjust room-by-room. This intelligent zoning reduces grid power consumption by up to 35% while maintaining ASHRAE-standard indoor air purity.",
        "Post-Tensioned Slab Busway Integration: Traditional commercial retrofits frequently damage slab integrity due to late conduit core-drilling. INFRA VISION engineers cast-in-place post-tensioned beam-free slabs with designated modular busways and high-speed fiber-optic chases. This allows corporate tenants to reconfigure open workstation grids, trading desks, or server clusters with zero disruption to structural ceilings.",
        "Touchless Biometric Access & Facial Turnstiles: High-security commercial zones integrate frictionless optical turnstiles synced with encrypted mobile credentials and thermal scanners. Elevator dispatching is handled through destination-control algorithms that group passengers by floor, reducing vertical travel wait times by over 40% during peak corporate morning surges.",
        "Intelligent Clean-Agent Fire Suppression: Critical IT server rooms and electrical switchgear vaults are protected by automated FM-200 waterless clean-agent systems tied to optical smoke detectors. In the event of thermal anomalies, gas discharge extinguishes localized flames within 10 seconds without depositing residue or damaging sensitive electronic hardware.",
      ],
      keyTakeaways: [
        "IoT-integrated Building Management Systems (BMS) with BACnet-compliant automation.",
        "Smart occupancy-sensing HVAC networks saving up to 35% commercial power.",
        "Touchless biometric entry access and destination-controlled vertical elevator dispatch.",
        "Concealed digital lifelines engineered within post-tensioned beam-free slabs.",
        "FM-200 waterless clean-agent fire suppression for mission-critical infrastructure.",
      ],
    },
    {
      id: 3,
      title: "The Future of Green Building Materials",
      category: "Sustainable Engineering",
      date: "7/08/2026",
      readTime: "5 MIN READ",
      author: "ITLC SUSTAINABLE RESEARCH",
      authorRole: "Lead Environmental Engineer, ITLC India",
      image: "/images/news/news_3_green_building.webp",
      excerpt:
        "Discover how recycled steel, bamboo framing, and eco-concrete are driving down carbon footprints in modern premium construction projects. InfraVision by ITLC India Private Limited is fully committed to green, environment-friendly concrete mixes.",
      fullStory: [
        "Sustainable civil engineering represents the cornerstone of 21st-century architectural legacy. At INFRA VISION, we reject the false compromise between luxury durability and environmental responsibility. Every flagship residence and commercial tower is designed to minimize embodied carbon while extending structural lifespans beyond 100 years.",
        "Low-Carbon Pozzolanic & Slag Concrete: Ordinary Portland Cement (OPC) is among the world's highest industrial carbon emitters. We replace up to 45% of clinker with Ground Granulated Blast-Furnace Slag (GGBS) and micro-fine fly ash. The resulting blended concrete achieves denser crystalline microstructure, dramatically lower heat of hydration (preventing thermal shrinkage micro-cracks), and exceptional resistance against sulfate attack.",
        "Certified High-Recycled FE-550D Rebar: Structural framing is executed using primary-grade FE-550D TMT reinforcement manufactured with over 60% scrap-recycled metallurgy. Each batch is fusion-bonded with epoxy anti-corrosive coatings, ensuring seismic Zone-III ductility and long-term tensile endurance.",
        "Thermal Envelope with AAC Blocks: Internal partitions and external non-structural envelopes utilize Autoclaved Aerated Concrete (AAC) blocks. With thermal conductivity values as low as 0.16 W/m-K (one-third that of conventional red clay bricks), our building envelopes maintain comfortable interior microclimates, reducing annual air conditioning requirements by 28%.",
        "Net-Zero Water & Energy Integration: Rooftop slabs are engineered with structural pergolas carrying bifacial monocrystalline photovoltaic arrays. Stormwater is collected via dual-chamber siltation filter pits that direct clean rainwater into sub-surface aquifers, recharging Lucknow's groundwater table by over 450,000 liters per project annually.",
      ],
      keyTakeaways: [
        "Low-carbon GGBS and fly-ash blended concrete delivering superior 100-year compressive strength.",
        "FE-550D earthquake-resistant TMT rebar with fusion-bonded anti-corrosive epoxy coating.",
        "Autoclaved Aerated Concrete (AAC) masonry cutting annual cooling energy by 28%.",
        "Bifacial solar pergolas and dual-chamber groundwater recharging systems.",
        "Engineered to achieve GRIHA 5-Star and LEED Platinum sustainability standards.",
      ],
    },
    {
      id: 4,
      title: "Smart Circadian Lighting & Acoustic Teak Engineering in Modern Villas",
      category: "Smart Architecture",
      date: "JULY 2026",
      readTime: "5 MIN READ",
      author: "Siddharth Sen",
      authorRole: "Smart Automation Lead, INFRA VISION",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Integrating automated biological lighting rhythms and sound-absorbent fluted paneling for serene luxury living.",
      fullStory: [
        "Modern luxury is increasingly measured not merely by opulence, but by biological wellness and acoustic tranquility. In the Master Sanctuary Suites designed by INFRA VISION, we integrate automated circadian lighting systems that modulate color temperature automatically throughout the 24-hour day.",
        "From crisp 5000K daylight simulation during morning hours to calming 2200K amber coves in the evening, the system supports natural melatonin production. Coupled with fluted Burmese teak acoustic wall panels engineered with concealed acoustic fleece, ambient sound reverberation is attenuated below 0.35 seconds RT60.",
      ],
      keyTakeaways: [
        "Circadian rhythm synchronization promotes deeper sleep and visual comfort.",
        "Fluted teak battens engineered with concealed sound-absorbent layers.",
        "DALI-2 protocol smart dimming integration with silent scene switches.",
      ],
    },
    {
      id: 5,
      title: "Solar Pergolas & Rainwater Harvesting: 2036 Net-Zero Home Design",
      category: "Sustainable Tech",
      date: "JUNE 2026",
      readTime: "7 MIN READ",
      author: "Er. Manasvi Gupta",
      authorRole: "Sustainability & MEP Consultant",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Combining photovoltaic architectural shading with sub-surface groundwater recharging in Lucknow estates.",
      fullStory: [
        "Sustainable architecture must merge invisibly into high aesthetic design. Rather than mounting unsightly conventional rooftop solar racks, INFRA VISION integrates bifacial monocrystalline solar panels directly into terrace pergolas and automobile carports.",
        "Coupled with deep dual-chamber sub-surface desilting rainwater recharge wells, each villa captures over 300,000 liters of monsoon precipitation annually, replenishing Lucknow's water table while cutting grid energy consumption by up to 65%.",
      ],
      keyTakeaways: [
        "Architecturally integrated bifacial solar pergolas provide both shade and clean energy.",
        "Dual-chamber desilting recharge borewells for 100% on-site rainwater harvesting.",
        "Low-emissivity glass curtain walls cutting summer thermal transfer by 42%.",
      ],
    },
  ];

  const articles = news && news.length > 0 ? news : fallbackArticles;

  const categories = [
    { id: "all", label: "All Intelligence" },
    { id: "Civil Engineering", label: "Civil Engineering" },
    { id: "Interior Architecture", label: "Interior Architecture" },
    { id: "Legal & Delivery", label: "Legal & Delivery" },
    { id: "Smart Architecture", label: "Smart Architecture" },
    { id: "Sustainable Tech", label: "Sustainable Tech" },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = articles[0];

  const handleShare = (art) => {
    soundManager.playSuccessChime();
    const shareText = `${art.title} - INFRA VISION Architectural Intelligence`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleOpenArticle = (art) => {
    soundManager.playHapticClick(600);
    setActiveArticle(art);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-14">
      {/* 1. Header matching Home NewsInsightsSection */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-[13px] text-blue-600 dark:text-sky-400 tracking-widest uppercase bg-blue-50 dark:bg-sky-500/10 px-3.5 py-1 rounded-full border border-blue-200 dark:border-sky-400/30 font-semibold inline-block shadow-sm">
          Architectural Intelligence
        </span>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">Insights</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-[12px] leading-relaxed">
          Civil engineering breakthroughs, luxury material guides, LDA bylaws, and modern construction standards from our senior architects and structural engineers.
        </p>
      </div>

      {/* 2. Spotlight Hero: Featured Article Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-slate-200/90 dark:border-sky-400/40 ring-1 ring-slate-200/50 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 group">
        <BorderBeam size={300} duration={14} colorFrom="#38BDF8" colorTo="#2563EB" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-white/40 to-transparent dark:from-[#0F224D] dark:via-[#0F224D]/40 dark:to-transparent" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600 dark:bg-sky-500/90 text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-lg">
                FEATURED INTELLIGENCE
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-[#0C1B3E]/90 backdrop-blur-md border border-slate-200 dark:border-sky-400/40 text-blue-600 dark:text-sky-300 font-mono text-[10px] font-bold">
                {featured.category}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                  <span>{featured.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                  <span>{featured.readTime}</span>
                </span>
              </div>

              <h2 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                {featured.title}
              </h2>

              <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>By {featured.author}</span>
                <span className="text-slate-400 dark:text-gray-400">({featured.authorRole})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-sky-400/20 flex items-center justify-between">
              <button
                onClick={() => handleOpenArticle(featured)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 text-white font-mono text-xs font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => handleShare(featured)}
                title="Share Article"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-sky-500/10 hover:bg-slate-200 dark:hover:bg-sky-500/25 border border-slate-200 dark:border-sky-400/30 text-slate-600 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar & Category Filter Strip */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search by topic, rebar, Calacatta, bylaws..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/35 focus:border-blue-500 dark:focus:border-sky-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-300 text-xs font-mono transition-colors outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-gray-300">
            Showing <span className="text-blue-600 dark:text-sky-400 font-bold">{filteredArticles.length}</span> Articles
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playHapticClick(700);
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30 font-bold border border-sky-400"
                  : "bg-white/90 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/25 text-slate-700 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white hover:border-blue-400 dark:hover:border-sky-400/50 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Complete Grid of Articles (With exact cards & images matching home) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredArticles.map((item, idx) => (
          <div key={item.id} className="relative group">
            <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-slate-200/90 dark:border-sky-400/35 hover:border-blue-500/60 dark:hover:border-sky-400/60 ring-1 ring-slate-200/50 dark:ring-sky-300/15 rounded-2xl overflow-hidden p-0 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85">
              <div>
                {/* Article Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-[#0C1B3E]/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 dark:border-sky-400/40 font-mono text-[10px] text-blue-600 dark:text-sky-300 font-bold shadow-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                      className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-gray-300 hover:text-white transition-colors"
                      title="Share"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-blue-600 dark:text-sky-400" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-blue-600 dark:text-sky-400" />
                      <span>{item.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0 border-t border-slate-200 dark:border-sky-400/20 mt-2">
                <div
                  onClick={() => handleOpenArticle(item)}
                  className="pt-4 flex items-center justify-between text-xs font-mono font-semibold text-blue-600 dark:text-sky-400 group-hover:text-blue-700 dark:group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>READ FULL DEEP DIVE</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3D>
          </div>
        ))}
      </div>

      {/* 5. Article Full Read Modal (Matching Screenshot & Landing Page Theme) */}
      <AnimatePresence>
        {activeArticle && (
          <div
            onClick={handleCloseModal}
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain bg-white dark:bg-[#07132C] border-2 border-blue-500/80 dark:border-sky-400/80 ring-1 ring-blue-300/40 dark:ring-sky-300/25 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl shadow-slate-900/25 dark:shadow-black/95 text-slate-900 dark:text-white my-auto"
            >
              {/* Top-Right Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:text-white backdrop-blur-md border border-slate-300 dark:border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                title="Close Article Details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* 1. Modal Top Photograph (Hero Image at the Very Top) */}
              <div className="relative aspect-[16/9] sm:aspect-[21/10] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-sky-400/30 shadow-md">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* 2. Metadata Bar (Author, Date, Category, Read Time - Matching Screenshot) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono border-b border-slate-200/80 dark:border-sky-400/20 pb-3 text-slate-600 dark:text-gray-300">
                <div className="flex items-center gap-1.5 font-bold uppercase text-slate-800 dark:text-white">
                  <span>👤</span>
                  <span>AUTHOR:</span>
                  <span className="text-blue-600 dark:text-sky-400">{activeArticle.author}</span>
                </div>
                <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
                <div className="flex items-center gap-1.5 font-bold uppercase text-slate-700 dark:text-gray-200">
                  <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                  <span>PUBLISHED:</span>
                  <span>{activeArticle.date}</span>
                </div>
                <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
                <div className="flex items-center gap-1.5 font-bold uppercase text-blue-600 dark:text-sky-400">
                  <span>🏷️</span>
                  <span>{activeArticle.category}</span>
                </div>
                <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* 3. Large Bold Display Headline */}
              <div className="space-y-3">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {activeArticle.title}
                </h2>
                {activeArticle.authorRole && (
                  <p className="text-xs font-mono text-slate-500 dark:text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    <span>Verified by {activeArticle.authorRole}</span>
                  </p>
                )}
              </div>

              {/* 4. Lead Excerpt Paragraph */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-sky-500/10 border-l-4 border-blue-600 dark:border-sky-400 text-slate-800 dark:text-slate-100 font-sans text-sm sm:text-[15px] font-medium leading-relaxed">
                {activeArticle.excerpt}
              </div>

              {/* 5. Deep-Dive Full Story (4 to 5 Min Comprehensive Technical Content) */}
              <div className="space-y-4 text-sm sm:text-[14.5px] text-slate-700 dark:text-gray-200 leading-relaxed font-sans">
                {activeArticle.fullStory?.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* 6. Key Takeaways Checklist Box */}
              {activeArticle.keyTakeaways && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#06112C] border border-blue-400/80 dark:border-sky-400/50 space-y-3 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                  <div className="font-mono text-xs text-blue-600 dark:text-sky-400 font-bold tracking-wider uppercase flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-sky-400" />
                    <span>KEY ARCHITECTURAL & COMPLIANCE TAKEAWAYS</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 dark:text-gray-200 font-sans">
                    {activeArticle.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-sky-400 mt-0.5 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 7. Bottom Consultation Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-sky-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-600 dark:text-gray-300 font-mono text-center sm:text-left">
                  Have questions about this blueprint or civil specification?
                </span>
                <button
                  onClick={() => {
                    handleCloseModal();
                    onInquiryClick();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-700 hover:to-sky-600 text-white font-mono text-xs font-semibold shadow-lg shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer"
                >
                  Consult Senior Engineer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Consultation & Newsletter Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0C1B3E] dark:to-[#091533] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl text-center space-y-4">
        <h2 className="font-display text-[26px] sm:text-[31px] font-bold text-slate-900 dark:text-white">
          Require Technical Architectural <span className="text-blue-600 dark:text-sky-400">Due Diligence</span>?
        </h2>
        <p className="text-slate-600 dark:text-gray-300 text-sm max-w-xl mx-auto font-sans">
          Our engineering desk in Golf City Lucknow analyzes soil reports, municipal setback charts, and structural cost feasibility for private plots.
        </p>
        <div className="pt-2">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold"
          >
            Schedule Architectural Consultation
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
