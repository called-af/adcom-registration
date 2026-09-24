<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'nim' => $this->nim,
            'division' => $this->division,
            'studyProgram' => $this->study_program,
            'email' => $this->email,
            'whatsapp' => $this->whatsapp,
            'motivation' => $this->motivation,
            'status' => $this->status,
            'rejectionReason' => $this->rejection_reason,
            'submittedAt' => $this->created_at->translatedFormat('d F Y'),
        ];
    }
}
