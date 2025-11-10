# Deployment Guide - Flightticket.co

Complete step-by-step deployment instructions for all major hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] Update Travelpayouts marker ID in `.env` (React) or `script.js` (Vanilla)
- [ ] Review and customize legal pages (privacy, terms)
- [ ] Test the site locally
- [ ] Update `VITE_SITE_URL` in `.env`
- [ ] Generate OG image at `public/og-image.jpg` (1200x630px)
- [ ] Test mobile responsiveness

---

## 🚀 Vercel Deployment (React Version)

### Method 1: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to project directory
cd /path/to/flightticket.co

# 3. Login to Vercel
vercel login

# 4. Deploy
vercel

# 5. Follow prompts:
#    - Set up and deploy? Yes
#    - Which scope? (Select your account)
#    - Link to existing project? No
#    - Project name? flighticket-co
#    - Directory? ./
#    - Override settings? No

# 6. For production deployment
vercel --prod
```

### Method 2: GitHub + Vercel (Recommended for Teams)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/flighticket-co.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_TP_MARKER=YOUR_MARKER_ID
     VITE_TP_SUBID=optional
     VITE_SITE_URL=https://flightticket.co
     VITE_SITE_NAME=Flightticket
     ```

4. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain: `flightticket.co`
   - Configure DNS as instructed

---

## 🌊 Netlify Deployment (React Version)

### Method 1: Drag & Drop

```bash
# 1. Build the project
npm run build

# 2. Go to app.netlify.com
# 3. Drag the dist/ folder to the deployment area
```

### Method 2: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Method 3: GitHub + Netlify

1. **Push to GitHub** (same as Vercel)

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables in Site settings → Build & deploy → Environment

4. **Custom Domain**
   - Site settings → Domain management → Add custom domain

---

## 🏠 Hostinger Deployment

### React Version on Hostinger

#### Step 1: Build the Project Locally

```bash
npm run build
# This creates a dist/ folder with static files
```

#### Step 2: Access Hostinger File Manager

1. Login to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Select your hosting plan
3. Go to "Files" → "File Manager"
4. Navigate to `public_html/`

#### Step 3: Upload Files

**Option A: File Manager Upload**
1. Click "Upload Files"
2. Select all files from `dist/` folder
3. Wait for upload to complete

**Option B: FTP Upload**
1. Get FTP credentials from Hostinger dashboard (Files → FTP Accounts)
2. Download [FileZilla](https://filezilla-project.org/)
3. Connect using credentials
4. Upload all files from `dist/` to `public_html/`

#### Step 4: Configure Environment (Important!)

Since Hostinger doesn't support Vite environment variables directly, you need to:

**Before building**, update `src/utils/format.js`:

Replace:
```javascript
const marker = import.meta.env.VITE_TP_MARKER || '472438'
```

With your actual marker:
```javascript
const marker = 'YOUR_ACTUAL_MARKER' // Hard-coded for production
```

Then rebuild: `npm run build`

#### Step 5: SSL Certificate

1. Go to Hostinger dashboard
2. Navigate to SSL → Install SSL
3. Select your domain → Install

#### Step 6: Domain Configuration

1. If using Hostinger's domain:
   - Already configured, skip this step

2. If using external domain:
   - Point nameservers to Hostinger's:
     - ns1.dns-parking.com
     - ns2.dns-parking.com
   - Or use A record pointing to your server IP

### Vanilla Version on Hostinger (Simpler!)

#### Step 1: Edit Configuration

Edit `vanilla/script.js` line 2:
```javascript
const TP_MARKER = 'YOUR_ACTUAL_MARKER';
```

#### Step 2: Upload Files

1. Login to Hostinger File Manager
2. Upload all files from `vanilla/` folder to `public_html/`

That's it! No build step needed.

---

## 📄 GitHub Pages (Free Hosting)

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json scripts:
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# 3. Update vite.config.js base:
export default defineConfig({
  base: '/flighticket-co/', // Your repo name
  // ... rest of config
})

# 4. Deploy
npm run deploy

# 5. Enable GitHub Pages
# Go to repo Settings → Pages → Source: gh-pages branch
```

---

## ☁️ Cloudflare Pages

### Via Dashboard

1. Login to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to Pages → Create a project
3. Connect GitHub repository
4. Configure:
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: Add your variables

### Via Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages publish dist
```

---

## 🔥 Firebase Hosting

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting
# Choose:
# - Public directory: dist
# - Single-page app: Yes
# - Set up GitHub Actions: Optional

# 4. Build and deploy
npm run build
firebase deploy
```

---

## 🐳 Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Deploy:
```bash
docker build -t flighticket .
docker run -p 80:80 flighticket
```

---

## 🎯 Custom Server (VPS/Dedicated)

### Using Nginx

```bash
# 1. Build project
npm run build

# 2. Copy to server
scp -r dist/* user@your-server:/var/www/flighticket

# 3. Configure Nginx
sudo nano /etc/nginx/sites-available/flighticket
```

Nginx config:
```nginx
server {
    listen 80;
    server_name flightticket.co www.flightticket.co;
    root /var/www/flighticket;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/flighticket /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d flightticket.co -d www.flightticket.co
```

---

## 🔍 Post-Deployment Checks

- [ ] Test all pages load correctly
- [ ] Verify search functionality works
- [ ] Check Travelpayouts integration (test a search)
- [ ] Test dark mode toggle
- [ ] Verify mobile responsiveness
- [ ] Check all links (privacy, terms, contact)
- [ ] Test form submissions
- [ ] Verify SSL certificate
- [ ] Check site speed (PageSpeed Insights)
- [ ] Submit sitemap to Google Search Console

---

## 🐛 Common Issues & Solutions

### Issue: Travelpayouts widget not loading

**Solution:**
1. Check marker ID is correct
2. Verify embed script in HTML
3. Check browser console for errors
4. Test affiliate URL directly: `https://tp.media/r?marker=YOUR_MARKER&origin=IST&destination=PAR&depart_date=2024-12-25`

### Issue: 404 on page refresh (SPA issue)

**Solution:**
Add catch-all route in server config:
- Vercel: Automatic
- Netlify: Create `_redirects` file: `/* /index.html 200`
- Nginx: Already in config above

### Issue: Environment variables not working

**Solution:**
- In production builds, environment variables are embedded at build time
- Rebuild after changing `.env`: `npm run build`
- For Hostinger, hard-code values before building

### Issue: White screen on deployment

**Solution:**
1. Check browser console for errors
2. Verify base URL in `vite.config.js`
3. Check file paths are correct
4. Clear browser cache

---

## 📊 Performance Optimization

After deployment:

1. **Enable Compression**
   - Most hosts enable gzip automatically
   - Verify in Network tab (Response Headers: content-encoding: gzip)

2. **CDN Configuration**
   - Vercel/Netlify: Automatic
   - Cloudflare: Enable under Speed settings

3. **Image Optimization**
   - Add OG image: 1200x630px, optimized
   - Use WebP format where possible

4. **Monitor Performance**
   - Use Google Lighthouse
   - Test on [PageSpeed Insights](https://pagespeed.web.dev/)
   - Target: 90+ score

---

## 🎉 You're Live!

Your flight search platform is now deployed and ready to help travelers find the best deals!

### Next Steps:
1. Set up Google Analytics
2. Submit to Google Search Console
3. Create social media accounts
4. Start marketing your site

### Support:
- Travelpayouts: support@travelpayouts.com
- Technical issues: Check README.md

---

Happy deploying! ✈️
