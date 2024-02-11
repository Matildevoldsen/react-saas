<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PayController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('Pay');
    }
}
