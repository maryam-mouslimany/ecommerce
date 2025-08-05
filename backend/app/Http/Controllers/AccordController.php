<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accord;

class AccordController extends Controller
{
  function getAccords(){
        $accords = Accord::select('id', 'name')->get();
        return $this->responseJSON($accords);
    }
}
