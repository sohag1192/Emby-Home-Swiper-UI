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
    echo Continuing will download the script files into .\crx\
    echo.
)

echo Select banner version to install:
echo   [1] Version 2.5 - Modern Cyber-Glass Swiper (Latest - Recommended)
echo   [2] Version 2.0 - With Ratings ⭐ and Release Year 📅 (Classic V2)
echo   [3] Version 2.0 - Clean Minimal Swiper
echo   [4] Version 1.0 - Classic Lightweight Slider
echo.
set /p "choice=Enter your choice [1-4] (Default: 1): "
if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/crx/home.js"
    set "VER_NAME=Home Swiper V2.5 (Cyber-Glass Edition)"
    set "TARGET_DIR=crx"
    set "SCRIPT_SRC=crx/home.js"
) else if "%choice%"=="2" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home_rating%%20with%%20year.js"
    set "VER_NAME=Home Swiper V2.0 (Ratings + Year)"
    set "TARGET_DIR=crx"
    set "SCRIPT_SRC=crx/home.js"
) else if "%choice%"=="3" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-swiper-v2/home-swiper.js"
    set "VER_NAME=Home Swiper V2.0 (Clean Minimal)"
    set "TARGET_DIR=crx"
    set "SCRIPT_SRC=crx/home.js"
) else if "%choice%"=="4" (
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/home-sider-v1/home.js"
    set "VER_NAME=Home Slider V1.0 (Classic)"
    set "TARGET_DIR=crx"
    set "SCRIPT_SRC=crx/home.js"
) else (
    echo [ERROR] Invalid choice. Defaulting to Version 2.5 (Cyber-Glass).
    set "FILE_URL=https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/crx/home.js"
    set "VER_NAME=Home Swiper V2.5 (Cyber-Glass Edition)"
    set "TARGET_DIR=crx"
    set "SCRIPT_SRC=crx/home.js"
)

echo.
echo [1/4] Preparing %TARGET_DIR% directory...
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

echo [2/4] Downloading %VER_NAME%...
powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%FILE_URL%', '%TARGET_DIR%\home.js')"

if not exist "%TARGET_DIR%\home.js" (
    echo [ERROR] Failed to download home.js. Please check your internet connection.
    pause
    exit /b 1
)
echo [OK] home.js downloaded successfully.

echo.
set /p "install_player=Also install External Player Launcher (Cyber-Glass HUD)? [Y/N] (Default: Y): "
if "%install_player%"=="" set install_player=Y

if /i "%install_player%"=="Y" (
    echo Downloading External Player Launcher...
    if not exist "%TARGET_DIR%\emby-player" mkdir "%TARGET_DIR%\emby-player"
    powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/main/crx/emby-player/emby_launch_player.js', '%TARGET_DIR%\emby-player\emby_launch_player.js')"
    if exist "%TARGET_DIR%\emby-player\emby_launch_player.js" (
        echo [OK] emby_launch_player.js downloaded successfully.
    )
)

echo.
echo [3/4] Checking and updating index.html...
if exist "index.html" (
    REM Create backup
    if not exist "index.html.bak" (
        echo [INFO] Creating backup: index.html.bak
        copy /y "index.html" "index.html.bak" >nul
    )

    REM Check home.js injection
    findstr /i /c:"%SCRIPT_SRC%" "index.html" >nul
    if !errorlevel!==0 (
        echo [OK] index.html already contains %SCRIPT_SRC%.
    ) else (
        echo [INFO] Injecting %SCRIPT_SRC% into index.html...
        powershell -NoProfile -Command "$c = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8); if ($c -match '</head>') { $c = $c -replace '</head>', ('<script src=\"%SCRIPT_SRC%\" defer></script></head>') } elseif ($c -match '</body>') { $c = $c -replace '</body>', ('<script src=\"%SCRIPT_SRC%\" defer></script></body>') } else { $c = $c + '<script src=\"%SCRIPT_SRC%\" defer></script>' }; [System.IO.File]::WriteAllText('index.html', $c, [System.Text.Encoding]::UTF8)"
        echo [OK] Banner script successfully injected into index.html!
    )

    REM Check player injection if selected
    if /i "%install_player%"=="Y" (
        findstr /i /c:"%TARGET_DIR%/emby-player/emby_launch_player.js" "index.html" >nul
        if !errorlevel!==0 (
            echo [OK] index.html already contains player script.
        ) else (
            echo [INFO] Injecting player script into index.html...
            powershell -NoProfile -Command "$c = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8); if ($c -match '</body>') { $c = $c -replace '</body>', ('<script src=\"%TARGET_DIR%/emby-player/emby_launch_player.js\" defer></script></body>') } elseif ($c -match '</head>') { $c = $c -replace '</head>', ('<script src=\"%TARGET_DIR%/emby-player/emby_launch_player.js\" defer></script></head>') } else { $c = $c + '<script src=\"%TARGET_DIR%/emby-player/emby_launch_player.js\" defer></script>' }; [System.IO.File]::WriteAllText('index.html', $c, [System.Text.Encoding]::UTF8)"
            echo [OK] External player script successfully injected into index.html!
        )
    )
) else (
    echo [INFO] index.html was not found in this folder. Remember to add script tags to your Emby dashboard index.html:
    echo   ^<script src="%SCRIPT_SRC%" defer^>^</script^>
    if /i "%install_player%"=="Y" (
        echo   ^<script src="%TARGET_DIR%/emby-player/emby_launch_player.js" defer^>^</script^>
    )
)

echo.
echo =======================================================
echo   🎉 Installation Finished Successfully!
echo   👉 Hard refresh your browser (Ctrl + F5) or clear cache
echo   👉 Navigate to your Emby home page: #!/home
echo =======================================================
echo.
pause
