/*
 * Script Name: Jellyfin/Emby Home Banner
 * Features: 
 * - Custom Loading Screen
 * - Red Welcome Text
 * - Auto-scroll (20s)
 * - Play Button Fix
 * - Visitor Counter
 * - Best Rated & Newest Content
 */

class CommonUtils {
    static selectWait(selector, func, times, interval) {
        var _times = times || 100,
            _interval = interval || 500,
            _jquery = null,
            _iIntervalID;

        _iIntervalID = setInterval(() => {
            if (!_times) {
                clearInterval(_iIntervalID);
            }
            _times <= 0 || _times--;
            _jquery = $(selector);
            if (_jquery.length) {
                func && func.call(func);
                clearInterval(_iIntervalID);
            }
        }, _interval);
        return this;
    }

    static selectNotWait(selector, func, interval) {
        let _jquery,
            _interval = interval || 20,
            _iIntervalID;

        _iIntervalID = setInterval(() => {
            _jquery = $(selector);
            if (_jquery.length < 1) {
                func && func.call(func);
                clearInterval(_iIntervalID);
            }
        }, _interval);
    }

    static copyText(value, cb) {
        const textarea = document.createElement("textarea");
        textarea.readOnly = "readonly";
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand("Copy");
        document.body.removeChild(textarea);
        if (cb && Object.prototype.toString.call(cb) === "[object Function]") {
            cb();
        }
    }

    static sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Done");
            }, ms);
        });
    }

    static truncate(str, n) {
        if (!str) return "";
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    }
}


class HomeBanner {
    static bannerIndex = 0;
    static start() {
        this.cache = {
            items: undefined,
            item: new Map(),
        };
        
        // --- CONTENT QUERY ---
        this.itemQuery = {
            ImageTypes: "Backdrop",
            EnableImageTypes: "Logo,Backdrop",
            IncludeItemTypes: "Movie,Series", 
            SortBy: "CommunityRating, ProductionYear", 
            Recursive: true,
            ImageTypeLimit: 2,
            Limit: 20, 
            Fields: "ProductionYear, Overview, CommunityRating",
            SortOrder: "Descending",
            EnableUserData: false,
            EnableTotalRecordCount: false
        };
        this.coverOptions = {
            type: "Backdrop",
            maxWidth: 3000
        };
        this.logoOptions = {
            type: "Logo",
            maxWidth: 3000
        };
        this.initStart = false;

        setInterval(() => {
            if (window.location.href.indexOf("/home") != -1) {
                if ($(".mainAnimatedPages:not(.hide) .misty-banner").length == 0 && $(".misty-loading").length == 0) {
                    this.initStart = false;
                    this.initLoading();
                }
                if ($(".hide .misty-banner").length != 0) {
                    $(".hide .misty-banner").remove();
                }
                if (!this.initStart && $(".section0 .card").length != 0 && $(".mainAnimatedPages:not(.hide) .misty-banner").length == 0) {
                    this.initStart = true;
                    this.init();
                }
            }
        }, 100);
    }

    static async init() {
        $(".mainAnimatedPages:not(.hide)").attr("data-type", "home");
        $(".misty-loading img").addClass("active");
        await this.initBanner();
        this.initEvent();
    }

    // --- LOADING SCREEN ---
    static initLoading() {
        const load = `
		<div class="misty-loading">
			<img loading="auto" decoding="lazy" alt="Logo" src="emby-crx/logo.png" style="max-width:200px;">
			<h1 style="color: red; text-align: center; margin-top: 20px;"> welcom to our server and enjoy </h1>
			<div class="mdl-spinner">
				<div class="mdl-spinner__layer mdl-spinner__layer-1">
					<div class="mdl-spinner__circle-clipper mdl-spinner__left">
						<div class="mdl-spinner__circle mdl-spinner__circleLeft"></div>
					</div>
					<div class="mdl-spinner__circle-clipper mdl-spinner__right">
						<div class="mdl-spinner__circle mdl-spinner__circleRight"></div>
					</div>
				</div>
                <div class="mdl-spinner__layer mdl-spinner__layer-2"></div>
                <div class="mdl-spinner__layer mdl-spinner__layer-3"></div>
                <div class="mdl-spinner__layer mdl-spinner__layer-4"></div>
			</div>
		</div>
		`;
        $("body").append(load);
    }

