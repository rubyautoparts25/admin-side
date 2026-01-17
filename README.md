# Admin Section

This folder contains all admin-related files for the Ruby Auto Parts website.

## Files

- **admin-login.html** - Admin login page
- **admin-styles.css** - Admin UI styles
- **admin-utils.js** - Admin functionality (add/edit/delete parts)

## Access

- **Admin Login URL:** `admin/admin-login.html` (or `admin-login.html` if deployed separately)
- **Password:** `rubyadmin2024` (change in admin-login.html)

## Deployment

When deploying, you can:
1. Deploy the entire project together (admin folder + website files)
2. Deploy admin folder separately to a different subdomain (e.g., `admin.yoursite.com`)
3. Deploy admin folder separately to a different path (e.g., `yoursite.com/admin/`)

## Interconnection

The admin section is interconnected with the main website:
- Admin login redirects to the main website (configure URL in `admin-login.html`)
- Admin controls appear on the main website when logged in
- Both use the same API server (`http://localhost:3000/api` or your production server)
- Both share the same sessionStorage for admin authentication

### For Separate Deployment:

If deploying admin separately from the main website, update these paths in `admin-login.html`:

1. **Line 7:** Change `../styles.css` to your main website's styles URL:
   ```html
   <link rel="stylesheet" href="https://your-website.vercel.app/styles.css">
   ```

2. **Line 109:** Change `../logo.jpeg` to your main website's logo URL:
   ```html
   <img src="https://your-website.vercel.app/logo.jpeg" alt="Ruby Auto Parts Logo">
   ```

3. **Line 127 & 148:** Change `../index.html` to your main website URL:
   ```javascript
   window.location.href = 'https://your-website.vercel.app/';
   ```

## API Configuration

Update the API URL in `config.js`:
```javascript
window.API_BASE_URL = 'http://localhost:3000/api'; // Development
// or
window.API_BASE_URL = 'https://your-server.railway.app/api'; // Production
```

## 🚀 Deployment to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import this GitHub repository: `rubyautoparts25/admin-side`
   - Vercel will auto-detect and deploy

2. **Before deploying, update `config.js`:**
   - Set `ADMIN_WEBSITE_URL` to your public website URL
   - Set `API_BASE_URL` to your backend API URL

3. **For separate deployment, update paths in `admin-login.html`:**
   - Line 7: Update stylesheet link to your public website
   - Line 109: Update logo image source to your public website
   - Or use `config.js` to set `ADMIN_WEBSITE_URL` dynamically

