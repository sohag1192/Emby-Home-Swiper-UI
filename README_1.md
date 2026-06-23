
---

# 🎬 Emby Home Swiper UI

![Visitors](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Visitors&icon=github&color=%23198754&message=&style=flat&tz=UTC)

A lightweight, responsive, and visually engaging banner carousel for Emby and Jellyfin home screens. This plugin replaces the default library grid with a dynamic Swiper-based UI — perfect for showcasing featured content, recent additions, or branded visuals.

> ✅ Tested on Emby Web 4.9.1.80  
> ✅ Inspired by [Nolovenodie/emby-crx](https://github.com/Nolovenodie/emby-crx)

---

## 🚀 Features

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| ✅ Lightweight         | No external dependencies required                                           |
| ✅ Native API Support  | Uses `ApiClient` from Emby/Jellyfin                                         |
| ✅ Auto-sliding Banner | Rotates every 8 seconds                                                     |
| ✅ Navigation Controls | Previous/Next buttons for manual control                                   |
| ✅ Indicator Dots      | Clickable dots for direct navigation                                       |
| ✅ Responsive Design   | Works seamlessly on desktop and mobile                                     |
| ✅ Hover Pause         | Pauses rotation when hovered                                               |
| ✅ Error Handling      | Graceful fallback for missing images or API issues                         |
| ✅ Lazy Loading        | Loads images only when needed for performance                              |

---

## 🛠️ Installation

1. **Download the script**  
   Get `home.js` from the [v1 folder](https://github.com/sohag1192/Emby-Home-Swiper-UI/tree/main/v1)

2. **Place in Emby environment**  
   Copy `home.js` to your Emby server’s custom scripts or plugin folder.

3. **Inject into dashboard**  
   Add this line to your Emby dashboard HTML or use a browser extension like Tampermonkey:

   ```html
   <script src="/path/to/home.js"></script>
   ```

---

## 🧪 Troubleshooting

- Open browser console (`F12`) and check for errors.
- Confirm Emby API is available:

  ```js
  console.log(ApiClient)
  ```

- Ensure you're on the correct route: `#!/home`
- Manually initialize the swiper:

  ```js
  HomeSwiper.init()
  ```

---

## 📸 Screenshots

![Screenshot 45](https://github.com/sohag1192/Emby-banner-content-display-/raw/main/v1/img/Screenshot_45.png)  
![Screenshot 47](https://github.com/sohag1192/Emby-banner-content-display-/raw/main/v1/img/Screenshot_47.png)

---

## 🧩 Developer Notes

This module uses global objects like `ApiClient` and `require(["toast"])` to interact with Emby’s internal API and UI components. Functions like `saveUser` and `renderMediaFolders` suggest future expansion for user-specific customization and folder visibility controls.

---


## 🙋 Contributing


- Issues and pull requests are welcome.  
- If you find bugs or want to suggest improvements, please open an issue or PR.  

📬 **Contact via Mail:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)

📬 **Contact via Telegram:** [Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 🌟 Support

If you enjoy this project, please ⭐ it on GitHub — your support motivates future updates!

