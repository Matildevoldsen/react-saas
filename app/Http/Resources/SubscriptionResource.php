<?php

namespace App\Http\Resources;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'subscribed' => $this?->subscribed(),
            'subscription' => $this?->subscription('default')?->stripe_price,
            'ends_at' => $this?->subscription('default')?->ends_at?->format('Y-m-d'),
            'in_grace_period' => $this?->subscription('default')?->onGracePeriod(),
            'cancelled' => $this?->subscription('default')?->canceled(),
            'ended' => $this?->subscription('default')?->ended(),
            'on_trial' => $this?->subscription('default')?->onTrial(),
            'trial_ends_at' => $this?->subscription('default')?->trial_ends_at,
//            'renews_on' => $this?->renewsOn(),
            'plan' => Plan::where('stripe_id', $this?->subscription('default')?->stripe_price)->first()->title ?? '',
        ];
    }
}
