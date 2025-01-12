<?php

namespace App\Http\Middleware;

use App\Models\Plan;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscribedTo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$plans): Response
    {
        $user = $request->user();

        if (!$user || !$user->subscribed()) {
            return redirect()->route('pay');
        }

        foreach ($plans as $plan) {
            $selected = Plan::where('title', $plan)->firstOrFail();

            if ($user->subscription('default')->stripe_price === $selected->stripe_id) {
                return $next($request);
            }
        }

        return redirect()->route('pay');
    }
}
