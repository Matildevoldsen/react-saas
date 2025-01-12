import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Elements} from "@stripe/react-stripe-js";
import SubscriptionForm from "@/Components/SubscriptionForm.jsx";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51NXOxbDSXqjvgR37a4dDBtN5tKXdAgXNPbeFS6MyldScYeTpYp0qDE3IXbC2dkVBX6YINDoyUGBmet7YtYkV54Oa00oO2Bl6QD')


export default function Subscription({auth, subscription, plan, plans}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Manage Subscription
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {!subscription.subscribed && (
                                    <>You are currently not subscribed to any plans</>
                                )}
                            </p>

                            <Elements stripe={stripePromise}>
                                <SubscriptionForm subscription={subscription} plans={plans}/>
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
