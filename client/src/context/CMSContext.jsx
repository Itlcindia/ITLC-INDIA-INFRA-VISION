import React, { createContext, useContext, useState, useEffect } from "react";
import { soundManager } from "../lib/sound";
import { initialProjects } from "../components/home/ProjectGallery";
import { allInteriorSpaces } from "../components/home/InteriorExcellence";
import {
  hashAdminPassword,
  verifyAdminPassword,
  encryptPayload,
  decryptPayload,
} from "../lib/crypto";

const CMSContext = createContext(null);

// Default Home Content
const defaultHomeContent = {
  heroTitle: "ENGINEERING TOMORROW'S LIVING SPACES",
  heroTagline: "Next-Generation Luxury Villas, Turnkey Architecture & Structural Precision in Golf City, Lucknow.",
  heroBadge: "LUCKNOW LUXURY ARCHITECTURE // 2026",
  phonePrimary: "+91 95323 41000",
  phoneSecondary: "+91 95323 42000",
  whatsappNumber: "+91 95323 41000",
  officialEmail: "contact@itlcindia.com",
  corporateAddress: "Golf City, Sector B, Shaheed Path, Lucknow, Uttar Pradesh 226030",
  googleMapsLink: "https://maps.google.com/?q=Golf+City+Lucknow",
  channelYoutube: "https://youtube.com/@infravision_itlc",
  channelInstagram: "https://instagram.com/infravision.itlc",
  channelLinkedin: "https://linkedin.com/company/itlc-india",
  statsSqFt: "1.4M+",
  statsHomes: "450+",
  statsQuality: "Certified Grade-A",
  statsDefect: "0 Defect Handover",
};

// Default Services
const defaultServices = [
  {
    id: "residential",
    title: "Residential Construction",
    tagline: "Turnkey luxury villas and bespoke residential estates engineered from foundation to key handover.",
    badge: "Certified Structural Bond",
    paragraph: "Custom luxury villas, estates, and eco-friendly smart homes engineered for modern comfort, energy efficiency, and premium longevity.",
    specs: [
      "FE-550D TMT rebar + M-25 Grade concrete casting",
      "LDA / Municipal approval & sanction assistance",
      "Laser-guided soil leveling & reinforced raft foundation",
      "Comprehensive waterproofing and structural engineering assurance",
    ],
    image: "/images/services/card_residential.jpg",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    tagline: "Grade-A corporate business landmarks, retail complexes, and high-load institutional spaces.",
    badge: "Grade-A Structural Standard",
    paragraph: "High-performance office complexes, retail centers, and industrial facilities planned with scalable layouts and robust building physics.",
    specs: [
      "Post-tensioned beam-free slabs for vast column-free spans",
      "Acoustic double-glazed facade & thermal curtain walls",
      "Integrated MEP with automated HVAC & fire suppression",
      "IS-456 & IS-1893 seismic compliance audits with cube tests",
    ],
    image: "/images/services/card_commercial.jpg",
  },
  {
    id: "renovation",
    title: "Renovation & Remodeling",
    tagline: "Surgical structural retrofitting, historic facade restorations, and luxury spatial overhauls.",
    badge: "Seismic Retrofitting",
    paragraph: "Transform existing buildings into architectural masterpieces with modern engineering, optimized spaces, and energy-efficient retrofits.",
    specs: [
      "Micro-concrete column jacketing & carbon-fiber wrapping",
      "Non-destructive ultrasonic pulse velocity integrity testing",
      "Acoustic floor insulation and concealed piping overhauls",
      "Zero disruption dust-containment protocol during fit-outs",
    ],
    image: "/images/services/card_renovation.jpg",
  },
  {
    id: "planning",
    title: "Architectural Planning & BIM",
    tagline: "3D virtual reality flythroughs, structural CAD blueprints, and algorithmic sun-path modeling.",
    badge: "BIM Level 3 Certified",
    paragraph: "Comprehensive architectural blueprints, computational layout analysis, and 4D BIM simulations for flawless site coordination.",
    specs: [
      "LDA Master Plan compliant setback & zoning calculations",
      "Photorealistic daylight harvesting & shadow-path simulations",
      "Revit / ArchiCAD coordinated MEP clash-detection models",
      "Structural load distribution sheets signed by certified engineers",
    ],
    image: "/images/services/card_planning.webp",
  },
];

// Default Team Members
const defaultTeam = [
  {
    id: 1,
    name: "Er. Vivek Mehrotra",
    role: "Chief Structural Engineer & Founder",
    experience: "18+ Years",
    credentials: "M.Tech Civil (IIT Roorkee), IS-456 Auditor",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    bio: "Pioneering luxury raft foundations, seismic Zone-III structural calculations, and turnkey contracting benchmarks across Uttar Pradesh.",
  },
  {
    id: 2,
    name: "Ar. Shreya Nambiar",
    role: "Principal Architectural Director",
    experience: "14+ Years",
    credentials: "B.Arch (SPA Delhi), LEED AP Certified",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    bio: "Specializing in bioclimatic villa elevations, cantilevered slabs, double-height glazing, and seamless indoor-outdoor sanctuaries.",
  },
  {
    id: 3,
    name: "Er. Ankit Srivastava",
    role: "Head of Project Logistics & Site Safety",
    experience: "12+ Years",
    credentials: "B.Tech Civil, OSHA Certified Site Auditor",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    bio: "Supervising multi-crane rigging, daily slump cube testing, and zero-compromise timeline coordination at active high-rise builds.",
  },
];

// Default About Content
const defaultAboutContent = {
  heading: "BUILDING THE FUTURE OF LIVING IN LUCKNOW",
  missionStatement: "At INFRA VISION by ITLC India Private Limited, we bridge the gap between architectural imagination and uncompromising civil durability.",
  foundingYear: "2012",
  completedVillas: "450+",
  onTimeRecord: "100%",
  qualityPledge: "Every slab, rebar cage, and marble seam is audited through ultrasonic sensors and daily digital logs.",
  founderQuote: "We don't simply construct walls; we sculpt enduring spaces where families thrive and legacy lives.",
};

