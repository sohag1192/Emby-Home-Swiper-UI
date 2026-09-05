# 🎞️ Emby Home Slider UI (Version 1)

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=V1%20Views&icon=github&color=%23198754&message=&style=flat-square&tz=UTC)
![Emby Version](https://img.shields.io/badge/Emby%20Web-4.9.1.80%20--%204.9.5.0+-52B54B?style=flat-square&logo=emby&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A classic, ultra-lightweight, and responsive banner carousel for Emby Web.**

</div>

---

## 📌 Overview

**Home Slider V1** is the foundational lightweight banner module designed for Emby Web. It queries Emby's native `ApiClient` directly to render high-resolution backdrops, transparent movie/show logos, taglines, and synopsis on the home page (`#!/home`) without relying on any heavy external JS dependencies.

---

## 🎯 Key Features

| Feature | Description |
| :--- | :--- |
| ⚡ **Lightweight & Fast** | Pure native JavaScript, minimal memory footprint |
| 🔗 **Native API Support** | Built for Emby 4.9.1.80+ using internal `ApiClient` |
| 🔄 **Auto-Sliding Banner** | Automatically rotates slides every 8 seconds |
| 🔘 **Navigation Controls** | Includes Previous / Next buttons and clickable indicator dots |
| 📱 **Responsive Design** | Looks great on desktops, tablets, and smartphones |
| ⏸️ **Hover Pause** | Auto-slide temporarily pauses when hovered |
| 🛡️ **Error Handling** | Graceful fallback if fanart or API requests fail |
| 🚀 **Lazy Loading** | Loads backdrops dynamically to save bandwidth |

---

## 🛠️ Installation Steps

### Step 1: Copy `home.js`
Copy `home.js` from this folder to your Emby server's `dashboard-ui/` directory:
- **Synology NAS:** `/volume1/@appstore/EmbyServer/system/dashboard-ui/`
- **Docker:** `/system/dashboard-ui/`
- **Linux:** `/opt/emby-server/system/dashboard-ui/`
- **Windows:** `C:\Users\<User>\AppData\Roaming\Emby-Server\system\dashboard-ui\`

### Step 2: Inject in `index.html`
Open `dashboard-ui/index.html` and add this script tag right before `</head>` or `</body>`:

```html
<!-- Emby Home Slider V1 -->
<script src="home.js" defer></script>
```

### Step 3: Refresh
Open your browser, navigate to your Emby home page (`#!/home`), and hard refresh with `Ctrl + F5`.

---

## 📸 Preview Screenshots

![Banner Preview 1](img/Screenshot_52.png)  
![Banner Preview 2](img/Screenshot_53.png)  
![Banner Preview 3](img/Screenshot_45.png)  
![Banner Preview 4](img/Screenshot_47.png)  

---

## 🧪 Troubleshooting Tips

1. **Check Browser Console (`F12`):** Check for errors or warnings.
2. **Verify API Client:** Run in console:
   ```javascript
   console.log(ApiClient);
   ```
3. **Check Route:** Ensure you are on `#!/home`.
4. **Manual Trigger:** Test manual initialization in console:
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


