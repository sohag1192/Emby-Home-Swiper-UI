# 🌟 Emby Home Swiper UI (Version 2)

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=V2%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.10.0.40+-52B54B?style=flat-square&logo=emby&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**The next-generation, high-performance banner carousel module for Emby Web featuring Community Ratings ⭐, Production Year 📅 badges, and refined typography.**

</div>

---

## 🚀 What's New in V2

- ⭐ **Community Ratings & Badges:** Automatically fetches and displays community review ratings (e.g., `⭐ 8.5/10`) and official content ratings (`PG-13`, `TV-MA`).
- 📅 **Production Year Metadata:** Shows release/production year prominently next to ratings.
- 🎨 **Cleaner Banner Architecture:** Streamlined backdrop layering with smooth gradients and crisp logo positioning.
- 🔘 **Enhanced Pagination Bullets:** Interactive bullet indicators with auto-synchronization and protection against missing DOM nodes.
- ⚡ **Optimized Memory & CPU:** Faster startup, lazy image decoding, and reduced DOM recalculation overhead.
- ⏸️ **Smart Hover Pause:** Stops auto-slide instantly when hovered or focused.

---

## 📂 Included Scripts

| Script File | Best For | Description |
| :--- | :--- | :--- |
| **`home_rating with year.js`** | 🌟 **Recommended** | Full-featured swiper with Community Ratings ⭐, Release Year 📅 badges, and official content ratings. |
| **`home-swiper.js`** | 🎯 Minimalist | Clean, simplified swiper focused purely on fanart backdrops, transparent logos, and synopsis. |

---

## 🛠️ How to Install

### Step 1: Choose Your Script
Choose either `home_rating with year.js` or `home-swiper.js` from this folder.

### Step 2: Copy to Server
Copy the chosen script to your Emby server's `dashboard-ui/` directory:
- **Synology NAS:** `/volume1/@appstore/EmbyServer/system/dashboard-ui/`
- **Docker:** `/system/dashboard-ui/`
- **Windows:** `C:\Users\<User>\AppData\Roaming\Emby-Server\system\dashboard-ui\`
- **Linux:** `/opt/emby-server/system/dashboard-ui/`

*(Optionally rename the file to `home.js` for simplicity)*

### Step 3: Inject into `index.html`
Open `dashboard-ui/index.html` and add the following line before `</head>` or `</body>`:

```html
<!-- Emby Home Swiper V2 -->
<script src="home_rating with year.js" defer></script>
```

### Step 4: Refresh Browser
Navigate to `#!/home` in your browser and press `Ctrl + F5` (or clear browser cache).

---

## ⚙️ Configuration & Customization

Inside the script (`HomeSwiper.start()`), you can customize the query and display parameters:

```javascript
this.itemQuery = { 
    ImageTypes: "Primary,Backdrop", 
    EnableImageTypes: "Primary,Backdrop,Banner,Logo", 
    IncludeItemTypes: "Movie,Series", // Filter by item types
    SortBy: "DateCreated",            // "DateCreated", "PremiereDate", "CommunityRating"
    Recursive: true, 
    ImageTypeLimit: 1, 
    Limit: 10, 
    Fields: "Taglines,Overview,ParentId,DateCreated,PremiereDate,ProductionYear,CommunityRating,OfficialRating", 
    SortOrder: "Descending", 
    EnableUserData: true, 
    EnableTotalRecordCount: false 
};

this.slideDelay = 6000;  // Auto-slide rotation interval (e.g. 6000ms = 6 seconds)
this.showItemNum = 9;    // Number of banners displayed in rotation
```

---

## 📸 Screenshots & Previews

![Screenshot 0](img/Screenshot_0.png)  
![Screenshot 1](img/Screenshot_1.png)  
![Screenshot 2](img/Screenshot_2.png)  
![Screenshot 3](img/Screenshot_3.png)  
![Screenshot 4](img/Screenshot_4.png)  

---

## 🧪 Troubleshooting

1. **Check Browser Console (`F12`):** Verify there are no JavaScript errors.
2. **Verify `ApiClient` is Available:** In console, run `console.log(ApiClient)`.
3. **Verify Route:** Ensure you are on the home screen (`#!/home`).
4. **Manual Test:** Trigger initialization in console: `HomeSwiper.init()`.

---

## 🤝 Contributing & Contact

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 🌟 Support

If you enjoy this project, please ⭐ it on [GitHub](https://github.com/sohag1192/Emby-Home-Swiper-UI) — your support motivates future updates!