    static injectCode(code) {
        let hash = md5(code + Math.random().toString());
        return new Promise((resolve, reject) => {
            if ("BroadcastChannel" in window) {
                const channel = new BroadcastChannel(hash);
                channel.addEventListener("message", (event) => resolve(event.data));
            } else if ("postMessage" in window) {
                window.addEventListener("message", (event) => {
                    if (event.data.channel === hash) {
                        resolve(event.data.message);
                    }
                });
            }
            const script = `
			<script class="I${hash}">
				setTimeout(async ()=> {
					async function R${hash}(){${code}};
					if ("BroadcastChannel" in window) {
						const channel = new BroadcastChannel("${hash}");
						channel.postMessage(await R${hash}());
					} else if ('postMessage' in window) {
						window.parent.postMessage({channel:"${hash}",message:await R${hash}()}, "*");
					}
					document.querySelector("script.I${hash}").remove()
				}, 16)
			</script>
			`;
            $(document.head || document.documentElement).append(script);
        });
    }

    static injectCall(func, arg) {
        const script = `
		const client = await new Promise((resolve, reject) => {
			setInterval(() => {
				if (window.ApiClient != undefined) resolve(window.ApiClient);
			}, 16);
		});
		return await client.${func}(${arg});
		`;
        return this.injectCode(script);
    }

    static playItem(itemId) {
        const script = `
        const play = (mgr) => {
            mgr.play({ ids: ['${itemId}'], serverId: ApiClient.serverId() });
        };
        if (window.playbackManager) {
            play(window.playbackManager);
        } else if (window.require) {
            window.require(['playbackManager'], (pm) => play(pm));
        } else {
            console.error("PlaybackManager not found");
        }
        `;
        this.injectCode(script);
    }

    static getItems(query) {
        if (this.cache.items == undefined) {
            this.cache.items = this.injectCall("getItems", "client.getCurrentUserId(), " + JSON.stringify(query));
        }
        return this.cache.items;
    }

    static async getItem(itemId) {
        if (typeof Storage !== "undefined" && !localStorage.getItem("CACHE|" + itemId) && !this.cache.item.has(itemId)) {
            const data = JSON.stringify(await this.injectCall("getItem", `client.getCurrentUserId(), "${itemId}"`));
            if (typeof Storage !== "undefined") localStorage.setItem("CACHE|" + itemId, data);
            else this.cache.item.set(itemId, data);
        }
        return JSON.parse(typeof Storage !== "undefined" ? localStorage.getItem("CACHE|" + itemId) : this.cache.item.get(itemId));
    }

    static getImageUrl(itemId, options) {
        return this.injectCall("getImageUrl", "'" + itemId + "', " + JSON.stringify(options));
    }

