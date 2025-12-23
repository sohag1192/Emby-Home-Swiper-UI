class HomeSwiper {
    static interval = null;
    static touchStartX = 0;
    static bannerId = 'misty-banner-root';

    static init() {
        console.log('%c[HomeSwiper] 🔟 Initializing (Top 10 Latest)...', 'color: #ff4444; font-weight: bold;');

        if (!window.ApiClient) {
            setTimeout(() => HomeSwiper.init(), 500);
            return;
        }

        const isHome = window.location.hash.includes('home') || document.body.classList.contains('home');
        if (!isHome && !window.location.hash.includes('!/home')) return;

        this.startUp();
    }

    static async startUp() {
        this.injectStyles();
        
        let container = document.querySelector('.scrollSlider.verticalSections') ||
                        document.querySelector('.homeSectionsContainer') || 
                        document.querySelector('.mainAnimatedPages');

        if (!container) {
            setTimeout(() => this.startUp(), 500);
            return;
        }

        if (document.getElementById(this.bannerId)) return;

        const items = await this.fetchItems();
        if (!items.length) return;

        const banner = this.createBannerHtml(items);
        
        if (container.firstChild) {
            container.insertBefore(banner, container.firstChild);
        } else {
            container.appendChild(banner);
        }

        this.startCarousel(items.length);
        this.addInteractions(banner, items.length);
        this.observeRemoval(container);
    }

    static observeRemoval(container) {
        const observer = new MutationObserver(() => {
            if (!document.getElementById(this.bannerId)) {
                observer.disconnect();
                this.init();
            }
        });
        observer.observe(container, { childList: true });
    }

    static async fetchItems() {
        try {
            const userId = ApiClient.getCurrentUserId();
            const result = await ApiClient.getItems(userId, {
                IncludeItemTypes: "Movie,Series",
                SortBy: "DateCreated", 
                SortOrder: "Descending",
                Recursive: true,
                Fields: "Overview,BackdropImageTags,ImageTags,UserData,OfficialRating,CommunityRating",
                ImageTypes: "Backdrop",
                Limit: 10
            });
            return result.Items.filter(i => i.BackdropImageTags && i.BackdropImageTags.length > 0);
        } catch (e) { return []; }
    }

    static createBannerHtml(items) {
        const wrapper = document.createElement('div');
        wrapper.id = this.bannerId;
        wrapper.className = 'misty-banner-wrapper';

        // --- DEFINED HERE TO REUSE ---
        const hitCounterHtml = `
            <img class="misty-hit-badge" 
                 src="https://hitscounter.dev/api/hit?url=http%3A%2F%2F100.100.100.6%3A8096%2F&label=Hits&icon=github&color=%23198754&message=&style=flat&tz=UTC" 
                 alt="Hits">`;

        const slides = items.map((item, i) => {
            const backdrop = ApiClient.getImageUrl(item.Id, { 
                type: 'Backdrop', maxWidth: 3840, quality: 90, tag: item.BackdropImageTags[0]
            });
            
            let titleHtml;
            if (item.ImageTags && item.ImageTags.Logo) {
                const logoUrl = ApiClient.getImageUrl(item.Id, { type: 'Logo', maxWidth: 800 });
                titleHtml = `<img class="misty-logo" src="${logoUrl}" alt="${item.Name}">`;
            } else {
                titleHtml = `<h1 class="misty-title-text">${item.Name}</h1>`;
            }

            const officialRating = item.OfficialRating 
                ? `<span class="misty-tag misty-content-rating">${item.OfficialRating}</span>` 
                : '';

            let starRating = '';
            if (item.CommunityRating) {
                starRating = `
                    <span class="misty-tag misty-star-rating">
                        <span class="misty-star-icon">★</span> ${item.CommunityRating.toFixed(1)}
                    </span>`;
            }

            const playCount = item.UserData && item.UserData.PlayCount ? item.UserData.PlayCount : 0;
            
            // --- UPDATED: Removed eye icon ---
            const viewCount = `
                <span class="misty-tag misty-views">
                    ${playCount} Plays
                </span>`;

            // Badge only for the absolute newest (item 0)
            const newBadge = i === 0 ? `<span class="misty-tag misty-new-badge">NEW</span>` : '';

            return `
                <div class="misty-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
                    <img class="misty-bg" src="${backdrop}">
                    <div class="misty-overlay"></div>
                    <div class="misty-content">
                        ${titleHtml}
                        
                        <div class="misty-meta-row">
                            ${newBadge}
                            ${officialRating}
                            ${starRating}
                            ${viewCount}
                            ${hitCounterHtml} </div>

                        <p class="misty-desc">${item.Overview || ''}</p>
                        
                        <div class="misty-actions">
                            <button class="misty-btn-play" onclick="HomeSwiper.play('${item.Id}')">▶ Play</button>
                            <button class="misty-btn-info" onclick="Emby.Page.showItem('${item.Id}')">More Info</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const dots = items.map((_, i) => 
            `<div class="misty-dot ${i === 0 ? 'active' : ''}" onclick="HomeSwiper.switch(${i})"></div>`
        ).join('');

        wrapper.innerHTML = `
            <div class="misty-ratio-box">
                ${slides}
                <div class="misty-indicators">${dots}</div>
            </div>
        `;
        return wrapper;
    }

    static play(itemId) {
        if (window.PlaybackManager) PlaybackManager.play({ ids: [itemId] });
        else Emby.Page.showItem(itemId);
    }

    static switch(index) {
        const slides = document.querySelectorAll('.misty-slide');
        const dots = document.querySelectorAll('.misty-dot');
        if (!slides.length) return;

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        this.currentSlide = index;
        this.resetTimer(slides.length);
    }

    static resetTimer(total) {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.switch((this.currentSlide || 0) + 1);
        }, 8000);
    }

    static startCarousel(total) {
        this.currentSlide = 0;
        this.resetTimer(total);
    }

    static addInteractions(el, total) {
        el.addEventListener('touchstart', e => this.touchStartX = e.changedTouches[0].screenX, {passive: true});
        el.addEventListener('touchend', e => {
            if (e.changedTouches[0].screenX < this.touchStartX - 50) this.switch(this.currentSlide + 1);
            if (e.changedTouches[0].screenX > this.touchStartX + 50) this.switch(this.currentSlide - 1);
        }, {passive: true});
        el.addEventListener('mouseenter', () => clearInterval(this.interval));
        el.addEventListener('mouseleave', () => this.resetTimer(total));
    }

    static injectStyles() {
        if (document.getElementById('misty-css')) return;
        const css = `
            .misty-banner-wrapper { width: 100%; margin-bottom: 20px; position: relative; z-index: 0; }
            .misty-ratio-box { 
                position: relative; width: 100%; height: 70vh; min-height: 600px;
                background: #000; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
            }
            .misty-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1s ease; z-index: 1; }
            .misty-slide.active { opacity: 1; z-index: 2; }
            .misty-bg { 
                width: 100%; height: 100%; object-fit: cover; object-position: center top; 
                transform: scale(1); transition: transform 10s ease;
            }
            .misty-slide.active .misty-bg { transform: scale(1.05); }
            .misty-overlay { 
                position: absolute; inset: 0; 
                background: linear-gradient(to top, #141414 5%, rgba(20,20,20,0.8) 30%, transparent 100%);
            }
            .misty-content { 
                position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 5%; 
                z-index: 10; display: flex; flex-direction: column; align-items: flex-start;
            }
            .misty-logo { 
                max-width: 450px; width: 80%; height: auto; max-height: 200px; 
                margin-bottom: 15px; object-fit: contain; object-position: left bottom;
                filter: drop-shadow(0 5px 15px rgba(0,0,0,0.8)); opacity: 0; transform: translateY(20px); transition: all 0.6s 0.1s;
            }
            .misty-title-text { font-size: 3rem; color: #fff; margin-bottom: 10px; font-weight: 800; }
            .misty-meta-row { 
                display: flex; align-items: center; gap: 12px; margin-bottom: 20px; 
                opacity: 0; transform: translateY(20px); transition: all 0.6s 0.2s; 
                flex-wrap: wrap;
            }
            .misty-tag {
                display: flex; align-items: center; justify-content: center;
                height: 28px; padding: 0 10px; border-radius: 4px;
                font-weight: 700; font-size: 0.9rem; letter-spacing: 0.5px;
            }
            .misty-hit-badge { height: 20px; border-radius: 3px; }
            .misty-new-badge { background: #e50914; color: white; border: none; }
            .misty-content-rating { border: 2px solid rgba(255,255,255,0.7); color: #fff; background: rgba(0,0,0,0.3); }
            .misty-star-rating { color: #ffd700; background: rgba(0,0,0,0.6); border: 1px solid rgba(255, 215, 0, 0.3); gap: 5px; }
            .misty-star-icon { font-size: 1.1rem; }
            .misty-views { color: #ddd; font-size: 0.85rem; font-weight: 600; background: transparent; padding-left: 0; gap: 6px; }
            .misty-desc { 
                color: #ccc; font-size: 1.1rem; line-height: 1.5; margin-bottom: 25px; 
                max-width: 700px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
                opacity: 0; transform: translateY(20px); transition: all 0.6s 0.3s;
            }
            .misty-slide.active .misty-logo, .misty-slide.active .misty-meta-row, .misty-slide.active .misty-desc { opacity: 1; transform: translateY(0); }
            .misty-actions { display: flex; gap: 15px; opacity: 0; transform: translateY(20px); transition: all 0.6s 0.4s; }
            .misty-slide.active .misty-actions { opacity: 1; transform: translateY(0); }
            .misty-btn-play { background: #fff; color: #000; border: none; padding: 12px 32px; font-weight: bold; font-size: 1rem; border-radius: 6px; cursor: pointer; transition: transform 0.2s; }
            .misty-btn-play:hover { transform: scale(1.05); }
            .misty-btn-info { background: rgba(100,100,100,0.5); color: #fff; border: none; padding: 12px 32px; font-weight: bold; font-size: 1rem; border-radius: 6px; backdrop-filter: blur(10px); cursor: pointer; transition: background 0.2s; }
            .misty-btn-info:hover { background: rgba(100,100,100,0.7); }
            .misty-indicators { position: absolute; bottom: 40px; right: 40px; display: flex; gap: 8px; z-index: 20; max-width: 400px; flex-wrap: wrap; }
            .misty-dot { width: 8px; height: 8px; background: rgba(255,255,255,0.3); border-radius: 50%; cursor: pointer; }
            .misty-dot.active { background: #fff; transform: scale(1.3); }

            @media (max-width: 768px) {
                .misty-ratio-box { height: 80vh; min-height: 500px; }
                .misty-content { padding: 20px; bottom: 20px; }
                .misty-logo { max-width: 250px; }
                .misty-desc { font-size: 1rem; -webkit-line-clamp: 3; }
                .misty-btn-play, .misty-btn-info { flex: 1; padding: 12px; }
            }
        `;
        const style = document.createElement('style');
        style.id = 'misty-css';
        style.textContent = css;
        document.head.appendChild(style);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HomeSwiper.init());
} else {
    HomeSwiper.init();
}
document.addEventListener('viewshow', (e) => {
    if (window.location.hash.includes('home')) setTimeout(() => HomeSwiper.init(), 100);
});
