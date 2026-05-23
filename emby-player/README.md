# 🎬 Emby External Player Script & Swiper UI Integration

An elegant, high-performance ecosystem for Emby and Jellyfin servers. This repository features a modern Swiper.js-based Home UI carousel paired with a robust external player invocation script. Seamlessly intercept default web playback and route media streams directly into premium third-party players like PotPlayer, MPV, and VLC.

> 💡 **Original Inspiration:** This project is heavily inspired by and builds upon the foundational work from [bpking1/embyExternalUrl](https://github.com/bpking1/embyExternalUrl).

---

## 🚀 Features & Supported Players

* **Swiper UI Integration:** Pre-configured module tailored to bridge custom home-screen carousels smoothly into Emby's native playback engine.
* **Smart Watch States:** Instantly matches sliders to live user token data arrays (*In Progress*, *Unplayed*, *Watched* states).
* **MPV Player (Desktop):** Needs the [mpv-handler](https://github.com/akiirui/mpv-handler) protocol handler installed locally to listen to web player intents.
* **PotPlayer (Windows):** 
  * Requires the official latest release.
  * *Tip:* To spin up multiple instances simultaneously, strip `/current` out around line 186 in the code.
  * If the link launcher cracks or drops, reinstall PotPlayer to rewrite its system registry hooks.
* **Subtitles & Cloud Routing:** PotPlayer handles external soft subtitles seamlessly. For direct-link cloud infrastructure integrations (like tracking raw files behind proxies), handle routing at your proxy/web server layer (see [Nginx/AList rewrites](https://blog.738888.xyz/posts/emby_jellyfin_to_alist_directlink)).

---

## 🛠️ Deployment Methods

Choose **one** deployment routine depending on your administrative depth:

### Method 1: Native Server Hook (Highly Recommended)
> 📊 **Pros:** Zero client-side extension footprint. Propagates effortlessly to all web browser consumers out of the box.  
> ⚠️ **Cons:** Hardcoded into server UI files (global toggle); won't intercept inside locked, compiled native mobile apps.

1. Head into your server's system layout path: `../emby-server/system/dashboard-ui/index.html`
2. Open `index.html`, drop to the very bottom, and insert the player script directly above the closing `</body>` tag:
```html

   <!-- Core External Player Script Hook -->
   	<script src="emby-player/emby_launch_player.js" defer></script>

   </body>