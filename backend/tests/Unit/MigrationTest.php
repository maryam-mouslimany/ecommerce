<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MigrationTest extends TestCase
{
    use RefreshDatabase;

    // === USERS & AUTH TESTS ===

    /**
     * Test that users table has the correct structure
     */
    public function test_users_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('users'), 'Users table should exist');

        $columns = Schema::getColumnListing('users');

        $expectedColumns = [
            'id',
            'name',
            'email',
            'password',
            'remember_token',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Users table should have {$column} column");
        }
    }

    /**
     * Test that roles table has the correct structure
     */
    public function test_roles_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('roles'), 'Roles table should exist');

        $columns = Schema::getColumnListing('roles');

        $expectedColumns = ['id', 'name'];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Roles table should have {$column} column");
        }
    }

    /**
     * Test that user_roles pivot table has the correct structure
     */
    public function test_user_roles_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('user_roles'), 'User roles table should exist');

        $columns = Schema::getColumnListing('user_roles');

        $expectedColumns = ['user_id', 'role_id'];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "User roles table should have {$column} column");
        }
    }

    /**
     * Test that password_resets table has the correct structure
     */
    public function test_password_resets_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('password_resets'), 'Password resets table should exist');

        $columns = Schema::getColumnListing('password_resets');

        $expectedColumns = ['user_id', 'token', 'created_at'];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Password resets table should have {$column} column");
        }
    }

    // === CATALOG TESTS ===

    /**
     * Test that brands table has the correct structure
     */
    public function test_brands_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('brands'), 'Brands table should exist');

        $columns = Schema::getColumnListing('brands');

        $expectedColumns = [
            'id',
            'name',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Brands table should have {$column} column");
        }
    }

    /**
     * Test that categories table has the correct structure
     */
    public function test_categories_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('categories'), 'Categories table should exist');

        $columns = Schema::getColumnListing('categories');

        $expectedColumns = [
            'id',
            'name',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Categories table should have {$column} column");
        }
    }

    /**
     * Test that products table has the correct structure
     */
    public function test_products_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('products'), 'Products table should exist');

        $columns = Schema::getColumnListing('products');

        $expectedColumns = [
            'id',
            'name',
            'brand_id',
            'category_id',
            'gender',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Products table should have {$column} column");
        }
    }

    /**
     * Test that product_images table has the correct structure
     */
    public function test_product_images_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('product_images'), 'Product images table should exist');

        $columns = Schema::getColumnListing('product_images');

        $expectedColumns = [
            'id',
            'product_id',
            'url',
            'thumbnail',
            'sort_order',
            'created_at',
            'updated_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Product images table should have {$column} column");
        }
    }

    /**
     * Test that product_variants table has the correct structure
     */
    public function test_product_variants_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('product_variants'), 'Product variants table should exist');

        $columns = Schema::getColumnListing('product_variants');

        $expectedColumns = [
            'id',
            'product_id',
            'size_ml',
            'price',
            'stock',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Product variants table should have {$column} column");
        }
    }

    // === MAIN ACCORDS TESTS ===

    /**
     * Test that accords table has the correct structure
     */
    public function test_accords_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('accords'), 'Accords table should exist');

        $columns = Schema::getColumnListing('accords');

        $expectedColumns = ['id', 'name'];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Accords table should have {$column} column");
        }
    }

    /**
     * Test that product_accords pivot table has the correct structure
     */
    public function test_product_accords_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('product_accords'), 'Product accords table should exist');

        $columns = Schema::getColumnListing('product_accords');

        $expectedColumns = ['product_id', 'accord_id', 'sort_order'];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Product accords table should have {$column} column");
        }
    }

    // === ORDERS TESTS ===

    /**
     * Test that orders table has the correct structure
     */
    public function test_orders_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('orders'), 'Orders table should exist');

        $columns = Schema::getColumnListing('orders');

        $expectedColumns = [
            'id',
            'user_id',
            'shipping_address_id',
            'billing_address_id',
            'total_amount',
            'status',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Orders table should have {$column} column");
        }
    }

    /**
     * Test that order_items table has the correct structure
     */
    public function test_order_items_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('order_items'), 'Order items table should exist');

        $columns = Schema::getColumnListing('order_items');

        $expectedColumns = [
            'id',
            'order_id',
            'product_variant_id',
            'quantity',
            'unit_price',
            'created_at',
            'updated_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Order items table should have {$column} column");
        }
    }

    // === ADDRESSES TESTS ===

    /**
     * Test that addresses table has the correct structure
     */
    public function test_addresses_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('addresses'), 'Addresses table should exist');

        $columns = Schema::getColumnListing('addresses');

        $expectedColumns = [
            'id',
            'user_id',
            'line1',
            'line2',
            'city',
            'region',
            'postal_code',
            'country',
            'type',
            'is_default',
            'created_at',
            'updated_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Addresses table should have {$column} column");
        }
    }

    // === NOTIFICATIONS TESTS ===

    /**
     * Test that notifications table has the correct structure
     */
    public function test_notifications_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('notifications'), 'Notifications table should exist');

        $columns = Schema::getColumnListing('notifications');

        $expectedColumns = [
            'id',
            'type',
            'notifiable_type',
            'notifiable_id',
            'data',
            'read_at',
            'created_at',
            'updated_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Notifications table should have {$column} column");
        }
    }

    // === ANALYTICS TESTS ===

    /**
     * Test that orders_per_hour table has the correct structure
     */
    public function test_orders_per_hour_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('orders_per_hour'), 'Orders per hour table should exist');

        $columns = Schema::getColumnListing('orders_per_hour');

        $expectedColumns = [
            'id',
            'hour_bucket',
            'order_count',
            'revenue'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Orders per hour table should have {$column} column");
        }
    }

    // === WEBHOOKS TESTS ===

    /**
     * Test that webhooks table has the correct structure
     */
    public function test_webhooks_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('webhooks'), 'Webhooks table should exist');

        $columns = Schema::getColumnListing('webhooks');

        $expectedColumns = [
            'id',
            'order_id',
            'payload',
            'status',
            'retry_count',
            'processed_at',
            'created_at',
            'updated_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Webhooks table should have {$column} column");
        }
    }

    // === AUDIT LOGS TESTS ===

    /**
     * Test that audit_logs table has the correct structure
     */
    public function test_audit_logs_table_has_correct_columns(): void
    {
        $this->assertTrue(Schema::hasTable('audit_logs'), 'Audit logs table should exist');

        $columns = Schema::getColumnListing('audit_logs');

        $expectedColumns = [
            'id',
            'admin_id',
            'subject_user_id',
            'action',
            'subject_id',
            'subject_type',
            'changes',
            'ip_address',
            'created_at'
        ];

        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columns, "Audit logs table should have {$column} column");
        }
    }
}
