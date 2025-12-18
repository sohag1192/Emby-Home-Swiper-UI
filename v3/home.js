class HomeSwiper {
    static init() {
        console.log('HomeSwiper Cinematic initializing...');
        
        if (!window.location.hash.includes('#!/home')) return;

        if (!window.ApiClient) {
            setTimeout(() => HomeSwiper.init(), 100);
            return;
        }

        this.setupCinematicStyles();
        this.setupBanner();
    }

    static setupCinematicStyles() {
        const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

        /* --- BANNER LAYOUT --- */
        .misty-home-banner {
            position: relative;
            width: 100%;
            height: 85vh; /* Increased height to fit library slider */
            max-height: 1000px;
            min-height: 650px;
            overflow: hidden;
            background: #000;
            margin-bottom: 40px;
            box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        .misty-banner-slides { width: 100%; height: 100%; position: relative; }
        
        .misty-banner-slide {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0; transition: opacity 0.8s ease-in-out; z-index: 1;
        }
        
        .misty-banner-slide.active { opacity: 1; z-index: 2; }
        
        .misty-banner-image {
            width: 100%; height: 100%; object-fit: cover; object-position: top center;
            transform: scale(1); transition: transform 10s ease;
        }
        
        .misty-banner-slide.active .misty-banner-image {
            transform: scale(1.1); transition: transform 12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .misty-banner-gradient {
            position: absolute; inset: 0;
            background: linear-gradient(to top, #101010 0%, rgba(16,16,16,0.9) 15%, rgba(16,16,16,0.4) 50%, transparent 100%),
                        linear-gradient(to right, #101010 0%, rgba(16,16,16,0.7) 30%, transparent 70%);
            z-index: 2;
        }
        
        .misty-banner-content {
            position: absolute; bottom: 22%; /* Moved up for library slider */
            left: 6%; width: 45%; z-index: 3; color: white;
            display: flex; flex-direction: column; gap: 20px;
        }

        .misty-banner-slide.active .misty-animate-in {
            animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            opacity: 0; transform: translateY(30px);
        }
        
        /* --- LOGO & TEXT --- */
        .misty-logo-container {
            max-width: 600px; width: 100%; height: auto; max-height: 250px;
            margin-bottom: 10px; transform-origin: left bottom;
            display: flex; align-items: flex-end;
        }

        .misty-banner-logo {
            width: auto; height: auto; max-width: 100%; max-height: 100%;
            object-fit: contain; object-position: left bottom;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
        }
        
        .misty-banner-title-text {
            font-size: 4rem; font-weight: 800; line-height: 1.1;
            text-shadow: 0 4px 20px rgba(0,0,0,0.8); margin: 0; letter-spacing: -1px;
        }
        
        .misty-banner-meta {
            display: flex; align-items: center; gap: 15px; font-size: 1.1em;
            font-weight: 600; color: rgba(255,255,255,0.95); text-shadow: 0 2px 4px rgba(0,0,0,0.8);
            flex-wrap: wrap;
        }

        .misty-meta-tag {
            padding: 4px 10px; border: 1px solid rgba(255,255,255,0.4); border-radius: 4px;
            font-size: 0.8em; background: rgba(0,0,0,0.3); white-space: nowrap;
        }

        .misty-banner-description {
            font-size: 1.25em; line-height: 1.6; color: rgba(255,255,255,0.85);
            text-shadow: 0 2px 4px rgba(0,0,0,0.8); display: -webkit-box;
            -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
            max-width: 800px; font-weight: 400;
        }
        
        .misty-banner-actions { display: flex; gap: 15px; margin-top: 15px; }
        
        /* --- BUTTONS --- */
        .misty-btn {
            border: none; padding: 10px 24px; border-radius: 6px;
            font-size: 1rem; font-weight: 700; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            gap: 8px; transition: all 0.2s ease; white-space: nowrap;
        }
        
        .misty-btn-play {
            background: white; color: black; box-shadow: 0 4px 20px rgba(255,255,255,0.2);
        }
        
        .misty-btn-play:hover { background: rgba(255,255,255,0.9); transform: scale(1.05); }
        
        .misty-btn-more {
            background: rgba(109, 109, 110, 0.7); color: white;
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        }
        
        .misty-btn-more:hover { background: rgba(109, 109, 110, 0.9); transform: scale(1.05); }

        /* --- LIBRARY SLIDER (NEW) --- */
        .misty-library-slider {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            z-index: 10;
            display: flex;
            align-items: center;
            padding: 0 6%;
            gap: 15px;
            overflow-x: auto;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE */
            mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
        }
        
        .misty-library-slider::-webkit-scrollbar { display: none; }

        .misty-library-card {
            flex: 0 0 auto;
            min-width: 140px;
            height: 60px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: white;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0 20px;
            font-weight: 600;
            font-size: 0.95rem;
        }

        .misty-library-card:hover {
            background: rgba(255,255,255,0.25);
            transform: translateY(-5px);
            border-color: rgba(255,255,255,0.5);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        
        .misty-library-icon {
            width: 24px;
            height: 24px;
            opacity: 0.9;
        }

        /* --- NAV & INDICATORS --- */
        .misty-banner-nav {
            position: absolute; top: 0; bottom: 0; width: 80px;
            background: transparent; border: none; color: white;
            font-size: 3rem; cursor: pointer; z-index: 10; opacity: 0;
            transition: opacity 0.3s ease; display: flex;
            align-items: center; justify-content: center;
        }

        .misty-home-banner:hover .misty-banner-nav { opacity: 1; }
        .misty-banner-nav:hover { background: rgba(0,0,0,0.2); }
        .misty-banner-prev { left: 0; }
        .misty-banner-next { right: 0; }
        
        .misty-banner-indicators {
            position: absolute; bottom: 120px; /* Moved above library slider */
            right: 6%; display: flex; gap: 12px; z-index: 10;
        }
        
        .misty-banner-indicator {
            width: 40px; height: 4px; background: rgba(255,255,255,0.3);
            cursor: pointer; transition: all 0.3s; border-radius: 2px;
        }
        
        .misty-banner-indicator.active {
            background: white; width: 60px; box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

        /* --- RESPONSIVE --- */
        @media (max-width: 1024px) {
            .misty-home-banner { height: 75vh; min-height: 600px; }
            .misty-banner-content { width: 70%; left: 40px; bottom: 140px; }
            .misty-logo-container { max-width: 450px; max-height: 200px; }
            .misty-banner-title-text { font-size: 3rem; }
            .misty-library-slider { padding: 0 40px; }
        }

        @media (max-width: 768px) {
            .misty-home-banner { height: 70vh; min-height: 500px; }
            .misty-banner-content { width: 85%; left: 30px; bottom: 120px; }
            .misty-logo-container { max-width: 350px; max-height: 160px; }
            .misty-banner-title-text { font-size: 2.5rem; }
            .misty-banner-description { font-size: 1rem; -webkit-line-clamp: 2; }
            .misty-banner-nav { display: none; }
            .misty-banner-indicators { right: 30px; bottom: 110px; }
            .misty-library-slider { height: 90px; padding: 0 20px; mask-image: none; }
            .misty-library-card { min-width: 110px; height: 50px; font-size: 0.9rem; padding: 0 15px; }
        }

        @media (max-width: 480px) {
            .misty-home-banner { height: 90vh; min-height: 450px; }
            .misty-banner-content { width: 90%; left: 5%; bottom: 100px; align-items: center; text-align: center; }
            .misty-logo-container { max-width: 280px; max-height: 140px; justify-content: center; align-items: flex-end; margin-bottom: 5px; }
            .misty-banner-logo { object-position: bottom center; }
            .misty-banner-title-text { font-size: 2rem; }
            .misty-banner-meta { justify-content: center; font-size: 0.9em; gap: 10px; }
            .misty-banner-description { display: none; } 
            .misty-banner-actions { width: 100%; gap: 10px; flex-direction: row; }
            .misty-btn { flex: 1; padding: 12px 10px; font-size: 0.95rem; }
            .misty-banner-indicators { left: 50%; transform: translateX(-50%); right: auto; bottom: 90px; gap: 6px; }
            .misty-banner-indicator { width: 6px; height: 6px; border-radius: 50%; }
            .misty-banner-indicator.active { width: 8px; height: 8px; }
            .misty-library-slider { height: 80px; }
        }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    static async setupBanner() {
        try {
            await this.waitForElement('.homeSectionsContainer');
            const sectionsContainer = document.querySelector('.homeSectionsContainer');
            if (!sectionsContainer) return;

            const existingBanner = document.querySelector('.misty-home-banner');
            if (existingBanner) existingBanner.remove();

            const banner = await this.createBanner();
            if (banner) {
                sectionsContainer.insertBefore(banner, sectionsContainer.firstChild);
                this.startPremiumCarousel();
            }
        } catch (error) {
            console.error('Failed to setup banner:', error);
        }
    }

    static async createBanner() {
        try {
            const items = await this.getBannerItems();
            const libraries = await this.getLibraries(); // Fetch libraries
            
            if (!items || items.length === 0) return null;

            const banner = document.createElement('div');
            banner.className = 'misty-home-banner';
            
            const slidesHTML = items.map((item, index) => 
                this.createPremiumSlide(item, index === 0)
            ).join('');
            
            const indicatorsHTML = items.map((_, index) => `
                <div class="misty-banner-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
            `).join('');

            // Generate Library Pills
            const libraryHTML = libraries.map(lib => `
                <a class="misty-library-card" onclick="Emby.Page.showItem('${lib.Id}')">
                    <span>${this.escapeHtml(lib.Name)}</span>
                </a>
            `).join('');

            banner.innerHTML = `
                <div class="misty-banner-slides">${slidesHTML}</div>
                <button class="misty-banner-nav misty-banner-prev">❮</button>
                <button class="misty-banner-nav misty-banner-next">❯</button>
                <div class="misty-banner-indicators">${indicatorsHTML}</div>
                
                <div class="misty-library-slider">
                    ${libraryHTML}
                </div>
            `;

            return banner;
        } catch (error) {
            console.error('Failed to create banner:', error);
            return null;
        }
    }

    static createPremiumSlide(item, isActive = false) {
        const backdropUrl = this.getImageUrl(item, 'Backdrop');
        const logoUrl = this.getImageUrl(item, 'Logo');
        const title = item.Name;
        const description = item.Overview || '';
        const year = item.ProductionYear || '';
        const rating = item.CommunityRating ? item.CommunityRating.toFixed(1) : null;
        const officialRating = item.OfficialRating || '';
        
        const d1 = '0.1s', d2 = '0.2s', d3 = '0.3s';
        
        let titleBlock = '';
        if (logoUrl) {
            titleBlock = `
            <div class="misty-logo-container misty-animate-in" style="animation-delay: ${d1}">
                <img class="misty-banner-logo" src="${logoUrl}" alt="${title}">
            </div>`;
        } else {
            titleBlock = `<h1 class="misty-banner-title-text misty-animate-in" style="animation-delay: ${d1}">${this.escapeHtml(title)}</h1>`;
        }

        return `
            <div class="misty-banner-slide ${isActive ? 'active' : ''}" data-item-id="${item.Id}">
                <img class="misty-banner-image" src="${backdropUrl}" alt="${title}" loading="lazy">
                <div class="misty-banner-gradient"></div>
                
                <div class="misty-banner-content">
                    ${titleBlock}
                    
                    <div class="misty-banner-meta misty-animate-in" style="animation-delay: ${d2}">
                        ${rating ? `<span style="color:#46d369; font-weight:800;">${rating * 10}% Match</span>` : ''}
                        ${year ? `<span>${year}</span>` : ''}
                        ${officialRating ? `<span class="misty-meta-tag">${officialRating}</span>` : ''}
                        ${item.Width && item.Width >= 3800 ? '<span class="misty-meta-tag">4K</span>' : '<span class="misty-meta-tag">HD</span>'}
                    </div>

                    <p class="misty-banner-description misty-animate-in" style="animation-delay: ${d3}">
                        ${this.escapeHtml(description)}
                    </p>
                    
                    <div class="misty-banner-actions misty-animate-in" style="animation-delay: 0.4s">
                        <button class="misty-btn misty-btn-play" onclick="HomeSwiper.playItem('${item.Id}')">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            Play
                        </button>
                        <button class="misty-btn misty-btn-more" onclick="Emby.Page.showItem('${item.Id}')">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11 7h2v2h-2zm0 4h2v6h-2z"/></svg>
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static async getLibraries() {
        try {
            const userId = ApiClient.getCurrentUserId();
            const response = await ApiClient.getUserViews({}, userId);
            return response.Items || [];
        } catch (error) {
            console.error('Failed to fetch libraries:', error);
            return [];
        }
    }

    static async getBannerItems() {
        try {
            const userId = ApiClient.getCurrentUserId();
            const query = {
                ImageTypes: 'Backdrop',
                IncludeItemTypes: 'Movie,Series',
                SortBy: 'Random',
                Recursive: true,
                Limit: 5,
                Fields: 'Overview,ProductionYear,CommunityRating,OfficialRating,BackdropImageTags,ImageTags,ParentLogoImageTag,Width',
                EnableUserData: false,
                HasBackdropImage: true
            };
            const url = ApiClient.getUrl(`Users/${userId}/Items`, query);
            const response = await ApiClient.getJSON(url);
            return (response.Items || []).slice(0, 5);
        } catch (error) {
            return [];
        }
    }

    static getImageUrl(item, type) {
        if (!ApiClient.getImageUrl) return '';
        try {
            if (type === 'Backdrop' && item.BackdropImageTags && item.BackdropImageTags.length > 0) {
                return ApiClient.getImageUrl(item.Id, {
                    type: 'Backdrop',
                    maxWidth: 3840,
                    maxHeight: 2160,
                    tag: item.BackdropImageTags[0],
                    quality: 90
                });
            }
            if (type === 'Logo') {
                if (item.ImageTags && item.ImageTags.Logo) {
                    return ApiClient.getImageUrl(item.Id, { type: 'Logo', maxWidth: 800, tag: item.ImageTags.Logo });
                }
                if (item.ParentLogoImageTag) {
                    return ApiClient.getImageUrl(item.ParentLogoItemId, { type: 'Logo', maxWidth: 800, tag: item.ParentLogoImageTag });
                }
            }
        } catch (error) { }
        return '';
    }

    static startPremiumCarousel() {
        const slides = document.querySelectorAll('.misty-banner-slide');
        const indicators = document.querySelectorAll('.misty-banner-indicator');
        const banner = document.querySelector('.misty-home-banner');
        
        let currentSlide = 0;
        let interval;

        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            indicators.forEach(i => i.classList.remove('active'));
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startInterval = () => {
            clearInterval(interval);
            interval = setInterval(nextSlide, 10000);
        };

        document.querySelector('.misty-banner-next')?.addEventListener('click', () => { nextSlide(); startInterval(); });
        document.querySelector('.misty-banner-prev')?.addEventListener('click', () => { prevSlide(); startInterval(); });
        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => { showSlide(i); startInterval(); });
        });

        let touchStartX = 0;
        let touchEndX = 0;
        if (banner) {
            banner.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
            banner.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchEndX < touchStartX - 50) nextSlide();
                if (touchEndX > touchStartX + 50) prevSlide();
                startInterval();
            }, { passive: true });
        }

        startInterval();
    }

    static playItem(itemId) {
        if (window.playbackManager && window.playbackManager.play) {
            window.playbackManager.play({ ids: [itemId] });
        } else {
            Emby.Page.showItem(itemId);
        }
    }

    static waitForElement(selector, timeout = 10000) {
        return new Promise((resolve) => {
            if (document.querySelector(selector)) return resolve(document.querySelector(selector));
            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => observer.disconnect(), timeout);
        });
    }

    static escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
}

// Initializers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => HomeSwiper.init(), 500));
} else {
    setTimeout(() => HomeSwiper.init(), 500);
}

document.addEventListener('viewshow', (e) => {
    if (e.detail && e.detail.type === 'home') setTimeout(() => HomeSwiper.init(), 500);
});

window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('#!/home')) setTimeout(() => HomeSwiper.init(), 700);
});

window.HomeSwiper = HomeSwiper;
