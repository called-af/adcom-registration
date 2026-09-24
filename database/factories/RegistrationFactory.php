<?php

namespace Database\Factories;

use App\Models\Registration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Registration>
 */
class RegistrationFactory extends Factory
{
    protected $model = Registration::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'division' => fake()->randomElement(['frontend', 'backend', 'uiux']),
            'name' => fake()->name(),
            'nim' => fake()->unique()->numerify('202#####'),
            'angkatan' => fake()->randomElement(['2022', '2023', '2024']),
            'study_program' => fake()->randomElement(['Teknik Informatika', 'Sistem Informasi', 'Teknologi Informasi']),
            'email' => fake()->unique()->safeEmail(),
            'whatsapp' => fake()->numerify('08##########'),
            'motivation' => fake()->paragraph(),
            'agreed_to_rules' => true,
            'status' => fake()->randomElement(['pending', 'lolos', 'ditolak']),
        ];
    }
}
