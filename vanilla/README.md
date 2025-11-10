# Vanilla HTML/CSS/JS Version

This is a pure HTML/CSS/JavaScript version of Flightticket.co with **no build step required**.

## ✨ Features

All the same features as the React version:
- Flight search with autocomplete
- Travelpayouts integration
- Dark mode
- Popular routes
- Recent searches
- Responsive design
- Cookie banner

## 🚀 Quick Start

### Local Development

Simply open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or just double-click index.html
```

Then visit: `http://localhost:8000`

## ⚙️ Configuration

Edit `script.js` line 2:
```javascript
const TP_MARKER = 'YOUR_MARKER_ID'; // Replace with your Travelpayouts marker
const TP_SUBID = ''; // Optional SubID
```

## 📁 File Structure

```
vanilla/
├── index.html      # Main page
├── styles.css      # All styles
├── script.js       # All functionality
├── favicon.svg     # Site icon
└── README.md       # This file
```

## 🚀 Deployment

### Option 1: Direct Upload to Any Host

1. Upload all files to your web server
2. Done! No build step needed.

### Option 2: Hostinger (Easiest)

1. Login to Hostinger File Manager
2. Upload all files to `public_html/`
3. Access via your domain

### Option 3: GitHub Pages

1. Create GitHub repository
2. Upload files
3. Enable Pages in Settings
4. Access via `username.github.io/repo-name`

### Option 4: Netlify Drop

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire vanilla folder
3. Get instant URL

## 🎨 Customization

### Change Colors

Edit `:root` in `styles.css`:
```css
:root {
    --primary-600: #2563eb; /* Your brand color */
    --primary-700: #1d4ed8;
    /* ... */
}
```

### Add More Airports

Edit `AIRPORTS` array in `script.js` (line 10):
```javascript
const AIRPORTS = [
    { code: 'IST', city: 'Istanbul', country: 'Turkey' },
    // Add your airports here
];
```

### Modify Popular Routes

Edit `POPULAR_ROUTES` array in `script.js` (line 32):
```javascript
const POPULAR_ROUTES = [
    { origin: 'IST', destination: 'PAR', label: 'Istanbul → Paris', flag: '🇹🇷 → 🇫🇷' },
    // Add your routes here
];
```

## 📱 Additional Pages

To create additional pages (about, privacy, terms), simply:

1. Copy `index.html`
2. Remove search section and results
3. Add your content
4. Update navigation links

Example structure:
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Same head as index.html -->
</head>
<body>
    <!-- Header (same) -->
    <header>...</header>

    <!-- Your content -->
    <main style="padding: 4rem 0;">
        <div class="container">
            <h1>About Us</h1>
            <!-- Your content here -->
        </div>
    </main>

    <!-- Footer (same) -->
    <footer>...</footer>
</body>
</html>
```

## 🔧 How It Works

### Search Flow

1. User fills search form
2. JavaScript validates input
3. On submit, generates Travelpayouts affiliate URL
4. Creates iframe or calls TP API
5. Displays results in `#tp-widget-root`
6. Saves search to localStorage

### Autocomplete

- Filters `AIRPORTS` array based on input
- Shows dropdown with matching results
- Fills input on selection

### Dark Mode

- Checks localStorage for saved preference
- Falls back to system preference
- Toggles `.dark` class on `<html>`
- Saves preference to localStorage

### Recent Searches

- Stores last 5 searches in localStorage
- Displays in cards above search
- Click to re-run search
- Clear all button removes from storage

## 🐛 Troubleshooting

### Travelpayouts not working

1. Check `TP_MARKER` is correct in `script.js`
2. Open browser console for errors
3. Test affiliate URL directly

### Styles not loading

1. Check file paths are correct
2. Ensure `styles.css` is in same folder as `index.html`

### JavaScript not working

1. Check browser console for errors
2. Ensure `script.js` is loaded at bottom of `<body>`
3. Check for typos in code

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Performance

- No dependencies
- ~50KB total (HTML + CSS + JS)
- Instant load time
- 95+ Lighthouse score

## 🔄 Updating

To update configuration:
1. Edit `script.js`
2. Save file
3. Hard refresh browser (Ctrl+Shift+R)
4. No rebuild needed!

## 📝 vs React Version

| Feature | Vanilla | React |
|---------|---------|-------|
| Build step | ❌ No | ✅ Yes |
| Dependencies | ❌ None | ✅ Many |
| Hot reload | ❌ No | ✅ Yes |
| Components | ❌ No | ✅ Yes |
| File size | ~50KB | ~200KB |
| Learning curve | Easy | Medium |
| Scalability | Good | Excellent |
| SEO | Excellent | Good |

**Choose Vanilla if:**
- You want simplicity
- No build step
- Easy deployment
- Small project

**Choose React if:**
- You need scalability
- Modern dev experience
- Component reusability
- Team collaboration

## 💡 Tips

1. **Test locally first**: Use a local server, don't just open HTML file
2. **Update marker**: Don't forget to change `TP_MARKER`
3. **Check console**: Browser DevTools console shows helpful errors
4. **Mobile test**: Test on actual devices, not just desktop
5. **Cache issues**: Hard refresh after changes (Ctrl+Shift+R)

## 🎉 Deployment Checklist

- [ ] Update `TP_MARKER` in `script.js`
- [ ] Test search functionality
- [ ] Test dark mode
- [ ] Test on mobile
- [ ] Check all links work
- [ ] Upload all files
- [ ] Test on production URL

## 📞 Support

Check main README.md for full documentation and troubleshooting.

---

Enjoy your lightweight flight search platform! ✈️
