@echo off
REM Change to current script directory
cd /d "%~dp0"

REM Initialize Git if not already done
IF NOT EXIST .git (
    git init
    git branch -M main
    git remote add origin https://github.com/sohag1192/Emby-Home-Swiper-UI.git
)

REM Add all files
git add .

REM Commit with a message
git commit -m "Release v2.5.0: Cyber-Glass UI overhaul, modular crx suite, offline SVG icons, and directory cleanup"

REM Push to GitHub
git push -u origin main

pause
