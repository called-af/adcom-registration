<?php

use App\Models\Registration;

it('can view registration form', function () {
    $response = $this->get('/daftar');

    $response->assertStatus(200);
});

it('can submit registration successfully', function () {
    $response = $this->post('/daftar', [
        'name' => 'John Doe',
        'nim' => '20240001',
        'angkatan' => '2024',
        'study_program' => 'Teknik Informatika',
        'email' => 'john@example.com',
        'whatsapp' => '081234567890',
        'division_id' => 'frontend',
        'motivation' => 'I want to learn frontend development and build great UI/UX.',
        'agreed_to_rules' => true,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('registrations', [
        'nim' => '20240001',
        'email' => 'john@example.com',
        'division' => 'frontend',
        'status' => 'pending',
    ]);
});

it('can check status successfully', function () {
    Registration::factory()->create([
        'division' => 'frontend',
        'nim' => '20240001',
        'status' => 'lolos',
    ]);

    $response = $this->get('/cek-status?nim=20240001');

    $response->assertStatus(200);
});
