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
use Illuminate\Foundation\Testing\RefreshDatabase;

class FactoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_factory_creates_valid_data()
    {
        $user = User::factory()->create();

        $this->assertNotEmpty($user->name);
        $this->assertNotEmpty($user->email);
        $this->assertNotEmpty($user->phone);
        $this->assertContains($user->role, ['customer', 'admin']);
        $this->assertNotEmpty($user->password);
    }

    public function test_user_factory_states()
    {
        $admin = User::factory()->admin()->create();
        $customer = User::factory()->customer()->create();

        $this->assertEquals('admin', $admin->role);
        $this->assertEquals('customer', $customer->role);
    }

    public function test_product_factory_creates_valid_data()
    {
        $product = Product::factory()->create();

        $this->assertNotEmpty($product->name);
        $this->assertContains($product->gender, ['male', 'female', 'unisex']);
        $this->assertNotNull($product->brand_id);
        $this->assertNotNull($product->category_id);
    }

    public function test_product_factory_states()
    {
        $male = Product::factory()->male()->create();
        $female = Product::factory()->female()->create();
        $unisex = Product::factory()->unisex()->create();

        $this->assertEquals('male', $male->gender);
        $this->assertEquals('female', $female->gender);
        $this->assertEquals('unisex', $unisex->gender);
    }

    public function test_product_variant_factory_creates_valid_data()
    {
        $variant = ProductVariant::factory()->create();

        $this->assertNotNull($variant->product_id);
        $this->assertContains($variant->size_ml, [30, 50, 75, 100, 125, 150, 200]);
        $this->assertGreaterThan(0, $variant->price);
        $this->assertGreaterThanOrEqual(0, $variant->stock);
    }

    public function test_product_variant_factory_states()
    {
        $inStock = ProductVariant::factory()->inStock()->create();
        $outOfStock = ProductVariant::factory()->outOfStock()->create();

        $this->assertGreaterThan(0, $inStock->stock);
        $this->assertEquals(0, $outOfStock->stock);
    }

    public function test_brand_factory_creates_valid_data()
    {
        $brand = Brand::factory()->create();

        $this->assertNotEmpty($brand->name);
        $this->assertContains($brand->name, [
            'Chanel',
            'Dior',
            'Yves Saint Laurent',
            'Guerlain',
            'Hermès',
            'Tom Ford',
            'Jo Malone',
            'Byredo',
            'Le Labo',
            'Maison Margiela',
            'Creed',
            'Penhaligon\'s',
            'Diptyque',
            'Atelier Cologne',
            'Acqua di Parma',
            'Bvlgari',
            'Cartier',
            'Van Cleef & Arpels',
            'Boucheron',
            'Frederic Malle'
        ]);
    }

    public function test_category_factory_creates_valid_data()
    {
        $category = Category::factory()->create();

        $this->assertNotEmpty($category->name);
        $this->assertContains($category->name, [
            'Floral',
            'Oriental',
            'Woody',
            'Fresh',
            'Citrus',
            'Aromatic',
            'Chypre',
            'Fougère',
            'Gourmand',
            'Aquatic',
            'Spicy',
            'Powdery',
            'Musk',
            'Leather',
            'Tobacco'
        ]);
    }

    public function test_accord_factory_creates_valid_data()
    {
        $accord = Accord::factory()->create();

        $this->assertNotEmpty($accord->name);
        $this->assertContains($accord->name, [
            'Rose',
            'Jasmine',
            'Lavender',
            'Vanilla',
            'Sandalwood',
            'Bergamot',
            'Lemon',
            'Orange',
            'Grapefruit',
            'Lime',
            'Patchouli',
            'Vetiver',
            'Cedar',
            'Oakmoss',
            'Amber',
            'Musk',
            'Leather',
            'Tobacco',
            'Coffee',
            'Chocolate',
            'Cinnamon',
            'Cardamom',
            'Pepper',
            'Ginger',
            'Clove',
            'Mint',
            'Eucalyptus',
            'Pine',
            'Sea Salt',
            'Rain'
        ]);
    }

    public function test_address_factory_creates_valid_data()
    {
        $address = Address::factory()->create();

        $this->assertNotNull($address->user_id);
        $this->assertNotEmpty($address->line1);
        $this->assertNotEmpty($address->city);
        $this->assertNotEmpty($address->country);
        $this->assertContains($address->type, ['billing', 'shipping']);
        $this->assertIsBool($address->is_default);
    }

    public function test_address_factory_states()
    {
        $billing = Address::factory()->billing()->create();
        $shipping = Address::factory()->shipping()->create();
        $default = Address::factory()->default()->create();

        $this->assertEquals('billing', $billing->type);
        $this->assertEquals('shipping', $shipping->type);
        $this->assertTrue($default->is_default);
    }

    public function test_order_factory_creates_valid_data()
    {
        $order = Order::factory()->create();

        $this->assertNotNull($order->user_id);
        $this->assertNotNull($order->shipping_address_id);
        $this->assertNotNull($order->billing_address_id);
        $this->assertGreaterThan(0, $order->total_amount);
        $this->assertContains($order->status, ['pending', 'paid', 'packed', 'shipped']);
    }

    public function test_order_factory_states()
    {
        $pending = Order::factory()->pending()->create();
        $paid = Order::factory()->paid()->create();
        $packed = Order::factory()->packed()->create();
        $shipped = Order::factory()->shipped()->create();

        $this->assertEquals('pending', $pending->status);
        $this->assertEquals('paid', $paid->status);
        $this->assertEquals('packed', $packed->status);
        $this->assertEquals('shipped', $shipped->status);
    }

    public function test_order_item_factory_creates_valid_data()
    {
        $item = OrderItem::factory()->create();

        $this->assertNotNull($item->order_id);
        $this->assertNotNull($item->product_variant_id);
        $this->assertGreaterThan(0, $item->quantity);
        $this->assertGreaterThan(0, $item->unit_price);
    }

    public function test_role_factory_creates_valid_data()
    {
        $role = Role::factory()->create();

        $this->assertNotEmpty($role->name);
        $this->assertContains($role->name, [
            'admin',
            'manager',
            'customer_service',
            'warehouse',
            'marketing',
            'sales',
            'support',
            'moderator',
            'editor',
            'viewer'
        ]);
    }

    public function test_role_factory_states()
    {
        $admin = Role::factory()->admin()->create();
        $manager = Role::factory()->manager()->create();

        $this->assertEquals('admin', $admin->name);
        $this->assertEquals('manager', $manager->name);
    }

    public function test_webhook_factory_creates_valid_data()
    {
        $webhook = Webhook::factory()->create();

        $this->assertNotNull($webhook->order_id);
        $this->assertNotEmpty($webhook->payload);
        $this->assertContains($webhook->status, ['pending', 'processed', 'failed']);
        $this->assertGreaterThanOrEqual(0, $webhook->retry_count);
    }

    public function test_webhook_factory_states()
    {
        $pending = Webhook::factory()->pending()->create();
        $processed = Webhook::factory()->processed()->create();
        $failed = Webhook::factory()->failed()->create();

        $this->assertEquals('pending', $pending->status);
        $this->assertNull($pending->processed_at);
        $this->assertEquals('processed', $processed->status);
        $this->assertNotNull($processed->processed_at);
        $this->assertEquals('failed', $failed->status);
        $this->assertNull($failed->processed_at);
    }

    public function test_audit_log_factory_creates_valid_data()
    {
        $auditLog = AuditLog::factory()->create();

        $this->assertNotNull($auditLog->admin_id);
        $this->assertContains($auditLog->action, ['create', 'update', 'delete', 'view', 'export']);
        $this->assertGreaterThan(0, $auditLog->subject_id);
        $this->assertNotEmpty($auditLog->subject_type);
        $this->assertNotEmpty($auditLog->ip_address);
    }

    public function test_audit_log_factory_states()
    {
        $create = AuditLog::factory()->createAction()->create();
        $update = AuditLog::factory()->update()->create();
        $delete = AuditLog::factory()->delete()->create();

        $this->assertEquals('create', $create->action);
        $this->assertEquals('update', $update->action);
        $this->assertEquals('delete', $delete->action);
    }

    public function test_orders_per_hour_factory_creates_valid_data()
    {
        $ordersPerHour = OrdersPerHour::factory()->create();

        $this->assertNotNull($ordersPerHour->hour_bucket);
        $this->assertGreaterThanOrEqual(0, $ordersPerHour->order_count);
        $this->assertGreaterThanOrEqual(0, $ordersPerHour->revenue);
    }

    public function test_orders_per_hour_factory_states()
    {
        $highActivity = OrdersPerHour::factory()->highActivity()->create();
        $lowActivity = OrdersPerHour::factory()->lowActivity()->create();

        $this->assertGreaterThanOrEqual(15, $highActivity->order_count);
        $this->assertLessThanOrEqual(5, $lowActivity->order_count);
    }
}
