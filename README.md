<div align="center">

# 🏛️ INFRA VISION
### Luxury Architecture, Turnkey Civil Engineering & Digital CMS Platform
**Engineering Tomorrow's Living Spaces | Golf City, Lucknow**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PHP](https://img.shields.io/badge/PHP-8.1+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Security](https://img.shields.io/badge/Security-Argon2id%20%7C%20OWASP%20Hardened-emerald?style=for-the-badge&logo=shield)](https://owasp.org/)

---

### 👨‍💻 Created & Engineered by:
# **Pankaj**
**Lead Full-Stack Architect & Core Software Engineer**
*Architected and engineered the end-to-end design, reactive frontend systems, secure REST APIs, and database architecture.*

---

</div>

## 📌 Executive Overview

**INFRA VISION** is a state-of-the-art enterprise digital platform developed for luxury architectural estates, turnkey civil engineering projects, and high-precision construction management by **ITLC India Private Limited**.

Built with a performance-first mindset, the platform bridges the gap between ultra-luxury architectural aesthetics and modern civil engineering durability. It features real-time 4K video frame scrubbing, interactive architectural floorplan modeling, bespoke interior suites, and an enterprise administrative control center with real-time MySQL database synchronization.

---

## 🌟 Key Highlights & Capabilities

### 🎨 1. High-Performance Architectural UI/UX
- **Kinetic 4K Video Scrubber:** Frame-accurate interactive construction progress scrubber driven by user scroll velocity and time-lapse playback.
- **Lenis Inertial Smooth Scroll:** Butter-smooth physics-based viewport inertia for optimal presentation of luxury estates.
- **Dual Architectural Theme Engine:** Seamless dark/light luxury theme toggle with persistent state and custom ambient illumination accents.
- **Deep-Linking & Instant Navigation:** Client-side SPA routing with intelligent scroll restoration, route protection, and instant navigation.

### 🏢 2. Dynamic Content Management (Admin Control Center)
- **Centralized CMS Engine:** Edit hero headlines, contact details, partner networks, services, architectural blueprints, and news updates in real time.
- **Leads & Inquiries Workspace:** Centralized client CRM dashboard with unread counters, search filters, one-click WhatsApp/Call dispatch, status tracking, and CSV lead export.
- **Two-Way Background Database Sync:** Background hydration and synchronization connecting the React frontend directly with the Hostinger MySQL database.

### 🛡️ 3. Enterprise-Grade Security Architecture
- **Argon2id & Bcrypt Cryptographic Hashing:** Military-grade password encryption protecting administrative credentials.
- **Server-Side IP Rate Limiting & Brute-Force Shield:** Automatic 15-minute server lockout triggered after 5 failed authentication attempts.
- **Cryptographically Secure Session Tokens:** 256-bit entropy random session tokens stored and verified through MySQL `tbl_sessions` with auto-expiration.
- **Air-Tight API Authorization:** Strict Bearer Token verification on CMS content updates (`api/content.php`) and media uploads (`api/upload.php`) to prevent unauthenticated access (OWASP Top 10 Broken Access Control mitigation).
- **Hardened Media Upload Pipeline:** Server-side MIME validation, `getimagesize()` deep integrity verification, 10MB limits, randomized hash naming, and `.htaccess` script execution prevention.
- **Confidential OTP Engine:** Cryptographically secure 6-digit random OTP generation with zero payload exposure in API responses.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite (Fast HMR & Optimized Production Bundles) |
| **Styling & Design** | Tailwind CSS 3.4, Custom Glassmorphism, CSS Variable Palettes |
| **Motion & Physics** | Framer Motion, Lenis Smooth Scroll, Lucide React Icons |
| **Backend Architecture** | PHP 8.1+ REST APIs with PDO Database Layer |
| **Database Engine** | MySQL 8.0 / MariaDB with InnoDB Engines (`utf8mb4_unicode_ci`) |
| **Web Server Environment** | Apache / LiteSpeed (Hostinger / cPanel Ready with `.htaccess` SPA routing) |

---

## 📁 Repository Structure

