<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SimpleMigrationTest extends TestCase
{
    use RefreshDatabase;

    // === CORE TABLES ===

    /**
     * Test that users table exists and has required columns
     */
    public function test_users_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('users'), 'Users table should exist');

        $columns = Schema::getColumnListing('users');

        $requiredColumns = ['id', 'name', 'email', 'password'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Users table should have {$column} column");
        }
    }

    /**
     * Test that roles table exists and has required columns
     */
    public function test_roles_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('roles'), 'Roles table should exist');

        $columns = Schema::getColumnListing('roles');

        $requiredColumns = ['id', 'name'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Roles table should have {$column} column");
        }
    }

    /**
     * Test that user_roles pivot table exists
     */
    public function test_user_roles_pivot_table_exists(): void
    {
        $this->assertTrue(Schema::hasTable('user_roles'), 'User roles pivot table should exist');

        $columns = Schema::getColumnListing('user_roles');

        $requiredColumns = ['user_id', 'role_id'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "User roles pivot table should have {$column} column");
        }
    }

    // === CATALOG TABLES ===

    /**
     * Test that brands table exists and has required columns
     */
    public function test_brands_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('brands'), 'Brands table should exist');

        $columns = Schema::getColumnListing('brands');

        $requiredColumns = ['id', 'name'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Brands table should have {$column} column");
        }
    }

    /**
     * Test that categories table exists and has required columns
     */
    public function test_categories_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('categories'), 'Categories table should exist');

        $columns = Schema::getColumnListing('categories');

        $requiredColumns = ['id', 'name'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Categories table should have {$column} column");
        }
    }

    /**
     * Test that products table exists and has required columns
     */
    public function test_products_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('products'), 'Products table should exist');

        $columns = Schema::getColumnListing('products');

        $requiredColumns = ['id', 'name', 'brand_id', 'category_id', 'gender'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Products table should have {$column} column");
        }
    }

    /**
     * Test that product_variants table exists and has required columns
     */
    public function test_product_variants_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('product_variants'), 'Product variants table should exist');

        $columns = Schema::getColumnListing('product_variants');

        $requiredColumns = ['id', 'product_id', 'size_ml', 'price', 'stock'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Product variants table should have {$column} column");
        }
    }

    /**
     * Test that product_images table exists and has required columns
     */
    public function test_product_images_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('product_images'), 'Product images table should exist');

        $columns = Schema::getColumnListing('product_images');

        $requiredColumns = ['id', 'product_id', 'url', 'sort_order'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Product images table should have {$column} column");
        }
    }

    // === ACCORDS TABLES ===

    /**
     * Test that accords table exists and has required columns
     */
    public function test_accords_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('accords'), 'Accords table should exist');

        $columns = Schema::getColumnListing('accords');

        $requiredColumns = ['id', 'name'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Accords table should have {$column} column");
        }
    }

    /**
     * Test that product_accords pivot table exists
     */
    public function test_product_accords_pivot_table_exists(): void
    {
        $this->assertTrue(Schema::hasTable('product_accords'), 'Product accords pivot table should exist');

        $columns = Schema::getColumnListing('product_accords');

        $requiredColumns = ['product_id', 'accord_id', 'sort_order'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Product accords pivot table should have {$column} column");
        }
    }

    // === ORDERS TABLES ===

    /**
     * Test that orders table exists and has required columns
     */
    public function test_orders_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('orders'), 'Orders table should exist');

        $columns = Schema::getColumnListing('orders');

        $requiredColumns = ['id', 'user_id', 'total_amount', 'status'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Orders table should have {$column} column");
        }
    }

    /**
     * Test that order_items table exists and has required columns
     */
    public function test_order_items_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('order_items'), 'Order items table should exist');

        $columns = Schema::getColumnListing('order_items');

        $requiredColumns = ['id', 'order_id', 'product_variant_id', 'quantity', 'unit_price'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Order items table should have {$column} column");
        }
    }

    // === ADDRESSES TABLES ===

    /**
     * Test that addresses table exists and has required columns
     */
    public function test_addresses_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('addresses'), 'Addresses table should exist');

        $columns = Schema::getColumnListing('addresses');

        $requiredColumns = ['id', 'user_id', 'line1', 'city', 'country', 'type'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Addresses table should have {$column} column");
        }
    }

    // === SUPPORTING TABLES ===

    /**
     * Test that notifications table exists and has required columns
     */
    public function test_notifications_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('notifications'), 'Notifications table should exist');

        $columns = Schema::getColumnListing('notifications');

        $requiredColumns = ['id', 'type', 'notifiable_type', 'notifiable_id', 'data'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Notifications table should have {$column} column");
        }
    }

    /**
     * Test that orders_per_hour table exists and has required columns
     */
    public function test_orders_per_hour_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('orders_per_hour'), 'Orders per hour table should exist');

        $columns = Schema::getColumnListing('orders_per_hour');

        $requiredColumns = ['id', 'hour_bucket', 'order_count', 'revenue'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Orders per hour table should have {$column} column");
        }
    }

    /**
     * Test that webhooks table exists and has required columns
     */
    public function test_webhooks_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('webhooks'), 'Webhooks table should exist');

        $columns = Schema::getColumnListing('webhooks');

        $requiredColumns = ['id', 'order_id', 'payload', 'status'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Webhooks table should have {$column} column");
        }
    }

    /**
     * Test that audit_logs table exists and has required columns
     */
    public function test_audit_logs_table_structure(): void
    {
        $this->assertTrue(Schema::hasTable('audit_logs'), 'Audit logs table should exist');

        $columns = Schema::getColumnListing('audit_logs');

        $requiredColumns = ['id', 'admin_id', 'action', 'subject_id', 'subject_type'];

        foreach ($requiredColumns as $column) {
            $this->assertContains($column, $columns, "Audit logs table should have {$column} column");
        }
    }
}
