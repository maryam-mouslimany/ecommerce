<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Accord;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use App\Models\Role;
use App\Models\Webhook;
use App\Models\AuditLog;
use App\Models\OrdersPerHour;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\BrandSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\AccordSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\OrderSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_role_seeder_creates_roles()
    {
        (new RoleSeeder())->run();
        $this->assertEquals(7, Role::count());
    }

    public function test_user_seeder_creates_users()
    {
        (new UserSeeder())->run();
        $this->assertEquals(23, User::count());
    }

    public function test_brand_seeder_creates_brands()
    {
        (new BrandSeeder())->run();
        $this->assertEquals(18, Brand::count());
    }

    public function test_category_seeder_creates_categories()
    {
        (new CategorySeeder())->run();
        $this->assertEquals(13, Category::count());
    }

    public function test_accord_seeder_creates_accords()
    {
        (new AccordSeeder())->run();
        $this->assertEquals(25, Accord::count());
    }

    public function test_product_seeder_creates_products_with_relationships()
    {
        (new BrandSeeder())->run();
        (new CategorySeeder())->run();
        (new AccordSeeder())->run();
        (new ProductSeeder())->run();

        $this->assertEquals(20, Product::count());
        $this->assertGreaterThan(0, Product::first()->variants->count());
        $this->assertGreaterThan(0, Product::first()->images->count());
        $this->assertGreaterThan(0, Product::first()->accords->count());
    }

    public function test_order_seeder_creates_orders_with_relationships()
    {
        (new UserSeeder())->run();
        (new BrandSeeder())->run();
        (new CategorySeeder())->run();
        (new AccordSeeder())->run();
        (new ProductSeeder())->run();
        (new OrderSeeder())->run();

        $this->assertEquals(100, Order::count());
        $this->assertGreaterThan(0, Order::first()->items->count());
    }

    public function test_database_seeder_runs_all_seeders()
    {
        $this->artisan('db:seed');
        $this->assertGreaterThan(0, User::count());
        $this->assertGreaterThan(0, Product::count());
        $this->assertGreaterThan(0, Order::count());
    }

    public function test_seeder_data_integrity()
    {
        $this->artisan('db:seed');
        $this->assertNotNull(Product::first()->brand);
        $this->assertNotNull(Order::first()->user);
        $this->assertGreaterThan(0, Order::first()->items->count());
    }

    public function test_seeder_unique_constraints()
    {
        $this->artisan('db:seed');
        $this->assertEquals(Brand::count(), Brand::distinct('name')->count());
        $this->assertEquals(User::count(), User::distinct('email')->count());
    }
}