// Default Contact Content
const defaultContactContent = {
  heading: "CONNECT WITH INFRA VISION HEADQUARTERS",
  subheading: "Schedule a confidential architectural consultation or request an on-site structural audit at Golf City, Lucknow.",
  visitingHours: "Monday – Saturday: 9:30 AM – 7:30 PM | Sunday: By VIP Appointment",
  directHotline: "+91 95323 41000",
  whatsappHotline: "+91 95323 41000",
  emailDesk: "contact@itlcindia.com",
  officeAddress: "INFRA VISION HQ, Sector B, Golf City, Shaheed Path, Lucknow, UP 226030",
};

// Default Site Images
const defaultSiteImages = [
  {
    id: 1,
    src: "/images/site/img_6a747267bb4ef2.54998377.webp",
    title: "Column Shuttering & Casting on Foundation",
    stage: "foundation",
    stageLabel: "Foundation & Columns",
    tag: "SITE SUPERVISION",
  },
  {
    id: 2,
    src: "/images/site/img_6a74726a871fc7.99468710.webp",
    title: "Ground Floor Red Brick Masonry & Lintel Bands",
    stage: "masonry",
    stageLabel: "Brick Masonry",
    tag: "SITE SUPERVISION",
  },
  {
    id: 3,
    src: "/images/site/img_6a74726d5b0d67.23364176.webp",
    title: "Structural Team & Client Joint Walkthrough",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "EXPERT SITE VISIT",
  },
  {
    id: 4,
    src: "/images/site/img_6a74726ef39384.39079974.webp",
    title: "Interior Masonry & Structural Layout Review",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "SITE CONSULTATION",
  },
  {
    id: 5,
    src: "/images/site/img_6a74727116b7f4.89964579.webp",
    title: "Multi-Tier Commercial Complex Framing",
    stage: "finishing",
    stageLabel: "Multi-Story & Finishing",
    tag: "EXPERT SITE VISIT",
  },
  {
    id: 6,
    src: "/images/site/img_6a747273a77268.59601493.webp",
    title: "Roof Slab Shuttering & Timber Prop Alignment",
    stage: "rcc",
    stageLabel: "RCC Slab & Shuttering",
    tag: "SLAB INSPECTION",
  },
  {
    id: 7,
    src: "/images/site/img_6a74727619d761.76827409.webp",
    title: "External Plastering & Elevation Detail Execution",
    stage: "finishing",
    stageLabel: "Multi-Story & Finishing",
    tag: "PLASTER & FINISHING",
  },
  {
    id: 8,
    src: "/images/site/img_6a7472bf4478b8.67351463.webp",
    title: "Heavy TMT Rebar Binding for Raft Foundation",
    stage: "foundation",
    stageLabel: "Foundation & Columns",
    tag: "REBAR INSPECTION",
  },
  {
    id: 9,
    src: "/images/site/img_6a7472ed34d679.24001538.webp",
    title: "Double-Height Cantilever Beam Formwork",
    stage: "rcc",
    stageLabel: "RCC Slab & Shuttering",
    tag: "FORMWORK AUDIT",
  },
  {
    id: 10,
    src: "/images/site/img_6a7472ee223009.79125061.webp",
    title: "First Floor Brick Wall Laying with Mortar Leveling",
    stage: "masonry",
    stageLabel: "Brick Masonry",
    tag: "MASONRY AUDIT",
  },
  {
    id: 11,
    src: "/images/site/img_6a7472ef38ff26.88550411.webp",
    title: "Site Engineering Inspection & Blueprint Review",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "BLUEPRINT AUDIT",
  },
  {
    id: 12,
    src: "/images/site/img_6a7472f08fb470.59801387.webp",
    title: "Concrete Slump Test & Cube Sampling on Site",
    stage: "rcc",
    stageLabel: "RCC Slab & Shuttering",
    tag: "CONCRETE QUALITY TEST",
  },
];

// Default 4K On-Site Construction Videos
const defaultSiteVideos = [
  {
    id: 1,
    src: "/videos/construction_timelapse.mp4",
    title: "Ground Foundation to Plinth Beam Timelapse",
    stage: "foundation",
    stageLabel: "Foundation & Columns",
    tag: "SITE TIMELAPSE",
    duration: "1:24",
  },
  {
    id: 2,
    src: "/videos/hero_construction_smooth.mp4",
    title: "RCC Roof Slab Casting & Pump Placement",
    stage: "rcc",
    stageLabel: "RCC & Slab Formwork",
    tag: "SLAB CASTING 4K",
    duration: "2:10",
  },
  {
    id: 3,
    src: "/videos/hero_construction_raw.mp4",
    title: "Red Brick Masonry & Lintel Band Inspection",
    stage: "masonry",
    stageLabel: "Brick Masonry",
    tag: "SITE INSPECTION",
    duration: "0:58",
  },
  {
    id: 4,
    src: "/videos/hero_construction_intra.mp4",
    title: "Chief Structural Engineer Site Walkthrough",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "EXPERT SITE VISIT",
    duration: "1:45",
  },
  {
    id: 5,
    src: "/videos/hero_construction_scrub.mp4",
    title: "Multi-Tier Villa Exterior Facade Finishing",
    stage: "finishing",
    stageLabel: "Finishing & Handover",
    tag: "VILLA DRONE TOUR",
    duration: "3:05",
  },
  {
    id: 6,
    src: "/videos/construction_timelapse.mp4",
    title: "Heavy RCC Column Vibration & Curing Audit",
    stage: "foundation",
    stageLabel: "Foundation & Columns",
    tag: "COLUMN CASTING",
    duration: "1:12",
  },
];

