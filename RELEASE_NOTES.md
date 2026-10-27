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
- **Linux/Docker:** `setup-swiper.sh` / `script.sh` with interactive version selection.
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
