---

# Emby Home Swiper UI for Jellyfin

A lightweight, responsive **Swiper carousel** for Jellyfin’s home screen. This project enhances the default Jellyfin web interface by adding a dynamic banner slider that automatically rotates through your latest or featured media.

---

## ✨ Features
- Auto‑sliding banners on the Jellyfin home page (`#!/home`).
- Responsive design for desktop and mobile.
- Uses native Jellyfin APIs — no external dependencies.
- Easy manual integration into `index.html`.

---

## 📥 Installation
1. Clone or download this repository.
2. Copy the contents of the `Jellyfin` folder into your Jellyfin web client directory:
   ```
   /path/to/jellyfin/system/dashboard-ui/
   ```
3. Edit `index.html` and insert the following before `</head>`:
   ```html
   <script src="emby-crx/home.js"></script>
   ```
4. Restart Jellyfin to apply changes.

---

## ✅ Tested On
- Jellyfin Web 10.8+ to 10.11+
- Chrome, Firefox, Edge browsers
- Mobile and desktop layouts

---

## 🙌 Original Inspiration
This project builds on earlier work:
- [Nolovenodie/emby-crx](https://github.com/Nolovenodie/emby-crx) — the original Emby CRX extension.  
- [frostyleave/emby-crx-for-jellyfin](https://github.com/frostyleave/emby-crx-for-jellyfin) — adaptation of Emby CRX for Jellyfin.  

Both projects pioneered external player integration and UI customization. **Emby Home Swiper UI** continues that spirit, focusing on **home page banners and carousel design**.

---

## 📷 Screenshots
*(Add screenshots here showing the carousel in action on Jellyfin.)*

![Screenshot 1](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/1.png)  
![Screenshot 2](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/2.png)
![Screenshot 3](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/3.png)  
![Screenshot 4](https://github.com/sohag1192/Emby-Home-Swiper-UI/blob/6c330e48f03139a6180dac28fd61c7335b5b2b67/Jellyfin/img/4.png)

---
---

if you want to **manually add the JavaScript and CSS references** into your `index.html` without relying on the shell script to inject them, you can simply place these lines inside the `<head>` section of your HTML file:

```html
<head>
    <!-- jellyfin CRX assets -->
    <link rel="stylesheet" id="theme-css" href="jellyfin-crx/style.css" type="text/css" media="all" />
    <script src="jellyfin-crx/jquery-3.6.0.min.js"></script>
    <script src="jellyfin-crx/md5.min.js"></script>
    <script src="jellyfin-crx/main.js"></script>
</head>
```

### 🔑 Explanation
- **style.css** → applies the jellyfin CRX styles.
- **jquery-3.6.0.min.js** → loads jQuery for DOM manipulation.
- **md5.min.js** → provides MD5 hashing functions.
- **main.js** → your custom logic for jellyfin CRX.

This way, you don’t need the script to insert anything — you just paste these lines directly into your HTML file once, and they’ll always load when the page runs.

---

## 🤝 Contributing
- Issues and pull requests are welcome.
- Contact: [@sohag1192 on Telegram](https://t.me/sohag1192).

---


