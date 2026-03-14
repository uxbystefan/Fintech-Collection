# Deployment Guide

## Build for Production

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

This creates an optimized production build in the `build` directory.

### 3. Preview Production Build

```bash
npm run preview
```

---

## Deployment Options

### Vercel (Recommended)

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically on push

**CLI Deployment:**
```bash
npm i -g vercel
vercel
```

### Netlify

1. Build command: `npm run build`
2. Publish directory: `build`
3. Deploy on push or via CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Cloudflare Pages

1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `build`

### Static Hosting (Any Provider)

After building, upload the contents of the `build` directory to any static hosting provider:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Azure Static Web Apps

---

## Environment Variables

No environment variables required for basic deployment.

For API integrations, create `.env` file:

```env
VITE_API_URL=https://api.yourservice.com
VITE_API_KEY=your_api_key
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Performance Optimization

### Already Implemented

- ✅ Lazy loading of components
- ✅ Optimized animations (CSS/Canvas)
- ✅ Minimal dependencies
- ✅ Tree-shaking enabled
- ✅ Code splitting via SvelteKit

### Additional Optimizations

1. **Enable compression** (if not handled by host):
```javascript
// vite.config.js
import compression from 'vite-plugin-compression';

export default {
  plugins: [compression()]
};
```

2. **Add PWA support**:
```bash
npm install -D @vite-pwa/sveltekit
```

3. **Image optimization**:
```bash
npm install -D vite-imagetools
```

---

## Domain Configuration

### Custom Domain Setup

1. Add domain in hosting provider dashboard
2. Update DNS records:

```
Type: CNAME
Name: www
Value: your-app.vercel.app
```

3. Enable HTTPS (automatic on most platforms)

---

## Monitoring & Analytics

### Add Google Analytics

```html
<!-- src/app.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/sveltekit
```

```javascript
// hooks.client.ts
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN'
});
```

---

## Performance Checklist

- ✅ Bundle size < 200KB (gzipped)
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Lighthouse score > 90
- ✅ Core Web Vitals optimized

---

## Security Headers

Add to hosting configuration:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Troubleshooting

### Build Fails

1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear SvelteKit cache: `rm -rf .svelte-kit`
3. Update dependencies: `npm update`

### Styles Not Loading

1. Check Tailwind config path patterns
2. Verify PostCSS is installed
3. Clear build cache

### Animations Janky

1. Reduce particle count in AnimatedBackground
2. Lower parallax intensity in FloatingPanel
3. Check for performance bottlenecks with DevTools

---

## Post-Deployment

### Testing

1. Test on multiple browsers
2. Test on mobile devices
3. Run Lighthouse audit
4. Test keyboard navigation
5. Test with screen reader

### Monitoring

1. Set up uptime monitoring
2. Monitor Core Web Vitals
3. Track error rates
4. Monitor user feedback

---

## Support

For issues or questions:
- Check documentation in COMPONENTS.md
- Review accessibility in ACCESSIBILITY.md
- See README.md for development setup
