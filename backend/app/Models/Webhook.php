<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Webhook extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'payload', 'status', 'retry_count', 'processed_at'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
