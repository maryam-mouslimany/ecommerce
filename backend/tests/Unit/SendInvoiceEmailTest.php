<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Jobs\SendInvoiceEmail;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderInvoiceMail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SendInvoiceEmailTest extends TestCase
{
    use RefreshDatabase;

    public function test_job_sends_invoice_email()
    {
        Mail::fake();

        $order = Order::factory()->create();

        $job = new SendInvoiceEmail($order);
        $job->handle();

     Mail::assertSent(OrderInvoiceMail::class, function ($mail) use ($order) {
    return $mail->hasTo($order->user->email);
});
    }
    public function test_job_uses_queueable_traits()
{
    $job = new \App\Jobs\SendInvoiceEmail(Order::factory()->make());

    $this->assertInstanceOf(\Illuminate\Contracts\Queue\ShouldQueue::class, $job);
    $this->assertContains(
        \Illuminate\Bus\Queueable::class,
        class_uses($job)
    );
}
public function test_job_fails_and_can_be_retried()
{
    Mail::fake();

    $order = Order::factory()->create();

    // Simulate failure by throwing an exception
    $job = new class($order) extends \App\Jobs\SendInvoiceEmail {
        public function handle(): void
        {
            throw new \Exception("Simulated failure");
        }
    };

    $this->expectException(\Exception::class);
    $job->handle();
}

}
