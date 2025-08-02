<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AdminController;

Route::group(["prefix" =>"v0.1"], function(){
    Route::group(["middleware" => "auth:api"], function(){
                Route::group(["prefix" => "user"], function(){        
                    
                        });
                Route::group(["prefix" => "admin"], function(){
            Route::get("/getOrders", [AdminController::class, "getOrders"]);
         });
    });
   

    Route::group(["prefix" => "guest"], function(){
        Route::post("/login", [AuthController::class, "login"]);
        Route::post("/register", [AuthController::class, "register"]);
     });
});