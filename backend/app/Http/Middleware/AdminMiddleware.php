<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!Auth::guard('api')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required',
                'error' => 'Unauthenticated'
            ], 401);
        }

        // Check if user has admin role
        $user = Auth::guard('api')->user();
        if ($user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Admin role required.',
                'error' => 'Forbidden'
            ], 403);
        }

        return $next($request);
    }
}
