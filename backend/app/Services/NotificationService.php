<?php

namespace App\services;

use App\Models\User;

class NotificationService
{
    public static function getUserNotifications(int $userId)
    {
        $user = User::findOrFail($userId);

        return $user->notifications()
            ->whereNull('read_at')  
            ->latest()
            ->get();
    }

    public static function markNotificationAsRead($user, $notificationId)
    {
        $notification = $user->notifications()->where('id', $notificationId)->firstOrFail();
        $notification->markAsRead();
        return $notification;
    }
}
