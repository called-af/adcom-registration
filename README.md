# Dokumentasi Integrasi Inertia.js (Frontend - Backend)

Dokumentasi ini menjelaskan kontrak props, rute, validasi, dan controller Laravel untuk menghubungkan halaman frontend Pendaftaran Anggota dan Cek Status berbasis Inertia.js v3 + React.

---

## 1. Daftar Rute yang Dibutuhkan (routes/web.php)

```php
use App\Http\Controllers\PublicRegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/daftar', [PublicRegistrationController::class, 'create'])->name('register.create');
Route::post('/daftar', [PublicRegistrationController::class, 'store'])->name('register.store');
Route::get('/cek-status', [PublicRegistrationController::class, 'checkStatus'])->name('status.check');
```

---

## 2. Halaman Pendaftaran (resources/js/pages/public/register.tsx)

### A. Form Submission Data (POST /daftar)
Form dikirim menggunakan hook useForm dari @inertiajs/react dengan payload berikut:

| Field Name | Type | Rules Rekomendasi | Keterangan |
|---|---|---|---|
| name | string | required\|string\|max:255 | Nama lengkap calon anggota |
| nim | string | required\|string\|max:20\|unique:registrations,nim | Nomor Induk Mahasiswa |
| angkatan | string | required\|string\|digits:4 | Tahun angkatan (contoh: 2024) |
| study_program | string | required\|string\|max:100 | Program studi / jurusan |
| email | string | required\|email\|max:255 | Email aktif |
| whatsapp | string | required\|string\|max:20 | Nomor WhatsApp aktif |
| division_id | string/int | required | ID atau slug divisi pilihan |
| motivation | string | required\|string\|min:10 | Alasan bergabung |
| agreed_to_rules | boolean | accepted | Persetujuan tata tertib |

---

### B. Controller Handler Example (PublicRegistrationController.php)

```php
namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicRegistrationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('public/register', [
            'divisions' => Division::all()->map(fn ($d) => [
                'id' => $d->slug ?? (string) $d->id,
                'title' => $d->name,
                'description' => $d->description ?? 'Divisi ' . $d->name,
                'icon' => $d->slug ?? 'frontend',
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nim' => ['required', 'string', 'max:20', 'unique:registrations,nim'],
            'angkatan' => ['required', 'string', 'digits:4'],
            'study_program' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:20'],
            'division_id' => ['required'],
            'motivation' => ['required', 'string', 'min:10'],
            'agreed_to_rules' => ['accepted'],
        ], [
            'nim.unique' => 'NIM ini sudah terdaftar sebelumnya.',
            'agreed_to_rules.accepted' => 'Anda harus menyetujui ketentuan untuk mendaftar.',
        ]);

        $division = Division::where('slug', $validated['division_id'])
            ->orWhere('id', $validated['division_id'])
            ->firstOrFail();

        Registration::create([
            'division_id' => $division->id,
            'name' => $validated['name'],
            'nim' => $validated['nim'],
            'angkatan' => $validated['angkatan'],
            'study_program' => $validated['study_program'],
            'email' => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'motivation' => $validated['motivation'],
            'agreed_to_rules' => true,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Pendaftaran berhasil dikirim!');
    }
}
```

---

## 3. Halaman Cek Status (resources/js/pages/public/check-status.tsx)

### A. Query Request (GET /cek-status?nim=...)
Frontend memanggil router.get('/cek-status', { nim: '...' }) saat user menekan tombol Cek.

### B. Controller Handler Example

```php
    public function checkStatus(Request $request): Response
    {
        $nim = $request->query('nim');
        $result = null;
        $notFound = false;

        if ($nim) {
            $registration = Registration::with('division')
                ->where('nim', trim($nim))
                ->first();

            if ($registration) {
                $result = [
                    'status' => $registration->status,
                    'data' => [
                        'name' => $registration->name,
                        'nim' => $registration->nim,
                        'division' => $registration->division->name ?? 'Developer',
                        'submittedAt' => $registration->created_at->translatedFormat('d F Y'),
                        'studyProgram' => $registration->study_program,
                        'email' => $registration->email,
                        'whatsapp' => $registration->whatsapp,
                    ],
                    'message' => match ($registration->status) {
                        'lolos' => 'Selamat! Kamu dinyatakan LOLOS SELEKSI UKM Android Developer Community.',
                        'pending' => 'Pendaftaranmu sedang dalam tahap peninjauan oleh tim penyeleksi.',
                        'ditolak' => 'Mohon maaf, kamu belum lolos seleksi periode ini. Tetap semangat!',
                        default => null,
                    },
                ];
            } else {
                $notFound = true;
            }
        }

        return Inertia::render('public/check-status', [
            'searchedNim' => $nim,
            'result' => $result,
            'notFound' => $notFound,
        ]);
    }
```

---

## 4. Error Handling dan Feedback Validasi
- Jika terdapat error validasi di Laravel (seperti NIM duplikat atau kolom kosong), Inertia secara otomatis mengisi objek errors (errors.name, errors.nim, errors.email, dll).
- Komponen FormField pada frontend sudah langsung terhubung dengan error={errors.fieldName} dan akan menampilkan pesan error secara otomatis di bawah input terkait dengan border merah.
