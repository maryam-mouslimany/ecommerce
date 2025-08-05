<?php

namespace App\Http\Controllers\AIAgent;

use App\Services\AIAgent\ChatbotService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChatbotController extends Controller
{
    protected $chatbotService;

    public function __construct(ChatbotService $chatbotService)
    {
        $this->chatbotService = $chatbotService;
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:500'
        ]);

        try {
            $response = $this->chatbotService->chat(
                $request->message,
                $request->sessionId
            );

            return response()->json([
                'success' => true,
                'response' => $response
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
