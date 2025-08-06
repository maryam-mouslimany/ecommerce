<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Order;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase;

    private function authenticateAsAdmin()
    {
        $admin = User::factory()->admin()->create();
        $token = JWTAuth::fromUser($admin);
        return $token;
    }

    public function test_get_order_returns_data()
    {
        $token = $this->authenticateAsAdmin();
        Order::factory()->count(20)->create();

        $response = $this->getJson('/api/admin/getOrder', [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'current_page',
                'data' => [
                    '*' => [
                        'id',
                        'user_id',
                        'shipping_address_id',
                        'billing_address_id',
                        'total_amount',
                        'status',
                        'created_at',
                        'updated_at',
                        'deleted_at',
                    ]
                ],
                'last_page',
                'per_page',
                'total'
            ]
        ]);

        $this->assertCount(20, $response->json('data.data'));
    }

    public function test_get_order_pagination()
    {
        $token = $this->authenticateAsAdmin();
        Order::factory()->count(30)->create();

        $response = $this->getJson('/api/admin/getOrder?page=2&per_page=10', [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('data.current_page'));
        $this->assertCount(10, $response->json('data.data'));
    }

    public function test_soft_deleted_orders_are_included()
    {
        $token = $this->authenticateAsAdmin();
        Order::factory()->count(5)->create();
        Order::factory()->count(2)->create()->each(fn($order) => $order->delete());

        $response = $this->getJson('/api/admin/getOrder', [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(200);
        $this->assertEquals(7, $response->json('data.total'));
    }
}
