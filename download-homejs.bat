@echo off
setlocal EnableDelayedExpansion
title Emby Home Swiper UI - Windows Setup
chcp 65001 >nul

echo =======================================================
echo    🚀 Emby Home Swiper UI - Windows Setup Script
echo    Author: Md. Sohag Rana
echo    GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI
echo =======================================================
echo.

REM Check if index.html is in the current directory
if not exist "index.html" (
    echo [WARNING] index.html not found in current directory!
    echo Please ensure this script is run from inside your Emby dashboard-ui directory:
    echo Example: C:\Users\%%USERNAME%%\AppData\Roaming\Emby-Server\system\dashboard-ui
    echo.
    echo Continuing will download the script file into .\emby-crx\
    echo.
)

echo Select version to install:
echo   [1] Version 2 - With Ratings ⭐ and Release Year 📅 (Recommended)
echo   [2] Version 2 - Clean Minimal Swiper
echo   [3] Version 1 - Classic Lightweight Slider
echo.
set /p "choice=Enter your choice [1-3] (Default: 1): "
if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home_rating%%20with%%20year.js"
    set "VER_NAME=Home Swiper V2 (Ratings + Year)"
) else if "%choice%"=="2" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home-swiper.js"
    set "VER_NAME=Home Swiper V2 (Clean Minimal)"
) else if "%choice%"=="3" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-sider-v1/home.js"
    set "VER_NAME=Home Slider V1 (Classic)"
) else (
    echo [ERROR] Invalid choice. Defaulting to Version 2.
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home_rating%%20with%%20year.js"
    set "VER_NAME=Home Swiper V2 (Ratings + Year)"
)

echo.
echo [1/3] Preparing emby-crx directory...
if exist "emby-crx" rmdir /s /q "emby-crx"
mkdir "emby-crx"

echo [2/3] Downloading %VER_NAME%...
powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%FILE_URL%', 'emby-crx\home.js')"

if not exist "emby-crx\home.js" (
    echo [ERROR] Failed to download home.js. Please check your internet connection.
    pause
    exit /b 1
)
echo [OK] home.js downloaded successfully.

echo [3/3] Checking and updating index.html...
if exist "index.html" (
    findstr /i /c:"emby-crx/home.js" "index.html" >nul
    if !errorlevel!==0 (
        echo [OK] index.html already contains emby-crx/home.js. Skipping injection.
    ) else (
        echo [INFO] Creating backup: index.html.bak
        copy /y "index.html" "index.html.bak" >nul

        echo [INFO] Injecting script reference into index.html...
        powershell -NoProfile -Command "$content = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8); if ($content -match '</head>') { $newContent = $content -replace '</head>', '<script src=\"emby-crx/home.js\" defer></script></head>' } elseif ($content -match '</body>') { $newContent = $content -replace '</body>', '<script src=\"emby-crx/home.js\" defer></script></body>' } else { $newContent = $content + '<script src=\"emby-crx/home.js\" defer></script>' }; [System.IO.File]::WriteAllText('index.html', $newContent, [System.Text.Encoding]::UTF8)"
        
        echo [OK] Script tag successfully injected into index.html!
    )
) else (
    echo [INFO] index.html was not found in this folder. Remember to add ^<script src="emby-crx/home.js" defer^>^</script^> to your Emby dashboard index.html.
)

echo.
echo =======================================================
echo   🎉 Installation Finished Successfully!
echo   👉 Hard refresh your browser (Ctrl + F5) or clear cache
echo   👉 Navigate to your Emby home page: #!/home
echo =======================================================
echo.
pause
