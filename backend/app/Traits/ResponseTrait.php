<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ResponseTrait
{
    /**
     * Return a success JSON response.
     */
    protected function responseJSON($data = null, $message = "Success", $status = 200): JsonResponse
    {
        return response()->json([
            'success' => $status < 400,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Return an error JSON response.
     */
    protected function responseError($message = "Error", $status = 400, $data = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Return a validation error JSON response.
     */
    protected function responseValidationError($errors, $message = "Validation failed"): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], 422);
    }
}
