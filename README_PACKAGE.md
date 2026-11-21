# 🎬 Emby Web Custom UI & External Player Package
Copyright (c) 2026 sohag1192 (https://github.com/sohag1192) - All Rights Reserved.
GitHub Repository: https://github.com/sohag1192/Emby-Home-Swiper-UI
Author & Developer: Md Sohag Rana

## 📦 Package Contents:
1. `crx/home.js` - Cinematic Hero Carousel (Home Swiper V2 with live beacon, glass metadata chips)
2. `crx/emby-player/emby_launch_player.js` - External Player Launcher (Cyber-Glass HUD, built-in vector SVG icons, tactile copy feedback)
3. `crx/README.md` - Complete update changelog and architecture documentation
4. `crx/emby-player/README.md` - External Player integration and player protocol documentation
5. `emby-player/embyLaunchPotplayer.js` - Synchronized standalone external player script
6. `index_integrated.html` - Reference Emby Web index.html with clean script hooks placed after apploader.js

## 🚀 Installation:
Extract the `crx` folder into your Emby Server `dashboard-ui/` directory and include the scripts in `dashboard-ui/index.html`:
```html
<script src="crx/home.js" defer></script>
<script src="crx/emby-player/emby_launch_player.js" defer></script>
```
