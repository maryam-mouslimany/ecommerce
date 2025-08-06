<?php

namespace App\Services\AIAgent;

use OpenAI\Client;

class ChatbotService
{
    public function chat($message)
    {
        try {
            // Get products from database for context
            $products = \App\Models\Product::with(['brand', 'category', 'accords', 'variants'])
                ->limit(15)
                ->get();

            // Format products for better AI understanding
            $formattedProducts = $products->map(function($product) {
                return [
                    'name' => $product->name,
                    'brand' => $product->brand->name ?? 'Unknown',
                    'category' => $product->category->name ?? 'Unknown',
                    'gender' => $product->gender,
                    'accords' => $product->accords->pluck('name')->implode(', '),
                    'variants' => $product->variants->map(function($variant) {
                        return $variant->size_ml . 'ml - $' . $variant->price;
                    })->implode(', '),
                    'stock_status' => $product->variants->sum('stock') > 0 ? 'In Stock' : 'Out of Stock'
                ];
            });

            // Create enhanced system prompt
            $systemPrompt = "You are an expert perfume shopping assistant for His&Hers Perfume Store By Team 7. 

        IMPORTANT RULES:
        - ALWAYS mention specific product names, brands, and prices from our inventory
        - When customers ask for suggestions, immediately show 2-3 specific products with details
        - Don't ask too many questions - be proactive with recommendations
        - If we don't have a specific brand, suggest similar alternatives from our inventory
        - Always mention sizes and prices for recommended products
        - Keep responses conversational but informative

        GUIDELINES:
        - Be friendly, knowledgeable, and enthusiastic about perfumes
        - Provide detailed recommendations with actual product names and prices
        - Explain fragrance characteristics and notes
        - Always mention stock status
        - Suggest complementary products when appropriate

        OUR CURRENT INVENTORY:
        " . json_encode($formattedProducts, JSON_PRETTY_PRINT) . "

        When customers ask for recommendations, immediately suggest specific products from our inventory with names, brands, prices, and brief descriptions of their scent profiles.";

            // Create OpenAI client
            $client = \OpenAI::client(config('services.openai.api_key'));

            // Call OpenAI
            $response = $client->chat()->create([
                'model' => 'gpt-3.5-turbo-0125',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $message]
                ],
                'max_tokens' => 250,
                'temperature' => 0.7
            ]);

            return $response->choices[0]->message->content;
        } catch (\Exception $e) {
            // Log error for debugging (remove in production)
            \Illuminate\Support\Facades\Log::error('OpenAI Error: ' . $e->getMessage());
            throw $e;
        }
    }
}
