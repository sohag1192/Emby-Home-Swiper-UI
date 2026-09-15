# 📝 Emby & Jellyfin Text Sider Component (`text_sider`)

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Text%20Sider%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.7%2B%20%7C%204.8%2B%20%7C%204.9%2B%20%7C%204.10.0.40+-52B54B?style=flat-square&logo=emby&logoColor=white)
![Jellyfin Version](https://img.shields.io/badge/Jellyfin%20Web-10.8.x%20--%2010.11.x+-AA5CC3?style=flat-square&logo=jellyfin&logoColor=white)
![Responsive](https://img.shields.io/badge/Layout-100%25%20Responsive-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A lightweight, premium glassmorphic alert & typography notification component for Emby and Jellyfin media detail pages (`#!/item?id=...`).**

[🌟 Features](#-key-features--ux-upgrades) • [🔲 Templates](#-available-templates) • [📱 Responsive Demo](#-interactive-responsive-demo) • [🛠️ Installation](#%EF%B8%8F-installation--integration) • [⚙️ Customization](#%EF%B8%8F-customization-guide)

</div>

---

## 📌 Overview / সারসংক্ষেপ

The `text_sider` component injects clean, hardware-accelerated announcement cards, animated scrolling tickers, and server maintenance warning banners directly underneath the primary media action buttons (Play, Trailer, Favorite) on Emby and Jellyfin item detail pages.

### 🇧🇩 বাংলায় বিবরণ:
`text_sider` এর মাধ্যমে আপনি Emby এবং Jellyfin-এর যেকোনো মুভি বা সিরিজ ডিটেইল পেজে প্লে বাটনের নিচে সুন্দর গ্লাস ইফেক্টযুক্ত নোটিশ বা সার্ভার লোড সংক্রান্ত সতর্কতা ব্যানার যুক্ত করতে পারবেন। এটি সম্পূর্ণ রেসপনসিভ (Mobile, Tablet, Desktop) এবং সরাসরি CDN সার্ভার লিঙ্ক যুক্ত করার সুবিধা রয়েছে।

---

## 🌟 Key Features & UX Upgrades / নতুন UX ও ফিচারসমূহ

- 💎 **Modern Glassmorphism Design**: Frosted glass (`backdrop-filter: blur(16px)`), gradient borders, and subtle glow shadows.
- 📱 **100% Fluid & Responsive**: Built with CSS `clamp()`, flexbox, and dynamic mobile breakpoints (< 600px, 768px, 1024px, 4K).
- 🟢 **Live Pulsing Status Beacons**: Animated pulsing status indicators (`🟢 CDN ONLINE`, `🔴 LIVE NOTICE`).
- ⏸️ **Hover-to-Pause Marquee**: Animated tickers automatically pause on hover/touch so users can easily read and click links.
- 🚀 **One-Click Action Buttons**: Prominent CDN server launch buttons, instant clipboard copy for server URLs, and direct Telegram Request links.
- 💬 **Integrated Media Requests**: Built-in 1-click Telegram Request button & ticker links (`https://t.me/+Z1HSzcUk_OViM2E1`) for seamless movie & series requests.
- ❌ **Dismissible UI**: Built-in close button for seamless user dismissal without page reloads.
- ⚡ **Zero External Dependencies**: Pure native CSS and JavaScript — zero bloat or third-party libraries needed.
- 🔄 **Route-Aware Mutation Engine**: Automatically detects page navigation between items in Emby & Jellyfin single-page apps.

---

## 🔲 Available Templates / উপলব্ধ টেমপ্লেটসমূহ

| Template File | Type | Description / বর্ণনা |
| :--- | :--- | :--- |
| **[`Text No Slider Box.html`](Text%20No%20Slider%20Box.html)** | 🔲 **Glass Notice Card** | Dual-language (Bangla + English) card with header, live status pill, body text, and quick-action buttons (Server, Copy URL, Telegram Request). |
| **[`Text Slider Box.html`](Text%20Slider%20Box.html)** | 🎞️ **Scrolling Ticker** | Continuous horizontal kinetic marquee ticker with pinned `NOTICE` badge, gradient fade edges, pause-on-hover, and Telegram Request link. |
| **[`Text Warning Box.html`](Text%20Warning%20Box.html)** | ⚠️ **Compact Banner** | Sleek, space-efficient warning banner with animated icon, warning text, direct server CTA, and Telegram Request button. |
| **[`demo.html`](demo.html)** | 🎮 **Live Interactive Demo** | Interactive preview sandbox with device viewports (Desktop, Laptop, Tablet, Mobile) and 1-click code exporter. |

---

## 🎮 Interactive Responsive Demo / লাইভ ডেমো

You can open **[`demo.html`](demo.html)** directly in any web browser to test:
1. **Component Switching**: Toggle between Notice Card, Scrolling Ticker, and Compact Banner.
2. **Device Viewports**: Test live responsive layouts for Desktop (100%), Laptop (1024px), Tablet (768px), and Mobile (390px).
3. **1-Click Copy**: Copy ready-to-use production code with one click.

```bash
# To test locally in browser:
# Double click text_sider/demo.html or open via browser
```

---

## 🛠️ Installation & Integration / ইনস্টলেশন গাইড

### Step 1: Choose Your Preferred Template
Select one of the three templates:
- `Text No Slider Box.html` *(Recommended for dual-language announcements)*
- `Text Slider Box.html` *(Recommended for long scrolling announcements)*
- `Text Warning Box.html` *(Recommended for simple server maintenance notices)*

### Step 2: Open your Server's `index.html`
Locate your server's `dashboard-ui/index.html`:
- **Synology NAS:** `/volume1/@appstore/EmbyServer/system/dashboard-ui/index.html`
- **Linux (Ubuntu/Debian):** `/opt/emby-server/system/dashboard-ui/index.html`
- **Docker:** `/system/dashboard-ui/index.html`
- **Windows:** `C:\Users\<Username>\AppData\Roaming\Emby-Server\system\dashboard-ui\index.html`
- **Jellyfin Web:** `/usr/share/jellyfin/web/index.html` or `C:\Program Files\Jellyfin\Server\jellyfin-web\index.html`

### Step 3: Inject the Code
Copy the entire content (`<style>...</style>` and `<script>...</script>`) from your chosen template and paste it **right before the closing `</body>` tag** in `index.html`.

### Step 4: Refresh Browser
Hard refresh your browser (`Ctrl + F5` on Windows/Linux or `Cmd + Shift + R` on Mac). Navigate to any movie or TV series detail page (`#!/item?id=...`).

---

## ⚙️ Customization Guide / কাস্টমাইজেশন

### 1. Customizing Text and Links:
Inside the `<script>` section of your chosen template, modify the HTML string:

```javascript
// Change your notice text or CDN links:
const noticeText = 'Your custom notice here. <a href="http://your-server-ip/" target="_blank">Click here</a>';
```

### 2. Changing Theme Colors:
Inside the `<style>` section, customize the accent colors:
```css
/* For Red / Amber Warning Theme: */
--border: rgba(255, 80, 80, 0.35);
--accent: #ff4747;

/* For Emerald / Green CDN Theme: */
--border: rgba(70, 211, 105, 0.35);
--accent: #46d369;

/* For Sapphire / Blue Theme: */
--border: rgba(0, 122, 255, 0.35);
--accent: #007aff;
```

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

## 🤝 Contributing & Support

- **Author:** [Md. Sohag Rana](https://github.com/sohag1192)
- **Repository:** [Emby-Home-Swiper-UI](https://github.com/sohag1192/Emby-Home-Swiper-UI)
- **Issues & Feedback:** [GitHub Issues](https://github.com/sohag1192/Emby-Home-Swiper-UI/issues)
- **Telegram (Admin):** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)
- **Telegram (Request Group):** [Join Request Group](https://t.me/+Z1HSzcUk_OViM2E1)
- **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)

---

## 📄 License

Distributed under the [MIT License](../LICENSE). Free to use, modify, and distribute with attribution.




