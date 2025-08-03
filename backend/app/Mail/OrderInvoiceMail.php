<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Traits\ResponseTrait;

class OrderInvoiceMail extends Mailable
{
    use Queueable, SerializesModels, ResponseTrait;

    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->subject('Your Order Invoice')
                    ->html($this->buildInvoiceHtml($this->order,"kifak hasson"));
    }
}
