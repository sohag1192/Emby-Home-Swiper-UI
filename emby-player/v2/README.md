# 🎬 Emby & Jellyfin External Player Integration (`emby-player`)

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Player%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.10.2.0+-52B54B?style=flat-square&logo=emby&logoColor=white)
![Jellyfin Version](https://img.shields.io/badge/Jellyfin%20Web-10.8.x%20--%2010.11.x+-AA5CC3?style=flat-square&logo=jellyfin&logoColor=white)
![UI / UX Overhaul](https://img.shields.io/badge/UI%2FUX%20Overhaul-v2.5%20Cyber--Glass-06b6d4?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Seamlessly intercept browser media playback and route high-bitrate streams into native desktop & mobile players: PotPlayer, MPV, VLC, MX Player, and IINA.**

[📌 Overview](#-project-overview) • [✨ What's Changed in v2.5](#-whats-changed-in-v25-uiux--icon-overhaul) • [🚀 Supported Players](#-supported-players--features) • [🛠️ Deployment](#%EF%B8%8F-deployment-methods) • [⚙️ Power User Tips](#%EF%B8%8F-configuration--power-user-tips) • [💖 Support](#-support--sponsorship)

</div>

---

## 📌 Project Overview

The **Emby External Player Launcher** intercepts play clicks inside Emby and Jellyfin web clients and invokes dedicated, high-performance standalone media players installed on your system. 

### 🌟 Key Benefits:
- 🚀 **Direct Hardware Acceleration:** Bypasses browser codec limitations to unlock hardware decoding for **4K HEVC, HDR10+, Dolby Vision (P5/P8), and AV1**.
- 🔊 **Uncompressed Audio Passthrough:** Direct bitstream pass-through for TrueHD Atmos, DTS-HD Master Audio, and multi-channel 7.1 audio.
- 💬 **Lossless Subtitle Rendering:** Native PGS/ASS/SSA styling and custom typography rendering without forcing the server into heavy CPU transcoding.
- ⚡ **Zero Transcoding Load:** Saves vast amounts of CPU and GPU transcoding resources on your media server.

---

## ✨ What's Changed in v2.5 (UI, UX & Icon Overhaul)

This component has been completely overhauled with a modern, high-end design language and zero external network bottlenecks:

| Feature / Upgrade | Before (Legacy) | After (v2.5 Cyber-Glass HUD) |
| :--- | :--- | :--- |
| **Visual Container** | Generic flat button row | **Frosted Glass HUD Card** (`rgba(15, 23, 42, 0.85)` + 20px blur) with a glowing cyan accent edge and ambient elevation shadow |
| **HUD Header & Status** | None | **Live Pulsating Beacon** (emerald) + `DIRECT STREAM PLAYERS` title + `ZERO TRANSCODE` & `100% BITRATE` chips |
| **Button Styling** | Plain grey boxes | **Acrylic Glass Capsules** with `1px rgba(255, 255, 255, 0.16)` border, subtle backdrop blur, and smooth spring hover animation (`translateY(-3px) scale(1.03)`) |
| **Branded Hover Glow** | Uniform dull hover | Custom neon glow matched to each player brand:<br>• **PotPlayer:** Amber Glow (`#facc15`)<br>• **VLC:** Flame Orange (`#f97316`)<br>• **MPV:** Royal Purple (`#a855f7`)<br>• **IINA:** Crimson Coral (`#f43f5e`)<br>• **MX Player / Pro:** Electric Cyan (`#06b6d4`)<br>• **Copy URL:** Mint Emerald (`#10b981`) |
| **Player Icons** | External web requests to `7o7o.cc` (broke if offline or blocked) | **100% Offline Vector SVGs** bundled directly in `getIconsExt()`. Loads instantly with zero network latency and pixel-perfect clarity on 4K/Retina displays |
| **Clipboard Feedback** | `this.innerText = 'Copy Success'` (wiped the icon permanently) | **Tactile UX:** Targets `.button-text` only, displays `✅ Copied!` for 2.5 seconds, and cleanly restores original title without destroying the icon |
| **Mobile & Touch** | Hard to tap on phone/tablet | Enhanced touch targets (40px height, 16px horizontal padding, 6px icon radius) |

---

## 🚀 Supported Players & Features

| Player | Platform | Protocol / Launch Mechanism | Subtitles & Audio Features |
| :--- | :--- | :--- | :--- |
| 🟨 **PotPlayer** | 🪟 Windows | `potplayer://` URL protocol | Full external soft subtitle auto-load, multi-audio switching, custom hotkeys. |
| 🟪 **MPV** | 🪟 Windows / 🐧 Linux / 🍎 macOS | Protocol handler via [mpv-handler](https://github.com/akiirui/mpv-handler) | Minimalist, scriptable, shader post-processing (FSRCNNX, anime upscaling). |
| 🟧 **VLC Media Player** | 🪟 Windows / 🐧 Linux / 🍎 macOS | `vlc://` URL protocol | Universal compatibility across all desktop operating systems. |
| 🟥 **IINA** | 🍎 macOS | `iina://weblink` protocol | Polished modern macOS interface with Touch Bar integration. |
| 🟦 **MX Player / Pro** | 📱 Android | Mobile intent & custom scheme | Direct streaming inside leading Android hardware players. |
| 🔴 **nPlayer** | 📱 iOS / Android | `nplayer-https://` protocol | Full Dolby audio & DTS-HD hardware decoding on mobile devices. |
| 🔥 **Infuse** | 🍎 Apple TV / iOS / macOS | `infuse://` deep link | Native Apple ecosystem player with Dolby Vision Profile 5/8 support. |
| 📋 **Direct Stream URL** | 🌐 Universal | High-speed clipboard copy | Copies direct stream link (with auth/subtitles) to test in any player or CLI tool. |

---

## 🛠️ Deployment Methods

### Method 1: Clean Emby Web Integration (Active)

1. Ensure the script is located at:
   ```
   dashboard-ui/crx/emby-player/emby_launch_player.js
   ```
2. In `dashboard-ui/index.html`, verify the script tag is placed after `apploader.js` before `</body>`:
   ```html
   <script src="crx/emby-player/emby_launch_player.js" defer></script>
   ```

---

### Method 2: Client-side UserScript (Tampermonkey / Violentmonkey)

* **Advantage:** Works on any Emby or Jellyfin server where you lack administrative filesystem permissions.

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Create a new UserScript with:

```javascript
// ==UserScript==
// @name         Emby External Player Launcher (Cyber-Glass UI)
// @namespace    https://github.com/sohag1192/Emby-Home-Swiper-UI
// @version      2.5
// @description  Launch PotPlayer, MPV, VLC, MX Player directly from Emby Web
// @match        *://*/web/index.html*
// @match        *://*/*/web/index.html*
// @grant        none
// ==/UserScript==
```

---

## ⚙️ Configuration & Power User Tips

- **Single vs Multi-Instance PotPlayer:**  
  Click the **Multi-instance Potplayer** toggle button in the HUD bar, or toggle `localStorage.getItem("notCurrentPot")`.
- **Display Mode (Icons Only vs Full Labels):**  
  Click the **Display Mode** toggle button in the player bar to switch between compact icon pills and full title buttons.
- **Heterogeneous Players (Hide Incompatible OS):**  
  Click **Heterogeneous Players** to automatically hide players incompatible with your operating system (e.g. hides macOS IINA when browsing from Windows).
- **AList / Rclone 302 Direct Stream:**  
  When using cloud storage mounts, enable **STRM Direct** to bypass the server loopback and stream directly from source nodes.

---

## 💖 Support & Sponsorship

<p align="center">
  <b>Hello Viewers & Developers! 🌟</b><br/>
  If you find this project, custom UI components, or media streaming scripts helpful in your setup, here are ways you can support continuous development:
</p>

<div align="center">

| Payment Method | Network / Details | Action |
| :--- | :--- | :---: |
| 💎 **Crypto (SOL / USDT / Multi-Chain)** | `9YEThZFaqmqPbPJt8f4jLxPKELMzUmgncsrqvCv44BjE` | <a href="#crypto-wallet"><img src="https://img.shields.io/badge/Crypto-Copy_Address-9945FF?style=for-the-badge&logo=solana&logoColor=white" alt="Crypto Wallet" /></a> |
| 📱 **bKash (Personal)** | Send Money (Bangladesh) — Contact on Telegram | <a href="https://t.me/Md_Sohag_Rana" target="_blank"><img src="https://img.shields.io/badge/bKash-Contact_on_Telegram-D12053?style=for-the-badge&logo=telegram&logoColor=white" alt="bKash" /></a> |
| ⚡ **Nagad (Personal)** | Send Money (Bangladesh) — Contact on Telegram | <a href="https://t.me/Md_Sohag_Rana" target="_blank"><img src="https://img.shields.io/badge/Nagad-Contact_on_Telegram-F7941E?style=for-the-badge&logo=telegram&logoColor=white" alt="Nagad" /></a> |
| ☕ **Buy Me A Coffee** | Global Creator & Developer Support | <a href="https://rootbd.xyz" target="_blank"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" /></a> |
| ⭐ **Star Repository** | Free Community Support on GitHub | <a href="https://github.com/sohag1192/Emby-Home-Swiper-UI" target="_blank"><img src="https://img.shields.io/badge/⭐_Star_Projects-20C20E?style=for-the-badge&logo=github&logoColor=white" alt="Star" /></a> |

</div>

<a id="crypto-wallet" name="crypto-wallet"></a>

### 💎 Crypto Wallet Address (SOL / USDT / Multi-Chain):

```bash
9YEThZFaqmqPbPJt8f4jLxPKELMzUmgncsrqvCv44BjE
```

---

## 🤝 Contributing & Contact

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)  
🌐 **Repository:** [sohag1192/Emby-Home-Swiper-UI](https://github.com/sohag1192/Emby-Home-Swiper-UI)

---

## 📄 License & Copyright

- **Copyright (c) 2026 [sohag1192](https://github.com/sohag1192)** — All Rights Reserved.
- **GitHub Repository:** [sohag1192/Emby-Home-Swiper-UI](https://github.com/sohag1192/Emby-Home-Swiper-UI)
- **Author & Developer:** Md Sohag Rana ❤️
- Distributed under the [MIT License](../../LICENSE). Feel free to use, modify, and distribute with attribution.