// Default News Articles with 5-minute read detail
const defaultNews = [
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
      "Zero-Incident Scaffold Certification: In accordance with IS-2750 and OSHA 1926 standards, all modular cuplock and ringlock scaffolding systems undergo daily mechanical torque verification. Scaffold platforms must feature triple-tier toe boards, flame-retardant debris catchment netting, and color-coded physical tagging (Green: Cleared for Full Load; Red: Out of Service).",
      "Fall-Arrest & Dual-Lanyard Anchoring: For any work performed above 2.0 meters, 100% tie-off compliance is enforced using ANSI-certified full-body harnesses paired with shock-absorbing dual lanyards. Static lifelines engineered from 16mm high-tensile galvanized steel cables are anchored to verified structural column rebars.",
      "Aerial Telemetry & Digital Safety Audits: Every active construction zone in Golf City and greater Lucknow is monitored with automated safety drones that map site logistics twice daily. Real-time footage is cross-referenced by our digital command desk to identify micro-infractions before they can develop into site hazards.",
    ],
    keyTakeaways: [
      "100% OSHA and Indian Standards (IS-456 / IS-2750) site safety compliance.",
      "Daily torque verification and triple-tag clearance for all modular scaffolding.",
      "Automated tower crane anemometer cutoffs triggered at 38 km/h wind speeds.",
      "Twice-daily aerial drone safety inspections cross-referenced with digital logs.",
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
      "Modern Grade-A corporate landmarks and high-footfall retail centers demand more than just robust physical structures—they require responsive, intelligent building organisms. INFRA VISION integrates IoT-enabled Building Management Systems (BMS) right from the civil excavation and foundation phases.",
      "Circadian-Optimized Variable Refrigerant HVAC: By pairing BACnet-compliant central chillers with ceiling-integrated infrared occupancy matrices and ambient CO2 sensors, airflow and temperature dynamically adjust room-by-room. This intelligent zoning reduces grid power consumption by up to 35%.",
      "Post-Tensioned Slab Busway Integration: INFRA VISION engineers cast-in-place post-tensioned beam-free slabs with designated modular busways and high-speed fiber-optic chases, allowing corporate tenants to reconfigure grids with zero structural disruption.",
    ],
    keyTakeaways: [
      "IoT-integrated Building Management Systems (BMS) with BACnet-compliant automation.",
      "Smart occupancy-sensing HVAC networks saving up to 35% commercial power.",
      "Touchless biometric entry access and destination-controlled vertical elevator dispatch.",
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
      "Sustainable civil engineering represents the cornerstone of 21st-century architectural legacy. At INFRA VISION, we reject the false compromise between luxury durability and environmental responsibility.",
      "Low-Carbon Pozzolanic & Slag Concrete: We replace up to 45% of clinker with Ground Granulated Blast-Furnace Slag (GGBS) and micro-fine fly ash, achieving denser crystalline microstructure and superior resistance against sulfate attack.",
      "Certified High-Recycled FE-550D Rebar: Structural framing is executed using primary-grade FE-550D TMT reinforcement manufactured with over 60% scrap-recycled metallurgy and epoxy anti-corrosive coatings.",
    ],
    keyTakeaways: [
      "Low-carbon GGBS and fly-ash blended concrete delivering superior 100-year compressive strength.",
      "FE-550D earthquake-resistant TMT rebar with fusion-bonded anti-corrosive epoxy coating.",
      "Autoclaved Aerated Concrete (AAC) masonry cutting annual cooling energy by 28%.",
    ],
  },
];

// Default Brand Partners
export const defaultBrandPartners = [
  {
    id: "tata",
    name: "TATA Steel",
    category: "Primary Infrastructure Rebar",
    logo: "",
    preset: "tata",
  },
  {
    id: "jsw",
    name: "JSW Steel",
    category: "Structural TMT Bar Metallurgy",
    logo: "",
    preset: "jsw",
  },
  {
    id: "kajaria",
    name: "Kajaria",
    category: "Luxury Floor & Vitrified Ceramics",
    logo: "",
    preset: "kajaria",
  },
  {
    id: "jcb",
    name: "JCB Earthmoving",
    category: "Heavy Foundation Excavation Fleet",
    logo: "",
    preset: "jcb",
  },
  {
    id: "ultratech",
    name: "UltraTech Cement",
    category: "High-Grade Engineered Concrete",
    logo: "",
    preset: "ultratech",
  },
];

// Initial Seeded Audit Logs
const initialAuditLogs = [
  {
    id: "log_init_1",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    action: "SYSTEM_INITIALIZED",
    category: "SYSTEM",
    details: "InfraVision CMS Security Engine & Cryptographic Shield Activated",
    user: "system",
    status: "SUCCESS",
  },
  {
    id: "log_init_2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    action: "ENCRYPTION_ENABLED",
    category: "SECURITY",
    details: "Salted SHA-256 and AES-Hex encryption enabled for database & leads",
    user: "admin",
    status: "SUCCESS",
  },
  {
    id: "log_init_3",
    timestamp: new Date().toISOString(),
    action: "ADMIN_PORTAL_ACTIVE",
    category: "AUTH",
    details: "Admin Control Center loaded with Brute-Force Rate Limiting Active",
    user: "admin",
    status: "SUCCESS",
  },
];

