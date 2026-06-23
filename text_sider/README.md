# 📝 Emby Text Sider Component (`text_sider`)

The `text_sider` module provides a lightweight, minimalist typography overlay engine for the **Emby-Home-Swiper-UI** framework. It extracts core metadata (titles, taglines, community ratings, and overview descriptions) directly from your Emby library assets and animates them synchronously alongside your main image carousel.

---

## 📸 Visual Preview

Here is a look at the text slider layout seamlessly floating over the interface backdrop:

![Text Sider Preview](https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/text_sider/Text%20No%20Slider%20Box.png)

---

## 🚀 Features

* **Synchronized Kinetic Sliders:** Locks perfectly with the primary image slider index to keep text descriptions and media cards instantly aligned without lag.
* **Smart Typography Sizing:** Intelligently limits and truncates long overview summaries (`overview`) across different devices (desktop vs. mobile) to maintain UI structural balance.
* **Direct API Metadata Extraction:** Leverages raw string parameters straight from Emby's database client without requiring additional backend lookups.
* **Hardware-Accelerated Transitions:** Uses modern CSS properties (`transform`, `opacity`, `transition`) for clean text fading and sliding motions, ensuring smooth 60fps performance even on low-end client hardware.

---

## 🛠️ Installation & Integration

To link this descriptive text layout overlay to your existing server home view structure:

### 1. File Tree Structure
Ensure your deployment workspace is structured to load this script next to your primary swiper logic:
1. Head into your server's system layout path: `../emby-server/system/dashboard-ui/index.html`
2. Open `index.html`, drop to the very bottom, and insert the player script directly above the closing `</body>` tag:
```html

  <style>
    /* Static Premium Warning Box (Base Styles) */
    .sn-slider-wrapper {
        width: 100%;
        box-sizing: border-box; /* Prevents overflow on mobile screens */
        background: rgba(255, 50, 50, 0.10); /* Soft red tint */
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 50, 50, 0.25);
        border-radius: 8px;
        padding: 16px 22px; /* Slightly more padding for larger text */
        margin: 20px 0 10px 0;
        display: block;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        clear: both; /* Ensures it drops below the buttons properly */
    }

    /* Title Styling */
    .sn-alert-title {
        font-size: 22px; /* Increased to match the larger text */
        font-weight: 700;
        color: #ff8a8a;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 50, 50, 0.2); 
        display: block;
    }

    /* Text Styling */
    .sn-slider-content .item {
        font-size: 20px; /* MAIN TEXT SIZE SET TO 20px */
        font-weight: 500;
        color: #ffffff;
        line-height: 1.6;
        white-space: normal;
        display: block;
    }

    .sn-slider-content a {
        color: #ff6b6b;
        text-decoration: none;
        font-weight: bold;
    }

    .sn-slider-content a:hover {
        color: #ff4747;
        text-decoration: underline;
    }

    /* 📱 MOBILE RESPONSIVE FIXES */
    @media (max-width: 768px) {
        .sn-slider-wrapper {
            padding: 14px 16px;
            margin: 15px 0 10px 0;
            border-radius: 6px;
        }

        .sn-alert-title {
            font-size: 18px; /* Scaled down slightly for phones */
            margin-bottom: 8px;
        }

        .sn-slider-content .item {
            font-size: 16px; /* Scaled down to prevent taking up the whole phone screen */
            line-height: 1.5;
        }
    }
</style>

<script>
(function () {
    'use strict';
    let isEmby = "";
    const sliderWrapperId = "sn-text-slider-wrapper";

    // Selectors mapped exactly for Emby and Jellyfin
    const selectors = {
        embyMediaInfoDiv: "div[is='emby-scroller']:not(.hide) .mediaInfo:not(.hide)",
        jellfinMediaInfoDiv: ".itemMiscInfo-primary:not(.hide)",
        embyMainDetailButtons: "div[is='emby-scroller']:not(.hide) .mainDetailButtons",
        jellfinMainDetailButtons: "div.itemDetailPage:not(.hide) div.detailPagePrimaryContainer",
    };

    // Check if the page has loaded the necessary media info
    function showFlag() {
        let mediaInfoDiv = document.querySelector(selectors.embyMediaInfoDiv);
        if (!isEmby) {
            mediaInfoDiv = document.querySelector(selectors.jellfinMediaInfoDiv);
        }
        return !!mediaInfoDiv;
    }

    // Function to inject the static alert box
    function initSlider() {
        // Prevent duplicate alerts
        let existingSlider = document.getElementById(sliderWrapperId);
        if (existingSlider) {
            existingSlider.remove();
        }

        // Find the main buttons based on Emby or Jellyfin
        let mainDetailButtons = document.querySelector(selectors.embyMainDetailButtons);
        if (!isEmby) {
            mainDetailButtons = document.querySelector(selectors.jellfinMainDetailButtons);
        }

        if (!mainDetailButtons) return;

        // The HTML with the Title and dual-language text
        const sliderHtml = `
            <div id="${sliderWrapperId}" class="sn-slider-wrapper">
                <div class="sn-alert-title">📢 জরুরী বিজ্ঞপ্তি | Important Notice</div>
                <div class="sn-slider-content">
                    <span class="item">
                        সম্মানিত গ্রাহক, সার্ভারে অতিরিক্ত চাপের কারণে বাফারিং হতে পারে। নিরবচ্ছিন্ন সেবার জন্য অনুগ্রহ করে <a href="http://100.100.100.6/#SN_CDN" target="_blank">SN FILE SERVER</a> ব্যবহার করুন।<br><br>
                        Dear User, you may experience buffering due to heavy server load. For uninterrupted streaming, please use the <a href="http://100.100.100.6/#SN_CDN" target="_blank">SN FILE SERVER</a>.
                    </span>
                </div>
            </div>
        `;

        // Inject immediately after the main play buttons
        mainDetailButtons.insertAdjacentHTML("afterend", sliderHtml);
    }

    // Monitor DOM changes using the advanced engine
    document.addEventListener("viewbeforeshow", function (e) {
        if (isEmby === "") {
            isEmby = !!e.detail.contextPath;
        }
        
        let isItemDetailPage;
        if (isEmby) {
            isItemDetailPage = e.detail.contextPath.startsWith("/item?id=");
        } else {
            isItemDetailPage = e.detail.params && e.detail.params.id;
        }
        
        if (isItemDetailPage) {
            const mutation = new MutationObserver(function() {
                if (showFlag()) {
                    initSlider();
                    mutation.disconnect(); // Stop observing once injected
                }
            })
            mutation.observe(document.body, {
                childList: true,
                characterData: true,
                subtree: true,
            })
        }
    });

})();
</script>

   </body>
   
   ```
---

## 🙋 Contributing

- Issues and pull requests are welcome.  
- If you find bugs or want to suggest improvements, please open an issue or PR.  

📬 **Contact via Mail:** [sohag1192@gmail.com](mailto:sohag1192@gmail.com)

📬 **Contact via Telegram:** [Md_Sohag_Rana](https://t.me/Md_Sohag_Rana)

---

## 🌟 Support

If you enjoy this project, please ⭐ it on GitHub — your support motivates future updates!

