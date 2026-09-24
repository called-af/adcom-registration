<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrationRequest extends FormRequest
{
    /**
     * Public form — no auth required.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules matching the frontend registration form contract.
     *
     * @return array<string, array<int, ValidationRule|string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nim' => ['required', 'string', 'max:20', 'unique:registrations,nim'],
            'angkatan' => ['required', 'string', 'digits:4'],
            'study_program' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:20'],
            'division_id' => ['required', 'string', \Illuminate\Validation\Rule::in(['uiux', 'frontend', 'backend'])],
            'motivation' => ['required', 'string', 'min:10'],
            'agreed_to_rules' => ['accepted'],
        ];
    }

    /**
     * Custom validation messages in Bahasa Indonesia.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama lengkap wajib diisi.',
            'nim.required' => 'NIM wajib diisi.',
            'nim.unique' => 'NIM ini sudah terdaftar sebelumnya.',
            'angkatan.required' => 'Tahun angkatan wajib diisi.',
            'angkatan.digits' => 'Angkatan harus berupa 4 digit tahun.',
            'study_program.required' => 'Program studi wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
            'division_id.required' => 'Silakan pilih divisi yang diminati.',
            'division_id.in' => 'Pilihan divisi tidak valid. Hanya tersedia UI/UX, Frontend, atau Backend.',
            'motivation.required' => 'Alasan bergabung wajib diisi.',
            'motivation.min' => 'Alasan bergabung minimal 10 karakter.',
            'agreed_to_rules.accepted' => 'Anda harus menyetujui ketentuan untuk mendaftar.',
        ];
    }
}
