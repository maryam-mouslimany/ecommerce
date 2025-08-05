<?php

namespace App\Services\AIAgent;

use OpenAI\Client;

class ChatbotService
{
    public function chat($message, $sessionId = null)
    {
        try {
            // Get products from database for context
            $products = \App\Models\Product::with(['brand', 'category', 'accords'])
                ->limit(10)
                ->get();

            // Create system prompt
            $systemPrompt = "You are a helpful perfume shopping assistant. You have access to these products: " . $products->toJson();

            // Create OpenAI client
            $client = \OpenAI::client(config('services.openai.api_key'));

            // Call OpenAI
            $response = $client->chat()->create([
                'model' => 'gpt-3.5-turbo-0125', // Cheaper model
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $message]
                ],
                'max_tokens' => 300
            ]);

            return $response->choices[0]->message->content;
        } catch (\Exception $e) {
            // Log the actual error for debugging
            \Illuminate\Support\Facades\Log::error('OpenAI Error: ' . $e->getMessage());
            throw $e;
        }
    }
}
