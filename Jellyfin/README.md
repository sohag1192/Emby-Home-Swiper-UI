# 🍇 Jellyfin Home Swiper UI & Theme

<div align="center">

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Jellyfin%20Views&icon=github&color=%23AA5CC3&message=&style=flat-square&tz=UTC)
![Jellyfin Version](https://img.shields.io/badge/Jellyfin%20Web-10.8.x%20--%2010.11.x+-AA5CC3?style=flat-square&logo=jellyfin&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A lightweight, responsive Swiper banner carousel and custom theme for Jellyfin Web.**

</div>

---

## 📌 Project Overview

**Jellyfin Home Swiper UI** transforms the standard Jellyfin home screen (`#!/home`) by adding a dynamic auto-sliding banner carousel. It leverages Jellyfin's internal API client to seamlessly query recently added media, render transparent title logos, backdrops, and interactive navigation elements.

---

## ✨ Key Features

- 🎞️ **Auto-Sliding Carousel:** Rotates featured movies and shows smoothly.
- 📱 **Fully Responsive:** Adapts flawlessly across Mobile, Tablet, and Desktop web views.
- 🎨 **Enhanced Dark Theme:** Includes modern CSS styling (`style.css`) tailored specifically for Jellyfin.
- 🔗 **Zero Server Modifications:** Injected purely via web client assets (`index.html`).
- ⚡ **Versioned Script Options:** Comes with `main-v1.js`, `main-v2.js`, and `main-v3.js` inside `jellyfin/Version/` for different UI preferences.

---

## 🛠️ Installation Guide

### Step 1: Copy Files to Jellyfin Web Directory
Copy the `jellyfin-crx` files (or the contents of `Jellyfin/jellyfin/`) into your Jellyfin web root folder:

- **Linux (Debian / Ubuntu / Fedora / Arch):**
  ```text
  /usr/share/jellyfin/web/jellyfin-crx/
  ```
- **Docker (`jellyfin/jellyfin`):**
  ```text
  /jellyfin/jellyfin-web/jellyfin-crx/
  ```
- **Windows (Standard Installation):**
  ```text
  C:\Program Files\Jellyfin\Server\jellyfin-web\jellyfin-crx\
  ```

### Step 2: Inject Assets into `index.html`
Open `index.html` in your Jellyfin web directory and insert the following block before `</head>`:

```html
<!-- Jellyfin Swiper UI Assets -->
<link rel="stylesheet" id="theme-css" href="jellyfin-crx/style.css" type="text/css" media="all" />
<script src="jellyfin-crx/jquery-3.6.0.min.js"></script>
<script src="jellyfin-crx/md5.min.js"></script>
<script src="jellyfin-crx/main.js"></script>
```

### Step 3: Restart Jellyfin
Apply changes by restarting the Jellyfin service or container:

```bash
# Linux
sudo systemctl restart jellyfin

# Docker
docker restart <jellyfin_container_name>
```

### Step 4: Clear Browser Cache
Perform a hard refresh in your browser (`Ctrl + F5`) and navigate to your Jellyfin home page.

---

## 📸 Screenshots & Previews

![Jellyfin Preview 1](img/1.png)  
![Jellyfin Preview 2](img/2.png)  
![Jellyfin Preview 3](img/3.png)  
![Jellyfin Preview 4](img/4.png)  

---

## 🧪 Tested Compatibility

- ✅ Jellyfin Web **10.8.x → 10.11.x+**
- ✅ Browsers: Chrome, Firefox, Safari, Edge, Brave
- ✅ Responsive views: Desktop, iPad/Tablet, Mobile

---

## ⚠️ Notes & Tips

- **Backups:** Server updates may overwrite `index.html`. Keep a backup of your injection snippet.
- **Cache Invalidation:** Always perform a hard refresh (`Ctrl + Shift + R`) after updating script files.

---

## 🙌 Credits & Inspiration

- [Nolovenodie/emby-crx](https://github.com/Nolovenodie/emby-crx)
- [frostyleave/emby-crx-for-jellyfin](https://github.com/frostyleave/emby-crx-for-jellyfin)

---

## 🤝 Contributing & Contact

- Issues and pull requests are welcome.
- If you find bugs or have feature ideas, feel free to submit an issue or PR.

📬 **Email:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)  
💬 **Telegram:** [@Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 📄 License

Distributed under the [MIT License](../LICENSE). Feel free to use and modify with attribution.
