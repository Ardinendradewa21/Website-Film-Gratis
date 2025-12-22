# Setup TMDB API Key

Aplikasi ini membutuhkan API key dari The Movie Database (TMDB) untuk mengambil data film.

## Langkah-langkah:

### 1. Daftar di TMDB

1. Kunjungi https://www.themoviedb.org/signup
2. Buat akun baru (gratis)
3. Verifikasi email Anda

### 2. Dapatkan API Key

1. Login ke akun TMDB Anda
2. Klik foto profil Anda di kanan atas → **Settings**
3. Di sidebar kiri, klik **API**
4. Klik **Create** atau **Request an API Key**
5. Pilih **Developer**
6. Isi form aplikasi:
   - **Application Name:** WebFilm (atau nama lain)
   - **Application URL:** http://localhost:3000
   - **Application Summary:** Learning project for movie information
7. Setujui terms of use
8. Copy **API Key (v3 auth)** yang diberikan

### 3. Setup Environment Variable

1. Di root folder project (`d:\Project Besar\webfilm`), buat file `.env.local`
2. Tambahkan API key Anda:

```env
TMDB_API_KEY=your_api_key_here
```

Ganti `your_api_key_here` dengan API key yang Anda copy dari TMDB.

### 4. Restart Development Server

Jika server sudah running, stop dengan `Ctrl+C` dan jalankan lagi:

```bash
npm run dev
```

### 5. Verifikasi

Buka http://localhost:3000 di browser. Anda seharusnya melihat:
- Hero section dengan gradient purple/pink
- Section "Now Playing" dengan film-film terbaru
- Section "Trending This Week" dengan film trending

## Troubleshooting

**Error: TMDB API Error: Unauthorized**
- Pastikan API key sudah benar di `.env.local`
- Pastikan file bernama `.env.local` (bukan `.env` saja)
- Restart development server setelah menambahkan API key

**Error: Cannot find module**
- Jalankan `npm install` untuk install dependencies

**Port 3000 sudah digunakan**
- Stop aplikasi lain yang menggunakan port 3000
- Atau gunakan port lain: `npm run dev -- -p 3001`
