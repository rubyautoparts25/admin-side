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
- Admin login redirects to `../index.html` (main website)
- Admin controls appear on the main website when logged in
- Both use the same API server (`http://localhost:3000/api` or your production server)
- Both share the same sessionStorage for admin authentication

## API Configuration

Update the API URL in `admin-utils.js`:
```javascript
window.API_BASE_URL = 'http://localhost:3000/api'; // Development
// or
window.API_BASE_URL = 'https://your-server.railway.app/api'; // Production
```

