<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $registrations = Registration::latest()->get();

        return RegistrationResource::collection($registrations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegistrationRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $registration = Registration::create([
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

        return response()->json([
            'message' => 'Pendaftaran berhasil dikirim!',
            'data' => new RegistrationResource($registration),
        ], 201);
    }

    /**
     * Check registration status by NIM.
     */
    public function checkStatus(Request $request): JsonResponse
    {
        $nim = $request->query('nim');

        if (! $nim) {
            return response()->json(['message' => 'NIM required'], 400);
        }

        $registration = Registration::where('nim', trim($nim))->first();

        if (! $registration) {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => $registration->status,
            'data' => new RegistrationResource($registration),
        ]);
    }
}
