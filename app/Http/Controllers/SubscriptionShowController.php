<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionResource;
use App\Models\Plan;
use Illuminate\Http\Request;

class SubscriptionShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $subscription = $request->user()->subscription('default');
        $plans = Plan::oldest()->get();

        if ($subscription) {
            $plan = Plan::where('stripe_id', $subscription->stripe_price)->first();
        }

        return inertia('Profile/Subscription', [
            'plans' => $plans,
            'plan' => $plan ?? null,
            'subscription' => SubscriptionResource::make($request->user()),
        ]);
    }
}
