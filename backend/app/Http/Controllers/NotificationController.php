<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\services\NotificationService;

class NotificationController extends Controller
{
    public function index($user_id)
    {
        try {
            $notifications = NotificationService::getUserNotifications($user_id);

            return $this->responseJSON($notifications, 'Notifications fetched successfully');
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }

    public function markAsRead(Request $request, $id)
    {
        try {
            $notification = NotificationService::markNotificationAsRead($request->user(), $id);
            return $this->responseJSON($notification, 'Notification marked as read');
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }
}