export const CMSProvider = ({ children }) => {
  // Admin Session State
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Security Credentials State (Encrypted with Salted SHA-256 and AES-Hex Payload Engine)
  const [credentials, setCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_credentials");
      if (saved) {
        const decrypted = typeof saved === "string" && saved.startsWith("ENC::")
          ? decryptPayload(saved)
          : JSON.parse(saved);
        if (decrypted) {
          const passHash = decrypted.passwordHash || (decrypted.password && decrypted.password !== "••••••••" ? hashAdminPassword(decrypted.password) : "");
          return {
            username: decrypted.username || "admin",
            email: decrypted.email || "contact@itlcindia.com",
            passwordHash: passHash,
            password: "••••••••",
          };
        }
      }
      return {
        username: "admin",
        email: "contact@itlcindia.com",
        passwordHash: "",
        password: "••••••••",
      };
    } catch {
      return {
        username: "admin",
        email: "contact@itlcindia.com",
        passwordHash: "",
        password: "••••••••",
      };
    }
  });

  // Home Content State
  const [homeContent, setHomeContent] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_home_content");
      return saved ? JSON.parse(saved) : defaultHomeContent;
    } catch {
      return defaultHomeContent;
    }
  });

  // Services State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_services");
      if (saved) {
        const cleaned = saved
          .replace(/10-Year Bonded Warranty/g, "Certified Structural Bond")
          .replace(/10-Year Warranty/g, "Certified Structural Bond")
          .replace(/10-year bonded waterproofing and structural guarantee/g, "Comprehensive waterproofing and structural engineering assurance")
          .replace(/warranty/gi, "structural assurance");
        return JSON.parse(cleaned);
      }
      return defaultServices;
    } catch {
      return defaultServices;
    }
  });

  // Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  // Interior Spaces State
  const [interior, setInterior] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_interior");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return allInteriorSpaces;
    } catch {
      return allInteriorSpaces;
    }
  });

  // Team State
  const [team, setTeam] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_team");
      return saved ? JSON.parse(saved) : defaultTeam;
    } catch {
      return defaultTeam;
    }
  });

  // About Content State
  const [aboutContent, setAboutContent] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_about_content");
      return saved ? JSON.parse(saved) : defaultAboutContent;
    } catch {
      return defaultAboutContent;
    }
  });

  // Contact Content State
  const [contactContent, setContactContent] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_contact_content");
      return saved ? JSON.parse(saved) : defaultContactContent;
    } catch {
      return defaultContactContent;
    }
  });

  // Site Images State
  const [siteImages, setSiteImages] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_site_images");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return defaultSiteImages;
    } catch {
      return defaultSiteImages;
    }
  });

  // News & Blogs State
  const [news, setNews] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_news");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return defaultNews;
    } catch {
      return defaultNews;
    }
  });

  // Site Videos State
  const [siteVideos, setSiteVideos] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_site_videos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return defaultSiteVideos;
    } catch {
      return defaultSiteVideos;
    }
  });

  // Client Inquiries / Leads State (Encrypted with AES-Hex Payload Engine)
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_inquiries");
      if (saved) {
        const decrypted = typeof saved === "string" && saved.startsWith("ENC::")
          ? decryptPayload(saved)
          : JSON.parse(saved);
        if (Array.isArray(decrypted)) return decrypted;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Brand Partners State (Strategic Partnerships on Home Page)
  const [brandPartners, setBrandPartners] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_brand_partners");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return defaultBrandPartners;
    } catch {
      return defaultBrandPartners;
    }
  });

  // Audit Logs State (Enterprise Security & Activity Tracker)
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem("infravision_audit_logs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialAuditLogs;
    } catch {
      return initialAuditLogs;
    }
  });

  // Two-Way Sync Engine: writes to Hostinger MySQL database via REST API
  const syncToBackend = (pageKey, data) => {
    try {
      const token = localStorage.getItem("itlc_admin_token");
      fetch("/api/content.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ page_key: pageKey, content_data: data }),
      }).catch(() => {});
    } catch {}
  };

  // Initial Background Hydration from Hostinger MySQL Database
  useEffect(() => {
    fetch("/api/content.php?page=all")
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res && res.status === "success" && res.data) {
          const d = res.data;
          if (d.home) setHomeContent(d.home);
          if (d.services && Array.isArray(d.services)) setServices(d.services);
          if (d.projects && Array.isArray(d.projects)) setProjects(d.projects);
          if (d.interior && Array.isArray(d.interior)) setInterior(d.interior);
          if (d.team && Array.isArray(d.team)) setTeam(d.team);
          if (d.about) setAboutContent(d.about);
          if (d.contact) setContactContent(d.contact);
          if (d.siteImages && Array.isArray(d.siteImages)) setSiteImages(d.siteImages);
          if (d.siteVideos && Array.isArray(d.siteVideos)) setSiteVideos(d.siteVideos);
          if (d.news && Array.isArray(d.news)) setNews(d.news);
          if (d.brandPartners && Array.isArray(d.brandPartners)) setBrandPartners(d.brandPartners);
          if (d.inquiries && Array.isArray(d.inquiries)) setInquiries(d.inquiries);
        }
      })
      .catch(() => {});
  }, []);

  // Auto-persist to localStorage & MySQL Database
  useEffect(() => {
    try {
      localStorage.setItem("infravision_credentials", encryptPayload(credentials));
    } catch {}
  }, [credentials]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_home_content", JSON.stringify(homeContent));
      syncToBackend("home", homeContent);
    } catch {}
  }, [homeContent]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_services", JSON.stringify(services));
      syncToBackend("services", services);
    } catch {}
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_projects", JSON.stringify(projects));
      syncToBackend("projects", projects);
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_interior", JSON.stringify(interior));
      syncToBackend("interior", interior);
    } catch {}
  }, [interior]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_team", JSON.stringify(team));
      syncToBackend("team", team);
    } catch {}
  }, [team]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_about_content", JSON.stringify(aboutContent));
      syncToBackend("about", aboutContent);
    } catch {}
  }, [aboutContent]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_contact_content", JSON.stringify(contactContent));
      syncToBackend("contact", contactContent);
    } catch {}
  }, [contactContent]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_site_images", JSON.stringify(siteImages));
      syncToBackend("siteImages", siteImages);
    } catch {}
  }, [siteImages]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_news", JSON.stringify(news));
      syncToBackend("news", news);
    } catch {}
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_site_videos", JSON.stringify(siteVideos));
      syncToBackend("siteVideos", siteVideos);
    } catch {}
  }, [siteVideos]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_inquiries", encryptPayload(inquiries));
      syncToBackend("inquiries", inquiries);
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_brand_partners", JSON.stringify(brandPartners));
      syncToBackend("brandPartners", brandPartners);
    } catch {}
  }, [brandPartners]);

  useEffect(() => {
    try {
      localStorage.setItem("infravision_audit_logs", JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  // Real-Time Cross-Tab Inquiries / Leads Sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "infravision_inquiries" && e.newValue) {
        try {
          const decrypted = typeof e.newValue === "string" && e.newValue.startsWith("ENC::")
            ? decryptPayload(e.newValue)
            : JSON.parse(e.newValue);
          if (Array.isArray(decrypted)) {
            setInquiries(decrypted);
          }
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem("infravision_admin_user", JSON.stringify(adminUser));
      } else {
        localStorage.removeItem("infravision_admin_user");
      }
    } catch {}
  }, [adminUser]);

  // Central Audit Activity Dispatcher
  const logActivity = (action, category, details, status = "SUCCESS") => {
    const entry = {
      id: "log_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      action,
      category,
      details,
      user: adminUser?.username || "admin",
      status, // "SUCCESS", "WARNING", "ALERT"
    };
    setAuditLogs((prev) => [entry, ...(Array.isArray(prev) ? prev.slice(0, 199) : [])]);
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
    try {
      localStorage.removeItem("infravision_audit_logs");
    } catch {}
  };

  const exportAuditLogsCSV = () => {
    if (!auditLogs || auditLogs.length === 0) return;
    const headers = ["Timestamp", "Action", "Category", "User", "Status", "Details"];
    const rows = auditLogs.map((l) => [
      `"${new Date(l.timestamp).toLocaleString()}"`,
      `"${l.action}"`,
      `"${l.category}"`,
      `"${l.user}"`,
      `"${l.status}"`,
      `"${(l.details || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `INFRA_VISION_AUDIT_LOG_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Brand Partners CRUD Operations
  const addBrandPartner = (data) => {
    const newPartner = {
      id: "partner_" + Date.now(),
      name: data.name || "Brand Partner",
      category: data.category || "Strategic Material Supplier",
      logo: data.logo || "",
      preset: data.preset || "",
    };
    setBrandPartners((prev) => [...prev, newPartner]);
    logActivity("PARTNER_ADDED", "CONTENT", `Added brand partner "${newPartner.name}"`);
    soundManager?.playSuccessChime?.();
    return newPartner;
  };

  const updateBrandPartner = (id, data) => {
    setBrandPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    logActivity("PARTNER_UPDATED", "CONTENT", `Updated brand partner "${data.name || id}"`);
    soundManager?.playSuccessChime?.();
  };

  const deleteBrandPartner = (id) => {
    const found = brandPartners.find((p) => p.id === id);
    setBrandPartners((prev) => prev.filter((p) => p.id !== id));
    logActivity("PARTNER_DELETED", "CONTENT", `Deleted brand partner "${found?.name || id}"`, "WARNING");
    soundManager?.playHapticClick?.(450, 0.05);
  };

  // Auth Functions with Multi-Tier Cryptographic Verification
  const login = async (usernameInput, passwordInput) => {
    // 1. Primary: Verify against Hostinger MySQL Backend Auth API
    try {
      const resp = await fetch("/api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          username: usernameInput,
          password: passwordInput,
        }),
      });
      const data = await resp.json();

      if (resp.ok && data.status === "success" && data.user) {
        const session = {
          username: data.user.username,
          role: data.user.role || "SuperAdmin",
          token: data.user.token,
          email: data.user.email || "contact@itlcindia.com",
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("itlc_admin_token", data.user.token);
        setAdminUser(session);
        logActivity("ADMIN_LOGIN", "AUTH", `Administrator "${usernameInput}" authenticated successfully via API`, "SUCCESS");
        soundManager?.playSuccessChime?.();
        return { success: true };
      } else {
        logActivity("LOGIN_FAILED", "AUTH", `Authentication rejected for "${usernameInput}"`, "WARNING");
        return { success: false, error: data.message || "Invalid username or passcode. Please check credentials." };
      }
    } catch {
      // 2. Offline fallback: Verify against local salted SHA hash (NO hardcoded passwords)
      const validUsername = (credentials.username || "admin").toLowerCase();
      const isPassValid = credentials.passwordHash && verifyAdminPassword(passwordInput, credentials.passwordHash);

      if (usernameInput.toLowerCase() === validUsername && isPassValid) {
        const session = {
          username: usernameInput,
          loginTime: new Date().toISOString(),
          role: "Principal SuperAdmin",
          token: "local_session_" + Date.now(),
        };
        localStorage.setItem("itlc_admin_token", session.token);
        setAdminUser(session);
        logActivity("ADMIN_LOGIN", "AUTH", `Administrator "${usernameInput}" authenticated locally`, "SUCCESS");
        soundManager?.playSuccessChime?.();
        return { success: true };
      }
      logActivity("LOGIN_FAILED", "AUTH", `Invalid passcode attempt for username "${usernameInput}"`, "WARNING");
      return { success: false, error: "Invalid username or passcode. Please check credentials." };
    }
  };

  const logout = () => {
    const u = adminUser?.username || "admin";
    const token = localStorage.getItem("itlc_admin_token");
    try {
      fetch("/api/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ action: "logout" }),
      }).catch(() => {});
    } catch {}

    localStorage.removeItem("itlc_admin_token");
    setAdminUser(null);
    logActivity("ADMIN_LOGOUT", "AUTH", `Administrator "${u}" signed out of Control Center`, "SUCCESS");
    soundManager?.playHapticClick?.(600);
  };

  const updateCredentials = async (newUsername, newPassword, newEmail) => {
    const newHash = (!newPassword || newPassword === "••••••••" || newPassword === credentials.passwordHash)
      ? credentials.passwordHash
      : hashAdminPassword(newPassword);

    const emailToSet = (newEmail || credentials.email || "contact@itlcindia.com").trim();
    setCredentials({
      username: newUsername || "admin",
      email: emailToSet,
      passwordHash: newHash,
      password: "••••••••",
      updatedAt: new Date().toISOString(),
    });

    const token = localStorage.getItem("itlc_admin_token");
    try {
      await fetch("/api/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "update_credentials",
          new_username: newUsername,
          new_password: newPassword,
          new_email: emailToSet,
        }),
      });
    } catch {}

    logActivity("CREDENTIALS_UPDATED", "SECURITY", `Admin credentials updated for "${newUsername}"`, "SUCCESS");
    soundManager?.playSuccessChime?.();
    return true;
  };

  // OTP Password Recovery Engine (Zero plain OTP exposure)
  const [activeOTPSession, setActiveOTPSession] = useState(null);

  const requestPasswordResetOTP = async (inputEmail) => {
    const trimmed = (inputEmail || "").trim().toLowerCase();
    
    try {
      const resp = await fetch("/api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_otp", email: trimmed }),
      });
      const data = await resp.json();
      if (resp.ok && data.status === "success") {
        logActivity("OTP_REQUESTED", "SECURITY", `Recovery OTP requested for email "${trimmed}"`, "WARNING");
        return {
          success: true,
          message: data.message || `If this email is registered, a 6-digit verification code has been dispatched.`,
        };
      }
      return { success: false, error: data.message || "Failed to request OTP code." };
    } catch {
      return {
        success: true,
        message: `If this email is registered, a 6-digit verification code has been dispatched.`,
      };
    }
  };

  const verifyOTPAndResetPassword = async (inputEmail, inputOTP, newPassword) => {
    const trimmed = (inputEmail || "").trim().toLowerCase();

    try {
      const resp = await fetch("/api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_otp_and_reset",
          email: trimmed,
          otp: inputOTP.trim(),
          new_password: newPassword,
        }),
      });
      const data = await resp.json();

      if (resp.ok && data.status === "success") {
        const newHash = hashAdminPassword(newPassword);
        setCredentials((prev) => ({
          ...prev,
          passwordHash: newHash,
          password: "••••••••",
          updatedAt: new Date().toISOString(),
        }));
        logActivity("PASSWORD_RESET_SUCCESS", "SECURITY", `Passcode reset completed via verified OTP`, "SUCCESS");
        soundManager?.playSuccessChime?.();
        return { success: true, message: data.message };
      }
      return { success: false, error: data.message || "Invalid or expired OTP code." };
    } catch {
      return { success: false, error: "Unable to connect to verification server. Please verify MySQL service." };
    }
  };

  // Image Processing: compress from device gallery to WebP Base64 data URL
  const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No file provided"));
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 1920;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const optimizedDataUrl = canvas.toDataURL("image/webp", 0.88);
          resolve(optimizedDataUrl);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // CRUD Operations
  // Services
  const addService = (newService) => setServices((prev) => [...prev, newService]);
  const updateService = (updated) => setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  const deleteService = (id) => setServices((prev) => prev.filter((s) => s.id !== id));

  // Projects
  const addProject = (newProj) => setProjects((prev) => [newProj, ...prev]);
  const updateProject = (updated) => setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  const deleteProject = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));

  // Interior
  const addInteriorSpace = (item) => setInterior((prev) => [...prev, item]);
  const updateInteriorSpace = (updated) => setInterior((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  const deleteInteriorSpace = (id) => setInterior((prev) => prev.filter((i) => i.id !== id));

  // Team
  const addTeamMember = (member) => setTeam((prev) => [...prev, member]);
  const updateTeamMember = (updated) => setTeam((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  const deleteTeamMember = (id) => setTeam((prev) => prev.filter((m) => m.id !== id));

  // Site Images
  const addSiteImage = (item) => setSiteImages((prev) => [item, ...prev]);
  const updateSiteImage = (updated) => setSiteImages((prev) => prev.map((img) => (img.id === updated.id ? updated : img)));
  const deleteSiteImage = (id) => setSiteImages((prev) => prev.filter((img) => img.id !== id));

  // News Articles
  const addNewsArticle = (article) => setNews((prev) => [article, ...prev]);
  const updateNewsArticle = (updated) => setNews((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  const deleteNewsArticle = (id) => setNews((prev) => prev.filter((a) => a.id !== id));

  // Site Videos
  const addSiteVideo = (video) => setSiteVideos((prev) => [video, ...prev]);
  const updateSiteVideo = (updated) => setSiteVideos((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  const deleteSiteVideo = (id) => setSiteVideos((prev) => prev.filter((v) => v.id !== id));

  // Client Inquiries / Leads
  const unreadInquiriesCount = inquiries.filter((inq) => inq.status === "unread").length;

  const addInquiry = (data) => {
    const newInquiry = {
      id: "inq_" + Date.now(),
      name: data.name || "Prospective Client",
      phone: data.phone || "Not Provided",
      email: data.email || "Not Provided",
      type: data.type || "General Inquiry",
      service: data.service || data.projectType || "Architecture & Construction",
      budget: data.budget || "Standard Scope",
      message: data.message || "Requesting consultation and project details.",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "unread",
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    logActivity("LEAD_RECEIVED", "LEADS", `New lead received from ${newInquiry.name} (${newInquiry.phone})`, "SUCCESS");
    soundManager?.playSuccessChime?.();
    return newInquiry;
  };

  const markInquiriesAsRead = () => {
    setInquiries((prev) => prev.map((inq) => ({ ...inq, status: "read" })));
    logActivity("LEADS_MARKED_READ", "LEADS", "All pending client leads marked as read", "SUCCESS");
  };

  const deleteInquiry = (id) => {
    const found = inquiries.find((inq) => inq.id === id);
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    logActivity("LEAD_DELETED", "LEADS", `Client lead from ${found?.name || id} deleted`, "WARNING");
  };

  const toggleInquiryStatus = (id) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const newStatus = inq.status === "unread" ? "read" : "unread";
          logActivity(
            "LEAD_STATUS_CHANGED",
            "LEADS",
            `Inquiry from ${inq.name} marked as ${newStatus}`,
            "SUCCESS"
          );
          return { ...inq, status: newStatus };
        }
        return inq;
      })
    );
  };

  const exportInquiriesCSV = () => {
    if (!inquiries || inquiries.length === 0) return;
    const headers = ["ID", "Received Date", "Status", "Client Name", "Phone", "Email", "Channel / Type", "Service", "Message / Notes"];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.date || ''}"`,
      `"${(inq.status || 'unread').toUpperCase()}"`,
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${(inq.type || '').replace(/"/g, '""')}"`,
      `"${(inq.service || inq.projectType || '').replace(/"/g, '""')}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `infravision_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    logActivity("LEADS_EXPORTED_CSV", "LEADS", `Exported ${inquiries.length} client leads to CSV`, "SUCCESS");
  };

  // 1-Click Database SQL Exporter for MySQL phpMyAdmin
  const exportDatabaseSQL = () => {
    const sql = `-- =========================================================
-- INFRA VISION (by ITLC India Pvt Ltd) Production MySQL Database
-- Database: infravision_db
-- Generated: ${new Date().toISOString()}
-- Compatible with PHP 8.1 / 8.2 / 8.3 & MySQL 8 / MariaDB
-- =========================================================

CREATE DATABASE IF NOT EXISTS \`infravision_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`infravision_db\`;

-- 1. Table: Admin Users (Cryptographically Hashed)
DROP TABLE IF EXISTS \`tbl_admin_users\`;
CREATE TABLE \`tbl_admin_users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(100) NOT NULL UNIQUE,
  \`email\` VARCHAR(150) NOT NULL DEFAULT 'contact@itlcindia.com',
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(50) DEFAULT 'SuperAdmin',
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`tbl_admin_users\` (\`username\`, \`email\`, \`password_hash\`, \`role\`)
VALUES ('${(credentials.username || "admin").replace(/'/g, "''")}', '${(credentials.email || "contact@itlcindia.com").replace(/'/g, "''")}', '${(credentials.passwordHash || "$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa").replace(/'/g, "''")}', 'SuperAdmin');

-- 2. Table: Page Content (Home, About, Contact)
DROP TABLE IF EXISTS \`tbl_pages_content\`;
CREATE TABLE \`tbl_pages_content\` (
  \`page_key\` VARCHAR(50) PRIMARY KEY,
  \`content_json\` LONGTEXT NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`tbl_pages_content\` (\`page_key\`, \`content_json\`) VALUES
('home', '${JSON.stringify(homeContent).replace(/'/g, "''")}'),
('about', '${JSON.stringify(aboutContent).replace(/'/g, "''")}'),
('contact', '${JSON.stringify(contactContent).replace(/'/g, "''")}');

-- 3. Table: Services
DROP TABLE IF EXISTS \`tbl_services\`;
CREATE TABLE \`tbl_services\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`tagline\` TEXT,
  \`badge\` VARCHAR(100),
  \`paragraph\` TEXT,
  \`specs_json\` TEXT,
  \`image_url\` LONGTEXT,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${services
  .map(
    (s) =>
      `INSERT INTO \`tbl_services\` (\`id\`, \`title\`, \`tagline\`, \`badge\`, \`paragraph\`, \`specs_json\`, \`image_url\`) VALUES ('${s.id}', '${s.title.replace(/'/g, "''")}', '${(s.tagline || "").replace(/'/g, "''")}', '${(s.badge || "").replace(/'/g, "''")}', '${(s.paragraph || "").replace(/'/g, "''")}', '${JSON.stringify(s.specs || []).replace(/'/g, "''")}', '${s.image.replace(/'/g, "''")}');`
  )
  .join("\n")}

-- 4. Table: Projects
DROP TABLE IF EXISTS \`tbl_projects\`;
CREATE TABLE \`tbl_projects\` (
  \`id\` BIGINT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL DEFAULT 'villa',
  \`carpet_area\` VARCHAR(100) NOT NULL,
  \`status\` VARCHAR(100) NOT NULL DEFAULT 'Completed',
  \`location\` VARCHAR(255) NOT NULL,
  \`image_day\` LONGTEXT NOT NULL,
  \`image_night\` LONGTEXT,
  \`description\` TEXT,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${projects
  .map(
    (p) =>
      `INSERT INTO \`tbl_projects\` (\`title\`, \`category\`, \`carpet_area\`, \`status\`, \`location\`, \`image_day\`, \`image_night\`, \`description\`) VALUES ('${p.title.replace(/'/g, "''")}', '${p.category}', '${p.carpetArea}', '${p.status}', '${p.location.replace(/'/g, "''")}', '${(p.imageDay || "").replace(/'/g, "''")}', '${(p.imageNight || "").replace(/'/g, "''")}', '${(p.description || "").replace(/'/g, "''")}');`
  )
  .join("\n")}

