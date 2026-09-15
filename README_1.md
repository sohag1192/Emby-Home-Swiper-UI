# ⚡ Emby Home Swiper UI — Quick Reference

<div align="center">

![Visitors](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Visitors&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.10.0.40+-52B54B?style=flat-square&logo=emby&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A lightweight, responsive, and visually engaging banner carousel for Emby and Jellyfin home screens.**

</div>

---

## 🚀 Quick Highlights

| Feature | Description |
| :--- | :--- |
| ⚡ **Lightweight** | Pure native JavaScript using internal `ApiClient` |
| 🎞️ **Auto-Sliding** | Rotates featured media every 6–8 seconds |
| 🎮 **Navigation Controls** | Interactive Previous / Next buttons & bullet dots |
| 📱 **Responsive** | Works across Desktop, Tablet, and Mobile |
| ⏸️ **Hover Pause** | Pauses rotation automatically when hovered |
| 🛡️ **Error Handling** | Graceful fallback for missing backdrops or logos |
| 🧪 **Tested Compatibility** | Emby Web 4.9.1.80 – 4.10.0.40+ (Version [4.10.0.40] Tested OK) |

---

## 🛠️ Quick Installation

1. **Download the script:**
   - **Recommended (V2 with Ratings & Year):** [`home-swiper-v2/home_rating with year.js`](home-swiper-v2/home_rating%20with%20year.js)
   - **Classic (V1 Lightweight):** [`home-sider-v1/home.js`](home-sider-v1/home.js)

2. **Place in Emby environment:**  
   Copy the script into your server's `dashboard-ui/` directory as `home.js`.

3. **Inject into `index.html`:**  
   Add this tag before `</head>` or `</body>` in `dashboard-ui/index.html`:

   ```html
   <script src="home.js" defer></script>
   ```

4. **Restart & Refresh:**  
   Restart Emby Server or refresh the web UI (`Ctrl + F5`).

---

## 📸 Screenshots

![Banner Preview 1](home-swiper-v2/img/Screenshot_0.png)  
![Banner Preview 2](home-swiper-v2/img/Screenshot_1.png)  

---

## 🧪 Troubleshooting

- **Check Browser Console (`F12`):** Check for errors.
- **Verify `ApiClient` Availability:**
  ```javascript
  console.log(ApiClient);
  ```
- **Ensure Correct Route:** Must be on `#!/home`.
- **Manually Initialize:**
  ```javascript
  HomeSwiper.init();
  ```

---

## 🤝 Contributing & Contact

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

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


