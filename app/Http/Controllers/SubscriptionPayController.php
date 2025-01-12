<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class SubscriptionPayController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $id)
    {
        $user = $request->user();

        $plan = Plan::where('title', $request->input('plan'))->firstOrFail();

        if ($user->subscribed('default')) {
            $user->subscription('default')->swap($plan->stripe_id);
        } else {
            $user->newSubscription('default', $plan->stripe_id)->create($id);
        }

        return redirect()->back();
    }
}
