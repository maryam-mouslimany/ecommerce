<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
<<<<<<< HEAD
=======
use Illuminate\Foundation\Testing\WithFaker;
>>>>>>> 986709662e60f593aa4ff4b7a8331bdb98ca80b2
use Tests\TestCase;
use App\Models\Order;

class AdminControllerTest extends TestCase
<<<<<<< HEAD
=======

>>>>>>> 986709662e60f593aa4ff4b7a8331bdb98ca80b2
{
    use RefreshDatabase;

    public function test_get_order_returns_data()
    {
        Order::factory()->count(20)->create();

<<<<<<< HEAD
=======
        
>>>>>>> 986709662e60f593aa4ff4b7a8331bdb98ca80b2
        $response = $this->getJson('/api/admin/getOrder');

        $response->assertStatus(200);

<<<<<<< HEAD
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
        Order::factory()->count(30)->create();

        $response = $this->getJson('/api/admin/getOrder?page=2&per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('data.current_page'));
        $this->assertCount(10, $response->json('data.data'));
    }
}
=======
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
                'deleted_at'
            ]
        ],
        'last_page',
        'per_page',
        'total'
    ]
]);

      $this->assertCount(20, $response->json('data.data'));

    }
    public function test_get_order_returns_empty_data()
{
    $response = $this->getJson('/api/admin/getOrder');

    $response->assertStatus(200);

    $response->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'current_page',
            'data',
            'last_page',
            'per_page',
            'total'
        ]
    ]);

    $this->assertEquals([], $response->json('data.data'));
}
public function test_get_order_pagination()
{
    Order::factory()->count(30)->create();

    $response = $this->getJson('/api/admin/getOrder?page=2&per_page=10');

    $response->assertStatus(200);

    $this->assertEquals(2, $response->json('data.current_page'));
    $this->assertCount(10, $response->json('data.data'));
}
public function test_soft_deleted_orders_are_included()
{
    Order::factory()->count(5)->create();
    Order::factory()->count(2)->create()->each(fn($order) => $order->delete());

    $response = $this->getJson('/api/admin/getOrder');

    $response->assertStatus(200);


    $this->assertEquals(7, $response->json('data.total'));
}

}

>>>>>>> 986709662e60f593aa4ff4b7a8331bdb98ca80b2
