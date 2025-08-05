<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '1234567890',
        ];

        $response = $this->postJson('/api/v1/guest/register', $userData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123')
        ]);

        $loginData = [
            'email' => $user->email,
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/v1/guest/login', $loginData);

        $response->assertStatus(200);
    }

    public function test_user_cannot_login_with_wrong_password()
    {
        $user = User::factory()->create();

        $loginData = [
            'email' => $user->email,
            'password' => 'wrongpassword'
        ];

        $response = $this->postJson('/api/v1/guest/login', $loginData);

        $response->assertStatus(401);
    }

    public function test_user_can_logout()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123')
        ]);

        // First login to get token
        $loginResponse = $this->postJson('/api/v1/guest/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);

        $token = $loginResponse->json('data.token');

        // Then logout
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/v1/user/logout');

        $response->assertStatus(200);
    }

    public function test_logout_requires_authentication()
    {
        $response = $this->postJson('/api/v1/user/logout');

        $response->assertStatus(401);
    }

    public function test_registration_requires_all_fields()
    {
        $response = $this->postJson('/api/v1/guest/register', []);

        $response->assertStatus(422);
    }

    public function test_login_requires_email_and_password()
    {
        $response = $this->postJson('/api/v1/guest/login', []);

        $response->assertStatus(422);
    }
}
