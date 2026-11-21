/**
 * ============================================================================
 * Emby & Jellyfin External Player Integration Suite (Pro Cyber-Glass HUD v3.0)
 * Copyright (c) 2026 sohag1192 (https://github.com/sohag1192) / Dev-95-Api
 * All Rights Reserved.
 *
 * GitHub: https://github.com/Dev-95-Api/SN-EMBY-CRX-Emby_UI_Updates_Package
 * Author & Developer: Md Sohag Rana
 * Based on original open-source base by @bpking (https://github.com/bpking1/embyExternalUrl)
 * ============================================================================
 */

// ==UserScript==
// @name         embyLaunchPlayer (Pro Cyber-Glass HUD)
// @namespace    https://github.com/sohag1192/Emby-Home-Swiper-UI
// @version      3.0.0
// @description  Pro UX/UI external direct-stream media player launcher for Emby & Jellyfin Web
// @author       Md Sohag Rana (sohag1192 / Dev-95-Api)
// @copyright    2026, sohag1192 (https://github.com/sohag1192)
// @license      MIT
// @match        *://*/web/index.html*
// @match        *://*/web/
// ==/UserScript==

(function () {
    'use strict';

    const iconConfig = {
        // Icon source: 100% offline embedded vector SVGs for instant zero-latency loading
        removeCustomBtns: false,
    };

    // When enabled, modify direct streaming links to real file names for 3rd-party players
    const useRealFileName = false;

    // Internal constants & storage keys
    let isEmby = "";
    const mark = "embyLaunchPotplayer";
    const playBtnsWrapperId = "ExternalPlayersBtns";
    const lsKeys = {
        iconOnly: `${mark}-iconOnly`,
        hideByOS: `${mark}-hideByOS`,
        notCurrentPot: `${mark}-notCurrentPot`,
        strmDirect: `${mark}-strmDirect`,
        hudCollapsed: `${mark}-hudCollapsed`,
    };

    // Platform detection helpers
    const OS = {
        isAndroid: () => /android/i.test(navigator.userAgent),
        isIOS: () => /iPad|iPhone|iPod/i.test(navigator.userAgent),
        isMacOS: () => /Macintosh|MacIntel/i.test(navigator.userAgent),
        isApple: () => OS.isMacOS() || OS.isIOS(),
        isWindows: () => /compatible|Windows/i.test(navigator.userAgent),
        isMobile: () => OS.isAndroid() || OS.isIOS() || (window.innerWidth <= 768 && !window.matchMedia('(pointer: fine)').matches),
        isUbuntu: () => /Ubuntu/i.test(navigator.userAgent),
        isOthers: () => Object.entries(OS).filter(([key, val]) => key !== 'isOthers').every(([key, val]) => !val()),
    };

    // Supported External Media Players & Target Platforms
    const playBtns = [
        {
            id: "embyPot",
            title: "Potplayer",
            iconId: "icon-PotPlayer",
            onClick: embyPot,
            osCheck: [OS.isWindows],
            accent: "#facc15",
            glowClass: "glow-potplayer",
            badge: "Windows",
        },
        {
            id: "embyVlc",
            title: "VLC",
            iconId: "icon-VLC",
            onClick: embyVlc,
            accent: "#f97316",
            glowClass: "glow-vlc",
            badge: "Universal",
        },
        {
            id: "embyIINA",
            title: "IINA",
            iconId: "icon-IINA",
            onClick: embyIINA,
            osCheck: [OS.isMacOS],
            accent: "#f43f5e",
            glowClass: "glow-iina",
            badge: "macOS",
        },
        {
            id: "embyNPlayer",
            title: "NPlayer",
            iconId: "icon-NPlayer",
            onClick: embyNPlayer,
            accent: "#ef4444",
            glowClass: "glow-nplayer",
            badge: "Universal",
        },
        {
            id: "embyMX",
            title: "MXPlayer",
            iconId: "icon-MXPlayer",
            onClick: embyMX,
            osCheck: [OS.isAndroid],
            accent: "#06b6d4",
            glowClass: "glow-mxplayer",
            badge: "Android",
        },
        {
            id: "embyMXPro",
            title: "MXPlayerPro",
            iconId: "icon-MXPlayerPro",
            onClick: embyMXPro,
            osCheck: [OS.isAndroid],
            accent: "#3b82f6",
            glowClass: "glow-mxpro",
            badge: "Android",
        },
        {
            id: "embyInfuse",
            title: "Infuse",
            iconId: "icon-infuse",
            onClick: embyInfuse,
            osCheck: [OS.isApple],
            accent: "#ff7a00",
            glowClass: "glow-infuse",
            badge: "Apple",
        },
        {
            id: "embyStellarPlayer",
            title: "Stellar Player",
            iconId: "icon-StellarPlayer",
            onClick: embyStellarPlayer,
            osCheck: [OS.isWindows, OS.isMacOS, OS.isAndroid],
            accent: "#8e2de2",
            glowClass: "glow-stellar",
            badge: "Desktop/Mobile",
        },
        {
            id: "embyMPV",
            title: "MPV",
            iconId: "icon-MPV",
            onClick: embyMPV,
            accent: "#a855f7",
            glowClass: "glow-mpv",
            badge: "Universal",
        },
        {
            id: "embyDDPlay",
            title: "DanDan Play",
            iconId: "icon-DDPlay",
            onClick: embyDDPlay,
            osCheck: [OS.isWindows, OS.isAndroid],
            accent: "#4facfe",
            glowClass: "glow-dandan",
            badge: "Anime / Danmaku",
        },
        {
            id: "embyFileball",
            title: "Fileball",
            iconId: "icon-Fileball",
            onClick: embyFileball,
            osCheck: [OS.isApple],
            accent: "#38ef7d",
            glowClass: "glow-fileball",
            badge: "iOS / iPad",
        },
        {
            id: "embyOmniPlayer",
            title: "OmniPlayer",
            iconId: "icon-OmniPlayer",
            onClick: embyOmniPlayer,
            osCheck: [OS.isMacOS],
            accent: "#2193b0",
            glowClass: "glow-omni",
            badge: "macOS",
        },
        {
            id: "embyFigPlayer",
            title: "FigPlayer",
            iconId: "icon-FigPlayer",
            onClick: embyFigPlayer,
            osCheck: [OS.isMacOS],
            accent: "#10b981",
            glowClass: "glow-fig",
            badge: "macOS",
        },
        {
            id: "embySenPlayer",
            title: "SenPlayer",
            iconId: "icon-SenPlayer",
            onClick: embySenPlayer,
            osCheck: [OS.isIOS],
            accent: "#764ba2",
            glowClass: "glow-sen",
            badge: "iOS",
        },
        {
            id: "embyCopyUrl",
            title: "Copy Stream URL",
            iconId: "icon-Copy",
            onClick: embyCopyUrl,
            accent: "#10b981",
            glowClass: "glow-copy",
            badge: "Clipboard",
        },
    ];

    // Pro HUD Settings / Preferences Controls
    const customBtns = [
        {
            id: "hideByOS",
            title: "Filter OS",
            icon: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>`,
            onClick: hideByOSHandler,
        },
        {
            id: "iconOnly",
            title: "Display Mode",
            icon: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
            onClick: iconOnlyHandler,
        },
        {
            id: "notCurrentPot",
            title: "Multi-Pot",
            icon: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>`,
            onClick: notCurrentPotHandler,
        },
        {
            id: "strmDirect",
            title: "STRM Direct",
            desc: "Bypass server proxy and stream directly from source nodes",
            icon: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
            onClick: strmDirectHandler,
        },
    ];

    const fileNameReg = /.*[\\/]|(\?.*)?$/g;
    const selectors = {
        embyMediaInfoDiv: "div[is='emby-scroller']:not(.hide) .mediaInfo:not(.hide)",
        jellfinMediaInfoDiv: ".itemMiscInfo-primary:not(.hide)",
        embyBtnManualRecording: "div[is='emby-scroller']:not(.hide) .btnManualRecording:not(.hide)",
        jellfinBtnCancelTimer: ".btnCancelTimer:not(.hide)",
        embyMainDetailButtons: "div[is='emby-scroller']:not(.hide) .mainDetailButtons",
        jellfinMainDetailButtons: "div.itemDetailPage:not(.hide) div.detailPagePrimaryContainer",
        selectSubtitles: "div[is='emby-scroller']:not(.hide) select.selectSubtitles",
        selectSource: "div[is='emby-scroller']:not(.hide) select.selectSource:not([disabled])",
    };

    /**
     * Pro Toast Notification System
     * Displays non-intrusive floating cyber alerts
     */
    function showToast(message, type = "info", duration = 2400) {
        let toastContainer = document.getElementById("sn-player-toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.id = "sn-player-toast-container";
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement("div");
        toast.className = `sn-player-toast sn-toast-${type}`;

        const iconSvg = type === "success" 
            ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
            : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#06b6d4" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

        toast.innerHTML = `
            <div class="sn-toast-beacon"></div>
            <div class="sn-toast-icon">${iconSvg}</div>
            <div class="sn-toast-msg">${message}</div>
        `;

        toastContainer.appendChild(toast);

        // Tactile haptic tap if supported on mobile
        if (navigator.vibrate) {
            try { navigator.vibrate(type === "success" ? [18, 25, 18] : 15); } catch (e) {}
        }

        // Trigger entrance animation
        requestAnimationFrame(() => {
            toast.classList.add("sn-toast-visible");
        });

        setTimeout(() => {
            toast.classList.remove("sn-toast-visible");
            toast.classList.add("sn-toast-hiding");
            setTimeout(() => toast.remove(), 320);
        }, duration);
    }

    /**
     * Injects Cyber-Glass CSS with Neon Halos & Mobile Touch Optimizations
     */
    function injectStyles() {
        if (document.getElementById("sn-external-player-css")) return;

        const style = document.createElement("style");
        style.id = "sn-external-player-css";
        style.innerHTML = `
            /* ==========================================================================
               Pro Cyber-Glass External Player HUD Theme
               ========================================================================== */
            #ExternalPlayersBtns {
                width: 100% !important;
                margin: 14px 0 10px 0 !important;
                padding: 14px 16px !important;
                border-radius: 16px !important;
                background: linear-gradient(135deg, rgba(13, 20, 36, 0.92) 0%, rgba(18, 27, 49, 0.86) 100%) !important;
                backdrop-filter: blur(24px) saturate(180%) !important;
                -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                border-left: 4px solid #06b6d4 !important;
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 0 25px rgba(6, 182, 212, 0.12) !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 10px !important;
                box-sizing: border-box !important;
                position: relative !important;
                overflow: hidden !important;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }

            /* Ambient Top Edge Highlight */
            #ExternalPlayersBtns::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                height: 1px !important;
                background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.6), rgba(255, 255, 255, 0.3), transparent) !important;
                pointer-events: none !important;
            }

            /* HUD Header Bar */
            .sn-player-hud-header {
                width: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                margin-bottom: 2px !important;
                padding-bottom: 8px !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
                user-select: none !important;
            }
            .sn-player-hud-left {
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                font-size: 12px !important;
                font-weight: 800 !important;
                letter-spacing: 0.9px !important;
                color: #ffffff !important;
                text-transform: uppercase !important;
                font-family: inherit !important;
            }
            .sn-player-hud-beacon {
                position: relative !important;
                width: 9px !important;
                height: 9px !important;
                border-radius: 50% !important;
                background: #10b981 !important;
                box-shadow: 0 0 12px #10b981 !important;
                display: inline-block !important;
                flex-shrink: 0 !important;
            }
            .sn-player-hud-beacon::after {
                content: '' !important;
                position: absolute !important;
                top: -3px !important;
                left: -3px !important;
                right: -3px !important;
                bottom: -3px !important;
                border-radius: 50% !important;
                border: 1.5px solid rgba(16, 185, 129, 0.6) !important;
                animation: sn-radar-pulse 2s infinite cubic-bezier(0.25, 1, 0.5, 1) !important;
            }
            @keyframes sn-radar-pulse {
                0% { transform: scale(0.8); opacity: 1; }
                100% { transform: scale(2.4); opacity: 0; }
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
                background: rgba(6, 182, 212, 0.14) !important;
                border: 1px solid rgba(6, 182, 212, 0.35) !important;
                border-radius: 6px !important;
                padding: 2.5px 8px !important;
                letter-spacing: 0.6px !important;
                text-transform: uppercase !important;
                white-space: nowrap !important;
            }
            .sn-player-hud-tag-green {
                color: #10b981 !important;
                background: rgba(16, 185, 129, 0.14) !important;
                border-color: rgba(16, 185, 129, 0.35) !important;
            }
            .sn-player-hud-tag-purple {
                color: #a855f7 !important;
                background: rgba(168, 85, 247, 0.14) !important;
                border-color: rgba(168, 85, 247, 0.35) !important;
            }

            /* Responsive Player Grid */
            .sn-player-grid {
                width: 100% !important;
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(136px, 1fr)) !important;
                gap: 10px !important;
                box-sizing: border-box !important;
                transition: all 0.25s ease !important;
            }

            /* Acrylic Glass Buttons */
            #ExternalPlayersBtns .detailButton {
                background: rgba(255, 255, 255, 0.06) !important;
                backdrop-filter: blur(14px) !important;
                -webkit-backdrop-filter: blur(14px) !important;
                border: 1px solid rgba(255, 255, 255, 0.14) !important;
                border-radius: 12px !important;
                color: #ffffff !important;
                font-weight: 700 !important;
                font-size: 13px !important;
                height: 42px !important;
                padding: 0 12px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 8px !important;
                transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3) !important;
                cursor: pointer !important;
                font-family: inherit !important;
                width: 100% !important;
                box-sizing: border-box !important;
                margin: 0 !important;
                position: relative !important;
                overflow: hidden !important;
                -webkit-tap-highlight-color: transparent !important;
                user-select: none !important;
            }

            /* Shimmer Surface Reflection */
            #ExternalPlayersBtns .detailButton::after {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 60% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent) !important;
                transform: skewX(-20deg) !important;
                transition: none !important;
                pointer-events: none !important;
            }
            #ExternalPlayersBtns .detailButton:hover::after {
                left: 180% !important;
                transition: all 0.65s ease-in-out !important;
            }

            #ExternalPlayersBtns .detailButton:hover {
                transform: translateY(-2px) scale(1.02) !important;
                background: rgba(255, 255, 255, 0.16) !important;
                filter: brightness(1.1) !important;
            }
            #ExternalPlayersBtns .detailButton:active {
                transform: translateY(0) scale(0.97) !important;
                filter: brightness(0.95) !important;
            }

            /* Branded Neon Hover Halos */
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
            #ExternalPlayersBtns #embyNPlayer:hover {
                border-color: rgba(239, 68, 68, 0.85) !important;
                box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35) !important;
            }
            #ExternalPlayersBtns #embyInfuse:hover {
                border-color: rgba(255, 122, 0, 0.85) !important;
                box-shadow: 0 8px 24px rgba(255, 122, 0, 0.35) !important;
            }
            #ExternalPlayersBtns #embyStellarPlayer:hover {
                border-color: rgba(142, 45, 226, 0.85) !important;
                box-shadow: 0 8px 24px rgba(142, 45, 226, 0.35) !important;
            }
            #ExternalPlayersBtns #embyDDPlay:hover {
                border-color: rgba(79, 172, 254, 0.85) !important;
                box-shadow: 0 8px 24px rgba(79, 172, 254, 0.35) !important;
            }
            #ExternalPlayersBtns #embyFileball:hover {
                border-color: rgba(56, 239, 125, 0.85) !important;
                box-shadow: 0 8px 24px rgba(56, 239, 125, 0.35) !important;
            }
            #ExternalPlayersBtns #embySenPlayer:hover {
                border-color: rgba(118, 75, 162, 0.85) !important;
                box-shadow: 0 8px 24px rgba(118, 75, 162, 0.35) !important;
            }

            /* Full-Width Prominent "Copy Stream URL" Hero Bar */
            #ExternalPlayersBtns #embyCopyUrl {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.22) 100%) !important;
                border: 1px solid rgba(16, 185, 129, 0.45) !important;
                grid-column: 1 / -1 !important;
                width: 100% !important;
            }
            #ExternalPlayersBtns #embyCopyUrl:hover {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.36) 100%) !important;
                border-color: rgba(16, 185, 129, 0.9) !important;
                box-shadow: 0 8px 26px rgba(16, 185, 129, 0.45) !important;
            }

            #ExternalPlayersBtns .detailButton-content {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 8px !important;
                max-width: 100% !important;
            }
            #ExternalPlayersBtns .button-text {
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
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
                flex-shrink: 0 !important;
            }

            /* Bottom Preferences Toolbar */
            .sn-player-hud-toolbar {
                width: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: flex-start !important;
                flex-wrap: wrap !important;
                gap: 6px !important;
                margin-top: 4px !important;
                padding-top: 8px !important;
                border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            }
            .sn-player-hud-tool-label {
                font-size: 10px !important;
                font-weight: 700 !important;
                color: rgba(255, 255, 255, 0.45) !important;
                letter-spacing: 0.8px !important;
                text-transform: uppercase !important;
                margin-right: 4px !important;
                user-select: none !important;
            }
            #ExternalPlayersBtns .sn-player-tool-btn {
                height: 28px !important;
                padding: 0 10px !important;
                font-size: 11px !important;
                font-weight: 600 !important;
                border-radius: 14px !important;
                background: rgba(255, 255, 255, 0.05) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                color: rgba(255, 255, 255, 0.75) !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
                box-shadow: none !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                font-family: inherit !important;
                user-select: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            #ExternalPlayersBtns .sn-player-tool-btn:hover {
                background: rgba(255, 255, 255, 0.12) !important;
                color: #ffffff !important;
                border-color: rgba(6, 182, 212, 0.4) !important;
            }
            #ExternalPlayersBtns .sn-player-tool-btn.button-submit,
            #ExternalPlayersBtns .sn-player-tool-btn.is-active {
                background: rgba(6, 182, 212, 0.18) !important;
                border-color: rgba(6, 182, 212, 0.6) !important;
                color: #38bdf8 !important;
            }

            /* Hidden elements helper */
            #ExternalPlayersBtns .sn-hidden,
            #ExternalPlayersBtns .detailButton.sn-hidden,
            #ExternalPlayersBtns .sn-player-tool-btn.sn-hidden {
                display: none !important;
            }

            /* Icon-Only Compact Mode */
            #ExternalPlayersBtns.is-icon-only .sn-player-grid {
                grid-template-columns: repeat(auto-fill, minmax(46px, 1fr)) !important;
            }
            #ExternalPlayersBtns.is-icon-only .detailButton {
                padding: 0 !important;
                width: 46px !important;
                height: 42px !important;
                justify-content: center !important;
            }
            #ExternalPlayersBtns.is-icon-only #embyCopyUrl {
                grid-column: auto !important;
                width: 46px !important;
            }

            /* Collapsible HUD Mode */
            #ExternalPlayersBtns.is-collapsed .sn-player-grid,
            #ExternalPlayersBtns.is-collapsed .sn-player-hud-toolbar {
                display: none !important;
            }
            .sn-player-hud-toggle {
                cursor: pointer !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 22px !important;
                height: 22px !important;
                border-radius: 6px !important;
                background: rgba(255, 255, 255, 0.08) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                color: rgba(255, 255, 255, 0.8) !important;
                transition: transform 0.25s ease !important;
            }
            #ExternalPlayersBtns.is-collapsed .sn-player-hud-toggle {
                transform: rotate(-90deg) !important;
            }

            /* Mobile Responsive Layout (< 768px) */
            @media (max-width: 768px) {
                #ExternalPlayersBtns {
                    margin: 10px 0 8px 0 !important;
                    padding: 12px 14px !important;
                    border-radius: 14px !important;
                    gap: 8px !important;
                }
                .sn-player-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 8px !important;
                }
                #ExternalPlayersBtns .detailButton {
                    height: 40px !important;
                    padding: 0 8px !important;
                    font-size: 12px !important;
                    border-radius: 10px !important;
                    gap: 6px !important;
                }
                #ExternalPlayersBtns .detailButton-icon {
                    width: 19px !important;
                    height: 19px !important;
                    min-width: 19px !important;
                    min-height: 19px !important;
                }
                .sn-player-hud-header {
                    gap: 6px !important;
                }
                .sn-player-hud-left {
                    font-size: 11px !important;
                    letter-spacing: 0.6px !important;
                }
                .sn-player-hud-tag {
                    font-size: 9px !important;
                    padding: 1.5px 6px !important;
                }
                .sn-player-hud-toolbar {
                    gap: 5px !important;
                    padding-top: 6px !important;
                }
                #ExternalPlayersBtns .sn-player-tool-btn {
                    height: 26px !important;
                    padding: 0 8px !important;
                    font-size: 10.5px !important;
                }
            }

            @media (max-width: 380px) {
                #ExternalPlayersBtns {
                    padding: 10px 10px !important;
                }
                .sn-player-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 6px !important;
                }
                #ExternalPlayersBtns .detailButton {
                    font-size: 11px !important;
                    height: 38px !important;
                    padding: 0 6px !important;
                }
            }

            /* Pro Cyber Toast Alert Styles */
            #sn-player-toast-container {
                position: fixed !important;
                top: 24px !important;
                right: 24px !important;
                z-index: 999999 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 10px !important;
                pointer-events: none !important;
            }
            .sn-player-toast {
                display: inline-flex !important;
                align-items: center !important;
                gap: 10px !important;
                padding: 10px 18px !important;
                border-radius: 14px !important;
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 28, 48, 0.90) 100%) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(255, 255, 255, 0.16) !important;
                border-left: 4px solid #06b6d4 !important;
                box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.25) !important;
                color: #ffffff !important;
                font-size: 13px !important;
                font-weight: 700 !important;
                font-family: inherit !important;
                pointer-events: auto !important;
                transform: translateX(120%) scale(0.9) !important;
                opacity: 0 !important;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            .sn-player-toast.sn-toast-success {
                border-left-color: #10b981 !important;
                box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.25) !important;
            }
            .sn-player-toast.sn-toast-visible {
                transform: translateX(0) scale(1) !important;
                opacity: 1 !important;
            }
            .sn-player-toast.sn-toast-hiding {
                transform: translateY(-20px) scale(0.9) !important;
                opacity: 0 !important;
            }
            .sn-toast-beacon {
                width: 8px !important;
                height: 8px !important;
                border-radius: 50% !important;
                background: #06b6d4 !important;
                box-shadow: 0 0 10px #06b6d4 !important;
            }
            .sn-toast-success .sn-toast-beacon {
                background: #10b981 !important;
                box-shadow: 0 0 10px #10b981 !important;
            }
            @media (max-width: 600px) {
                #sn-player-toast-container {
                    top: 16px !important;
                    right: 16px !important;
                    left: 16px !important;
                    align-items: center !important;
                }
                .sn-player-toast {
                    width: 100% !important;
                    justify-content: center !important;
                    font-size: 12px !important;
                    padding: 8px 14px !important;
                }
            }
        `;
        (document.head || document.body).appendChild(style);
    }

    /**
     * Initializes the Pro Cyber-Glass HUD inside Emby/Jellyfin item detail page
     */
    function init() {
        injectStyles();

        let playBtnsWrapper = document.getElementById(playBtnsWrapperId);
        if (playBtnsWrapper) {
            playBtnsWrapper.remove();
        }

        let mainDetailButtons = document.querySelector(selectors.embyMainDetailButtons);

        function generateButtonHTML({ id, title, desc, iconId, badge }) {
            return `
                <button
                    id="${id}"
                    type="button"
                    class="detailButton emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary"
                    title="${desc ? desc : `${title} (${badge || 'External Player'})`}"
                >
                    <div class="detailButton-content">
                        <i class="md-icon detailButton-icon button-icon button-icon-left material-icons" id="${iconId}">　</i>
                        <span class="button-text">${title}</span>
                    </div>
                </button>
            `;
        }

        function generateToolButtonHTML({ id, title, desc, icon }) {
            return `
                <button
                    id="${id}"
                    type="button"
                    class="sn-player-tool-btn emby-button"
                    title="${desc ? desc : title}"
                >
                    ${icon ? icon : ''}
                    <span class="tool-text">${title}</span>
                </button>
            `;
        }

        const isCollapsed = localStorage.getItem(lsKeys.hudCollapsed) === "1";

        let buttonHtml = `
            <div id="${playBtnsWrapperId}" class="detailButtons detail-lineItem ${isCollapsed ? 'is-collapsed' : ''}">
                <div class="sn-player-hud-header">
                    <div class="sn-player-hud-left">
                        <span class="sn-player-hud-beacon"></span>
                        <span>DIRECT STREAM PLAYERS</span>
                    </div>
                    <div class="sn-player-hud-badges">
                        <span class="sn-player-hud-tag sn-player-hud-tag-green">ZERO TRANSCODE</span>
                        <span class="sn-player-hud-tag">100% BITRATE</span>
                        <span class="sn-player-hud-tag sn-player-hud-tag-purple">LOSSLESS AUDIO</span>
                        <button type="button" class="sn-player-hud-toggle" id="snHudToggle" title="Toggle HUD visibility">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                    </div>
                </div>
                <div class="sn-player-grid">
        `;

        playBtns.forEach(btn => {
            buttonHtml += generateButtonHTML(btn);
        });
        buttonHtml += `</div>`;

        if (!iconConfig.removeCustomBtns) {
            buttonHtml += `
                <div class="sn-player-hud-toolbar">
                    <span class="sn-player-hud-tool-label">PREFERENCES:</span>
            `;
            customBtns.forEach(btn => {
                buttonHtml += generateToolButtonHTML(btn);
            });
            buttonHtml += `</div>`;
        }

        buttonHtml += `</div>`;

        if (!isEmby) {
            mainDetailButtons = document.querySelector(selectors.jellfinMainDetailButtons);
        }

        if (!mainDetailButtons) {
            mainDetailButtons = document.querySelector(".mainDetailButtons, .detailPagePrimaryContainer");
        }
        if (!mainDetailButtons) return;

        mainDetailButtons.insertAdjacentHTML("afterend", buttonHtml);

        if (!isEmby) {
            let playBtnsWrapper = document.getElementById("ExternalPlayersBtns");
            if (playBtnsWrapper) {
                playBtnsWrapper.style.display = "flex";
                playBtnsWrapper.classList.add("detailPagePrimaryContainer");
                let btns = playBtnsWrapper.getElementsByTagName("button");
                for (let i = 0; i < btns.length; i++) {
                    btns[i].classList.add("button-flat");
                }
            }
        }

        // Collapse / Expand Toggle Listener
        const toggleBtn = document.getElementById("snHudToggle");
        if (toggleBtn) {
            toggleBtn.onclick = function (e) {
                e.stopPropagation();
                const hud = document.getElementById(playBtnsWrapperId);
                if (hud) {
                    const collapsed = hud.classList.toggle("is-collapsed");
                    localStorage.setItem(lsKeys.hudCollapsed, collapsed ? "1" : "0");
                    showToast(collapsed ? "External Player HUD Minimized" : "External Player HUD Expanded", "info");
                }
            };
        }

        // Attach event listeners for player buttons
        playBtns.forEach(btn => {
            const btnEle = document.querySelector(`#${btn.id}`);
            if (btnEle) {
                btnEle.onclick = btn.onClick;
            }
        });

        // Attach event listeners for toolbar controls
        if (!iconConfig.removeCustomBtns) {
            customBtns.forEach(btn => {
                const btnEle = document.querySelector(`#${btn.id}`);
                if (btnEle) {
                    btnEle.onclick = btn.onClick;
                }
            });
        }

        // Map offline Vector SVG icons
        const iconsExt = getIconsExt();
        playBtns.forEach(btn => {
            const element = document.querySelector(`#${btn.iconId}`);
            if (element && iconsExt[btn.iconId]) {
                element.style.cssText += `
                    background-image: url('${iconsExt[btn.iconId]}');
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    width: 22px;
                    height: 22px;
                    display: inline-block;
                    vertical-align: middle;
                    border-radius: 6px;
                `;
            }
        });

        // Initialize state handlers
        if (!iconConfig.removeCustomBtns) {
            hideByOSHandler();
            iconOnlyHandler();
            notCurrentPotHandler();
            strmDirectHandler();
        }
    }

    /**
     * 100% Offline Vector SVG Icons
     * Ultra-sharp on Retina / 4K displays with zero external CDN dependency
     */
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
            "icon-Copy": "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="cpg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#cpg)"/><rect x="20" y="24" width="24" height="26" rx="4" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M26 24V18a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M28 36l3 3 6-7" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
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

        if (response.Type == "Series") {
            let seriesNextUpItems = await ApiClient.getNextUpEpisodes({ SeriesId: itemId, UserId: userId });
            if (seriesNextUpItems.Items.length > 0) {
                return await ApiClient.getItem(userId, seriesNextUpItems.Items[0].Id);
            }
        }
        if (response.Type == "Season") {
            let seasonItems = await ApiClient.getItems(userId, { parentId: itemId });
            return await ApiClient.getItem(userId, seasonItems.Items[0].Id);
        }
        if (response.MediaSources?.length > 0) {
            return response;
        }
        let firstItems = await ApiClient.getItems(userId, { parentId: itemId, Recursive: true, IsFolder: false, Limit: 1 });
        return await ApiClient.getItem(userId, firstItems.Items[0].Id);
    }

    function getSeek(position) {
        let ticks = position * 10000;
        let parts = [], hours = ticks / 36e9;
        (hours = Math.floor(hours)) && parts.push(hours);
        let minutes = (ticks -= 36e9 * hours) / 6e8;
        ticks -= 6e8 * (minutes = Math.floor(minutes)),
            minutes < 10 && hours && (minutes = "0" + minutes),
            parts.push(minutes);
        let seconds = ticks / 1e7;
        return (seconds = Math.floor(seconds)) < 10 && (seconds = "0" + seconds),
            parts.push(seconds),
            parts.join(":");
    }

    function getSubPath(mediaSource) {
        let selectSubtitles = document.querySelector(selectors.selectSubtitles);
        let subTitlePath = '';
        if (selectSubtitles && selectSubtitles.value > 0) {
            let SubIndex = mediaSource.MediaStreams.findIndex(m => m.Index == selectSubtitles.value && m.IsExternal);
            if (SubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[SubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${selectSubtitles.value}/Stream.${subtitleCodec}`;
            }
        } else {
            let chiSubIndex = mediaSource.MediaStreams.findIndex(m => m.Language == "chi" && m.IsExternal);
            if (chiSubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[chiSubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${chiSubIndex}/Stream.${subtitleCodec}`;
            } else {
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
                    streamUrl += useRealFileName ? `stream/${fileName}` : `stream.${mediaSource.Container}`;
                }
            } else {
                streamUrl += `Download`;
                streamUrl += useRealFileName ? `/${fileName}` : "";
            }
            streamUrl += `?api_key=${accessToken}&Static=true&MediaSourceId=${mediaSourceId}&DeviceId=${ApiClient._deviceId}`;
        }
        let position = parseInt(itemInfo.UserData?.PlaybackPositionTicks / 10000 || 0);
        let intent = await getIntent(mediaSource, position);
        return {
            streamUrl: streamUrl,
            subUrl: subUrl,
            intent: intent,
        };
    }

    async function getIntent(mediaSource, position) {
        let title = mediaSource.IsInfiniteStream
            ? mediaSource.Name
            : decodeURIComponent(mediaSource.Path.replace(fileNameReg, ""));
        let externalSubs = mediaSource.MediaStreams.filter(m => m.IsExternal == true);
        let subs = '', subs_name = '', subs_filename = '', subs_enable = '';
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

    /* -------------------------------------------------------------------------- */
    /* Player Launch Protocol Handlers with Pro Feedback                          */
    /* -------------------------------------------------------------------------- */

    async function embyPot() {
        showToast("🚀 Launching PotPlayer...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const intent = mediaInfo.intent;
        const notCurrentPotArg = localStorage.getItem(lsKeys.notCurrentPot) === "1" ? "" : "/current";
        let potUrl = `potplayer://${encodeURI(mediaInfo.streamUrl)} /sub=${encodeURI(mediaInfo.subUrl)} ${notCurrentPotArg} /seek=${getSeek(intent.position)} /title="${intent.title}"`;
        await writeClipboard(potUrl);
        potUrl = `potplayer://${notCurrentPotArg}/clipboard`;
        window.open(potUrl, "_self");
    }

    async function embyVlc() {
        showToast("🚀 Launching VLC Media Player...", "info");
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        let vlcUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=org.videolan.vlc;type=video/*;S.subtitles_location=${encodeURI(mediaInfo.subUrl)};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        if (OS.isWindows() || OS.isMacOS()) {
            vlcUrl = `vlc://${encodeURI(mediaInfo.streamUrl)}`;
        }
        if (OS.isIOS()) {
            vlcUrl = `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        }
        window.open(vlcUrl, "_self");
    }

    async function embyMPV() {
        showToast("🚀 Launching MPV Player...", "info");
        let mediaInfo = await getEmbyMediaInfo();
        let streamUrl64 = btoa(String.fromCharCode.apply(null, new Uint8Array(new TextEncoder().encode(mediaInfo.streamUrl))))
            .replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
        let MPVUrl = `mpv://play/${streamUrl64}`;
        if (mediaInfo.subUrl.length > 0) {
            let subUrl64 = btoa(mediaInfo.subUrl).replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
            MPVUrl = `mpv://play/${streamUrl64}/?subfile=${subUrl64}`;
        }
        if (OS.isIOS() || OS.isAndroid()) {
            MPVUrl = `mpv-handler://${encodeURI(mediaInfo.streamUrl)}`;
        }
        if (OS.isMacOS()) {
            MPVUrl = `mpvplay://${encodeURI(mediaInfo.streamUrl)}`;
        }
        window.open(MPVUrl, "_self");
    }

    async function embyIINA() {
        showToast("🚀 Launching IINA on macOS...", "info");
        let mediaInfo = await getEmbyMediaInfo();
        let iinaUrl = `iina://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1`;
        window.open(iinaUrl, "_self");
    }

    async function embyMX() {
        showToast("🚀 Launching MX Player on Android...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const intent = mediaInfo.intent;
        const packageName = "com.mxtech.videoplayer.ad";
        const url = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=${packageName};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        window.open(url, "_self");
    }

    async function embyMXPro() {
        showToast("🚀 Launching MX Player Pro...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const intent = mediaInfo.intent;
        const packageName = "com.mxtech.videoplayer.pro";
        const url = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=${packageName};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        window.open(url, "_self");
    }

    async function embyNPlayer() {
        showToast("🚀 Launching nPlayer...", "info");
        let mediaInfo = await getEmbyMediaInfo();
        let nUrl = OS.isMacOS()
            ? `nplayer-mac://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1` 
            : `nplayer-${encodeURI(mediaInfo.streamUrl)}`;
        window.open(nUrl, "_self");
    }

    async function embyInfuse() {
        showToast("🚀 Launching Infuse Player...", "info");
        let mediaInfo = await getEmbyMediaInfo();
        let infuseUrl = `infuse://x-callback-url/play?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        window.open(infuseUrl, "_self");
    }

    async function embyStellarPlayer() {
        showToast("🚀 Launching Stellar Player...", "info");
        let mediaInfo = await getEmbyMediaInfo();
        let stellarPlayerUrl = `stellar://play/${encodeURI(mediaInfo.streamUrl)}`;
        window.open(stellarPlayerUrl, "_self");
    }

    async function embyDDPlay() {
        showToast("🚀 Launching DanDan Play...", "info");
        const fullPathEle = document.querySelector(".mediaSources .mediaSource .sectionTitle > div:not([class]):first-child");
        let fullPath = fullPathEle ? fullPathEle.innerText : "";
        let ddplayUrl;
        if (new RegExp('^[a-zA-Z]:').test(fullPath)) {
            ddplayUrl = `ddplay:${encodeURIComponent(fullPath)}`;
        } else {
            const mediaInfo = await getEmbyMediaInfo();
            const intent = mediaInfo.intent;
            if (!fullPath) fullPath = intent.title;
            const urlPart = mediaInfo.streamUrl + `|filePath=${fullPath}`;
            ddplayUrl = `ddplay:${encodeURIComponent(urlPart)}`;
            if (OS.isAndroid()) {
                ddplayUrl = `intent:${encodeURI(urlPart)}#Intent;package=com.xyoye.dandanplay;type=video/*;end`;
            }
        }
        window.open(ddplayUrl, "_self");
    }

    async function embyFileball() {
        showToast("🚀 Launching Fileball...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const url = `filebox://play?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        window.open(url, "_self");
    }

    async function embyOmniPlayer() {
        showToast("🚀 Launching OmniPlayer...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const url = `omniplayer://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        window.open(url, "_self");
    }

    async function embyFigPlayer() {
        showToast("🚀 Launching FigPlayer...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const url = `figplayer://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        window.open(url, "_self");
    }

    async function embySenPlayer() {
        showToast("🚀 Launching SenPlayer...", "info");
        const mediaInfo = await getEmbyMediaInfo();
        const url = `SenPlayer://x-callback-url/play?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        window.open(url, "_self");
    }

    /**
     * Universal Direct Stream URL Copy Action
     */
    async function embyCopyUrl() {
        try {
            const mediaInfo = await getEmbyMediaInfo();
            const streamUrl = encodeURI(mediaInfo.streamUrl);
            if (await writeClipboard(streamUrl)) {
                showToast("📋 Stream URL Copied to Clipboard!", "success");
                const textEle = this.querySelector(".button-text");
                if (textEle) {
                    const oldText = textEle.innerText;
                    textEle.innerText = "✅ Stream URL Copied!";
                    setTimeout(() => { textEle.innerText = oldText; }, 2500);
                }
            }
        } catch (err) {
            showToast("Failed to generate stream link", "info");
            console.error(err);
        }
    }

    /* -------------------------------------------------------------------------- */
    /* Preferences & Storage Handlers                                            */
    /* -------------------------------------------------------------------------- */

    function lsCheckSetBoolean(event, lsKeyName, defaultVal = false) {
        let val = localStorage.getItem(lsKeyName);
        let flag = val !== null ? val === "1" : defaultVal;
        if (event) {
            flag = !flag;
            localStorage.setItem(lsKeyName, flag ? "1" : "0");
        }
        return flag;
    }

    function hideByOSHandler(event) {
        const btn = document.getElementById("hideByOS");
        if (!btn) return;
        const flag = lsCheckSetBoolean(event, lsKeys.hideByOS, true);
        const playBtnsWrapper = document.getElementById(playBtnsWrapperId);
        if (!playBtnsWrapper) return;

        const buttonEleArr = playBtnsWrapper.querySelectorAll(".sn-player-grid button");
        buttonEleArr.forEach(btnEle => {
            const btnObj = playBtns.find(b => b.id === btnEle.id);
            if (!btnObj) return;
            const shouldHide = Boolean(flag && btnObj.osCheck && !btnObj.osCheck.some(check => check()));
            btnEle.classList.toggle("sn-hidden", shouldHide);
        });

        btn.classList.toggle("button-submit", flag);
        const toolText = btn.querySelector(".tool-text");
        if (toolText) {
            toolText.innerText = flag ? "OS Filter: Active" : "All Players";
        }
        if (event) {
            showToast(flag ? "⚡ OS Filter Active: Showing Native Players" : "🌐 Cross-Platform: Showing All Players", "info");
        }
    }

    function iconOnlyHandler(event) {
        const btn = document.getElementById("iconOnly");
        if (!btn) return;
        const flag = lsCheckSetBoolean(event, lsKeys.iconOnly, false);
        const playBtnsWrapper = document.getElementById(playBtnsWrapperId);
        if (!playBtnsWrapper) return;

        playBtnsWrapper.classList.toggle("is-icon-only", flag);
        const spans = playBtnsWrapper.querySelectorAll(".sn-player-grid .button-text");
        spans.forEach(span => {
            span.classList.toggle("sn-hidden", flag);
        });
        const iArr = playBtnsWrapper.querySelectorAll(".sn-player-grid i");
        iArr.forEach(iEle => {
            iEle.classList.toggle("button-icon-left", !flag);
        });
        btn.classList.toggle("button-submit", flag);
        if (event) {
            showToast(flag ? "🔲 Switched to Icon Capsule Mode" : "📄 Switched to Detailed Cards Mode", "info");
        }
    }

    function notCurrentPotHandler(event) {
        const btn = document.getElementById("notCurrentPot");
        if (!btn) return;
        if (!OS.isWindows()) {
            btn.classList.add("sn-hidden");
            return;
        }
        const flag = lsCheckSetBoolean(event, lsKeys.notCurrentPot, false);
        btn.classList.toggle("button-submit", flag);
        if (event) {
            showToast(flag ? "🗔 Multi-Instance PotPlayer Enabled" : "🗔 Single PotPlayer Instance Mode", "info");
        }
    }

    function strmDirectHandler(event) {
        const btn = document.getElementById("strmDirect");
        if (!btn) return;
        const flag = lsCheckSetBoolean(event, lsKeys.strmDirect, false);
        btn.classList.toggle("button-submit", flag);
        if (event) {
            showToast(flag ? "🔗 STRM Direct Stream Enabled" : "🛡️ Standard Server Stream Enabled", "info");
        }
    }

    /* -------------------------------------------------------------------------- */
    /* Clipboard Helper                                                           */
    /* -------------------------------------------------------------------------- */

    async function writeClipboard(text) {
        let flag = false;
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                flag = true;
            } catch (error) {
                console.warn("navigator.clipboard failed, attempting legacy clipboard fallback", error);
            }
        }
        if (!flag) {
            flag = writeClipboardLegacy(text);
        }
        return flag;
    }

    function writeClipboardLegacy(text) {
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.value = text;
        textarea.select();
        try {
            return document.execCommand('copy', true);
        } catch (e) {
            return false;
        } finally {
            textarea.remove();
        }
    }

    /* -------------------------------------------------------------------------- */
    /* Emby & Jellyfin Route Listener Lifecycle                                   */
    /* -------------------------------------------------------------------------- */

    document.addEventListener("viewbeforeshow", function (e) {
        if (isEmby === "") {
            isEmby = !!e.detail?.contextPath;
        }
        let isItemDetailPage;
        if (isEmby) {
            isItemDetailPage = e.detail?.contextPath?.startsWith("/item?id=");
        } else {
            isItemDetailPage = e.detail?.params && e.detail.params.id;
        }

        if (isItemDetailPage) {
            const mutation = new MutationObserver(function () {
                if (showFlag()) {
                    init();
                    mutation.disconnect();
                }
            });
            mutation.observe(document.body, {
                childList: true,
                characterData: true,
                subtree: true,
            });
        }
    });

})();
