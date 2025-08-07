<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ForeignKeyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that all foreign key relationships exist
     */
    public function test_all_foreign_key_relationships_exist(): void
    {
        // User & Auth relationships
        $this->assertForeignKeyExists('user_roles', 'user_id', 'users', 'id');
        $this->assertForeignKeyExists('user_roles', 'role_id', 'roles', 'id');
        $this->assertForeignKeyExists('password_resets', 'user_id', 'users', 'id');

        // Catalog relationships
        $this->assertForeignKeyExists('products', 'brand_id', 'brands', 'id');
        $this->assertForeignKeyExists('products', 'category_id', 'categories', 'id');
        $this->assertForeignKeyExists('product_images', 'product_id', 'products', 'id');
        $this->assertForeignKeyExists('product_variants', 'product_id', 'products', 'id');

        // Accords relationships
        $this->assertForeignKeyExists('product_accords', 'product_id', 'products', 'id');
        $this->assertForeignKeyExists('product_accords', 'accord_id', 'accords', 'id');

        // Orders relationships
        $this->assertForeignKeyExists('orders', 'user_id', 'users', 'id');
        $this->assertForeignKeyExists('orders', 'shipping_address_id', 'addresses', 'id');
        $this->assertForeignKeyExists('orders', 'billing_address_id', 'addresses', 'id');
        $this->assertForeignKeyExists('order_items', 'order_id', 'orders', 'id');
        $this->assertForeignKeyExists('order_items', 'product_variant_id', 'product_variants', 'id');

        // Addresses relationships
        $this->assertForeignKeyExists('addresses', 'user_id', 'users', 'id');

        // Notifications relationships - polymorphic, no direct foreign key
        // $this->assertForeignKeyExists('notifications', 'notifiable_id', 'users', 'id');

        // Webhooks relationships
        $this->assertForeignKeyExists('webhooks', 'order_id', 'orders', 'id');

        // Audit logs relationships
        $this->assertForeignKeyExists('audit_logs', 'admin_id', 'users', 'id');
        $this->assertForeignKeyExists('audit_logs', 'subject_user_id', 'users', 'id');
    }

    /**
     * Helper method to check if a foreign key exists (database agnostic)
     */
    private function assertForeignKeyExists(string $table, string $column, string $referencedTable, string $referencedColumn): void
    {
        $driver = DB::connection()->getDriverName();
        
        if ($driver === 'sqlite') {
            $this->assertForeignKeyExistsSQLite($table, $column, $referencedTable, $referencedColumn);
        } else {
            $this->assertForeignKeyExistsMySQL($table, $column, $referencedTable, $referencedColumn);
        }
    }

    /**
     * Check foreign key exists in SQLite using pragma
     */
    private function assertForeignKeyExistsSQLite(string $table, string $column, string $referencedTable, string $referencedColumn): void
    {
        $foreignKeys = DB::select("PRAGMA foreign_key_list({$table})");
        
        $foreignKeyExists = false;
        foreach ($foreignKeys as $foreignKey) {
            if (
                $foreignKey->from === $column &&
                $foreignKey->table === $referencedTable &&
                $foreignKey->to === $referencedColumn
            ) {
                $foreignKeyExists = true;
                break;
            }
        }

        $this->assertTrue(
            $foreignKeyExists,
            "Foreign key from {$table}.{$column} to {$referencedTable}.{$referencedColumn} should exist"
        );
    }

    /**
     * Check foreign key exists in MySQL using information_schema
     */
    private function assertForeignKeyExistsMySQL(string $table, string $column, string $referencedTable, string $referencedColumn): void
    {
        $database = env('DB_DATABASE');

        $foreignKeys = DB::select("
            SELECT 
                COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
            FROM 
                information_schema.KEY_COLUMN_USAGE
            WHERE 
                TABLE_SCHEMA = ? AND
                TABLE_NAME = ? AND
                REFERENCED_TABLE_NAME IS NOT NULL
        ", [$database, $table]);

        $foreignKeyExists = false;
        foreach ($foreignKeys as $foreignKey) {
            if (
                $foreignKey->COLUMN_NAME === $column &&
                $foreignKey->REFERENCED_TABLE_NAME === $referencedTable &&
                $foreignKey->REFERENCED_COLUMN_NAME === $referencedColumn
            ) {
                $foreignKeyExists = true;
                break;
            }
        }

        $this->assertTrue(
            $foreignKeyExists,
            "Foreign key from {$table}.{$column} to {$referencedTable}.{$referencedColumn} should exist"
        );
    }

    /**
     * Test that indexes exist on foreign key columns
     */
    public function test_foreign_key_columns_have_indexes(): void
    {
        $foreignKeyColumns = [
            'user_roles' => ['user_id', 'role_id'],
            'password_resets' => ['user_id'],
            'products' => ['brand_id', 'category_id'],
            'product_images' => ['product_id'],
            'product_variants' => ['product_id'],
            'product_accords' => ['product_id', 'accord_id'],
            'orders' => ['user_id', 'shipping_address_id', 'billing_address_id'],
            'order_items' => ['order_id', 'product_variant_id'],
            'addresses' => ['user_id'],
            // 'notifications' => ['notifiable_id'], // polymorphic relationship
            'webhooks' => ['order_id'],
            'audit_logs' => ['admin_id', 'subject_user_id']
        ];

        foreach ($foreignKeyColumns as $table => $columns) {
            foreach ($columns as $column) {
                $this->assertIndexExists($table, $column);
            }
        }
    }

    /**
     * Helper method to check if an index exists (database agnostic)
     */
    private function assertIndexExists(string $table, string $column): void
    {
        $driver = DB::connection()->getDriverName();
        
        if ($driver === 'sqlite') {
            $this->assertIndexExistsSQLite($table, $column);
        } else {
            $this->assertIndexExistsMySQL($table, $column);
        }
    }

    /**
     * Check index exists in SQLite using pragma
     */
    private function assertIndexExistsSQLite(string $table, string $column): void
    {
        $indexes = DB::select("PRAGMA index_list({$table})");
        
        $indexExists = false;
        foreach ($indexes as $index) {
            $indexInfo = DB::select("PRAGMA index_info({$index->name})");
            foreach ($indexInfo as $info) {
                if ($info->name === $column) {
                    $indexExists = true;
                    break 2;
                }
            }
        }

        $this->assertTrue($indexExists, "Index on {$table}.{$column} should exist");
    }

    /**
     * Check index exists in MySQL using information_schema
     */
    private function assertIndexExistsMySQL(string $table, string $column): void
    {
        $database = env('DB_DATABASE');

        $indexes = DB::select("
            SELECT 
                COLUMN_NAME
            FROM 
                information_schema.STATISTICS
            WHERE 
                TABLE_SCHEMA = ? AND
                TABLE_NAME = ? AND
                COLUMN_NAME = ?
        ", [$database, $table, $column]);

        $indexExists = count($indexes) > 0;

        $this->assertTrue($indexExists, "Index on {$table}.{$column} should exist");
    }
}
