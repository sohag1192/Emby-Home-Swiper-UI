
## How to Use:

1. **Save the file** as `home-swiper.js`
2. **Add to your Emby dashboard** by putting the file in your Emby plugins or custom scripts folder
3. **Include in your page** by adding this to your dashboard HTML or via a browser extension:

```html
<script src="/path/to/home-swiper.js"></script>
```

## Features of this version:

✅ **Simple & Lightweight** - No external dependencies  
✅ **Compatible with Emby 4.9.1.80** - Uses native Emby APIs  
✅ **Auto-sliding Banner** - Changes every 8 seconds  
✅ **Navigation Controls** - Previous/next buttons  
✅ **Indicator Dots** - Click to navigate  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Hover Pause** - Pauses auto-slide on hover  
✅ **Error Handling** - Graceful fallbacks  
✅ **Performance Optimized** - Lazy loading images  

## If it's still not working, try this troubleshooting:

1. **Check browser console** for errors
2. **Verify Emby API** is available by testing in console: `console.log(ApiClient)`
3. **Check if on home page** - the script only runs on `#!/home`
4. **Test manually** by running in console: `HomeSwiper.init()`

## 📸 Preview

![Banner Example 1](https://github.com/sohag1192/Emby-banner-content-display-/blob/main/v2/img/Screenshot_46.png?raw=true)  


This version is much simpler and should work reliably with Emby Web 4.9.1.80.
