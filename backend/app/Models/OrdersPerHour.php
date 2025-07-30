<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdersPerHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'hour_bucket',
        'order_count',
        'revenue',
    ];
}
