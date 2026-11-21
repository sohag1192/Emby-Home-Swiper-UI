# 🚀 Emby & Jellyfin Home Swiper UI — Release Notes

---

## 🌟 Release v2.5.0 — Cyber-Glass UI & Modular CRX Architecture

**Release Date:** 19 November 2026  
**Author & Developer:** Md Sohag Rana ([@sohag1192](https://github.com/sohag1192)) ❤️  
**Compatibility:** Emby Web 4.9.1.80 – 4.10.2.0+ (Tested OK on 4.10.2.0, 4.10.1.0, 4.10.0.40) & Jellyfin Web 10.8.x – 10.11.x+

---

### ✨ What's New in v2.5.0

#### 1. 📂 Modular CRX Extension Suite (`crx/`)
- **Clean Architecture:** Standardized deployment structure under `dashboard-ui/crx/` with dedicated submodules:
  ```text
  crx/
  ├── emby-player/
  │   ├── emby_launch_player.js   # 🎬 v2.5 Cyber-Glass HUD launcher
  │   └── README.md               # 📖 Player documentation & protocols
  ├── home.js                     # 🌟 v2.5 Cinematic Swiper Carousel
  ├── img/                        # 📸 Visual & manual login preview assets
  └── README.md                   # 📋 Complete Bangla & English changelog
  ```
- **Safe Hooking (`index_integrated.html`):** Scripts are loaded via `defer` right after `apploader.js`, eliminating `ApiClient` initialization race conditions.

#### 2. 🎬 External Player v2.5 Overhaul (`emby-player`)
- **Cyber-Glass HUD Card:** Frosted dark acrylic card (`rgba(15, 23, 42, 0.85)` + 20px blur) featuring glowing cyan accents, an emerald pulsating beacon, and `ZERO TRANSCODE` • `100% BITRATE` chips.
- **100% Offline Vector SVG Icons:** Eliminated external CDN dependencies (`7o7o.cc`). All player brand icons (PotPlayer, VLC, MPV, IINA, MX Player) are embedded directly as crisp vector SVGs with zero network latency and pixel-perfect 4K/Retina scaling.
- **Brand Neon Glows:** Custom brand-matched hover effects (PotPlayer Amber `#facc15`, VLC Orange `#f97316`, MPV Purple `#a855f7`, IINA Rose `#f43f5e`, MX Cyan `#06b6d4`, Copy Emerald `#10b981`).
- **Tactile Copy Feedback:** Clicking "Copy Stream URL" displays an interactive `✅ Copied!` animation for 2.5 seconds while preserving the original SVG icon.
- **Streamlined Standalone Launcher:** Standardized unified `emby_launch_player.js` for seamless multi-player routing.

#### 3. 🌟 Cinematic Swiper Carousel v2.5 Upgrades (`home.js`)
- **Frosted Glass Metadata Chips:** Modern acrylic metadata pills for Community Rating ⭐, Production Year 📅, and Content Certification with smooth hover scale (`1.03x`).
- **Pulsating Live Beacons:** Added animated glowing beacon indicators for highlighted media banners.
- **Multi-Event Mounting Retry:** Intelligent lifecycle watcher hooks into `viewshow` and `pageshow` events with automated retry failsafes.
- **Enhanced Triple-Gradient Layering:** Triple-direction dark gradient masking maintains pristine backdrop fanart visibility while boosting title readability.

#### 4. ✍️ Typography & Dashboard UI Overhaul
- **Bengali Typography Support:** Integrated Google Font 'Hind Siliguri' for crisp Bengali text rendering and compound characters.
- **Centering & Emoji Wrap Fix:** Resolved single emoji orphan wrap (`🍿📺`) using `white-space: nowrap` and symmetrical flex centering.
- **ISP Alert Notice & Login Polish:** Cleaned up redundant headers and disclaimer boxes for a distraction-free, premium login screen.

#### 5. 🧹 Repository Optimization & Cleanup
- ❌ **Removed:** Redundant duplicate files (`home-swiper-v2/home_new.js`, `home-swiper-v2/home.js`, `embyLaunchPotplayer.js`, root `script.sh`) and outdated documentation across subfolders.
- 📦 **Clean Packaging:** Archived update bundles into structured directories and added `.gitignore` to prevent archive pollution.
- 🛠️ **Updated Auto-Installers:** Enhanced `download-homejs.bat` and `setup-swiper.sh` to install the latest Cyber-Glass suite with 1 click.

---

# 🚀 Emby & Jellyfin Home Swiper UI — Release v2.0.0

A major release bringing modern cinematic home banners, live community ratings, production year badges, external player integration, and the brand-new glassmorphic `text_sider` item detail notice suite.

---

### ✨ What's New in v2.0.0

#### 1. 🎞️ Home Swiper Carousel (V2)
- ⭐ **Community Ratings & Badges:** Automatically queries and displays community ratings (e.g. `⭐ 8.5/10`) alongside official certification pills (`PG-13`, `TV-MA`, `R`).
- 📅 **Production Year Metadata:** Shows media release year directly beside the title and rating.
- 🎨 **Cinematic Backdrop Layering:** Enhanced CSS gradient masking prevents text-backdrop collision while preserving maximum fanart visibility.
- 🔘 **Interactive Pagination & Controls:** Added bullet dots with active state indicators and previous/next navigation buttons.
- ⏸️ **Smart Hover & Touch Detection:** Auto-sliding smoothly pauses when hovering or touching.
- ⚡ **Zero External Dependencies:** Built with 100% native ES6 JavaScript utilizing internal `ApiClient` for lightweight, lag-free performance.
- 🛡️ **Graceful Fallbacks:** Smart fallbacks to primary posters and styled text titles if transparent PNG logos or backdrops are missing.

#### 2. 📝 Item Detail Notice Suite (`text_sider`)
Injects customizable, responsive alert boxes and scrolling tickers under action buttons on media detail pages (`#!/item?id=...`):
- 🌌 **Aurora VIP Glass Card:** Frosted glass with ambient mesh glow, live status beacon, and quick-action buttons.
- ⚡ **Cyber Neon HUD:** 360° rotating neon border with animated soundwave equalizer.
- 🎠 **Multi-Slide Carousel:** 3-slide interactive notice card with timer progress bar and bullet dots.
- 🔲 **Notice Card:** Dual-language (Bangla + English) announcement card with CDN server launch buttons.
- 🎞️ **Scrolling Ticker:** Continuous horizontal marquee ticker with pause-on-hover and Telegram request links.
- ⚠️ **Compact Warning Banner:** Space-efficient alert banner for server maintenance notices.
- 🎮 **Interactive Demo Sandbox (`demo.html`):** Test all 6 styles across Desktop, Laptop, Tablet, and Mobile viewports with 1-click code copying.

#### 3. 🎬 External Player Routing (`emby-player`)
- Launch streams directly into third-party desktop players:
  - **PotPlayer** (Windows direct streaming & soft subtitles)
  - **MPV** (Cross-platform via `mpv-handler`)
  - **VLC Media Player** & **MX Player**

#### 4. 🍇 Dedicated Jellyfin Web Support
- Custom theme (`style.css`), modern carousel scripts, and dedicated shell setup script for Jellyfin Web (`10.8.x – 10.11.x+`).

#### 5. 🛠️ 1-Click Setup Scripts
- **Linux/Docker:** `setup-swiper.sh` with interactive version selection.
- **Windows:** `download-homejs.bat` with automated PowerShell download and `index.html` injection.
- **Client-Side:** UserScript support for Tampermonkey / Violentmonkey.

---

### 🧪 Compatibility Verified

- **Emby Web Client:** 4.9.1.80 – 4.10.2.0+ (Tested on `4.10.2.0`, `4.10.1.0`, and `4.10.0.40`)
- **Jellyfin Web Client:** 10.8.x – 10.11.x+
- **Browsers:** Chrome, Edge, Firefox, Safari (Desktop & Mobile)

---

### 📦 Quick Setup

**Linux / Docker:**
```bash
cd /path/to/emby/system/dashboard-ui/
curl -sSL https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/setup-swiper.sh | bash
```

**Windows:**
Run `download-homejs.bat` inside your `dashboard-ui` directory.

---

### 📬 Links & Support
- **Author:** Md. Sohag Rana ([@sohag1192](https://github.com/sohag1192))
- **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)
- **Telegram Request Group:** [Join Group](https://t.me/+Z1HSzcUk_OViM2E1)
- **Crypto Donation (SOL / USDT):** `9YEThZFaqmqPbPJt8f4jLxPKELMzUmgncsrqvCv44BjE`
