@echo off
REM === Emby Swiper UI Setup Script ===
REM Author: Md. Sohag Rana
REM GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI

REM Step 1: Clean and recreate the emby-crx directory
rmdir /s /q emby-crx
mkdir emby-crx

REM Step 2: Download home.js using PowerShell
powershell -Command "Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/sohag1192/Emby-Home-Swiper-UI/refs/heads/main/v1/home.js' -OutFile 'emby-crx\\home.js'"

REM Step 3: Check if index.html already contains emby-crx
findstr /c:"emby-crx/home.js" index.html >nul
if %errorlevel%==0 (
    echo ✅ index.html already contains emby-crx, skipping insertion.
    goto :eof
)

REM Step 4: Done — no injection performed
echo ✅ home.js downloaded successfully. No changes made to index.html.
