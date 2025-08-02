<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Order;

class AdminControllerTest extends TestCase

{
    use RefreshDatabase;

    public function test_get_order_returns_data()
    {
        Order::factory()->count(20)->create();

        $response = $this->getJson('/api/admin/getOrders');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                '*' => [
                    'id',
                    'user_id',
                    'shipping_address_id',
                    'billing_address_id',
                    'total_amount',
                    'status',
                    'created_at',
                    'updated_at'
                ]
            ]
        ]);

        $this->assertCount(20, $response->json('data'));
    }
}