-- 5. Table: Interior Spaces
DROP TABLE IF EXISTS \`tbl_interior\`;
CREATE TABLE \`tbl_interior\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`number\` VARCHAR(20),
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`image_url\` LONGTEXT NOT NULL,
  \`paragraph\` TEXT,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${interior
  .map(
    (it) =>
      `INSERT INTO \`tbl_interior\` (\`id\`, \`number\`, \`title\`, \`category\`, \`image_url\`, \`paragraph\`) VALUES ('${it.id}', '${it.number || ""}', '${it.title.replace(/'/g, "''")}', '${it.category.replace(/'/g, "''")}', '${it.image.replace(/'/g, "''")}', '${(it.paragraph || "").replace(/'/g, "''")}');`
  )
  .join("\n")}

-- 6. Table: Team
DROP TABLE IF EXISTS \`tbl_team\`;
CREATE TABLE \`tbl_team\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(255) NOT NULL,
  \`experience\` VARCHAR(100),
  \`credentials\` VARCHAR(255),
  \`bio\` TEXT,
  \`photo_url\` LONGTEXT,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${team
  .map(
    (m) =>
      `INSERT INTO \`tbl_team\` (\`name\`, \`role\`, \`experience\`, \`credentials\`, \`bio\`, \`photo_url\`) VALUES ('${m.name.replace(/'/g, "''")}', '${m.role.replace(/'/g, "''")}', '${m.experience || ""}', '${(m.credentials || "").replace(/'/g, "''")}', '${(m.bio || "").replace(/'/g, "''")}', '${m.photo.replace(/'/g, "''")}');`
  )
  .join("\n")}

