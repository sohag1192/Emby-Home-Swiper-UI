#!/bin/bash

# === Emby Swiper UI Setup Script ===
# Author: Md. Sohag Rana
# GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI

# Remove any existing jellyfin-crx directory and create a new one
rm -rf jellyfin-crx
mkdir -p jellyfin-crx

# Download required files into the jellyfin-crx directory
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/Jellyfin/jellyfin/style.css -P jellyfin-crx/
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/Jellyfin/jellyfin/logo.png -P jellyfin-crx/
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/Jellyfin/jellyfin/jquery-3.6.0.min.js -P jellyfin-crx/
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/Jellyfin/jellyfin/md5.min.js -P jellyfin-crx/
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/Jellyfin/jellyfin/main.js -P jellyfin-crx/

# Read the contents of index.html
content=$(cat index.html)

# Check if index.html already contains jellyfin-crx references
if grep -q "jellyfin-crx" index.html; then
    echo "index.html already contains jellyfin-crx references, skipping insertion."
else
    # Define the code to insert
    code='<link rel="stylesheet" id="theme-css" href="jellyfin-crx/style.css" type="text/css" media="all" />\n<script src="jellyfin-crx/jquery-3.6.0.min.js"></script>\n<script src="jellyfin-crx/md5.min.js"></script>\n<script src="jellyfin-crx/main.js"></script>'

    # Insert the code before </head>
    new_content=$(echo -e "${content/<\/head>/$code<\/head>}")

    # Write the new content back to index.html
    echo -e "$new_content" > index.html
    echo "jellyfin-crx references have been inserted into index.html"
fi