# WebFilm - Movie Information Web App

Platform informasi film menggunakan Next.js yang terinspirasi dari TIX ID.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Data Source:** TMDB API
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Validation:** Zod
- **Testing:** Vitest + Playwright

## 📋 Prerequisites

- Node.js 18+
- npm atau yarn
- TMDB API Key ([Get it here](https://developer.themoviedb.org/docs))

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local` di root folder dan tambahkan:

```env
TMDB_API_KEY=your_api_key_here
```

Ganti `your_api_key_here` dengan API key dari TMDB.

### 3. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Project Structure

```
webfilm/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   └── ui/                 # Shadcn UI components
│   ├── lib/
│   │   ├── tmdb.ts            # TMDB API client
│   │   ├── schemas.ts         # Zod validation schemas
│   │   └── utils.ts           # Utility functions
│   ├── store/
│   │   └── booking-store.ts   # Zustand state management
│   ├── providers/
│   │   └── query-provider.tsx # TanStack Query provider
│   └── mocks/                 # MSW handlers for testing
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # Playwright E2E tests
└── public/                    # Static assets
```

## 🎯 Features

### ✅ Implemented
- ✅ **Homepage** dengan film "Now Playing" dan "Trending"
- ✅ **Hero Section** dengan gradient background dan CTA buttons
- ✅ **Movie Cards** dengan hover effects dan rating badges
- ✅ **Movie Detail Page** dengan backdrop, poster, cast, dan info lengkap
- ✅ **Seat Selection UI** (simulasi pemilihan kursi 8x10 grid)
- ✅ **Booking System** dengan Zustand state management
- ✅ **Responsive Design** (mobile & desktop)
- ✅ **Search Bar Component** (UI ready)
- ✅ **Genre Filter Component** (UI ready)

### 🚧 Coming Soon
- ⏳ Search & Filter functionality (backend integration)
- ⏳ Trailer video embed
- ⏳ User authentication
- ⏳ Payment integration

## 🎮 Usage

### Browse Movies
1. Buka homepage di `http://localhost:3000`
2. Scroll untuk melihat "Now Playing" dan "Trending" movies
3. Klik pada movie card untuk melihat detail

### View Movie Details
1. Klik movie card dari homepage
2. Lihat informasi lengkap: synopsis, rating, genres, cast
3. Klik "Book Seats" untuk booking atau "Watch Trailer" untuk trailer

### Book Seats
1. Dari halaman detail, klik "Book Seats"
2. Pilih kursi yang tersedia (klik untuk select/deselect)
3. Lihat summary dan total harga
4. Klik "Checkout" untuk konfirmasi booking

**Legend:**
- 🟦 Gray = Available
- 🟪 Purple Gradient = Selected
- ⬛ Dark Gray = Occupied

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

## 🔧 Development Status

### Phase 1: ✅ COMPLETED
- [x] Initialize Next.js project with App Router
- [x] Configure Tailwind CSS
- [x] Setup Shadcn UI
- [x] Install & configure Zustand
- [x] Install & configure TanStack Query
- [x] Install & configure Zod
- [x] Setup testing environment (Vitest & Playwright)
- [x] Configure MSW for API mocking

### Phase 2: ✅ COMPLETED
- [x] Create app layout (header, footer, navigation)
- [x] Setup TMDB API integration with Zod schemas
- [x] Create reusable movie card component
- [x] Create responsive grid layout component

### Phase 3: ✅ COMPLETED
- [x] Implement "Now Playing" movies section
- [x] Implement "Trending" movies section
- [x] Create hero/banner section

### Phase 4: ✅ COMPLETED (UI)
- [x] Create search bar component
- [x] Create genre filter component
- ⏳ Implement search functionality (backend)
- ⏳ Implement filter functionality (backend)

### Phase 5: ✅ COMPLETED
- [x] Create dynamic route `/movie/[id]`
- [x] Display movie synopsis, rating, and info
- [x] Display cast information
- ⏳ Embed trailer video

### Phase 6: ✅ COMPLETED
- [x] Create seat selection UI component
- [x] Implement seat booking logic with Zustand

### Phase 7: 🚧 IN PROGRESS
- ⏳ Write unit tests for data validation (Zod schemas)
- ⏳ Write unit tests for filter logic
- ⏳ Write integration tests for component interactions
- ⏳ Write E2E tests with Playwright

## 🎨 Design Highlights

- **Modern Gradient Theme**: Purple-to-pink gradients throughout
- **Glassmorphism**: Backdrop blur effects on cards and overlays
- **Smooth Animations**: Hover effects, scale transforms, transitions
- **Premium Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Grid**: Adapts from 2 to 5 columns based on screen size
- **Interactive Elements**: Seat selector with real-time feedback

## 📸 Screenshots

### Homepage
- Hero section with gradient background
- Now Playing movies grid
- Trending movies section

### Movie Detail
- Full-width backdrop image
- Movie info with rating and genres
- Cast grid with photos

### Seat Booking
- Interactive 8x10 seat grid
- Real-time selection feedback
- Booking summary with total price

---

Made with ❤️ for learning purposes
