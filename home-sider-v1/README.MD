

---

## 🛠️ Installation Steps (Simplified) ![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI%2Ftree%2Fmain%2Fv1&label=&icon=github&color=%23198754&message=&style=for-the-badge&tz=UTC)
 
1. **Download & Save**  
   Save your script as `home.js`.

2. **Place in Emby Environment**  
   Drop `home.js` into your Emby server’s custom scripts or plugin folder.

3. **Inject into Dashboard**  
   Add this line to your Emby dashboard HTML or use a browser extension like Tampermonkey:

   ```html
   <script src="/path/to/home.js"></script>
   ```

## 🎯 Key Features

| Feature              | Description                                           |
|----------------------|-------------------------------------------------------|
| ✅ Lightweight        | No external libraries required                        |
| ✅ Native API Support | Built for Emby 4.9.1.80-90 using `ApiClient`             |
| ✅ Auto-Sliding Banner| Rotates every 8 seconds                               |
| ✅ Navigation Controls| Includes previous/next buttons                        |
| ✅ Indicator Dots     | Clickable dots for direct navigation                  |
| ✅ Responsive Design  | Mobile and desktop friendly                           |
| ✅ Hover Pause        | Stops rotation when hovered                           |
| ✅ Error Handling     | Graceful fallback if images or API fail               |
| ✅ Lazy Loading       | Loads images only when needed for better performance |

---

## 🧪 Troubleshooting Tips

- Open browser console (`F12`) and check for errors.
- Test Emby API availability:

  ```js
  console.log(ApiClient)
  ```

- Confirm you're on the correct route: `#!/home`
- Manually initialize:

  ```js
  HomeSwiper.init()
  ```

---

## 📸 Preview

![Banner Example 1](https://github.com/sohag1192/Emby-banner-content-display-/blob/main/v1/img/Screenshot_52.png?raw=true)  
![Banner Example 2](https://github.com/sohag1192/Emby-banner-content-display-/blob/main/v1/img/Screenshot_53.png?raw=true)

---


---

## 🙋 Contributing

- Issues and pull requests are welcome.  
- If you find bugs or want to suggest improvements, please open an issue or PR.  

📬 **Contact via Mail:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)

📬 **Contact via Telegram:** [Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 🌟 Support

If you enjoy this project, please ⭐ it on GitHub — your support motivates future updates!

