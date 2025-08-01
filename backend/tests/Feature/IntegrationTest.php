<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Accord;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use App\Models\Role;
use App\Models\Webhook;
use App\Models\AuditLog;
use Illuminate\Foundation\Testing\RefreshDatabase;

class IntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_complete_order_workflow()
    {
        // Create a customer user
        $customer = User::factory()->customer()->create();

        // Create customer addresses
        $shippingAddress = Address::factory()->shipping()->for($customer)->create();
        $billingAddress = Address::factory()->billing()->for($customer)->create();

        // Create product with variants
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->for($brand)->for($category)->create();
        $variant = ProductVariant::factory()->inStock()->for($product)->create();

        // Create order with items
        $order = Order::factory()->create([
            'user_id' => $customer->id,
            'shipping_address_id' => $shippingAddress->id,
            'billing_address_id' => $billingAddress->id,
        ]);

        $orderItem = OrderItem::factory()->create([
            'order_id' => $order->id,
            'product_variant_id' => $variant->id,
            'quantity' => 2,
            'unit_price' => $variant->price,
        ]);

        // Update order total
        $order->update(['total_amount' => $orderItem->quantity * $orderItem->unit_price]);

        // Create webhook for order
        $webhook = Webhook::factory()->for($order)->create();

        // Test relationships
        $this->assertEquals($customer->id, $order->user->id);
        $this->assertEquals($shippingAddress->id, $order->shippingAddress->id);
        $this->assertEquals($billingAddress->id, $order->billingAddress->id);
        $this->assertEquals($variant->id, $orderItem->productVariant->id);
        $this->assertEquals($product->id, $variant->product->id);
        $this->assertEquals($brand->id, $product->brand->id);
        $this->assertEquals($category->id, $product->category->id);
        $this->assertEquals($order->id, $webhook->order->id);

        // Test order total calculation
        $expectedTotal = $orderItem->quantity * $orderItem->unit_price;
        $this->assertEquals($expectedTotal, $order->total_amount);
    }

    public function test_product_with_accords_and_images()
    {
        // Create product with relationships
        $product = Product::factory()->create();
        $accords = Accord::factory(3)->create();
        $images = ProductImage::factory(4)->for($product)->create();

        // Attach accords with sort order
        foreach ($accords as $index => $accord) {
            $product->accords()->attach($accord, ['sort_order' => $index]);
        }

        // Test relationships
        $this->assertEquals(3, $product->accords->count());
        $this->assertEquals(4, $product->images->count());

        // Test accord sort order
        $firstAccord = $product->accords->first();
        $this->assertEquals(0, $firstAccord->pivot->sort_order);
    }

    public function test_user_role_management()
    {
        // Create user and roles
        $user = User::factory()->create();
        $adminRole = Role::factory()->admin()->create();
        $managerRole = Role::factory()->manager()->create();

        // Assign roles
        $user->roles()->attach([$adminRole->id, $managerRole->id]);

        // Test role relationships
        $this->assertEquals(2, $user->roles->count());
        $this->assertTrue($user->hasRole('admin'));
        $this->assertTrue($user->hasRole('manager'));
        $this->assertFalse($user->hasRole('customer'));
    }

    public function test_audit_logging_system()
    {
        // Create admin and subject user
        $admin = User::factory()->admin()->create();
        $subjectUser = User::factory()->create();

        // Create audit log
        $auditLog = AuditLog::factory()->create([
            'admin_id' => $admin->id,
            'subject_user_id' => $subjectUser->id,
            'action' => 'update',
            'subject_type' => 'User',
            'subject_id' => $subjectUser->id,
            'changes' => json_encode(['name' => 'Old Name', 'new_name' => 'New Name']),
        ]);

        // Test relationships
        $this->assertEquals($admin->id, $auditLog->admin->id);
        $this->assertEquals($subjectUser->id, $auditLog->subjectUser->id);
        $this->assertEquals('update', $auditLog->action);
        $this->assertEquals('User', $auditLog->subject_type);

        // Test changes JSON
        $changes = json_decode($auditLog->changes, true);
        $this->assertEquals('Old Name', $changes['name']);
        $this->assertEquals('New Name', $changes['new_name']);
    }

    public function test_soft_delete_functionality()
    {
        // Create models with soft deletes
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();
        $order = Order::factory()->create();

        // Soft delete them
        $user->delete();
        $product->delete();
        $brand->delete();
        $category->delete();
        $order->delete();

        // Test they're soft deleted
        $this->assertSoftDeleted($user);
        $this->assertSoftDeleted($product);
        $this->assertSoftDeleted($brand);
        $this->assertSoftDeleted($category);
        $this->assertSoftDeleted($order);

        // Test they still exist in database
        $this->assertDatabaseHas('users', ['id' => $user->id]);
        $this->assertDatabaseHas('products', ['id' => $product->id]);
        $this->assertDatabaseHas('brands', ['id' => $brand->id]);
        $this->assertDatabaseHas('categories', ['id' => $category->id]);
        $this->assertDatabaseHas('orders', ['id' => $order->id]);
    }

    public function test_address_management()
    {
        // Create user with multiple addresses
        $user = User::factory()->create();
        $billingAddress = Address::factory()->billing()->for($user)->create();
        $shippingAddress = Address::factory()->shipping()->for($user)->create();
        $defaultAddress = Address::factory()->default()->for($user)->create();

        // Test address relationships
        $this->assertEquals(3, $user->addresses->count());
        $this->assertEquals('billing', $billingAddress->type);
        $this->assertEquals('shipping', $shippingAddress->type);
        $this->assertTrue($defaultAddress->is_default);

        // Test address can be used for orders
        $order = Order::factory()->create([
            'user_id' => $user->id,
            'shipping_address_id' => $shippingAddress->id,
            'billing_address_id' => $billingAddress->id,
        ]);

        $this->assertEquals($shippingAddress->id, $order->shippingAddress->id);
        $this->assertEquals($billingAddress->id, $order->billingAddress->id);
    }

    public function test_product_variant_stock_management()
    {
        // Create product with variants
        $product = Product::factory()->create();
        $inStockVariant = ProductVariant::factory()->inStock()->for($product)->create();
        $outOfStockVariant = ProductVariant::factory()->outOfStock()->for($product)->create();

        // Test stock states
        $this->assertGreaterThan(0, $inStockVariant->stock);
        $this->assertEquals(0, $outOfStockVariant->stock);

        // Test variants belong to product
        $this->assertEquals($product->id, $inStockVariant->product->id);
        $this->assertEquals($product->id, $outOfStockVariant->product->id);
    }

    public function test_webhook_processing_states()
    {
        // Create order and webhooks
        $order = Order::factory()->create();
        $pendingWebhook = Webhook::factory()->pending()->for($order)->create();
        $processedWebhook = Webhook::factory()->processed()->for($order)->create();
        $failedWebhook = Webhook::factory()->failed()->for($order)->create();

        // Test webhook states
        $this->assertEquals('pending', $pendingWebhook->status);
        $this->assertNull($pendingWebhook->processed_at);

        $this->assertEquals('processed', $processedWebhook->status);
        $this->assertNotNull($processedWebhook->processed_at);

        $this->assertEquals('failed', $failedWebhook->status);
        $this->assertNull($failedWebhook->processed_at);

        // Test all webhooks belong to same order
        $this->assertEquals($order->id, $pendingWebhook->order->id);
        $this->assertEquals($order->id, $processedWebhook->order->id);
        $this->assertEquals($order->id, $failedWebhook->order->id);
    }
}
