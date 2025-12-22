Berikut adalah ringkasan teknis (prompts) yang bisa kamu berikan ke AI lain (seperti ChatGPT, Claude, atau DeepSeek) agar AI tersebut bisa langsung memberikan kode atau struktur proyek yang kamu inginkan:

---

### **Project Brief: Movie Information Web App (TIX ID Clone)**

**Goal:** Membangun platform informasi film menggunakan Next.js yang fokus pada performa tinggi dan praktik pengujian (testing) yang menyeluruh.

**1. Tech Stack:**

* **Framework:** Next.js (App Router)
* **Data Source:** TMDB API (The Movie Database)
* **Styling:** Tailwind CSS + Shadcn UI
* **State Management:** Zustand (untuk fitur watchlist/booking)
* **Data Fetching:** TanStack Query (React Query) untuk caching.
* **Validation:** Zod (untuk skema data API).

**2. Fitur Utama (Requirements):**

* **Homepage:** Menampilkan daftar film "Now Playing" dan "Trending" (Grid Layout).
* **Search & Filter:** Fitur pencarian film berdasarkan judul dan genre.
* **Detail Page:** Halaman dinamis `/movie/[id]` yang menampilkan sinopsis, cast, rating, dan trailer.
* **Seat Selection UI:** Simulasi pemilihan kursi bioskop (interaktif).
* **Responsive Design:** Harus optimal di tampilan mobile dan desktop.

**3. Spesifikasi Testing (SQA Focus):**

* **Unit Testing:** Logika filter dan validasi skema data API (Jest/Vitest).
* **Integration Testing:** Interaksi antar komponen (misal: klik poster masuk ke halaman detail).
* **E2E Testing:** User flow dari mencari film hingga simulasi memilih kursi (Playwright).
* **API Mocking:** Gunakan MSW (Mock Service Worker) untuk simulasi respon API TMDB.

**4. Instruksi Eksekusi untuk AI:**

> "Buatkan struktur folder Next.js (App Router) untuk proyek ini. Sertakan konfigurasi dasar untuk **Tailwind CSS**, **Shadcn UI**, dan boilerplate **Testing (Vitest & Playwright)**. Selain itu, buatkan satu contoh *Server Component* untuk mengambil data film dari TMDB API dan satu contoh *Unit Test* sederhana untuk memvalidasi data tersebut menggunakan Zod."

---

**Saran penggunaan:** Kamu bisa langsung *copy-paste* bagian di atas. Jika kamu ingin AI tersebut langsung memberikan kode spesifik, gunakan paragraf nomor 4 sebagai instruksi pembuka.

Apakah ada bagian fitur atau teknologi tertentu yang ingin kamu tambahkan sebelum saya tutup ringkasan ini?