<?php

namespace Tests\Unit;

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
use App\Models\OrdersPerHour;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_model_relationships()
    {
        $user = User::factory()->create();
        $address = Address::factory()->for($user)->create();
        $order = Order::factory()->for($user)->create();
        $role = Role::factory()->create();
        $user->roles()->attach($role);

        $this->assertInstanceOf(Address::class, $user->addresses->first());
        $this->assertInstanceOf(Order::class, $user->orders->first());
        $this->assertInstanceOf(Role::class, $user->roles->first());
        $this->assertTrue($user->hasRole($role->name));
        $this->assertFalse($user->isAdmin());
    }

    public function test_user_admin_methods()
    {
        $admin = User::factory()->admin()->create();
        $customer = User::factory()->customer()->create();

        $this->assertTrue($admin->isAdmin());
        $this->assertFalse($customer->isAdmin());
    }

    public function test_product_model_relationships()
    {
        $product = Product::factory()->create();
        $variant = ProductVariant::factory()->for($product)->create();
        $image = ProductImage::factory()->for($product)->create();
        $accord = Accord::factory()->create();
        $product->accords()->attach($accord, ['sort_order' => 1]);

        $this->assertInstanceOf(ProductVariant::class, $product->variants->first());
        $this->assertInstanceOf(ProductImage::class, $product->images->first());
        $this->assertInstanceOf(Accord::class, $product->accords->first());
        $this->assertInstanceOf(Brand::class, $product->brand);
        $this->assertInstanceOf(Category::class, $product->category);
    }

    public function test_product_variant_model_relationships()
    {
        $variant = ProductVariant::factory()->create();
        $orderItem = OrderItem::factory()->for($variant)->create();

        $this->assertInstanceOf(Product::class, $variant->product);
        $this->assertInstanceOf(OrderItem::class, $variant->orderItems->first());
    }

    public function test_order_model_relationships()
    {
        $order = Order::factory()->create();
        $item = OrderItem::factory()->for($order)->create();
        $webhook = Webhook::factory()->for($order)->create();

        $this->assertInstanceOf(OrderItem::class, $order->items->first());
        $this->assertInstanceOf(Webhook::class, $order->webhooks->first());
        $this->assertInstanceOf(User::class, $order->user);
        $this->assertInstanceOf(Address::class, $order->shippingAddress);
        $this->assertInstanceOf(Address::class, $order->billingAddress);
    }

    public function test_order_item_model_relationships()
    {
        $item = OrderItem::factory()->create();

        $this->assertInstanceOf(Order::class, $item->order);
        $this->assertInstanceOf(ProductVariant::class, $item->productVariant);
    }

    public function test_address_model_relationships()
    {
        $address = Address::factory()->create();
        $shippingOrder = Order::factory()->create(['shipping_address_id' => $address->id]);
        $billingOrder = Order::factory()->create(['billing_address_id' => $address->id]);

        $this->assertInstanceOf(User::class, $address->user);
        $this->assertInstanceOf(Order::class, $address->shippingOrders->first());
        $this->assertInstanceOf(Order::class, $address->billingOrders->first());
    }

    public function test_brand_model_relationships()
    {
        $brand = Brand::factory()->create();
        $product = Product::factory()->for($brand)->create();

        $this->assertInstanceOf(Product::class, $brand->products->first());
    }

    public function test_category_model_relationships()
    {
        $category = Category::factory()->create();
        $product = Product::factory()->for($category)->create();

        $this->assertInstanceOf(Product::class, $category->products->first());
    }

    public function test_accord_model_relationships()
    {
        $accord = Accord::factory()->create();
        $product = Product::factory()->create();
        $product->accords()->attach($accord, ['sort_order' => 1]);

        $this->assertInstanceOf(Product::class, $accord->products->first());
    }

    public function test_audit_log_model_relationships()
    {
        $admin = User::factory()->admin()->create();
        $subjectUser = User::factory()->create();
        $auditLog = AuditLog::factory()->create([
            'admin_id' => $admin->id,
            'subject_user_id' => $subjectUser->id,
        ]);

        $this->assertInstanceOf(User::class, $auditLog->admin);
        $this->assertInstanceOf(User::class, $auditLog->subjectUser);
    }

    public function test_webhook_model_relationships()
    {
        $webhook = Webhook::factory()->create();

        $this->assertInstanceOf(Order::class, $webhook->order);
    }

    public function test_model_fillable_properties()
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'role' => 'admin',
        ]);

        $this->assertEquals('Test User', $user->name);
        $this->assertEquals('test@example.com', $user->email);
        $this->assertEquals('1234567890', $user->phone);
        $this->assertEquals('admin', $user->role);
    }

    public function test_soft_deletes()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $variant = ProductVariant::factory()->create();
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();
        $order = Order::factory()->create();

        $user->delete();
        $product->delete();
        $variant->delete();
        $brand->delete();
        $category->delete();
        $order->delete();

        $this->assertSoftDeleted($user);
        $this->assertSoftDeleted($product);
        $this->assertSoftDeleted($variant);
        $this->assertSoftDeleted($brand);
        $this->assertSoftDeleted($category);
        $this->assertSoftDeleted($order);
    }
}
