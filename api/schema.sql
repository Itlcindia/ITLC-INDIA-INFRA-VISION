-- =========================================================
-- INFRA VISION (by ITLC India Pvt Ltd) Production MySQL Database
-- Database: infravision_db
-- Hostinger 1-Click Import Script for phpMyAdmin
-- Compatible with Hostinger PHP 8.1 / 8.2 / 8.3 & MySQL 8 / MariaDB
-- =========================================================

CREATE DATABASE IF NOT EXISTS `infravision_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `infravision_db`;

-- 1. Table: Admin Users (Credentials)
CREATE TABLE IF NOT EXISTS `tbl_admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL DEFAULT 'contact@itlcindia.com',
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'SuperAdmin',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default SuperAdmin credentials (Passcode is cryptographically Bcrypt hashed)
INSERT INTO `tbl_admin_users` (`username`, `email`, `password_hash`, `role`)
VALUES ('admin', 'contact@itlcindia.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'SuperAdmin')
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`), `email` = VALUES(`email`);

-- 2. Table: Page Content (Home, About, Contact)
CREATE TABLE IF NOT EXISTS `tbl_pages_content` (
  `page_key` VARCHAR(50) PRIMARY KEY,
  `content_json` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_pages_content` (`page_key`, `content_json`) VALUES
('home', '{"heroTitle":"ENGINEERING TOMORROW\'S LIVING SPACES","heroTagline":"Next-Generation Luxury Villas, Turnkey Architecture & Structural Precision in Golf City, Lucknow.","heroBadge":"LUCKNOW LUXURY ARCHITECTURE // 2026","phonePrimary":"+91 95323 41000","phoneSecondary":"+91 95323 42000","whatsappNumber":"+91 95323 41000","officialEmail":"contact@itlcindia.com","corporateAddress":"Golf City, Sector B, Shaheed Path, Lucknow, Uttar Pradesh 226030","googleMapsLink":"https://maps.google.com/?q=Golf+City+Lucknow","channelYoutube":"https://youtube.com/@infravision_itlc","channelInstagram":"https://instagram.com/infravision.itlc","channelLinkedin":"https://linkedin.com/company/itlc-india","statsSqFt":"1.4M+","statsHomes":"450+","statsQuality":"Certified Grade-A","statsDefect":"0 Defect Handover"}'),
('about', '{"heading":"BUILDING THE FUTURE OF LIVING IN LUCKNOW","missionStatement":"At INFRA VISION by ITLC India Private Limited, we bridge the gap between architectural imagination and uncompromising civil durability.","foundingYear":"2012","completedVillas":"450+","onTimeRecord":"100%","qualityPledge":"Every slab, rebar cage, and marble seam is audited through ultrasonic sensors and daily digital logs.","founderQuote":"We don\'t simply construct walls; we sculpt enduring spaces where families thrive and legacy lives."}'),
('contact', '{"heading":"CONNECT WITH INFRA VISION HEADQUARTERS","subheading":"Schedule a confidential architectural consultation or request an on-site structural audit at Golf City, Lucknow.","visitingHours":"Monday – Saturday: 9:30 AM – 7:30 PM | Sunday: By VIP Appointment","directHotline":"+91 95323 41000","whatsappHotline":"+91 95323 41000","emailDesk":"contact@itlcindia.com","officeAddress":"INFRA VISION HQ, Sector B, Golf City, Shaheed Path, Lucknow, UP 226030"}')
ON DUPLICATE KEY UPDATE `content_json` = VALUES(`content_json`);

-- 3. Table: Services
CREATE TABLE IF NOT EXISTS `tbl_services` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `tagline` TEXT,
  `badge` VARCHAR(100),
  `paragraph` TEXT,
  `specs_json` TEXT,
  `image_url` LONGTEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_services` (`id`, `title`, `tagline`, `badge`, `paragraph`, `specs_json`, `image_url`) VALUES
('residential', 'Residential Construction', 'Turnkey luxury villas and bespoke residential estates engineered from foundation to key handover.', '10-Year Bonded Warranty', 'Custom luxury villas, estates, and eco-friendly smart homes engineered for modern comfort, energy efficiency, and premium longevity.', '[\"FE-550D TMT rebar + M-25 Grade concrete casting\",\"LDA / Municipal approval & sanction assistance\",\"Laser-guided soil leveling & reinforced raft foundation\",\"10-year bonded waterproofing and structural guarantee\"]', '/images/services/card_residential.jpg'),
('commercial', 'Commercial Construction', 'Grade-A corporate business landmarks, retail complexes, and high-load institutional spaces.', 'Grade-A Structural Standard', 'High-performance office complexes, retail centers, and industrial facilities planned with scalable layouts and robust building physics.', '[\"Post-tensioned beam-free slabs for vast column-free spans\",\"Acoustic double-glazed facade & thermal curtain walls\",\"Integrated MEP with automated HVAC & fire suppression\",\"IS-456 & IS-1893 seismic compliance audits with cube tests\"]', '/images/services/card_commercial.jpg'),
('renovation', 'Renovation & Remodeling', 'Surgical structural retrofitting, historic facade restorations, and luxury spatial overhauls.', 'Seismic Retrofitting', 'Transform existing buildings into architectural masterpieces with modern engineering, optimized spaces, and energy-efficient retrofits.', '[\"Micro-concrete column jacketing & carbon-fiber wrapping\",\"Non-destructive ultrasonic pulse velocity integrity testing\",\"Acoustic floor insulation and concealed piping overhauls\",\"Zero disruption dust-containment protocol during fit-outs\"]', '/images/services/card_renovation.jpg'),
('planning', 'Architectural Planning & BIM', '3D virtual reality flythroughs, structural CAD blueprints, and algorithmic sun-path modeling.', 'BIM Level 3 Certified', 'Comprehensive architectural blueprints, computational layout analysis, and 4D BIM simulations for flawless site coordination.', '[\"LDA Master Plan compliant setback & zoning calculations\",\"Photorealistic daylight harvesting & shadow-path simulations\",\"Revit / ArchiCAD coordinated MEP clash-detection models\",\"Structural load distribution sheets signed by certified engineers\"]', '/images/services/card_planning.webp')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`);

