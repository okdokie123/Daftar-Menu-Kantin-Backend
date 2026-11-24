# Daftar Menu Kantin (Backend)

REST API untuk mengelola daftar menu makanan dan minuman sebuah kantin.
Dibuat dengan NestJS, data disimpan permanen di PostgreSQL menggunakan Prisma ORM.

## Teknologi

- NestJS
- PostgreSQL
- Prisma ORM 7

## Model data

Tabel `menu`: `id`, `nama`, `harga`, `kategori`, `deskripsi`, `createdAt`.

## Cara menjalankan

1. Buat database PostgreSQL bernama `kantin`.
2. Salin `.env.example` menjadi `.env`, lalu isi `DATABASE_URL` sesuai database lokalmu.
3. Jalankan:

```bash
npm install
npx prisma migrate deploy
npx prisma generate
npm run start:dev
```

Server berjalan di `http://localhost:3000`.

## Endpoint

| Method | URL | Fungsi |
|---|---|---|
| GET | `/menu` | Ambil semua menu |
| GET | `/menu?kategori=Minuman` | Filter menu berdasarkan kategori |
| GET | `/menu/statistik` | Jumlah menu total dan per kategori |
| GET | `/menu/:id` | Ambil satu menu |
| POST | `/menu` | Tambah menu |
| PATCH | `/menu/:id` | Ubah menu |
| DELETE | `/menu/:id` | Hapus menu |