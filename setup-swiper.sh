#!/bin/bash

# === Emby Swiper UI Setup Script ===
# Author: Md. Sohag Rana
# GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI

# Step 1: Clean and recreate the emby-crx directory
rm -rf emby-crx
mkdir -p emby-crx

# Step 2: Download home.js
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/v1/home.js -P emby-crx/

# Step 3: Read index.html content
content=$(cat index.html)

# Step 4: Check if index.html already contains emby-crx
if grep -q "emby-crx" index.html; then
    echo "✅ index.html already contains emby-crx, skipping insertion."
else
    echo "🔧 Injecting home.js reference into index.html..."

    # Define the script tag to insert
    code='<script src="emby-crx/home.js"></script>'

    # Insert before </head>
    new_content=$(echo -e "${content/<\/head>/$code<\/head>}")

    # Write updated content back to index.html
    echo -e "$new_content" > index.html
    echo "✅ Injection complete."
fi
