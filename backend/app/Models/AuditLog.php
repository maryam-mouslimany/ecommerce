<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'subject_user_id',
        'action',
        'subject_id',
        'subject_type',
        'changes',
        'ip_address',
        'created_at',
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function subjectUser()
    {
        return $this->belongsTo(User::class, 'subject_user_id');
    }
}
