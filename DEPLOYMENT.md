# Firebase Hosting Deployment Guide

## 🚀 Setup Firebase Hosting dengan GitHub Auto-Deploy

### Prerequisites
- ✅ Firebase project sudah dibuat (web-film-4e0c8)
- ✅ GitHub repository untuk project ini
- ✅ Firebase CLI installed

---

## 📋 Langkah-Langkah Deploy

### 1. Install Firebase CLI (jika belum)

```bash
npm install -g firebase-tools
```

### 2. Login ke Firebase

```bash
firebase login
```

Browser akan terbuka untuk login dengan Google account.

### 3. Initialize Firebase Project

Di folder project, jalankan:

```bash
firebase init hosting
```

**Pilihan:**
- Use an existing project → **web-film-4e0c8**
- What do you want to use as your public directory? → **out**
- Configure as a single-page app? → **Yes**
- Set up automatic builds and deploys with GitHub? → **Yes**
- File .github/workflows/firebase-hosting-merge.yml already exists. Overwrite? → **No**
- File .github/workflows/firebase-hosting-pull-request.yml already exists. Overwrite? → **No**

### 4. Build Project

```bash
npm run build
```

Ini akan generate static files di folder `out/`.

### 5. Deploy Manual (First Time)

```bash
firebase deploy --only hosting
```

Website akan live di: `https://web-film-4e0c8.web.app`

---

## 🔄 GitHub Auto-Deploy Setup

### 1. Push Code ke GitHub

```bash
git add .
git commit -m "Setup Firebase Hosting"
git push origin main
```

### 2. Setup GitHub Secrets

Di GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Tambahkan secrets berikut:

#### Firebase Secrets:
- `NEXT_PUBLIC_FIREBASE_API_KEY` = AIzaSyBuOOnFvVFsNaLUaZI0_9pIHRel-Q8UXzc
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = web-film-4e0c8.firebaseapp.com
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = web-film-4e0c8
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = web-film-4e0c8.firebasestorage.app
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = 768437007470
- `NEXT_PUBLIC_FIREBASE_APP_ID` = 1:768437007470:web:cc722827d7878f7a92a27f

#### TMDB Secret:
- `TMDB_API_KEY` = (your TMDB API key)

#### Firebase Service Account:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download JSON file
4. Copy entire JSON content
5. Create secret `FIREBASE_SERVICE_ACCOUNT` dengan value JSON tersebut

### 3. Test Auto-Deploy

Setiap kali push ke branch `main`, GitHub Actions akan:
1. Install dependencies
2. Build project
3. Deploy ke Firebase Hosting

---

## 📁 Files yang Dibuat

### `firebase.json`
Konfigurasi Firebase Hosting dengan:
- Public directory: `out`
- SPA routing
- Cache headers untuk performance

### `next.config.ts`
Updated dengan:
- `output: 'export'` untuk static export
- `images.unoptimized: true` untuk static images

### `.github/workflows/firebase-hosting.yml`
GitHub Actions workflow untuk auto-deploy

---

## 🌐 URLs

Setelah deploy, website akan tersedia di:
- **Production**: https://web-film-4e0c8.web.app
- **Alternative**: https://web-film-4e0c8.firebaseapp.com

---

## 🔧 Troubleshooting

### Build Error
Jika ada error saat build:
```bash
# Clear cache
rm -rf .next out

# Rebuild
npm run build
```

### Deploy Error
Jika deploy gagal:
```bash
# Re-login
firebase login --reauth

# Deploy lagi
firebase deploy --only hosting
```

### GitHub Actions Failing
- Check GitHub Secrets sudah benar
- Check Firebase Service Account valid
- Check logs di GitHub Actions tab

---

## ✅ Verification

Setelah deploy berhasil:
1. Buka URL production
2. Test authentication (login/signup)
3. Test watchlist & bookings
4. Verify Firebase data sync

---

## 🎯 Next Steps

Setelah setup auto-deploy:
1. Setiap push ke `main` → Auto deploy
2. Custom domain (optional): Firebase Console → Hosting → Add custom domain
3. Analytics: Firebase Console → Analytics

---

## 📝 Notes

- **Build time**: ~2-3 menit
- **Deploy time**: ~1 menit
- **Total**: ~5 menit per deploy
- **Free tier**: 10GB storage, 360MB/day bandwidth
