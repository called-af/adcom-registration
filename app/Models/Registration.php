<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'division',
        'name',
        'nim',
        'angkatan',
        'study_program',
        'email',
        'whatsapp',
        'motivation',
        'agreed_to_rules',
        'status',
        'rejection_reason',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'agreed_to_rules' => 'boolean',
        ];
    }
}
