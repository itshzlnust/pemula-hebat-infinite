
# Pemula Hebat - Learning Management System

Sistem pelaporan progress belajar anak untuk orang tua. Aplikasi ini memungkinkan guru untuk melaporkan progress belajar siswa dan orang tua untuk memantau progress belajar anak mereka.

## Fitur

- Autentikasi untuk guru dan orang tua
- Dashboard guru untuk input progress belajar
- Dashboard orang tua untuk melihat progress anak
- Laporan progress dengan nilai dan komentar
- Antarmuka yang responsif dan mudah digunakan

## Teknologi yang Digunakan

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- React Hook Form
- Chart.js

## Persyaratan

- Node.js 18 atau lebih baru
- PostgreSQL
- npm atau yarn

## Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/yourusername/pemula-hebat.git
   cd pemula-hebat
   ```

2. Install dependencies:

   ```bash
   npm install
   # atau
   yarn install
   ```

3. Buat file `.env` di root proyek dan isi dengan konfigurasi berikut:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/pemula_hebat"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Jalankan migrasi database:

   ```bash
   npx prisma migrate dev
   ```

5. Jalankan aplikasi dalam mode development:

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Proyek

```
src/
  ├── app/                    # App router dan pages
  │   ├── api/               # API routes
  │   ├── auth/              # Halaman autentikasi
  │   └── dashboard/         # Dashboard pages
  ├── components/            # React components
  ├── lib/                   # Utility functions
  └── types/                 # TypeScript types
prisma/
  └── schema.prisma         # Database schema
```

## Penggunaan

### Guru

1. Login dengan akun Walikelas
2. Akses dashboard Walikelas
3. Pilih siswa dan mata pelajaran
4. Input nilai dan komentar progress
5. Simpan laporan progress

### Orang Tua

1. Login dengan akun orang tua
2. Akses dashboard orang tua
3. Pilih anak yang ingin dilihat progressnya
4. Lihat laporan progress dari guru

## Kontribusi

Silakan buat issue atau pull request untuk kontribusi.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Lisensi

MIT
