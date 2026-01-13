
# 🚀 Emby/Jellyfin Home Swiper UI

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Visitors&icon=github&color=%23198754&message=&style=flat&tz=UTC)

A modern, lightweight, and responsive **Swiper carousel** for Emby and Jellyfin.  
This project replaces the default home screen library view with an interactive, dynamic banner slider — perfect for showcasing your latest and most popular media.

---

## 📌 Project Overview

**Emby Home Swiper UI** is a responsive banner module for Emby Web (tested on version 4.9.1.80).  
It uses native Emby APIs to display auto‑sliding content on the home page (`#!/home`) with minimal setup and no external dependencies.

**Original inspiration:**  
- [Nolovenodie/emby-crx](https://github.com/Nolovenodie/emby-crx)  
- Adapted for Jellyfin/Emby with custom enhancements.

---

## ✅ Manual Update Instructions for `index.html`

1. **Locate your Emby Web UI folder:**
   - **Standard install (Synology):**
     ```
     /volume1/@appstore/EmbyServer/system/dashboard-ui/
     ```
   - **Docker install (lovechen/embyserver):**
     ```
     /system/dashboard-ui/
     ```
     Find it with:
     ```bash
     docker exec -it <container_id> find -name "index.html"
     ```

2. **Download required files from GitHub:**
   From [Emby-Home-Swiper-UI v1](https://github.com/sohag1192/Emby-Home-Swiper-UI/tree/main/v1), copy:
   - `home.js` (main swiper logic)
   - `style.css` (optional styling)
   - Any additional assets referenced in `home.js`

3. **Edit `index.html`:**
   Insert before `</head>`:
   ```html
   <!-- Emby Home Swiper UI -->
   <script src="home.js"></script>
   ```

4. **Refresh Emby Web Interface:**
   Restart Emby or refresh the browser. The banner should now appear on the home page (`#!/home`).

5. **Optional Debugging:**
   - Open browser console (`F12`) and check for errors.
   - Manually test:
     ```js
     HomeSwiper.init()
     ```

---

## 🛠️ Installation Instructions

1. **Download the script**  
   Save `home.js` from the [v1 folder](https://github.com/sohag1192/Emby-Home-Swiper-UI/tree/main/v1).

2. **Place in Emby environment**  
   Copy `home.js` into your Emby server’s custom scripts or plugin folder.

3. **Inject into dashboard**  
   Add this line to your Emby dashboard HTML or use a browser extension like Tampermonkey:
   ```html
   <script src="/path/to/home.js"></script>
   ```

---

# 🎯 v1 Features

This project provides a **simple, lightweight, and responsive banner component** with native Emby API support.  
Designed for performance and usability, it includes auto‑sliding functionality, navigation controls, and error handling.

---

## ✅ Feature List

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **Simple & Lightweight** | No external libraries required, minimal footprint                        |
| **Native API Support**   | Uses `ApiClient` from Emby 4.9.1.80 → 4.9.3.0 (tested and verified)       |
| **Auto-sliding Banner**  | Rotates every 8 seconds automatically                                    |
| **Navigation Controls**  | Includes previous/next buttons for manual navigation                     |
| **Indicator Dots**       | Clickable dots for direct navigation                                     |
| **Responsive Design**    | Works seamlessly on both desktop and mobile                              |
| **Hover Pause**          | Rotation pauses when hovered for better user control                     |
| **Error Handling**       | Graceful fallback if images or API requests fail                         |
| **Lazy Loading**         | Loads images only when needed, improving performance                     |

---

## 🧪 Troubleshooting Tips

- Open browser console (`F12`) and check for errors.
- Test Emby API availability:
  ```js
  console.log(ApiClient)
  ```
- Confirm you’re on the correct route: `#!/home`
- Manually initialize the swiper:
  ```js
  HomeSwiper.init()
  ```

---

## 📸 Banner Previews

![Screenshot 45](https://github.com/sohag1192/Emby-banner-content-display-/raw/main/v1/img/Screenshot_1.png)  
![Screenshot 47](https://github.com/sohag1192/Emby-banner-content-display-/raw/main/v1/img/Screenshot_3.png)

---

## 🧩 Library Access Functions

The uninitialized functions (`saveUser`, `renderMediaFolders`) suggest a separate settings component where users can manage library visibility for the carousel.  
This code relies on global objects like **`ApiClient`** and **`require(["toast"])`**, common in the Emby/Jellyfin environment, to handle saving user preferences.

---

## 🧪 Tested On
- ✅ Emby Web Version 4.9.3.0  
- ✅ Chrome, Firefox, Edge  
- ✅ Mobile and desktop views  

---

## 🙋 Contributing

- Issues and pull requests are welcome.  
- If you find bugs or want to suggest improvements, please open an issue or PR.  

📬 **Contact via Telegram:** [@sohag1192](https://t.me/sohag1192)

---

## 🌟 Support

If you enjoy this project, please ⭐ it on GitHub — your support motivates future updates!

