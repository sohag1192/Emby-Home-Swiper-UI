#!/bin/bash

# =======================================================
#    🚀 Emby Home Swiper UI - Linux Setup Script
#    Author: Md. Sohag Rana
#    GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI
# =======================================================

echo "======================================================="
echo "   🚀 Emby Home Swiper UI - Setup Script"
echo "   Author: Md. Sohag Rana"
echo "   GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI"
echo "======================================================="

# Step 1: Clean and recreate the emby-crx directory
echo "[1/3] Preparing emby-crx directory..."
rm -rf emby-crx
mkdir -p emby-crx

# Step 2: Version selection
echo "Select version to install:"
echo "  [1] Version 2 - With Ratings ⭐ and Release Year 📅 (Popular - Recommended)"
echo "  [2] Version 2 - Clean Minimal Swiper"
echo "  [3] Version 1 - Classic Lightweight Slider"
echo ""
read -p "Enter your choice [1-3] (Default: 1): " choice
choice=${choice:-1}

if [ "$choice" = "1" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home_rating%20with%20year.js"
    VER_NAME="Home Swiper V2 (Ratings + Year)"
elif [ "$choice" = "2" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home-swiper.js"
    VER_NAME="Home Swiper V2 (Clean Minimal)"
elif [ "$choice" = "3" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-sider-v1/home.js"
    VER_NAME="Home Slider V1 (Classic)"
else
    echo "⚠️ Invalid choice. Defaulting to Version 2 (Ratings + Year)."
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home_rating%20with%20year.js"
    VER_NAME="Home Swiper V2 (Ratings + Year)"
fi

echo "[2/3] Downloading $VER_NAME..."
if command -v curl &> /dev/null; then
    curl -sSL "$RAW_URL" -o emby-crx/home.js
elif command -v wget &> /dev/null; then
    wget -q "$RAW_URL" -O emby-crx/home.js
else
    echo "❌ Error: Neither curl nor wget was found on your system."
    exit 1
fi

if [ ! -f "emby-crx/home.js" ]; then
    echo "❌ Download failed. Please check your internet connection."
    exit 1
fi
echo "✅ home.js downloaded successfully ($VER_NAME)."

# Step 3: Check and inject into index.html
echo "[3/3] Checking and updating index.html..."
if [ -f "index.html" ]; then
    if grep -q "emby-crx/home.js" index.html; then
        echo "✅ index.html already contains emby-crx/home.js, skipping insertion."
    else
        echo "🔧 Backing up index.html to index.html.bak..."
        cp index.html index.html.bak

        echo "🔧 Injecting home.js reference into index.html..."
        code='<script src="emby-crx/home.js" defer></script>'
        if grep -q "</head>" index.html; then
            sed -i "s|</head>|${code}</head>|g" index.html
        elif grep -q "</body>" index.html; then
            sed -i "s|</body>|${code}</body>|g" index.html
        else
            echo "$code" >> index.html
        fi
        echo "✅ Script reference inserted successfully."
    fi
else
    echo "ℹ️ index.html not found in current directory. Please ensure <script src=\"emby-crx/home.js\" defer></script> is added to your dashboard index.html."
fi

echo ""
echo "🎉 Installation complete!"
echo "👉 Clear browser cache (Ctrl + F5) and visit #!/home"