```text
ITLC Construction/
├── api/                                # Hardened PHP Backend & Database Layer
│   ├── auth.php                        # Admin Auth, Rate Limiter, Argon2id, Session Engine
│   ├── content.php                     # CMS Content REST API (Protected Write Access)
│   ├── db.php                          # PDO Connection, CORS & Central Token Middleware
│   ├── upload.php                      # Secure Media Upload Engine (WebP Conversion)
│   ├── schema.sql                      # Complete MySQL 8 Database Schema & Seeds
│   └── uploads/                        # Permanent Upload Directory (.htaccess Protected)
│
├── client/                             # React + Vite Frontend Application
│   ├── public/                         # Public Static Assets
│   │   ├── images/                     # WebP & High-Res Optimized Architectural Images
│   │   │   ├── drone/                  # 4K Villa Drone Tour Panoramas
│   │   │   ├── interior/               # Bespoke Interior Spaces
│   │   │   ├── methodology/            # Civil Construction Methodology
│   │   │   ├── news/                   # Architectural Insights & News
│   │   │   ├── projects/               # Day/Night Landmark Projects
│   │   │   ├── services/               # Residential, Commercial, Renovation Cards
│   │   │   └── site/                   # On-Site Inspection & Foundation Photos
│   │   ├── videos/                     # 4K Construction Timelapse & Smooth Videos
│   │   ├── .htaccess                   # Apache SPA Routing & Security Header Rules
│   │   ├── robots.txt                  # Search Engine Crawling Directives
│   │   └── sitemap.xml                 # Canonical XML Sitemap
│   ├── src/                            # Application Source Code
│   │   ├── components/                 # Modular UI Components (Navbar, Footer, Modals)
│   │   ├── context/                    # CMSContext (Two-Way Sync), ThemeContext
│   │   ├── lib/                        # Crypto Helpers & Sound Managers
│   │   ├── pages/                      # Landing Pages (Services, Projects, Admin, Contact)
│   │   ├── App.jsx                     # Core Route Dispatcher & Smooth Scroller
│   │   └── main.jsx                    # React Virtual DOM Entry
│   ├── package.json                    # Dependencies & Scripts
│   ├── tailwind.config.js              # Custom Design Tokens & Color Schemes
│   └── vite.config.js                  # Vite Compiler Configuration
│
├── scripts/                            # DevOps & Packaging Utilities
│   ├── create_deploy_zip.ps1           # 1-Click Hostinger Public_HTML Package Builder
│   ├── create_production_zip.ps1       # Master Clean Archive Generator
│   ├── check_assets.ps1                # Asset Audit Verification Script
│   └── cleanup_root.ps1                # Safe Workspace Sanitizer
│
├── .gitignore                          # Clean Version Control Exclusions
└── README.md                           # Project Documentation
```

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/itlc-construction.git
cd itlc-construction
```

### 2. Frontend Setup
Navigate into the `client` directory and install dependencies:
```bash
cd client
npm install
npm run dev
```
The application will launch locally at `http://localhost:5173`.

### 3. Database Initialization
1. Start your local MySQL server (XAMPP / WampServer / Docker).
2. Create a new database named `infravision_db`.
3. Import the file located at [`api/schema.sql`](api/schema.sql) into phpMyAdmin or via terminal:
   ```bash
   mysql -u root -p infravision_db < api/schema.sql
   ```

### 4. Production Build
To create a production-optimized build of the client application:
```bash
cd client
npm run build
```
This generates minified, tree-shaken static assets in `client/dist/`.

---

## 🌐 Production Deployment (Hostinger / cPanel)

1. **Upload Frontend & Backend:**
   - Upload the pre-compiled distribution files (`client/dist/*`) directly into the `public_html/` root folder.
   - Place the `api/` directory inside `public_html/api/`.
2. **Database Import:**
   - In Hostinger hPanel or cPanel, open **phpMyAdmin** and import `api/schema.sql`.
3. **Database Credentials:**
   - Open `api/db.php` on the server and update your database credentials:
     ```php
     $db_host = 'localhost';
     $db_name = 'your_database_name';
     $db_user = 'your_database_user';
     $db_pass = 'your_strong_database_password';
     ```
4. **SPA Rewrite Verification:**
   - Ensure the included `.htaccess` file is present in `public_html/` so that client-side routes (like `/projects`, `/services`, `/contact`) route smoothly without 404 errors.

---

## 🔒 Security Compliance

This codebase has undergone rigorous security hardening following OWASP Top 10 standards:
- **CWE-287 (Improper Authentication):** Mitigated via server-side session tokens, Argon2id/Bcrypt hashing, and lockout shields.
- **CWE-284 (Improper Access Control):** Protected with strict bearer token middleware on all administrative endpoints.
- **CWE-434 (Unrestricted File Upload):** Whitelisted extensions, MIME verification, and script execution lockdown in uploads directory.
- **CWE-798 (Hardcoded Credentials):** Zero plaintext fallback passwords or default keys in client-side code.

---

## 👨‍💻 Author & Maintainer

**Pankaj**
- **Role:** Lead Architect & Full-Stack Software Engineer
- **Project:** INFRA VISION by ITLC India Private Limited
- **Location:** Lucknow, Uttar Pradesh, India

*Crafted with structural engineering precision and clean architectural code.*

---

## 📄 License

Copyright © 2026 **Pankaj** & ITLC India Private Limited. All Rights Reserved.  
Unauthorized duplication, distribution, or reverse-engineering of this proprietary codebase is strictly prohibited.
