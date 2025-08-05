<?php
// app/Jobs/SendInvoiceEmail.php
// namespace App\Jobs;

// use App\Mail\OrderInvoiceMail;
// use App\Models\Order;
// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Queue\InteractsWithQueue;
// use Illuminate\Queue\SerializesModels;
// use Illuminate\Support\Facades\Mail;

// class SendInvoiceEmail implements ShouldQueue
// {
//     use InteractsWithQueue, Queueable, SerializesModels;

//     public $tries = 3;

//     public function __construct(public Order $order) {}

//     public function handle(): void
//     {
//         Mail::to($this->order->user->email)
//             ->send(new OrderInvoiceMail($this->order));
//     }
// }

