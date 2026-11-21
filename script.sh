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

# Step 1: Clean and recreate the crx directory
echo "[1/4] Preparing crx directory..."
mkdir -p crx/emby-player

# Step 2: Version selection
echo "Select banner version to install:"
echo "  [1] Version 2.5 - Modern Cyber-Glass Swiper (Latest - Recommended)"
echo "  [2] Version 2.0 - With Ratings ⭐ and Release Year 📅 (Classic V2)"
echo "  [3] Version 2.0 - Clean Minimal Swiper"
echo "  [4] Version 1.0 - Classic Lightweight Slider"
echo ""
read -p "Enter your choice [1-4] (Default: 1): " choice
choice=${choice:-1}

if [ "$choice" = "1" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/crx/home.js"
    VER_NAME="Home Swiper V2.5 (Cyber-Glass Edition)"
elif [ "$choice" = "2" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home_rating%20with%20year.js"
    VER_NAME="Home Swiper V2.0 (Ratings + Year)"
elif [ "$choice" = "3" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home-swiper.js"
    VER_NAME="Home Swiper V2.0 (Clean Minimal)"
elif [ "$choice" = "4" ]; then
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-sider-v1/home.js"
    VER_NAME="Home Slider V1.0 (Classic)"
else
    echo "⚠️ Invalid choice. Defaulting to Version 2.5 (Cyber-Glass)."
    RAW_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/crx/home.js"
    VER_NAME="Home Swiper V2.5 (Cyber-Glass Edition)"
fi

echo "[2/4] Downloading $VER_NAME..."
if command -v curl &> /dev/null; then
    curl -sSL "$RAW_URL" -o crx/home.js
elif command -v wget &> /dev/null; then
    wget -q "$RAW_URL" -O crx/home.js
else
    echo "❌ Error: Neither curl nor wget was found on your system."
    exit 1
fi

if [ ! -f "crx/home.js" ]; then
    echo "❌ Download failed. Please check your internet connection."
    exit 1
fi
echo "✅ home.js downloaded successfully ($VER_NAME)."

# Step 3: Optional Player script
echo ""
read -p "Also install External Player Launcher (Cyber-Glass HUD)? [Y/n] (Default: Y): " install_player
install_player=${install_player:-Y}

if [[ "$install_player" =~ ^[Yy]$ ]]; then
    echo "Downloading External Player Launcher..."
    PLAYER_URL="https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/crx/emby-player/emby_launch_player.js"
    if command -v curl &> /dev/null; then
        curl -sSL "$PLAYER_URL" -o crx/emby-player/emby_launch_player.js
    elif command -v wget &> /dev/null; then
        wget -q "$PLAYER_URL" -O crx/emby-player/emby_launch_player.js
    fi
    if [ -f "crx/emby-player/emby_launch_player.js" ]; then
        echo "✅ emby_launch_player.js downloaded successfully."
    fi
fi

# Step 4: Check and inject into index.html
echo "[4/4] Checking and updating index.html..."
if [ -f "index.html" ]; then
    if [ ! -f "index.html.bak" ]; then
        echo "🔧 Backing up index.html to index.html.bak..."
        cp index.html index.html.bak
    fi

    # Inject home.js
    if grep -q "crx/home.js" index.html; then
        echo "✅ index.html already contains crx/home.js, skipping insertion."
    else
        echo "🔧 Injecting crx/home.js reference into index.html..."
        code='<script src="crx/home.js" defer></script>'
        if grep -q "</head>" index.html; then
            sed -i "s|</head>|${code}</head>|g" index.html
        elif grep -q "</body>" index.html; then
            sed -i "s|</body>|${code}</body>|g" index.html
        else
            echo "$code" >> index.html
        fi
        echo "✅ Banner script reference inserted successfully."
    fi

    # Inject player script if installed
    if [[ "$install_player" =~ ^[Yy]$ ]] && [ -f "crx/emby-player/emby_launch_player.js" ]; then
        if grep -q "crx/emby-player/emby_launch_player.js" index.html; then
            echo "✅ index.html already contains external player script."
        else
            echo "🔧 Injecting external player reference into index.html..."
            pcode='<script src="crx/emby-player/emby_launch_player.js" defer></script>'
            if grep -q "</body>" index.html; then
                sed -i "s|</body>|${pcode}</body>|g" index.html
            elif grep -q "</head>" index.html; then
                sed -i "s|</head>|${pcode}</head>|g" index.html
            else
                echo "$pcode" >> index.html
            fi
            echo "✅ External player reference inserted successfully."
        fi
    fi
else
    echo "ℹ️ index.html not found in current directory. Please ensure script tags are added to your dashboard index.html:"
    echo '  <script src="crx/home.js" defer></script>'
    if [[ "$install_player" =~ ^[Yy]$ ]]; then
        echo '  <script src="crx/emby-player/emby_launch_player.js" defer></script>'
    fi
fi

echo ""
echo "🎉 Installation complete!"
echo "👉 Clear browser cache (Ctrl + F5) and visit #!/home"
