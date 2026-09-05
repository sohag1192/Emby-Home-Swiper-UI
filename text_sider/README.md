# 📝 Emby & Jellyfin Text Sider Component (`text_sider`)

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Text%20Sider%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.9.5.0+-52B54B?style=flat-square&logo=emby&logoColor=white)
![Jellyfin Version](https://img.shields.io/badge/Jellyfin%20Web-10.8.x%20--%2010.11.x+-AA5CC3?style=flat-square&logo=jellyfin&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A lightweight, elegant typography & alert notification box for Emby and Jellyfin item detail pages (`#!/item?id=...`).**

</div>

---

## 📌 Project Overview

The `text_sider` component injects clean, hardware-accelerated announcement banners and server load notices directly underneath the primary media action buttons (Play, Trailer, Favorite) on item detail pages. It supports dual-language announcements (e.g. Bengali + English), server CDN redirect links, and animated ticker layouts.

---

## 📸 Visual Previews

### 📢 Static Alert Box
![Static Alert Box Preview](Text%20No%20Slider%20Box.png)

### 📢 Animated Slider Box
![Animated Text Slider Preview](Text%20Slider%20Box.png)

---

## 📂 Available Templates

| File | Type | Description |
| :--- | :--- | :--- |
| **`Text No Slider Box.html`** | 🔲 Static Box | Clean, static warning banner with glassmorphism blur and custom notice text. |
| **`Text Slider Box.html`** | 🎞️ Animated Slider | Kinetic rotating text box to display multiple rotating announcements. |
| **`Text Warning Box.html`** | ⚠️ Notice Box | High-visibility warning box tailored for server maintenance or load alerts. |

---

## 🚀 Key Features

* **Auto-Detection for Emby & Jellyfin:** Uses intelligent DOM selectors mapped for both platforms.
* **Non-Intrusive Layout:** Sits cleanly beneath action buttons with responsive padding and clear margin separation.
* **Glassmorphism Design:** Modern backdrop-filter blur (`12px`) with smooth red/amber accents.
* **Mobile Optimized:** Automatically scales typography and padding on mobile viewports (`< 768px`).
* **Mutation Observer Engine:** Detects route transitions and dynamically injects alerts without needing full page reloads.

---

## 🛠️ Installation & Integration

### Step 1: Choose Your Template
Select either `Text Slider Box.html` or `Text No Slider Box.html` and open it with a text editor.

### Step 2: Open `index.html`
Locate your server's `dashboard-ui/index.html`:
- **Synology:** `/volume1/@appstore/EmbyServer/system/dashboard-ui/index.html`
- **Docker:** `/system/dashboard-ui/index.html`
- **Linux:** `/opt/emby-server/system/dashboard-ui/index.html`
- **Windows:** `C:\Users\<User>\AppData\Roaming\Emby-Server\system\dashboard-ui\index.html`

### Step 3: Inject before `</body>`
Copy the `<style>` and `<script>` blocks from the HTML file and paste them right before the closing `</body>` tag:

```html
<style>
    /* Custom Alert Box Styling */
    .sn-slider-wrapper {
        width: 100%;
        box-sizing: border-box;
        background: rgba(255, 50, 50, 0.10);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 50, 50, 0.25);
        border-radius: 8px;
        padding: 16px 22px;
        margin: 20px 0 10px 0;
        display: block;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        clear: both;
    }
    .sn-alert-title {
        font-size: 22px;
        font-weight: 700;
        color: #ff8a8a;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 50, 50, 0.2);
    }
    .sn-slider-content .item {
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 1.6;
    }
    .sn-slider-content a {
        color: #ff6b6b;
        text-decoration: none;
        font-weight: bold;
    }
    .sn-slider-content a:hover {
        color: #ff4747;
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        .sn-slider-wrapper { padding: 14px 16px; margin: 15px 0 10px 0; }
        .sn-alert-title { font-size: 18px; }
        .sn-slider-content .item { font-size: 16px; }
    }
</style>

<script>
(function () {
    'use strict';
    let isEmby = "";
    const sliderWrapperId = "sn-text-slider-wrapper";

    const selectors = {
        embyMediaInfoDiv: "div[is='emby-scroller']:not(.hide) .mediaInfo:not(.hide)",
        jellfinMediaInfoDiv: ".itemMiscInfo-primary:not(.hide)",
        embyMainDetailButtons: "div[is='emby-scroller']:not(.hide) .mainDetailButtons",
        jellfinMainDetailButtons: "div.itemDetailPage:not(.hide) div.detailPagePrimaryContainer",
    };

    function showFlag() {
        let mediaInfoDiv = document.querySelector(selectors.embyMediaInfoDiv);
        if (!isEmby) {
            mediaInfoDiv = document.querySelector(selectors.jellfinMediaInfoDiv);
        }
        return !!mediaInfoDiv;
    }

    function initSlider() {
        let existingSlider = document.getElementById(sliderWrapperId);
        if (existingSlider) existingSlider.remove();

        let mainDetailButtons = document.querySelector(selectors.embyMainDetailButtons);
        if (!isEmby) mainDetailButtons = document.querySelector(selectors.jellfinMainDetailButtons);
        if (!mainDetailButtons) return;

        const sliderHtml = `
            <div id="${sliderWrapperId}" class="sn-slider-wrapper">
                <div class="sn-alert-title">📢 Notice / Announcement</div>
                <div class="sn-slider-content">
                    <span class="item">
                        Your custom notice message goes here. Add hyperlinks or notices.
                    </span>
                </div>
            </div>
        `;
        mainDetailButtons.insertAdjacentHTML("afterend", sliderHtml);
    }

    document.addEventListener("viewbeforeshow", function (e) {
        if (isEmby === "") isEmby = !!e.detail.contextPath;
        let isItemDetailPage = isEmby 
            ? e.detail.contextPath.startsWith("/item?id=") 
            : (e.detail.params && e.detail.params.id);
        
        if (isItemDetailPage) {
            const mutation = new MutationObserver(function() {
                if (showFlag()) {
                    initSlider();
                    mutation.disconnect();
                }
            });
            mutation.observe(document.body, { childList: true, characterData: true, subtree: true });
        }
    });
})();
</script>
```

---

## 🤝 Contributing & Contact

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 📄 License

Distributed under the [MIT License](../LICENSE). Feel free to use, modify, and distribute with attribution.


