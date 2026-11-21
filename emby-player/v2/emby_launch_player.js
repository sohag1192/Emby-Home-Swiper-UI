/**
 * ============================================================================
 * Emby & Jellyfin External Player Integration (Cyber-Glass UI)
 * Copyright (c) 2026 sohag1192 (https://github.com/sohag1192)
 * All Rights Reserved.
 *
 * GitHub: https://github.com/sohag1192/Emby-Home-Swiper-UI
 * Author & Developer: Md Sohag Rana
 * Based on original open-source base by @bpking (https://github.com/bpking1/embyExternalUrl)
 * ============================================================================
 */

// ==UserScript==
// @name         embyLaunchPlayer (Cyber-Glass UI)
// @namespace    https://github.com/sohag1192/Emby-Home-Swiper-UI
// @version      2.5.0
// @description  Launch PotPlayer, MPV, VLC, MX Player directly from Emby & Jellyfin Web
// @author       sohag1192 (https://github.com/sohag1192)
// @copyright    2026, sohag1192 (https://github.com/sohag1192)
// @license      MIT
// @github       https://github.com/sohag1192/Emby-Home-Swiper-UI
// @match        *://*/web/index.html*
// @match        *://*/web/
// ==/UserScript==

(function () {
    'use strict';
    const iconConfig = {
        // Icon source, choose one of the following three, comment to leave only one, 3 has the highest priority
        // 1.add icons from jsdelivr, network
        baseUrl: "https://emby-external-url.7o7o.cc/embyWebAddExternalUrl/icons",
        // baseUrl: "https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@main/embyWebAddExternalUrl/icons",
        // 2.server local icons, same as /emby-server/system/dashboard-ui/icons
        // baseUrl: "icons",
        // 3.add icons from Base64, script inner, this script size 22.5KB to 74KB,
        // Copy the content of ./iconsExt.js to getIconsExt in this script
        // Remove the last few redundant custom switches
        removeCustomBtns: false,
    };
    // When enabled, modify direct streaming links to real file names for third-party player friendly display and matching,
    // Default disabled, strongly depends on nginx-emby2Alist location two rewrite, if original link playback fails, please disable this option
    const useRealFileName = false;
    // The following are internal use variables, please do not change
    let isEmby = "";
    const mark = "embyLaunchPotplayer";
    const playBtnsWrapperId = "ExternalPlayersBtns";
    const lsKeys = {
        iconOnly: `${mark}-iconOnly`,
        hideByOS: `${mark}-hideByOS`,
        notCurrentPot: `${mark}-notCurrentPot`,
        strmDirect: `${mark}-strmDirect`,
    };
    const OS = {
        isAndroid: () => /android/i.test(navigator.userAgent),
        isIOS: () => /iPad|iPhone|iPod/i.test(navigator.userAgent),
        isMacOS: () => /Macintosh|MacIntel/i.test(navigator.userAgent),
        isApple: () => OS.isMacOS() || OS.isIOS(),
        isWindows: () => /compatible|Windows/i.test(navigator.userAgent),
        isMobile: () => OS.isAndroid() || OS.isIOS(),
        isUbuntu: () => /Ubuntu/i.test(navigator.userAgent),
        // isAndroidEmbyNoisyX: () => OS.isAndroid() && ApiClient.appVersion().includes('-'),
        // isEmbyNoisyX: () => ApiClient.appVersion().includes('-'),
        isOthers: () => Object.entries(OS).filter(([key, val]) => key !== 'isOthers').every(([key, val]) => !val()),
    };
    const playBtns = [
        { id: "embyPot", title: "Potplayer", iconId: "icon-PotPlayer"
            , onClick: embyPot, osCheck: [OS.isWindows], },
        { id: "embyVlc", title: "VLC", iconId: "icon-VLC", onClick: embyVlc, },
        { id: "embyIINA", title: "IINA", iconId: "icon-IINA"
            , onClick: embyIINA, osCheck: [OS.isMacOS], },
        { id: "embyNPlayer", title: "NPlayer", iconId: "icon-NPlayer", onClick: embyNPlayer, },
        { id: "embyMX", title: "MXPlayer", iconId: "icon-MXPlayer"
            , onClick: embyMX, osCheck: [OS.isAndroid], },
        { id: "embyMXPro", title: "MXPlayerPro", iconId: "icon-MXPlayerPro"
            , onClick: embyMXPro, osCheck: [OS.isAndroid], },
        { id: "embyInfuse", title: "Infuse", iconId: "icon-infuse"
            , onClick: embyInfuse, osCheck: [OS.isApple], },
        { id: "embyStellarPlayer", title: "Stellar Player", iconId: "icon-StellarPlayer"
            , onClick: embyStellarPlayer, osCheck: [OS.isWindows, OS.isMacOS, OS.isAndroid], },
        { id: "embyMPV", title: "MPV", iconId: "icon-MPV", onClick: embyMPV, },
        { id: "embyDDPlay", title: "DanDan Play", iconId: "icon-DDPlay"
            , onClick: embyDDPlay, osCheck: [OS.isWindows, OS.isAndroid], },
        { id: "embyFileball", title: "Fileball", iconId: "icon-Fileball"
            , onClick: embyFileball, osCheck: [OS.isApple], },
        { id: "embyOmniPlayer", title: "OmniPlayer", iconId: "icon-OmniPlayer"
            , onClick: embyOmniPlayer, osCheck: [OS.isMacOS], },
        { id: "embyFigPlayer", title: "FigPlayer", iconId: "icon-FigPlayer"
            , onClick: embyFigPlayer, osCheck: [OS.isMacOS], },
        { id: "embySenPlayer", title: "SenPlayer", iconId: "icon-SenPlayer"
            , onClick: embySenPlayer, osCheck: [OS.isIOS], },
        { id: "embyCopyUrl", title: "Copy Stream URL", iconId: "icon-Copy", onClick: embyCopyUrl, },
    ];
    // Jellyfin Icons: https://marella.github.io/material-icons/demo
    // Emby Icons: https://fonts.google.com/icons
    const customBtns = [
        { id: "hideByOS", title: "Heterogeneous Players", iconName: "more", onClick: hideByOSHandler, },
        { id: "iconOnly", title: "Display Mode", iconName: "open_in_full", onClick: iconOnlyHandler, },
        { id: "notCurrentPot", title: "Multi-instance Potplayer", iconName: "window", onClick: notCurrentPotHandler, },
        { id: "strmDirect", title: "STRM Direct", desc: "AList note: turn off sign, otherwise do not enable this option, still processed by server side sign"
            , iconName: "link", onClick: strmDirectHandler,
        },
    ];
    if (!iconConfig.removeCustomBtns) {
        playBtns.push(...customBtns);
    }
    const fileNameReg = /.*[\\/]|(\?.*)?$/g;
    const selectors = {
        // Detail page rating, release date information bar
        embyMediaInfoDiv: "div[is='emby-scroller']:not(.hide) .mediaInfo:not(.hide)",
        jellfinMediaInfoDiv: ".itemMiscInfo-primary:not(.hide)",
        // Live TV detail page create recording button
        embyBtnManualRecording: "div[is='emby-scroller']:not(.hide) .btnManualRecording:not(.hide)",
        // Live TV detail page stop recording button
        jellfinBtnCancelTimer: ".btnCancelTimer:not(.hide)",
        // Detail page play/favorite button row
        embyMainDetailButtons: "div[is='emby-scroller']:not(.hide) .mainDetailButtons",
        jellfinMainDetailButtons: "div.itemDetailPage:not(.hide) div.detailPagePrimaryContainer",
        // Detail page subtitle selection dropdown
        selectSubtitles: "div[is='emby-scroller']:not(.hide) select.selectSubtitles",
        // Detail page multi-version selection dropdown
        selectSource: "div[is='emby-scroller']:not(.hide) select.selectSource:not([disabled])",
    };

    function init() {
        if (!document.getElementById("sn-external-player-css")) {
            const style = document.createElement("style");
            style.id = "sn-external-player-css";
            style.innerHTML = `
                #ExternalPlayersBtns {
                    width: 100% !important;
                    margin: 16px 0 12px 0 !important;
                    padding: 14px 18px !important;
                    border-radius: 16px !important;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(20, 28, 48, 0.78) 100%) !important;
                    backdrop-filter: blur(20px) !important;
                    -webkit-backdrop-filter: blur(20px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.14) !important;
                    border-left: 4px solid #06b6d4 !important;
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.15) !important;
                    display: flex !important;
                    flex-wrap: wrap !important;
                    align-items: center !important;
                    gap: 10px !important;
                    box-sizing: border-box !important;
                    position: relative !important;
                }
                .sn-player-hud-header {
                    width: 100% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    margin-bottom: 8px !important;
                    padding-bottom: 8px !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                    flex-wrap: wrap !important;
                    gap: 8px !important;
                }
                .sn-player-hud-left {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    font-size: 12px !important;
                    font-weight: 800 !important;
                    letter-spacing: 1px !important;
                    color: #ffffff !important;
                    text-transform: uppercase !important;
                }
                .sn-player-hud-beacon {
                    width: 9px !important;
                    height: 9px !important;
                    border-radius: 50% !important;
                    background: #10b981 !important;
                    box-shadow: 0 0 12px #10b981 !important;
                    display: inline-block !important;
                    animation: sn-hud-pulse 1.8s infinite ease-in-out !important;
                }
                @keyframes sn-hud-pulse {
                    0%, 100% { transform: scale(0.9); opacity: 0.7; }
                    50% { transform: scale(1.35); opacity: 1; }
                }
                .sn-player-hud-badges {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                }
                .sn-player-hud-tag {
                    font-size: 10px !important;
                    font-weight: 700 !important;
                    color: #06b6d4 !important;
                    background: rgba(6, 182, 212, 0.15) !important;
                    border: 1px solid rgba(6, 182, 212, 0.35) !important;
                    border-radius: 6px !important;
                    padding: 2px 8px !important;
                    letter-spacing: 0.6px !important;
                    text-transform: uppercase !important;
                }
                .sn-player-hud-tag-green {
                    color: #10b981 !important;
                    background: rgba(16, 185, 129, 0.15) !important;
                    border-color: rgba(16, 185, 129, 0.35) !important;
                }
                #ExternalPlayersBtns .detailButton {
                    background: rgba(255, 255, 255, 0.07) !important;
                    backdrop-filter: blur(14px) !important;
                    -webkit-backdrop-filter: blur(14px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.16) !important;
                    border-radius: 11px !important;
                    color: #ffffff !important;
                    font-weight: 700 !important;
                    font-size: 13.5px !important;
                    height: 40px !important;
                    padding: 0 16px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3) !important;
                    cursor: pointer !important;
                    font-family: inherit !important;
                }
                #ExternalPlayersBtns .detailButton:hover {
                    transform: translateY(-3px) scale(1.03) !important;
                    background: rgba(255, 255, 255, 0.18) !important;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
                    filter: brightness(1.1) !important;
                }
                #ExternalPlayersBtns .detailButton:active {
                    transform: translateY(-1px) scale(0.98) !important;
                }
                #ExternalPlayersBtns #embyPot:hover {
                    border-color: rgba(250, 204, 21, 0.85) !important;
                    box-shadow: 0 8px 24px rgba(250, 204, 21, 0.35) !important;
                }
                #ExternalPlayersBtns #embyVlc:hover {
                    border-color: rgba(249, 115, 22, 0.85) !important;
                    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.35) !important;
                }
                #ExternalPlayersBtns #embyMPV:hover {
                    border-color: rgba(168, 85, 247, 0.85) !important;
                    box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35) !important;
                }
                #ExternalPlayersBtns #embyIINA:hover {
                    border-color: rgba(244, 63, 94, 0.85) !important;
                    box-shadow: 0 8px 24px rgba(244, 63, 94, 0.35) !important;
                }
                #ExternalPlayersBtns #embyMX:hover,
                #ExternalPlayersBtns #embyMXPro:hover {
                    border-color: rgba(6, 182, 212, 0.85) !important;
                    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.35) !important;
                }
                #ExternalPlayersBtns #embyCopyUrl {
                    background: rgba(16, 185, 129, 0.12) !important;
                    border-color: rgba(16, 185, 129, 0.35) !important;
                }
                #ExternalPlayersBtns #embyCopyUrl:hover {
                    background: rgba(16, 185, 129, 0.25) !important;
                    border-color: rgba(16, 185, 129, 0.85) !important;
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4) !important;
                }
                #ExternalPlayersBtns .detailButton-content {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                }
                #ExternalPlayersBtns .detailButton-icon {
                    width: 22px !important;
                    height: 22px !important;
                    min-width: 22px !important;
                    min-height: 22px !important;
                    display: inline-block !important;
                    vertical-align: middle !important;
                    background-size: contain !important;
                    background-position: center !important;
                    background-repeat: no-repeat !important;
                    border-radius: 6px !important;
                }
            `;
            (document.head || document.body).appendChild(style);
        }

        let playBtnsWrapper = document.getElementById(playBtnsWrapperId);
        if (playBtnsWrapper) {
            playBtnsWrapper.remove();
        }
        let mainDetailButtons = document.querySelector(selectors.embyMainDetailButtons);
        function generateButtonHTML({ id, title, desc, iconId, iconName }) {
            // jellyfin icon class: material-icons
            return `
                <button
                    id="${id}"
                    type="button"
                    class="detailButton emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary"
                    title="${desc ? desc : title}"
                >
                    <div class="detailButton-content">
                        <i class="md-icon detailButton-icon button-icon button-icon-left material-icons" id="${iconId}">
                        ${iconName ? iconName : '　'}
                        </i>
                        <span class="button-text">${title}</span>
                    </div>
                </button>
            `;
        }
        let buttonHtml = `
            <div id="${playBtnsWrapperId}" class="detailButtons flex align-items-flex-start flex-wrap-wrap detail-lineItem">
                <div class="sn-player-hud-header">
                    <div class="sn-player-hud-left">
                        <span class="sn-player-hud-beacon"></span>
                        <span>DIRECT STREAM PLAYERS</span>
                    </div>
                    <div class="sn-player-hud-badges">
                        <span class="sn-player-hud-tag sn-player-hud-tag-green">ZERO TRANSCODE</span>
                        <span class="sn-player-hud-tag">100% BITRATE</span>
                    </div>
                </div>
        `;
        playBtns.forEach(btn => {
            buttonHtml += generateButtonHTML(btn);
        });
        buttonHtml += `</div>`;

        if (!isEmby) {
            // jellfin
            mainDetailButtons = document.querySelector(selectors.jellfinMainDetailButtons);
        }

        if (!mainDetailButtons) {
            mainDetailButtons = document.querySelector(".mainDetailButtons, .detailPagePrimaryContainer");
        }
        if (!mainDetailButtons) return;

        mainDetailButtons.insertAdjacentHTML("afterend", buttonHtml);

        if (!isEmby) {
            // jellfin add class, detailPagePrimaryContainer、button-flat
            let playBtnsWrapper = document.getElementById("ExternalPlayersBtns");
            // style to cover .layout-mobile
            playBtnsWrapper.style.display = "flex";
            // playBtnsWrapper.style["justifyContent"] = "center";
            playBtnsWrapper.classList.add("detailPagePrimaryContainer");
            let btns = playBtnsWrapper.getElementsByTagName("button");
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.add("button-flat");
            }
        }

        // add event
        playBtns.forEach(btn => {
            const btnEle = document.querySelector(`#${btn.id}`);
            if (btnEle) {
                btnEle.onclick = btn.onClick;
            }
        });

        const iconBaseUrl = iconConfig.baseUrl;
        const icons = [
            // if url exists, use url property, if id diff icon name, use name property
            { id: "icon-PotPlayer", name: "icon-PotPlayer.webp", fontSize: "1.4em" },
            { id: "icon-VLC", fontSize: "1.3em" },
            { id: "icon-IINA", fontSize: "1.4em" },
            { id: "icon-NPlayer", fontSize: "1.3em" },
            { id: "icon-MXPlayer", fontSize: "1.4em" },
            { id: "icon-MXPlayerPro", fontSize: "1.4em" },
            { id: "icon-infuse", fontSize: "1.4em" },
            { id: "icon-StellarPlayer", fontSize: "1.4em" },
            { id: "icon-MPV", fontSize: "1.4em" },
            { id: "icon-DDPlay", fontSize: "1.4em" },
            { id: "icon-Fileball", fontSize: "1.4em" },
            { id: "icon-SenPlayer", fontSize: "1.4em" },
            { id: "icon-OmniPlayer", fontSize: "1.4em" },
            { id: "icon-FigPlayer", fontSize: "1.4em" },
            { id: "icon-Copy", fontSize: "1.4em" },
        ];
        const iconsExt = getIconsExt();
        icons.map((icon, index) => {
            const element = document.querySelector(`#${icon.id}`);
            if (element) {
                const extUrl = (iconsExt && (iconsExt[icon.id] || (iconsExt[index] && iconsExt[index].url)));
                const url = extUrl || (icon.url ? icon.url : `${iconBaseUrl}/${icon.name || `${icon.id}.webp`}`);
                element.style.cssText += `
                    background-image: url('${url}');
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    width: 22px;
                    height: 22px;
                    display: inline-block;
                    vertical-align: middle;
                    border-radius: 6px;
                    font-size: ${icon.fontSize};
                `;
            }
        });
        if (!iconConfig.removeCustomBtns) {
            hideByOSHandler();
            iconOnlyHandler();
            notCurrentPotHandler();
            strmDirectHandler();
        }
    }

    // Modern offline vector SVG icons - crisp, instant, zero external network dependency
    function getIconsExt() {
        return {
            "icon-PotPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFDD00"/><stop offset="100%" stop-color="#E5A900"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#pg)"/><polygon points="26,18 48,32 26,46" fill="#1e1e1e"/><polygon points="25,20 45,32 25,44" fill="#ffffff"/></svg>'),
            "icon-VLC": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#24292e"/><path d="M29 8h6l3 12H26z" fill="#FF8800"/><path d="M25 21h14l3 9H22z" fill="#FFFFFF"/><path d="M21 31h22l4 10H17z" fill="#FF6600"/><path d="M16 42h32l4 8H12z" fill="#FFFFFF"/><rect x="8" y="51" width="48" height="6" rx="3" fill="#FF5500"/></svg>'),
            "icon-MPV": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8E44AD"/><stop offset="100%" stop-color="#5B2C6F"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#1b1c23"/><circle cx="32" cy="32" r="24" fill="url(#mg)"/><polygon points="27,22 43,32 27,42" fill="#ffffff"/></svg>'),
            "icon-IINA": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF3366"/><stop offset="100%" stop-color="#BA0034"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#1e1e24"/><circle cx="32" cy="32" r="22" fill="url(#ig)"/><polygon points="28,23 42,32 28,41" fill="#ffffff"/><circle cx="32" cy="32" r="8" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/></svg>'),
            "icon-MXPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="mxg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00C9FF"/><stop offset="100%" stop-color="#0072FF"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#mxg)"/><polygon points="26,20 46,32 26,44" fill="#ffffff"/></svg>'),
            "icon-MXPlayerPro": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="mxpg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0052D4"/><stop offset="100%" stop-color="#4364F7"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#mxpg)"/><polygon points="23,17 39,27 23,37" fill="#ffffff"/><rect x="18" y="42" width="28" height="13" rx="3" fill="#F59E0B"/><text x="32" y="52" fill="#000" font-family="Arial,sans-serif" font-size="9" font-weight="900" text-anchor="middle">PRO</text></svg>'),
            "icon-NPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="npg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF416C"/><stop offset="100%" stop-color="#FF4B2B"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#npg)"/><path d="M21 44V20h7l12 16V20h6v24h-7L27 28v16z" fill="#ffffff"/></svg>'),
            "icon-infuse": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="ing" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A00"/><stop offset="100%" stop-color="#FF0055"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#18181b"/><path d="M23 16l14 16-14 16h8l14-16-14-16z" fill="url(#ing)"/><path d="M31 16l14 16-14 16h6l14-16-14-16z" fill="#FF9933" opacity="0.7"/></svg>'),
            "icon-StellarPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="stg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A00E0"/><stop offset="100%" stop-color="#8E2DE2"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#stg)"/><polygon points="32,15 36,28 49,32 36,36 32,49 28,36 15,32 28,28" fill="#FFFFFF"/><circle cx="32" cy="32" r="5" fill="#00ffff"/></svg>'),
            "icon-DDPlay": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="ddg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00F2FE"/><stop offset="100%" stop-color="#4FACFE"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#ddg)"/><circle cx="32" cy="32" r="18" fill="#ffffff"/><circle cx="32" cy="32" r="14" fill="#FF5388"/><polygon points="28,24 40,32 28,40" fill="#ffffff"/></svg>'),
            "icon-Fileball": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="fbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#11998e"/><stop offset="100%" stop-color="#38ef7d"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#1c2025"/><circle cx="32" cy="32" r="22" fill="url(#fbg)"/><path d="M22 25h20v14H22z" fill="#ffffff" opacity="0.9"/><polygon points="29,27 38,32 29,37" fill="#11998e"/></svg>'),
            "icon-SenPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="seng" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#667EEA"/><stop offset="100%" stop-color="#764BA2"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#seng)"/><circle cx="32" cy="32" r="20" fill="none" stroke="#ffffff" stroke-width="3"/><polygon points="28,23 41,32 28,41" fill="#ffffff"/></svg>'),
            "icon-OmniPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="omg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2193b0"/><stop offset="100%" stop-color="#6dd5ed"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#omg)"/><circle cx="32" cy="32" r="19" fill="#1a1c29"/><polygon points="27,23 43,32 27,41" fill="#6dd5ed"/></svg>'),
            "icon-FigPlayer": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="figg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#047857"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#figg)"/><polygon points="26,20 46,32 26,44" fill="#ffffff"/><circle cx="43" cy="22" r="4" fill="#a7f3d0"/></svg>'),
            "icon-Copy": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="cpg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#cpg)"/><rect x="20" y="24" width="24" height="26" rx="4" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M26 24V18a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M28 36l3 3 6-7" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>')
        };
    }

    function showFlag() {
        let mediaInfoDiv = document.querySelector(selectors.embyMediaInfoDiv);
        let btnManualRecording = document.querySelector(selectors.embyBtnManualRecording);
        if (!isEmby) {
            mediaInfoDiv = document.querySelector(selectors.jellfinMediaInfoDiv);
            btnManualRecording = document.querySelector(selectors.jellfinBtnCancelTimer);
        }
        return !!mediaInfoDiv || !!btnManualRecording || !!document.querySelector(".mainDetailButtons");
    }

    async function getItemInfo() {
        let userId = ApiClient._serverInfo.UserId;
        let itemId = /\?id=([A-Za-z0-9]+)/.exec(window.location.hash)[1];
        let response = await ApiClient.getItem(userId, itemId);
        // Continue playing next episode of current series
        if (response.Type == "Series") {
            let seriesNextUpItems = await ApiClient.getNextUpEpisodes({ SeriesId: itemId, UserId: userId });
            if (seriesNextUpItems.Items.length > 0) {
                console.log("nextUpItemId: " + seriesNextUpItems.Items[0].Id);
                return await ApiClient.getItem(userId, seriesNextUpItems.Items[0].Id);
            }
        }
        // Play first episode of current season
        if (response.Type == "Season") {
            let seasonItems = await ApiClient.getItems(userId, { parentId: itemId });
            console.log("seasonItemId: " + seasonItems.Items[0].Id);
            return await ApiClient.getItem(userId, seasonItems.Items[0].Id);
        }
        // Play current episode or movie
        if (response.MediaSources?.length > 0) {
            console.log("itemId:  " + itemId);
            return response;
        }
        // Default play first, episode/playlist first media
        let firstItems = await ApiClient.getItems(userId, { parentId: itemId, Recursive: true, IsFolder: false, Limit: 1 });
        console.log("firstItemId: " + firstItems.Items[0].Id);
        return await ApiClient.getItem(userId, firstItems.Items[0].Id);
    }

    function getSeek(position) {
        let ticks = position * 10000;
        let parts = []
            , hours = ticks / 36e9;
        (hours = Math.floor(hours)) && parts.push(hours);
        let minutes = (ticks -= 36e9 * hours) / 6e8;
        ticks -= 6e8 * (minutes = Math.floor(minutes)),
            minutes < 10 && hours && (minutes = "0" + minutes),
            parts.push(minutes);
        let seconds = ticks / 1e7;
        return (seconds = Math.floor(seconds)) < 10 && (seconds = "0" + seconds),
            parts.push(seconds),
            parts.join(":")
    }

    function getSubPath(mediaSource) {
        let selectSubtitles = document.querySelector(selectors.selectSubtitles);
        let subTitlePath = '';
        // Return selected external subtitles
        if (selectSubtitles && selectSubtitles.value > 0) {
            let SubIndex = mediaSource.MediaStreams.findIndex(m => m.Index == selectSubtitles.value && m.IsExternal);
            if (SubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[SubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${selectSubtitles.value}/Stream.${subtitleCodec}`;
            }
        }
        else {
            // Default try to return first external Chinese subtitle
            let chiSubIndex = mediaSource.MediaStreams.findIndex(m => m.Language == "chi" && m.IsExternal);
            if (chiSubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[chiSubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${chiSubIndex}/Stream.${subtitleCodec}`;
            } else {
                // Try to return first external subtitle
                let externalSubIndex = mediaSource.MediaStreams.findIndex(m => m.IsExternal);
                if (externalSubIndex > -1) {
                    let subtitleCodec = mediaSource.MediaStreams[externalSubIndex].Codec;
                    subTitlePath = `/${mediaSource.Id}/Subtitles/${externalSubIndex}/Stream.${subtitleCodec}`;
                }
            }

        }
        return subTitlePath;
    }

    async function getEmbyMediaInfo() {
        let itemInfo = await getItemInfo();
        let mediaSourceId = itemInfo.MediaSources[0].Id;
        let selectSource = document.querySelector(selectors.selectSource);
        if (selectSource && selectSource.value.length > 0) {
            mediaSourceId = selectSource.value;
        }
        // let selectAudio = document.querySelector("div[is='emby-scroller']:not(.hide) select.selectAudio:not([disabled])");
        const accessToken = ApiClient.accessToken();
        let mediaSource = itemInfo.MediaSources.find(m => m.Id == mediaSourceId);
        let uri = isEmby ? "/emby/videos" : "/Items";
        let baseUrl = `${ApiClient._serverAddress}${uri}/${itemInfo.Id}`;
        let subPath = getSubPath(mediaSource);
        let subUrl = subPath.length > 0 ? `${baseUrl}${subPath}?api_key=${accessToken}` : "";
        let streamUrl = `${baseUrl}/`;
        if (mediaSource.Path.startsWith("http") && localStorage.getItem(lsKeys.strmDirect) === "1") {
            streamUrl = decodeURIComponent(mediaSource.Path);
        } else {
            let fileName = mediaSource.IsInfiniteStream ? `master.m3u8` : decodeURIComponent(mediaSource.Path.replace(fileNameReg, ""));
            if (isEmby) {
                if (mediaSource.IsInfiniteStream) {
                    streamUrl += useRealFileName && mediaSource.Name ? `${mediaSource.Name}.m3u8` : fileName;
                } else {
                    // origin link: /emby/videos/401929/stream.xxx?xxx
                    // modify link: /emby/videos/401929/stream/xxx.xxx?xxx
                    // this is not important, hit "/emby/videos/401929/" path level still worked
                    streamUrl += useRealFileName ? `stream/${fileName}` : `stream.${mediaSource.Container}`;
                }
            } else {
                streamUrl += `Download`;
                streamUrl += useRealFileName ? `/${fileName}` : "";
            }
            streamUrl += `?api_key=${accessToken}&Static=true&MediaSourceId=${mediaSourceId}&DeviceId=${ApiClient._deviceId}`;
        }
        let position = parseInt(itemInfo.UserData.PlaybackPositionTicks / 10000);
        let intent = await getIntent(mediaSource, position);
        console.log(streamUrl, subUrl, intent);
        return {
            streamUrl: streamUrl,
            subUrl: subUrl,
            intent: intent,
        }
    }

    async function getIntent(mediaSource, position) {
        // Live TV program query items interface has no path
        let title = mediaSource.IsInfiniteStream
            ? mediaSource.Name
            : decodeURIComponent(mediaSource.Path.replace(fileNameReg, ""));
        let externalSubs = mediaSource.MediaStreams.filter(m => m.IsExternal == true);
        let subs = ''; // Requires android.net.uri[] ?
        let subs_name = '';
        let subs_filename = '';
        let subs_enable = '';
        if (externalSubs) {
            subs_name = externalSubs.map(s => s.DisplayTitle);
            subs_filename = externalSubs.map(s => s.Path.split('/').pop());
        }
        return {
            title: title,
            position: position,
            subs: subs,
            subs_name: subs_name,
            subs_filename: subs_filename,
            subs_enable: subs_enable,
            path: mediaSource.Path,
        };
    }

    // URL with "intent" scheme only support
    // String => 'S'
    // Boolean =>'B'
    // Byte => 'b'
    // Character => 'c'
    // Double => 'd'
    // Float => 'f'
    // Integer => 'i'
    // Long => 'l'
    // Short => 's'

    async function embyPot() {
        const mediaInfo = await getEmbyMediaInfo();
        const intent = mediaInfo.intent;
        const notCurrentPotArg = localStorage.getItem(lsKeys.notCurrentPot) === "1" ? "" : "/current";
        let potUrl = `potplayer://${encodeURI(mediaInfo.streamUrl)} /sub=${encodeURI(mediaInfo.subUrl)} ${notCurrentPotArg} /seek=${getSeek(intent.position)} /title="${intent.title}"`;
        await writeClipboard(potUrl);
        console.log("Successfully wrote real deep link to clipboard: ", potUrl);
        // Test shows no spaces also work, potplayer will automatically convert DeepLink to command line arguments, full parameters: PotPlayer About => Command Line Options
        potUrl = `potplayer://${notCurrentPotArg}/clipboard`;
        window.open(potUrl, "_self");
    }

    // async function embyPot() {
    //     let mediaInfo = await getEmbyMediaInfo();
    //     let intent = mediaInfo.intent;
    //     let potUrl = `potplayer://${encodeURI(mediaInfo.streamUrl)} /sub=${encodeURI(mediaInfo.subUrl)} /current /seek=${getSeek(intent.position)}`;
    //     potUrl += useRealFileName ? '' : ` /title="${intent.title}"`;
    //     console.log(potUrl);
    //     window.open(potUrl, "_self");
    // }

    // https://wiki.videolan.org/Android_Player_Intents/
    async function embyVlc() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        // android subtitles:  https://code.videolan.org/videolan/vlc-android/-/issues/1903
        let vlcUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=org.videolan.vlc;type=video/*;S.subtitles_location=${encodeURI(mediaInfo.subUrl)};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        if (OS.isWindows() || OS.isMacOS()) {
            // Desktop requires additional setup, refer to this project:
            // new: https://github.com/northsea4/vlc-protocol
            // old: https://github.com/stefansundin/vlc-protocol
            vlcUrl = `vlc://${encodeURI(mediaInfo.streamUrl)}`;
        }
        if (OS.isIOS()) {
            // https://wiki.videolan.org/Documentation:IOS/#x-callback-url
            // https://code.videolan.org/videolan/vlc-ios/-/commit/55e27ed69e2fce7d87c47c9342f8889fda356aa9
            vlcUrl = `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        }
        console.log(vlcUrl);
        window.open(vlcUrl, "_self");
    }

    // MPV
    async function embyMPV() {
        let mediaInfo = await getEmbyMediaInfo();
        // Desktop requires additional setup, refer to this project:
        // new: https://github.com/northsea4/mpvplay-protocol
        // old: https://github.com/akiirui/mpv-handler
        let streamUrl64 = btoa(String.fromCharCode.apply(null, new Uint8Array(new TextEncoder().encode(mediaInfo.streamUrl))))
            .replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
        let MPVUrl = `mpv://play/${streamUrl64}`;
        if (mediaInfo.subUrl.length > 0) {
            let subUrl64 = btoa(mediaInfo.subUrl).replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
            MPVUrl = `mpv://play/${streamUrl64}/?subfile=${subUrl64}`;
        }

        if (OS.isIOS() || OS.isAndroid()) {
            MPVUrl = `mpv://${encodeURI(mediaInfo.streamUrl)}`;
        }
        if (OS.isMacOS()) {
            MPVUrl = `mpvplay://${encodeURI(mediaInfo.streamUrl)}`;
        }

        console.log(MPVUrl);
        window.open(MPVUrl, "_self");
    }

    // https://github.com/iina/iina/issues/1991
    async function embyIINA() {
        let mediaInfo = await getEmbyMediaInfo();
        let iinaUrl = `iina://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1`;
        console.log(`iinaUrl= ${iinaUrl}`);
        window.open(iinaUrl, "_self");
    }

    // https://sites.google.com/site/mxvpen/api
    // https://mx.j2inter.com/api
    // https://support.mxplayer.in/support/solutions/folders/43000574903
    async function embyMX() {
        const mediaInfo = await getEmbyMediaInfo();
        const intent = mediaInfo.intent;
        // mxPlayer free
        const packageName = "com.mxtech.videoplayer.ad";
        const url = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=${packageName};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        console.log(url);
        window.open(url, "_self");
    }

    async function embyMXPro() {
        const mediaInfo = await getEmbyMediaInfo();
        const intent = mediaInfo.intent;
        // mxPlayer Pro
        const packageName = "com.mxtech.videoplayer.pro";
        const url = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=${packageName};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        console.log(url);
        window.open(url, "_self");
    }

    async function embyNPlayer() {
        let mediaInfo = await getEmbyMediaInfo();
        let nUrl = OS.isMacOS()
            ? `nplayer-mac://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1` 
            : `nplayer-${encodeURI(mediaInfo.streamUrl)}`;
        console.log(nUrl);
        window.open(nUrl, "_self");
    }

    async function embyInfuse() {
        let mediaInfo = await getEmbyMediaInfo();
        // sub parameter limitation: Play single video file with external subtitles (Infuse 7.6.2 and above)
        // see: https://support.firecore.com/hc/zh-cn/articles/215090997
        let infuseUrl = `infuse://x-callback-url/play?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        console.log(`infuseUrl= ${infuseUrl}`);
        window.open(infuseUrl, "_self");
    }

    // StellarPlayer
    async function embyStellarPlayer() {
        let mediaInfo = await getEmbyMediaInfo();
        let stellarPlayerUrl = `stellar://play/${encodeURI(mediaInfo.streamUrl)}`;
        console.log(`stellarPlayerUrl= ${stellarPlayerUrl}`);
        window.open(stellarPlayerUrl, "_self");
    }

    // MPV
    async function embyMPV() {
        let mediaInfo = await getEmbyMediaInfo();
        // Desktop requires additional setup, use this project: https://github.com/akiirui/mpv-handler
        let streamUrl64 = btoa(String.fromCharCode.apply(null, new Uint8Array(new TextEncoder().encode(mediaInfo.streamUrl))))
            .replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
        let MPVUrl = `mpv-handler://play/${streamUrl64}`;
        if (mediaInfo.subUrl.length > 0) {
            let subUrl64 = btoa(mediaInfo.subUrl).replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
            MPVUrl = `mpv-handler://play/${streamUrl64}/?subfile=${subUrl64}`;
        }

        if (OS.isIOS() || OS.isAndroid()) {
            MPVUrl = `mpv-handler://${encodeURI(mediaInfo.streamUrl)}`;
        }

        console.log(MPVUrl);
        window.open(MPVUrl, "_self");
    }

    // see https://greasyfork.org/zh-CN/scripts/443916
    async function embyDDPlay() {
        // Check if windows local path
        const fullPathEle = document.querySelector(".mediaSources .mediaSource .sectionTitle > div:not([class]):first-child");
        let fullPath = fullPathEle ? fullPathEle.innerText : "";
        let ddplayUrl;
        if (new RegExp('^[a-zA-Z]:').test(fullPath)) {
            ddplayUrl = `ddplay:${encodeURIComponent(fullPath)}`;
        } else {
            console.log("File path is not local path, will use streaming playback");
            const mediaInfo = await getEmbyMediaInfo();
            const intent = mediaInfo.intent;
            if (!fullPath) {
                fullPath = intent.title;
            }
            const urlPart = mediaInfo.streamUrl + `|filePath=${fullPath}`;
            ddplayUrl = `ddplay:${encodeURIComponent(urlPart)}`;
            if (OS.isAndroid()) {
                // Subtitles Not Supported: https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/ClientProtocol.md
                ddplayUrl = `intent:${encodeURI(urlPart)}#Intent;package=com.xyoye.dandanplay;type=video/*;end`;
            }
        }
        console.log(`ddplayUrl= ${ddplayUrl}`);
        window.open(ddplayUrl, "_self");
    }

    async function embyFileball() {
        const mediaInfo = await getEmbyMediaInfo();
        // see: app about, URL Schemes
        const url = `filebox://play?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        console.log(`FileballUrl= ${url}`);
        window.open(url, "_self");
    }

    async function embyOmniPlayer() {
        const mediaInfo = await getEmbyMediaInfo();
        // see: https://github.com/AlistGo/alist-web/blob/main/src/pages/home/previews/video_box.tsx
        const url = `omniplayer://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        console.log(`OmniPlayerUrl= ${url}`);
        window.open(url, "_self");
    }

    async function embyFigPlayer() {
        const mediaInfo = await getEmbyMediaInfo();
        // see: https://github.com/AlistGo/alist-web/blob/main/src/pages/home/previews/video_box.tsx
        const url = `figplayer://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        console.log(`FigPlayerUrl= ${url}`);
        window.open(url, "_self");
    }

    async function embySenPlayer() {
        const mediaInfo = await getEmbyMediaInfo();
        // see: app about, URL Schemes
        const url = `SenPlayer://x-callback-url/play?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        console.log(`SenPlayerUrl= ${url}`);
        window.open(url, "_self");
    }

    function lsCheckSetBoolean(event, lsKeyName) {
        let flag = localStorage.getItem(lsKeyName) === "1";
        if (event) {
            flag = !flag;
            localStorage.setItem(lsKeyName, flag ? "1" : "0");
        }
        return flag;
    }

    function hideByOSHandler(event) {
        const btn = document.getElementById("hideByOS");
        if (!btn) {
            return;
        }
        const flag = lsCheckSetBoolean(event, lsKeys.hideByOS);
        const playBtnsWrapper = document.getElementById(playBtnsWrapperId);
        const buttonEleArr = playBtnsWrapper.querySelectorAll("button");
        buttonEleArr.forEach(btnEle => {
            const btn = playBtns.find(btn => btn.id === btnEle.id);
            const shouldHide = flag && btn.osCheck && !btn.osCheck.some(check => check());
            console.log(`${btn.id} Should Hide: ${shouldHide}`);
            btnEle.style.display = shouldHide ? 'none' : 'block';
        });
        btn.classList.toggle("button-submit", flag);
    }

    function iconOnlyHandler(event) {
        const btn = document.getElementById("iconOnly");
        if (!btn) {
            return;
        }
        const flag = lsCheckSetBoolean(event, lsKeys.iconOnly);
        const playBtnsWrapper = document.getElementById(playBtnsWrapperId);
        const spans = playBtnsWrapper.querySelectorAll("span");
        spans.forEach(span => {
            span.hidden = flag;
        });
        const iArr = playBtnsWrapper.querySelectorAll("i");
        iArr.forEach(iEle => {
            iEle.classList.toggle("button-icon-left", !flag);
        });
        btn.classList.toggle("button-submit", flag);
    }

    function notCurrentPotHandler(event) {
        const btn = document.getElementById("notCurrentPot");
        if (!btn) {
            return;
        }
        const flag = lsCheckSetBoolean(event, lsKeys.notCurrentPot);
        btn.classList.toggle("button-submit", flag);
    }

    function strmDirectHandler(event) {
        const btn = document.getElementById("strmDirect");
        if (!btn) {
            return;
        }
        const flag = lsCheckSetBoolean(event, lsKeys.strmDirect);
        btn.classList.toggle("button-submit", flag);
    }

    async function embyCopyUrl() {
        const mediaInfo = await getEmbyMediaInfo();
        const streamUrl = encodeURI(mediaInfo.streamUrl);
        if (await writeClipboard(streamUrl)) {
            console.log(`copyUrl = ${streamUrl}`);
            const textEle = this.querySelector(".button-text");
            if (textEle) {
                const oldText = textEle.innerText;
                textEle.innerText = "✅ Copied!";
                setTimeout(() => {
                    textEle.innerText = oldText;
                }, 2500);
            } else {
                this.innerText = "✅ Copied!";
            }
        }
    }

    async function writeClipboard(text) {
        let flag = false;
        if (navigator.clipboard) {
            // Firefox needs https
            try {
                await navigator.clipboard.writeText(text);
                flag = true;
                console.log("Successfully used navigator.clipboard modern clipboard implementation");
            } catch (error) {
                console.error('Error occurred when copying to clipboard using navigator.clipboard:', error);
            }
        } else {
            flag = writeClipboardLegacy(text);
            console.log("navigator.clipboard modern clipboard implementation not available, using legacy implementation");
        }
        return flag;
    }

    function writeClipboardLegacy(text) {
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.position = 'absolute';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.value = text;
        textarea.select();
        if (document.execCommand('copy', true)) {
            return true;
        }
        return false;
    }

    // emby/jellyfin CustomEvent
    // see: https://github.com/MediaBrowser/emby-web-defaultskin/blob/822273018b82a4c63c2df7618020fb837656868d/nowplaying/videoosd.js#L691
    // monitor dom changements
    document.addEventListener("viewbeforeshow", function (e) {
        console.log("viewbeforeshow", e);
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
                    init();
                    mutation.disconnect();
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