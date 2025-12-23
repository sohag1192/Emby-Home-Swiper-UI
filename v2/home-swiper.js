class HomeSwiper {
    static interval = null;
    static touchStartX = 0;
    static touchEndX = 0;
    static currentSlide = 0;

    static init() {
        console.log('%c[HomeSwiper] Initializing UI...', 'color: #00a4dc; font-weight: bold;');
        
        // 1. Basic Safety Checks
        if (!window.location.href.includes('home')) return;
        
        // 2. Wait for Emby's ApiClient
        if (!window.ApiClient) {
            setTimeout(() => HomeSwiper.init(), 200);
            return;
        }

        this.cleanup();
        this.injectStyles();
        this.mount();
    }

    static cleanup() {
        if (this.interval) clearInterval(this.interval);
        document.querySelectorAll('.misty-banner-wrapper').forEach(e => e.remove());
        const oldStyle = document.getElementById('misty-banner-css');
        if (oldStyle) oldStyle.remove();
    }

    static injectStyles() {
        const css = `
            /* CONTAINER */
            .misty-banner-wrapper {
                width: 100%;
                margin-bottom: 40px;
                position: relative;
                z-index: 0;
                opacity: 0;
                animation: mistyFadeIn 0.8s forwards;
            }
            
            /* ASPECT RATIO BOX (16:9) */
            .misty-banner-ratio {
                position: relative;
                width: 100%;
                padding-top: 56.25%; /* 16:9 Aspect Ratio */
                background: #050505;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            
            @media (min-height: 1000px) {
                .misty-banner-ratio {
                    padding-top: 45%; /* Slightly shorter on huge screens */
                }
            }

            @media (max-width: 700px) {
                .misty-banner-ratio {
                    padding-top: 120%; /* Portrait for mobile */
                    border-radius: 0;
                }
            }

            /* SLIDES */
            .misty-slide {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                opacity: 0;
                transition: opacity 1s ease-in-out;
                z-index: 1;
            }
            
            .misty-slide.active {
                opacity: 1;
                z-index: 2;
            }

            /* KEN BURNS EFFECT (Slow Zoom) */
            .misty-slide-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform: scale(1);
                transition: transform 10s ease-out;
            }
            
            .misty-slide.active .misty-slide-img {
                transform: scale(1.1); /* Zoom in while active */
            }

            /* GRADIENT OVERLAY */
            .misty-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to top,
                    rgba(0,0,0, 0.95) 0%,
                    rgba(0,0,0, 0.6) 40%,
                    rgba(0,0,0, 0.2) 70%,
                    transparent 100%
                );
                z-index: 2;
            }

            /* CONTENT TEXT */
            .misty-content {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 4% 5%;
                z-index: 3;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                text-align: left;
            }

            .misty-title {
                font-family: inherit;
                font-size: clamp(1.5rem, 4vw, 3.5rem);
                font-weight: 800;
                line-height: 1.1;
                color: #fff;
                margin: 0 0 10px 0;
                text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease 0.3s;
            }
            
            .misty-slide.active .misty-title {
                opacity: 1;
                transform: translateY(0);
            }

            .misty-desc {
                font-size: clamp(0.9rem, 1.2vw, 1.2rem);
                color: #e0e0e0;
                max-width: 700px;
                line-height: 1.5;
                margin-bottom: 25px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-shadow: 0 1px 2px rgba(0,0,0,0.8);
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease 0.4s;
            }

            .misty-slide.active .misty-desc {
                opacity: 1;
                transform: translateY(0);
            }

            /* BUTTONS */
            .misty-btn-group {
                display: flex;
                gap: 15px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease 0.5s;
            }

            .misty-slide.active .misty-btn-group {
                opacity: 1;
                transform: translateY(0);
            }

            .misty-play-btn {
                background: #fff;
                color: #000;
                border: none;
                padding: 12px 32px;
                border-radius: 4px;
                font-weight: 700;
                font-size: 1rem;
                cursor: pointer;
                transition: transform 0.2s, background 0.2s;
            }

            .misty-play-btn:hover {
                background: #e6e6e6;
                transform: scale(1.05);
            }

            /* INDICATORS */
            .misty-indicators {
                position: absolute;
                bottom: 30px;
                right: 30px;
                display: flex;
                gap: 8px;
                z-index: 10;
            }
            
            .misty-dot {
                width: 8px;
                height: 8px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .misty-dot.active {
                background: #fff;
                transform: scale(1.3);
                box-shadow: 0 0 10px rgba(255,255,255,0.5);
            }

            @keyframes mistyFadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @media (max-width: 700px) {
                .misty-content { padding: 20px; bottom: 40px; }
                .misty-title { -webkit-line-clamp: 2; overflow: hidden; }
                .misty-desc { -webkit-line-clamp: 2; margin-bottom: 15px; }
                .misty-indicators { right: 50%; transform: translateX(50%); bottom: 15px; }
            }
        `;

        const style = document.createElement('style');
        style.id = 'misty-banner-css';
        style.textContent = css;
        document.head.appendChild(style);
    }

    static async mount() {
        // Find injection point (The most critical step)
        // We look for multiple common Emby containers
        const containers = [
            '.homeSectionsContainer',
            '.page-content',
            '.mainAnimatedPages',
            '.view'
        ];

        let container = null;
        for (const selector of containers) {
            container = document.querySelector(selector);
            if (container) break;
        }

        if (!container) {
            console.log('[HomeSwiper] Container not found, retrying in 500ms...');
            setTimeout(() => this.mount(), 500);
            return;
        }

        // Fetch Data
        const items = await this.fetchItems();
        if (!items.length) return;

        // Build HTML
        const wrapper = document.createElement('div');
        wrapper.className = 'misty-banner-wrapper';
        
        const slidesHtml = items.map((item, i) => {
            const img = this.getImgUrl(item);
            return `
                <div class="misty-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
                    <img class="misty-slide-img" src="${img}" loading="${i === 0 ? 'eager' : 'lazy'}" />
                    <div class="misty-overlay"></div>
                    <div class="misty-content">
                        <h1 class="misty-title">${item.Name}</h1>
                        <p class="misty-desc">${item.Overview || ''}</p>
                        <div class="misty-btn-group">
                            <button class="misty-play-btn" onclick="Emby.Page.showItem('${item.Id}')">
                                &#9658; PLAY
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const dotsHtml = items.map((_, i) => 
            `<div class="misty-dot ${i === 0 ? 'active' : ''}" onclick="HomeSwiper.goTo(${i})"></div>`
        ).join('');

        wrapper.innerHTML = `
            <div class="misty-banner-ratio">
                ${slidesHtml}
                <div class="misty-indicators">${dotsHtml}</div>
            </div>
        `;

        // Inject safely
        if (container.firstChild) {
            container.insertBefore(wrapper, container.firstChild);
        } else {
            container.appendChild(wrapper);
        }

        this.attachEvents(wrapper);
        this.startTimer();
    }

    static async fetchItems() {
        try {
            const userId = ApiClient.getCurrentUserId();
            const res = await ApiClient.getItems(userId, {
                IncludeItemTypes: "Movie,Series",
                SortBy: "Random",
                Recursive: true,
                Fields: "Overview,BackdropImageTags",
                ImageTypes: "Backdrop",
                Limit: 5
            });
            // Filter only items that actually have a backdrop
            return res.Items.filter(i => i.BackdropImageTags && i.BackdropImageTags.length > 0);
        } catch (e) {
            console.error('[HomeSwiper] Fetch failed:', e);
            return [];
        }
    }

    static getImgUrl(item) {
        return ApiClient.getImageUrl(item.Id, {
            type: 'Backdrop',
            tag: item.BackdropImageTags[0],
            maxWidth: 3840, // 4K Request
            quality: 90
        });
    }

    static attachEvents(wrapper) {
        // Touch Swipe
        wrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        wrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            if (this.touchEndX < this.touchStartX - 50) this.next();
            if (this.touchEndX > this.touchStartX + 50) this.prev();
            this.startTimer(); // reset timer on interaction
        }, {passive: true});

        // Pause on hover
        wrapper.addEventListener('mouseenter', () => clearInterval(this.interval));
        wrapper.addEventListener('mouseleave', () => this.startTimer());
    }

    static goTo(index) {
        const slides = document.querySelectorAll('.misty-slide');
        const dots = document.querySelectorAll('.misty-dot');
        if (!slides.length) return;

        // Wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Updates classes
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        this.currentSlide = index;
    }

    static next() { this.goTo(this.currentSlide + 1); }
    static prev() { this.goTo(this.currentSlide - 1); }

    static startTimer() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.next(), 8000);
    }
}

// --- GLOBAL TRIGGERS ---

// 1. Initial Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HomeSwiper.init());
} else {
    HomeSwiper.init();
}

// 2. Navigation Watcher (The "Fixer")
document.addEventListener('viewshow', (e) => {
    // If we land on home, re-init to ensure banner is there
    if (e.detail.type === 'home' || window.location.hash.indexOf('home') !== -1) {
        // Small delay to let Emby render its own DOM first
        setTimeout(() => HomeSwiper.init(), 100);
    }
});