-- 4. Table: Projects
CREATE TABLE IF NOT EXISTS `tbl_projects` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'villa',
  `carpet_area` VARCHAR(100) NOT NULL,
  `status` VARCHAR(100) NOT NULL DEFAULT 'Completed',
  `location` VARCHAR(255) NOT NULL,
  `image_day` LONGTEXT NOT NULL,
  `image_night` LONGTEXT,
  `description` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_projects` (`title`, `category`, `carpet_area`, `status`, `location`, `image_day`, `image_night`, `description`) VALUES
('Modern Duplex Residence', 'villa', '4,800 Sq.Ft', 'Completed', 'Lucknow', '/images/projects/abhijeet_sinha_residence.jpg', '/images/projects/abhijeet_sinha_residence.jpg', 'A contemporary multi-storey luxury residence featuring cantilevered balconies, natural teak soffits, recessed warm architectural lighting, and landscaped perimeter fencing.'),
('Premium Colonial Residence', 'villa', '7,500 Sq.Ft', 'Completed', 'Lucknow', '/images/projects/neoclassical_royal_villa.jpg', '/images/projects/neoclassical_royal_villa.jpg', 'An elegant multi-storey residence inspired by colonial architecture, featuring grand columns, luxurious balconies, and sophisticated design elements.'),
('Contemporary Geometric Villa', 'villa', '5,200 Sq.Ft', 'Completed', 'Lucknow', '/images/projects/modern_portal_villa_front.jpg', '/images/projects/modern_portal_villa_angle.jpg', 'A signature contemporary residence featuring dual-tone architectural portals, custom CNC jali screens, glass balustrades, and a private rooftop entertainment deck.'),
('Modern Stilt Residence', 'apartment', '6,200 Sq.Ft', 'Completed', 'Lucknow', '/images/projects/stilt_luxury_residence_357.jpg', '/images/projects/stilt_luxury_residence_357.jpg', 'A multistory luxury apartment residence featuring double stilt parking, exterior warm wood cladding, vertical architectural illumination bands, and modern terrace parapet.'),
('Prime Commercial Landmark', 'turnkey', '11,500 Sq.Ft', 'Completed', 'Lucknow', '/images/projects/commercial_retail_showroom.jpg', '/images/projects/commercial_retail_front.jpg', 'A prime commercial retail landmark featuring double-height frameless glass showroom glazing, exterior timber accents, and rooftop terrace lounge.'),
('Classic Turret Residence', 'villa', '4,500 Sq.Ft', 'Under Construction', 'Lucknow', '/images/projects/contemporary_turret_villa_123.jpg', '/images/projects/contemporary_turret_villa_123.jpg', 'A Mediterranean-inspired contemporary residence featuring a pitched slate turret roof, vertical amber glass stairwell shaft, decorative boundary wall, and integrated portico.'),
('Classic Dual-Tone Villa', 'villa', '5,800 Sq.Ft', 'Completed', 'Lucknow', '/images/projects/modern_portal_villa_angle.jpg', '/images/projects/modern_portal_villa_front.jpg', 'A corner-plot luxury estate designed for expansive panoramic views, wraparound cantilevered balconies, vertical timber louvers, and landscaped garden setbacks.');

-- 5. Table: Interior Spaces
CREATE TABLE IF NOT EXISTS `tbl_interior` (
  `id` VARCHAR(100) PRIMARY KEY,
  `number` VARCHAR(20),
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `image_url` LONGTEXT NOT NULL,
  `paragraph` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_interior` (`id`, `number`, `title`, `category`, `image_url`, `paragraph`) VALUES
