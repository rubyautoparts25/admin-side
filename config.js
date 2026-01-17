// Admin Configuration
// Update these URLs for separate deployment

// Main website URL (where admin redirects after login)
// Production website URL (Vercel)
window.ADMIN_WEBSITE_URL = 'https://public-website-alpha-cyan.vercel.app/';

// API Base URL (backend server)
// Production API URL (Railway)
if (typeof window.API_BASE_URL === 'undefined') {
    window.API_BASE_URL = 'https://server-side-production-7658.up.railway.app/api';
}

