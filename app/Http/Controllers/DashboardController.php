<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with all registrations.
     */
    public function index(): Response
    {
        $registrations = Registration::latest()
            ->get()
            ->map(fn (Registration $registration): array => [
                'id' => $registration->id,
                'name' => $registration->name,
                'nim' => $registration->nim,
                'angkatan' => $registration->angkatan,
                'study_program' => $registration->study_program,
                'email' => $registration->email,
                'whatsapp' => $registration->whatsapp,
                'motivation' => $registration->motivation,
                'division' => match ($registration->division) {
                    'uiux' => 'UI/UX Designer',
                    'frontend' => 'Frontend Developer',
                    'backend' => 'Backend Developer',
                    default => $registration->division,
                },
                'division_slug' => $registration->division,
                'status' => $registration->status,
                'rejection_reason' => $registration->rejection_reason,
                'submitted_at' => $registration->created_at->translatedFormat('d F Y'),
            ]);

        return Inertia::render('dashboard', [
            'registrations' => $registrations,
        ]);
    }

    /**
     * Update the status of a registration (accept, reject, or set pending).
     */
    public function updateStatus(Request $request, Registration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['pending', 'lolos', 'ditolak'])],
            'rejection_reason' => ['nullable', 'string', 'max:1000'],
        ]);

        $registration->update([
            'status' => $validated['status'],
            'rejection_reason' => $validated['status'] === 'ditolak' ? ($validated['rejection_reason'] ?? null) : null,
        ]);

        $message = match ($validated['status']) {
            'lolos' => "{$registration->name} berhasil DITERIMA (Lolos Seleksi)!",
            'ditolak' => "{$registration->name} telah ditolak.",
            'pending' => "Status {$registration->name} dikembalikan ke Pending.",
        };

        return redirect()->back()->with('success', $message);
    }
}
