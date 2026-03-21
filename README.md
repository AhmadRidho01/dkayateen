# D'Kayateen Website

Website profil dan katalog produk UMKM D'Kayateen — produk olahan laut dan camilan berkualitas.

## Tech Stack

**Frontend**

- Next.js 16 (React 18) + TypeScript
- Tailwind CSS v4 + Shadcn/ui
- Framer Motion + Zustand

**Backend**

- Node.js + Express v5 + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image storage)

## Fitur

- Katalog produk dengan filter kategori
- WhatsApp floating button & CTA checkout
- Testimoni pelanggan
- Admin dashboard (CRUD produk & testimoni)
- Admin authentication dengan JWT

## Struktur Project

```
dkayateen/
├── frontend/     # Next.js app
└── backend/      # Express API
```

## Cara Menjalankan

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Backend

```bash
cd backend
cp .env.example .env
# Isi .env dengan credentials Anda
npm install
npm run seed    # Buat admin pertama
npm run dev     # http://localhost:5000
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Isi .env.local dengan API URL
npm install
npm run dev     # http://localhost:3000
```

## Admin Dashboard

Akses admin di `http://localhost:3000/admin/login`

Default credentials (setelah menjalankan seeder):

- Username: `admin`
- Password: `dkayateen2024`

> ⚠️ Ganti password setelah login pertama

## Environment Variables

### Backend (`backend/.env`)

| Variable                | Deskripsi                            |
| ----------------------- | ------------------------------------ |
| `PORT`                  | Port server (default: 5000)          |
| `NODE_ENV`              | Environment (development/production) |
| `MONGODB_URI`           | MongoDB connection string            |
| `JWT_SECRET`            | Secret key untuk JWT                 |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                   |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                |
| `FRONTEND_URL`          | URL frontend untuk CORS              |

### Frontend (`frontend/.env.local`)

| Variable              | Deskripsi       |
| --------------------- | --------------- |
| `NEXT_PUBLIC_API_URL` | URL backend API |

## API Endpoints

### Public

```
GET  /api/products          # Semua produk
GET  /api/products/:id      # Detail produk
GET  /api/testimonials      # Testimoni yang visible
```

### Protected (butuh JWT token)

```
POST   /api/auth/login              # Admin login
POST   /api/products                # Tambah produk
PUT    /api/products/:id            # Update produk
DELETE /api/products/:id            # Hapus produk
GET    /api/testimonials/all        # Semua testimoni
POST   /api/testimonials            # Tambah testimoni
PUT    /api/testimonials/:id        # Update testimoni
DELETE /api/testimonials/:id        # Hapus testimoni
```

## License

Private project — D'Kayateen © 2026
