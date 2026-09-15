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

## 🌟 Support

If you enjoy this project, please ⭐ it on [GitHub](https://github.com/sohag1192/Emby-Home-Swiper-UI) — your support motivates future updates!