    static async initBanner() {
        const banner = `
		<div class="misty-banner">
			<div class="misty-banner-body"></div>
			<div class="misty-banner-library"></div>
			<div class="misty-banner-nav misty-banner-prev">&#10094;</div>
			<div class="misty-banner-nav misty-banner-next">&#10095;</div>
		</div>
		`;
        $(".mainAnimatedPages:not(.hide) .homeSectionsContainer").prepend(banner);
        
        // Move Libraries
        const myMedia = $(".mainAnimatedPages:not(.hide) .section0");
        if (myMedia.length > 0) {
            myMedia.detach().appendTo(".mainAnimatedPages:not(.hide) .misty-banner-library");
        }

        const data = await this.getItems(this.itemQuery);

        data.Items.forEach(async (item) => {
            const detail = await this.getItem(item.Id);
            const img_url = await this.getImageUrl(detail.Id, this.coverOptions);

            const cleanDescription = CommonUtils.truncate(detail.Overview, 200);

            var itemHtml = `
			<div class="misty-banner-item" id="${detail.Id}">
				<img draggable="false" loading="eager" decoding="async" class="misty-banner-cover" src="${img_url}" alt="Backdrop" style="">
				<div class="misty-banner-info padded-left padded-right">`;

            if (detail.ImageTags && detail.ImageTags.Logo) {
                var logo_url = img_url.replace('Backdrop?maxWidth=3000&quality=80', 'Logo?maxWidth=3000');
                itemHtml += `
				<img id="${detail.Id}" draggable="false" loading="auto" decoding="lazy" class="misty-banner-logo" data-banner="img-title" alt="Logo" onclick="window.Emby.Page.showItem('${detail.Id}')" src="${logo_url}">
				`;
            }

            itemHtml += `
					<div>
                        <p onclick="window.Emby.Page.showItem('${detail.Id}')"><strong>${detail.Name}</strong>${cleanDescription}</p>
                    </div>
					
					<div>
                        <button data-id="${detail.Id}" class="banner-item-play" tabindex="-1">PLAY</button>
		                <button tabindex="-1" onclick="window.Emby.Page.showItem('${detail.Id}')">MORE</button>
                        
                        <br> </br>
                        
                        <div class="visitor-counter-library" style="max-width: 100%; text-align: center; margin-top: 10px;">
                            <img src="https://hitscounter.dev/api/hit?url=http%3A%2F%2F100.100.100.6%3A8096%2F&label=Visitors&icon=graph-up&color=%23ffc107&message=&style=flat&tz=Asia%2FDhaka" alt="Visitor Counter" style="width: 100%; max-width: 250px; height: auto;">
                        </div>
                        
                    </div>
				</div>
			</div>
			`;

            $(".misty-banner-body").append(itemHtml);
        });

        await new Promise((resolve, reject) => {
            let waitLoading = setInterval(() => {
                let cover = document.querySelector(".misty-banner-cover")
                if (cover && cover.complete) {
                    clearInterval(waitLoading);
                    resolve();
                }
            }, 16);
        });

        $(".misty-loading").fadeOut(500, () => $(".misty-loading").remove());
        await CommonUtils.sleep(150);

        let delay = 80;
        let id = $(".misty-banner-item").eq(0).addClass("active").attr("id");
        $(`.misty-banner-logo[id=${id}]`).addClass("active");

        await CommonUtils.sleep(200);
        $(".section0 > div").addClass("misty-banner-library-overflow");
        
        // Force Show Libraries
        $(".misty-banner .card").each((i, dom) => {
            setTimeout(() => {
                $(dom).addClass("misty-banner-library-show");
            }, i * delay)
        });
        
        await CommonUtils.sleep(delay * 8 + 1000);
        $(".section0 > div").removeClass("misty-banner-library-overflow");

        this.bannerIndex = 0;

        const switchBanner = (newIndex) => {
            const total = $(".misty-banner-item").length;
            if (newIndex < 0) newIndex = total - 1;
            if (newIndex >= total) newIndex = 0;

            this.bannerIndex = newIndex;
            $(".misty-banner-body").css("left", -(this.bannerIndex * 100).toString() + "%");
            $(".misty-banner-item.active").removeClass("active");
            let id = $(".misty-banner-item").eq(this.bannerIndex).addClass("active").attr("id");
            $(".misty-banner-logo.active").removeClass("active");
            $(`.misty-banner-logo[id=${id}]`).addClass("active");
            startInterval();
        };

        const startInterval = () => {
            clearInterval(this.bannerInterval);
            this.bannerInterval = setInterval(() => {
                if (window.location.href.indexOf("/home") != -1 && !document.hidden) {
                    switchBanner(this.bannerIndex + 1);
                }
            }, 20000); 
        };

        $(".misty-banner-prev").on("click", () => switchBanner(this.bannerIndex - 1));
        $(".misty-banner-next").on("click", () => switchBanner(this.bannerIndex + 1));
        startInterval();
    }

    static initEvent() {
        const script = `
		const serverId = ApiClient._serverInfo.Id,
			librarys = document.querySelectorAll(".mainAnimatedPages:not(.hide) .section0 .card");
		librarys.forEach(library => {
			library.setAttribute("data-serverid", serverId);
			library.setAttribute("data-type", "CollectionFolder");
		});
		`;
        this.injectCode(script);

        $(document).on('click', '.banner-item-play', function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            var id = $(this).attr('data-id');
            if (id) {
                HomeBanner.playItem(id);
            }
        });
    }
}

if ("BroadcastChannel" in window || "postMessage" in window) {
    if ($("meta[name=application-name]").attr("content") == "Jellyfin" || $(".accent-emby") != undefined) {
        HomeBanner.start();
    }
}