-- 7. Table: Site Images
DROP TABLE IF EXISTS \`tbl_site_images\`;
CREATE TABLE \`tbl_site_images\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`src\` LONGTEXT NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`stage\` VARCHAR(100) NOT NULL,
  \`stage_label\` VARCHAR(150),
  \`tag\` VARCHAR(100),
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${siteImages
  .map(
    (si) =>
      `INSERT INTO \`tbl_site_images\` (\`src\`, \`title\`, \`stage\`, \`stage_label\`, \`tag\`) VALUES ('${si.src.replace(/'/g, "''")}', '${si.title.replace(/'/g, "''")}', '${si.stage}', '${si.stageLabel || ""}', '${si.tag || ""}');`
  )
  .join("\n")}

-- 8. Table: News & Insights
DROP TABLE IF EXISTS \`tbl_news\`;
CREATE TABLE \`tbl_news\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`date\` VARCHAR(50),
  \`read_time\` VARCHAR(50),
  \`author\` VARCHAR(150),
  \`author_role\` VARCHAR(150),
  \`image_url\` LONGTEXT NOT NULL,
  \`excerpt\` TEXT,
  \`full_story_json\` LONGTEXT,
  \`key_takeaways_json\` TEXT,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${news
  .map(
    (n) =>
      `INSERT INTO \`tbl_news\` (\`title\`, \`category\`, \`date\`, \`read_time\`, \`author\`, \`author_role\`, \`image_url\`, \`excerpt\`, \`full_story_json\`, \`key_takeaways_json\`) VALUES ('${n.title.replace(/'/g, "''")}', '${n.category.replace(/'/g, "''")}', '${n.date || ""}', '${n.readTime || ""}', '${(n.author || "").replace(/'/g, "''")}', '${(n.authorRole || "").replace(/'/g, "''")}', '${n.image.replace(/'/g, "''")}', '${(n.excerpt || "").replace(/'/g, "''")}', '${JSON.stringify(n.fullStory || []).replace(/'/g, "''")}', '${JSON.stringify(n.keyTakeaways || []).replace(/'/g, "''")}');`
  )
  .join("\n")}

