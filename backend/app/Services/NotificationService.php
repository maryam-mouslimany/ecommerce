<?php

namespace App\services;
use App\Models\User;

class NotificationService
{
     public static function getUserNotifications(int $userId)
    {
        $user = User::findOrFail($userId);

        return $user->notifications()->latest()->get();
    }
}
