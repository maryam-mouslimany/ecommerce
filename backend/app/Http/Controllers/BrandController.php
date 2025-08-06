<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    function getBrands(){
        $brands = Brand::select('id', 'name')->get();
        return $this->responseJSON($brands);
    }
}
