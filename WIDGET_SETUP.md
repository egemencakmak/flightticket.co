# Travelpayouts Widget Setup Guide

Widget "Loading..." durumunda kalıyorsa, bu rehberi takip edin.

## ❗ Problem: Widget Yüklenmiyor / "Loading..." Gösteriyor

### Sebep
Travelpayouts widget'ları **domain whitelist** kullanır. Widget'ın çalışacağı domain'i dashboard'da tanımlamanız gerekir.

---

## ✅ Çözüm: Domain'i Whitelist'e Ekleyin

### Adım 1: Travelpayouts Dashboard'a Giriş Yapın

1. [Travelpayouts Dashboard](https://www.travelpayouts.com/)
2. Login yapın

### Adım 2: Whitelabel/Widget Settings'e Gidin

1. Sol menüden **"Tools"** veya **"Widgets"** seçeneğine tıklayın
2. **"Whitelabel"** veya **"Settings"** bölümünü bulun
3. **"Allowed Domains"** veya **"Authorized Domains"** alanını bulun

### Adım 3: Domain'i Ekleyin

**Doğru formatlar:**

```
https://flightticket.co
https://www.flightticket.co
```

**ÖNEMLİ:**
- ✅ `https://` ile başlamalı (production için)
- ✅ Subdomain varsa (`www`), onu da ekleyin
- ✅ Sonunda `/` yok
- ❌ `flightticket.co` (https olmadan) - YANLIŞ
- ❌ `https://flightticket.co/` (sonda slash) - YANLIŞ

### Adım 4: Local Test İçin (Opsiyonel)

Eğer local'de test ediyorsanız:

```
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

**Not:** Local için `http://` kullanın (https değil)

### Adım 5: Kaydet ve Bekleyin

1. **"Save"** veya **"Update"** butonuna tıklayın
2. **2-5 dakika bekleyin** (propagation için)
3. Sayfayı yenileyin (hard refresh: Ctrl+Shift+R)

---

## 🔍 Widget ID Kontrolü

Kodunuzda widget ID'nin doğru olduğundan emin olun:

```html
<!-- index.html içinde -->
<script data-noptimize="1" data-cfasync="false" data-wpfc-render="false">
  (function () {
        var script = document.createElement("script");
        script.async = 1;
        script.type = "module";
        script.src = "https://tpwgt.com/wl_web/main.js?wl_id=713";
        document.head.appendChild(script);
      })();
</script>
```

**Kontrol edin:**
- `wl_id=713` → Bu sizin widget ID'niz
- Travelpayouts dashboard'unuzdan aldığınız ID ile eşleşmeli

---

## 🐛 Hala Çalışmıyor mu?

### 1. Browser Console'u Kontrol Edin

1. Sayfayı açın
2. F12 basın (Developer Tools)
3. **Console** tab'ına gidin
4. Kırmızı hatalar var mı?

**Olası hatalar:**
- `CORS error` → Domain whitelist problemi
- `wl_id not found` → Widget ID yanlış
- `Script failed to load` → Network/firewall problemi

### 2. Network Tab'ını Kontrol Edin

1. F12 → **Network** tab
2. Sayfayı yenileyin
3. `main.js?wl_id=713` dosyasını bulun
4. Status code'u kontrol edin:
   - ✅ `200 OK` → Script yüklendi
   - ❌ `403 Forbidden` → Domain izni yok
   - ❌ `404 Not Found` → Widget ID yanlış

### 3. Widget Container'ı Kontrol Edin

HTML'de şu container olmalı:

```html
<div id="tp-widget-container" style="min-height: 500px;"></div>
```

**Önemli:**
- ID: `tp-widget-container` olmalı
- Container **boş** olmalı (içinde başka element yok)
- Min-height belirtilmeli

### 4. Script Yükleme Sırasını Kontrol Edin

```html
<head>
    <!-- İlk tracking script -->
    <script>
      // NDcyNDM4.js tracking script
    </script>

    <!-- Sonra widget script -->
    <script>
      // main.js?wl_id=713 widget script
    </script>
</head>

<body>
    <!-- Container -->
    <div id="tp-widget-container"></div>
</body>
```

---

## ✅ Başarılı Kurulum Kontrolü

Widget doğru çalışıyorsa:

1. Sayfa yüklendiğinde **arama formu** görünür
2. Console'da hata yok
3. Network tab'ında `main.js` dosyası 200 OK
4. Form'da havaalanı seçebilirsiniz
5. Tarih seçebilirsiniz

---

## 📞 Hala Sorun Var mı?

### Travelpayouts Desteğine Ulaşın:

1. [Travelpayouts Support](https://support.travelpayouts.com/)
2. **Subject:** "Widget not loading on flightticket.co"
3. **Bilgiler:**
   - Widget ID: 713
   - Domain: flightticket.co
   - Error: "Widget shows loading forever"

### Kontrol Listesi:

- [ ] Domain whitelist'e eklendi (`https://flightticket.co`)
- [ ] 5 dakika beklendi
- [ ] Sayfa hard refresh yapıldı (Ctrl+Shift+R)
- [ ] Browser cache temizlendi
- [ ] Console'da hata kontrol edildi
- [ ] Network tab'ında 200 OK görünüyor
- [ ] Widget ID doğru (713)
- [ ] Container boş (`<div id="tp-widget-container"></div>`)

---

## 🚀 Domain Örnekleri

### Production:
```
https://flightticket.co
https://www.flightticket.co
```

### Subdomain varsa:
```
https://flights.flightticket.co
https://app.flightticket.co
```

### Local Development:
```
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

### Vercel Preview:
```
https://flightticket-co-xyz123.vercel.app
```

Her domain'i ayrı ayrı ekleyin!

---

## 💡 Pro Tips

1. **Wildcard kullanılamaz:** `*.flightticket.co` çalışmaz
2. **Her subdomain ayrı:** www, app, flights hepsini ayrı ekleyin
3. **Propagation süresi:** 2-5 dakika bekleyin
4. **Cache temizleyin:** Hard refresh yapın
5. **Incognito/Private:** Temiz bir browser'da test edin

---

## 📝 Özet

Widget "Loading..." gösteriyorsa:

1. ✅ **Travelpayouts Dashboard → Whitelabel Settings**
2. ✅ **Add domain: `https://flightticket.co`**
3. ✅ **5 dakika bekle**
4. ✅ **Hard refresh (Ctrl+Shift+R)**
5. ✅ **Widget yüklenecek!**

---

**Son Güncelleme:** 2024
**Widget ID:** 713
**Domain:** flightticket.co