-- 9. Table: Site 4K Videos
DROP TABLE IF EXISTS \`tbl_site_videos\`;
CREATE TABLE \`tbl_site_videos\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`src\` LONGTEXT NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`stage\` VARCHAR(100) NOT NULL,
  \`stage_label\` VARCHAR(150),
  \`tag\` VARCHAR(100),
  \`duration\` VARCHAR(50),
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${siteVideos
  .map(
    (sv) =>
      `INSERT INTO \`tbl_site_videos\` (\`src\`, \`title\`, \`stage\`, \`stage_label\`, \`tag\`, \`duration\`) VALUES ('${sv.src.replace(/'/g, "''")}', '${sv.title.replace(/'/g, "''")}', '${sv.stage}', '${sv.stageLabel || ""}', '${sv.tag || ""}', '${sv.duration || ""}');`
  )
  .join("\n")}

-- 10. Table: Inquiries Leads (Client Leads & Consultations)
DROP TABLE IF EXISTS \`tbl_inquiries\`;
CREATE TABLE \`tbl_inquiries\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`client_name\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(25) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`project_type\` VARCHAR(100) NOT NULL,
  \`budget\` VARCHAR(100) NOT NULL,
  \`message\` TEXT DEFAULT NULL,
  \`status\` ENUM('unread', 'read', 'contacted') DEFAULT 'unread',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${inquiries
  .map(
    (inq) =>
      `INSERT INTO \`tbl_inquiries\` (\`client_name\`, \`phone\`, \`email\`, \`project_type\`, \`budget\`, \`message\`, \`status\`) VALUES ('${(inq.name || "").replace(/'/g, "''")}', '${(inq.phone || "").replace(/'/g, "''")}', '${(inq.email || "").replace(/'/g, "''")}', '${(inq.service || inq.type || "").replace(/'/g, "''")}', '${(inq.budget || "").replace(/'/g, "''")}', '${(inq.message || "").replace(/'/g, "''")}', '${inq.status || "unread"}');`
  )
  .join("\n")}

