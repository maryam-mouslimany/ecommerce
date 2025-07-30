<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAccord extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'accord_id', 'sort_order'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function accord()
    {
        return $this->belongsTo(Accord::class);
    }
}
