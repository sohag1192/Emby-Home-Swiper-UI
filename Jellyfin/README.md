
# Emby Home Swiper UI for Jellyfin

A lightweight, responsive **Swiper carousel** for Jellyfin’s home screen.  
This project enhances the default Jellyfin web interface by adding a dynamic banner slider that automatically rotates through your latest or featured media.

---

## ✨ Features
- 🎞️ Auto‑sliding banners on the Jellyfin home page (`#!/home`).
- 📱 Responsive design for desktop and mobile.
- 🔗 Uses native Jellyfin APIs — no external dependencies.
- 🛠️ Easy manual integration into `index.html`.

---

## 📥 Installation

1. **Clone or download** this repository.
2. **Copy** the contents of the `Jellyfin` folder into your Jellyfin web client directory:

   - **Linux (Debian/Ubuntu/Fedora/CentOS):**
     ```
     /usr/share/jellyfin/web
     ```
   - **Windows (Standard Install):**
     ```
     C:\Program Files\Jellyfin\Server\jellyfin-web
     ```

3. **Edit `index.html`** and insert the following before `</head>`:

   ```html
   <head>
       <!-- jellyfin CRX assets -->
       <link rel="stylesheet" id="theme-css" href="jellyfin-crx/style.css" type="text/css" media="all" />
       <script src="jellyfin-crx/jquery-3.6.0.min.js"></script>
       <script src="jellyfin-crx/md5.min.js"></script>
       <script src="jellyfin-crx/main.js"></script>
   </head>
   ```

   > 💡 This manual injection avoids relying on shell scripts to patch the file.

4. **Restart Jellyfin** to apply changes:
   ```bash
   sudo systemctl restart jellyfin
   ```
   *(or restart your Docker container if applicable)*

---

## ✅ Tested On
- Jellyfin Web **10.8+ → 10.11+**
- Browsers: Chrome, Firefox, Edge
- Layouts: Mobile + Desktop

---

## 🙌 Original Inspiration
This project builds on earlier work:
- [Nolovenodie/emby-crx](https://github.com/Nolovenodie/emby-crx) — the original Emby CRX extension.  
- [frostyleave/emby-crx-for-jellyfin](https://github.com/frostyleave/emby-crx-for-jellyfin) — adaptation of Emby CRX for Jellyfin.  

Both projects pioneered external player integration and UI customization.  
**Emby Home Swiper UI** continues that spirit, focusing on **home page banners and carousel design**.

---


## 📷 Screenshots
*(Add screenshots here showing the carousel in action on Jellyfin.)*

![Screenshot 1](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/1.png)  
![Screenshot 2](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/2.png)
![Screenshot 3](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/3.png)  
![Screenshot 4](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/4.png)

---

## 🤝 Contributing
- Issues and pull requests are welcome.
- Contact: [@sohag1192 on Telegram](https://t.me/sohag1192).

---

## ⚠️ Notes
- Jellyfin updates may overwrite `index.html`. Keep a backup of your changes.
- For long‑term customization, consider forking or rebuilding `jellyfin-web` instead of editing in place.
- Clear browser cache after restart to ensure new assets load correctly.

---

## 📜 License
This project is released under the **MIT License**.  
Feel free to use, modify, and distribute with attribution.

---

## 🌟 Support
If you enjoy this project, please ⭐ it on GitHub — your support motivates future updates!