-- 11. Table: Password Resets (Secure OTP Engine)
DROP TABLE IF EXISTS \`tbl_password_resets\`;
CREATE TABLE \`tbl_password_resets\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`email\` VARCHAR(150) NOT NULL,
  \`otp_hash\` VARCHAR(255) NOT NULL,
  \`expires_at\` DATETIME NOT NULL,
  \`is_used\` TINYINT(1) DEFAULT 0,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Table: Brand Partners (Strategic Collaborations)
DROP TABLE IF EXISTS \`tbl_brand_partners\`;
CREATE TABLE \`tbl_brand_partners\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`category\` VARCHAR(200) NOT NULL,
  \`logo_url\` LONGTEXT,
  \`preset\` VARCHAR(50) DEFAULT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${brandPartners
  .map(
    (bp) =>
      `INSERT INTO \`tbl_brand_partners\` (\`id\`, \`name\`, \`category\`, \`logo_url\`, \`preset\`) VALUES ('${bp.id}', '${bp.name.replace(/'/g, "''")}', '${bp.category.replace(/'/g, "''")}', '${(bp.logo || "").replace(/'/g, "''")}', '${bp.preset || ""}');`
  )
  .join("\n")}

-- 13. Table: Audit Activity Logs (Enterprise Surveillance)
DROP TABLE IF EXISTS \`tbl_audit_logs\`;
CREATE TABLE \`tbl_audit_logs\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`action\` VARCHAR(100) NOT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`details\` TEXT NOT NULL,
  \`user\` VARCHAR(100) NOT NULL,
  \`status\` VARCHAR(25) NOT NULL DEFAULT 'SUCCESS',
  \`timestamp\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${auditLogs
  .map(
    (al) =>
      `INSERT INTO \`tbl_audit_logs\` (\`id\`, \`action\`, \`category\`, \`details\`, \`user\`, \`status\`, \`timestamp\`) VALUES ('${al.id}', '${al.action}', '${al.category}', '${(al.details || "").replace(/'/g, "''")}', '${al.user || "admin"}', '${al.status || "SUCCESS"}', '${new Date(al.timestamp).toISOString().slice(0, 19).replace('T', ' ')}');`
  )
  .join("\n")}

-- 14. Table: Rate Limiting & Brute Force Defense
DROP TABLE IF EXISTS \`tbl_login_attempts\`;
CREATE TABLE \`tbl_login_attempts\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`ip_address\` VARCHAR(45) NOT NULL,
  \`attempts\` INT NOT NULL DEFAULT 1,
  \`last_attempt\` DATETIME NOT NULL,
  \`locked_until\` DATETIME DEFAULT NULL,
  UNIQUE KEY \`idx_ip\` (\`ip_address\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ready for Production MySQL Deployment.
`;

    const blob = new Blob([sql], { type: "application/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `INFRA_VISION_DATABASE_BACKUP_${new Date().toISOString().slice(0, 10)}.sql`;
    a.click();
    soundManager.playSuccessChime();
  };

  return (
    <CMSContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        credentials,
        login,
        logout,
        updateCredentials,
        requestPasswordResetOTP,
        verifyOTPAndResetPassword,
        homeContent,
        setHomeContent,
        brandPartners,
        setBrandPartners,
        addBrandPartner,
        updateBrandPartner,
        deleteBrandPartner,
        auditLogs,
        setAuditLogs,
        logActivity,
        clearAuditLogs,
        exportAuditLogsCSV,
        services,
        setServices,
        addService,
        updateService,
        deleteService,
        projects,
        setProjects,
        addProject,
        updateProject,
        deleteProject,
        interior,
        setInterior,
        addInteriorSpace,
        updateInteriorSpace,
        deleteInteriorSpace,
        team,
        setTeam,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        aboutContent,
        setAboutContent,
        contactContent,
        setContactContent,
        siteImages,
        setSiteImages,
        addSiteImage,
        updateSiteImage,
        deleteSiteImage,
        siteVideos,
        setSiteVideos,
        addSiteVideo,
        updateSiteVideo,
        deleteSiteVideo,
        inquiries,
        setInquiries,
        addInquiry,
        markInquiriesAsRead,
        deleteInquiry,
        toggleInquiryStatus,
        exportInquiriesCSV,
        unreadInquiriesCount,
        news,
        setNews,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        processImageFile,
        exportDatabaseSQL,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return ctx;
};
