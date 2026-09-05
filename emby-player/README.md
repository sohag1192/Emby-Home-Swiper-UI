# 🎬 Emby & Jellyfin External Player Integration

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Player%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.9.5.0+-52B54B?style=flat-square&logo=emby&logoColor=white)
![Jellyfin Version](https://img.shields.io/badge/Jellyfin%20Web-10.8.x%20--%2010.11.x+-AA5CC3?style=flat-square&logo=jellyfin&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Seamlessly intercept web media playback and route streams into external desktop & mobile players: PotPlayer, MPV, VLC, MX Player, and IINA.**

</div>

---

## 📌 Project Overview

The **Emby External Player Launcher** intercepts play actions inside the Emby/Jellyfin web client and invokes dedicated native media players installed on the user's device. This unlocks hardware decoding (HDR, Dolby Vision, 4K HEVC), external audio tracks, soft subtitle rendering, and eliminates browser codec transcoding limitations.

> 💡 **Inspiration:** Heavily inspired by and building upon [bpking1/embyExternalUrl](https://github.com/bpking1/embyExternalUrl).

---

## 🚀 Supported Players & Requirements

| Player | Platform | Requirements & Notes |
| :--- | :--- | :--- |
| **PotPlayer** | 🪟 Windows | Direct protocol launching (`potplayer://`). Supports external soft subtitles and multi-track audio. |
| **MPV** | 🪟 Windows / 🐧 Linux / 🍎 macOS | Requires [mpv-handler](https://github.com/akiirui/mpv-handler) protocol handler installed locally. |
| **VLC Media Player**| 🪟 Windows / 🐧 Linux / 🍎 macOS | Protocol launching (`vlc://`). Universal codec support. |
| **MX Player / nPlayer** | 📱 Android / iOS | Native intent launching for mobile browser sessions. |
| **IINA** | 🍎 macOS | Seamless macOS native media player launching. |

---

## 📸 Preview

![External Player Integration Preview](Screenshot_39.png)

---

## 🛠️ Deployment Methods

Choose the method that matches your setup:

### Method 1: Server Injection (Recommended for Admins)
* **Pros:** Zero client installation needed; applies automatically to all web browser clients visiting your server.

1. Copy [`emby_launch_player.js`](emby_launch_player.js) into your server's `dashboard-ui/emby-player/` directory:
   - **Synology:** `/volume1/@appstore/EmbyServer/system/dashboard-ui/emby-player/`
   - **Docker:** `/system/dashboard-ui/emby-player/`
   - **Linux:** `/opt/emby-server/system/dashboard-ui/emby-player/`
   - **Windows:** `C:\Users\<User>\AppData\Roaming\Emby-Server\system\dashboard-ui\emby-player\`
2. Open `dashboard-ui/index.html` and add the script tag directly above the closing `</body>` tag:
   ```html
   <!-- External Player Launcher Hook -->
   <script src="emby-player/emby_launch_player.js" defer></script>
   ```

---

### Method 2: Client-side UserScript (Tampermonkey / Violentmonkey)
* **Pros:** Does not require server file system access or admin privileges.

1. Install the **Tampermonkey** browser extension.
2. Create a new script with this content:
   ```javascript
   // ==UserScript==
   // @name         Emby External Player Launcher
   // @namespace    https://github.com/sohag1192/Emby-Home-Swiper-UI
   // @version      1.0
   // @description  Launch external desktop players directly from Emby Web
   // @match        *://*/web/index.html*
   // @match        *://*/*/web/index.html*
   // @require      https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/emby-player/emby_launch_player.js
   // @grant        none
   // ==/UserScript==
   ```

---

## ⚙️ Configuration & Power User Tips

- **Multiple PotPlayer Instances:** To allow launching multiple playback windows simultaneously, remove `/current` parameter around line 186 in `emby_launch_player.js`.
- **Registry Hooks:** If the browser fails to open PotPlayer, reinstall PotPlayer or re-associate protocol handlers in Windows settings.
- **Direct Cloud Links (AList / 302 Redirect):** For direct file streaming behind proxies without going through the Emby transcode pipeline, configure your reverse proxy upstream rewrite rules.

---

## 🤝 Contributing & Contact

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 📄 License

Distributed under the [MIT License](../LICENSE). Feel free to use, modify, and distribute with attribution.



