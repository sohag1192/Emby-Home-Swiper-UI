# 📋 Emby Dashboard UI - Update Log & Documentation

**Server:** Sarker Net / SN Media Services  
**Directory:** [dashboard-ui](file:///c:/Users/Sarker_Net/AppData/Roaming/Emby-Server/system/dashboard-ui/)  
**Target File:** [index.html](file:///c:/Users/Sarker_Net/AppData/Roaming/Emby-Server/system/dashboard-ui/index.html)  
**Latest Update:** 19 November 2026 (Typography, Centering & Emoji Wrap Layout Fix)  

---

## 1. 🛡️ Backup Details (ব্যাকআপ তথ্য)
- [index.html.bak](file:///c:/Users/Sarker_Net/AppData/Roaming/Emby-Server/system/dashboard-ui/index.html.bak) (স্ট্যান্ডার্ড ব্যাকআপ ফাইল)
- [index_backup_20261118.html](file:///c:/Users/Sarker_Net/AppData/Roaming/Emby-Server/system/dashboard-ui/index_backup_20261118.html) (তারিখ সম্বলিত ব্যাকআপ ফাইল)
- `D:\wwwroot\index.html` মূল ও অপরিবর্তিত রাখা হয়েছে (Original Version).

---

## 2. ✍️ টেক্সট ফরম্যাটিং ও লেআউট ফিক্স (Typography & Alignment Fix)
1. **ইমোজি ও টেক্সট র‍্যাপিং ফিক্স:**
   - মূল ব্যানার মেসেজে `🍿📺` নিচে একা ভেঙে পড়া রোধ করতে `white-space: nowrap` দেওয়া হয়েছে।
   - পুরো বার্তাটি এখন একক লাইনে সুন্দরভাবে কার্ডের ঠিক সেন্টারে অবস্থান করছে।
2. **আইএসপি অ্যালার্ট বক্স সেন্টারিং:**
   - অ্যাম্বার নোটিশ বক্স এবং ভেতরের বাংলা/ইংরেজি টেক্সট সম্পূর্ণ সিমেট্রিকভাবে সেন্টারে অ্যালাইন করা হয়েছে।
3. **ফিচার চিপস ও বাটন ব্যালান্সিং:**
   - ৫টি ফিচার চিপ এক সারিতে সুন্দর সেন্টারিংয়ে অবস্থান করছে।
   - ৩টি অ্যাকশন বাটন কার্ডের ঠিক মাঝে সেন্টার অ্যালাইন করা হয়েছে।
4. **বাংলা ফন্ট আপগ্রেড (Google Font 'Hind Siliguri'):**
   - যুক্তাক্ষর ও বাংলা টেক্সট যাতে আরও ক্রিস্প, সুন্দর ও আধুনিক দেখায়, সেজন্য Google Fonts থেকে `Hind Siliguri` ফন্ট যুক্ত করা হয়েছে।

---

## 3. 🌐 লাইভ টেস্ট ইউআরএল (Live Test URLs)
ব্রাউজারে গিয়ে **`Ctrl + F5`** (Hard Refresh) চেপে সরাসরি চেক করুন:
- **Visual Login:** `http://100.100.100.6:8096/web/index.html#!/startup/login.html?serverId=95a364eb55244b818d6f01b008cea155`
- **Manual Login:** `http://100.100.100.6:8096/web/index.html#!/startup/manuallogin.html?serverId=95a364eb55244b818d6f01b008cea155`
