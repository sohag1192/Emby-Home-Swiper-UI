# 🎞️ Emby Home Slider UI (Version 1)

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=V1%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.10.0.40+-52B54B?style=flat-square&logo=emby&logoColor=white)
![Jellyfin Version](https://img.shields.io/badge/Jellyfin%20Web-10.8.x%20--%2010.11.x+-AA5CC3?style=flat-square&logo=jellyfin&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**The classic, featherlight, and responsive banner slider for Emby Web — optimized for maximum compatibility and minimal resource consumption.**

[📌 Overview](#-overview) • [🎯 Features](#-key-features) • [🛠️ Installation](#%EF%B8%8F-installation-steps) • [📸 Previews](#-preview-screenshots) • [🧪 Troubleshooting](#-troubleshooting-tips) • [💖 Support](#-support--sponsorship)

</div>

---

## 📌 Overview

**Home Slider V1** is the battle-tested, classic lightweight banner carousel module for Emby Web. It communicates directly with Emby's native `ApiClient` to render crisp high-resolution backdrops, transparent show/movie logos, taglines, and synopsis on the home page (`#!/home`). 

If your server or client runs on low-power hardware (such as legacy NAS devices, low-spec mini PCs, or smart TV browsers), V1 provides the fastest possible render speeds with virtually zero memory overhead.

---

## 🎯 Key Features

| Feature | Description |
| :--- | :--- |
| ⚡ **Featherlight Footprint** | Pure native vanilla JavaScript with zero third-party library overhead. |
| 🔗 **Native API Client** | Tailored for Emby 4.9.1.80 – 4.10.0.40+ using built-in authentication tokens. |
| 🔄 **Automated Slide Rotation** | Rotates featured media seamlessly every 8 seconds. |
| 🔘 **Fluid Navigation** | Interactive Previous / Next chevron buttons and clickable pagination indicator dots. |
| 📱 **Adaptive Responsiveness** | Dynamically scales across 4K displays, ultrawides, laptops, tablets, and phones. |
| ⏸️ **Intelligent Hover Pause** | Automatically halts carousel auto-rotation when hovering or touching. |
| 🛡️ **Defensive Error Handling** | Graceful fallback when media items lack clear logos or high-res backdrop art. |
| 🚀 **Asynchronous Lazy Loading** | Images are retrieved and rendered dynamically on demand to conserve bandwidth. |

---

## 🛠️ Installation Steps

### Step 1: Copy `home.js` to Your Server
Locate your server's `dashboard-ui/` directory and copy `home.js` into it:

| Platform / OS | Default `dashboard-ui` Path |
| :--- | :--- |
| 🐳 **Docker (Lovechen / Official)** | `/system/dashboard-ui/` |
| 🐧 **Linux (Ubuntu / Debian / CentOS)** | `/opt/emby-server/system/dashboard-ui/` |
| 🪟 **Windows Server / Desktop** | `C:\Users\<User>\AppData\Roaming\Emby-Server\system\dashboard-ui\` |
| 💾 **Synology NAS (DSM 6 / 7)** | `/volume1/@appstore/EmbyServer/system/dashboard-ui/` |
| 📦 **QNAP NAS** | `/share/CACHEDEV1_DATA/.qpkg/EmbyServer/system/dashboard-ui/` |

### Step 2: Inject Script Tag in `index.html`
Open `dashboard-ui/index.html` with a text editor and add the script tag right before the closing `</head>` or `</body>` tag:

```html
<!-- Emby Home Slider V1 -->
<script src="home.js" defer></script>
```

### Step 3: Clear Browser Cache & Refresh
Restart your Emby server (or restart the container), open your browser at `#!/home`, and execute a hard refresh with `Ctrl + F5` (or `Cmd + Shift + R` on Mac).

---

## 📸 Preview Screenshots

<div align="center">

![Banner Preview 1](img/Screenshot_52.png)  
![Banner Preview 2](img/Screenshot_53.png)  
![Banner Preview 3](img/Screenshot_45.png)  
![Banner Preview 4](img/Screenshot_47.png)  

</div>

---

## 🧪 Troubleshooting Tips

<details>
<summary><b>1. Slider does not appear</b></summary>

- Verify you are browsing the main home route: `#!/home`.
- Open browser developer tools (`F12`) and inspect the **Console** tab for errors.
- Confirm `ApiClient` is globally defined:
  ```javascript
  console.log(ApiClient);
  ```
- Force manual initialization:
  ```javascript
  HomeSwiper.init();
  ```
</details>

<details>
<summary><b>2. White screen or styling collisions</b></summary>

- Clear your browser cache completely (`Ctrl + Shift + Delete`).
- Verify there are no duplicate `home.js` or older swiper scripts injected simultaneously.
</details>

---

## 💖 **Support & Sponsorship**

<p align="center">
  <b>Hello Viewers & Developers! 🌟</b><br/>
  If you find this project, custom UI components, or media streaming scripts helpful in your own setup, here are several ways you can support continuous development, hosting, and server maintenance costs:
</p>

<br/>

<div align="center">

| Payment Method | Network / Details | Action |
| :--- | :--- | :---: |
| 💎 **Crypto (SOL / USDT / Multi-Chain)** | `9YEThZFaqmqPbPJt8f4jLxPKELMzUmgncsrqvCv44BjE` | <a href="#crypto-wallet"><img src="https://img.shields.io/badge/Crypto-Copy_Address-9945FF?style=for-the-badge&logo=solana&logoColor=white" alt="Crypto Wallet" /></a> |
| 📱 **bKash (Personal)** | Send Money (Bangladesh) — Contact on Telegram | <a href="https://t.me/Md_Sohag_Rana" target="_blank"><img src="https://img.shields.io/badge/bKash-Contact_on_Telegram-D12053?style=for-the-badge&logo=telegram&logoColor=white" alt="bKash" /></a> |
| ⚡ **Nagad (Personal)** | Send Money (Bangladesh) — Contact on Telegram | <a href="https://t.me/Md_Sohag_Rana" target="_blank"><img src="https://img.shields.io/badge/Nagad-Contact_on_Telegram-F7941E?style=for-the-badge&logo=telegram&logoColor=white" alt="Nagad" /></a> |
| ☕ **Buy Me A Coffee** | Global Creator & Developer Support | <a href="https://rootbd.xyz" target="_blank"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" /></a> |
| ⭐ **Star Repositories** | Free Community Support on GitHub | <a href="https://github.com/sohag1192/Emby-Home-Swiper-UI" target="_blank"><img src="https://img.shields.io/badge/⭐_Star_Projects-20C20E?style=for-the-badge&logo=github&logoColor=white" alt="Star" /></a> |

</div>

<br/>

<a id="crypto-wallet" name="crypto-wallet"></a>

### 💎 **Crypto Wallet Address (SOL / USDT / Multi-Chain):**

```bash
9YEThZFaqmqPbPJt8f4jLxPKELMzUmgncsrqvCv44BjE
```

> [!NOTE]
> 💡 *Hover over or tap the code box above and click the **Copy (📋)** button in the top-right corner to copy the wallet address instantly.*

<br/>

---

## 🤝 Contributing & Contact

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)  
🌐 **Repository:** [sohag1192/Emby-Home-Swiper-UI](https://github.com/sohag1192/Emby-Home-Swiper-UI)

---

## 📄 License

Distributed under the [MIT License](../LICENSE). Feel free to use, modify, and distribute with attribution.



