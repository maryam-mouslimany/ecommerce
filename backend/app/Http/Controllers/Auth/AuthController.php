<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Common\AuthService;
use App\Traits\ResponseTrait;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{
    use ResponseTrait;

    public function login(LoginRequest $request)
    {
        $result = AuthService::login($request);

        if ($result['success']) {
            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        return $this->responseError($result['message'], $result['status']);
    }

    public function register(RegisterRequest $request)
    {
        $result = AuthService::register($request);

        if ($result['success']) {
            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        if (isset($result['errors'])) {
            return $this->responseValidationError($result['errors'], $result['message']);
        }

        return $this->responseError($result['message'], $result['status']);
    }

    public function logout()
    {
        $result = AuthService::logout();
        return $this->responseJSON(null, $result['message'], $result['status']);
    }
}
