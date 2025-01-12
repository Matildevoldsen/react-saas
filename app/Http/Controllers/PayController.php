<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionResource;
use App\Models\Plan;
use Illuminate\Http\Request;

class PayController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): \Inertia\Response|\Inertia\ResponseFactory
    {
        $plans = Plan::oldest()->get();

        $subscription = $request->user()->subscription('default');

        return inertia('Pay', [
            'plans' => $plans,
            'subscription' => SubscriptionResource::make($request->user()),
        ]);
    }
}
