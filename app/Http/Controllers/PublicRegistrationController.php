<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegistrationRequest;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicRegistrationController extends Controller
{
    /**
     * Show the registration form with available divisions.
     */
    public function create(): Response
    {
        return Inertia::render('public/register');
    }

    /**
     * Validate and store a new registration.
     */
    public function store(StoreRegistrationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Registration::create([
            'division' => $validated['division_id'],
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

    /**
     * Check registration status by NIM.
     */
    public function checkStatus(Request $request): Response
    {
        $nim = $request->query('nim');
        $result = null;
        $notFound = false;

        if ($nim) {
            $registration = Registration::where('nim', trim($nim))
                ->first();

            if ($registration) {
                $result = [
                    'status' => $registration->status,
                    'data' => [
                        'name' => $registration->name,
                        'nim' => $registration->nim,
                        'division' => $registration->division,
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
}
