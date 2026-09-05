# 🍿 Emby & Jellyfin Home Swiper - Netflix Billboard Edition (V3)

<p align="center">
  <img src="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v3/img/v3.png" alt="Netflix Billboard Slider Preview" width="920" />
</p>

<p align="center">
  <strong>Transform your Emby & Jellyfin Web Client with an authentic, cinematic Netflix Billboard Hero Slider.</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Edition-Netflix%20Billboard-E50914?style=for-the-badge&logo=netflix&logoColor=white" alt="Netflix Edition"></a>
  <a href="#installation"><img src="https://img.shields.io/badge/Swiper-v11.1.14-blue?style=for-the-badge&logo=javascript" alt="Swiper 11"></a>
  <a href="#installation"><img src="https://img.shields.io/badge/Emby-4.7%2B%20%7C%204.8%2B%20%7C%204.9%2B-52B54B?style=for-the-badge&logo=emby" alt="Emby Supported"></a>
  <a href="#installation"><img src="https://img.shields.io/badge/Jellyfin-10.8%2B%20%7C%2010.9%2B-00A4DC?style=for-the-badge&logo=jellyfin" alt="Jellyfin Supported"></a>
</p>

---

## 🌟 Features / মূল বৈশিষ্ট্যসমূহ

- 🎬 **Authentic Netflix Hero Billboard**: 
  - Dynamic 16:9 ultra-HD backdrop carousel.
  - Multi-directional cinema gradient overlays (vignettes on left, bottom, and top).
- 🏷️ **Netflix Red "N" Badge**:
  - `N FILM` / `N SERIES` branding badge for every movie and TV show.
- 🔟 **Top 10 Trending Badge**:
  - Dynamic ranking badge (e.g. `TOP 10 #1 in Movies Today`).
- 🎨 **Clear Logo & Typography**:
  - Automatically displays high-resolution transparent movie/series clear logos.
  - Gracefully falls back to stylized bold typography if a logo tag is unavailable.
- 📊 **Match % & Metadata**:
  - `98% Match` (Netflix green), Release Year, Age Certification (`TV-MA`, `PG-13`, `18+`), `4K Ultra HD`, and `5.1` surround sound badges.
- ▶️ **Netflix Interactive Action Buttons**:
  - **▶ Play Button**: Solid white button with instant playback trigger via Emby `playbackManager` (resumes from current ticks).
  - **ℹ More Info Button**: Translucent frosted-glass button navigating to the item detail page (`Emby.Page.showItem`).
- 📱 **Fully Responsive Design**:
  - Seamless auto-adaptation for Desktop 4K/1080p, Laptops, Tablets, Mobile smartphones, and Android TV / Apple TV browsers.
- ⚡ **Zero External Dependencies**:
  - `home.js` comes bundled with Swiper 11.1.14 JS and embedded CSS for instant 1-click loading.

---

## 🚀 Quick Installation / দ্রুত ইনস্টলেশন

### Method 1: Automatic Installer (Recommended / সবচেয়ে সহজ)

#### Windows:
1. Open PowerShell or Command Prompt as Administrator.
2. Run the automated script:
   ```cmd
   download-homejs.bat
   ```
3. Choose option **`[4] Version 3 - Netflix Billboard Edition`**.
4. Restart or refresh Emby Web (`Ctrl + F5`).

#### Linux / Docker / macOS:
```bash
bash setup-swiper.sh
# Choose option 4 (Netflix Billboard Edition)
```

---

### Method 2: Manual Installation (ম্যানুয়াল ইনস্টলেশন)

1. Download [`home.js`](https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v3/home.js).
2. Copy `home.js` into your Emby Server Web client directory:
   - **Windows:** `C:\Users\<Username>\AppData\Roaming\Emby-Server\system\dashboard-ui\`
   - **Linux (Debian/Ubuntu):** `/opt/emby-server/system/dashboard-ui/`
   - **Docker:** `/system/dashboard-ui/`
3. Edit `index.html` in that folder and add before the closing `</body>` tag:
   ```html
   <script src="home.js" defer></script>
   ```
4. Save the file and hard refresh your browser (`Ctrl + F5` or `Shift + F5`).

---

## ⚙️ Configuration & Customization / কাস্টমাইজেশন

You can open `home.js` and customize any settings inside the `HomeSwiper.start()` function:

```javascript
// Change autoplay delay (in milliseconds):
this.slideDelay = 7000; // 7 seconds per slide

// Change number of items shown:
this.showItemNum = 12;

// Filter item types:
this.itemQuery = {
    IncludeItemTypes: "Movie,Series",  // "Movie" or "Series"
    SortBy: "DateCreated",            // "DateCreated", "CommunityRating", "PremiereDate"
    SortOrder: "Descending",
    Limit: 12
};
```

---

## 📁 File Structure / ফাইল কাঠামো

```text
home-swiper-v3/
├── home.js                  # Standalone bundled script (Swiper 11 + CSS + Netflix Slider)
├── home-swiper-netflix.js   # Main Netflix Billboard slider code
├── netflix-style.css        # Standalone Netflix Billboard CSS stylesheet
├── README.md                # Documentation (Bangla & English)
└── img/
    └── v3.png               # Banner preview image
```

---

## 🤝 Support & Contribution

- **Author:** [Md. Sohag Rana](https://github.com/sohag1192)
- **Repository:** [Emby-Home-Swiper-UI](https://github.com/sohag1192/Emby-Home-Swiper-UI)
- **Issues & Requests:** [Submit an Issue](https://github.com/sohag1192/Emby-Home-Swiper-UI/issues)

If you like this project, please give it a ⭐️ on GitHub!
