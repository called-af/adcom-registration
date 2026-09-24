# 📖 Backend API & Inertia Props Documentation

Dokumentasi ini ditujukan untuk tim Frontend Developer untuk memahami bagaimana cara berinteraksi dengan Backend API dan kontrak data (props) yang dikirim oleh server ke komponen Inertia.js.

---

## 1. Halaman Publik (Inertia Routes)

Rute-rute ini adalah rute utama yang dirender oleh Backend menggunakan Inertia.js dan mengembalikan komponen React bersama dengan data props.

### 📝 Halaman Registrasi
- **URL**: `/daftar`
- **Method**: `GET`
- **Keterangan**: Menampilkan form pendaftaran. Saat ini tidak mengirimkan data `divisions` dinamis dari backend, sehingga frontend harus menggunakan opsi divisi secara statis / default (Frontend, Backend, UI/UX).

---

### 🔍 Halaman Cek Status
- **URL**: `/cek-status`
- **Method**: `GET`
- **Query Parameter**: `?nim={nim}`
- **Keterangan**: Menampilkan halaman cek status.

**Props yang dikembalikan ke React (`check-status.tsx`):**
```typescript
{
    searchedNim: string | null;  // NIM yang sedang dicari
    notFound: boolean;           // true jika NIM tidak ditemukan
    result: {
        status: 'pending' | 'lolos' | 'ditolak';
        message: string;         // Pesan kelolosan atau status
        data: {
            name: string;
            nim: string;
            division: string;
            studyProgram: string;
            email: string;
            whatsapp: string;
            submittedAt: string; // Format: "12 Mei 2026"
        }
    } | null;
}
```

---

## 2. Aksi Formulir (Inertia Form Submission)

### 📤 Submit Pendaftaran
- **URL**: `/daftar`
- **Method**: `POST`
- **Payload (Form Data):**

| Field | Type | Validation Rules | Keterangan |
|---|---|---|---|
| `name` | String | `required, max:255` | Nama lengkap pendaftar |
| `nim` | String | `required, max:20, unique` | NIM (Tidak boleh duplikat) |
| `angkatan` | String | `required, digits:4` | Tahun masuk (misal: "2024") |
| `study_program`| String | `required, max:100` | Program Studi |
| `email` | String | `required, email` | Email aktif |
| `whatsapp` | String | `required, max:20` | Nomor WhatsApp |
| `division_id` | String | `required` | slug divisi (cth: `frontend`, `backend`, `uiux`) |
| `motivation` | String | `required, min:10` | Motivasi mendaftar |
| `agreed_to_rules`| Boolean | `accepted (true)` | Checkbox persetujuan |

**Response:**
- **Success**: Redirect kembali ke `/daftar` dengan Flash Message `success: 'Pendaftaran berhasil dikirim!'`
- **Error Validation**: Otomatis mengisi objek `errors` pada `useForm()` milik Inertia.

---

## 3. Halaman Admin Dashboard (Inertia)

### 📊 Dashboard Registrasi
- **URL**: `/dashboard`
- **Method**: `GET`
- **Keterangan**: Hanya bisa diakses oleh admin yang sudah login.

**Props yang dikembalikan (`dashboard.tsx`):**
```typescript
{
    registrations: [
        {
            id: number;
            name: string;
            nim: string;
            angkatan: string;
            study_program: string;
            email: string;
            whatsapp: string;
            motivation: string;
            division: string;       // Nama divisi lengkap (Frontend Developer)
            division_slug: string;  // Slug divisi (frontend)
            status: 'pending' | 'lolos' | 'ditolak';
            submitted_at: string;
        },
        // ... (data lainnya)
    ]
}
```

### ✏️ Update Status Kelolosan (Dashboard Action)
- **URL**: `/dashboard/registrations/{id}/status`
- **Method**: `PATCH`
- **Payload:**
```json
{
    "status": "lolos" // Pilihan: "pending", "lolos", "ditolak"
}
```
**Response:**
- Redirect kembali ke `/dashboard` dengan Flash Message `success` (Otomatis merefresh data pendaftar tanpa reload).

---

## 4. API Endpoints (Untuk Testing Postman / Aplikasi Pihak Ketiga)

Jika Anda memerlukan interaksi di luar Inertia (misalnya Testing via Postman atau integrasi API murni), Anda dapat menggunakan rute API berikut yang langsung merespon dengan format JSON murni tanpa bentrok dengan CSRF Token.

Semua request menggunakan awalan `/api`.

### 📌 1. Submit Pendaftaran Baru
- **Endpoint**: `/api/daftar`
- **Method**: `POST`
- **Headers**: `Accept: application/json`
- **Body**: Sama seperti Form Submission di atas.
- **Success Response (201 Created)**:
```json
{
    "message": "Pendaftaran berhasil dikirim!",
    "data": { ... }
}
```

### 📌 2. Cek Status Pendaftar
- **Endpoint**: `/api/cek-status?nim={nim}`
- **Method**: `GET`
- **Headers**: `Accept: application/json`
- **Success Response (200 OK)**:
```json
{
    "status": "lolos",
    "data": {
        "name": "Royyan Fath",
        "nim": "20240001",
        "division": "frontend",
        "submittedAt": "24 September 2026",
        "studyProgram": "Teknik Informatika",
        "email": "royyan@example.com",
        "whatsapp": "081234567890"
    }
}
```
- **Error Response (404 Not Found)**:
```json
{
    "message": "Data tidak ditemukan"
}
```

### 📌 3. Ambil Semua Data Registrasi (Testing)
- **Endpoint**: `/api/registrations`
- **Method**: `GET`
- **Headers**: `Accept: application/json`
- **Success Response (200 OK)**:
```json
{
    "data": [
        {
            "id": 1,
            "name": "Royyan Fath",
            "nim": "20240001",
            "division": "frontend",
            "status": "pending"
            // ... atribut lain
        }
    ]
}
```

---
**Catatan untuk Tim Frontend:**
Semua alur pengiriman data dan penangkapan props dari backend saat ini sudah berjalan penuh 100% dan terintegrasi langsung dengan database. Anda tidak perlu lagi menggunakan *mock data*. Selamat mengembangkan UI! 🚀