('living-room', '01', 'LUXURY LIVING ROOM', 'Living Suite', '/images/interior/living_room.jpg', 'A double-height living salon framed by bookmatched Italian marble accents, bespoke low-profile seating, warm acoustic ceiling battens, and recessed cove lighting.'),
('modular-kitchen', '02', 'MODULAR KITCHEN STUDIO', 'Culinary Suite', '/images/interior/modular_kitchen.jpg', 'Monolithic quartz waterfall island integrated with smart induction, soft-close acrylic cabinetry, concealed pantry storage, and designer warm accent fixtures.'),
('master-bedroom', '03', 'MASTER BEDROOM SANCTUARY', 'Private Suite', '/images/interior/master_bedroom.jpg', 'A serene master sanctuary anchored by backlit natural teak wall battens, plush upholstered headboard, circadian lighting, and custom dressing vanity.'),
('dining-room', '04', 'BESPOKE DINING PAVILION', 'Dining Suite', '/images/interior/dining_room.jpg', 'Formal dining space blending smoked quartz dining surface, ergonomic velvet dining chairs, sculptural pendant lighting, and seamless exterior glass connection.'),
('foyer-pooja', '05', 'ENTRANCE FOYER & MANDIR', 'Foyer Suite', '/images/interior/foyer_pooja.jpg', 'Grand arrival foyer featuring laser-cut geometric brass partitions, serene dedicated pooja alcove, backlit alabaster niche, and integrated storage credenza.'),
('luxury-bathroom', '06', 'SPA WELLNESS BATHROOM', 'Wellness Suite', '/images/interior/luxury_bathroom.jpg', 'A wellness retreat clad in large-format porcelain stone tiling, freestanding soaking tub, concealed German thermostatic fittings, and frameless glass shower enclosure.'),
('family-lounge', '07', 'EXECUTIVE FAMILY LOUNGE', 'Lounge Suite', '/images/interior/family_lounge.jpg', 'Private upstairs lounge engineered with acoustic fluted paneling, bespoke media console, integrated book library, and plush modular sectional seating.'),
('staircase-lobby', '08', 'DUPLEX STAIRCASE LOBBY', 'Architectural Lobby', '/images/interior/staircase_lobby.jpg', 'Cantilevered floating timber tread staircase paired with structural glass balustrades, recessed riser LED illumination, and vertical architectural atrium volume.'),
('balcony-terrace', '09', 'SKYLINE TERRACE DECK', 'Terrace Suite', '/images/interior/balcony_terrace.jpg', 'Weather-resistant teak deck featuring contemporary outdoor lounge seating, biophilic vertical garden wall, ambient low-voltage illumination, and city skyline vistas.')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`);

-- 6. Table: Team
CREATE TABLE IF NOT EXISTS `tbl_team` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `experience` VARCHAR(100),
  `credentials` VARCHAR(255),
  `bio` TEXT,
  `photo_url` LONGTEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_team` (`name`, `role`, `experience`, `credentials`, `bio`, `photo_url`) VALUES
