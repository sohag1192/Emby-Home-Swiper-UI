#!/bin/bash

# === Emby Swiper UI Setup Script ===
# Author: Md. Sohag Rana
# GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI

# Step 1: Clean and recreate the emby-crx directory
rm -rf emby-crx
mkdir -p emby-crx

# Step 2: Download the required home.js file into emby-crx
wget https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/v1/home.js -P emby-crx/

# Step 3: Read index.html content
content=$(cat index.html)

# Step 4: Check if index.html already contains reference to emby-crx
if grep -q "emby-crx/home.js" index.html; then
    echo "✅ home.js downloaded successfully. No changes made to index.html."
else
    # Define the code to insert
    code='<script src="emby-crx/home.js"></script>'

    # Insert the code before </head>
    new_content=$(echo -e "${content/<\/head>/$code<\/head>}")

    # Write the updated content back to index.html
    echo -e "$new_content" > index.html
    echo "✅ home.js downloaded successfully. Script reference inserted into index.html."
fi