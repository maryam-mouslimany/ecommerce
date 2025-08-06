<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
     function getCategories(){
        $categories = Category::select('id', 'name')->get();
        return $this->responseJSON($categories);
    }
}
