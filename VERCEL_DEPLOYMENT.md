# Vercel Deployment Guide for WebFilm

## Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com with GitHub)
3. Repository pushed to GitHub

## Environment Variables

Before deploying, you need to set up these environment variables in Vercel:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=web-film-4e0c8.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=web-film-4e0c8
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=web-film-4e0c8.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### TMDB API
```
TMDB_API_KEY=your_tmdb_api_key
```

## Deployment Steps

### 1. Push to GitHub

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `Website-Film-Gratis` repository
4. Click "Import"

### 3. Configure Project

Vercel will auto-detect Next.js. Configure:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)

### 4. Add Environment Variables

In the "Environment Variables" section, add all the variables listed above:

1. Click "Add" for each variable
2. Enter the name (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. Enter the value
4. Select all environments (Production, Preview, Development)
5. Click "Add"

### 5. Deploy

Click "Deploy" button. Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to production

Deployment usually takes 2-3 minutes.

### 6. Configure Custom Domain (Optional)

After deployment:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Post-Deployment

### Update Firebase Authorized Domains

1. Go to Firebase Console: https://console.firebase.google.com/project/web-film-4e0c8/authentication/settings
2. Scroll to "Authorized domains"
3. Add your Vercel domain (e.g., `your-app.vercel.app`)
4. Click "Add domain"

### Test Your Deployment

Visit your Vercel URL and test:
- ✅ Authentication (Email/Password, Google, GitHub)
- ✅ Watchlist functionality
- ✅ Booking system
- ✅ Movie browsing
- ✅ Search

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure dependencies are in `package.json`

### Authentication Doesn't Work
- Verify Firebase environment variables
- Add Vercel domain to Firebase Authorized Domains
- Check browser console for errors

### Images Don't Load
- TMDB images should work automatically
- Check `next.config.ts` has correct `remotePatterns`

## Useful Commands

### View Deployment Logs
```bash
vercel logs
```

### Deploy from CLI (Optional)
```bash
npm i -g vercel
vercel login
vercel
```

## Benefits of Vercel

✅ Zero configuration for Next.js
✅ Automatic HTTPS
✅ Global CDN
✅ Automatic deployments from GitHub
✅ Preview deployments for PRs
✅ Built-in analytics
✅ Excellent performance

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Firebase Docs: https://firebase.google.com/docs