('Er. Vivek Mehrotra', 'Chief Structural Engineer & Founder', '18+ Years', 'M.Tech Civil (IIT Roorkee), IS-456 Auditor', 'Pioneering luxury raft foundations, seismic Zone-III structural calculations, and turnkey contracting benchmarks across Uttar Pradesh.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'),
('Ar. Shreya Nambiar', 'Principal Architectural Director', '14+ Years', 'B.Arch (SPA Delhi), LEED AP Certified', 'Specializing in bioclimatic villa elevations, cantilevered slabs, double-height glazing, and seamless indoor-outdoor sanctuaries.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'),
('Er. Ankit Srivastava', 'Head of Project Logistics & Site Safety', '12+ Years', 'B.Tech Civil, OSHA Certified Site Auditor', 'Supervising multi-crane rigging, daily slump cube testing, and zero-compromise timeline coordination at active high-rise builds.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop');

-- 7. Table: Site Images
CREATE TABLE IF NOT EXISTS `tbl_site_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `src` LONGTEXT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `stage` VARCHAR(100) NOT NULL,
  `stage_label` VARCHAR(150),
  `tag` VARCHAR(100),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_site_images` (`src`, `title`, `stage`, `stage_label`, `tag`) VALUES
('/images/site/img_6a747267bb4ef2.54998377.webp', 'Column Shuttering & Casting on Foundation', 'foundation', 'Foundation & Columns', 'SITE SUPERVISION'),
('/images/site/img_6a74726a871fc7.99468710.webp', 'Ground Floor Red Brick Masonry & Lintel Bands', 'masonry', 'Brick Masonry', 'SITE SUPERVISION'),
('/images/site/img_6a74726d5b0d67.23364176.webp', 'Structural Team & Client Joint Walkthrough', 'supervision', 'Site Supervision', 'EXPERT SITE VISIT'),
('/images/site/img_6a74726ef39384.39079974.webp', 'Interior Masonry & Structural Layout Review', 'supervision', 'Site Supervision', 'SITE CONSULTATION'),
('/images/site/img_6a74727116b7f4.89964579.webp', 'Multi-Tier Commercial Complex Framing', 'finishing', 'Multi-Story & Finishing', 'EXPERT SITE VISIT'),
('/images/site/img_6a747273a77268.59601493.webp', 'Roof Slab Shuttering & Timber Prop Alignment', 'rcc', 'RCC Slab & Shuttering', 'SLAB INSPECTION'),
('/images/site/img_6a74727619d761.76827409.webp', 'External Plastering & Elevation Detail Execution', 'finishing', 'Multi-Story & Finishing', 'PLASTER & FINISHING'),
('/images/site/img_6a7472bf4478b8.67351463.webp', 'Heavy TMT Rebar Binding for Raft Foundation', 'foundation', 'Foundation & Columns', 'REBAR INSPECTION'),
('/images/site/img_6a7472ed34d679.24001538.webp', 'Double-Height Cantilever Beam Formwork', 'rcc', 'RCC Slab & Shuttering', 'FORMWORK AUDIT'),
('/images/site/img_6a7472ee223009.79125061.webp', 'First Floor Brick Wall Laying with Mortar Leveling', 'masonry', 'Brick Masonry', 'MASONRY AUDIT'),
('/images/site/img_6a7472ef38ff26.88550411.webp', 'Site Engineering Inspection & Blueprint Review', 'supervision', 'Site Supervision', 'BLUEPRINT AUDIT'),
('/images/site/img_6a7472f08fb470.59801387.webp', 'Concrete Slump Test & Cube Sampling on Site', 'rcc', 'RCC Slab & Shuttering', 'CONCRETE QUALITY TEST'),
('/images/site/img_6a7472f229ea20.17441479.webp', 'Structural Steel Truss & Alignment Inspection', 'finishing', 'Structural Framing & Steel', 'STEEL INSPECTION'),
('/images/site/img_6a7472f2af5254.87236074.webp', 'Final Plinth Level Concrete Curing Audit', 'foundation', 'Foundation & Plinth', 'CURING AUDIT');

