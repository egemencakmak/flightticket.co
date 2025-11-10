# Flightticket.co - Flight Search & Affiliate Platform

Modern, fast, and SEO-friendly flight search and booking affiliate website built with Travelpayouts integration.

## 🚀 Features

- ✈️ **Flight Search**: Search and compare flights from hundreds of airlines
- 🎨 **Modern UI**: Clean, responsive design with dark mode support
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🔍 **SEO Optimized**: Meta tags, OpenGraph, sitemap, and robots.txt
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🌐 **Travelpayouts Integration**: Embedded flight results with affiliate tracking
- 🎯 **Popular Routes**: Quick access to frequently searched destinations
- 📝 **Recent Searches**: Local storage of user's search history
- 🌙 **Dark Mode**: User-friendly dark mode with persistent preference
- 🔒 **GDPR Compliant**: Cookie banner and privacy policy

## 📦 Two Versions Included

### 1. React + Vite + Tailwind (Recommended)
Modern SPA with component architecture, perfect for scalability.

### 2. Vanilla HTML/CSS/JS
Lightweight version with no build step, perfect for simple hosting.

## 🛠️ Installation & Setup

### React Version

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Vanilla Version

Simply open `vanilla/index.html` in a browser or deploy the `vanilla/` folder to any static host.

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and update:

```env
VITE_TP_MARKER=YOUR_MARKER_ID
VITE_TP_SUBID=optional_subid
VITE_SITE_URL=https://flightticket.co
VITE_SITE_NAME=Flightticket
```

**Important**: Replace `YOUR_MARKER_ID` with your actual Travelpayouts marker from your dashboard.

### Travelpayouts Setup

1. Sign up at [Travelpayouts](https://www.travelpayouts.com/)
2. Get your marker ID from the dashboard
3. **Configure Widget Domain (CRITICAL):**
   - Go to Travelpayouts Dashboard → Whitelabel Settings
   - Add your domain in this format: `https://flightticket.co`
   - If using www subdomain, also add: `https://www.flightticket.co`
   - For local testing, add: `http://localhost:3000`
   - **Without this, widget will show "Loading..." forever!**
4. Update the marker in:
   - React: `.env` file (`VITE_TP_MARKER`)
   - Vanilla: `vanilla/script.js` (line 2: `const TP_MARKER`)

## 🚀 Deployment

### Option 1: Vercel (Recommended for React)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

Or use Vercel's GitHub integration:
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Option 2: Netlify

1. Build the project: `npm run build`
2. Drag & drop the `dist/` folder to [app.netlify.com](https://app.netlify.com)

Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Option 3: Hostinger (Static Hosting)

#### For React Version:
1. Build project: `npm run build`
2. Connect via FTP/SFTP to your Hostinger account
3. Upload contents of `dist/` folder to `public_html/`

#### For Vanilla Version:
1. Connect via FTP/SFTP
2. Upload contents of `vanilla/` folder to `public_html/`

### Hostinger Setup Steps:

1. **Login to Hostinger**
   - Go to hpanel.hostinger.com
   - Select your hosting plan

2. **File Manager Method** (Easiest)
   - Go to Files → File Manager
   - Navigate to `public_html/`
   - Upload all files from `dist/` (React) or `vanilla/` (Vanilla)

3. **FTP Method**
   - Download FileZilla
   - Get FTP credentials from Hostinger dashboard
   - Connect and upload files

4. **Environment Variables** (For React)
   - Create `.env` file in root directory
   - Or use Hostinger's PHP config to set variables

5. **Domain Configuration**
   - Point your domain to Hostinger nameservers
   - Set up SSL certificate (free with Hostinger)

### Option 4: Other Static Hosts

Works with:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Render
- Railway

## 📁 Project Structure

```
flightticket.co/
├── src/                      # React source files
│   ├── components/           # React components
│   │   ├── SearchBar.jsx
│   │   ├── Hero.jsx
│   │   ├── ResultsSection.jsx
│   │   ├── PopularRoutes.jsx
│   │   ├── RecentSearches.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── pages/               # Page components
│   │   ├── Privacy.jsx
│   │   ├── Terms.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── utils/               # Utility functions
│   │   └── format.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── vanilla/                 # Vanilla HTML/CSS/JS version
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── index.html               # React app HTML
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example
```

## 🎯 Key Features Explained

### 1. Search Bar
- Autocomplete for airports (IATA codes)
- Date pickers with validation
- Passenger selection (adults, children, infants)
- Form validation

### 2. Travelpayouts Integration
The embed script is loaded in `index.html`:
```javascript
<script data-noptimize="1" data-cfasync="false">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://tpembars.com/NDcyNDM4.js?t=472438';
      document.head.appendChild(script);
  })();
</script>
```

Results are displayed in `<div id="tp-widget-root"></div>`

### 3. Affiliate URL Generation
Format: `https://tp.media/r?marker=MARKER&origin=IST&destination=PAR&depart_date=2024-12-25&...`

See `src/utils/format.js` (React) or `vanilla/script.js` (Vanilla) for implementation.

### 4. Dark Mode
- Auto-detects system preference
- Persists user choice in localStorage
- Smooth transitions

### 5. Recent Searches
- Stored in localStorage
- Shows last 5 searches
- Click to re-run search

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js` (React) or `:root` variables in `vanilla/styles.css` (Vanilla)

### Add More Airports
Update `POPULAR_AIRPORTS` array in:
- React: `src/components/SearchBar.jsx`
- Vanilla: `vanilla/script.js`

### Modify Popular Routes
Update `POPULAR_ROUTES` array in:
- React: `src/components/PopularRoutes.jsx`
- Vanilla: `vanilla/script.js`

## 📊 SEO Optimization

- ✅ Meta tags (title, description, keywords)
- ✅ OpenGraph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Fast loading (Lighthouse 90+)
- ✅ Mobile responsive
- ✅ ARIA labels

## 🔒 Legal & Compliance

The following pages are included:
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)
- About Us (`/about`)
- Contact (`/contact`)

**Important**: Review and customize these pages for your specific use case.

## 🐛 Troubleshooting

### Travelpayouts not loading
1. Check your marker ID in `.env` or `script.js`
2. Verify the embed script is loading (check Network tab)
3. Try opening the affiliate URL directly

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Dark mode not persisting
Check browser's localStorage is enabled and not in private mode.

## 📝 License

This project is for educational and commercial use. Review Travelpayouts terms of service for affiliate requirements.

## 🤝 Support

For issues or questions:
- Check Travelpayouts documentation
- Review this README
- Contact Travelpayouts support for API issues

## 🎉 Credits

- Built with React, Vite, and Tailwind CSS
- Powered by Travelpayouts affiliate network
- Icons from Heroicons

---

Made with ❤️ for travelers worldwide
