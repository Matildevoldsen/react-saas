import React, {useEffect, useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import {useForm} from "@inertiajs/react";

const SubscriptionForm = ({subscription, plans}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [billingCycle, setBillingCycle] = useState('monthly');
    const {data, setData, post} = useForm({
        plan: subscription.plan ? subscription.plan : 'basic',
        billing_cycle: billingCycle
    });

    const handlePlanChange = (newPlan) => {
        setData('plan', newPlan);
    };

    const handleBillingCycleChange = () => {
        const newBillingCycle = billingCycle === 'monthly' ? 'annual' : 'monthly';
        setBillingCycle(newBillingCycle); // Update local state
        setData('billing_cycle', newBillingCycle); // Update form data

        // Reset plan when billing cycle changes
        const defaultPlan = plans.find(p => p.is_annual === (newBillingCycle === 'annual')).title;
        setData('plan', defaultPlan);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        })

        console.log(error, paymentMethod)

        if (error) {
            toast(error.message, {
                type: "error"
            })
        } else {
            post(route('subscribe', paymentMethod.id), {
                onSuccess: () => {
                    toast('Subscription successful', {
                        type: "success"
                    })
                },
                onError: () => {
                    toast('Whoops, something went wrong.', {
                        type: "error"
                    })
                }
            })
        }
    }

    const filteredPlans = plans.filter(plan => plan.is_annual === (billingCycle === 'annual'));

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex mt-2 space-x-3 items-center">
                <input type="checkbox" id="annual"
                       checked={billingCycle === 'annual'}
                       onChange={handleBillingCycleChange}
                       className="relative before:inline-block ring ring-slate-300 before:w-6 before:h-6 before:bg-slate-400 checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200 w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600"/>
                <label className="text-sm text-gray-500 ms-3 dark:text-gray-400">
                    {billingCycle}
                </label>
            </div>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                {filteredPlans.map((plan) => (
                    <li key={plan.id}>
                        <input type="radio"
                               id={plan.title}
                               name="plan"
                               value={plan.title}
                               onChange={() => handlePlanChange(plan.title)}
                               checked={data.plan === plan.title}
                               className="hidden peer" required/>
                        <label htmlFor={plan.title}
                               className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">${plan.price} / {billingCycle}</div>
                                <div className="w-full">{plan.title}</div>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>


            <CardElement className="border-2 p-2 shadow-sm"/>
            <button type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    disabled={!stripe}>Subscribe
            </button>
        </form>
    );
}

export default SubscriptionForm;