-- 8. Table: Site 4K Construction Videos
CREATE TABLE IF NOT EXISTS `tbl_site_videos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `src` LONGTEXT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `stage` VARCHAR(100) NOT NULL,
  `stage_label` VARCHAR(150),
  `tag` VARCHAR(100),
  `duration` VARCHAR(50),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_site_videos` (`src`, `title`, `stage`, `stage_label`, `tag`, `duration`) VALUES
('/videos/construction_timelapse.mp4', 'Ground Foundation to Plinth Beam Timelapse', 'foundation', 'Foundation & Columns', 'SITE TIMELAPSE', '1:24'),
('/videos/hero_construction_smooth.mp4', 'RCC Roof Slab Casting & Pump Placement', 'rcc', 'RCC & Slab Formwork', 'SLAB CASTING 4K', '2:10'),
('/videos/hero_construction_raw.mp4', 'Red Brick Masonry & Lintel Band Inspection', 'masonry', 'Brick Masonry', 'SITE INSPECTION', '0:58'),
('/videos/hero_construction_intra.mp4', 'Chief Structural Engineer Site Walkthrough', 'supervision', 'Site Supervision', 'EXPERT SITE VISIT', '1:45'),
('/videos/hero_construction_scrub.mp4', 'Multi-Tier Villa Exterior Facade Finishing', 'finishing', 'Finishing & Handover', 'VILLA DRONE TOUR', '3:05'),
('/videos/construction_timelapse.mp4', 'Heavy RCC Column Vibration & Curing Audit', 'foundation', 'Foundation & Columns', 'COLUMN CASTING', '1:12');

-- 9. Table: Drone 4K Villa Gallery
CREATE TABLE IF NOT EXISTS `tbl_drone_gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `src` LONGTEXT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `tag` VARCHAR(100),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_drone_gallery` (`src`, `title`, `tag`) VALUES
('/images/drone/villa_completed_exterior.jpg', 'Completed Luxury Villa Exterior Panorama', 'DRONE 4K TOUR'),
('/images/drone/gate_open.jpg', 'Grand Automatic Arrival Portal & Driveway', 'VILLA ENTRY'),
('/images/drone/living_kitchen.jpg', 'Double-Height Living & Italian Marble Kitchen', 'INTERIOR SUITE'),
('/images/drone/master_bedroom.jpg', 'Master Bedroom with Private Cantilever Balcony', 'PRIVATE SUITE'),
('/images/drone/spa_washroom.jpg', 'Freestanding Soaking Tub & Wellness Suite', 'SPA RETREAT');

-- 10. Table: Inquiries Leads
CREATE TABLE IF NOT EXISTS `tbl_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `project_type` VARCHAR(100) NOT NULL,
  `budget` VARCHAR(100) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `status` ENUM('new', 'contacted', 'converted') DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Table: Password Resets (Secure OTP Engine)
CREATE TABLE IF NOT EXISTS `tbl_password_resets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL,
  `otp_hash` VARCHAR(255) NOT NULL,
  `attempts` INT NOT NULL DEFAULT 0,
  `expires_at` DATETIME NOT NULL,
  `is_used` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_email_used` (`email`, `is_used`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Table: Rate Limiting & Brute Force Lockout Shield
CREATE TABLE IF NOT EXISTS `tbl_login_attempts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ip_address` VARCHAR(45) NOT NULL,
  `attempts` INT NOT NULL DEFAULT 1,
  `last_attempt` DATETIME NOT NULL,
  `locked_until` DATETIME DEFAULT NULL,
  UNIQUE KEY `idx_ip` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Table: Active Administrative Sessions (256-bit Token Tracking)
CREATE TABLE IF NOT EXISTS `tbl_sessions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `token_hash` VARCHAR(64) NOT NULL UNIQUE,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_token_hash` (`token_hash`),
  INDEX `idx_expires` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Complete.
