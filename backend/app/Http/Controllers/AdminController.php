<?php

namespace App\Http\Controllers;
use  App\Services\AdminService;

use Illuminate\Http\Request;

class AdminController extends Controller
{
     function getOrder(){
        $admin=AdminService::getUserCapsule();

        if($admin)return $this->responseJSON($admin);
        return $this->responseJSON(null,"notfound",404);
        
    }
}
